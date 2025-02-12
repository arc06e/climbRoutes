const Path = require('../models/pathModel');

//export EACH CRUD operation individually 

//CREATE

//READ ALL 
exports.getAllPaths = async (req, res) => {
    try {

        //const query = Path.find(JSON.parse(req.query));
        //const query = await Path.find();
        const query = await Path.find();

        console.log(`req.query: ${req.query}`);
        console.log(`query: ${query}`);
        
        // const Paths = await query;
        // console.log(Paths);

        res.status(200).json({
            results: query.length,
            data: {
                query,
            }

        })
    } catch (error) {
        res.status(400).json({
            status: 'failed to find climbing paths ',
            message: error,
        })
    }
}

//READ ONE