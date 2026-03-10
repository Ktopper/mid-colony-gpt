import { Question, RelicsState } from './types';
import { allGameData } from './data';

/**
 * Shuffles an array in place using the Fisher-Yates algorithm
 * and returns a new array to avoid mutating the original data.
 */
export function shuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Pulls a random mix of questions from all available mini-games
 * for the final Governor's Gate challenge.
 */
export function getMixedQuestions(count: number = 10): Question[] {
    const allQuestions = allGameData.flatMap(game => game.questions);
    return shuffle(allQuestions).slice(0, count);
}

/**
 * Checks if the user has collected all required relics to unlock the final gate.
 */
export function checkGovernorsGateUnlock(relics: RelicsState): boolean {
    return relics.explorerCompass &&
        relics.peaceKey &&
        relics.sparkCrystal &&
        relics.colonySeal;
}
