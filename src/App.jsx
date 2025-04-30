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
          <Link to="/convenzionati" className="text-red-600 hover:underline text-base">Servizi per Convenzionati</Link>
          <Link to="/servizi-finanziari" className="text-red-600 hover:underline text-base">La nostra offerta commerciale</Link>
          <Link to="/" className="text-red-600 hover:underline text-base">Richiesta</Link>
          <Link to="/dashboard" className="text-red-600 hover:underline text-base">Dashboard</Link>
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
          <Route path="/convenzionati" element={<Convenzionati />} />
        </Routes>
      </main>

      <a
        href="https://wa.me/393456012471"
        className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg z-50 text-sm"
        target="_blank"
        rel="noopener noreferrer"
      >
        💬 Contattaci su WhatsApp 24/7
      </a>

      <footer className="text-center py-6 text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} GS Smart Consulting x Santander Consumer Bank. All rights reserved.
      </footer>
    </div>
  );
}

function Convenzionati() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="min-h-screen p-6 sm:p-10 bg-gray-50 font-[Poppins]">
      <Helmet>
        <title>Servizi per Convenzionati | GS Smart Consulting</title>
        <meta name="description" content="Scopri come GS Smart Consulting può diventare il tuo partner unico per tutti i servizi finanziari. Affiancamento, formazione e gestione integrata." />
      </Helmet>
      <div className="max-w-4xl mx-auto bg-white border border-red-500 rounded-3xl shadow-lg p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-red-700 mb-6">Servizi Esclusivi per Convenzionati</h1>
        <p className="text-gray-700 text-base mb-6">
          Affidati completamente a GS Smart Consulting per semplificare e potenziare la tua attività. Offriamo una gestione integrata dei finanziamenti,
          affiancamento ai venditori, formazione continua e supporto documentale per garantire risultati concreti e duraturi.
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>✅ Approvazione finanziamenti direttamente in sede</li>
          <li>📈 Supporto operativo costante ai consulenti vendita</li>
          <li>🎓 Formazione tecnica e commerciale dedicata</li>
          <li>🗂️ Gestione pratica e burocrazia completamente a nostro carico</li>
          <li>🤝 Soluzioni personalizzate per ogni realtà aziendale</li>
        </ul>
      </div>
    </motion.div>
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

function PartnerApplication() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    phone: "",
    email: "",
    city: "",
    monthlySales: "",
    notes: ""
  });
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "partnerRequests"), {
        ...form,
        createdAt: serverTimestamp()
      });
      navigate("/thankyou");
    } catch (error) {
      console.error("Errore durante l'invio:", error);
      setError(true);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="flex justify-center items-center min-h-screen bg-[#fafafa] p-8 font-[Poppins]">
      <div className="w-full max-w-3xl bg-white border border-red-500 rounded-3xl shadow-lg p-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-red-700 mb-2">Richiesta di Convenzione</h1>
            <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
              Invia la tua richiesta a GS Smart Consulting in collaborazione con Santander Consumer Bank.
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <img src={logo} alt="GS Logo" className="w-16 h-16 bg-white rounded-2xl p-2 shadow-md" />
            <img src={santanderLogo} alt="Santander Logo" className="w-16 h-16 bg-white rounded-2xl p-2 shadow-md" />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input name="companyName" placeholder="Nome Concessionaria" value={form.companyName} onChange={handleChange} required className="w-full p-4 border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-red-600" />
            <input name="contactName" placeholder="Referente" value={form.contactName} onChange={handleChange} required className="w-full p-4 border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-red-600" />
            <input name="phone" placeholder="Telefono" value={form.phone} onChange={handleChange} required className="w-full p-4 border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-red-600" />
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full p-4 border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-red-600" />
            <input name="city" placeholder="Città / Provincia" value={form.city} onChange={handleChange} className="w-full p-4 border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-red-600" />
            <input name="monthlySales" placeholder="Auto vendute al mese" value={form.monthlySales} onChange={handleChange} className="w-full p-4 border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-red-600" />
          </div>
          <textarea name="notes" placeholder="Note aggiuntive (opzionale)" value={form.notes} onChange={handleChange} rows={4} className="w-full p-4 border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-red-600" />
          <button type="submit" className="w-full bg-red-600 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-red-700 transition-transform transform hover:scale-105">📩 Invia Richiesta</button>
        </form>
      </div>
    </motion.div>
  );
}

function Dashboard({ onLogout }) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const querySnapshot = await getDocs(collection(db, "partnerRequests"));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRequests(data);
    };
    fetchRequests();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="min-h-screen bg-[#fafafa] flex flex-col items-center font-[Poppins] px-4 py-12">
      <div className="w-full max-w-6xl bg-white border border-red-500 rounded-3xl shadow-lg p-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-red-700 mb-2">Dashboard Richieste</h1>
            <p className="text-gray-600 text-sm">Visualizza tutte le richieste di convenzione ricevute.</p>
          </div>
          <button onClick={onLogout} className="text-sm text-red-600 underline">Esci</button>
        </div>
        <div className="overflow-x-auto rounded-2xl shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Concessionaria</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Referente</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Telefono</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Città</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Auto/mese</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Note</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {requests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{request.companyName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{request.contactName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{request.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{request.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{request.city}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{request.monthlySales}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{request.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

function ThankYou() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="flex justify-center items-center min-h-screen bg-[#fafafa] font-[Poppins]">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-red-700 mb-4">Grazie per la tua richiesta!</h1>
        <p className="text-gray-600 text-lg mb-8">Ti ricontatteremo al più presto.</p>
        <Link to="/" className="inline-block bg-red-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-red-700 transition-transform transform hover:scale-105">
          Torna alla Home
        </Link>
      </div>
    </motion.div>
  );
}
