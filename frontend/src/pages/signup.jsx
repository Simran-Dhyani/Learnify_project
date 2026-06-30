import React from "react";
import {SignUp as SignUpComponent}from "../components/index";
import AnimatedBackground from "@/components/background/AnimatedBackground";
function SignUp(){
    return (
     
    <div className="relative min-h-screen bg-black overflow-hidden">

       <AnimatedBackground/>
        <SignUpComponent/>

      </div>
    )

}
export default SignUp;