const path = require('path');
const multer = require('multer');
const crypto = require('crypto');   //use for hashing filename

module.exports = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, path.join(__dirname, '..', 'public', 'courses', 'covers'))

    },
    filename: (req, file, cb) => {
        // const fileName = Date.now() + String((Math.random() * 9999));
        
        const fileName = crypto
            .createHash('SHA256')             //creates a hash object with the specified algorithm
            .update(file.originalname)        //updates the hash content with the given data
            .digest("hex")                    //calculates the digest and outputs it in the specified format

        const ext = path.extname(file.originalname);

        cb(null, fileName, ext);
    }
})