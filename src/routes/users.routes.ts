// Authentication
import express, { Request, Response } from "express";

import auth from "../firebase/auth"

import authSchema from "../schemas-joi/users.schemajoi"
import validator from '../utilities/validator'

import { collectionUsers } from "../services/database.service";

export const authRouter = express.Router();
authRouter.use(express.json());

authRouter.post('/signin', validator.body(authSchema), async (req: Request, res: Response)=>{
    try{
        const { email, password } = req.body;
        const result = await auth.createUser(email,password);
        await collectionUsers.users.insertOne({ email, password }); // guado el usuario en mi base de datos en mongo
        res.status(201).send(result);
    }catch(error){
        res.status(500).send(error.message);
    }
})

authRouter.post('/login',validator.body(authSchema), async (req: Request, res: Response)=>{
    try{
        const { email, password } = req.body;
        const result = await auth.login(email,password);
        res.status(201).send(result);
    }catch(error){
        res.status(500).send(error.message);
    }
})