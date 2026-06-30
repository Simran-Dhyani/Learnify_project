import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "../container/Container";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import LogOutBtn from "./LogOut";
import { Zap } from "lucide-react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  console.log("Header authStatus:", authStatus);

  return (
    <header className="sticky top-0 left-0 right-0 z-[100] backdrop-blur-2xl bg-black border-b border-white/5">
      <Container>
        <div className="flex items-center justify-between py-6">
          {/*  LOGO */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative group"
          >
            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-black font-header tracking-tighter"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-900 to-purple-900 flex items-center justify-center shadow-neon-cyan/20 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-6 h-6 text-black fill-current" />
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white  to-cyan-900 group-hover:to-purple-950 transition-all duration-500 uppercase">
                LEARNIFY
              </span>
            </Link>
          </motion.div>

          {/*  BUTTONS */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-6"
          >
            {!authStatus ? (
              <>
                <Link
                  to="/login"
                  className="text-sm font-bold tracking-widest text-gray-400 hover:text-white transition-colors uppercase"
                >
                  Sign In
                </Link>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    className="h-12 px-8 rounded-xl bg-cyan-400 text-black font-black hover:bg-white shadow-neon-cyan/20 transition-all duration-300"
                    asChild
                  >
                    <Link to="/signup">SIGN UP</Link>
                  </Button>
                </motion.div>
              </>
            ) : (
              <div className="flex items-center gap-6">
                <Link
                  to="/dashboard"
                  className="text-sm font-bold tracking-widest text-gray-400 hover:text-white transition-colors uppercase"
                >
                  Workspace
                </Link>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOutBtn />
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
