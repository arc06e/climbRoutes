const jwt = require('jsonwebtoken');
const Climber = require('../../domains/climbers/models/climberModel');

exports.signToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
    return token;
}

exports.createClimber = async (req, res, next) => {
    try {
        const newClimber = await Climber.create(req);

        return newClimber;
    } catch (error) {
        throw error;
    }
}