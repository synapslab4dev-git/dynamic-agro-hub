import React from 'react';
import { 
  ShieldCheck, Award, TrendingUp, DollarSign, 
  FileSpreadsheet, Printer, Download, CheckCircle2, 
  Clock, Landmark, AlertCircle, ArrowUpRight 
} from 'lucide-react';
import { BANKING_METRICS } from '../data';

export default function BankingScorecard({
  costStructure,
  totalDailyRevenue,
  totalOrangeMoney,
  totalMoovMoney,
  showCharts = false,
  onOpenSettings
}) {
  const currentLoanPayment = costStructure?.fixedMonthlyCharges?.loanRepaymentMonthly || BANKING_METRICS.monthlyInstallment;
  const breakEven = costStructure?.monthlyBreakEvenRevenue || 3527777;
  const currentMonthlyRevenue = costStructure?.monthlyCurrentRevenue || 4725000;
  const netSurplus = costStructure?.monthlyNetSurplus || 431000;

  // Calcul du taux de remboursement du prêt
  const paidRatio = Math.round(((BANKING_METRICS.activeLoanPrincipal - BANKING_METRICS.loanBalanceRemaining) / BANKING_METRICS.activeLoanPrincipal) * 100);

  // Fonction d'export CSV / Excel
  const handleExportCSV = () => {
    const rows = [
      ["DYNAMIC AGRO HUB - FICHE DE SANTE FINANCIERE ET BILAN BANCAIRE"],
      ["Date d'extraction", new Date().toLocaleDateString('fr-FR')],
      ["Localisation", "Centrale de Zagtouli / Ouagadougou / Sanguié"],
      [""],
      ["1. RATIOS DE SOLVABILITE ET SANTE FINANCIERE"],
      ["Indicateur", "Valeur Observee", "Norme Bancaire", "Statut"],
      ["Note Globale de Solvabilite", "Grade A+", "Min. Grade B", "Excellent - Eligible lignes de credit"],
      ["Ratio de Liquidite Generale (Current Ratio)", BANKING_METRICS.currentRatio.toString(), "> 1.50", "Conforme / Tres solide"],
      ["Ratio de Liquidite Reduite (Quick Ratio)", BANKING_METRICS.quickRatio.toString(), "> 1.00", "Conforme / Tres liquide"],
      ["Ratio d'Endettement Net (Debt-to-Equity)", (BANKING_METRICS.debtToEquity * 100).toFixed(0) + "%", "< 80%", "Faible endettement"],
      ["Fonds de Roulement Net Global", BANKING_METRICS.workingCapitalFCFA + " FCFA", "> 2 000 000 FCFA", "Excedentaire"],
      [""],
      ["2. SUIVI DE L'EMPRUNT D'EQUIPEMENT FROID"],
      ["Poste", "Montant (FCFA)"],
      ["Capital Initial Emprunte", BANKING_METRICS.activeLoanPrincipal.toString()],
      ["Solde Restant a Rembourser", BANKING_METRICS.loanBalanceRemaining.toString()],
      ["Mensualite Prelevee", currentLoanPayment.toString()],
      ["Progression des Mensualites", BANKING_METRICS.repaymentProgressMonths],
      [""],
      ["3. STRUCTURE DES CHARGES FIXES MENSUELLES (ZAGTOULI)"],
      ["Poste de Depense", "Montant Mensuel (FCFA)"],
      ["Chambre Froide et Electricite", (costStructure?.fixedMonthlyCharges?.coldRoomEnergy || 240000).toString()],
      ["Loyer Entrepot Zagtouli", (costStructure?.fixedMonthlyCharges?.warehouseRentZagtouli || 180000).toString()],
      ["Salaires Equipe et Admin", (costStructure?.fixedMonthlyCharges?.salariesAndAdmin || 550000).toString()],
      ["Entretien Flotte 5 Motos", (costStructure?.fixedMonthlyCharges?.maintenanceVehicles || 85000).toString()],
      ["Marketing et Publicite Terrain", (costStructure?.fixedMonthlyCharges?.marketingAndAds || 95000).toString()],
      ["Mensualite Credit Froid", currentLoanPayment.toString()],
      ["TOTAL CHARGES FIXES MENSUELLES", (costStructure?.fixedMonthlyCharges?.totalFixed || 1270000).toString()],
      ["Seuil de Rentabilite (Point Mort)", breakEven.toString()],
      ["Chiffre d'Affaires Mensuel Constate", currentMonthlyRevenue.toString()],
      ["Excedent Net Mensuel", netSurplus.toString()]
    ];

    const csvContent = "\uFEFF" + rows.map(e => e.map(cell => `"${(cell || '').toString().replace(/"/g, '""')}"`).join(";")).join("\r\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Fiche_Bancaire_Dynamic_Agro_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
      {/* EN-TETE AVEC TITRE ET BOUTONS D'EXPORT */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-900">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black text-slate-900">Santé Financière, Solvabilité & Ratios Bancaires</h3>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Grade A+
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Dossier certifié pour banques partenaires (Coris Bank, Ecobank), institutions de microfinance & bailleurs du CIDS-Burkina.
            </p>
          </div>
        </div>

        {/* BOUTONS ACTIONS EXPORT */}
        <div className="flex flex-wrap items-center gap-2">
          {onOpenSettings && (
            <button
              type="button"
              onClick={onOpenSettings}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors flex items-center gap-1.5"
            >
              <span>Ajuster les Charges</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleExportCSV}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors flex items-center gap-1.5"
            title="Télécharger les données au format tableur Excel / CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
            <span>Export CSV / Excel</span>
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-sm transition-colors flex items-center gap-1.5"
            title="Imprimer ou enregistrer en PDF la fiche bancaire"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimer / PDF</span>
          </button>
        </div>
      </div>

      {/* 4 CARTES DE RATIOS CLEFS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Current Ratio */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Liquidité Générale (Current Ratio)
          </div>
          <div className="text-2xl font-black text-slate-900 flex items-baseline gap-1">
            <span>{BANKING_METRICS.currentRatio}x</span>
            <span className="text-xs font-bold text-emerald-700">(Norme &gt; 1.5)</span>
          </div>
          <div className="text-[10px] text-slate-500 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>Actif circulant couvre 2.15x les dettes CT</span>
          </div>
        </div>

        {/* Quick Ratio */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Liquidité Réduite (Quick Ratio)
          </div>
          <div className="text-2xl font-black text-slate-900 flex items-baseline gap-1">
            <span>{BANKING_METRICS.quickRatio}x</span>
            <span className="text-xs font-bold text-emerald-700">(Norme &gt; 1.0)</span>
          </div>
          <div className="text-[10px] text-slate-500 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>Trésorerie immédiate + créances saines</span>
          </div>
        </div>

        {/* Debt to Equity */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Ratio d'Endettement (Debt-to-Equity)
          </div>
          <div className="text-2xl font-black text-slate-900 flex items-baseline gap-1">
            <span>{(BANKING_METRICS.debtToEquity * 100).toFixed(0)}%</span>
            <span className="text-xs font-bold text-emerald-700">(Plafond 80%)</span>
          </div>
          <div className="text-[10px] text-slate-500 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>Autonomie financière très forte</span>
          </div>
        </div>

        {/* Working Capital */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Fonds de Roulement Net (FRNG)
          </div>
          <div className="text-xl font-black text-emerald-700">
            {BANKING_METRICS.workingCapitalFCFA.toLocaleString()} <span className="text-xs font-medium text-slate-500">F</span>
          </div>
          <div className="text-[10px] text-slate-500 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
            <span>Autonomie de trésorerie sans découvert</span>
          </div>
        </div>
      </div>

      {/* SUIVI DE L'EMPRUNT D'EQUIPEMENT DE LA CENTRALE */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Crédit Bancaire Équipement Froid & Stockage (Chambre Froide Zagtouli)
              </h4>
              <p className="text-[11px] text-slate-300">
                Financement initial : {BANKING_METRICS.activeLoanPrincipal.toLocaleString()} FCFA • Taux négocié 7.5%
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-slate-400">Mensualité fixe intégrée aux charges :</span>
            <div className="text-sm font-black text-amber-400">{currentLoanPayment.toLocaleString()} FCFA / mois</div>
          </div>
        </div>

        {/* PROGRESSION AMORTISSEMENT */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300 font-medium">
              Amortissement du capital : <strong>{BANKING_METRICS.repaymentProgressMonths}</strong>
            </span>
            <span className="font-bold text-emerald-400">{paidRatio}% remboursé</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2.5 rounded-full transition-all duration-700"
              style={{ width: `${paidRatio}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>Capital amorti : {(BANKING_METRICS.activeLoanPrincipal - BANKING_METRICS.loanBalanceRemaining).toLocaleString()} FCFA</span>
            <span className="text-amber-300 font-semibold">Solde restant dû : {BANKING_METRICS.loanBalanceRemaining.toLocaleString()} FCFA</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs border-t border-slate-800 text-slate-300">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>0 incident de paiement constaté</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Prélèvement automatique le 5 du mois</span>
          </div>
          <div className="flex items-center gap-2">
            <ArrowUpRight className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Fin de remboursement : Dans 18 mois</span>
          </div>
        </div>
      </div>

      {/* REPRÉSENTATION VISUELLE OPTIONNELLE QUAND LES GRAPHES SONT ACTIVÉS */}
      {showCharts && (
        <div className="bg-emerald-50/40 border border-emerald-200 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-900">
            <span className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-700" />
              <span>Graphe Comparatif : Couverture de Solvabilité & Sécurité Bancaire</span>
            </span>
            <span className="text-emerald-800 font-black">Indice de Confiance : 96/100</span>
          </div>

          <div className="space-y-2.5">
            {/* Barre Liquidité */}
            <div>
              <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                <span>Capacité de remboursement immédiat (Trésorerie vs Dettes CT)</span>
                <span className="font-bold text-slate-900">215% de la norme de sécurité</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>

            {/* Barre Autonomie */}
            <div>
              <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                <span>Autonomie financière (Capitaux propres vs Dettes globales)</span>
                <span className="font-bold text-slate-900">Niveau d'exposition au risque : Faible (38%)</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-emerald-700 h-2 rounded-full" style={{ width: '62%' }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
