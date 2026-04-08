const departmentSubModel = require('./../models/department-sub');

exports.getAll = async (req, res) => {
    const departmentsSubs = await departmentSubModel.find({}).lean();

    res.json(departmentsSubs)
}

exports.create = async (req, res) => {
    const departmentSub  = await departmentSubModel.create({
        title: req.body.title,
        parent: req.body.parent
    })

    res.json(departmentSub)
}