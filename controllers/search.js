const courseModel = require('./../models/course');

exports.get = async (req, res) => {
    const {keyword} = req.params;

    const results = await courseModel.find({name: {          //we can use or flag to search in name and description
        $regex: '.*' + keyword + '.*'
    }})
    return res.json(results)
}