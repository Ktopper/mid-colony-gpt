export type GameScreen =
    | 'title'
    | 'hub'
    | 'map-dash'
    | 'penns-peace-path'
    | 'franklins-lightning-lab'
    | 'colony-town-challenge'
    | 'governors-gate'
    | 'victory';

export interface RelicsState {
    explorerCompass: boolean;
    peaceKey: boolean;
    sparkCrystal: boolean;
    colonySeal: boolean;
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
}

export interface AppState {
    currentScreen: GameScreen;
    progress: GameProgress;
}

export type QuestionType = 'multiple-choice' | 'true-false' | 'fill-blank' | 'scenario';

export interface Question {
    id: string;
    type: QuestionType;
    prompt: string;
    options: string[]; // Options for the user to choose from
    correctAnswer: string;
    positiveFeedback: string;
    negativeFeedback: string;
}

export interface MiniGameData {
    id: string;
    title: string;
    questions: Question[];
}
