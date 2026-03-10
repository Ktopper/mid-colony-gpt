import { useState } from 'react';
import { Compass, Key, Zap, Shield, Lock, Map, BookHeart, TestTube, Factory, PartyPopper, Play } from 'lucide-react';
import { GameScreen, AppState, RelicsState, GameProgress } from './types';
import { checkGovernorsGateUnlock } from './utils';
import MapDash from './components/MapDash';
import PennsPeacePath from './components/PennsPeacePath';
import FranklinsLightningLab from './components/FranklinsLightningLab';
import ColonyTownChallenge from './components/ColonyTownChallenge';
import GovernorsGate from './components/GovernorsGate';

const INITIAL_STATE: AppState = {
    currentScreen: 'title',
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
    }
};

export default function App() {
    const [state, setState] = useState<AppState>(INITIAL_STATE);

    const navigateTo = (screen: GameScreen) => {
        setState(s => ({ ...s, currentScreen: screen }));
    };

    const completeGame = (gameId: keyof GameProgress['gamesCompleted'], relicId?: keyof RelicsState) => {
        setState(s => {
            const newGamesCompleted = { ...s.progress.gamesCompleted, [gameId]: true };
            const newRelics = relicId ? { ...s.progress.relics, [relicId]: true } : s.progress.relics;

            const allRelicsEarned = checkGovernorsGateUnlock(newRelics);

            return {
                ...s,
                progress: {
                    ...s.progress,
                    gamesCompleted: newGamesCompleted,
                    relics: newRelics,
                    governorsGateUnlocked: allRelicsEarned,
                }
            };
        });
        navigateTo('hub');
    };

    return (
        <div className="app-container">
            {state.currentScreen === 'title' && <TitleScreen onStart={() => navigateTo('hub')} />}
            {state.currentScreen === 'hub' && <QuestHub navigateTo={navigateTo} progress={state.progress} />}
            {state.currentScreen === 'map-dash' && <MapDash onComplete={() => completeGame('mapDash', 'explorerCompass')} onBack={() => navigateTo('hub')} />}
            {state.currentScreen === 'penns-peace-path' && <PennsPeacePath onComplete={() => completeGame('pennsPeacePath', 'peaceKey')} onBack={() => navigateTo('hub')} />}
            {state.currentScreen === 'franklins-lightning-lab' && <FranklinsLightningLab onComplete={() => completeGame('franklinsLightningLab', 'sparkCrystal')} onBack={() => navigateTo('hub')} />}
            {state.currentScreen === 'colony-town-challenge' && <ColonyTownChallenge onComplete={() => completeGame('colonyTownChallenge', 'colonySeal')} onBack={() => navigateTo('hub')} />}
            {state.currentScreen === 'governors-gate' && <GovernorsGate onComplete={() => completeGame('governorsGate')} onBack={() => navigateTo('hub')} />}
            {state.currentScreen === 'victory' && <VictoryScreen onReset={() => setState(INITIAL_STATE)} onHub={() => navigateTo('hub')} relics={state.progress.relics} />}
        </div>
    );
}

function TitleScreen({ onStart }: { onStart: () => void }) {
    return (
        <div className="title-screen card" style={{ width: '100%', maxWidth: '600px' }}>
            <h1>Quest for the Middle Colonies</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)' }}>
                Explore map trails, meet historical figures, and test your knowledge to unlock the Governor's Gate!
            </p>
            <button className="btn-primary" onClick={onStart}>
                <Play /> Start Quest
            </button>
        </div>
    );
}

function QuestHub({ navigateTo, progress }: { navigateTo: (screen: GameScreen) => void, progress: GameProgress }) {
    const { gamesCompleted, relics, governorsGateUnlocked } = progress;

    return (
        <div className="hub-screen" style={{ width: '100%' }}>
            <div className="header">
                <h2>Camp Hub</h2>
                <div className="relic-display">
                    <div className={`relic-icon ${relics.explorerCompass ? 'active-compass' : ''}`}><Compass size={24} /></div>
                    <div className={`relic-icon ${relics.peaceKey ? 'active-key' : ''}`}><Key size={24} /></div>
                    <div className={`relic-icon ${relics.sparkCrystal ? 'active-crystal' : ''}`}><Zap size={24} /></div>
                    <div className={`relic-icon ${relics.colonySeal ? 'active-seal' : ''}`}><Shield size={24} /></div>
                </div>
            </div>

            <div className="game-grid">
                <GameCard
                    title="Map Dash"
                    icon={<Map size={32} color={gamesCompleted.mapDash ? "var(--color-success)" : "var(--color-relic-compass)"} />}
                    description="Test your geography skills"
                    completed={gamesCompleted.mapDash}
                    onClick={() => navigateTo('map-dash')}
                />
                <GameCard
                    title="Penn's Peace Path"
                    icon={<BookHeart size={32} color={gamesCompleted.pennsPeacePath ? "var(--color-success)" : "var(--color-relic-key)"} />}
                    description="Learn about the Quakers"
                    completed={gamesCompleted.pennsPeacePath}
                    onClick={() => navigateTo('penns-peace-path')}
                />
                <GameCard
                    title="Franklin's Lightning Lab"
                    icon={<TestTube size={32} color={gamesCompleted.franklinsLightningLab ? "var(--color-success)" : "var(--color-relic-crystal)"} />}
                    description="Discover inventions & work"
                    completed={gamesCompleted.franklinsLightningLab}
                    onClick={() => navigateTo('franklins-lightning-lab')}
                />
                <GameCard
                    title="Colony Town Challenge"
                    icon={<Factory size={32} color={gamesCompleted.colonyTownChallenge ? "var(--color-success)" : "var(--color-relic-seal)"} />}
                    description="Meet the townspeople"
                    completed={gamesCompleted.colonyTownChallenge}
                    onClick={() => navigateTo('colony-town-challenge')}
                />

                <div className={`game-card final-gate ${governorsGateUnlocked ? '' : 'locked'}`} style={{ opacity: governorsGateUnlocked ? 1 : 0.7 }}>
                    <Lock size={48} color={governorsGateUnlocked ? "var(--color-success)" : "white"} />
                    <h3>The Governor's Gate</h3>
                    <p>{governorsGateUnlocked ? "The gate is open! Face the final challenge." : "Collect all 4 relics to unlock."}</p>
                    {governorsGateUnlocked ? (
                        gamesCompleted.governorsGate ? (
                            <button className="btn-secondary" style={{ backgroundColor: 'var(--color-success)' }} onClick={() => navigateTo('governors-gate')}>Re-enter Gate</button>
                        ) : (
                            <button className="btn-secondary" style={{ backgroundColor: 'var(--color-success)' }} onClick={() => navigateTo('governors-gate')}>Enter Gate</button>
                        )
                    ) : (
                        <button className="btn-disabled" disabled>Locked</button>
                    )}
                </div>
            </div>
        </div>
    );
}

function GameCard({ title, icon, description, completed, onClick }: { title: string, icon: React.ReactNode, description: string, completed: boolean, onClick: () => void }) {
    return (
        <div className={`game-card ${completed ? 'completed' : ''}`}>
            {icon}
            <h3>{title}</h3>
            <p style={{ color: 'var(--color-text-light)', margin: 0 }}>{description}</p>
            {completed ? (
                <button className="btn-secondary" onClick={onClick}>Replay</button>
            ) : (
                <button className="btn-primary" style={{ padding: '8px 24px', fontSize: '1rem' }} onClick={onClick}>Play</button>
            )}
        </div>
    );
}
function VictoryScreen({ onReset, onHub, relics }: { onReset: () => void, onHub: () => void, relics: RelicsState }) {
    return (
        <div className="card title-screen" style={{ width: '100%', maxWidth: '600px', backgroundColor: '#fdfbe1', border: '4px solid #fef08a' }}>
            <PartyPopper size={64} color="var(--color-success)" />
            <h1 style={{ color: 'var(--color-success)', fontSize: '2.5rem' }}>Keeper of the Middle Colonies!</h1>

            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-dark)', marginBottom: '0' }}>
                You have proven your mastery over the maps, learned the peaceful ways of the Quakers, solved Franklin's puzzles, and built a successful colony town!
            </p>

            <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: 'var(--radius-lg)', width: '100%', marginBottom: '16px' }}>
                <h3 style={{ marginBottom: '16px', color: 'var(--color-text-light)' }}>Earned Relics</h3>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                    {relics.explorerCompass && <div className="relic-icon active-compass"><Map size={24} /></div>}
                    {relics.peaceKey && <div className="relic-icon active-key"><BookHeart size={24} /></div>}
                    {relics.sparkCrystal && <div className="relic-icon active-crystal"><TestTube size={24} /></div>}
                    {relics.colonySeal && <div className="relic-icon active-seal"><Factory size={24} /></div>}
                </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
                <button className="btn-secondary" onClick={onHub} style={{ backgroundColor: '#cbd5e1', color: 'var(--color-text-dark)', boxShadow: '0 5px 0 #94a3b8' }}>
                    Return to Hub
                </button>
                <button className="btn-primary" onClick={onReset} style={{ backgroundColor: 'var(--color-success)', boxShadow: '0 6px 0 #059669' }}>
                    Play Again
                </button>
            </div>
        </div>
    );
}
