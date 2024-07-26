import { user } from '../model/userType';
import  express  from 'express';
import {v4 as uuid} from 'uuid'

const userRouter = express.Router();

userRouter.post("/",(req,res)=>{
    const {name,username}=req.body;

    const index=user.findIndex(user=>user.username===username);
    if(index>-1){
        return res.status(404).json({error: "Usuário já existe"});
}
    const newUser={
        id:uuid(),
        name,
        username,
        technologies:[]
    }
    user.push(newUser);
    res.status(201).json({client: newUser});
})

export default userRouter;