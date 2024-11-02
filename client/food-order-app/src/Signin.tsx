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
}