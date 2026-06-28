import React from "react";
import {Login as LoginComponent} from "../components/index";
import AnimatedBackground from "@/components/background/animatedBackground";
function Login(){
    return(
     
          <div className="relative min-h-screen bg-obsidian overflow-hidden">
    

    <AnimatedBackground/>
    <div className="relative z-10">

   

       <LoginComponent/>

</div>
    

</div>
    )
}
export default Login;