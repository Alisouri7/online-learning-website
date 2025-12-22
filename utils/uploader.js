const path = require('path');
const multer = require('multer');


module.exports = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'public', 'courses', 'covers'))
    },
    
})