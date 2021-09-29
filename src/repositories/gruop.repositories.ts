import { GroupSchema } from "../model/group.model";
import { IGROUP } from "../types/document/IGROUP";
import { SaveGruopReq } from "../types/request/group.request";


export default class MainGruop{
    constructor(){}
    saveGroup(gruop:SaveGruopReq){
            return new GroupSchema(gruop).save();
    }
    
    deletGroup(_id:string){
        return GroupSchema.findByIdAndDelete(_id);
      } 
    
    addMemberToGroup(_id:string){
        return GroupSchema.findById(_id);
    }
    returnMessages(_id:string){
      return GroupSchema.findById(_id);
    }
    saveMessage(id:string){
      return GroupSchema.findById(id);
}

    }