// src/components/LoginScreen.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { easeOut, motion, type Transition, type Variants } from "framer-motion";

// Importa le icone
import { FaLock, FaEnvelope, FaTrophy } from 'react-icons/fa'; 

// Importazioni Shadcn UI
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import stadiumBackgroundDark from '../assets/images/soccer-field.jpg';

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call or login logic
    console.log("Tentativo di Login:", email);
    // Placeholder login - redirect to dashboard
    navigate("/"); // Reindirizza alla Home/Dashboard dopo il login
  };

  // Varianti Framer Motion per un ingresso più fluido
  const cardVariants: Variants = { 
    hidden: { opacity: 0, y: 70, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: easeOut, delay: 0.1 } as Transition }, 
  };

  const trophyVariants: Variants = { 
    hidden: { scale: 0, rotate: -180 },
    visible: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 180, damping: 12, delay: 0.4 } as Transition }, 
  };

  const inputVariants: Variants = { 
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: easeOut } as Transition }, 
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gray-950 font-sans">
      {/* Sfondo più evocativo: campo da calcio notturno */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 transform scale-105" 
        style={{
          backgroundImage: `url(${stadiumBackgroundDark})`
        }}
      />
      {/* Overlay scuro con gradiente verso il verde e leggero rumore */}
      {/* Ho intensificato leggermente il gradiente per un effetto più profondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-green-950/70 backdrop-brightness-75 z-0 grain-overlay" />

      {/* Bagliore dinamico dal basso (luci effetto stadio) */}
      {/* Ho reso il bagliore leggermente più grande e visibile */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 md:w-3/5 h-1/3 bg-green-500/15 blur-3xl animate-pulse-stadium-light z-0"></div>

      {/* Card di Login */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="z-10 w-full max-w-sm sm:max-w-md lg:max-w-lg 
                   bg-gray-900/70 backdrop-blur-xl 
                   border border-green-700/40 rounded-xl shadow-2xl 
                   p-6 sm:p-8 md:p-10 
                   relative overflow-hidden group hover:border-green-600/60 transition-all duration-300" 
      >
        {/* Effetto bordo luminoso sottile (simulazione) */}
        <div className="absolute inset-0 rounded-xl pointer-events-none">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-green-400/10 via-green-400/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <Card className="bg-transparent border-none shadow-none text-white relative z-20"> 
          <CardHeader className="text-center pb-8 sm:pb-10">
            <div className="flex justify-center mb-8 sm:mb-10">
              <motion.div
                variants={trophyVariants}
                initial="hidden"
                animate="visible"
                className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-green-600 to-lime-600 rounded-full flex items-center justify-center shadow-lg
                             border-2 border-green-400/80 transform-gpu" 
              >
                <FaTrophy className="w-12 h-12 sm:w-14 sm:h-14 text-white filter drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]" /> 
              </motion.div>
            </div>
            <CardTitle className="text-4xl sm:text-5xl font-black text-green-300 tracking-wide mb-2
                                 [text-shadow:_0_0_10px_rgba(74,222,128,0.7),_0_0_20px_rgba(74,222,128,0.5)]">
              Elysian Cup
            </CardTitle>
            <CardDescription className="text-md sm:text-lg italic opacity-90 text-gray-300">
              Accedi al tuo account per gestire la tua squadra
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6 sm:space-y-8">
              <motion.div variants={inputVariants} className="space-y-2 relative">
                <Label htmlFor="email" className="text-gray-200">Email</Label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="nome@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-800/70 border-gray-700 text-white placeholder-gray-500
                               focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-base"
                  />
                </div>
              </motion.div>
              <motion.div variants={inputVariants} className="space-y-2 relative">
                <Label htmlFor="password" className="text-gray-200">Password</Label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="La tua password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-800/70 border-gray-700 text-white placeholder-gray-500
                               focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-base"
                  />
                </div>
              </motion.div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-lime-500 text-white
                           font-extrabold text-lg sm:text-xl py-3 sm:py-4 rounded-md shadow-lg hover:shadow-2xl
                           hover:from-green-600 hover:to-lime-600 transition-all duration-300 uppercase
                           focus:ring-4 focus:ring-green-500/60 active:scale-[0.98] transform-gpu" 
              >
                Accedi
              </Button>
            </form>
            <div className="mt-6 sm:mt-8 text-center space-y-3"> 
              <a href="#" className="text-md text-green-400 hover:underline hover:text-green-300 transition-colors duration-200">
                Password dimenticata?
              </a>
              <p className="text-sm text-gray-400">
                Non hai un account?{" "}
                <a onClick={() => navigate("/register")} className="cursor-pointer text-green-400 hover:underline hover:text-green-300 transition-colors duration-200">
                  Registrati
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginScreen;