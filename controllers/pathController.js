const Path = require('../models/pathModel');

//export EACH CRUD operation individually 

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