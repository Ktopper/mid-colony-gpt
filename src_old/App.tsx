import { useState } from 'react';
import { Compass, Key, Zap, Shield, Play, Map as MapIcon, RotateCcw } from 'lucide-react';
import { GameScreen, AppState, RelicsState, GameProgress, PlayerStats, Encounter } from './types';
import { checkGovernorsGateUnlock } from './utils';
import MapDash from './components/MapDash';
import PennsPeacePath from './components/PennsPeacePath';
import FranklinsLightningLab from './components/FranklinsLightningLab';
import ColonyTownChallenge from './components/ColonyTownChallenge';
import GovernorsGate from './components/GovernorsGate';
import TravelScreen from './components/TravelScreen';
import EncounterScreen from './components/EncounterScreen';

const INITIAL_STATS: PlayerStats = {
    health: 100,
    supplies: 100,
    morale: 100,
    days: 1,
    distanceTraveled: 0
};

const INITIAL_STATE: AppState = {
    currentScreen: 'title',
    activeEncounter: undefined,
    progress: {
        gamesCompleted: {
            mapDash: false,
            pennsPeacePath: false,
            franklinsLightningLab: false,
            colonyTownChallenge: false,
            governorsGate: false,
        },
        relics: {
            explorerCompass: false,
            peaceKey: false,
            sparkCrystal: false,
            colonySeal: false,
        },
        governorsGateUnlocked: false,
        stats: INITIAL_STATS
    }
};

export default function App() {
    const [state, setState] = useState<AppState>(INITIAL_STATE);

    const navigateTo = (screen: GameScreen) => {
        setState(s => ({ ...s, currentScreen: screen }));
    };

    const handleUpdateProgress = (newProgress: GameProgress) => {
        setState(s => ({ ...s, progress: newProgress }));
    };

    const handleEncounter = (encounter: Encounter) => {
        setState(s => ({
            ...s,
            currentScreen: 'encounter',
            activeEncounter: encounter
        }));
    };

    const resolveEncounter = (newStats: PlayerStats) => {
        setState(s => ({
            ...s,
            currentScreen: 'travel',
            activeEncounter: undefined,
            progress: {
                ...s.progress,
                stats: newStats
            }
        }));
    };

    const completeGame = (gameId: keyof GameProgress['gamesCompleted'], relicId?: keyof RelicsState) => {
        setState(s => {
            const newGamesCompleted = { ...s.progress.gamesCompleted, [gameId]: true };
            const newRelics = relicId ? { ...s.progress.relics, [relicId]: true } : s.progress.relics;
            const allRelicsEarned = checkGovernorsGateUnlock(newRelics);

             // Refill supplies reward for completing a landmark
             const newStats = {
                ...s.progress.stats,
                supplies: Math.min(100, s.progress.stats.supplies + 20),
                morale: Math.min(100, s.progress.stats.morale + 10)
            };

            return {
                ...s,
                currentScreen: 'travel',
                progress: {
                    ...s.progress,
                    gamesCompleted: newGamesCompleted,
                    relics: newRelics,
                    governorsGateUnlocked: allRelicsEarned,
                    stats: newStats
                }
            };
        });
    };

    const resetGame = () => {
        setState(INITIAL_STATE);
    };

    return (
        <div className="app-container">
            {state.currentScreen === 'title' && <TitleScreen onStart={() => navigateTo('travel')} />}
            
            {/* The main travel screen - replaces Hub */}
            {state.currentScreen === 'travel' && (
                <TravelScreen 
                    progress={state.progress} 
                    onUpdateProgress={handleUpdateProgress}
                    onEncounter={handleEncounter}
                    onLandmarkReached={navigateTo}
                />
            )}

            {/* Random Encounters */}
            {state.currentScreen === 'encounter' && state.activeEncounter && (
                <EncounterScreen 
                    encounter={state.activeEncounter} 
                    onResolve={resolveEncounter}
                    playerStats={state.progress.stats}
                />
            )}

            {state.currentScreen === 'map-dash' && <MapDash onComplete={() => completeGame('mapDash', 'explorerCompass')} onBack={() => navigateTo('travel')} />}
            {state.currentScreen === 'penns-peace-path' && <PennsPeacePath onComplete={() => completeGame('pennsPeacePath', 'peaceKey')} onBack={() => navigateTo('travel')} />}
            {state.currentScreen === 'franklins-lightning-lab' && <FranklinsLightningLab onComplete={() => completeGame('franklinsLightningLab', 'sparkCrystal')} onBack={() => navigateTo('travel')} />}
            {state.currentScreen === 'colony-town-challenge' && <ColonyTownChallenge onComplete={() => completeGame('colonyTownChallenge', 'colonySeal')} onBack={() => navigateTo('travel')} />}
            {state.currentScreen === 'governors-gate' && <GovernorsGate onComplete={() => completeGame('governorsGate')} onBack={() => navigateTo('travel')} />}
            
            {state.currentScreen === 'victory' && <VictoryScreen onReset={resetGame} relics={state.progress.relics} />}
        </div>
    );
}

function TitleScreen({ onStart }: { onStart: () => void }) {
    return (
        <div className="title-screen card" style={{ width: '100%', maxWidth: '600px' }}>
            <h1>Quest for the Middle Colonies</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)' }}>
                Travel the King's Highway! Manage your supplies, meet historical figures, and test your knowledge to reach the Governor's Gate!
            </p>
            <div className="hero-image-placeholder" style={{display: 'flex', justifyContent: 'center', margin: '20px 0'}}>
                <MapIcon size={64} />
            </div>
            <button className="btn-primary" onClick={onStart}>
                <Play /> Start Journey
            </button>
        </div>
    );
}

function VictoryScreen({ onReset, relics }: { onReset: () => void, relics: RelicsState }) {
    return (
        <div className="victory-screen card">
            <h2>Journey Complete!</h2>
            <p>You have successfully traveled through the Middle Colonies and unlocked the Governor's Gate!</p>
            <div className="relic-display">
                <div className={`relic-icon ${relics.explorerCompass ? 'active-compass' : ''}`}><Compass size={24} /></div>
                <div className={`relic-icon ${relics.peaceKey ? 'active-key' : ''}`}><Key size={24} /></div>
                <div className={`relic-icon ${relics.sparkCrystal ? 'active-crystal' : ''}`}><Zap size={24} /></div>
                <div className={`relic-icon ${relics.colonySeal ? 'active-seal' : ''}`}><Shield size={24} /></div>
            </div>
            <button className="btn-primary" onClick={onReset}>
                <RotateCcw /> Play Again
            </button>
        </div>
    );
}

