const Validator = require('fastest-validator')
const v = new Validator()

const schema = {
    username: {
        type: 'string',
        min: 3,
        max: 100
    },
    name: {
        type: 'string',
        min: 3,
        max: 255
    },
    email: {
        type: 'email',
        min: 10,
        max: 100
    },
    password: {
        type: 'string',
        min: 8,
        max: 24
    },
    phone: {
        type: 'string'
    },
    confirmPassword: {
        type: 'equal',
        field: 'password'
    },
    role: {
        type: 'string'
    },
    $$strict: true
};

const check = v.compile(schema);

module.exports = {
    check
}