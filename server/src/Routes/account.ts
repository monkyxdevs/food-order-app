import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { Account } from "../db";
export const accountRouter = express.Router();

accountRouter.post("/transfer",async(req:Request,res:Response)=>{
    const session = await mongoose.startSession();
    try {
        const { amount, userId } = req.body;
        session.startTransaction();

        const account = await Account.findOne({
            userId,
        }).session(session);

        if (account?.balance < amount || !account) {
            await session.abortTransaction();
            return res.status(400).json({message:"Insufficient balance!"})
        }

        await Account.updateOne(
            {userId : userId},
            {$inc:{balance:-amount}}
        ).session(session);

        await session.commitTransaction();
        res.json({message:"Transfer sucessfully"})
    } catch (error) {
        if (session) {
            await session.abortTransaction();
        }
        res.status(500).json({ error: "Internal server error" });
    } finally {
        await session.endSession();
    }
})