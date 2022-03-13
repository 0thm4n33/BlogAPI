const express = require('express');
const mongoose = require('mongoose');
const multer = require('./middleware/multer-config');
const app = express();
const path = require('path');
const blogRouter = require('./routes/article');
const userRouter = require('./routes/user');
const categoryRouter = require('./routes/category');

//Acces base de donnee
mongoose.connect('mongodb+srv://root:essaidi1@cluster0.pyrpn.mongodb.net/Blog?retryWrites=true&w=majority',
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
).then(()=>{
    console.log('connexion avec la base de donnee etablit !!' )
}).catch(error =>{
    console.log('connexion echouee\n '+error)
});



//regler le probleme CROS
app.use((req,res,next)=>{
   res.setHeader('Access-Control-Allow-Origin','*');
   res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH, OPTIONS');
   console.log('header setted');
   next();
});

//Limit JSON
app.use(express.json({limit: '50mb'}));

//routes
app.use('/blog/category',categoryRouter);
app.use('/blog',blogRouter);
app.use('/user',userRouter);
app.use('/assets',express.static(path.join(__dirname,'assets')));

module.exports = app;