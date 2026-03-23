const departmentModel = require('./../models/deparment');

exports.getAll = async (req, res) => {
    const departments = await departmentModel.find({}).lean();

    res.json(departments)
}

exports.create = async (req, res) => {
    const department = await departmentModel.create({
        title: req.body.title
    })

    res.json(department)
}