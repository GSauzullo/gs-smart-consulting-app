import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { db } from "./firebase";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import logo from "./logo.png";
import santanderLogo from "./santander.png";
import "@fontsource/poppins/600.css";
import "./index.css";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(() => {
    return localStorage.getItem("authorized") === "true";
  });

  const handleAccess = () => {
    if (password === "Napoli.1926") {
      localStorage.setItem("authorized", "true");
      setAuthorized(true);
    } else {
      alert("Password errata. Riprova.");
      setPassword("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authorized");
    setAuthorized(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-red-600 text-white font-[Poppins]">
        <img src={logo} alt="Logo" className="w-24 h-24 mb-4 animate-pulse" />
        <h1 className="text-2xl font-bold">Benvenuto su GS Smart Consulting</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-[Poppins]">
      <nav className="bg-white border-b-2 border-red-600 px-6 py-4 flex flex-wrap justify-between items-center shadow-md">
        <div className="text-2xl font-bold text-red-700">GS Smart Consulting</div>
        <div className="flex flex-wrap gap-4 mt-2 sm:mt-0">
          <Link to="/" className="text-red-600 hover:underline text-base">Richiesta</Link>
          <Link to="/dashboard" className="text-red-600 hover:underline text-base">Dashboard</Link>
          <Link to="/servizi-finanziari" className="text-red-600 hover:underline text-base">Servizi Finanziari</Link>
        </div>
      </nav>

      <main className="p-4 sm:p-6">
        <Routes>
          <Route path="/" element={<PartnerApplication />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/dashboard" element={
            authorized ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <div className="flex flex-col items-center justify-center min-h-screen p-6">
                <h1 className="text-2xl font-bold mb-4 text-red-700">Area Riservata</h1>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Inserisci la password"
                  className="border rounded-lg p-2 mb-4 w-64"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAccess();
                  }}
                />
                <button
                  onClick={handleAccess}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg"
                >
                  Accedi
                </button>
              </div>
            )
          } />
          <Route path="/servizi-finanziari" element={<ServiziFinanziari />} />
        </Routes>
      </main>

      <footer className="text-center py-6 text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} GS Smart Consulting x Santander Consumer Bank. All rights reserved.
      </footer>
    </div>
  );
}

function ServiziFinanziari() {
  return (
    <>
      <Helmet>
        <title>Servizi Finanziari | Tutte le Soluzioni per Privati e Convenzionati</title>
        <meta
          name="description"
          content="Affidati a GS Smart Consulting per soluzioni finanziarie totali: leasing auto, noleggio a lungo termine, prestiti personali, nautica, arredo e supporto alle concessionarie."
        />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen bg-[#fafafa] p-6 sm:p-10"
      >
        <div className="max-w-4xl mx-auto bg-white border border-red-500 rounded-3xl shadow-lg p-6 sm:p-10 space-y-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-red-700">Servizi Finanziari Personalizzati e Totali</h1>

          <p className="text-gray-700 text-base leading-relaxed">
            GS Smart Consulting è il tuo partner completo per ogni esigenza finanziaria. Offriamo un pacchetto unico e integrato per aziende e privati, con gestione pratica, formazione e assistenza commerciale per i convenzionati.
          </p>

          <section>
            <h2 className="text-xl font-bold text-red-600 mb-2">🚘 Finanziamenti Auto</h2>
            <p className="text-gray-700">Soluzioni per auto nuove, usate e km0, con strumenti digitali per la gestione della vendita e approvazione in sede.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-red-600 mb-2">📅 Noleggio a Lungo Termine</h2>
            <p className="text-gray-700">Offerte su misura per privati e aziende, con veicoli dotati di pacchetti completi: manutenzione, assicurazione e assistenza.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-red-600 mb-2">🛥️ Finanziamenti Nautica</h2>
            <p className="text-gray-700">Finanziamenti per l’acquisto di barche e accessori nautici con soluzioni rapide, dedicate al settore marittimo.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-red-600 mb-2">🪑 Finanziamenti Arredo</h2>
            <p className="text-gray-700">Supporto per l’acquisto di arredamento per privati e negozi, con pratiche semplificate e rate personalizzate.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-red-600 mb-2">👛 Prestiti Personali</h2>
            <p className="text-gray-700">Prestiti veloci per ogni esigenza, anche senza finalità specifica, 100% digitali e con tempi di risposta immediati.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-red-600 mb-2">🏢 Servizi per Convenzionati</h2>
            <p className="text-gray-700">Un ecosistema completo per le aziende affiliate: affiancamento al team vendite, gestione documentale, formazione e CRM integrato.</p>
          </section>
        </div>
      </motion.div>
    </>
  );
}

