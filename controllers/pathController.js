const Path = require('../models/pathModel');

//CREATE
exports.createPath = async (req, res) => {
    console.log(req.body);
    
    try {
    const newPath = await Path.create(req.body);

        res.status(201).json({
            status: 'successfully created path',
            path: newPath
            
        })
    } catch (error) {
        res.status(404).json({
            status: 'failed to create path',
            message: error
        })
    }
}

//READ ALL 
exports.getAllPaths = async (req, res) => {
    try {
        const paths = await Path.find();

        res.status(200).json({
            results: paths.length,
            paths
        })
    } catch (error) {
        res.status(404).json({
            status: 'failed to find climbing paths',
            message: error,
        })
    }
};

//READ ONE
exports.getPath = async (req, res) => {
    try {
        const path = await Path.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            results: path.length,
            path
        });
    } catch (error) {
        res.status(404).json({
            status: 'path not found',
            message: error 
        });
    }
};

//UPDATE ONE
exports.updatePath = async (req, res) => {
    try {
        const updatedPath = await Path.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'successfully updated path',
            updatedPath
        });
    } catch (error) {
        res.status(404).json({
            status: "failed to update path",
            message: error
        });
    }
};

//DELETE ONE
exports.deletePath = async (req, res) => {
    try {
        
        await Path.findByIdAndDelete(req.params.id);

        res.status(204).json({});

    } catch (error) {
        res.status(404).json({
            status: 'failed to delete path',
            message: error
        });
    }
};

//READ INDOOR PATHS
exports.getIndoorPaths = async (req, res) => {
    const indoorPaths = await Path.aggregate([
        {//stage 1: match all paths/documents that are indoors
            $match: {indoors: true}
        },
        {//stage 2: group returned paths/documents by site            
            $group: {
                _id: '$site',
                paths: {
                    $push: {
                        name: '$name',
                        grade: '$grade',
                        color: '$color'
                    }
                },
                num: {$sum: 1}
            }        
        },
        {
            //stage 3: deconstructs the paths array to work with individual paths
            $unwind: '$paths'
        },
        {
            //stage 4: group by grade within each site
            $group: {
                _id: {
                    site: '$_id', 
                    grade: '$paths.grade'
                },
                paths: {
                    $push: {
                        name: '$paths.name',
                        color: '$paths.color'
                }
            },
            grade: {$first: '$paths.grade'}, //ensure each grade is displayed for each group
            num: {$sum: 1}
            }
        },
        {
            //stage 5: group by site to group the grades together
            $group: {
                _id: '$_id.site',
                grades: {
                    $push: {
                        grade: '$grade',
                        path: '$paths',
                        num: '$num'
                    }
                }
            }
        }
    ]);

    try {
        res.status(200).json({
            status: 'successfully retrieved all indoor paths',
            results: indoorPaths.length,
            data: {
                indoorPaths
            }
        });
    } catch (error) {
        res.status(404).json({
            status: 'failed to get indoor paths', 
            message: error
        });
    }
};