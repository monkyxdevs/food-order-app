<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom";
import {Button, Heading,  InputBox,  SubHeading } from "./AuthComponent";
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export const Signin = () => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    return(
        <div className="bg-slate-950 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-96 text-center p-2 h-max px-10">
                <Heading label={"Signin"}/>  
                <SubHeading label={"Enter your infromation to create an account"}/>
                <InputBox label={"Username"} placeholder={"Enter your username.."} onChange={(e :any)=>setUsername(e.target.value)}/>
                <InputBox label={"Password"} placeholder={"Enter your password.."} onChange={(e :any)=>setPassword(e.target.value)}/>
                <Button label={"Signin"} onClick={()=>{
                    console.log("button clicked");
                    axios.post("http://localhost:3000/api/m3/user/signin",{
                        username,
                        password
                    }).then(res=>{
                        if (res) {
                            console.log(res.data);
                            toast.success("Signin Successfull..")
                            const data = res.data
                            localStorage.setItem("token",data.token);
                            localStorage.setItem("userId",data.userId);
                            localStorage.setItem("balance",data.userAccountInfo);
                            localStorage.setItem("balance",data.userAccountInfo);
                            navigate("/home?id="+ data.userId);
                        }
                    }).catch(err=>console.error("Something Error occured!",err)
                    )
                }} />
                <div>
                    <div>Don't have an Account</div>
                    <Link className="pointer underline pl-1 cursor-pointer" to={"/signup"}>
                        Signin
                    </Link>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
=======
import { Link } from "react-router-dom";
import {Button, Heading,  InputBox,  SubHeading } from "./AuthComponent";

export const Signin = () => {
    return(
        <div className="bg-slate-950 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-96 text-center p-2 h-max px-10">
                <Heading label={"Signin"}/>  
                <SubHeading label={"Enter your infromation to create an account"}/>
                <InputBox label={"Username"} placeholder={"Enter your username.."}/>
                <InputBox label={"Password"} placeholder={"Enter your password.."}/>
                <Button label={"Signin"} />
                <div>
                    <div>Don't have an Account</div>
                    <Link className="pointer underline pl-1 cursor-pointer" to={"/signup"}>
                        Signin
                    </Link>
                    </div>
                </div>
            </div>
        </div>
    );
>>>>>>> 61fdff0a553d8ab22090404d4345fd223233ab3b
}