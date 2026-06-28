
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import authService from "../services/authService";
import { login } from "../store/authSlice";

import Container from "../components/container/Container";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const LoginUser = async (data) => {
    setError("");

    try {
      const response = await authService.login({
        email: data.email,
        password: data.password,
      });

      if (response) {
        dispatch(login(response.user));
        navigate("/dashboard");
      }
    } catch (e) {
      setError(
        e.response?.data?.message || "Login failed"
      );
    }
  };

  return (
   

      <Container>

        <motion.div
         initial={{
    opacity:0,
    scale:0.85,
   
}}

animate={{
    opacity:1,
    scale:1,
   
}}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full mx-auto max-w-md"
        >

          <div
            className="
            bg-black/20
            backdrop-blur-xl
            border-4
            border-white
            shadow-neo-brutalist
            rounded-3xl
           
            "
          >

            

            <div className="text-center mb-8">

              <h1
                className="
               font-header text-4xl font-black tracking-tight uppercase
                "
              >
                Welcome <br/>Back!!
              </h1>

              <p className="text-gray-400 mt-4">
                Continue your smart learning journey
              </p>

            </div>

            {/* Error */}

            {error && (
              <div
                className="
                  bg-red-500/10
                  border
                  border-red-500/20
                  text-red-400
                  rounded-xl
                  p-3
                  text-center
                  mb-5
                "
              >
                {error}
              </div>
            )}

            {/* Form */}

            <form
              onSubmit={handleSubmit(LoginUser)}
              className="space-y-5"
            >

              <div>

                <label className="text-gray-300 text-sm">
                  Email
                </label>

                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="
                mt-2
                    h-12
                    bg-white/5
                    border-white/10
                    text-white
                    placeholder:text-gray-500
                    rounded-xl
                    focus:ring-2
                    focus:border-cyan-400
                    hover:[1.02]
                     transition-all
                     duration-300
                  "
                  {...register("email", {
                    required: "Email is required",
                    validate: {
                      matchPattern: (value) =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                          value
                        ) || "Enter valid email",
                    },
                  })}
                />

                {errors.email && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.email.message}
                  </p>
                )}

              </div>

              <div>

                <label className="text-gray-300 text-sm">
                  Password
                </label>

                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="
                    mt-2
                    h-12
                    bg-white/5
                    border-white/10
                    text-white
                    placeholder:text-gray-500
                    rounded-xl
                    focus:ring-2
                    focus:border-cyan-400
                    hover:[1.02]
                     transition-all
                     duration-300
                    
                   
                  "
                  {...register("password", {
                    required: "Password is required",
                  })}
                />

                {errors.password && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.password.message}
                  </p>
                )}

              </div>

              <Button
                type="submit"
                className="
                 w-full
h-14
bg-cyan-400
text-black
font-black
uppercase
tracking-wider
border-4
border-black
hover:bg-white
transition-all
rounded-lg
hover:translate-x-1
hover:translate-y-1
                "
              >
                Sign In
              </Button>

            </form>

            <p className="text-center text-gray-400 mt-8">

              Don't have an account?{" "}

              <Link
                to="/signup"
                className="
                  text-purple-400
                  font-semibold
                  hover:text-purple-300
                "
              >
                Sign Up
              </Link>

            </p>

          </div>

        </motion.div>

      </Container>

    
  );
}

export default Login;
