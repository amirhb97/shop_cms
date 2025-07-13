const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI)
        .then(()=>console.log('connect to mongodb serivce'))
        .catch(err=>console.log("can't connect to mongodb service",`err: ${err.message}`));



