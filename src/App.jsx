import React, { useState } from 'react';
import { 
  Sparkles, Smartphone, Users, TrendingUp, CheckCircle, 
  Target, Check, Lightbulb, BarChart3, ArrowLeft
} from 'lucide-react';
import { SELLERS, ORDERS, PRODUCTS_CATALOG, CIDS_METRICS, INITIAL_COST_STRUCTURE } from './data';
import SellerAppView from './components/SellerAppView';
import MarketingCockpitView from './components/MarketingCockpitView';
import DirectionView from './components/DirectionView';
import { trackReturnToCV, trackRoleSwitch } from './utils/analytics';

export default function App() {
  const [activeRole, setActiveRole] = useState('seller_app'); // 'seller_app' | 'marketing' | 'direction'
  const [sellersList, setSellersList] = useState(SELLERS);
  const [currentSellerId, setCurrentSellerId] = useState(SELLERS[0].id);
  const [sellerInputMode, setSellerInputMode] = useState('menu'); // 'menu' | 'camera' | 'manual' | 'success'
  
  // Bascule globale : Chiffres bruts vs Graphes & Visualisations
  const [showCharts, setShowCharts] = useState(true);

  // Structure des charges modifiable avec double-confirmation
  const [costStructure, setCostStructure] = useState(INITIAL_COST_STRUCTURE);

  const [prospectViewMode, setProspectViewMode] = useState('month'); // 'week' | 'month'
  const [newProspectModalOpen, setNewProspectModalOpen] = useState(false);
  const [newProspectName, setNewProspectName] = useState('');
  const [newProspectPhone, setNewProspectPhone] = useState('');
  const [newProspectType, setNewProspectType] = useState('Maquis & Grillades');

  const [manualChicken, setManualChicken] = useState(12);
  const [manualPork, setManualPork] = useState(8);
  const [manualVeg, setManualVeg] = useState(6);
  const [manualCash, setManualCash] = useState(78500);
  const [manualOM, setManualOM] = useState(45000);
  const [manualMoov, setManualMoov] = useState(15000);
  
  const [isScanningPhoto, setIsScanningPhoto] = useState(false);
  const [ocrDetectedData, setOcrDetectedData] = useState(null);

  const [activeTab, setActiveTab] = useState('sellers'); 
  const [stockPeriod, setStockPeriod] = useState('month');
  const [ordersList, setOrdersList] = useState(ORDERS);
  const [toastMessage, setToastMessage] = useState(null);

  // Objectifs financiers ViabiTarget globaux (Semaine / Mois / Trimestre / Année)
  const [financialTargets, setFinancialTargets] = useState({
    week: 1145833,
    month: 4583333,
    quarter: 13750000,
    year: 55000000
  });

  const currentSeller = sellersList.find(s => s.id === currentSellerId) || sellersList[0];

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSendSatisfaction = (orderId, clientName, phone) => {
    const text = encodeURIComponent(
      `Bonjour ${clientName}, l'équipe Dynamic Agro espère que votre livraison vous a donné entière satisfaction. Que pensez-vous de la qualité de nos produits du Sanguié ? Vos retours nous aident à soutenir nos producteurs locaux. Merci de votre fidélité.`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
    setOrdersList(prev => prev.map(o => o.id === orderId ? { ...o, satisfactionSent: true } : o));
    showToast(`Message de suivi envoyé à ${clientName}`);
  };

  const triggerSellerOcrScan = () => {
    setIsScanningPhoto(true);
    setTimeout(() => {
      setIsScanningPhoto(false);
      setOcrDetectedData({
        chicken: 14,
        porkKg: 8,
        vegBaskets: 6,
        cash: 78500,
        om: 45000,
        moov: 15000,
        total: 138500
      });
    }, 1600);
  };

  const confirmOcrData = () => {
    setSellerInputMode('success');
    showToast(`Rapport de tournée de ${currentSeller.name} enregistré avec succès`);
  };

  const submitManualData = (e) => {
    e.preventDefault();
    setSellerInputMode('success');
    showToast(`Déclaration manuelle de ${currentSeller.name} validée`);
  };

  const handleAddProspect = (e) => {
    e.preventDefault();
    if (!newProspectName) return;
    setSellersList(prev => prev.map(s => {
      if (s.id === currentSeller.id) {
        return {
          ...s,
          prospectsDoneMonth: s.prospectsDoneMonth + 1,
          prospectsDoneWeek: s.prospectsDoneWeek + 1,
          recentProspects: [newProspectName + ' (' + newProspectType + ')', ...(s.recentProspects || [])]
        };
      }
      return s;
    }));
    showToast(`Compte "${newProspectName}" enregistré au profil de ${currentSeller.name}`);
    setNewProspectName('');
    setNewProspectPhone('');
    setNewProspectModalOpen(false);
  };

  const totalDailyRevenue = sellersList.reduce((acc, s) => acc + s.cashCollected + s.orangeMoney + s.moovMoney, 0);
  const totalOrangeMoney = sellersList.reduce((acc, s) => acc + s.orangeMoney, 0);
  const totalMoovMoney = sellersList.reduce((acc, s) => acc + s.moovMoney, 0);
  const totalChickensSold = sellersList.reduce((acc, s) => acc + s.itemsSold.chicken, 0);
  const totalProspectsTeamMonth = sellersList.reduce((acc, s) => acc + s.prospectsDoneMonth, 0);
  const totalProspectsTeamTarget = sellersList.reduce((acc, s) => acc + s.prospectsTargetMonth, 0);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-emerald-800 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
          <CheckCircle className="w-5 h-5 text-emerald-300" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* TOPBAR BANNER DISCRET */}
      <div className="bg-slate-900 text-white text-xs px-4 py-2 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="bg-emerald-600 text-white font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
            Prototype Fonctionnel
          </span>
          <span className="text-slate-400 hidden sm:inline">•</span>
          <span className="text-slate-300">
            Poste visé : <strong>Responsable Marketing & Relation Client</strong> — Dynamic Agro / Centre d'Initiatives pour le Développement Solidaire (CIDS-Burkina)
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-slate-400 text-[11px] hidden md:block">
            Filières du Sanguié • Centrale de Zagtouli
          </div>
          <a
            href="https://cv-francois-kinda-cids-burkina.synaps-lab4dev.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackReturnToCV()}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300 transition-colors px-3 py-1 rounded border border-slate-700 text-xs font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>CV François KINDA</span>
          </a>
        </div>
      </div>

      {/* HEADER DE NAVIGATION PRINCIPALE (SANS EMOJIS) */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-700 flex items-center justify-center text-white shadow-sm shadow-emerald-700/30">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black text-slate-900 tracking-tight">
                  Dynamic <span className="text-emerald-700">Agro</span> Hub
                </h1>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  Démo Live
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Ouagadougou • Zagtouli • Incubateur Agribusiness Sanguié (CIDS-Burkina)
              </p>
            </div>
          </div>

          {/* SÉLECTEUR DE PERSPECTIVES & BASCULE GRAPHES */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* BOUTON BASCULE GRAPHES VISUELS / CHIFFRES BRUTS */}
            <button
              type="button"
              onClick={() => {
                const nextState = !showCharts;
                setShowCharts(nextState);
                showToast(nextState ? "Visualisations graphiques activées" : "Mode chiffres bruts activé");
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                showCharts
                  ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300'
              }`}
              title="Basculer entre les chiffres bruts et les graphiques visuels"
            >
              <BarChart3 className={`w-3.5 h-3.5 ${showCharts ? 'text-amber-300' : 'text-slate-500'}`} />
              <span>{showCharts ? 'Graphes : Activés' : 'Graphes : Désactivés'}</span>
            </button>

            {/* SÉLECTEUR DE PERSPECTIVES AVEC ICONES FLAT */}
            <div className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200">
              <button
                onClick={() => { setActiveRole('seller_app'); trackRoleSwitch('seller_app'); }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeRole === 'seller_app'
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>App Vendeur Terrain</span>
              </button>
              <button
                onClick={() => { setActiveRole('marketing'); setActiveTab('sellers'); trackRoleSwitch('marketing'); }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeRole === 'marketing'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Cockpit Marketing & Ventes</span>
              </button>
              <button
                onClick={() => { setActiveRole('direction'); setActiveTab('stocks'); trackRoleSwitch('direction'); }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeRole === 'direction'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Direction & CIDS-Burkina</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* VUES PERSPECTIVES */}
      {activeRole === 'seller_app' && (
        <SellerAppView 
          currentSeller={currentSeller}
          sellersList={sellersList}
          currentSellerId={currentSellerId}
          setCurrentSellerId={setCurrentSellerId}
          prospectViewMode={prospectViewMode}
          setProspectViewMode={setProspectViewMode}
          sellerInputMode={sellerInputMode}
          setSellerInputMode={setSellerInputMode}
          ocrDetectedData={ocrDetectedData}
          setOcrDetectedData={setOcrDetectedData}
          isScanningPhoto={isScanningPhoto}
          triggerSellerOcrScan={triggerSellerOcrScan}
          confirmOcrData={confirmOcrData}
          manualChicken={manualChicken}
          setManualChicken={setManualChicken}
          manualPork={manualPork}
          setManualPork={setManualPork}
          manualVeg={manualVeg}
          setManualVeg={setManualVeg}
          manualCash={manualCash}
          setManualCash={setManualCash}
          manualOM={manualOM}
          setManualOM={setManualOM}
          manualMoov={manualMoov}
          setManualMoov={setManualMoov}
          submitManualData={submitManualData}
          setNewProspectModalOpen={setNewProspectModalOpen}
        />
      )}

      {activeRole === 'marketing' && (
        <MarketingCockpitView 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sellersList={sellersList}
          totalDailyRevenue={totalDailyRevenue}
          totalOrangeMoney={totalOrangeMoney}
          totalMoovMoney={totalMoovMoney}
          totalChickensSold={totalChickensSold}
          totalProspectsTeamMonth={totalProspectsTeamMonth}
          totalProspectsTeamTarget={totalProspectsTeamTarget}
          ordersList={ordersList}
          handleSendSatisfaction={handleSendSatisfaction}
          setCurrentSellerId={setCurrentSellerId}
          setActiveRole={setActiveRole}
          showCharts={showCharts}
          costStructure={costStructure}
          financialTargets={financialTargets}
          setFinancialTargets={setFinancialTargets}
        />
      )}

      {activeRole === 'direction' && (
        <DirectionView 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          stockPeriod={stockPeriod}
          setStockPeriod={setStockPeriod}
          totalDailyRevenue={totalDailyRevenue}
          totalOrangeMoney={totalOrangeMoney}
          totalMoovMoney={totalMoovMoney}
          totalChickensSold={totalChickensSold}
          sellersList={sellersList}
          financialTargets={financialTargets}
          setFinancialTargets={setFinancialTargets}
          costStructure={costStructure}
          setCostStructure={setCostStructure}
          showCharts={showCharts}
          showToast={showToast}
        />
      )}

      {/* FOOTER SOBRE */}
      <footer className="bg-white border-t border-slate-200 py-3 text-center text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span><strong>Dynamic Agro Hub</strong> — Outil de pilotage commercial et relation client</span>
          <span className="text-slate-400 text-[11px]">Centre d'Initiatives pour le Développement Solidaire (CIDS-Burkina) • Zagtouli & Sanguié</span>
        </div>
      </footer>

      {/* MODALE D'AJOUT RAPIDE D'UN PROSPECT TERRAIN */}
      {newProspectModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-900">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">Nouveau Prospect Rencontré</h4>
                  <p className="text-[10px] text-slate-500">Enregistrer un maquis ou client potentiel</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setNewProspectModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProspect} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Nom du Maquis / Commerce / Client :
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Maquis Le Calao, Rôtisserie du Rond-point..."
                  value={newProspectName}
                  onChange={(e) => setNewProspectName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium text-xs focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Type d'établissement :
                </label>
                <select
                  value={newProspectType}
                  onChange={(e) => setNewProspectType(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium text-xs focus:outline-none"
                >
                  <option value="Maquis & Grillades">Maquis & Grillades (Besoin porc & poulet)</option>
                  <option value="Rôtisserie">Rôtisserie de quartier (Grosses commandes)</option>
                  <option value="Restaurant / Fast-food">Restaurant / Fast-food</option>
                  <option value="Particulier / Famille">Particulier / Famille (Paniers bio)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Numéro de contact (Optionnel) :
                </label>
                <input
                  type="tel"
                  placeholder="Ex: 70 12 34 56"
                  value={newProspectPhone}
                  onChange={(e) => setNewProspectPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium text-xs focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="bg-amber-50 border border-amber-200/80 p-2.5 rounded-xl text-[10px] text-amber-900 font-medium flex items-start gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                <span>Ce prospect sera rattaché à votre compte ({currentSeller.name}) et comptabilisé pour votre prime d'atteinte d'objectifs.</span>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setNewProspectModalOpen(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md flex items-center justify-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Enregistrer (+1)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
