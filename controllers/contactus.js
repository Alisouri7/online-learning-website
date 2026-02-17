const mongoose = require('mongoose');
const contactusModel = require('./../models/contactus');


exports.create = async (req, res) => {
    const {name, email, phone, body} = req.body;

    const contact = await contactusModel.create({
        name,
        email,
        phone,
        body,
        answer: 0
    })

    return res.status(201).json(contact)
};

exports.getAll = async (req, res) => {
    const contacts = await contactusModel.find({}).lean();
    return res.json(contacts)
};

exports.remove = async (req, res) => {
    const isValidObjectID = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isValidObjectID) {
        return res.json({message: 'id is not valid'})
    }
    const contact = await contactusModel.findOneAndDelete({_id: req.params.id});

    return res.status(204).json({message: `this contact ${contact} has been deleted` })
};

exports.answer = async (req, res) => {

};