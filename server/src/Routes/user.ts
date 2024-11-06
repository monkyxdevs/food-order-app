import express, { Request, Response } from "express";
import { any, z } from "zod";
import { Account, User, Wallet } from "../db";
import * as jwt from "jsonwebtoken";
import { SECRET } from "../config";
import { authenticateJWT } from "../middleware";


export const userRouter = express.Router();

const signupBody = z.object({
    username: z.string().email(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
});

userRouter.post("/signup", async (req : Request, res: Response ) => {
    try {
        const result = signupBody.safeParse(req.body);

        if (!result.success) {
            return res.status(411).json({
                message: "Email already taken | Incorrect input!",
            });
        }

        const existingUser = await User.findOne({
            username: req.body.username,
        });

        if (existingUser) {
            return res.status(411).json({
                message: "Email already taken | Incorrect input!",
            });
        }

        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });
        const userId = user._id;

        const account = await Account.create({
            userId,
            balance : 1 + Math.random() *10000
        })
        const userAccountInfo = account.balance

        const token = jwt.sign({ userId }, SECRET);

        res.json({
            userId:userId,
            message: "Account Created Successfully",
            userAccountInfo,
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

const signinBody = z.object({
    username:z.string().email(),
    password:z.string()
})

userRouter.post("/signin",async(req,res)=>{
    try {
        const { success } = signinBody.safeParse(req.body)
        if (!success) {
            return res.status(411).json({
                message: "Email already taken / Incorrect inputs"
            })
        }
        const user = await User.findOne({
            username: req.body.username,
            password:req.body.password
        });
        const userId = user?._id;
        const account = await Account.findOne({
            userId
        })

        const userAccountInfo = account?.balance;

        if (user) {
            const token = jwt.sign({
                userId:user._id
            },SECRET);
            const userId = user._id;
            return res.json({
                token,
                userId:userId,
                userAccountInfo:userAccountInfo

            })
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
const updateBody = z.object({
	password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
})

userRouter.put("/", authenticateJWT, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Error while updating information"
        })
    }
    await User.updateOne(req.body, {
        id: req.userId
    })
    res.json({
        message: "Updated successfully"
    })
});

const walletBody = z.object({
    pin:z.number().optional()
})

userRouter.post("/wallet",async(req:Request,res:Response)=>{
    // const { success } = walletBody.safeParse(req.body)
    // if (!success) {
    //     return res.status(411).json({
    //         message: "Error while updating information"
    //     })
    // }
    await Wallet.create({
        userId:req.body.userId,
        pin:req.body.pin
    })
    res.json({
        messsage:"Pin Created Successfully",
    })
})

userRouter.post("/wallet/pin",async(req:Request,res:Response)=>{
    // const { success } = walletBody.safeParse(req.body)
    // if (!success) {
    //     return res.status(411).json({
    //         message: "Error while updating information"
    //     })
    // }
    const verify =await Wallet.findOne({
        userId:req.body.userId,
        pin:req.body.pin
    })
    if (verify) {
        res.json({
            messsage:"Pin Enter Correctly..",
        })
    }else{
        res.json().status(403).send({error:"Pin is incorrext"})
    }
})