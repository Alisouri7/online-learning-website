const Validator = require('fastest-validator');
const v = new Validator()

const schema = {
    title: {
        type: 'string'
    },
    description: {
        type: 'string'
    },
    price: {
        type: 'number'
    },
    support: {
        type: 'string'
    },
    href: {
        type: 'string'
    },
    status: {
        type: 'string'
    },
    discount: {
        type: 'number'
    },
    categoryID: {
        type: 'string'
    }
};

const check = v.compile(schema);

module.exports = {
    check
}