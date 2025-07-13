
function notFound(req,res,next){
    res.status(404).json({
        status : res.statusCode,
        error : {
            message : `آدرس ${req.url} پیدا نشد!`
        }
    });
}

function errorsHandler(err,req,res,next){
    res.statusCode = err.status || err.statusCode || 500;
    res.json({
        status : res.statusCode,
        error:{
            message : err.message || 'خطای داخلی'
        }
    });
}

module.exports = {
    notFound,
    errorsHandler
}