const path = require('path');
const multer = require('multer');
const crypto = require('crypto');


module.exports = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'public', 'videos'));
    },
    filename: (req, file, cb) => {
        const fileName = crypto.createHash('SHA256').update(file.filename).digest('hex');

        const ext = path.extname(file.originalname);

        cb(null, fileName + ext);
    }
})