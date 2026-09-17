import React, { useState } from 'react';
import { 
  Bike, ShoppingBag, Flame, DollarSign, ShieldCheck, 
  CheckCircle, Target, MessageSquare, Check, ArrowUpRight,
  Briefcase, AlertTriangle, Clock, MapPin, Palette,
  Send, UserCheck, Layers, Building2, Calendar, Share2, Eye, Calculator,
  BarChart3, Activity, PieChart
} from 'lucide-react';
import { B2B_PIPELINE, SAV_COMPLAINTS, SOCIAL_CALENDAR } from '../data';
import DecisionTools from './DecisionTools';

export default function MarketingCockpitView({
  activeTab,
  setActiveTab,
  sellersList,
  totalDailyRevenue,
  totalOrangeMoney,
  totalMoovMoney,
  totalChickensSold,
  totalProspectsTeamMonth,
  totalProspectsTeamTarget,
  ordersList,
  handleSendSatisfaction,
  setCurrentSellerId,
  setActiveRole,
  showCharts = false,
  costStructure,
  financialTargets,
  setFinancialTargets
}) {
  const [pipelineList, setPipelineList] = useState(B2B_PIPELINE);
  const [savList, setSavList] = useState(SAV_COMPLAINTS);
  const [savFilter, setSavFilter] = useState('all');
  const [socialList, setSocialList] = useState(SOCIAL_CALENDAR);

  const updatePipelineStage = (leadId, newStage) => {
    setPipelineList(prev => prev.map(lead => lead.id === leadId ? { ...lead, stage: newStage } : lead));
  };

  const resolveComplaint = (id) => {
    setSavList(prev => prev.map(item => item.id === id ? { ...item, status: 'resolved', timeElapsed: 'Résolu à l\'instant' } : item));
  };

  const filteredSav = savFilter === 'all' ? savList : savList.filter(s => s.status === savFilter);

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* BARRE D'ONGLETS MARKETING */}
      <div className="flex gap-2 overflow-x-auto border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('sellers')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
            activeTab === 'sellers'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Bike className="w-3.5 h-3.5" />
          <span>Supervision des 5 Vendeurs</span>
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
            activeTab === 'orders'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Commandes & Pipeline B2B ({ordersList.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('sav')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
            activeTab === 'sav'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Suivi Qualité & SAV ({savList.filter(s => s.status === 'in_progress').length} en cours)</span>
        </button>
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
            activeTab === 'campaigns'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Campagnes & Réseaux Sociaux</span>
        </button>
        <button
          onClick={() => setActiveTab('viabitarget')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
            activeTab === 'viabitarget'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-200'
          }`}
        >
          <Target className="w-3.5 h-3.5 text-amber-300" />
          <span>ViabiTarget & RentaSIM</span>
        </button>
      </div>
      {/* SOUS-ONGLET 1 : SUPERVISION DES 5 VENDEURS */}
      {activeTab === 'sellers' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-medium">Total Collecté Flotte</span>
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-xl font-black text-slate-900">
                {totalDailyRevenue.toLocaleString()} <span className="text-xs font-semibold text-slate-500">FCFA</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold pt-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+14% vs j-7</span>
                <span className="text-slate-400 font-normal">• 5 motos</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-medium">Mobile Money Reçu</span>
                <ShieldCheck className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-xl font-black text-slate-900">
                {(totalOrangeMoney + totalMoovMoney).toLocaleString()} <span className="text-xs font-semibold text-slate-500">FCFA</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 pt-0.5">
                <span>OM: {totalOrangeMoney.toLocaleString()} F</span>
                <span>•</span>
                <span>Moov: {totalMoovMoney.toLocaleString()} F</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-medium">Poulets Livrés ce jour</span>
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-xl font-black text-slate-900">
                {totalChickensSold} <span className="text-xs font-semibold text-slate-500">unités</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold pt-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>Cadence : 10,4 poulets / vendeur</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-medium">Prospection Terrain Équipe</span>
                <Target className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-xl font-black text-slate-900">
                {totalProspectsTeamMonth} <span className="text-xs font-semibold text-slate-500">/ {totalProspectsTeamTarget} comptes</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-amber-700 font-semibold pt-0.5">
                <span>Taux atteinte : {Math.round((totalProspectsTeamMonth / totalProspectsTeamTarget) * 100)}%</span>
              </div>
            </div>
          </div>

          {/* VISUALISATION GRAPHIQUE COMPARATIVE DES 5 VENDEURS QUAND SHOWCHARTS EST ACTIF */}
          {showCharts && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-700" />
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      Comparatif Graphique de la Flotte (Jour & Mois)
                    </h4>
                    <p className="text-[11px] text-slate-500">Performances comparées des 5 vendeurs : Chiffre d'Affaires & Atteinte des Objectifs de Prospection</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-bold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-amber-500"></span>
                    <span className="text-amber-800">Orange Money</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-blue-500"></span>
                    <span className="text-blue-800">Moov Money</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-emerald-600"></span>
                    <span className="text-emerald-800">Espèces</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Graphe 1 : Chiffre d'affaires par vendeur */}
                <div className="space-y-3">
                  <h5 className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Chiffre Encaissé par Vendeur (Jour)</span>
                  </h5>
                  <div className="space-y-3">
                    {sellersList.map((seller) => {
                      const totalSeller = seller.cashCollected + seller.orangeMoney + seller.moovMoney;
                      const maxRevenue = Math.max(...sellersList.map(s => s.cashCollected + s.orangeMoney + s.moovMoney)) || 1;
                      const barWidthPercent = Math.round((totalSeller / maxRevenue) * 100);
                      const omPart = Math.round((seller.orangeMoney / totalSeller) * 100);
                      const moovPart = Math.round((seller.moovMoney / totalSeller) * 100);
                      const cashPart = Math.max(0, 100 - omPart - moovPart);

                      return (
                        <div key={seller.id} className="space-y-1">
                          <div className="flex justify-between items-baseline text-xs">
                            <span className="font-bold text-slate-800">{seller.name} <span className="text-[10px] text-slate-400 font-normal">({seller.id})</span></span>
                            <strong className="text-slate-900 font-black">{totalSeller.toLocaleString()} FCFA</strong>
                          </div>
                          <div className="w-full bg-slate-100 rounded-lg h-3 flex overflow-hidden border border-slate-200">
                            <div className="bg-amber-500 h-full" style={{ width: `${(barWidthPercent * omPart) / 100}%` }} title={`Orange Money: ${seller.orangeMoney.toLocaleString()} F`} />
                            <div className="bg-blue-500 h-full" style={{ width: `${(barWidthPercent * moovPart) / 100}%` }} title={`Moov Money: ${seller.moovMoney.toLocaleString()} F`} />
                            <div className="bg-emerald-600 h-full" style={{ width: `${(barWidthPercent * cashPart) / 100}%` }} title={`Espèces: ${seller.cashCollected.toLocaleString()} F`} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Graphe 2 : Performance Prospection Mois */}
                <div className="space-y-3">
                  <h5 className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-amber-600" />
                    <span>Taux d'Atteinte Prospection Terrain (Mois)</span>
                  </h5>
                  <div className="space-y-3">
                    {sellersList.map((seller) => {
                      const percent = Math.min(100, Math.round((seller.prospectsDoneMonth / seller.prospectsTargetMonth) * 100));
                      return (
                        <div key={seller.id} className="space-y-1">
                          <div className="flex justify-between items-baseline text-xs">
                            <span className="font-bold text-slate-800">{seller.name}</span>
                            <span className="text-slate-500 text-[11px]">
                              <strong className="text-amber-700">{seller.prospectsDoneMonth}</strong> / {seller.prospectsTargetMonth} comptes ({percent}%)
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-lg h-3 overflow-hidden border border-slate-200">
                            <div 
                              className={`h-full transition-all duration-500 ${percent >= 80 ? 'bg-emerald-600' : percent >= 60 ? 'bg-amber-500' : 'bg-slate-500'}`} 
                              style={{ width: `${percent}%` }} 
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Bike className="w-4 h-4 text-emerald-700" />
              <span>Pointage individuel des 5 motos en tournée</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sellersList.map((seller) => {
                const totalSeller = seller.cashCollected + seller.orangeMoney + seller.moovMoney;
                const sellerProspectPercent = Math.min(100, Math.round((seller.prospectsDoneMonth / seller.prospectsTargetMonth) * 100));
                return (
                  <div key={seller.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                            {seller.id}
                          </span>
                          <span className="text-xs font-bold text-emerald-700">
                            {seller.tourStatus}
                          </span>
                        </div>
                        <h4 className="text-sm font-black text-slate-900 mt-1">{seller.name}</h4>
                      </div>
                      <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
                        {seller.motorcycle}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl">
                      <div className="font-semibold text-slate-800 truncate">{seller.zone}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Téléphone : +{seller.phone}</div>
                    </div>

                    <div className="bg-amber-50/70 border border-amber-200/60 p-2 rounded-xl space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-600 font-medium flex items-center gap-1">
                          <Target className="w-3.5 h-3.5 text-amber-600" />
                          <span>Prospection Mois :</span>
                        </span>
                        <span className="font-bold text-slate-900">
                          {seller.prospectsDoneMonth} / {seller.prospectsTargetMonth} comptes ({sellerProspectPercent}%)
                        </span>
                      </div>
                      <div className="w-full bg-amber-100 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${sellerProspectPercent}%` }} />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
                      <div className="bg-emerald-50 text-emerald-900 p-1.5 rounded-lg">
                        <div className="font-bold text-xs">{seller.itemsSold.chicken}</div>
                        <div>Poulets</div>
                      </div>
                      <div className="bg-slate-100 text-slate-800 p-1.5 rounded-lg">
                        <div className="font-bold text-xs">{seller.itemsSold.porkKg} kg</div>
                        <div>Porc</div>
                      </div>
                      <div className="bg-amber-50 text-amber-900 p-1.5 rounded-lg">
                        <div className="font-bold text-xs">{seller.itemsSold.vegBaskets}</div>
                        <div>Paniers Bio</div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div>
                        <div className="text-[10px] text-slate-400">Total Encaissé</div>
                        <div className="font-black text-slate-900 text-sm">{totalSeller.toLocaleString()} FCFA</div>
                      </div>
                      <button
                        onClick={() => {
                          setCurrentSellerId(seller.id);
                          setActiveRole('seller_app');
                        }}
                        className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1"
                      >
                        <span>Vue mobile</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {/* SOUS-ONGLET 2 : COMMANDES & PIPELINE B2B */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-emerald-700" />
                  <span>Pipeline de Négociation & Conquête B2B (Maquis, Rôtisseries, Cantines)</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Transformation des contacts terrain en contrats réguliers d'approvisionnement hebdomadaire.
                </p>
              </div>
              <span className="text-[11px] font-bold bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-full">
                5 Comptes en cours d'activation
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 rounded-2xl p-3 space-y-2 border border-slate-200">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 pb-1 border-b border-slate-200">
                  <span>1. Contacté & Dégustation</span>
                  <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full text-[10px]">
                    {pipelineList.filter(l => l.stage === 'contacted').length}
                  </span>
                </div>
                {pipelineList.filter(l => l.stage === 'contacted').map(lead => (
                  <div key={lead.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-xs text-slate-900">{lead.establishment}</h4>
                      <span className="text-[10px] text-slate-400">{lead.zone}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium">{lead.potentialWeekly}</p>
                    <p className="text-[10px] text-slate-500 italic bg-slate-50 p-1.5 rounded">{lead.notes}</p>
                    <div className="flex items-center justify-between pt-1 text-[10px]">
                      <span className="text-slate-400">Via {lead.sellerOrigin.split(' ')[0]}</span>
                      <button
                        onClick={() => updatePipelineStage(lead.id, 'negotiation')}
                        className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-0.5 bg-emerald-50 px-2 py-0.5 rounded"
                      >
                        <span>En Négociation</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50/50 rounded-2xl p-3 space-y-2 border border-amber-200">
                <div className="flex items-center justify-between text-xs font-bold text-amber-900 pb-1 border-b border-amber-200">
                  <span>2. Négociation & Tarifs</span>
                  <span className="bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full text-[10px]">
                    {pipelineList.filter(l => l.stage === 'negotiation').length}
                  </span>
                </div>
                {pipelineList.filter(l => l.stage === 'negotiation').map(lead => (
                  <div key={lead.id} className="bg-white p-3 rounded-xl border border-amber-200 shadow-2xs space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-xs text-slate-900">{lead.establishment}</h4>
                      <span className="text-[10px] text-amber-700 font-semibold">{lead.zone}</span>
                    </div>
                    <p className="text-[11px] text-slate-700 font-medium">{lead.potentialWeekly}</p>
                    <div className="text-[10px] text-emerald-700 font-bold">
                      Potentiel : {lead.estimatedMonthlyRevenue.toLocaleString()} F / mois
                    </div>
                    <p className="text-[10px] text-slate-500 italic bg-amber-50/60 p-1.5 rounded">{lead.notes}</p>
                    <div className="flex items-center justify-between pt-1 text-[10px]">
                      <span className="text-slate-400">Contact : {lead.contactName}</span>
                      <button
                        onClick={() => updatePipelineStage(lead.id, 'contract')}
                        className="text-white bg-emerald-700 hover:bg-emerald-800 font-bold flex items-center gap-0.5 px-2 py-0.5 rounded shadow-2xs"
                      >
                        <span>Valider Contrat</span>
                        <Check className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-emerald-50/50 rounded-2xl p-3 space-y-2 border border-emerald-200">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-900 pb-1 border-b border-emerald-200">
                  <span>3. Contrat Récurrent Actif</span>
                  <span className="bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full text-[10px]">
                    {pipelineList.filter(l => l.stage === 'contract').length}
                  </span>
                </div>
                {pipelineList.filter(l => l.stage === 'contract').map(lead => (
                  <div key={lead.id} className="bg-white p-3 rounded-xl border border-emerald-200 shadow-2xs space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-xs text-slate-900">{lead.establishment}</h4>
                      <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">Signé</span>
                    </div>
                    <p className="text-[11px] text-slate-700 font-semibold">{lead.potentialWeekly}</p>
                    <div className="text-[11px] text-emerald-800 font-black">
                      {lead.estimatedMonthlyRevenue.toLocaleString()} FCFA / mois
                    </div>
                    <p className="text-[10px] text-slate-500 italic bg-emerald-50/60 p-1.5 rounded">{lead.notes}</p>
                    <div className="pt-1 text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>Tournée motorisée intégrée</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-emerald-700" />
                  <span>Commandes du Jour & Fidélisation Relation Client</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Déclenchement direct des enquêtes de satisfaction et relances clients après livraison.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="px-4 py-3">Client</th>
                    <th className="px-4 py-3">Commande</th>
                    <th className="px-4 py-3">Montant & Paiement</th>
                    <th className="px-4 py-3">Livreur Assigné</th>
                    <th className="px-4 py-3">Statut</th>
                    <th className="px-4 py-3 text-right">Action Relation Client</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {ordersList.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-50/80">
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-900">{ord.clientName}</div>
                        <div className="text-[11px] text-slate-400">{ord.clientType} • {ord.address}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-700">{ord.items}</td>
                      <td className="px-4 py-3">
                        <div className="font-black text-slate-900">{ord.totalAmount.toLocaleString()} FCFA</div>
                        <div className="text-[10px] text-emerald-700 font-bold">{ord.paymentStatus}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{ord.assignedSeller}</td>
                      <td className="px-4 py-3">
                        <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-bold">
                          {ord.deliveryStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {ord.satisfactionSent ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Message envoyé</span>
                          </span>
                        ) : (
                          <button
                            onClick={() => handleSendSatisfaction(ord.id, ord.clientName, ord.phone)}
                            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-xs"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Relance Directe</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {/* SOUS-ONGLET 3 : SUIVI QUALITE & SAV */}
      {activeTab === 'sav' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div>
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Registre Systématique des Réclamations & Assurance Qualité</span>
              </h3>
              <p className="text-xs text-slate-500">
                Protocole de remplacement et compensation sous 24h pour protéger l'image de marque de Dynamic Agro.
              </p>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setSavFilter('all')}
                className={`px-3 py-1 rounded-lg transition-colors ${savFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
              >
                Toutes ({savList.length})
              </button>
              <button
                onClick={() => setSavFilter('in_progress')}
                className={`px-3 py-1 rounded-lg transition-colors ${savFilter === 'in_progress' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
              >
                En cours ({savList.filter(s => s.status === 'in_progress').length})
              </button>
              <button
                onClick={() => setSavFilter('resolved')}
                className={`px-3 py-1 rounded-lg transition-colors ${savFilter === 'resolved' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
              >
                Résolues ({savList.filter(s => s.status === 'resolved').length})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredSav.map(item => (
              <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {item.id}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.status === 'resolved' ? 'Résolu' : 'En traitement'}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900">{item.clientName}</h4>
                    <span className="text-[11px] text-slate-400">Réf : {item.orderRef} • Par {item.seller}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1">
                    <div className="text-[11px] font-bold text-slate-700">Objet : {item.type}</div>
                    <p className="text-[11px] text-slate-600 leading-snug">{item.detail}</p>
                  </div>
                  <div className="text-[11px] text-emerald-800 bg-emerald-50/60 p-2 rounded-xl border border-emerald-100 font-medium">
                    <strong>Action corrective :</strong> {item.actionTaken}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.timeElapsed}</span>
                  </span>
                  {item.status === 'in_progress' ? (
                    <button
                      onClick={() => resolveComplaint(item.id)}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-2.5 py-1 rounded-lg text-[10px] flex items-center gap-1 shadow-2xs"
                    >
                      <Check className="w-3 h-3" />
                      <span>Clôturer réclamation</span>
                    </button>
                  ) : (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Protocole validé</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* SOUS-ONGLET 4 : CAMPAGNES GRAPHIQUES & CALENDRIER RESEAUX SOCIAUX */}
      {activeTab === 'campaigns' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Palette className="w-5 h-5 text-amber-600" />
                <span>Campagnes Marketing & Maquettes Graphiques Clés en Main</span>
              </h3>
              <p className="text-xs text-slate-500">
                Supports visuels conçus pour alimenter le planning éditorial des 5 motos et générer des commandes régulières.
              </p>
            </div>
          </div>

          {/* CALENDRIER EDITORIAL & RESEAUX SOCIAUX */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-700" />
                <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">
                  Planning Éditorial & Performance Réseaux Sociaux (WhatsApp Status & Facebook)
                </h4>
              </div>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Taux de conversion moyen : 1.2% des vues en commandes
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {socialList.map(post => (
                <div key={post.id} className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 space-y-2.5 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="bg-slate-200 font-bold text-slate-700 px-2 py-0.5 rounded">{post.day}</span>
                      <span className={`font-bold px-2 py-0.5 rounded-full ${
                        post.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {post.status === 'published' ? 'Diffusé' : 'Programmé'}
                      </span>
                    </div>
                    <div className="text-[10px] font-bold text-emerald-700">{post.format}</div>
                    <h5 className="text-xs font-bold text-slate-900 leading-snug">{post.theme}</h5>
                    <p className="text-[10px] text-slate-500 italic">{post.objective}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80 grid grid-cols-3 gap-1 text-center text-[10px]">
                    <div className="bg-white p-1 rounded-lg border border-slate-200">
                      <div className="text-slate-400 text-[9px]">Vues</div>
                      <div className="font-bold text-slate-900">{post.views.toLocaleString()}</div>
                    </div>
                    <div className="bg-white p-1 rounded-lg border border-slate-200">
                      <div className="text-slate-400 text-[9px]">Leads</div>
                      <div className="font-bold text-amber-700">{post.leadsGenerated}</div>
                    </div>
                    <div className="bg-white p-1 rounded-lg border border-slate-200">
                      <div className="text-slate-400 text-[9px]">Achats</div>
                      <div className="font-bold text-emerald-700">{post.ordersTriggered}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3 MAQUETTES VISUELLES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* CAMPAGNE 1 */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between">
              <div>
                <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 p-5 text-white space-y-3 relative overflow-hidden">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded uppercase tracking-wider">Format Carré 1:1</span>
                    <span className="text-emerald-200">Statut WhatsApp & Réseaux</span>
                  </div>
                  <div className="space-y-1 pt-2">
                    <div className="text-[10px] font-bold text-amber-300 uppercase tracking-widest">Élevage Naturel du Sanguié</div>
                    <h4 className="text-base font-black leading-tight text-white">Le Vrai Poulet Bicyclette Arrive à Votre Table</h4>
                    <p className="text-[11px] text-emerald-100 leading-snug">Sans hormones, sans additifs. Livré en 45 minutes par nos livreurs motorisés.</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-emerald-700/60">
                    <span className="text-sm font-black text-amber-300">3 500 FCFA</span>
                    <span className="text-[10px] font-bold bg-white text-emerald-950 px-2 py-0.5 rounded-full">Commande directe</span>
                  </div>
                </div>

                <div className="p-4 space-y-2 text-xs text-slate-600">
                  <div><strong>Cible prioritaire :</strong> Familles et foyers urbains de Ouaga.</div>
                  <div><strong>Canaux de diffusion :</strong> Statuts WhatsApp des 5 livreurs, Facebook, flyers de quartier.</div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] text-slate-500">
                    Conception graphique autonome sous Adobe Creative Cloud sans coût de prestataire externe.
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0">
                <div className="text-[10px] font-bold text-emerald-800 bg-emerald-50 p-2 rounded-xl text-center">
                  Prêt pour impression & diffusion
                </div>
              </div>
            </div>

            {/* CAMPAGNE 2 */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between">
              <div>
                <div className="bg-gradient-to-br from-amber-900 via-amber-800 to-slate-900 p-5 text-white space-y-3 relative overflow-hidden">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="bg-white text-slate-950 font-black px-2 py-0.5 rounded uppercase tracking-wider">Format Dépliant B2B</span>
                    <span className="text-amber-200">Prospection Maquis</span>
                  </div>
                  <div className="space-y-1 pt-2">
                    <div className="text-[10px] font-bold text-amber-300 uppercase tracking-widest">Offre Professionnelle</div>
                    <h4 className="text-base font-black leading-tight text-white">Approvisionnement Garanti Zéro Rupture</h4>
                    <p className="text-[11px] text-amber-100 leading-snug">Découpes de porc saines et poulets calibrés livrés avant 11h tous les matins.</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-amber-700/60">
                    <span className="text-sm font-black text-amber-300">Tarifs Contrat Pro</span>
                    <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full">Contrat Hebdo</span>
                  </div>
                </div>

                <div className="p-4 space-y-2 text-xs text-slate-600">
                  <div><strong>Cible prioritaire :</strong> Rôtisseries de quartier, maquis et restaurants.</div>
                  <div><strong>Canaux de diffusion :</strong> Remise en main propre par les 5 vendeurs en tournée.</div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] text-slate-500">
                    Fiche tarifaire cartonnée facilitant la conclusion des contrats d'approvisionnement récurrents.
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0">
                <div className="text-[10px] font-bold text-amber-900 bg-amber-50 p-2 rounded-xl text-center">
                  Support clé de la négociation B2B
                </div>
              </div>
            </div>

            {/* CAMPAGNE 3 */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between">
              <div>
                <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-5 text-white space-y-3 relative overflow-hidden">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="bg-emerald-400 text-slate-950 font-black px-2 py-0.5 rounded uppercase tracking-wider">Abonnement Mensuel</span>
                    <span className="text-emerald-200">Santé & Bio</span>
                  </div>
                  <div className="space-y-1 pt-2">
                    <div className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest">Filière Maraîchère Sanguié</div>
                    <h4 className="text-base font-black leading-tight text-white">Le Panier Maraîcher Écologique du Vendredi</h4>
                    <p className="text-[11px] text-slate-300 leading-snug">Légumes frais sans résidus chimiques livrés directement à votre lieu de travail.</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                    <span className="text-sm font-black text-emerald-400">4 000 FCFA / panier</span>
                    <span className="text-[10px] font-bold bg-white text-slate-950 px-2 py-0.5 rounded-full">4 livraisons/mois</span>
                  </div>
                </div>

                <div className="p-4 space-y-2 text-xs text-slate-600">
                  <div><strong>Cible prioritaire :</strong> Cadres, fonctionnaires, personnel soignant et ONG.</div>
                  <div><strong>Canaux de diffusion :</strong> Démarchage des comités d'entreprise et diffusion en ligne.</div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] text-slate-500">
                    Mise en valeur directe de l'impact auprès des 25 agripreneurs formés par le CIDS-Burkina.
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0">
                <div className="text-[10px] font-bold text-slate-800 bg-slate-100 p-2 rounded-xl text-center">
                  Générateur de trésorerie prévisible
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SOUS-ONGLET 5 : INGENIERIE DECISIONNELLE (VIABITARGET & RENTASIM) */}
      {activeTab === 'viabitarget' && (
        <DecisionTools 
          defaultTool="viabitarget" 
          costStructure={costStructure}
          financialTargets={financialTargets}
          setFinancialTargets={setFinancialTargets}
        />
      )}
    </div>
  );
}
