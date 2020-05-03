const express = require('express');
const routes = express.Router();
const UserModel = require('../model/user');
const  {registerValidation , loginValidation}  =  require('../validation/userValidation')
const bcrypt = require('bcrypt');
const JWT  = require('jsonwebtoken')

routes.post('/register' , (req, res)=>{
    let {error}  = registerValidation(req.body)
    if(error){
        res.json(error)
    }else{
        /**
         * checking if user already exists 
         */
        UserModel.findOne({email :req.body.email})
        .then((data)=>{
            if(data){
                throw new Error('user already exist')
            }
            else{
                let saltNumber = 10;
                return  new Promise((resolve, reject)=>{
                        bcrypt.hash(req.body.password , saltNumber , (err , hash)=>{
                        if(err){
                            reject(err);
                        }
                        else{
                            resolve(hash);
                        }
                    })
                })
            }
        }).then((hashpassword)=>{
            let newUser = new UserModel({...req.body ,password : hashpassword})
            return newUser.save()
        })
        .then((data)=>{
            res.send("new User added in DB");
        })
        .catch((err)=>{
            console.log("error")
            res.send(err.message);
        })
    }
})


routes.post('/login' , (req, res)=>{

    /**
     * validating login input
     */
    let {error}  = loginValidation(req.body)
    if(error){
        res.json(error);
    }else{
        /**
         * checking if user exist 
         */
        UserModel.findOne({email : req.body.email})
        .then((user)=>{
          if(!user){
              throw new Error("user does not exist");
          }
          else{
              return new Promise((resolve , reject)=>{
                bcrypt.compare(req.body.password , user.password, (err , result)=>{
                  resolve({isValid: result , user :  user})  
                })
              })
          }
        })
        .then((result)=>{
            if(!result.isValid){
                throw new Error('Incorrect password');
            }
            else{
            /**
             * create and assign token
             */
            const token = JWT.sign({_id : result.user._id} , "secretKey")
            res.header('auth-token' , token).send(token);
            }
        })
        .catch((err)=>{
            res.send(err.message);
        })
    }

})



module.exports = routes;