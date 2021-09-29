import { USERSchema } from "../model/user.model";
import { IUSER } from "../types/document/IUSER";
import { LogInReqUSER } from "../types/request/user.request";

export default class MainUser{
    constructor(){}
    saveUser(user:IUSER){
            return new USERSchema(user).save();
    }
    updateUser(user:IUSER){
       return  USERSchema.findByIdAndUpdate(user._id,user,{
        new: true
       });
    }
    deletUser(_id:string){
        return USERSchema.findByIdAndDelete(_id);
      } 
    loginUser(loginuser:LogInReqUSER){
       
    return  USERSchema.findOne({UserName: loginuser.UserName, Password: loginuser.Password})
    
    }
}