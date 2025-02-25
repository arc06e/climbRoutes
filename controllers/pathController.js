const Path = require('../models/pathModel');

const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError');

//CREATE
exports.createPath = catchAsync(async (req, res, next) => {
    //console.log(req.body);
    const newPath = await Path.create(req.body);

    res.status(201).json({
        status: 'successfully created path',
        path: newPath      
    })

});

//READ ALL 
exports.getAllPaths = catchAsync(async (req, res, next) => {
    const paths = await Path.find();

        res.status(200).json({
            results: paths.length,
            paths
        });
});

//READ ONE
exports.getPath = catchAsync(async (req, res, next) => {
    const path = await Path.findById(req.params.id);

    if (!path) {
        return next(new AppError('No path found with that ID', 404))
    }

    res.status(200).json({
        status: 'success',
        results: path.length,
        path
    });
});

//UPDATE ONE
exports.updatePath = catchAsync(async (req, res, next) => {
    const updatedPath = await Path.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!path) {
        return next(new AppError('No path found with that ID', 404))
    }

    res.status(200).json({
        status: 'successfully updated path',
        updatedPath
    });
});

//DELETE ONE
exports.deletePath = async (req, res, next) => {
    const path = await Path.findByIdAndDelete(req.params.id);

    if (!path) {
        return next(new AppError('No path found with that ID', 404))
    }

    res.status(204).json({});
};

//READ INDOOR PATHS
exports.getIndoorPaths = catchAsync(async (req, res, next) => {
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

    res.status(200).json({
        status: 'successfully retrieved all indoor paths',
        results: indoorPaths.length,
        data: {
            indoorPaths
        }
    });
});