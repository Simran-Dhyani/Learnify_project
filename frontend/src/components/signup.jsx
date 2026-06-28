import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import authService from "../services/authService";

import Container from "../components/container/Container";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function SignUp() {

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createAccount = async (data) => {

  setError("");

  try {

    const response = await authService.register({
      ...data,
      avatar: data.avatar[0],
      coverImage: data.coverImage?.[0],
    });

    if (response) {
      navigate("/login");
    }

  } catch (e) {

    setError(
      e.response?.data?.message || "Registration failed"
    );
  }
};
  
    return (
   <div className="relative z-10 min-h-screen flex items-center justify-center text-white">


    <Container>
      <div className="flex justify-center items-center min-h-screen">
      
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-xl mx-auto"
      >

        <div
          className="
         relative
bg-[#050505]
border-[4px]
border-white
shadow-neo-brutalist
p-10
max-w-xl
w-full
rounded-2xl
          "
        >

          {/* Heading */}

          <div className="text-center mb-8">

            <h1 className="font-header
font-black
text-6xl
tracking-tighter
uppercase
leading-none">
              Create <br/>
               <span className="text-cyan-400">
               Account
               </span>
            </h1>

            <p className="text-gray-400 mt-4">
              Start your smart learning journey today
            </p>

          </div>

          {error && (
            <p className="text-red-400 text-center mb-4">
              {error}
            </p>
          )}

          <form
            onSubmit={handleSubmit(createAccount)}
            className="space-y-5"
          >

            <Input
              placeholder="Full Name"
              className="
              h-12 
        rounded-xl bg-white/10 border-white/20 text-white placeholder:text-gray-400
               focus:ring-2
                    focus:ring-cyan-500
                    hover:[1.02]
                     transition-all
                     duration-300
                    shadow-lg
                    shadow-cyan-500/30
              "
              {...register("fullname", {
                required: "Full name is required",
              })}
            />

            <Input
              placeholder="Username"
              className="
              h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-gray-400
               focus:ring-2
                    focus:ring-cyan-500
                    hover:[1.02]
                     transition-all
                     duration-300
                    shadow-lg
                    shadow-cyan-500/30
              "
              {...register("username", {
                required: "Username is required",
              })}
            />

            <Input
              type="email"
              placeholder="Email Address"
              className="
              h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-gray-400
               focus:ring-2
                    focus:ring-cyan-500
                    hover:[1.02]
                     transition-all
                     duration-300
                    shadow-lg
                    shadow-cyan-500/30"
              {...register("email", {
                required: "Email is required",
              })}
            />

            <Input
              type="password"
              placeholder="Password"
              className="
              h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-gray-400
               focus:ring-2
                    focus:ring-cyan-500
                    hover:[1.02]
                     transition-all
                     duration-300
                    shadow-lg
                    shadow-cyan-500/30"
              {...register("password", {
                required: "Password is required",
              })}
            />

            <div>
              <label className="text-sm text-gray-300">
                Avatar
              </label>

              <Input
                type="file"
                accept="image/*"
                className="
                mt-2 bg-white/10 border-white/20 text-gray-300
                 focus:ring-2
                    focus:ring-cyan-500
                    hover:[1.02]
                     transition-all
                     duration-300
                    shadow-lg
                    shadow-cyan-500/30
                "
                {...register("avatar", {
                  required: "Avatar is required",
                })}
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">
                Cover Image (Optional)
              </label>

              <Input
                type="file"
                accept="image/*"
                className="mt-2 bg-white/10 border-white/20 text-gray-300"
                {...register("coverImage")}
              />
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
rounded-xl
border-4
border-black
shadow-[6px_6px_0_0_#000]
hover:translate-x-1
hover:translate-y-1
hover:shadow-none
transition-all
              "
            >
              Create Account
            </Button>

          </form>

          <div className="mt-8 text-center">

            <p className="text-gray-400">
              Already have an account?
            </p>

            <Link
              to="/login"
              className="
              text-purple-400
              font-semibold
              hover:text-purple-300
              transition
              "
            >
              Sign In
            </Link>

          </div>

        </div>

      </motion.div>
    </div>
    </Container>
</div>
  
);
  
}

export default SignUp;