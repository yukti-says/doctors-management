import multer from 'multer'

// disk storage confi

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
    callback(null, "./uploads/"); // local uploads folder
  },
    filename: function (req, file, callback) {
        callback(null,file.originalname)
    }
})


// instance of this multer

const upload = multer({ storage });

// export this upload
export default upload;