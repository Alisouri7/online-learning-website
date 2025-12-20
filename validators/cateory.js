const Validator = require('fastest-validator');
const v = new Validator()

const schema = {
    title: {
        type: 'string'
    },
    href: {
        type: 'string'
    }
}

const check = v.compile(schema)

module.exports = {
    check
}