import express from 'express';
import Jwt from 'jsonwebtoken';
import UserController from '../controller/user.controller';
import { auth } from '../middleware/auth';

import { SaveReqUSER, UpdateReqUSER,LogInReqUSER, DeleteUser } from "../types/request/user.request";
import { SaveUpdateResUser } from "../types/responce/user.responce";


export class UserRoute{
    router:express.Router;
    constructor(){
        this.router = express.Router();
        this.routes();
    }
          routes(){
              this.router.post('/saveuser',auth, async(req,res,next)=>{
                       try{
                           const savereq:SaveReqUSER = req.body;
                           const new_user:SaveUpdateResUser =await new UserController().saveUser(savereq);
                           res.status(200).json({
                               message: new_user
                           });

                       }catch(error){
                             next(error)
                       }
            });
            this.router.put('/updateUser',async(req,res,next)=>{
                try{
                    const updatereq:UpdateReqUSER = req.body;
                    const updateuser:SaveUpdateResUser = await new UserController().updateUser(updatereq);
                    res.status(200).json({
                        message:updateuser
                    });

                }catch(error){
                    next(error);
                }
            });
            this.router.delete("/deleteUser",auth,async(req, res, next)=>{
                try{
                      
                 const getReqId:DeleteUser = req.body;
                 const delReq = await new UserController().deletadmin(getReqId);
                 res.status(200).json({
                     message:"user is Deleted"
                 });
    
                }
                catch(error) {
                     next(error);
                }
            });
            this.router.post('/loginUser', async(req,res,next)=>{
                try{
                    const authReq: LogInReqUSER = req.body;
				const authUser = await new UserController().loginUser(authReq);
				if (authUser) {
					if (authReq.UserName === authUser.UserName && authReq.Password===authUser.Password) {
						return res.json({
							token: Jwt.sign({ _id: authUser._id }, 'this is the key'),
						});
					}
				} else {
					return res.status(400).json({
						message: 'User NOt Found',
					});
				}

                }catch(err){

                }
            })
            
            
              

        } 
        
}
  export const UserRoutesApi = new UserRoute().router;