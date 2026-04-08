const mongoose = require('mongoose');
const departmentModel = require('./../models/deparment');
const departmentSubModel = require('./../models/department-sub');
const ticketModel = require('./../models/ticket');

exports.create = async (req, res) => {
    const { departmentID, departmentSubID, priority, title, body, courseID, parentID } = req.body;

    const ticket = await ticketModel.create({
        title,
        body,
        priority,
        answer: 0,
        userID: req.user._id,
        courseID,
        parentID,
        departmentID,
        departmentSubID,
        isAnswer: 0,

    });

    const mainTicket = await ticketModel.findOne({ _id: ticket._id })
        .populate('departmentID')
        .populate('departmentSubID')
        .populate('userID')
        .lean();

    return res.status(201).json(mainTicket)
}

exports.getAll = async (req, res) => {
    const tickets = await ticketModel.find({ answer: 0 })                 //find all tickets that has not been answered
        .populate('departmentID', 'title')
        .populate('departmentSubID', 'title')
        .populate('userID', 'name')
        .lean();

    return res.json(tickets)
}

exports.userTickets = async (req, res) => {

    const userTickets = await ticketModel.find({ userID: req.user._id }).populate('departmentID', 'title').populate('departmentSubID', 'title').lean();

    return res.json(userTickets)
}

exports.departments = async (req, res) => {

    const departments = await departmentModel.find({}).lean();
    return res.json(departments)
}

exports.departmentsSubs = async (req, res) => {
    const isDepartmentIDValid = mongoose.Types.ObjectId.isValid(req.params.departmentID);

    if (!isDepartmentIDValid) {
        return res.json({ message: 'department id is not valid' })
    };

    const departmentsSubs = await departmentSubModel.find({ parent: req.params.departmentID }).lean();
    return res.json(departmentsSubs)
}

exports.setAnswer = async (req, res) => {
    const { title, body, ticketID } = req.body;

    const isTicketIDValid = mongoose.Types.ObjectId.isValid(ticketID);

    if (!isTicketIDValid) {
        return res.json({ message: 'ticket id is not valid' })
    };
    const ticket = await ticketModel.findOne({ _id: ticketID }).lean();

    const answer = await ticketModel.create({
        title,
        body,
        parentID: ticketID,
        isAnswer: 1,
        priority: ticket.priority,
        userID: req.user._id,
        answer: 0,
        departmentID: ticket.departmentID,
        departmentSubID: ticket.departmentSubID
    });

    await ticketModel.findOneAndUpdate({ _id: ticketID }, {
        answer: 1
    });

    return res.status(201).json(answer)
}

exports.getAnswer = async (req, res) => {
    const { ticketID } = req.params.id;

    const answers = await ticketModel.find({ isAnswer: 1, parent: ticketID }, 'title body').lean();

    return res.json(answers)
}