const Validator = require('fastest-validator');
const v = new Validator();

const schema = {
    name: {
        type: 'string'
    },
    description: {
        type: 'string'
    },
    price: {
        type: 'string'
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
        type: 'string'
    },
    categoryID: {
        type: 'string'
    }
};

const check = v.compile(schema);

module.exports = {
    check
}