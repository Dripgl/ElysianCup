// src/components/RegisterScreen.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { easeOut, motion, type Transition, type Variants } from "framer-motion";

// Importa le icone da React Icons (Font Awesome)
import { FaLock, FaEnvelope, FaUser, FaTrophy } from 'react-icons/fa'; // <-- NUOVE IMPORTAZIONI

// Importazioni Shadcn UI
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import stadiumBackgroundDark from '../assets/images/soccer-field.jpg';

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0); 
  const navigate = useNavigate();

  // Funzione per valutare la forza della password
  const evaluatePasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length > 5) strength += 1;
    if (pwd.length > 8) strength += 1;
    if (/[A-Z]/.test(pwd)) strength += 1; 
    if (/[0-9]/.test(pwd)) strength += 1; 
    if (/[^A-Za-z0-9]/.test(pwd)) strength += 1; 

    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    evaluatePasswordStrength(newPassword); 
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 0: return "bg-gray-400"; 
      case 1: return "bg-red-500"; 
      case 2: return "bg-orange-400"; 
      case 3: return "bg-yellow-400"; 
      case 4: return "bg-green-500"; 
      case 5: return "bg-green-600"; 
      default: return "bg-gray-400";
    }
  };

  const getStrengthWidth = () => {
    return `${(passwordStrength / 5) * 100}%`; 
  };

  const getStrengthText = () => {
    switch (passwordStrength) {
      case 0: return "";
      case 1: return "Molto debole";
      case 2: return "Debole";
      case 3: return "Media";
      case 4: return "Forte";
      case 5: return "Molto forte";
      default: return "";
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Le password non corrispondono!");
      return;
    }
    if (passwordStrength < 3) { 
      alert("La password è troppo debole. Scegli una password più forte.");
      return;
    }
    console.log("Tentativo di Registrazione:", username, email);
    navigate("/login");
  };

  // Varianti Framer Motion
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
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 transform scale-105"
        style={{ backgroundImage: `url(${stadiumBackgroundDark})` }}
      />
      {/* Ho intensificato leggermente il gradiente per un effetto più profondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-green-950/70 backdrop-brightness-75 z-0 grain-overlay" />
      
      {/* Ho reso il bagliore leggermente più grande e visibile */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 md:w-3/5 h-1/3 bg-green-500/15 blur-3xl animate-pulse-stadium-light z-0"></div>

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
                {/* Usa FaTrophy invece di Trophy */}
                <FaTrophy className="w-12 h-12 sm:w-14 sm:h-14 text-white filter drop-shadow-[0_0_15px_rgba(255,255,255,0.9)]" />
              </motion.div>
            </div>
            <CardTitle className="text-4xl sm:text-5xl font-black text-green-300 tracking-wide mb-2
                                 [text-shadow:_0_0_10px_rgba(74,222,128,0.7),_0_0_20px_rgba(74,222,128,0.5)]">
              Registrati
            </CardTitle>
            <CardDescription className="text-md sm:text-lg italic opacity-90 text-gray-300">
              Crea il tuo account qui!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-6 sm:space-y-8">
              {/* Campo Username */}
              <motion.div variants={inputVariants} className="space-y-2 relative">
                <Label htmlFor="username" className="text-gray-200">Username</Label>
                <div className="relative">
                  {/* Usa FaUser invece di User */}
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Il tuo username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-800/70 border-gray-700 text-white placeholder-gray-500
                               focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-base"
                  />
                </div>
              </motion.div>
              {/* Campo Email */}
              <motion.div variants={inputVariants} className="space-y-2 relative">
                <Label htmlFor="email" className="text-gray-200">Email</Label>
                <div className="relative">
                  {/* Usa FaEnvelope invece di Mail */}
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
              {/* Campo Password */}
              <motion.div variants={inputVariants} className="space-y-2 relative">
                <Label htmlFor="password" className="text-gray-200">Password</Label>
                <div className="relative">
                  {/* Usa FaLock invece di Lock */}
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Scegli una password forte"
                    value={password}
                    onChange={handlePasswordChange} 
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-800/70 border-gray-700 text-white placeholder-gray-500
                               focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-base"
                  />
                </div>
                {/* Barra di sicurezza password */}
                {password.length > 0 && (
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-700">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ease-out ${getStrengthColor()}`}
                      style={{ width: getStrengthWidth() }}
                    ></div>
                  </div>
                )}
                {password.length > 0 && (
                  <p className={`text-xs mt-1 ${getStrengthColor().replace('bg-', 'text-')}`}>
                    Forza password: {getStrengthText()}
                  </p>
                )}
              </motion.div>
              {/* Campo Conferma Password */}
              <motion.div variants={inputVariants} className="space-y-2 relative">
                <Label htmlFor="confirmPassword" className="text-gray-200">Conferma Password</Label>
                <div className="relative">
                  {/* Usa FaLock invece di Lock */}
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Ripeti la password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                Registrati
              </Button>
            </form>
            <div className="mt-6 sm:mt-8 text-center space-y-3">
              <p className="text-sm text-gray-400">
                Hai già un account?{" "}
                <a onClick={() => navigate("/login")} className="cursor-pointer text-green-400 hover:underline hover:text-green-300 transition-colors duration-200">
                  Accedi qui
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegisterScreen;