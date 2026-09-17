import React, { useState, useEffect } from 'react';
import { 
  Target, TrendingUp, AlertTriangle, CheckCircle2, 
  Layers, ArrowUpRight, DollarSign, Calendar, Cpu, Sparkles,
  Calculator, HelpCircle, ArrowRight
} from 'lucide-react';
import { COST_STRUCTURE, PRODUCTS_CATALOG } from '../data';

export default function DecisionTools({ 
  defaultTool = 'viabitarget',
  financialTargets,
  setFinancialTargets,
  costStructure = COST_STRUCTURE
}) {
  const [activeTool, setActiveTool] = useState(defaultTool); // 'viabitarget' | 'rentasim'
  
  // ==========================================
  // 1. ÉTAT VIABITARGET (Objectifs de Viabilité)
  // ==========================================
  const [viabiPeriod, setViabiPeriod] = useState('month'); // 'week' | 'month' | 'quarter' | 'year'
  const currentFixedTotal = costStructure?.fixedMonthlyCharges?.totalFixed || COST_STRUCTURE.fixedMonthlyCharges.totalFixed;
  const [fixedChargesInput, setFixedChargesInput] = useState(currentFixedTotal);
  const [desiredSurplus, setDesiredSurplus] = useState(500000); // Bénéfice net visé au-dessus du point mort

  useEffect(() => {
    if (costStructure?.fixedMonthlyCharges?.totalFixed) {
      setFixedChargesInput(costStructure.fixedMonthlyCharges.totalFixed);
    }
  }, [costStructure?.fixedMonthlyCharges?.totalFixed]);

  const periodMultiplier = viabiPeriod === 'week' ? 0.25 : viabiPeriod === 'month' ? 1 : viabiPeriod === 'quarter' ? 3 : 12;
  const avgMarginRate = 0.36; // 36% marge nette moyenne

  const adjustedFixedCharges = Math.round(fixedChargesInput * periodMultiplier);
  const adjustedDesiredSurplus = Math.round(desiredSurplus * periodMultiplier);
  
  // Seuil de rentabilité (Point Mort zéro profit zéro perte)
  const breakEvenRevenue = Math.round(adjustedFixedCharges / avgMarginRate);
  
  // Cible de Chiffre d'Affaires pour être viable avec excédent
  const targetViableRevenue = Math.round((adjustedFixedCharges + adjustedDesiredSurplus) / avgMarginRate);

  // Conversion en quotas physiques équilibrés
  const chickenTarget = Math.round((targetViableRevenue * 0.45) / 3500);
  const porkKgTarget = Math.round((targetViableRevenue * 0.35) / 3000);
  const vegBasketTarget = Math.round((targetViableRevenue * 0.20) / 4000);

  const applyTargetToDashboard = () => {
    if (setFinancialTargets) {
      setFinancialTargets(prev => ({
        ...prev,
        [viabiPeriod]: targetViableRevenue
      }));
    }
  };

  // ==========================================
  // 2. ÉTAT RENTASIM (Simulation d'Investissement / Dépense)
  // ==========================================
  const [simMode, setSimMode] = useState('pre_decision'); // 'pre_decision' (avant d'acheter) | 'post_acquisition' (déjà engagé)
  const [expenseTitle, setExpenseTitle] = useState('Prestation Branding / Shooting & Campagne Graphique');
  const [expenseAmount, setExpenseAmount] = useState(350000);
  const [amortizationMonths, setAmortizationMonths] = useState(2);
  const [surplusAllocationPercent, setSurplusAllocationPercent] = useState(60);

  // Marge excédentaire disponible
  const baseSurplus = costStructure?.monthlyNetSurplus ?? COST_STRUCTURE.monthlyNetSurplus;
  const monthlyAvailableSurplus = Math.round(baseSurplus * (surplusAllocationPercent / 100));
  const monthsToAbsorb = (expenseAmount / (monthlyAvailableSurplus || 1)).toFixed(1);
  const revenueToGenerateForExpense = Math.round(expenseAmount / avgMarginRate);
  const isSimViable = parseFloat(monthsToAbsorb) <= amortizationMonths;

  return (
    <div className="space-y-6">
      {/* HEADER NAV OUTILS */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider bg-slate-900 text-white px-2 py-0.5 rounded">
              Ingénierie Décisionnelle
            </span>
            <span className="text-xs font-bold text-emerald-700">Opérations • Marketing • Finances</span>
          </div>
          <h3 className="text-base font-black text-slate-900 mt-1">
            {activeTool === 'viabitarget' 
              ? 'ViabiTarget — Cible de CA & Point Mort de Viabilité Opérationnelle'
              : 'RentaSIM — Simulateur d\'Amortissement de Dépenses & Prestations'}
          </h3>
          <p className="text-xs text-slate-500">
            {activeTool === 'viabitarget'
              ? 'Calculez la cible de chiffre d\'affaires exacte pour couvrir 100% de vos charges et générer l\'excédent souhaité.'
              : 'Simulez l\'impact financier d\'une prestation de service ou d\'un équipement pour valider le retour sur investissement.'}
          </p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-2xl text-xs font-bold shrink-0">
          <button
            onClick={() => setActiveTool('viabitarget')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
              activeTool === 'viabitarget' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>ViabiTarget</span>
          </button>
          <button
            onClick={() => setActiveTool('rentasim')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
              activeTool === 'rentasim' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>RentaSIM</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. VIABITARGET : CALCULATEUR DE VIABILITE & SEUIL CRITIQUE                 */}
      {/* ========================================================================= */}
      {activeTool === 'viabitarget' && (
        <div className="space-y-6">
          {/* SÉLECTEUR DE CADENCE TEMPORELLE VIABITARGET */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-slate-200 shadow-xs">
            <div>
              <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">
                Maille Temporelle de Calcul
              </h4>
              <p className="text-xs text-slate-500">
                Fragmentez vos objectifs financiers en cibles opérationnelles directement actionnables sur le terrain.
              </p>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-2xl text-xs font-bold shrink-0">
              <button
                onClick={() => setViabiPeriod('week')}
                className={`px-3 py-1.5 rounded-xl transition-colors ${viabiPeriod === 'week' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
              >
                Semaine
              </button>
              <button
                onClick={() => setViabiPeriod('month')}
                className={`px-3 py-1.5 rounded-xl transition-colors ${viabiPeriod === 'month' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
              >
                Mois
              </button>
              <button
                onClick={() => setViabiPeriod('quarter')}
                className={`px-3 py-1.5 rounded-xl transition-colors ${viabiPeriod === 'quarter' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
              >
                Trimestre
              </button>
              <button
                onClick={() => setViabiPeriod('year')}
                className={`px-3 py-1.5 rounded-xl transition-colors ${viabiPeriod === 'year' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
              >
                Année
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ENTRÉES & CHARGES */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">
                Charges & Objectif de Surplus
              </h4>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Charges Fixes Mensuelles Globales (FCFA) :
                  </label>
                  <input
                    type="number"
                    step="25000"
                    value={fixedChargesInput}
                    onChange={(e) => setFixedChargesInput(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-xs"
                  />
                  <div className="text-[10px] text-slate-400 mt-1">
                    Énergie Zagtouli (240k), Loyer (180k), Salaires (550k), Motos (85k), Pub (95k)
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Bénéfice Net Visé au-dessus du Seuil (FCFA/mois) :
                  </label>
                  <input
                    type="number"
                    step="50000"
                    value={desiredSurplus}
                    onChange={(e) => setDesiredSurplus(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-xs text-emerald-700"
                  />
                  <div className="text-[10px] text-slate-400 mt-1">
                    Excédent conservé pour réserves, investissements ou primes de performance.
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
                  <div className="font-bold text-slate-800">Charges calculées sur la {viabiPeriod} :</div>
                  <div className="flex justify-between">
                    <span>Charges fixes :</span>
                    <strong className="text-slate-900">{adjustedFixedCharges.toLocaleString()} FCFA</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Surplus attendu :</span>
                    <strong className="text-emerald-700">{adjustedDesiredSurplus.toLocaleString()} FCFA</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* SEUIL CRITIQUE ET CIBLE DE VIABILITÉ */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Cible ViabiTarget ({viabiPeriod})
                </span>
                <span className="text-[10px] font-black bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full">
                  Taux marge : 36%
                </span>
              </div>

              <div className="space-y-3">
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center space-y-1">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Point Mort Critique (Zéro Bénéfice)</div>
                  <div className="text-xl font-black text-slate-700">{breakEvenRevenue.toLocaleString()} FCFA</div>
                  <div className="text-[10px] text-slate-500">Couvre exactement 100% des frais généraux</div>
                </div>

                <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-300 text-center space-y-1 shadow-2xs">
                  <div className="text-[10px] uppercase font-black text-emerald-800">Cible de Viabilité Optimale</div>
                  <div className="text-3xl font-black text-emerald-900">{targetViableRevenue.toLocaleString()} FCFA</div>
                  <div className="text-[11px] text-emerald-700 font-semibold">Garantit la pérennité + l'excédent visé</div>
                </div>
              </div>

              {setFinancialTargets && (
                <button
                  onClick={applyTargetToDashboard}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <Target className="w-3.5 h-3.5" />
                  <span>Fixer comme Objectif Officiel du Dashboard ({viabiPeriod})</span>
                </button>
              )}
            </div>

            {/* CONVERSION EN QUOTAS PHYSIQUES POUR LES LIVREURS */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">
                Déclinaison Opérationnelle Produits
              </h4>

              <div className="space-y-2.5 text-xs">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex justify-between items-center">
                  <div>
                    <div className="font-black text-slate-900">{chickenTarget.toLocaleString()} Poulets</div>
                    <div className="text-[10px] text-slate-500">45% du CA cible (3 500 F)</div>
                  </div>
                  <div className="text-right text-[11px] font-bold text-emerald-700">
                    ~{Math.round(chickenTarget / (5 * (viabiPeriod === 'week' ? 5 : viabiPeriod === 'month' ? 22 : 66)))} / jour / moto
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex justify-between items-center">
                  <div>
                    <div className="font-black text-slate-900">{porkKgTarget.toLocaleString()} kg Porc Frais</div>
                    <div className="text-[10px] text-slate-500">35% du CA cible (3 000 F/kg)</div>
                  </div>
                  <div className="text-right text-[11px] font-bold text-emerald-700">
                    ~{Math.round(porkKgTarget / (5 * (viabiPeriod === 'week' ? 5 : viabiPeriod === 'month' ? 22 : 66)))} kg / jour / moto
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex justify-between items-center">
                  <div>
                    <div className="font-black text-slate-900">{vegBasketTarget.toLocaleString()} Paniers Bio</div>
                    <div className="text-[10px] text-slate-500">20% du CA cible (4 000 F)</div>
                  </div>
                  <div className="text-right text-[11px] font-bold text-emerald-700">
                    Abonnements récurrents
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 italic">
                La force de frappe des 5 motos est calibrée pour absorber ce flux quotidien sans engorgement.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. RENTASIM : SIMULATEUR DE DÉPENSE & DE PROJET DE PRESTATION             */}
      {/* ========================================================================= */}
      {activeTool === 'rentasim' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* PANNEAU DE CONFIGURATION */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">
                Nature de la Dépense / Prestation
              </h4>
            </div>

            {/* SÉLECTEUR DE MODE D'UTILISATION (Les 2 sens expliqués par l'utilisateur) */}
            <div className="flex bg-slate-100 p-1 rounded-2xl text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setSimMode('pre_decision')}
                className={`flex-1 py-1.5 rounded-xl transition-colors ${
                  simMode === 'pre_decision' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                }`}
              >
                1. Projet d'Achat (Avant)
              </button>
              <button
                type="button"
                onClick={() => setSimMode('post_acquisition')}
                className={`flex-1 py-1.5 rounded-xl transition-colors ${
                  simMode === 'post_acquisition' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                }`}
              >
                2. Dépense Engagée (Après)
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Intitulé de la dépense / service :
                </label>
                <input
                  type="text"
                  value={expenseTitle}
                  onChange={(e) => setExpenseTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Coût total de la prestation / matériel (FCFA) :
                </label>
                <input
                  type="number"
                  step="25000"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Délai d'amortissement souhaité : <strong className="text-slate-900">{amortizationMonths} mois</strong>
                </label>
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={amortizationMonths}
                  onChange={(e) => setAmortizationMonths(Number(e.target.value))}
                  className="w-full accent-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Part de marge excédentaire mobilisée : <strong className="text-slate-900">{surplusAllocationPercent}%</strong>
                </label>
                <input
                  type="range"
                  min="20"
                  max="90"
                  step="10"
                  value={surplusAllocationPercent}
                  onChange={(e) => setSurplusAllocationPercent(Number(e.target.value))}
                  className="w-full accent-slate-900"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Les {100 - surplusAllocationPercent}% restants restent intacts pour sécuriser les opérations quotidiennes.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <div className="font-bold text-slate-800">
                {simMode === 'pre_decision' ? 'Règle RentaSIM d\'Achat Serein :' : 'Règle RentaSIM de Rapprochement :'}
              </div>
              <p>
                {simMode === 'pre_decision'
                  ? 'Si le prestataire demande cette somme, elle doit être financée uniquement par l\'excédent de marge nette sans rogner sur le carburant ou la pub.'
                  : 'Calcul du chiffre d\'affaires additionnel à générer à compter de l\'instant T pour effacer la dépense d\'urgence et retrouver le point mort.'}
              </p>
            </div>
          </div>

          {/* RÉSULTATS RENTASIM */}
          <div className="lg:col-span-2 space-y-4">
            <div className={`p-5 rounded-3xl border shadow-xs space-y-3 ${
              isSimViable ? 'bg-emerald-50/60 border-emerald-300' : 'bg-amber-50/60 border-amber-300'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-white text-slate-900 border border-slate-200">
                  {simMode === 'pre_decision' ? 'Arbitrage Pré-Investissement' : 'Plan de Rétablissement du Point Mort'}
                </span>
                <span className={`text-xs font-bold flex items-center gap-1 ${
                  isSimViable ? 'text-emerald-800' : 'text-amber-800'
                }`}>
                  {isSimViable ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-amber-600" />}
                  <span>{isSimViable ? 'Feu Vert Financier' : 'Vigilance Recommandée'}</span>
                </span>
              </div>

              <h4 className="text-lg font-black text-slate-900">
                {isSimViable
                  ? `Dépense absorbable en ${monthsToAbsorb} mois sans compromettre la production`
                  : `Délai d'absorption de ${monthsToAbsorb} mois (dépasse l'échéance cible de ${amortizationMonths} mois)`}
              </h4>

              <p className="text-xs text-slate-600 leading-relaxed">
                Pour régler cette dépense de <strong className="text-slate-900">{expenseAmount.toLocaleString()} FCFA</strong>, Dynamic Agro doit générer un Chiffre d'Affaires total de <strong className="text-emerald-800 font-bold">{revenueToGenerateForExpense.toLocaleString()} FCFA</strong> (sur base d'une contribution de marge de 36%).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-slate-400 text-xs font-medium">Capacité Mensuelle Allouée</span>
                <div className="text-xl font-black text-slate-900">{monthlyAvailableSurplus.toLocaleString()} FCFA</div>
                <span className="text-[10px] text-emerald-700 font-bold">{surplusAllocationPercent}% de la marge nette libre</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-slate-400 text-xs font-medium">CA Additionnel Équivalent</span>
                <div className="text-xl font-black text-slate-900">{revenueToGenerateForExpense.toLocaleString()} FCFA</div>
                <span className="text-[10px] text-slate-500 font-semibold">Volume d'affaires absorbant</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-slate-400 text-xs font-medium">Impact sur la Flotte</span>
                <div className="text-xs font-bold text-slate-800 pt-1 space-y-0.5">
                  <div>Soit ~{Math.round(revenueToGenerateForExpense / (3500 * amortizationMonths * 22))} poulets supp./jour</div>
                  <div className="text-[10px] text-slate-500">Répartis sur les 5 livreurs</div>
                </div>
              </div>
            </div>

            {/* SYNTHESE DE LA DECISION */}
            <div className="bg-slate-900 text-white p-5 rounded-3xl space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Conclusion Opérationnelle & Sécurisation de Trésorerie
                </h5>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                En appliquant cette simulation, vous vous assurez que même après avoir payé le prestataire ou l'équipement, <strong>le budget Facebook Ads reste approvisionné</strong> et <strong>le carburant des 5 motos est garanti chaque matin</strong>. La capacité de production n'est jamais compromise.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
