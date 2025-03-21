const climbersService = require('../climbers');;

exports.createClimber = async (req, res) => {
    try {
        const newClimber = await climbersService.createClimber(req);
        res.status(201).json({
            status: 'successfully created new climber',
            newClimber
        });
    } catch (error) {
        next(error);
    }
}

exports.getAllClimbers = async (req, res, next) => {
    try {
        const climbers = await climbersService.getAllClimbers();
        res.status(200).json({
            status: 'successfully retrieved all climbers',
            count: climbers.length,
            data: {
                climbers
            }

        });
    } catch (error) {
        next(error)
    };
}

exports.getClimber = async (req, res, next) => {
    try {
        const climber = await climbersService.getClimber(req);
        res.status(200).json({
            status: 'successfully retrieved climber',
            data: {
                climber
            }
        });
    } catch (error) {
        next(error);
    }
}


exports.updateClimber = async (req, res) => {
    try {
        const updatedClimber = await climbersService.updateClimber(req);
        res.status(201).json({
            status: 'successfully updated climber',
            data: {
                updatedClimber
            }
        });
    } catch (error) {
        next(error);
    }
}

exports.deleteClimber = async (req, res) => {
    try {
        const deletedClimber = await climbersService.deleteClimber(req);
        res.status(204).json({});
    } catch (error) {
        next(error);
    }
}