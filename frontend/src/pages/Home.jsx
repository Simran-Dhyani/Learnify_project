import React, { useEffect, useRef } from "react";
import Container from "../components/container/Container";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Cpu, 
  BookOpen, 
  Brain, 
  ArrowUpRight, 
  Play, 
  Search, 
  RefreshCw,
  Layers,
  Sparkles
} from "lucide-react";
 
gsap.registerPlugin(ScrollTrigger);
 
const ICON_COLOR_CLASSES = {
  cyan: "text-cyan-400",
  purple: "text-purple-400",
  white: "text-white",
};
 
function Home() {
  const containerRef = useRef(null);
 
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Marquee animation for the top ticker
      gsap.to(".ticker-inner", {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: "none",
      });
 
      // Brutalist card entrance animation
      gsap.from(".brutalist-card", {
        scrollTrigger: {
          trigger: ".vault-section",
          start: "top 85%",
        },
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "back.out(1.7)",
      });
 
      // Floating particles for cyber aesthetic
      gsap.to(".cyber-particle", {
        y: "random(-40, 40)",
        x: "random(-40, 40)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2
      });
 
    }, containerRef);
 
    return () => ctx.revert();
  }, []);
 
  return (
    <div ref={containerRef} className="relative min-h-screen bg-obsidian text-white overflow-x-hidden font-body selection:bg-cyan-400 selection:text-black">
      
      {/* 1. STATUS TICKER (MARQUEE) */}
      <div className="fixed top-20 left-0 right-0 z-[60] bg-cyan-400 py-3 border-y-4 border-black overflow-hidden shadow-[0_4px_0_0_#000]">
        <div className="ticker-inner flex whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-12 text-black font-black font-header text-xs tracking-[0.3em] uppercase">
              <span className="flex items-center gap-2"><Cpu className="w-4 h-4" />  Watch Videos,Take Notes</span>
              <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" />Build Your Learning Library</span>
              <span className="flex items-center gap-2"><Brain className="w-4 h-4" /> Generating Real-Time Quizzes</span>
              <span className="flex items-center gap-2"><Sparkles className="w-4 h-4" /> AI-Driven Side-by-Side Learning</span>
            </div>
          ))}
        </div>
      </div>
 
      <div className="relative z-10 pt-48 pb-20">
        
        {/* 2. HERO: THE SPLIT-SCREEN EXPERIENCE */}
        <Container>
          <div className="text-center mb-20 space-y-8">
            <div className="inline-block px-6 py-2 bg-purple-600 border-4 border-black shadow-[4px_4px_0_0_#000] font-black text-xs tracking-widest uppercase">
               Built for Students
            </div>
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-[10rem] font-black font-header tracking-tighter leading-[0.75]"
            >
              Learn Faster.
              <br />
              <span className="text-transparent stroke-text">Remember Longer.</span>
            </motion.h1>
            <p className="text-2xl text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed tracking-tight">
              Stop toggling. Watch videos and capture AI-summarized notes in one seamless, high-bandwidth environment.
            </p>
          </div>
 
          {/* SPLIT SHOWCASE MOCKUP */}
          <div className="relative group max-w-6xl mx-auto">
            <div className="absolute -inset-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 opacity-10 blur-3xl group-hover:opacity-25 transition duration-1000" />
            
            <div className="relative grid md:grid-cols-12 bg-black border-[4px] border-white shadow-neo-brutalist overflow-hidden">
              
              {/* Left Side: Video (Col 7) */}
              <div className="md:col-span-7 relative bg-graphite border-r-[4px] border-white/20 aspect-video md:aspect-auto overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 group-hover:bg-black/30 transition-colors z-20">
                  <div className="w-24 h-24 rounded-full bg-white text-black flex items-center justify-center shadow-neon-cyan hover:scale-110 transition-transform cursor-pointer">
                    <Play className="w-10 h-10 fill-current ml-1" />
                  </div>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1587691592099-24045742c181?crop=entropy&cs=srgb&fm=jpg&q=85" 
                  className="w-full h-full object-cover mix-blend-luminosity opacity-40 scale-105 group-hover:scale-100 transition-transform duration-1000"
                  alt="Video Lecture"
                />
                <div className="absolute bottom-8 left-8 right-8 z-30 p-5 bg-black/80 backdrop-blur-xl border-2 border-white/10 rounded-2xl">
                
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      animate={{ width: ["0%", "45%", "42%", "78%", "75%"] }}
                      transition={{ duration: 15, repeat: Infinity }}
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_15px_rgba(0,240,255,0.5)]" 
                    />
                  </div>
                </div>
              </div>
 
              {/* Right Side: AI Learning Workspace */}
              <div className="md:col-span-5 bg-[#050505] p-8 flex flex-col h-[600px] border-t-4 md:border-t-0 border-white/20">
 
                {/* Header */}
                <div className="flex justify-between items-center border-b border-white/10 pb-5 mb-6">
 
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
 
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-cyan-400 font-bold">
                      AI Workspace
                    </p>
 
                    <p className="text-xs text-gray-400 mt-1">
                      Machine Learning Crash Course
                    </p>
                  </div>
 
                </div>
 
                {/* Notes */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
 
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-2xl bg-white/5 border border-white/10 p-4"
                  >
                    <p className="text-cyan-400 font-semibold mb-2">
                       Session Notes
                    </p>
 
                    <ul className="space-y-3 text-gray-300 text-sm">
 
                      <li>
                        ✓ Neural Networks imitate the human brain.
                      </li>
 
                      <li>
                        ✓ Gradient Descent minimizes loss.
                      </li>
 
                      <li>
                        ✓ Backpropagation updates weights.
                      </li>
 
                      <li>
                        ✓ Overfitting occurs when a model memorizes data.
                      </li>
 
                    </ul>
                  </motion.div>
 
                  {/* AI Summary */}
 
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="rounded-2xl bg-purple-500/10 border border-purple-500/30 p-4"
                  >
 
                    <p className="text-purple-300 font-semibold mb-2">
                      ⭐ AI Summary
                    </p>
 
                    <p className="text-gray-400 text-sm leading-6">
                      Neural Networks learn by repeatedly adjusting weights using
                      Gradient Descent until prediction error becomes minimal.
                    </p>
 
                  </motion.div>
 
                  {/* Saved */}
 
                  <motion.div
                    initial={{ opacity: 0, scale: .8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                    className="rounded-2xl border border-green-500/30 bg-green-500/10 p-4 flex items-center justify-between"
                  >
 
                    <div>
 
                      <p className="text-green-400 font-semibold">
                        ✓ Notes Saved
                      </p>
 
                      <p className="text-xs text-gray-400 mt-1">
                        Added to Learning Library
                      </p>
 
                    </div>
 
                    <BookOpen className="text-green-400 w-6 h-6" />
 
                  </motion.div>
 
                </div>
 
                {/* AI Assistant */}
 
                <div className="mt-6 space-y-4">
 
                  <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4">
 
                    <div className="flex items-center gap-2 mb-4">
 
                      <Brain className="w-5 h-5 text-cyan-400" />
 
                      <span className="font-semibold">
                        AI Assistant
                      </span>
 
                    </div>
 
                    <div className="grid grid-cols-2 gap-3">
 
                      <button
                        className="
                        rounded-xl
                        border
                        border-white/10
                        py-3
                        hover:bg-white/10
                        transition
                        "
                      >
                        Generate Quiz
                      </button>
 
                      <button
                        className="
                        rounded-xl
                        border
                        border-white/10
                        py-3
                        hover:bg-white/10
                        transition
                        "
                      >
                        Explain Topic
                      </button>
 
                    </div>
 
                  </div>
 
                  <Button
                    className="
                    w-full
                    h-14
                    rounded-2xl
                    bg-cyan-400
                    text-black
                    font-bold
                    hover:bg-white
                    transition
                    "
                  >
                    Open Workspace →
                  </Button>
 
                </div>
 
              </div>
            </div>
          </div>
        </Container>
 
        {/* 3. FEATURE: THE KNOWLEDGE VAULT */}
        <section className="vault-section py-48 relative">
          {/* Cyber Particles */}
          {[...Array(6)].map((_, i) => (
            <div key={i} className="cyber-particle absolute w-1 h-1 bg-cyan-400/20 rounded-full blur-sm" 
                 style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }} />
          ))}
 
          <Container>
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-12">
                <div className="space-y-6">
                  <span className="text-purple-500 font-black font-header tracking-widest text-sm uppercase px-5 py-2 border-4 border-purple-500 bg-purple-500/10 shadow-[4px_4px_0_0_#000]">
                    Structure Over Chaos
                  </span>
                  <h2 className="text-6xl md:text-9xl font-black font-header leading-[0.8] tracking-tighter">
                    Your<br /> Learning  <br />Library.
                  </h2>
                </div>
                <p className="text-2xl text-gray-400 font-medium leading-relaxed">
                  Notes are only valuable if you can find them. We automatically index your insights into a structured, searchable neural network.
                </p>
                <div className="flex gap-16">
                   <div className="space-y-1">
                      <span className="text-5xl font-black font-header text-cyan-400">ZERO</span>
                      <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Manual Organizing</p>
                   </div>
                   <div className="space-y-1">
                      <span className="text-5xl font-black font-header text-purple-500">SYNC</span>
                      <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Native Persistence</p>
                   </div>
                </div>
              </div>
 
              <div className="grid grid-cols-2 gap-8">
                {[
                  { title: "Save Notes", icon: Layers, color: "cyan", desc: "Nested folders for topics." },
                  { title: "Watch + Notes", icon: Search, color: "purple", desc: "Search concepts, not words." },
                  { title: "My Learning Library", icon: RefreshCw, color: "white", desc: "Synced across devices." },
                  { title: "AI Quiz Generator", icon: ArrowUpRight, color: "cyan", desc: "Connected note fragments." },
                ].map((card, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -12, scale: 1.02 }}
                    className="brutalist-card p-10 bg-graphite/40 border-4 border-white shadow-neo-brutalist space-y-6 relative overflow-hidden group"
                  >
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                       <card.icon className="w-32 h-32" />
                    </div>
                    <card.icon className={`w-12 h-12 ${ICON_COLOR_CLASSES[card.color]}`} />
                    <div className="space-y-2">
                      <h3 className="text-xl font-black font-header uppercase leading-tight tracking-tight">{card.title}</h3>
                      <p className="text-xs text-gray-500 font-mono">{card.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Container>
        </section>
 
        {/* 4. FEATURE: AI ADAPTIVE QUIZZES */}
        <section className="py-48 bg-white text-black relative overflow-hidden">
          {/* Brutalist Stripe */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-cyan-400 -skew-x-12 translate-x-20 opacity-20" />
          
          <Container>
            <div className="grid lg:grid-cols-12 gap-20 items-center">
              <div className="lg:col-span-5 space-y-16 relative z-10">
                <div className="space-y-4">
                  <h2 className="text-6xl md:text-[9rem] font-black font-header tracking-tighter leading-[0.75] uppercase">
                    WATCH. <br />
                    TEST. <br />
                    <span className="text-cyan-600">RETAIN.</span>
                  </h2>
                </div>
                <p className="text-2xl font-bold leading-relaxed tracking-tight">
                  Active recall is built-in. AI converts your learning sessions into interactive quizzes, identifying exactly where your knowledge gaps are.
                </p>
                <div className="flex items-center gap-6 group cursor-pointer">
                   <div className="w-20 h-20 bg-black text-white flex items-center justify-center border-4 border-black shadow-[6px_6px_0_0_#000] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
                      <RefreshCw className="w-10 h-10" />
                   </div>
                   <span className="text-xl font-black tracking-tighter uppercase">GENERATE TOPIC QUIZ</span>
                </div>
              </div>
 
              <div className="lg:col-span-7 relative">
                <div className="absolute -inset-4 border-4 border-black opacity-10 rotate-2 translate-x-4" />
                <div className="relative p-12 bg-white border-[6px] border-black shadow-[20px_20px_0_0_#000]">
                  <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white">
                         <Brain className="w-6 h-6" />
                      </div>
                      <span className="font-black font-header tracking-widest uppercase text-sm">Assessment_1</span></div>
                  <div className="px-4 py-1 border-2 border-black font-mono text-[10px] font-black uppercase">Timer: 00:45
                    </div> </div>
 
                  <div className="space-y-12">
                    <h3 className="text-4xl font-black leading-[1.1] tracking-tight">
                      In the context of Attention, what does the 'Softmax' function primarily determine?
                    </h3>
                    
                    <div className="grid gap-5">
                      {[
                        "The maximum value of the input vector",
                        "Probability distribution over input tokens",
                        "The speed of gradient backpropagation",
                        "Memory allocation for query vectors"
                      ].map((ans, i) => (
                        <button key={i} className="group w-full p-8 text-left border-[4px] border-black font-black text-xl flex justify-between items-center hover:bg-black hover:text-white transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-[4px_4px_0_0_#000] hover:shadow-[8px_8px_0_0_#000]">
                          <span className="flex gap-6">
                             <span className="text-gray-400">0{i+1}</span>
                             {ans}
                          </span>
                          <div className="w-8 h-8 border-4 border-black rounded-full group-hover:border-white transition-colors relative">
                             <div className="absolute inset-1 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
       </div>
       </div>
  );
}
 
export default Home;
 