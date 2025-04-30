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
        <title>Servizi Finanziari | Leasing, Nautica, Arredo, Prestiti</title>
        <meta
          name="description"
          content="Scopri le nostre soluzioni: leasing auto, finanziamenti per la nautica, per l’arredo, prestiti personali e servizi dedicati alle concessionarie. Servizi su misura per privati e aziende."
        />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen bg-[#fafafa] p-6 sm:p-10"
      >
        <div className="max-w-4xl mx-auto bg-white border border-red-500 rounded-3xl shadow-lg p-6 sm:p-10 space-y-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-red-700">Servizi Finanziari Personalizzati</h1>

          <section>
            <h2 className="text-xl font-bold text-red-600 mb-2">🚘 Finanziamenti Auto</h2>
            <p className="text-gray-700">
              Proponiamo finanziamenti su misura per l’acquisto di auto nuove, usate e a km0, con gestione in sede e assistenza al punto vendita. Offriamo strumenti di simulazione e preventivazione immediata per aumentare la competitività dei partner automotive.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-red-600 mb-2">🛥️ Finanziamenti Nautica</h2>
            <p className="text-gray-700">
              Finanziamo l’acquisto di barche, gommoni, motori marini e accessori nautici. Soluzioni flessibili, rapide e pensate per chi vive il mare, sia a livello amatoriale che professionale.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-red-600 mb-2">🪑 Finanziamenti Arredo</h2>
            <p className="text-gray-700">
              Supportiamo mobilifici e clienti finali nell’acquisto di arredamento completo. Offriamo soluzioni di finanziamento personalizzate con gestione documentale semplificata e tempi di approvazione rapidi.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-red-600 mb-2">👛 Prestiti Personali</h2>
            <p className="text-gray-700">
              Offriamo prestiti personali anche non finalizzati, con tassi competitivi e la possibilità di gestire tutta la pratica online. Ideali per esigenze familiari, progetti personali o spese improvvise.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-red-600 mb-2">🏠 Cessione del Quinto</h2>
            <p className="text-gray-700">
              Soluzioni dedicate a dipendenti e pensionati per ottenere liquidità trattenuta direttamente dalla busta paga o pensione. Nessuna necessità di garante, con piani comodi e trasparenti.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-red-600 mb-2">📄 Finanziamenti Aziendali</h2>
            <p className="text-gray-700">
              Affianchiamo le imprese nell’ottenere credito per sviluppo, acquisto attrezzature, ristrutturazioni o capitale circolante. Supporto nella presentazione documentale e accesso a soluzioni agevolate.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-red-600 mb-2">🏢 Servizi per Concessionarie</h2>
            <p className="text-gray-700">
              Sviluppiamo partnership con concessionarie per offrire finanziamenti direttamente in sede, con strumenti digitali, gestione documentale esterna e formazione continua. Aumenta le vendite offrendo soluzioni rapide e professionali ai tuoi clienti.
            </p>
          </section>
        </div>
      </motion.div>
    </>
  );
}


function Concessionarie() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50 font-[Poppins]">
      <div className="w-full max-w-4xl bg-white border-2 border-red-500 rounded-3xl shadow-lg p-10">
        <h1 className="text-4xl font-extrabold text-red-700 mb-6">Servizi Finanziari Integrati per Concessionarie</h1>
        <p className="text-gray-600 text-lg mb-8">Offriamo soluzioni finanziarie su misura per concessionarie che desiderano <strong>aumentare le vendite e fidelizzare i clienti</strong>. Con il nostro supporto, potrai proporre <strong>finanziamenti in sede</strong> rapidi e personalizzati.</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
          <li>✅ Finanziamenti approvati direttamente in showroom</li>
          <li>📈 Incremento delle chiusure vendita con soluzioni flessibili</li>
          <li>🔐 Gestione documentale completamente a nostro carico</li>
          <li>🧰 Integrazione semplice con CRM e gestionali</li>
          <li>🤝 Formazione e supporto al team vendite</li>
        </ul>
        <div className="bg-red-50 p-6 rounded-xl text-center">
          <p className="text-lg font-semibold text-red-700 mb-4">
            📩 Contattaci oggi stesso per migliorare l'efficienza commerciale della tua concessionaria!
          </p>
        </div>
      </div>
    </motion.div>
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

function Dashboard() {
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
          <div className="flex gap-4 items-center">
            <img src={logo} alt="GS Logo" className="w-16 h-16 bg-white rounded-2xl p-2 shadow-md" />
            <img src={santanderLogo} alt="Santander Logo" className="w-16 h-16 bg-white rounded-2xl p-2 shadow-md" />
          </div>
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

