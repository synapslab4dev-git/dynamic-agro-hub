import React from 'react';
import { 
  Camera, FileText, Target, Award, Clock, MapPin, 
  Check, RefreshCw, ChevronRight, Plus
} from 'lucide-react';

export default function SellerAppView({
  currentSeller,
  sellersList,
  currentSellerId,
  setCurrentSellerId,
  prospectViewMode,
  setProspectViewMode,
  sellerInputMode,
  setSellerInputMode,
  ocrDetectedData,
  setOcrDetectedData,
  isScanningPhoto,
  triggerSellerOcrScan,
  confirmOcrData,
  manualChicken,
  setManualChicken,
  manualPork,
  setManualPork,
  manualVeg,
  setManualVeg,
  manualCash,
  setManualCash,
  manualOM,
  setManualOM,
  manualMoov,
  setManualMoov,
  submitManualData,
  setNewProspectModalOpen
}) {
  const currentProspectDone = prospectViewMode === 'week' ? currentSeller.prospectsDoneWeek : currentSeller.prospectsDoneMonth;
  const currentProspectTarget = prospectViewMode === 'week' ? currentSeller.prospectsTargetWeek : currentSeller.prospectsTargetMonth;
  const prospectPercent = Math.min(100, Math.round((currentProspectDone / currentProspectTarget) * 100));

  const currentDateFormatted = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  return (
    <main className="flex-1 max-w-lg w-full mx-auto px-4 py-6 space-y-4">
      {/* SÉLECTEUR DE COMPTE VENDEUR (Pour la démo) */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
            {currentSeller.name.split(' ')[0][0]}{currentSeller.name.split(' ')[1]?.[0] || ''}
          </div>
          <div className="text-xs">
            <div className="font-bold text-slate-900">{currentSeller.name}</div>
            <div className="text-[10px] text-slate-500">{currentSeller.motorcycle}</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2 py-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse"></span>
          <select
            value={currentSellerId}
            onChange={(e) => {
              setCurrentSellerId(e.target.value);
              setSellerInputMode('menu');
              setOcrDetectedData(null);
            }}
            className="text-[11px] font-bold bg-transparent text-slate-700 focus:outline-none cursor-pointer"
            title="Changer de compte livreur (Mode Démo)"
          >
            {sellersList.map(s => (
              <option key={s.id} value={s.id}>{s.name.split(' ')[0]} ({s.id})</option>
            ))}
          </select>
        </div>
      </div>

      {/* BANDEAU TOURNEE DU JOUR DU VENDEUR */}
      <div className="bg-emerald-800 text-white p-4 rounded-3xl shadow-sm space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="bg-emerald-700/80 px-2.5 py-0.5 rounded-full font-semibold text-emerald-200 text-[10px]">
            Tournée du {currentDateFormatted}
          </span>
          <span className="text-emerald-300 flex items-center gap-1 font-medium text-[11px]">
            <Clock className="w-3.5 h-3.5" /> Clôture à 18h00
          </span>
        </div>
        <h2 className="text-base font-black">Espace Livreur : {currentSeller.name.split(' ')[0]}</h2>
        <div className="flex items-center gap-1.5 text-xs text-emerald-100 font-medium bg-emerald-900/50 p-2 rounded-xl">
          <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span className="truncate">{currentSeller.zone}</span>
        </div>
      </div>

      {/* OBJECTIF DE PROSPECTION TERRAIN DU VENDEUR */}
      <div className="bg-white rounded-3xl border border-amber-300 p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-black text-slate-900">Objectif Prospection Terrain</h3>
              <p className="text-[10px] text-slate-500">Nouveaux maquis, rôtisseries & restaurants</p>
            </div>
          </div>
          <div className="flex bg-slate-100 p-0.5 rounded-xl text-[10px] font-bold">
            <button
              type="button"
              onClick={() => setProspectViewMode('week')}
              className={`px-2 py-0.5 rounded-lg transition-colors ${
                prospectViewMode === 'week' ? 'bg-white text-slate-900 shadow-2xs font-black' : 'text-slate-500'
              }`}
            >
              Semaine
            </button>
            <button
              type="button"
              onClick={() => setProspectViewMode('month')}
              className={`px-2 py-0.5 rounded-lg transition-colors ${
                prospectViewMode === 'month' ? 'bg-white text-slate-900 shadow-2xs font-black' : 'text-slate-500'
              }`}
            >
              Mois
            </button>
          </div>
        </div>

        {/* Barre de progression */}
        <div className="space-y-1">
          <div className="flex justify-between items-baseline text-xs">
            <span className="text-[11px] text-slate-600 font-medium">
              {prospectViewMode === 'week' ? 'Cette semaine' : 'Ce mois-ci'} : <strong className="text-slate-900 font-black">{currentProspectDone} / {currentProspectTarget}</strong> prospects contactés
            </span>
            <span className="text-xs font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              {prospectPercent}%
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-amber-500 to-amber-600 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${prospectPercent}%` }}
            />
          </div>
        </div>

        {/* Prime & Bouton d'ajout rapide */}
        <div className="flex items-center justify-between text-[11px] bg-amber-50/80 p-2.5 rounded-2xl border border-amber-200/60">
          <div className="flex items-center gap-1.5 text-amber-950 font-semibold">
            <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>{currentSeller.bonusReward}</span>
          </div>
          <button
            type="button"
            onClick={() => setNewProspectModalOpen(true)}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-2.5 py-1 rounded-xl text-[10px] flex items-center gap-1 shadow-xs transition-transform active:scale-95"
          >
            <Plus className="w-3 h-3" />
            <span>Ajouter Prospect</span>
          </button>
        </div>

        {/* Derniers prospects contactés */}
        {currentSeller.recentProspects && currentSeller.recentProspects.length > 0 && (
          <div className="pt-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Derniers prospects enregistrés :</div>
            <div className="flex flex-wrap gap-1.5">
              {currentSeller.recentProspects.slice(0, 3).map((p, idx) => (
                <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-[10px] font-medium flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span>{p}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CORPS PRINCIPAL DE L'APPLICATION VENDEUR */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4">
        
        {/* ETAT 1 : MENU DE CHOIX DES 2 MODES */}
        {sellerInputMode === 'menu' && (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <h3 className="text-sm font-bold text-slate-900">Déclarer mes livraisons du jour</h3>
              <p className="text-xs text-slate-500">
                Choisissez la méthode la plus simple pour vous :
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 pt-1">
              {/* OPTION 1 : SCAN PHOTO IA */}
              <button
                onClick={() => {
                  setSellerInputMode('camera');
                  setOcrDetectedData(null);
                }}
                className="p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-50/60 hover:bg-emerald-50 text-left flex items-center gap-3.5 transition-all group shadow-xs"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <Camera className="w-6 h-6 text-amber-300" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-emerald-950">1. Scanner ma fiche papier</span>
                    <span className="text-[9px] font-bold bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded">Extraction Rapide</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Prenez en photo votre fiche remplie au stylo. Les données sont lues automatiquement.
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-emerald-700 shrink-0" />
              </button>

              {/* OPTION 2 : SAISIE MANUELLE RAPIDE */}
              <button
                onClick={() => setSellerInputMode('manual')}
                className="p-4 rounded-2xl border border-slate-300 hover:border-slate-400 bg-slate-50/60 hover:bg-slate-50 text-left flex items-center gap-3.5 transition-all group shadow-xs"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-800 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <FileText className="w-6 h-6 text-slate-200" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-black text-slate-900">2. Saisie manuelle directe</span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Entrez directement les quantités et vos montants en 1 minute.
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
              </button>
            </div>

            {/* HISTORIQUE / POINT DE CAISSE DU VENDEUR */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 mt-4">
              <div className="text-[11px] font-bold text-slate-700 flex items-center justify-between">
                <span>Mon point de caisse provisoire</span>
                <span className="text-emerald-700 font-black">
                  {(currentSeller.cashCollected + currentSeller.orangeMoney + currentSeller.moovMoney).toLocaleString()} FCFA
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className="bg-white p-2 rounded-xl border border-slate-200">
                  <div className="text-slate-400">Espèces</div>
                  <div className="font-bold text-slate-800 text-xs">{currentSeller.cashCollected.toLocaleString()} F</div>
                </div>
                <div className="bg-white p-2 rounded-xl border border-slate-200">
                  <div className="text-slate-400">Orange Money</div>
                  <div className="font-bold text-orange-600 text-xs">{currentSeller.orangeMoney.toLocaleString()} F</div>
                </div>
                <div className="bg-white p-2 rounded-xl border border-slate-200">
                  <div className="text-slate-400">Moov Money</div>
                  <div className="font-bold text-blue-600 text-xs">{currentSeller.moovMoney.toLocaleString()} F</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ETAT 2 : MODE PHOTO & EXTRACTION */}
        {sellerInputMode === 'camera' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-emerald-700" />
                Numérisation photo de ma fiche
              </h3>
              <button
                onClick={() => setSellerInputMode('menu')}
                className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
              >
                Retour
              </button>
            </div>

            {!ocrDetectedData ? (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-emerald-400 bg-emerald-50/40 rounded-2xl p-6 text-center space-y-2">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                    <Camera className="w-7 h-7" />
                  </div>
                  <div className="text-xs font-bold text-slate-900">Prendre en photo la fiche manuscrite</div>
                  <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                    Posez votre feuille bien à plat. Le système extrait les livraisons et vos encaissements.
                  </p>
                </div>

                <button
                  onClick={triggerSellerOcrScan}
                  disabled={isScanningPhoto}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-2xl shadow-md flex items-center justify-center gap-2 text-xs transition-all"
                >
                  {isScanningPhoto ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Lecture et analyse en cours...</span>
                    </>
                  ) : (
                    <>
                      <Camera className="w-4 h-4" />
                      <span>Prendre la photo & Extraire</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-950">Chiffres extraits de la fiche :</span>
                    <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">
                      Vérifié 100%
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-white p-2 rounded-xl border border-emerald-100">
                      <div className="font-black text-slate-900">{ocrDetectedData.chicken}</div>
                      <div className="text-[10px] text-slate-500">Poulets</div>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-emerald-100">
                      <div className="font-black text-slate-900">{ocrDetectedData.porkKg} kg</div>
                      <div className="text-[10px] text-slate-500">Porc frais</div>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-emerald-100">
                      <div className="font-black text-slate-900">{ocrDetectedData.vegBaskets}</div>
                      <div className="text-[10px] text-slate-500">Paniers bio</div>
                    </div>
                  </div>

                  <div className="text-xs space-y-1 pt-2 border-t border-emerald-200/80">
                    <div className="flex justify-between text-slate-600 text-[11px]">
                      <span>Espèces en poche :</span>
                      <span className="font-bold text-slate-900">{ocrDetectedData.cash.toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between text-slate-600 text-[11px]">
                      <span>Orange Money reçu :</span>
                      <span className="font-bold text-orange-600">{ocrDetectedData.om.toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between text-slate-600 text-[11px]">
                      <span>Moov Money reçu :</span>
                      <span className="font-bold text-blue-600">{ocrDetectedData.moov.toLocaleString()} FCFA</span>
                    </div>
                    <div className="flex justify-between text-xs font-black text-slate-900 pt-1.5 border-t border-emerald-200">
                      <span>Total à verser / justifier :</span>
                      <span className="text-emerald-800">{ocrDetectedData.total.toLocaleString()} FCFA</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setOcrDetectedData(null)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs"
                  >
                    Reprendre photo
                  </button>
                  <button
                    onClick={confirmOcrData}
                    className="flex-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-xl text-xs shadow-md flex items-center justify-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Confirmer & Enregistrer</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ETAT 3 : MODE SAISIE MANUELLE RAPIDE */}
        {sellerInputMode === 'manual' && (
          <form onSubmit={submitManualData} className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-slate-700" />
                Saisie manuelle directe
              </h3>
              <button
                type="button"
                onClick={() => setSellerInputMode('menu')}
                className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
              >
                Retour
              </button>
            </div>

            <div className="space-y-3">
              <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Quantités livrées aujourd'hui
              </div>
              
              {/* Poulet */}
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <div className="text-xs font-bold text-slate-900">Poulets Bicyclette</div>
                  <div className="text-[10px] text-slate-400">3 500 F l'unité</div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    type="button" 
                    onClick={() => setManualChicken(Math.max(0, manualChicken - 1))}
                    className="w-7 h-7 rounded-lg bg-white border border-slate-300 flex items-center justify-center font-bold text-slate-700"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-bold text-xs">{manualChicken}</span>
                  <button 
                    type="button" 
                    onClick={() => setManualChicken(manualChicken + 1)}
                    className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Porc */}
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <div className="text-xs font-bold text-slate-900">Porc découpé frais</div>
                  <div className="text-[10px] text-slate-400">3 000 F / kg</div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    type="button" 
                    onClick={() => setManualPork(Math.max(0, manualPork - 1))}
                    className="w-7 h-7 rounded-lg bg-white border border-slate-300 flex items-center justify-center font-bold text-slate-700"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-bold text-xs">{manualPork} kg</span>
                  <button 
                    type="button" 
                    onClick={() => setManualPork(manualPork + 1)}
                    className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Panier */}
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <div className="text-xs font-bold text-slate-900">Paniers Maraîchers Bio</div>
                  <div className="text-[10px] text-slate-400">4 000 F / panier</div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    type="button" 
                    onClick={() => setManualVeg(Math.max(0, manualVeg - 1))}
                    className="w-7 h-7 rounded-lg bg-white border border-slate-300 flex items-center justify-center font-bold text-slate-700"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-bold text-xs">{manualVeg}</span>
                  <button 
                    type="button" 
                    onClick={() => setManualVeg(manualVeg + 1)}
                    className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider pt-2">
                Encaissements
              </div>

              <div className="space-y-2">
                <div>
                  <label className="block text-[11px] text-slate-600 mb-0.5">Espèces en poche (FCFA)</label>
                  <input 
                    type="number"
                    value={manualCash}
                    onChange={(e) => setManualCash(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 mb-0.5">Orange Money reçu (FCFA)</label>
                  <input 
                    type="number"
                    value={manualOM}
                    onChange={(e) => setManualOM(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-xs text-orange-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 mb-0.5">Moov Money reçu (FCFA)</label>
                  <input 
                    type="number"
                    value={manualMoov}
                    onChange={(e) => setManualMoov(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-xs text-blue-600"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-2xl shadow-md text-xs transition-all flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Enregistrer ma tournée</span>
            </button>
          </form>
        )}

        {/* ETAT 4 : CONFIRMATION SUCCES */}
        {sellerInputMode === 'success' && (
          <div className="py-6 text-center space-y-3 animate-in zoom-in duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Tournée enregistrée avec succès</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Rapport de {currentSeller.name.split(' ')[0]} transmis au cockpit marketing. Remise de sacoche prévue à la clôture.
            </p>
            <button
              onClick={() => setSellerInputMode('menu')}
              className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold"
            >
              Retour à l'accueil
            </button>
          </div>
        )}

      </div>

      <div className="text-center text-[11px] text-slate-400">
        Dynamic Agro • Terminal Vendeur Terrain
      </div>
    </main>
  );
}
