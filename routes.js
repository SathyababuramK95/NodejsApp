module.exports = function(router) {
    let User = require('./user/user');
    let imageUpload = require('./imageupload/imageupload');
    
    //User
    router.post('/user/registeruser', User.registerUser);
    router.post('/user/loginuser', User.loginUser);
    router.get('/user/getuserdata/:useruid',User.getUserData);
    router.put('/user/modifyuserdata/:useruid',User.modifyUserData);


    //image upload
    router.post('/image/imageupload', imageUpload.multiImageUpload);
    router.post('/image/deleteimage', imageUpload.deleteImage);


}