const mongoose = require('mongoose');
const contactusModel = require('./../models/contactus');
const nodemailer = require('nodemailer');

exports.create = async (req, res) => {
    const { name, email, phone, body } = req.body;

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
        return res.json({ message: 'id is not valid' })
    }
    const contact = await contactusModel.findOneAndDelete({ _id: req.params.id });

    if (!contact) {
        return res.status(404).json({ message: 'contact not found' })
    }
    return res.status(204).json({ message: `this contact ${contact} has been deleted` })
};

exports.answer = async (req, res) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "souri7202@gmail.com",
            pass: process.env.APP_PASSWORD // The 16-character App Password
        },
    });

    const mailOptions = {
        from: "souri7202@gmail.com",
        to: req.body.email,
        subject: "Hello World",
        text: req.body.answer,
    };

    transporter.sendMail(mailOptions, async function (err, info) {
        if (err) {
            return res.json(err)
        } else {
            await contactusModel.findOneAndUpdate({ email: req.body.email }, {
                $set: {
                    answer: 1
                }
            });
            return res.json(info)
        }
    });

};