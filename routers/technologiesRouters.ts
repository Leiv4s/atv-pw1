import checkExistsUserAccount from '../middlewares/checkExistsUserAccount';
import { user } from '../model/userType';
import  express  from 'express';
import {v4 as uuid} from 'uuid';

const technolgiesRouter = express.Router();

technolgiesRouter.get("/",checkExistsUserAccount,(req,res)=>{
    const {username}=req.headers;

    const userIndex=user.findIndex(user=>user.username===username);

    res.status(200).json({technologies:user[userIndex].technologies})
});
technolgiesRouter.post("/",checkExistsUserAccount,(req,res)=>{
    const {title,deadline}=req.body;
    const {username}=req.headers;

    const userIndex=user.findIndex(user=>user.username===username);

    const newTechnology={
        id:uuid(),
        title,
        studied:false,
        deadline:new Date(deadline),
        created_at:new Date()
    }
    user[userIndex].technologies.push(newTechnology);
    res.status(201).json({
        technolgy:newTechnology
    })
});

technolgiesRouter.put("/:id",checkExistsUserAccount,(req,res)=>{
    const {username}=req.headers;
    const id=req.params.id;
    const {title,deadline}=req.body;

    const usuario=user.find(user=>user.username===username)
    const tecnologia=usuario?.technologies.find(tech=>tech.id===id);
    if(!tecnologia){
        return res.status(404).json({error:'Mensagem de erro'});
    }
    tecnologia.title=title;
    tecnologia.deadline=deadline;
    return res.status(200).json({
        tecnologia
    });
});

technolgiesRouter.patch("/:id/studied",checkExistsUserAccount,(req,res)=>{
    const username=req.header('username');
    const id=req.params.id;

    const usuario=user.find(user=>user.username===username)
    const tecnologia=usuario?.technologies.find(tech=>tech.id===id);
    if(!tecnologia){
        return res.status(404).json({error:'Mensagem de erro'});
    }
    tecnologia.studied=true;
    return res.status(200).json("mudança feita com sucesso")
});

technolgiesRouter.delete("/:id",checkExistsUserAccount,(req,res)=>{
    const username=req.header('username');
    const id=req.params.id;

    const userIndex=user.findIndex(user=>user.username===username)
    const tecnologiaIndex=user[userIndex].technologies.findIndex(tech=>tech.id===id);
    if(tecnologiaIndex===-1){
        return res.status(404).json({error:'Mensagem de erro'});
    }
    user[userIndex].technologies.splice(tecnologiaIndex,1)
    return res.status(200).json(user[userIndex].technologies)
})

export default technolgiesRouter;