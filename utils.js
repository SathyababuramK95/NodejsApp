function sendSuccessResponse(data,res) {
    res.status(200).json(data);
}

function sendFailureResponse(data,req,res,error) {
    if(error){
        data.technicalError = error;
    }
    res.status(500).json(data);
}
exports.sendSuccessResponse = sendSuccessResponse;
exports.sendFailureResponse = sendFailureResponse;