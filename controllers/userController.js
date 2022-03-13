const user = require('../models/user');

exports.login = (req,res,next)=>{
    console.log('user controller: '+req.body.email);
    user.findOne(
        {email : req.body.email}).
        then((user)=>{
            if(!user){
                res.status(404).json({
                    message: 'user not found',
                })
            }
            else if(user.password === req.body.password){
                res.status(201).json({
                    user: JSON.stringify(user)
                })
            }
            else{
                res.status(404).json({
                    message: 'password incorrect'
                })
            }
        }).
        catch(err=>{
            res.status(500).json({
                error: err
            })
        })
}