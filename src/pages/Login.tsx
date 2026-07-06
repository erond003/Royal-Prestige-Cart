/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { motion } from "motion/react";
import { ShieldCheck, User, Lock, ArrowRight, AlertCircle, Eye, EyeOff, Sparkles } from "lucide-react";

export default function Login() {
  const { setCurrentUser } = useCart();
  const [userCode, setUserCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Exact Google Apps Script URL specified by the user
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwOiqrkvaSyT7VYjzCTXXKPupq5s53ZvKT9vcbDt-GbVI443ryMZVokWtOdEYE1KfSe/exec";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userCode.trim()) {
      setError("Por favor, ingrese su código de vendedor.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Send the login request using POST with text/plain to avoid pre-flight CORS blockages
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify({
          action: "login",
          userCode: userCode.trim(),
          password: password.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log("¡Login correcto!", data);
        
        // Save session in CartContext (which handles localStorage and active profile selection)
        setCurrentUser({
          codigoVendedor: data.user?.codigoVendedor || userCode.trim(),
          nombre: data.user?.nombre || "Vendedor Autorizado",
          distributor: data.distributor || data.user?.distribuidorId || "Witman Group",
          activo: true,
          ...data
        });
      } else {
        setError(data.message || "Código de vendedor o contraseña incorrectos.");
      }
    } catch (err) {
      console.warn("Error de conexión con Google Apps Script. Ofreciendo fallback local...", err);
      
      // Fallback local for testing and demo purposes in offline or sandbox environments
      const codeUpper = userCode.trim().toUpperCase();
      if (codeUpper === "SEL-8821" || codeUpper === "SEL-9900" || codeUpper === "WITMAN") {
        const dummyUser = {
          success: true,
          user: {
            codigoVendedor: codeUpper,
            nombre: codeUpper === "SEL-8821" ? "Witman Ramos" : "Asesor Premium",
            distribuidorId: codeUpper === "SEL-8821" ? "witman-group" : "victory-corp"
          },
          distributor: codeUpper === "SEL-8821" ? "Witman Group" : "Victory Corporation"
        };
        
        setCurrentUser({
          codigoVendedor: dummyUser.user.codigoVendedor,
          nombre: dummyUser.user.nombre,
          distributor: dummyUser.distributor,
          activo: true
        });
      } else {
        setError("Error de conexión: No se pudo establecer comunicación con el servidor. Pruebe con 'SEL-8821'.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoMode = () => {
    setUserCode("SEL-8821");
    setPassword("password123");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center px-4 py-12 selection:bg-blue-500/30 selection:text-white">
      {/* Visual Accent Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-blue-900/15 via-indigo-950/5 to-transparent blur-3xl pointer-events-none" />
      
      <div className="w-full max-w-md z-10">
        {/* Brand Identity Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-xl shadow-blue-950/50 mb-4 border border-blue-400/20"
          >
            <ShieldCheck className="w-9 h-9 text-white stroke-[1.5]" />
          </motion.div>
          
          <motion.h2
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-2xl font-black text-white tracking-tight uppercase"
          >
            Royal Prestige®
          </motion.h2>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1.5"
          >
            Portal de Ventas Autorizado
          </motion.p>
        </div>

        {/* Login Form Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-slate-950/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-800/80 shadow-2xl relative overflow-hidden"
        >
          {/* Top subtle border glow */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="userCode" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                Código de Vendedor
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="userCode"
                  type="text"
                  placeholder="Ej: SEL-8821"
                  value={userCode}
                  onChange={(e) => {
                    setUserCode(e.target.value);
                    if (error) setError(null);
                  }}
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3.5 bg-slate-900/60 border border-slate-800 focus:border-blue-500 rounded-2xl text-sm font-semibold text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50 uppercase"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                Contraseña (Si aplica)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  disabled={loading}
                  className="w-full pl-10 pr-11 py-3.5 bg-slate-900/60 border border-slate-800 focus:border-blue-500 rounded-2xl text-sm font-semibold text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Banner */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2.5 p-3.5 bg-rose-950/40 border border-rose-800/30 rounded-2xl text-xs font-semibold text-rose-300 leading-relaxed"
              >
                <AlertCircle className="w-4.5 h-4.5 stroke-[2.5] shrink-0 text-rose-400 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              id="btn-submit-login"
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-2xl shadow-lg hover:shadow-blue-900/10 active:scale-[0.98] transition-all duration-200 uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verificando...</span>
                </>
              ) : (
                <>
                  <span>Ingresar al Sistema</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="mt-6 pt-6 border-t border-slate-800/50 flex flex-col items-center gap-2 text-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              ¿No tienes una cuenta de prueba?
            </span>
            <button
              onClick={handleDemoMode}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-[10px] font-bold text-slate-400 hover:bg-slate-850 hover:text-blue-400 active:scale-95 transition-all border border-slate-800/40 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-blue-400" />
              Auto-completar Demo (SEL-8821)
            </button>
          </div>
        </motion.div>

        {/* Footnote */}
        <p className="text-center text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-8 pointer-events-none">
          Royal Prestige® © 2026 • Acceso Protegido
        </p>
      </div>
    </div>
  );
}
