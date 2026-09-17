import React, { useState } from 'react';
import { SlidersHorizontal, AlertTriangle, ShieldCheck, Check, DollarSign, X, Calculator, Info } from 'lucide-react';

export default function ChargesSettingsModal({
  isOpen,
  onClose,
  costStructure,
  onSave,
  showToast
}) {
  if (!isOpen) return null;

  const currentFixed = costStructure?.fixedMonthlyCharges || {};

  const [coldRoomEnergy, setColdRoomEnergy] = useState(currentFixed.coldRoomEnergy || 240000);
  const [warehouseRent, setWarehouseRent] = useState(currentFixed.warehouseRentZagtouli || 180000);
  const [salariesAdmin, setSalariesAdmin] = useState(currentFixed.salariesAndAdmin || 550000);
  const [maintenanceVehicles, setMaintenanceVehicles] = useState(currentFixed.maintenanceVehicles || 85000);
  const [marketingAds, setMarketingAds] = useState(currentFixed.marketingAndAds || 95000);
  const [loanRepaymentMonthly, setLoanRepaymentMonthly] = useState(currentFixed.loanRepaymentMonthly || 120000);

  // État de double confirmation : 'edit' | 'confirming'
  const [step, setStep] = useState('edit');

  const totalFixed = Number(coldRoomEnergy || 0) + 
                     Number(warehouseRent || 0) + 
                     Number(salariesAdmin || 0) + 
                     Number(maintenanceVehicles || 0) + 
                     Number(marketingAds || 0) + 
                     Number(loanRepaymentMonthly || 0);

  const avgMarginRate = 0.36; // Marge brute commerciale 36%
  const simulatedBreakEven = Math.round(totalFixed / avgMarginRate);

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    if (totalFixed <= 0) return;
    setStep('confirming');
  };

  const handleFinalConfirm = () => {
    const updatedCostStructure = {
      ...costStructure,
      fixedMonthlyCharges: {
        coldRoomEnergy: Number(coldRoomEnergy),
        warehouseRentZagtouli: Number(warehouseRent),
        salariesAndAdmin: Number(salariesAdmin),
        maintenanceVehicles: Number(maintenanceVehicles),
        marketingAndAds: Number(marketingAds),
        loanRepaymentMonthly: Number(loanRepaymentMonthly),
        totalFixed: totalFixed
      },
      monthlyBreakEvenRevenue: simulatedBreakEven,
      monthlyNetSurplus: Math.max(0, (costStructure?.monthlyCurrentRevenue || 4725000) - simulatedBreakEven)
    };

    onSave(updatedCostStructure);
    if (showToast) {
      showToast("Structure des charges d'exploitation mise à jour avec succès");
    }
    setStep('edit');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in duration-200 my-8">
        {/* EN-TETE MODALE */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-900">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">Structure des Coûts & Charges d'Exploitation</h3>
              <p className="text-xs text-slate-500">Paramétrage des charges fixes de la centrale de Zagtouli</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={() => { setStep('edit'); onClose(); }}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ÉTAPE 1 : FORMULAIRE DE SAISIE */}
        {step === 'edit' && (
          <form onSubmit={handleInitialSubmit} className="space-y-4">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-600">
              <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                Ces montants définissent le coût de base incompressible nécessaire au fonctionnement du Hub. Tout ajustement recalcule immédiatement le <strong>seuil de rentabilité (Point Mort)</strong> et les quotas de vente <strong>ViabiTarget</strong>.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Chambre Froide & Énergie (FCFA)
                </label>
                <input
                  type="number"
                  min="0"
                  step="5000"
                  value={coldRoomEnergy}
                  onChange={(e) => setColdRoomEnergy(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-hidden bg-white"
                  required
                />
                <span className="text-[10px] text-slate-400">Électricité groupe & compresseurs</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Loyer Entrepôt Zagtouli (FCFA)
                </label>
                <input
                  type="number"
                  min="0"
                  step="5000"
                  value={warehouseRent}
                  onChange={(e) => setWarehouseRent(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-hidden bg-white"
                  required
                />
                <span className="text-[10px] text-slate-400">Bâtiment de stockage & bureaux</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Salaires Équipe & Admin (FCFA)
                </label>
                <input
                  type="number"
                  min="0"
                  step="10000"
                  value={salariesAdmin}
                  onChange={(e) => setSalariesAdmin(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-hidden bg-white"
                  required
                />
                <span className="text-[10px] text-slate-400">Gestionnaires, magasinier & caisse</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Entretien Flotte 5 Motos (FCFA)
                </label>
                <input
                  type="number"
                  min="0"
                  step="5000"
                  value={maintenanceVehicles}
                  onChange={(e) => setMaintenanceVehicles(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-hidden bg-white"
                  required
                />
                <span className="text-[10px] text-slate-400">Vidanges, pneumatiques & révisions</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Budget Marketing & Publicité (FCFA)
                </label>
                <input
                  type="number"
                  min="0"
                  step="5000"
                  value={marketingAds}
                  onChange={(e) => setMarketingAds(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-hidden bg-white"
                  required
                />
                <span className="text-[10px] text-slate-400">Flyers B2B, WhatsApp & promotion</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-amber-900 mb-1">
                  Mensualité Emprunt Froid (FCFA)
                </label>
                <input
                  type="number"
                  min="0"
                  step="5000"
                  value={loanRepaymentMonthly}
                  onChange={(e) => setLoanRepaymentMonthly(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-500 outline-hidden bg-amber-50/50"
                  required
                />
                <span className="text-[10px] text-slate-400">Remboursement crédit bancaire</span>
              </div>
            </div>

            {/* SYNTHÈSE CALCULÉE EN DIRECT */}
            <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white p-4 rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300">Total Charges Fixes Mensuelles :</span>
                <strong className="text-amber-400 text-sm font-black">{totalFixed.toLocaleString()} FCFA</strong>
              </div>
              <div className="flex justify-between items-center text-xs border-t border-slate-700 pt-1.5">
                <span className="text-slate-300">Nouveau Point Mort Mensuel (CA Seuil) :</span>
                <strong className="text-emerald-300 text-sm font-black">{simulatedBreakEven.toLocaleString()} FCFA</strong>
              </div>
              <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
                <span>Base taux de marge brute : 36%</span>
                <span>Point mort journalier : ~{Math.round(simulatedBreakEven / 26).toLocaleString()} FCFA / jour</span>
              </div>
            </div>

            {/* BOUTONS ACTIONS */}
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-black text-white bg-amber-600 hover:bg-amber-700 shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Étape suivante : Valider les modifications</span>
                <Check className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* ÉTAPE 2 : DOUBLE CONFIRMATION DE SÉCURITÉ */}
        {step === 'confirming' && (
          <div className="space-y-4 py-2">
            <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-2xl flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1.5">
                <h4 className="text-xs font-black text-amber-900 uppercase tracking-wider">
                  Confirmation de sécurité requise (Étape 2/2)
                </h4>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Vous êtes sur le point de modifier la structure officielle des charges d'exploitation de Dynamic Agro Zagtouli.
                </p>
                <div className="bg-white/80 p-2.5 rounded-xl text-xs text-slate-700 space-y-1 font-medium border border-amber-200">
                  <div className="flex justify-between">
                    <span>Nouveau total charges fixes :</span>
                    <strong className="text-slate-900">{totalFixed.toLocaleString()} FCFA / mois</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Nouveau seuil de rentabilité :</span>
                    <strong className="text-emerald-700">{simulatedBreakEven.toLocaleString()} FCFA / mois</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Mensualité prêt bancaire incluse :</span>
                    <strong className="text-amber-700">{Number(loanRepaymentMonthly).toLocaleString()} FCFA</strong>
                  </div>
                </div>
                <p className="text-[11px] text-amber-700 font-medium">
                  Cette validation recalculera immédiatement les indicateurs de rentabilité, les quotas ViabiTarget et le reporting bancaire.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep('edit')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Retour aux modifications
              </button>
              <button
                type="button"
                onClick={handleFinalConfirm}
                className="px-5 py-2.5 rounded-xl text-xs font-black text-white bg-emerald-700 hover:bg-emerald-800 shadow-lg shadow-emerald-700/30 transition-all flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>Confirmer et Appliquer la Nouvelle Structure</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
