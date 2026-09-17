# DOSSIER DE PRÉSENTATION TECHNIQUE & FONCTIONNEL
## Plateforme « Dynamic Agro Hub » — Démonstrateur Stratégique

**Candidat :** François KINDA  
**Poste visé :** Responsable Marketing & Relation Client  
**Organisation :** Dynamic Agro / Centre d'Initiatives pour le Développement Solidaire (CIDS-Burkina)  
**Environnement technologique :** React 19, Vite, Tailwind CSS v4, Lucide Icons, Vanilla SVG Visualizations  
**Date de version :** Septembre 2026  

---

## 1. VISION STRATÉGIQUE & CONTEXTE DU PROJET

### 1.1 La Problématique Économique Réelle
Le **Centre d'Initiatives pour le Développement Solidaire (CIDS-Burkina)**, fondé par Nébila Frédéric Bationo, à travers son **Incubateur Agribusiness établi dans la province du Sanguié** (à 110 km de Ouagadougou), forme et installe 25 jeunes agripreneurs ruraux spécialisés dans trois filières prioritaires :
1. **L'Aviculture locale améliorée** (Poulet bicyclette écologique élevé au grain local),
2. **L'Élevage porcin sain** (Viande fraîche découpée aux normes d'hygiène strictes),
3. **Le Maraîchage agro-écologique** (Paniers de légumes bio : tomates, oignons, piments, aubergines).

Dans la majorité des projets de développement rural en Afrique de l'Ouest, le goulot d'étranglement n'est pas la capacité de production, mais **l'accès au marché solvable**. Faute de débouchés commerciaux réguliers, les jeunes producteurs sont contraints de brader leurs récoltes à des intermédiaires spéculateurs ou finissent par abandonner pour rejoindre l'exode urbain précaire.

### 1.2 Le Rôle Pivot de Dynamic Agro
**Dynamic Agro** est l'antenne commerciale et logistique créée à Zagtouli (périphérie ouest de Ouagadougou) pour résoudre cette impasse. Son modèle repose sur :
- **Un contrat d'achat garanti à prix plancher équitable** avec les 25 fermiers du Sanguié (sécurisant leur revenu direct).
- **Une centrale de stockage sous chaîne du froid** à Zagtouli (chambre froide solaire/groupe).
- **Une force de frappe commerciale motorisée** de 5 vendeurs couvrant les 5 grands corridors urbains de la capitale.
- **Une distribution multicanale** : B2B (Maquis, rôtisseries, cantines, cliniques) et B2C (Ménages sous abonnement hebdomadaire).

### 1.3 L'Objectif de la Plateforme Démo
Cette application n'est pas une simple maquette visuelle : c'est un **démonstrateur opérationnel de pilotage global**, conçu par François KINDA pour prouver qu'il possède à la fois :
- La vision de **stratège marketing B2B/B2C**,
- La rigueur de **gestionnaire de flux et de trésorerie sans fuite**,
- La culture du **résultat terrain axée sur les objectifs de prospection**,
- L'expertise en **ingénierie financière et décisionnelle (ViabiTarget, RentaSIM)**,
- La capacité à **produire des indicateurs de traçabilité d'impact pour les bailleurs de fonds** (Enabel, Coopération Suisse, ONG).

---

## 2. ARCHITECTURE DE L'APPLICATION : LES 3 PERSPECTIVES MÉTIER

L'application s'articule autour de trois perspectives spécialisées, sans aucune icône infantile ni émojis, adoptant une charte graphique professionnelle (vert émeraude, ambre terreux, ardoise institutionnelle) :

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             DYNAMIC AGRO HUB                                │
│        [Bascule Graphes / Chiffres]  •  [Sélecteur des 3 Perspectives]       │
├─────────────────────────┬──────────────────────────┬────────────────────────┤
│   1. APP VENDEUR TERRAIN│  2. COCKPIT MARKETING    │ 3. DIRECTION & CIDS    │
│   (5 Motos / Mobile)    │  (Poste du Candidat)     │ (Gouvernance & Banques)│
│                         │                          │                        │
│ • Pointage tournée      │ • Supervision flotte     │ • Stocks & Marges      │
│ • Scan OCR / Manuel     │ • Pipeline B2B (3 étapes)│ • Débouchés Sanguié    │
│ • Objectifs prospection │ • SAV / Qualité 24h      │ • Synthèse & Caisse    │
│ • Enregistrement compte │ • Campagnes & Réseaux    │ • Santé Bancaire (A+)  │
│ • Suivi des primes      │ • ViabiTarget / RentaSIM │ • Paramétrage Charges  │
└─────────────────────────┴──────────────────────────┴────────────────────────┘
```

---

### PERSPECTIVE 1 : APP VENDEUR TERRAIN (Vue Mobile-First)

Destinée aux 5 vendeurs motorisés (Ibrahim, Moussa, Awa, Seydou, Fatou) sur smartphone ou tablette étanche en tournée.

#### Fonctionnalités clés :
1. **Identification et Zone de Tournée :**
   - Affiche le nom du vendeur, sa moto immatriculée, sa zone géographique et son statut en direct (ex: *En tournée*, *Point de caisse visé*).
   - Sélecteur de profil rapide permettant de basculer d'un vendeur à l'autre en démo.
2. **Objectif de Prospection Terrain Gamifié :**
   - Affichage dynamique du quota de prospection (Semaine ou Mois).
   - Jauge d'avancement vers la prime financière (ex: *22/30 comptes visités • Prime de 15 000 FCFA à 30 comptes*).
   - Historique immédiat des derniers établissements prospectés.
3. **Bouton d'Ajout Rapide de Prospect Terrain :**
   - Ouvre une modale simplifiée permettant au vendeur, lors d'une halte, d'enregistrer en 15 secondes un nouveau maquis ou particulier (Nom de l'établissement, Catégorie, Téléphone).
4. **Déclaration de Fin de Tournée Bimodale :**
   - **Mode A - Scan Intelligent par Caméra (OCR simulé) :** Le vendeur prend en photo sa fiche de pointage papier. L'application simule une reconnaissance optique des caractères qui extrait instantanément les volailles vendues, le porc (kg), les paniers maraîchers, les espèces perçues et les règlements Mobile Money.
   - **Mode B - Saisie Manuelle Rapide :** Formulaire tactile aux boutons contrastés pour saisir directement les volumes physiques et financiers si la caméra n'est pas utilisable.
5. **Pointage de Caisse & Traçabilité des Règlements :**
   - Décomposition rigoureuse : Espèces physiques en sacoche, Orange Money vérifié, Moov Money vérifié.

---

### PERSPECTIVE 2 : COCKPIT MARKETING & RELATION CLIENT (Poste Visé)

C'est l'espace de commandement du **Responsable Marketing & Relation Client**. Il démontre comment le candidat structure l'activité commerciale pour maximiser les marges et fidéliser la clientèle.

#### 1. Onglet « Supervision des 5 Vendeurs » :
- **4 Indicateurs Synthétiques Majeurs :**
  - Chiffre d'affaires total collecté dans la journée (+ évolution en % vs J-7).
  - Total Mobile Money vérifié (crédité sur comptes marchands Dynamic Agro).
  - Total de poulets livrés dans la journée et cadence moyenne par vendeur.
  - Progression de la prospection globale de l'équipe vs cible mensuelle.
- **Visualisation Graphique Comparative (activable par le Master Switch) :**
  - Graphe en barres horizontales comparant le chiffre d'affaires généré par chaque vendeur, ventilé en temps réel par mode de paiement (Orange Money, Moov Money, Espèces).
  - Graphe de performance comparée du taux d'atteinte des objectifs de prospection.
- **Fiches Détaillées par Vendeur :**
  - Accès direct en un clic vers la vue mobile de chaque vendeur pour audit ou assistance.

#### 2. Onglet « Commandes & Pipeline Commercial B2B » :
- **Suivi Opérationnel des Livraisons du Jour :**
  - Statut de livraison, coordonnées du client, détail des produits livrés, vendeur assigné.
  - **Bouton de Suivi WhatsApp en 1 clic :** Déclenche l'envoi d'un message personnalisé sur l'API WhatsApp du client pour sonder sa satisfaction et valoriser l'origine Sanguié, marquant l'empreinte Relation Client.
- **Pipeline Commercial B2B (3 Étapes) :**
  - Gère la conversion des gros consommateurs de protéines (Maquis, Rôtisseries, Restaurants de Ouaga).
  - Étape 1 : *Contacté / Qualifié* (Besoin identifié).
  - Étape 2 : *Négociation / Dégustation* (Envoi d'échantillons et discussion tarifaire volume).
  - Étape 3 : *Contrat Signé* (Approvisionnement régulier avec livraison bi-hebdomadaire garantie).
  - Permet de faire progresser les prospects d'une étape à l'autre en direct avec calcul du volume potentiel hebdomadaire et du CA mensuel prévisionnel.

#### 3. Onglet « Suivi Qualité & SAV (Service Après-Vente) » :
- Registre formel des réclamations clients (calibre du poulet, fraîcheur maraîchère, conditionnement).
- **Protocole de Résolution Garanti en 24h :**
  - Statuts : *En cours d'analyse* / *Résolu*.
  - Plan d'action documenté : Dédommagement client immédiat (avoir ou remplacement gratuit) + action corrective ascendante transmise aux 25 producteurs du Sanguié (calibrage, chaîne du froid).

#### 4. Onglet « Campagnes & Réseaux Sociaux » :
- **Planning Éditorial Hebdomadaire :** Programmation structurée des communications sur WhatsApp Business (Statuts & Listes de diffusion), Facebook Page et actions directes de street-marketing.
- **Maquettes Visuelles Stratégiques Conçues Intégrées :**
  - *Visuel 1 (Carré 1:1)* : Promotion WhatsApp/Réseaux sur le Poulet Bicyclette authentique à 3 500 FCFA.
  - *Visuel 2 (Format Dépliant)* : Offre Spéciale B2B dédiée aux gérants de maquis et rôtisseries.
  - *Visuel 3 (Abonnement Hebdomadaire)* : Formule familiale pour ménages ouagalais (Poulet + Porc + Légumes bio livrés à domicile chaque samedi).

#### 5. Onglet « ViabiTarget & RentaSIM » :
- Accès direct aux outils d'ingénierie financière et de simulation.

---

### PERSPECTIVE 3 : DIRECTION & CIDS SANGUIÉ (Gouvernance & Bailleurs)

Cette perspective apporte aux dirigeants de Dynamic Agro, au conseil du CIDS et aux partenaires financiers une visibilité stratégique absolue.

#### 1. Stocks & Économie Unitaire Nette (Centrale de Zagtouli) :
- Filtre temporel interactif : **Semaine / Mois / Trimestre / Année**.
- **Modèle Économique Décomposé à l'Unité :**
  - Pour chaque filière (Poulet bicyclette, Viande de porc, Panier bio) :
    `Prix de vente public - Prix d'achat garanti Sanguié - Déboursé logistique transport = Marge nette unitaire dégagée`.
  - Marge brute commerciale affichée (32% à 45%).
- **Graphe d'Écoulement des Stocks :** Visualisation comparative entre Stock Initial, Quantités Vendues et Stock Disponible sous froid.

#### 2. Débouchés Commerciaux & Impact CIDS Sanguié :
- Quantités totales absorbées en kg et en unités par le marché de Ouagadougou.
- Volume financier total des **revenus directs reversés aux 25 jeunes agripreneurs du Sanguié** sans intermédiaire prédateur.
- **Encadré Bailleurs de Fonds :** Métriques d'impact et preuves concrètes de lutte contre l'exode rural et d'autonomie financière des incubés (idéal pour rapports Enabel, Coopération Suisse).

#### 3. Synthèse Financière, Rapprochement de Caisse & Ratios Bancaires :
- **Rapprochement de Caisse « Zéro Fuite » :** Procédure de double vérification quotidienne (Espèces physiques sous décharge + soldes marchands Mobile Money).
- **Jauge d'Avancement vs Point Mort & ViabiTarget :** Comparaison instantanée entre le Chiffre Réalisé, le Seuil de Rentabilité (Point Mort) et l'Objectif de Viabilité fixé.
- **Scorecard de Santé Financière & Ratios Bancaires (`BankingScorecard`) :**
  - *Grade de Solvabilité A+* attesté.
  - *Ratio de Liquidité Générale (Current Ratio)* : **2.15x** (Actif circulant couvre 2,15 fois les dettes à court terme ; norme bancaire > 1.50).
  - *Ratio de Liquidité Réduite (Quick Ratio)* : **1.48x** (Liquidité immédiate disponible sans dépendre de la liquidation des stocks ; norme > 1.00).
  - *Ratio d'Endettement Net (Debt-to-Equity)* : **38%** (Endettement très mesuré face aux capitaux propres ; norme < 80%).
  - *Fonds de Roulement Net Global (FRNG)* : **3 450 000 FCFA** d'autonomie de trésorerie.
  - *Suivi du Crédit Bancaire d'Équipement Froid* : Capital emprunté 3 600 000 FCFA, solde dû 2 160 000 FCFA, mensualité 120 000 FCFA prélevée le 5 du mois, **12/30 mensualités honorées à 100% avec 0 incident de paiement**.
- **Outils d'Exportation Intégrés :**
  - **Export CSV / Excel :** Génération immédiate d'un tableur complet certifié UTF-8 avec BOM.
  - **Impression / PDF :** Mise en page automatique d'une fiche de synthèse financière au format imprimable propre via `@media print`.

#### 4. Modale de Paramétrage des Charges avec Double Confirmation :
- Bouton **`Paramétrer les Charges`** dans l'en-tête de la Direction.
- Permet de modifier les charges fixes d'exploitation :
  - Chambre froide & énergie Zagtouli (240 000 FCFA)
  - Loyer entrepôt & bureaux Zagtouli (180 000 FCFA)
  - Salaires équipe encadrement & caisse (550 000 FCFA)
  - Entretien flotte 5 motos (85 000 FCFA)
  - Budget marketing & publicité (95 000 FCFA)
  - Mensualité crédit froid (120 000 FCFA)
- **Double Confirmation de Sécurité :**
  - Étape 1 : Saisie et calcul en direct du nouveau total et du seuil de rentabilité simulé.
  - Étape 2 : Avertissement de sécurité solennel rappelant que cette action recalcule immédiatement le Point Mort officiel, les ratios bancaires et les quotas ViabiTarget, exigeant une confirmation explicite de la direction.

---

## 3. LES OUTILS D'INGÉNIERIE DÉCISIONNELLE INTÉGRÉS

### 3.1 ViabiTarget — Rétro-Ingénierie des Quotas de Vente

#### Philosophie de l'Outil :
Dans la plupart des exploitations agricoles, les objectifs de vente sont fixés au hasard (« Il faut vendre le maximum »). **ViabiTarget** prend le contre-pied absolu de cette approche non scientifique en appliquant une méthode d'ingénieur financier :
1. On part des **charges incompressibles réelles** de l'entreprise (loyer, froid, salaires, crédit, motos).
2. On y ajoute le **bénéfice net ou excédent souhaité** pour financer la réserve de trésorerie.
3. En appliquant le taux de marge brute commerciale réelle (36%), l'outil calcule le **Chiffre d'Affaires de Viabilité Minimal**.
4. L'outil convertit immédiatement ce chiffre abstrait en **quotas physiques hebdomadaires, mensuels, trimestriels ou annuels** :
   - Nombre exact de poulets bicyclette à écouler (45% du mix produit),
   - Kilogrammes de viande de porc saine à découper (35% du mix produit),
   - Nombre de paniers maraîchers à distribuer (20% du mix produit).
5. **Synchronisation avec le Dashboard :** Un bouton `Appliquer comme objectif officiel` met à jour instantanément la jauge de rentabilité de la Direction et la jauge de prospection de l'équipe.

### 3.2 RentaSIM — Simulateur d'Arbitrage Financier & d'Amortissement

#### Philosophie de l'Outil :
**RentaSIM** (*Renta* = Rentabilité, *SIM* = Simulation) est conçu pour éliminer les décisions d'investissement prises à l'aveugle. Il fonctionne selon deux modes distincts :

#### Mode 1 : Pré-Décision (Arbitrage avant engagement)
- *Cas d'usage :* Un prestataire externe (graphiste, agence d'affichage, installateur d'énergie) soumet un devis de 350 000 FCFA.
- *Mécanisme :* L'outil analyse l'excédent net mensuel disponible après couverture des charges fixes. L'utilisateur indique quel pourcentage de cet excédent il consent à dédier (ex: 60%).
- *Verdict d'arbitrage :* RentaSIM calcule le nombre de mois nécessaires pour amortir la dépense sur la marge excédentaire. Si ce délai est inférieur à la période d'amortissement ciblée, l'investissement est déclaré **« Viable sans risque de trésorerie »**. Si le délai dépasse, l'outil affiche une **« Alerte Risque Trésorerie »** invitant à renégocier ou reporter.

#### Mode 2 : Post-Acquisition (Rétablissement d'équilibre après dépense imprévue)
- *Cas d'usage :* Une panne d'urgence sur le groupe électrogène de la chambre froide a coûté 400 000 FCFA non budgétés.
- *Mécanisme :* L'outil calcule le **Chiffre d'Affaires Commercial Additionnel** que l'équipe de vente doit générer dès l'instant T pour reconstituer le fonds de roulement sans compromettre les salaires ni les achats aux paysans.

---

## 4. TABLEAU RÉCAPITULATIF DES DONNÉES ÉCONOMIQUES DE RÉFÉRENCE

| Indicateur Économique | Valeur de Référence | Justification Métier |
| :--- | :--- | :--- |
| **Bénéficiaires CIDS Sanguié** | 25 jeunes fermiers (6 clusters) | Production locale encadrée |
| **Flotte commerciale Ouaga** | 5 vendeurs motorisés | Couverture des 5 zones urbaines |
| **Poulet Bicyclette Écologique** | 3 500 FCFA public (Achat Sanguié : 2 170 FCFA) | Marge unitaire nette : +980 FCFA |
| **Viande de Porc Saine** | 3 000 FCFA/kg (Achat Sanguié : 2 040 FCFA/kg) | Marge unitaire nette : +640 FCFA/kg |
| **Panier Maraîcher Bio (5kg)** | 4 000 FCFA (Achat Sanguié : 2 200 FCFA) | Marge unitaire nette : +1 350 FCFA |
| **Total Charges Fixes Mensuelles** | 1 270 000 FCFA / mois | Froid, loyer, salaires, crédit, motos, pub |
| **Point Mort Mensuel (Seuil Zéro Perte)** | 3 527 777 FCFA / mois | Calculé sur une marge moyenne de 36% |
| **Objectif de Viabilité ViabiTarget** | 4 583 333 FCFA / mois | Charges + 500k de surplus net réinvesti |
| **Current Ratio (Liquidité Générale)** | 2.15x | Norme bancaire UEMOA > 1.50 |
| **Quick Ratio (Liquidité Réduite)** | 1.48x | Trésorerie immédiate > 1.00 |
| **Ratio d'Endettement (Debt-to-Equity)**| 38% | Capitaux propres largement préservés |
| **Crédit Équipement Froid** | 3 600 000 FCFA (Solde : 2 160 000 FCFA) | Mensualité 120 000 FCFA (12/30 payées) |
| **Fonds de Roulement Net (FRNG)** | 3 450 000 FCFA | Marge de sécurité permanente |

---

## 5. VALEUR AJOUTÉE POUR LA CANDIDATURE DE FRANÇOIS KINDA

La présentation de cette plateforme lors de l'entretien d'embauche confère à la candidature de François KINDA un avantage décisif sur les profils traditionnels :

1. **Preuve par l'Action (Show, Don't Just Tell) :**
   Plutôt que d'énoncer des intentions vagues (« Je vais motiver les vendeurs et faire des posts Facebook »), le candidat présente un **système d'exploitation commercial déjà fonctionnel**, directement branché sur la réalité du CIDS et de Zagtouli.
2. **Double Compétence Marketing & Finance :**
   Le candidat démontre qu'il ne considère pas le marketing comme un centre de coûts, mais comme un moteur de rentabilité unitaire nette, capable de dialoguer avec la Direction Financière et les banquiers avec des ratios précis (Current ratio, point mort, FRNG).
3. **Alignement Total avec l'Éthique du CIDS-Burkina :**
   L'application prouve que le candidat a parfaitement assimilé la mission sociale du centre : chaque poulet vendu à Ouagadougou est directement relié au revenu décent des 25 jeunes agriculteurs du Sanguié.
4. **Zéro Risque à l'Embauche :**
   L'employeur constate que dès sa prise de poste, le candidat dispose déjà des outils méthodologiques, des protocoles de suivi de tournée, du pipeline B2B et du registre qualité nécessaires pour piloter l'activité sans période de flottement.
