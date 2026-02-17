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

};

exports.remove = async (req, res) => {

};

exports.answer = async (req, res) => {

};