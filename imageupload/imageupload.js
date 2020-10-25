const Multer = require('multer');
const Utils = require('../utils');
const dir = '../imagestorage';
var fs = require('fs');


const storage = Multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, dir)
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


exports.deleteImage = (req,res)=>{

    let fileName = req.body.filename || null;

    if(!fileName){
        Utils.sendFailureResponse({error : "Invalid File name"},req,res);
        return;
    }

    let path = dir+'/'+fileName;
    fs.unlink(path, (err,data) => {
        if (err) {
            Utils.sendFailureResponse({error : "error while deleting"},req,res);
            return;
        }
        Utils.sendSuccessResponse({ successMessage : "file deleted successfully"},res);
        return;
    });

}