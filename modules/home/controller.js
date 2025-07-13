const Controller = require('../controller');

class HomeController {
    async showHomepage(req,res,next){
        try {
            res.render('home/index',{title:'صفحه اصلی'});
        } catch (error) {
            next(error);
        }
    }
}


module.exports = new HomeController();