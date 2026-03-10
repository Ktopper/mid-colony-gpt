export type GameScreen =
    | 'title'
    | 'hub' // Can be used as a "Camp" screen
    | 'travel' // The new main loop
    | 'encounter' // NPC interactions / Quizzes
    | 'landmark' // Major locations (replaces old minigame wrappers)
    | 'victory'
    | 'game-over';

export interface RelicsState {
    explorerCompass: boolean;
    peaceKey: boolean;
    sparkCrystal: boolean;
    colonySeal: boolean;
}

export interface PlayerStats {
    health: number; // 0-100
    supplies: number; // 0-100, consumes whilst traveling
    morale: number; // 0-100, affects certain outcomes
    days: number;
    distanceTraveled: number; // miles
}

export interface GameProgress {
    gamesCompleted: {
        mapDash: boolean;
        pennsPeacePath: boolean;
        franklinsLightningLab: boolean;
        colonyTownChallenge: boolean;
        governorsGate: boolean;
    };
    relics: RelicsState;
    governorsGateUnlocked: boolean;
    stats: PlayerStats;
}

export interface AppState {
    currentScreen: GameScreen;
    progress: GameProgress;
    activeEncounter?: Encounter | null; // The current event/question happening
}

export type QuestionType = 'multiple-choice' | 'true-false' | 'fill-blank' | 'scenario';

export interface Question {
    id: string;
    type: QuestionType;
    prompt: string;
    options: string[];
    correctAnswer: string;
    positiveFeedback: string;
    negativeFeedback: string;
    npc?: string; // Name of the NPC asking
    npcImage?: string; // Optional icon/image mapping
}

export interface Entity {
   id: string;
   name: string;
   description: string;
}

export interface Encounter {
    id: string;
    type: 'quiz' | 'flavor' | 'landmark';
    title: string;
    description: string;
    npc?: string;
    question?: Question; // If it's a quiz encounter
    consequence?: {
        stat: keyof PlayerStats;
        value: number;
    };
}

export interface MiniGameData {
    id: string;
    title: string;
    questions: Question[];
}
