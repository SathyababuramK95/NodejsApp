const mongoose = require('mongoose');


let Schema = mongoose.Schema;


let LoginSessionSchema = new Schema({

    useruid : {
        type: Schema.ObjectId,
        required: true,
        reference: 'User'
    },
    token : {
        type : String,
        required : true
    },
    loggedinat : {
        type : Date,
        required : true
    },
    logoutat : Date,
    isactive : Boolean
});

module.exports = mongoose.model('LoginSession',LoginSessionSchema);