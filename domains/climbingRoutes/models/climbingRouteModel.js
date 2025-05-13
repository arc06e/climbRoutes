const mongoose = require('mongoose');
const slugify = require('slugify'); 

const climbingRouteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'climbing route name required'],
        unique: true,
        trim: true,
        minlength: [4, 'climbing route name must be more than 4 characters'],
        maxlength: [40, 'climbing route name must be less than 40 characters']
    },
    slug: String,
    color: {
        type: String,
        required: false,
        minlength: [3, 'color name must be more than 4 characters'],
        maxlength: [12, 'color name must be less than 12 characters']
    },
    type: {
        type: String, 
        required: [true, 'must specify type of climbing route'],
        enum: ['Trad', 'Sport', 'Boulder'],
        message: ['climbing route is designated either Trad, Sport, or Boulder']
        
    },
    grade: {
        type: String,
        required: [true, 'grade required'],
        minlength: [2, 'grade must have at least 2 characters'],
        maxlength: [7, 'grade must be less than 7 characters']
    },
    indoors: {
        type: Boolean,
        default: true
    },
    site: {
        type: String,
        minlength: [2, 'site location must be more than 1 character'],
        maxlength: [80, 'site location must be less than 40 characters']
    },
    rating: {
        type: Number, 
        min: [1, 'ratings must be greater than 0 stars'],
        max: [4, 'rating must be less than 5 stars']
    },
    description: {
        type: String,
        trim: true
    }, 
    startDate: [Date],
    finishDate: [Date]

},
{collection: 'climbing_routes'});

const ClimbingRoute = mongoose.model('ClimbingRoute', climbingRouteSchema);
module.exports = ClimbingRoute;