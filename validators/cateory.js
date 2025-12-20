const Validator = require('fastest-validator');
const v = new Validator()

const schema = v.schema({
    title: {
        type: 'string'
    },
    href: {
        type: 'string'
    }
})

const check = v.compile(schema)

module.exports = {
    check
}