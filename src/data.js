// Données réelles simulées pour la démo Dynamic Agro (Ouagadougou & Zagtouli)

export const SELLERS = [
  {
    id: "VND-01",
    name: "Ibrahim KABORE",
    motorcycle: "Yamaha 115 (11-GH-2431)",
    zone: "Zone 1 : Ouaga 2000, Patte d'Oie, Kalgondin",
    status: "active",
    tourStatus: "En tournée (Liaison B2B & Particuliers)",
    cashCollected: 78500,
    orangeMoney: 45000,
    moovMoney: 15000,
    salesCount: 14,
    itemsSold: { chicken: 12, porkKg: 8, vegBaskets: 6 },
    phone: "22670112233",
    prospectsDoneMonth: 22,
    prospectsTargetMonth: 30,
    prospectsDoneWeek: 5,
    prospectsTargetWeek: 7,
    bonusReward: "Prime 15 000 FCFA à 30 comptes",
    recentProspects: ["Maquis Le Baobab (Patte d'Oie)", "Rôtisserie Chez Jules (Ouaga 2000)"]
  },
  {
    id: "VND-02",
    name: "Moussa OUEDRAOGO",
    motorcycle: "Sanili 110 (11-JP-8892)",
    zone: "Zone 2 : Somgandé, Wayalghin, Kossodo",
    status: "active",
    tourStatus: "En tournée (Zone industrielle & Résidentiel)",
    cashCollected: 64000,
    orangeMoney: 38500,
    moovMoney: 12000,
    salesCount: 11,
    itemsSold: { chicken: 10, porkKg: 5, vegBaskets: 9 },
    phone: "22676445566",
    prospectsDoneMonth: 17,
    prospectsTargetMonth: 25,
    prospectsDoneWeek: 4,
    prospectsTargetWeek: 6,
    bonusReward: "Prime 10 000 FCFA à 25 comptes",
    recentProspects: ["Maquis Zone Verte (Kossodo)", "Restaurant Bel Air (Somgandé)"]
  },
  {
    id: "VND-03",
    name: "Awa SAWADOGO",
    motorcycle: "TVS Star (11-KL-5541)",
    zone: "Zone 3 : Koulouba, Paspanga, Centre d'affaires",
    status: "active",
    tourStatus: "Tournée clôturée (Point de caisse visé)",
    cashCollected: 92000,
    orangeMoney: 62000,
    moovMoney: 20000,
    salesCount: 18,
    itemsSold: { chicken: 15, porkKg: 12, vegBaskets: 8 },
    phone: "22678990011",
    prospectsDoneMonth: 24,
    prospectsTargetMonth: 28,
    prospectsDoneWeek: 6,
    prospectsTargetWeek: 6,
    bonusReward: "Prime 12 500 FCFA à 28 comptes",
    recentProspects: ["Cafet' Clinique Notre-Dame", "Maquis Du Boulevard (Koulouba)"]
  },
  {
    id: "VND-04",
    name: "Seydou ZONGO",
    motorcycle: "Yamaha Crypton (11-LM-9012)",
    zone: "Zone 4 : Pissy, Tampouy, Cité An III",
    status: "active",
    tourStatus: "En tournée (Grillades & Maquis populaires)",
    cashCollected: 58000,
    orangeMoney: 31500,
    moovMoney: 8000,
    salesCount: 9,
    itemsSold: { chicken: 8, porkKg: 6, vegBaskets: 7 },
    phone: "22671223344",
    prospectsDoneMonth: 15,
    prospectsTargetMonth: 20,
    prospectsDoneWeek: 3,
    prospectsTargetWeek: 5,
    bonusReward: "Prime 8 000 FCFA à 20 comptes",
    recentProspects: ["Maquis La Jeunesse (Pissy)", "Rôtisserie Tampouy"]
  },
  {
    id: "VND-05",
    name: "Fatou COMPAORE",
    motorcycle: "Rato 110 (11-RT-3321)",
    zone: "Zone 5 : Dassasgho, Wemtenga, 1200 Logements",
    status: "active",
    tourStatus: "En tournée (Foyers & Fast-foods)",
    cashCollected: 52500,
    orangeMoney: 28000,
    moovMoney: 10000,
    salesCount: 8,
    itemsSold: { chicken: 7, porkKg: 4, vegBaskets: 5 },
    phone: "22675667788",
    prospectsDoneMonth: 18,
    prospectsTargetMonth: 22,
    prospectsDoneWeek: 4,
    prospectsTargetWeek: 5,
    bonusReward: "Prime 9 000 FCFA à 22 comptes",
    recentProspects: ["Grillades des 1200", "Alimentation Wemtenga"]
  }
];

export const ORDERS = [
  {
    id: "CMD-2026-089",
    clientName: "Rôtisserie Le Gourmet (M. Sanou)",
    clientType: "B2B Pro",
    phone: "22670258090",
    address: "Ouaga 2000, face station Shell",
    items: "10 Poulets bicyclette + 5 kg porc découpé",
    totalAmount: 52500,
    paymentStatus: "Payé (Orange Money)",
    deliveryStatus: "Livré à 10h45",
    assignedSeller: "Ibrahim KABORE",
    satisfactionSent: false
  },
  {
    id: "CMD-2026-090",
    clientName: "Mme Clarisse BAZIÉ",
    clientType: "Particulier",
    phone: "22676114477",
    address: "Somgandé, près pharmacie Béthania",
    items: "2 Poulets écologiques + 1 Panier maraîcher Bio",
    totalAmount: 11000,
    paymentStatus: "Payé (Espèces)",
    deliveryStatus: "Livré à 11h20",
    assignedSeller: "Moussa OUEDRAOGO",
    satisfactionSent: true
  },
  {
    id: "CMD-2026-091",
    clientName: "Maquis Le Sanguié (M. Kindo)",
    clientType: "B2B Pro",
    phone: "22678335588",
    address: "Pissy, rond-point de la jeunesse",
    items: "15 kg Viande de porc saine (découpes fraîches)",
    totalAmount: 45000,
    paymentStatus: "Payé (Moov Money)",
    deliveryStatus: "Livré à 12h10",
    assignedSeller: "Seydou ZONGO",
    satisfactionSent: false
  },
  {
    id: "CMD-2026-092",
    clientName: "Dr. Emile TIENDREBEOGO",
    clientType: "Particulier",
    phone: "22670998877",
    address: "Koulouba, clinique Notre-Dame",
    items: "3 Poulets bicyclette écologiques",
    totalAmount: 10500,
    paymentStatus: "Payé (Orange Money)",
    deliveryStatus: "Livré à 12h35",
    assignedSeller: "Awa SAWADOGO",
    satisfactionSent: true
  }
];

export const B2B_PIPELINE = [
  {
    id: "LEAD-01",
    establishment: "Rôtisserie Chez Jules",
    contactName: "M. Jules Ilboudo",
    phone: "22670223344",
    zone: "Ouaga 2000",
    potentialWeekly: "35 Poulets bicyclette / sem",
    estimatedMonthlyRevenue: 490000,
    stage: "contract",
    sellerOrigin: "Ibrahim KABORE",
    notes: "Contrat d'approvisionnement récurrent signé (livraison lundi & jeudi matin avant 10h)."
  },
  {
    id: "LEAD-02",
    establishment: "Maquis Le Calao",
    contactName: "Mme Salimata Diallo",
    phone: "22678112288",
    zone: "Somgandé",
    potentialWeekly: "20 kg Porc frais + 15 Poulets / sem",
    estimatedMonthlyRevenue: 450000,
    stage: "negotiation",
    sellerOrigin: "Moussa OUEDRAOGO",
    notes: "Dégustation test concluante le 14/09. Discussion sur remise de 5% à partir de 50 kg/mois."
  },
  {
    id: "LEAD-03",
    establishment: "Clinique & Cafétéria Notre-Dame",
    contactName: "Gestionnaire Intendance",
    phone: "22676554433",
    zone: "Koulouba",
    potentialWeekly: "8 Paniers bio + 10 Poulets / sem",
    estimatedMonthlyRevenue: 270000,
    stage: "negotiation",
    sellerOrigin: "Awa SAWADOGO",
    notes: "Exigence de certification biologique Sanguié et facture normalisée mensuelle."
  },
  {
    id: "LEAD-04",
    establishment: "Grillades La Bonne Braise",
    contactName: "Chef Karim",
    phone: "22671998811",
    zone: "Pissy",
    potentialWeekly: "25 kg Porc découpé / sem",
    estimatedMonthlyRevenue: 300000,
    stage: "contacted",
    sellerOrigin: "Seydou ZONGO",
    notes: "Premier contact terrain. Échantillon de côtelettes et travers livré pour évaluation."
  },
  {
    id: "LEAD-05",
    establishment: "Restaurant L'Orchidée Gourmande",
    contactName: "Mme Traoré",
    phone: "22675443322",
    zone: "1200 Logements",
    potentialWeekly: "12 Paniers maraîchers + 10 Poulets / sem",
    estimatedMonthlyRevenue: 332000,
    stage: "contacted",
    sellerOrigin: "Fatou COMPAORE",
    notes: "Intéressée par les légumes sans résidus chimiques pour sa carte diététique."
  }
];

export const SAV_COMPLAINTS = [
  {
    id: "REC-2026-012",
    clientName: "Rôtisserie Le Gourmet",
    orderRef: "CMD-2026-085",
    type: "Calibrage poids",
    detail: "2 poulets en deçà du gabarit standard 1,4 kg constaté à la pesée.",
    timeElapsed: "Résolu en 2h15",
    status: "resolved",
    actionTaken: "Avoir déduit sur la commande du jour + note envoyée au centre de pesée Zagtouli.",
    seller: "Ibrahim KABORE"
  },
  {
    id: "REC-2026-013",
    clientName: "Dr. Emile TIENDREBEOGO",
    orderRef: "CMD-2026-079",
    type: "Horaire de livraison",
    detail: "Légère avance de 20 min sans préavis téléphonique alors qu'en consultation.",
    timeElapsed: "Traité en 45 min",
    status: "resolved",
    actionTaken: "Appel de courtoisie du responsable marketing et calage des créneaux stricts.",
    seller: "Awa SAWADOGO"
  },
  {
    id: "REC-2026-014",
    clientName: "Maquis Le Sanguié",
    orderRef: "CMD-2026-091",
    type: "Conditionnement porc",
    detail: "Demande de découpes plus fines pour les brochettes apéritives du soir.",
    timeElapsed: "En cours",
    status: "in_progress",
    actionTaken: "Brief transmis à l'atelier de découpe pour standardiser le calibre brochette.",
    seller: "Seydou ZONGO"
  }
];

export const SOCIAL_CALENDAR = [
  {
    id: "SOC-01",
    day: "Lundi 08h30",
    channel: "WhatsApp Status (5 motos) + Facebook",
    format: "Visuel Carré 1:1",
    theme: "Arrivée du Sanguié : Poulets frais abattus le matin",
    objective: "Commandes de la semaine pour rôtisseries & particuliers",
    views: 1420,
    leadsGenerated: 18,
    ordersTriggered: 11,
    status: "published"
  },
  {
    id: "SOC-02",
    day: "Mercredi 11h00",
    channel: "WhatsApp Status + Groupes pros",
    format: "Fiche Promo Découpes",
    theme: "Spécial Maquis : Porc frais désossé prêt pour brochettes",
    objective: "Réservation des stocks pour le week-end",
    views: 980,
    leadsGenerated: 12,
    ordersTriggered: 8,
    status: "published"
  },
  {
    id: "SOC-03",
    day: "Vendredi 07h30",
    channel: "WhatsApp Business Broadcast",
    format: "Affiche Panier Bio",
    theme: "Livraison au bureau : Panier maraîcher fraîcheur du Sanguié",
    objective: "Abonnements familles & foyers urbains",
    views: 1850,
    leadsGenerated: 24,
    ordersTriggered: 16,
    status: "published"
  },
  {
    id: "SOC-04",
    day: "Samedi 10h00",
    channel: "Story Facebook & WhatsApp",
    format: "Coulisses Éleveurs",
    theme: "Focus Producteur : L'Incubateur Agribusiness du CIDS-Burkina et nos 25 agripreneurs",
    objective: "Crédibilité de marque & authenticité territoriale",
    views: 1100,
    leadsGenerated: 7,
    ordersTriggered: 4,
    status: "scheduled"
  }
];

export const PRODUCTS_CATALOG = [
  {
    id: "prod-chick",
    name: "Poulet Bicyclette Écologique",
    category: "Aviculture Améliorée",
    price: 3500,
    purchasePriceSanguié: 2170,
    unit: "l'unité (vif ou abattu)",
    origin: "Incubateur Sanguié / Clusters partenaires",
    marginRate: "38%",
    logisticsCostUnit: 350,
    netMarginUnit: 980,
    periods: {
      week: { initialStock: 120, sold: 56, currentStock: 64 },
      month: { initialStock: 450, sold: 386, currentStock: 64 },
      quarter: { initialStock: 1350, sold: 1286, currentStock: 64 },
      year: { initialStock: 5200, sold: 5136, currentStock: 64 }
    }
  },
  {
    id: "prod-pork",
    name: "Viande de Porc Saine (Découpes fraîches)",
    category: "Élevage Porcin",
    price: 3000,
    purchasePriceSanguié: 2040,
    unit: "le kg",
    origin: "Fermes affiliées Dynamic Agro (Zagtouli)",
    marginRate: "32%",
    logisticsCostUnit: 320,
    netMarginUnit: 640,
    periods: {
      week: { initialStock: 140, sold: 55, currentStock: 85 },
      month: { initialStock: 520, sold: 435, currentStock: 85 },
      quarter: { initialStock: 1600, sold: 1515, currentStock: 85 },
      year: { initialStock: 6200, sold: 6115, currentStock: 85 }
    }
  },
  {
    id: "prod-veg",
    name: "Panier Maraîcher Écologique (Tomates, Oignons, Piments)",
    category: "Maraîchage & Fruits",
    price: 4000,
    purchasePriceSanguié: 2200,
    unit: "le panier de 5kg",
    origin: "Clusters maraîchers du Sanguié (Koudougou)",
    marginRate: "45%",
    logisticsCostUnit: 450,
    netMarginUnit: 1350,
    periods: {
      week: { initialStock: 80, sold: 40, currentStock: 40 },
      month: { initialStock: 320, sold: 280, currentStock: 40 },
      quarter: { initialStock: 950, sold: 910, currentStock: 40 },
      year: { initialStock: 3800, sold: 3760, currentStock: 40 }
    }
  }
];

export const INITIAL_COST_STRUCTURE = {
  fixedMonthlyCharges: {
    coldRoomEnergy: 240000,
    warehouseRentZagtouli: 180000,
    salariesAndAdmin: 550000,
    maintenanceVehicles: 85000,
    marketingAndAds: 95000,
    loanRepaymentMonthly: 120000, // Mensualité remboursement prêt bancaire / équipement
    totalFixed: 1270000
  },
  variableRates: {
    logisticsFuelPerOrderAverage: 400,
    packagingHygienePerOrder: 250,
    lossAndShrinkageRate: "2.4% (sous chaîne du froid)"
  },
  averageBasketRevenue: 28500,
  averageBasketMarginContribution: 10260,
  monthlyBreakEvenRevenue: 3527777, // Charges fixes / 0.36
  monthlyCurrentRevenue: 4725000,
  monthlyNetSurplus: 431000
};

export const COST_STRUCTURE = INITIAL_COST_STRUCTURE;

export const BANKING_METRICS = {
  activeLoanPrincipal: 3600000, // Capital initial prêt bancaire équipement froid
  loanBalanceRemaining: 2160000, // Solde restant à rembourser
  monthlyInstallment: 120000, // Mensualité prélevée
  repaymentProgressMonths: "12 / 30 mensualités honorées (100% à l'heure)",
  currentRatio: 2.15, // Ratio de liquidité générale (Actif circulant / Dettes court terme) -> Solvable > 1.5
  quickRatio: 1.48, // Ratio de liquidité réduite (Trésorerie + créances / DCT) -> Solvable > 1.0
  debtToEquity: 0.38, // Ratio d'endettement net (38% des capitaux propres) -> Excellent < 1.0
  workingCapitalFCFA: 3450000, // Fonds de roulement net disponible
  solvencyGrade: "A+ (Excellent profil bancaire & éligibilité aux lignes de crédit)"
};

export const CIDS_METRICS = {
  sanguiéFarmersCount: 25,
  clustersCount: 6,
  totalKgAbsorbedThisMonth: 1450,
  directIncomeDistributedFCFA: 3850000,
  urbanDemandRate: "+28% de croissance mensuelle à Ouaga",
  topRequestedProduct: "Poulet bicyclette écologique (3 500 FCFA)",
  priceStabilityScore: "94% de conformité aux prix cibles"
};
