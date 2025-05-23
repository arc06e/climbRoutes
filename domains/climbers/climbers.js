const Climber = require('../climbers/models/climberModel');

exports.createClimber = async (req, res) => {
    try {
        const newClimber = await Climber.create(req.body);
        return newClimber;
    } catch (error) {
        throw error; 
    }
}

exports.getAllClimbers = async (req, res) => {
    try {
        const climbers = await Climber.find();
        return climbers;
    } catch (error) {
        throw error;
    }
}

exports.getClimber = async (req, res) => {
    try {
        const climber = await Climber.findById(req.params.id);
        return climber;
    } catch (error) {
        throw error;
    }
}


exports.updateClimber = async (req, res) => {
    try {
        const updatedClimber = await Climber.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        //const updatedClimber = await Climber.findByIdAndUpdate(req.params.id, req.body);
        return updatedClimber; 
    } catch (error) {
        throw error; 
    }
}

exports.deleteClimber = async (req, res) => {
    try {
        const deletedClimber = await Climber.findByIdAndDelete(req.params.id);
        return deletedClimber;
    } catch (error) {
        throw error;
    }
}