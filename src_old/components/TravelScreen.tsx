import { useState, useEffect } from 'react';
import { AppState, GameScreen, PlayerStats, GameProgress, Question, MiniGameData, Encounter } from '../types';
import { Footprints, Map, Apple, Heart, Smile } from 'lucide-react';
import { allGameData } from '../data';

interface TravelScreenProps {
    progress: GameProgress;
    onUpdateProgress: (newProgress: GameProgress) => void;
    onEncounter: (encounter: Encounter) => void;
    onLandmarkReached: (screen: GameScreen) => void;
}

// Landmarks at specific miles
const LANDMARKS: { distance: number; screen: GameScreen; label: string }[] = [
    { distance: 20, screen: 'map-dash', label: 'Crossroads of the Colonies' },
    { distance: 50, screen: 'penns-peace-path', label: 'The Peace Path' },
    { distance: 80, screen: 'colony-town-challenge', label: 'Colony Town' },
    { distance: 120, screen: 'franklins-lightning-lab', label: 'Franklin\'s Lab' },
    { distance: 150, screen: 'governors-gate', label: 'Governor\'s Gate' },
];

export default function TravelScreen({ progress, onUpdateProgress, onEncounter, onLandmarkReached }: TravelScreenProps) {
    const [message, setMessage] = useState<string>("The road ahead is long, but the Middle Colonies are full of opportunity.");
    const [isTraveling, setIsTraveling] = useState(false);

    const { stats } = progress;

    const handleTravel = () => {
        if (stats.supplies <= 0) {
            setMessage("You are out of supplies! You cannot travel further until you rest or trade.");
            return;
        }

        setIsTraveling(true);
        setMessage("Traveling...");

        setTimeout(() => {
            const distanceMove = 10;
            const suppliesConsumed = 5;
            const newDistance = stats.distanceTraveled + distanceMove;

            // Check for landmarks
            const reachedLandmark = LANDMARKS.find(l => 
                stats.distanceTraveled < l.distance && newDistance >= l.distance
            );

            if (reachedLandmark) {
                // Arrive at landmark
                 onUpdateProgress({
                    ...progress,
                    stats: {
                        ...stats,
                        distanceTraveled: reachedLandmark.distance,
                        supplies: Math.max(0, stats.supplies - suppliesConsumed),
                        days: stats.days + 1
                    }
                });
                onLandmarkReached(reachedLandmark.screen);
                setIsTraveling(false); 
                return;
            }

            // Normal travel or Random Encounter
            const randomEventChance = Math.random();
            let encounter: Encounter | null = null;
            
            if (randomEventChance > 0.4) { // 60% chance of encounter
                encounter = generateRandomEncounter();
            }

            onUpdateProgress({
                ...progress,
                stats: {
                    ...stats,
                    distanceTraveled: newDistance,
                    supplies: Math.max(0, stats.supplies - suppliesConsumed),
                    days: stats.days + 1
                }
            });

            if (encounter) {
                onEncounter(encounter);
            } else {
                setMessage(`You traveled ${distanceMove} miles. The weather is fair.`);
            }
            
            setIsTraveling(false);

        }, 1500); // Travel delay for effect
    };

    const generateRandomEncounter = (): Encounter => {
        // Pick a random game data set
        const randomGame = allGameData[Math.floor(Math.random() * allGameData.length)];
        // Pick a random question
        const randomQuestion = randomGame.questions[Math.floor(Math.random() * randomGame.questions.length)];

        return {
            id: `enc-${Date.now()}`,
            type: 'quiz',
            title: `Encounter: ${randomQuestion.npc || 'Stranger'}`,
            description: "Some traveler approaches you on the road...",
            npc: randomQuestion.npc,
            question: randomQuestion
        };
    };

    const getNextLandmark = () => {
        return LANDMARKS.find(l => l.distance > stats.distanceTraveled) || { label: 'Unknown', distance: 999 };
    };

    const nextLandmark = getNextLandmark();

    return (
        <div className="travel-screen card full-width">
            <div className="travel-header">
                <h2>Journey to the Governor's Gate</h2>
                <div className="day-counter">Day {stats.days}</div>
            </div>

            <div className="stats-bar">
                <div className="stat-item">
                    <Apple size={20} />
                    <span>Supplies: {stats.supplies}%</span>
                </div>
                <div className="stat-item">
                    <Heart size={20} />
                    <span>Health: {stats.health}%</span>
                </div>
                <div className="stat-item">
                    <Smile size={20} />
                    <span>Morale: {stats.morale}%</span>
                </div>
                <div className="stat-item">
                    <Map size={20} />
                    <span>Distance: {stats.distanceTraveled} miles</span>
                </div>
            </div>

            <div className="travel-visual">
                <div className="road-animation">
                    {/* Placeholder for visual animation - simplified css for now */}
                    <div className="wagon-icon" style={{ marginLeft: `${Math.min((stats.distanceTraveled / 150) * 100, 95)}%` }}>
                        <Footprints size={32} />
                    </div>
                    <div className="road-line"></div>
                    <div className="landmarks">
                        {LANDMARKS.map(l => (
                            <div key={l.distance} className="landmark-marker" style={{ left: `${(l.distance / 150) * 100}%` }} title={l.label}>
                                📍
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="travel-info">
                <p className="travel-message">{message}</p>
                <div className="next-destination">
                    Next Stop: <strong>{nextLandmark.label}</strong> ({nextLandmark.distance - stats.distanceTraveled} miles)
                </div>
            </div>

            <div className="travel-actions">
                <button className="btn-primary travel-btn" onClick={handleTravel} disabled={isTraveling || stats.supplies <= 0}>
                    {isTraveling ? 'Traveling...' : 'Travel Onward (10 Miles)'}
                </button>
            </div>
        </div>
    );
}
