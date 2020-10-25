const Multer = require('multer');
const Utils = require('../utils');

const storage = Multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../imagestorage')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
   
const upload = Multer({ storage: storage }).array('imageupload');

function Uploader(req, res, callback) {
    upload(req, res, function (err) {
        if(err){
            callback(err,[])
            return;
        };
        callback(null,req.file);
        return;
     });
 }
exports.multiImageUpload = (req,res)=>{

    Uploader(req,res,(err,successdata) =>{
        if(err){
            Utils.sendFailureResponse({error: "Error while file upload"},req,res,err)
            return;
        }
        Utils.sendSuccessResponse({ successMessage : "file uploaded successfully"},res);
        return;
    })
}

