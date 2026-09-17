import React, { useState } from 'react';
import { 
  BarChart3, Layers, DollarSign, ShieldCheck, Award, 
  ArrowUpRight, Check, TrendingUp, Calculator, Cpu, AlertTriangle, Target,
  SlidersHorizontal, Activity, PieChart
} from 'lucide-react';
import { PRODUCTS_CATALOG, CIDS_METRICS, COST_STRUCTURE } from '../data';
import DecisionTools from './DecisionTools';
import BankingScorecard from './BankingScorecard';
import ChargesSettingsModal from './ChargesSettingsModal';

export default function DirectionView({
  activeTab,
  setActiveTab,
  stockPeriod,
  setStockPeriod,
  totalDailyRevenue,
  totalOrangeMoney,
  totalMoovMoney,
  totalChickensSold,
  sellersList,
  financialTargets,
  setFinancialTargets,
  costStructure = COST_STRUCTURE,
  setCostStructure,
  showCharts = false,
  showToast
}) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const totalCash = sellersList.reduce((acc, s) => acc + s.cashCollected, 0);

  const currentBreakEven = costStructure?.monthlyBreakEvenRevenue || 3527777;
  const currentMonthlyRevenue = costStructure?.monthlyCurrentRevenue || 4725000;
  const currentTargetMonth = financialTargets?.month || 4583333;

  const omPercent = totalDailyRevenue > 0 ? Math.round((totalOrangeMoney / totalDailyRevenue) * 100) : 0;
  const moovPercent = totalDailyRevenue > 0 ? Math.round((totalMoovMoney / totalDailyRevenue) * 100) : 0;
  const cashPercent = Math.max(0, 100 - omPercent - moovPercent);

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* ONGLETS DIRECTION + BOUTON PARAMETRES */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('stocks')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'stocks'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Stocks & Marges Nettes Zagtouli</span>
          </button>
          <button
            onClick={() => setActiveTab('cids')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'cids'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Débouchés & Impact CIDS-Burkina</span>
          </button>
          <button
            onClick={() => setActiveTab('finances')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'finances'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Synthèse Financière & Ratios Bancaires</span>
          </button>
          <button
            onClick={() => setActiveTab('engineering')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'engineering'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-200'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-amber-300" />
            <span>Ingénierie Décisionnelle (ViabiTarget & RentaSIM)</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsSettingsOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors shadow-2xs shrink-0"
          title="Modifier les charges fixes et le seuil de rentabilité"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-amber-700" />
          <span>Paramétrer les Charges</span>
        </button>
      </div>

      {/* ONGLET 1 DIRECTION : STOCKS */}
      {activeTab === 'stocks' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div>
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-700" />
                <span>Chambres Froides Zagtouli : Stocks Physiques & Économie Unitaire Nette</span>
              </h3>
              <p className="text-xs text-slate-500">
                Suivi des prix d'achat fermier Sanguié, déboursés logistiques (carburant) et marge nette dégagée par produit.
              </p>
            </div>
            
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold shrink-0">
              <button
                type="button"
                onClick={() => setStockPeriod('week')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  stockPeriod === 'week' ? 'bg-white text-slate-900 shadow-2xs font-black' : 'text-slate-600'
                }`}
              >
                Semaine
              </button>
              <button
                type="button"
                onClick={() => setStockPeriod('month')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  stockPeriod === 'month' ? 'bg-white text-slate-900 shadow-2xs font-black' : 'text-slate-600'
                }`}
              >
                Mois
              </button>
              <button
                type="button"
                onClick={() => setStockPeriod('quarter')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  stockPeriod === 'quarter' ? 'bg-white text-slate-900 shadow-2xs font-black' : 'text-slate-600'
                }`}
              >
                Trimestre
              </button>
              <button
                type="button"
                onClick={() => setStockPeriod('year')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  stockPeriod === 'year' ? 'bg-white text-slate-900 shadow-2xs font-black' : 'text-slate-600'
                }`}
              >
                Année
              </button>
            </div>
          </div>

          {/* VISUALISATION GRAPHIQUE DES STOCKS QUAND SHOWCHARTS EST ACTIVE */}
          {showCharts && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-700" />
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      Graphe de Rotation & Écoulement des Stocks (Période : {stockPeriod})
                    </h4>
                    <p className="text-[11px] text-slate-500">Comparaison visuelle Stock Initial vs Quantités Vendues vs Stock Restant</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-bold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-emerald-600"></span>
                    <span className="text-emerald-800">Écoulé / Vendu</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-amber-500"></span>
                    <span className="text-amber-800">Disponible</span>
                  </div>
                </div>
              </div>

              {/* GRAPHE EN BARRES HORIZONTALES COMPARATIVES */}
              <div className="space-y-4">
                {PRODUCTS_CATALOG.map((prod) => {
                  const periodData = prod.periods?.[stockPeriod] || { initialStock: 100, sold: 50, currentStock: 50 };
                  const soldPercent = Math.min(100, Math.round((periodData.sold / periodData.initialStock) * 100));
                  const remainingPercent = 100 - soldPercent;

                  return (
                    <div key={prod.id} className="space-y-1.5">
                      <div className="flex justify-between items-baseline text-xs">
                        <span className="font-bold text-slate-900">{prod.name} ({prod.category})</span>
                        <span className="text-slate-500 font-medium">
                          Vendu : <strong className="text-emerald-700">{periodData.sold}</strong> / {periodData.initialStock} {prod.unit.includes('kg') ? 'kg' : 'unités'} ({soldPercent}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-xl h-4 flex overflow-hidden p-0.5 gap-0.5 border border-slate-200">
                        <div 
                          className="bg-emerald-600 h-full rounded-l-lg transition-all duration-500" 
                          style={{ width: `${soldPercent}%` }}
                          title={`Vendu: ${periodData.sold}`}
                        />
                        <div 
                          className="bg-amber-500 h-full rounded-r-lg transition-all duration-500" 
                          style={{ width: `${remainingPercent}%` }}
                          title={`Disponible: ${periodData.currentStock}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PRODUCTS_CATALOG.map((prod) => {
              const periodData = prod.periods?.[stockPeriod] || { initialStock: 100, sold: 50, currentStock: 50 };
              const flowPercent = Math.min(100, Math.round((periodData.sold / periodData.initialStock) * 100));
              const totalNetMarginProduct = periodData.sold * (prod.netMarginUnit || 800);
              return (
                <div key={prod.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                        {prod.category}
                      </span>
                      <span className="text-xs font-bold text-slate-500">
                        Marge Brute : <strong className="text-emerald-700 font-black">{prod.marginRate}</strong>
                      </span>
                    </div>
                    <h4 className="text-base font-black text-slate-900">{prod.name}</h4>
                    <div className="text-[11px] text-slate-400 mb-2">{prod.origin}</div>

                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1 text-[11px] text-slate-600 mb-3">
                      <div className="flex justify-between">
                        <span>Prix de vente public :</span>
                        <strong className="text-slate-900">{prod.price.toLocaleString()} F</strong>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>- Achat garanti Sanguié :</span>
                        <span>{prod.purchasePriceSanguié.toLocaleString()} F</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>- Déboursé logistique moyen :</span>
                        <span>{prod.logisticsCostUnit} F</span>
                      </div>
                      <div className="flex justify-between text-emerald-800 font-black pt-1 border-t border-slate-200">
                        <span>= Marge Nette Unitaire :</span>
                        <span>+{prod.netMarginUnit.toLocaleString()} F / unité</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs bg-emerald-50/40 p-3 rounded-xl border border-emerald-100">
                      <div className="flex justify-between text-slate-600">
                        <span>Stock début {stockPeriod} :</span>
                        <strong className="text-slate-800">{periodData.initialStock} {prod.unit.includes('kg') ? 'kg' : 'unités'}</strong>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Écoulement réel :</span>
                        <strong className="text-emerald-700 font-bold">{periodData.sold} {prod.unit.includes('kg') ? 'kg' : 'unités'}</strong>
                      </div>
                      <div className="flex justify-between text-xs font-black text-slate-900 pt-1 border-t border-emerald-200">
                        <span>Disponible en chambre :</span>
                        <span className="bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-md">
                          {periodData.currentStock} {prod.unit.includes('kg') ? 'kg' : 'unités'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-[11px] font-medium text-slate-600">
                      <span>Marge nette cumulée :</span>
                      <strong className="text-emerald-800 font-black">+{totalNetMarginProduct.toLocaleString()} FCFA</strong>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Cadence d'écoulement</span>
                      <span className="font-bold text-slate-700">{flowPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: `${flowPercent}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ONGLET 2 DIRECTION : DÉBOUCHÉS CIDS */}
      {activeTab === 'cids' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-600" />
                <span>Débouchés Commerciaux de l'Incubateur Agribusiness du CIDS-Burkina (Sanguié)</span>
              </h3>
              <p className="text-xs text-slate-500">
                Absorption directe de la production des 25 jeunes fermiers par le réseau de distribution Dynamic Agro à Ouagadougou.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <div className="text-slate-400 text-xs font-medium">Poulets du Sanguié Écoulés</div>
              <div className="text-2xl font-black text-slate-900">
                {PRODUCTS_CATALOG[0].periods?.month?.sold || 386} <span className="text-sm font-semibold text-slate-500">unités ce mois</span>
              </div>
              <p className="text-[11px] text-slate-500">({totalChickensSold} poulets livrés aujourd'hui)</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <div className="text-slate-400 text-xs font-medium">Absorption Totale Filières Sanguié</div>
              <div className="text-2xl font-black text-amber-600">
                {CIDS_METRICS.totalKgAbsorbedThisMonth} <span className="text-sm font-semibold text-slate-500">kg ce mois</span>
              </div>
              <p className="text-[11px] text-slate-500">Aviculture, découpes de porc et maraîchage bio</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <div className="text-slate-400 text-xs font-medium">Revenus Directs Distribués aux 25 Fermiers</div>
              <div className="text-2xl font-black text-emerald-700">
                {CIDS_METRICS.directIncomeDistributedFCFA.toLocaleString()} FCFA
              </div>
              <p className="text-[11px] text-slate-500">Rachat à prix plancher équitable sans intermédiaire</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white p-5 rounded-3xl space-y-2.5">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Traçabilité Économique pour les Bailleurs de Fonds (Enabel, Coopération Suisse, ONG)
              </h4>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Contrairement aux projets d'insertion classiques où le producteur abandonne faute de débouchés, le modèle intégré du <strong>Centre d'Initiatives pour le Développement Solidaire (CIDS-Burkina)</strong> couplant son <strong>Incubateur Agribusiness du Sanguié (Production)</strong> à <strong>Dynamic Agro (Commercialisation à Ouaga)</strong> assure l'écoulement garanti. Chaque vente à Ouaga certifie la viabilité économique de l'écosystème d'insertion.
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] text-emerald-200 pt-1">
              <span className="bg-white/10 px-2.5 py-1 rounded-lg flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-400" />
                <span>Lutte concrète contre l'exode rural</span>
              </span>
              <span className="bg-white/10 px-2.5 py-1 rounded-lg flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-400" />
                <span>Données probantes pour rapports d'impact bailleurs</span>
              </span>
              <span className="bg-white/10 px-2.5 py-1 rounded-lg flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-400" />
                <span>25 fermiers bénéficiaires en activité continue</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ONGLET 3 DIRECTION : SYNTHÈSE FINANCIÈRE & RATIOS BANCAIRES */}
      {activeTab === 'finances' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-700" />
                <span>Synthèse Financière, Trésorerie & Suivi de l'Objectif ViabiTarget</span>
              </h3>
              <p className="text-xs text-slate-500">
                Comparaison en temps réel entre le Chiffre d'Affaires réalisé, le Point Mort et la cible de viabilité.
              </p>
            </div>

            {/* BADGE OBJECTIF MENSUEL OFFICIEL */}
            <div className="bg-emerald-50 border border-emerald-300 px-3.5 py-1.5 rounded-2xl text-xs flex items-center gap-2">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Objectif Mois ViabiTarget :</span>
              <strong className="text-emerald-950 font-black">{currentTargetMonth.toLocaleString()} FCFA</strong>
            </div>
          </div>

          {/* JAUGE DE PROGRESSION VIS-A-VIS DE L'OBJECTIF */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Avancement du Chiffre d'Affaires Réalisé vs Cible de Viabilité (Mois en cours)
              </span>
              <span className="text-xs font-black text-emerald-700">
                {Math.round((currentMonthlyRevenue / currentTargetMonth) * 100)}% de l'objectif
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-emerald-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round((currentMonthlyRevenue / currentTargetMonth) * 100))}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
              <span>Réalisé : <strong>{currentMonthlyRevenue.toLocaleString()} FCFA</strong></span>
              <span>Point Mort : <strong>{currentBreakEven.toLocaleString()} FCFA</strong></span>
              <span>Cible Viabilité : <strong>{currentTargetMonth.toLocaleString()} FCFA</strong></span>
            </div>
          </div>

          {/* VISUALISATIONS GRAPHIQUES FINANCES QUAND SHOWCHARTS EST ACTIF */}
          {showCharts && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-in fade-in duration-300">
              {/* Graphe 1 : Comparatif Chiffre / Point Mort / Cible */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-700" />
                    <span>Comparatif Économique Mensuel (FCFA)</span>
                  </h4>
                  <span className="text-[10px] font-bold text-slate-400">Échelle proportionnelle</span>
                </div>

                <div className="space-y-3 pt-1">
                  {/* Point Mort */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="font-semibold text-slate-600">Seuil de Rentabilité (Point Mort)</span>
                      <strong className="text-slate-800">{currentBreakEven.toLocaleString()} FCFA</strong>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div className="bg-slate-400 h-3 rounded-full" style={{ width: `${Math.min(100, (currentBreakEven / currentTargetMonth) * 100)}%` }} />
                    </div>
                  </div>

                  {/* Chiffre Réalisé */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="font-bold text-emerald-800">Chiffre d'Affaires Actuel Constaté</span>
                      <strong className="text-emerald-700 font-black">{currentMonthlyRevenue.toLocaleString()} FCFA</strong>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div className="bg-emerald-600 h-3 rounded-full" style={{ width: `${Math.min(100, (currentMonthlyRevenue / currentTargetMonth) * 100)}%` }} />
                    </div>
                  </div>

                  {/* Cible ViabiTarget */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="font-semibold text-amber-900">Cible de Pleine Viabilité (ViabiTarget)</span>
                      <strong className="text-amber-800">{currentTargetMonth.toLocaleString()} FCFA</strong>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div className="bg-amber-500 h-3 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                  Le chiffre actuel dépasse le point mort de <strong>+{(currentMonthlyRevenue - currentBreakEven).toLocaleString()} FCFA</strong>, dégageant un excédent net d'exploitation disponible pour l'autofinancement.
                </div>
              </div>

              {/* Graphe 2 : Répartition des Modes d'Encaissement du Jour */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <PieChart className="w-4 h-4 text-amber-600" />
                    <span>Mix des Modes de Paiement Flotte (Jour)</span>
                  </h4>
                  <span className="text-[10px] font-bold text-emerald-700">Total : {totalDailyRevenue.toLocaleString()} FCFA</span>
                </div>

                {/* Barre segmentée */}
                <div className="space-y-2 pt-1">
                  <div className="w-full bg-slate-100 rounded-xl h-5 flex overflow-hidden p-0.5 gap-0.5 border border-slate-200">
                    <div 
                      className="bg-amber-500 h-full rounded-l-lg transition-all duration-500" 
                      style={{ width: `${omPercent}%` }}
                      title={`Orange Money: ${omPercent}%`}
                    />
                    <div 
                      className="bg-blue-500 h-full transition-all duration-500" 
                      style={{ width: `${moovPercent}%` }}
                      title={`Moov Money: ${moovPercent}%`}
                    />
                    <div 
                      className="bg-emerald-600 h-full rounded-r-lg transition-all duration-500" 
                      style={{ width: `${cashPercent}%` }}
                      title={`Espèces: ${cashPercent}%`}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                    <div className="bg-amber-50 p-2 rounded-xl border border-amber-200">
                      <span className="text-[10px] text-amber-800 font-bold block">Orange Money</span>
                      <strong className="text-slate-900">{omPercent}%</strong>
                      <div className="text-[10px] text-slate-500">{totalOrangeMoney.toLocaleString()} F</div>
                    </div>
                    <div className="bg-blue-50 p-2 rounded-xl border border-blue-200">
                      <span className="text-[10px] text-blue-800 font-bold block">Moov Money</span>
                      <strong className="text-slate-900">{moovPercent}%</strong>
                      <div className="text-[10px] text-slate-500">{totalMoovMoney.toLocaleString()} F</div>
                    </div>
                    <div className="bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                      <span className="text-[10px] text-emerald-800 font-bold block">Espèces Caisse</span>
                      <strong className="text-slate-900">{cashPercent}%</strong>
                      <div className="text-[10px] text-slate-500">{totalCash.toLocaleString()} F</div>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500">
                  Sécurisation : <strong>{omPercent + moovPercent}%</strong> des paiements sont tracés électroniquement sans manipulation de billets.
                </div>
              </div>
            </div>
          )}

          {/* 3 CARTES RESUME FINANCIER */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <div className="text-slate-400 text-xs font-medium">Chiffre d'Affaires Flotte du Jour</div>
              <div className="text-2xl font-black text-slate-900">{totalDailyRevenue.toLocaleString()} FCFA</div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold pt-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+19% vs même jour semaine précédente</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <div className="text-slate-400 text-xs font-medium">Mobile Money Vérifié (Compte Marchand)</div>
              <div className="text-2xl font-black text-amber-600">{(totalOrangeMoney + totalMoovMoney).toLocaleString()} FCFA</div>
              <p className="text-[11px] text-slate-500">Orange: {totalOrangeMoney.toLocaleString()} F • Moov: {totalMoovMoney.toLocaleString()} F</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <div className="text-slate-400 text-xs font-medium">Espèces Déposées en Sacoche</div>
              <div className="text-2xl font-black text-slate-800">
                {totalCash.toLocaleString()} FCFA
              </div>
              <p className="text-[11px] text-slate-500">À déposer au coffre de Zagtouli à 18h00</p>
            </div>
          </div>

          {/* MODULE DE SANTE FINANCIERE & RATIOS BANCAIRES */}
          <BankingScorecard 
            costStructure={costStructure}
            totalDailyRevenue={totalDailyRevenue}
            totalOrangeMoney={totalOrangeMoney}
            totalMoovMoney={totalMoovMoney}
            showCharts={showCharts}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />

          {/* Rapprochement de caisse zéro fuite */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <h4 className="text-sm font-bold">Rapprochement de Caisse Zéro Fuite</h4>
              </div>
              <p className="text-xs text-slate-300 max-w-2xl">
                Les 5 vendeurs versent quotidiennement le montant exact en espèces contre décharge signée. Les transactions Mobile Money sont créditées directement sur les SIM marchandes de Dynamic Agro, supprimant tout risque de détournement.
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xs text-slate-400">Total Encaissé Jour</div>
              <div className="text-xl font-black text-amber-400">{totalDailyRevenue.toLocaleString()} FCFA</div>
            </div>
          </div>
        </div>
      )}

      {/* ONGLET 4 DIRECTION : INGENIERIE DECISIONNELLE */}
      {activeTab === 'engineering' && (
        <DecisionTools 
          defaultTool="viabitarget" 
          financialTargets={financialTargets}
          setFinancialTargets={setFinancialTargets}
          costStructure={costStructure}
        />
      )}

      {/* MODALE DE REGLAGE DES CHARGES D'EXPLOITATION AVEC DOUBLE CONFIRMATION */}
      <ChargesSettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        costStructure={costStructure}
        onSave={setCostStructure}
        showToast={showToast}
      />
    </div>
  );
}
