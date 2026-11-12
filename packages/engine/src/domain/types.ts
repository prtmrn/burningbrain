// ─────────────────────────────────────────────────────────────
// types.ts — Schéma d'entités (copie fidèle de l'Ontologie v3.1 §B)
// Deux adaptations d'agnosticité (spec v2 §A.3 règle 2, D-08) :
//   · ThemeId = string opaque (KnownThemeId vit côté app, pas dans le moteur)
//   · GameConfig.modes en `number` (pas de littéraux 7/5) — les valeurs
//     sont injectées par chaque application.
// ─────────────────────────────────────────────────────────────

// ── 0. Configuration produit (paramètres, PAS des constantes en dur) ──

/** Epoch et fuseau sont de la CONFIG (minuit America/New_York pour l'application
 *  de référence, epoch = date de lancement, à fixer au déploiement). Le moteur
 *  ne connaît aucune valeur : tout est injecté. */
export interface GameConfig {
  timezone: string;                 // ex. "America/New_York"
  epochDate: string;                // "YYYY-MM-DD" — jour n° 1
  modes: {
    hot:   { rounds: number; previewMs: number; roundMs: number };   // 7 · 3 000 · 25 000
    brain: { rounds: number; previewMs: number; roundMs: number; winScore?: number };   // 5 · 3 000 · 60 000
  };
  maxAnswerLength: number;          // 256
}

// ── 1. Thèmes (D-07, D-10, extensible pour D-08) ──

/** Extensible par construction : le moteur traite ThemeId comme opaque.
 *  La liste des thèmes connus (KnownThemeId) est une donnée de l'application. */
export type ThemeId = string;

// ── 2. Modes de jeu ──

export type GameMode = 'hot' | 'brain';

// ── 3. Paliers — IDs STABLES, labels JAMAIS structurels ──

/** Identifiants stables : toute donnée persistée référence l'ID, jamais le label. */
export type TierId = 't1' | 't2' | 't3' | 't4' | 't5' | 't6';

export interface Tier {
  id: TierId;
  points: number;          // t1:10 · t2:15 (palier-piège) · t3:30 · t4:60 · t5:85 · t6:100
  gaugeFraction: number;   // 0..1 — placement sur la jauge
  emoji: string;           // ligne de partage anti-spoiler
  colorToken: string;      // variable CSS
}

/** Table de labels (contenu applicatif) — renommable sans toucher aucune
 *  donnée persistée. Jamais embarquée dans le moteur. */
export type TierLabelTable = Record<TierId, string>;

/** Bandes de verdict sur le score TOTAL d'une session. Le texte de verdict
 *  est du contenu applicatif ; le moteur ne calcule que (min, tier). */
export interface ScoreBand {
  min: number;
  tier: TierId;
  verdict: string;         // phrase de fin — contenu original, hors moteur
}

// ── 4. Contenu : prompts, feuilles, banques ──

export interface Prompt {
  id: string;                 // slug stable, unique TOUTES banques confondues
  theme: ThemeId;             // exactement un thème
  text: string;               // contenu 100 % original (D-01)
}

export interface AnswerSheetEntry {
  answer: string;             // forme canonique affichée
  tier: TierId;
  aliases: string[];
  quip?: string;
}

export interface AnswerSheet {
  promptId: string;
  entries: AnswerSheetEntry[];      // taille libre — CONTRAT : ≤ 2 000 clés
                                    // normalisées (answer + aliases) par prompt (F-8)
  contentVersion: number;           // pilote le recalcul progressif (D-03)
  stats?: {                         // télémétrie de rareté (D-03)
    [normalizedAnswer: string]: { submissions: number; lastSeenAt: string };
  };
}

/** Banque d'un thème. INVARIANT DU VALIDATEUR DE BANQUE (D-10) :
 *  banque('general') ∩ banque(t) = ∅ pour tout t ≠ 'general'. */
export interface PromptBank {
  theme: ThemeId;
  prompts: Prompt[];
  sheets: Map<string, AnswerSheet>;   // promptId → feuille (lisible, F-9 tranché)
  contentVersion: number;
}

/** Série quotidienne d'UN mode pour UN thème (reset minuit local).
 *  D-20 : séries hot/brain INDÉPENDANTES (graines distinctes ; un recouvrement
 *  fortuit de prompts est accepté — F-12, WSD §8.9).
 *  D-18 : seul 'general' a une série quotidienne fraîche ; le type reste
 *  extensible (daily thématique futur, autre application) sans migration. */
export interface DailyContent {
  theme: ThemeId;
  date: string;                     // "YYYY-MM-DD" dans config.timezone
  dayNumber: number;                // jours civils depuis config.epochDate + 1
  mode: GameMode;
  promptIds: string[];              // 7 (hot) ou 5 (brain)
  contentVersion: number;           // version des feuilles au moment de la génération
}

// ── 5. Normalisation de saisie (6 étapes, ordre exact) ──
//  1. trim + lowercase + NFC · 2. pliage diacritiques (NFD → strip marques)
//  3. tirets/apostrophes → espaces · 4. suppression ponctuation résiduelle
//  5. compaction des espaces · 6. suppression articles initiaux
//  Match : exact sur answer+aliases, sinon suggestion fuzzy Damerau ≤ 1–2
//  (seuil par longueur), jamais appliquée d'office.

export interface CorrectionSuggestion {
  from: string;
  to: string;
}

// ── 6. Résultats de round — discriminés par mode ──

/** HOT : une réponse par prompt (retry libre, miss seulement au timeout). */
export interface HotRoundResult {
  promptId: string;
  promptText: string;             // copie figée au moment du jeu
  rawAnswer: string | null;       // saisie brute ; null si timeout sans saisie
  answer: string | null;          // canonique acceptée ; null = miss
  tier: TierId | null;            // null = miss (0 pt)
  score: number;                  // 0..100
  quip?: string;
  viaCorrection?: boolean;        // D-21 : acceptée par autocorrect (rawAnswer ≠ answer)
}

/** BRAIN : une réponse acceptée. Horodatage = horloge monotonique,
 *  ms écoulées depuis le début du round (rejeu/débogage ; pas une deadline). */
export interface AcceptedAnswer {
  rawAnswer: string;              // saisie brute du joueur
  answer: string;                 // forme canonique matchée (après correction éventuelle)
  tier: TierId;
  score: number;                  // Tier.points au moment du jeu
  at: number;                     // ms mono relatives au début du round
  viaCorrection: boolean;         // true si acceptée via CorrectionSuggestion confirmée
}

/** BRAIN : fin de round. 'timeout' = temps écoulé ; 'sheet-exhausted' = toutes
 *  les entrées trouvées (fin anticipée SANS bonus) ; 'abandoned' = geste du joueur. */
export type RoundEndReason = 'timeout' | 'sheet-exhausted' | 'abandoned' | 'won';

export interface BrainRoundResult {
  promptId: string;
  promptText: string;
  answersGiven: AcceptedAnswer[]; // ordre chronologique ; doublons ABSENTS (ignorés)
  score: number;                  // Σ answersGiven.score — plafond = Σ points de la feuille
  endReason: RoundEndReason;
}

export type RoundResult = HotRoundResult | BrainRoundResult;

// ── 7. États de session — union discriminée par mode ──

/** Phases. 'answering'/'feedback' = hot ; 'listing' = brain (feedback INLINE). */
export type GamePhase =
  | 'intro'
  | 'preview'        // prompt affiché, chrono pas lancé (previewMs)
  | 'answering'      // HOT : saisie d'UNE réponse, answerEndsAt = borne du round
  | 'listing'        // BRAIN : accumulation de réponses, answerEndsAt = borne du round
  | 'feedback'       // HOT : verdict du round
  | 'done';

/** Feedback transitoire du mode Brain (affiché inline pendant 'listing'). */
export interface ListingFeedback {
  kind: 'accepted' | 'duplicate' | 'rejected' | 'correction';
  input: string;                  // saisie concernée
  to?: string;                    // forme suggérée si kind === 'correction'
  score?: number;                 // points gagnés si kind === 'accepted'
  at: number;                     // ms mono — permet à l'UI d'expirer le feedback
}

/** D-17 : Hot ET Brain ont chacun un Daily ET un Illimité (4 combinaisons). */
export type PlayKind = 'daily' | 'unlimited';

interface DiveStateBase {
  mode: GameMode;
  playKind: PlayKind;               // D-17
  theme: ThemeId;
  date: string;                     // daily : date de la série ; unlimited : id de session
  dayNumber: number;                // daily : n° du jour ; unlimited : compteur local
  roundIndex: number;
  phase: GamePhase;
  previewEndsAt: number | null;   // horloge monotonique ms (persisté en couple mono/wall)
  answerEndsAt: number | null;    // deadline du round courant
  draft?: string;                 // saisie en cours (survit au rechargement)
  pausedAt?: number;              // décale les deadlines à la reprise
  /** Graine de tirage des sessions UNLIMITED — uint32.
   *  Générée une fois à la création, persistée, jamais régénérée en cours
   *  de session. Absente en daily (tirage seedé par (theme, mode, dayNumber)). */
  sessionSeed?: number;
}

export interface HotDiveState extends DiveStateBase {
  mode: 'hot';
  phase: 'intro' | 'preview' | 'answering' | 'feedback' | 'done';
  results: HotRoundResult[];      // length === roundIndex hors 'feedback'
  correction?: CorrectionSuggestion | null;
  rejected?: string | null;       // dernière réponse refusée (retry libre)
}

export interface BrainDiveState extends DiveStateBase {
  mode: 'brain';
  phase: 'intro' | 'preview' | 'listing' | 'done';
  results: BrainRoundResult[];    // rounds terminés
  currentAnswers: AcceptedAnswer[]; // round EN COURS — persisté (reprise en pleine liste)
  lastFeedback?: ListingFeedback | null;
  /** F-14 : doublons ignorés depuis le début de la session (tous rounds
   *  confondus — CUMUL SESSION). Recopié tel quel dans
   *  BrainCompletion.totals.duplicatesIgnored à la complétion. */
  duplicatesIgnored: number;
}

export type DiveState = HotDiveState | BrainDiveState;

// ── 8. Complétions persistées — discriminées par mode ──

/** 'completed' = tous rounds joués ; 'abandoned' = geste d'abandon.
 *  F-11 : une daily abandonnée est CONSOMMÉE (non rejouable comme daily)
 *  et n'alimente PAS le streak ; la complétion partielle est persistée. */
export type CompletionEnd = 'completed' | 'abandoned';

interface CompletionBase {
  mode: GameMode;
  playKind: PlayKind;             // D-17
  theme: ThemeId;
  scope: string;                  // daily : date ISO ; unlimited : n° de session
  game: number;                   // dayNumber
  score: number;                  // revérifié à la lecture contre les paliers
  contentVersion: number;         // dernière version de feuille appliquée (F-6)
  endedBy: CompletionEnd;
  imported?: boolean;             // futur sync serveur
}

export interface HotCompletion extends CompletionBase {
  mode: 'hot';
  tiers: (TierId | 'miss')[];     // exactement `rounds` si endedBy === 'completed'
  results: HotRoundResult[];
}

export interface BrainCompletion extends CompletionBase {
  mode: 'brain';
  results: BrainRoundResult[];    // exactement `rounds` si endedBy === 'completed'
  /** F-15 : plafond = Σ points des feuilles de la série AU MOMENT DU JEU.
   *  Figé pour que le ratio de partage D-19 (score/ceiling) survive à la
   *  purge du cache contenu et au recalcul D-03. */
  ceiling: number;
  totals: {
    answersAccepted: number;
    duplicatesIgnored: number;    // recopié depuis BrainDiveState.duplicatesIgnored (F-14)
  };
}

export type Completion = HotCompletion | BrainCompletion;

// ── 9. Joueur & stats (dérivées — jamais source primaire) ──

export interface PlayerStats {
  gamesPlayed: number;
  totalScore: number;
  bestScore: number;
  currentStreak: number;          // dates civiles consécutives avec ≥ 1 complétion
                                  // DAILY completed — D-16 : tout mode, tout thème ;
                                  // F-11 : endedBy='abandoned' n'alimente PAS le streak
  maxStreak: number;
  lastPlayedDate: string | null;
}

/** Chaque Completion porte mode + theme → toutes les découpes sont dérivables. */
export interface PlayerStatsBreakdown {
  overall: PlayerStats;
  byMode: Record<GameMode, PlayerStats>;
  byTheme: Partial<Record<ThemeId, PlayerStats>>;
}

export interface PlayerProfile {
  playerId: string;               // UUID local anonyme
  createdAt: string;
  preferences: {
    muted: boolean;
    colorblind: boolean;
    lowPower: boolean;
    answerCorrections: boolean;   // suggestion fuzzy (F-9 : fuzzy complet activable)
    clearRejectedEntry: boolean;
    lastTheme?: ThemeId;          // confort de navigation
  };
  characterId: string | null;     // cosmétique — réservé
}

export type PlayerPreferences = PlayerProfile['preferences'];

/** Réservé (monétisation hors scope actuel). */
export interface UnlockToken {
  productId: string;
  token: string;
  issuedAt: string;
}

// ── 10. Percentile « better than X % » ──

/** Table de référence embarquée. maxScore dépend du mode :
 *  hot = 700 (buckets length 701) ; brain = ratio en pour mille (maxScore 1000,
 *  buckets length 1001 — F-13). */
export interface ReferenceDistribution {
  mode: GameMode;
  distVersion: number;
  maxScore: number;
  buckets: number[];              // length === maxScore + 1, indexé par le score/bucket
}

/** Copie locale lissée (recalcul D-03) : source statique jamais écrite ;
 *  rebase quand la distVersion embarquée monte. */
export interface LocalReferenceDistribution {
  base: ReferenceDistribution;
  blended: number[];
  localCompletions: number;
  blendedAt: string;
}

// ── 11. Agrégat racine ──

export interface GameSession {
  profile: PlayerProfile;
  activeDive: DiveState | null;             // Hot | Brain × daily | unlimited (D-17)
  /** Statut daily PAR mode — D-18 : seul le thème par défaut a des dailies ;
   *  la signature garde `theme` pour l'extensibilité.
   *  F-11 : une daily abandonnée est 'played' (consommée, non rejouable). */
  dailyStatus: (mode: GameMode, theme: ThemeId) => 'locked' | 'available' | 'played';
}
