import React, { useState } from 'react';
import { Encounter, Question, PlayerStats } from '../types';
import { User, MessageCircle, X, Check } from 'lucide-react';

interface EncounterScreenProps {
    encounter: Encounter;
    onResolve: (updatedStats: PlayerStats) => void;
    playerStats: PlayerStats;
}

const EncounterScreen: React.FC<EncounterScreenProps> = ({ encounter, onResolve, playerStats }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [isResolved, setIsResolved] = useState(false);

    if (encounter.type === 'quiz' && encounter.question) {
        const question = encounter.question;
        const npcName = encounter.npc || 'Traveler';

        const handleOptionSelect = (option: string) => {
            if (isResolved) return;

            setSelectedOption(option);
            const isCorrect = option === question.correctAnswer;
            
            let newStats = { ...playerStats };

            if (isCorrect) {
                setFeedback(question.positiveFeedback);
                newStats.morale = Math.min(100, newStats.morale + 10);
                newStats.supplies = Math.min(100, newStats.supplies + 5); 
            } else {
                setFeedback(question.negativeFeedback);
                newStats.morale = Math.max(0, newStats.morale - 5);
                newStats.health = Math.max(0, newStats.health - 5);
            }

            setIsResolved(true);
            
            // Allow user to read feedback then continue
            setTimeout(() => {
                // Wait for user manual continue ideally, but simple delay for now if we want auto
            }, 500);
        };

        const handleContinue = () => {
             // Re-calculate stats based on resolved state just to be safe or pass through
             // Actually we should have updated local state, but let's re-derive for simplicity in this function scope
             const isCorrect = selectedOption === question.correctAnswer;
             let newStats = { ...playerStats };
             if (isCorrect) {
                newStats.morale = Math.min(100, newStats.morale + 10);
                newStats.supplies = Math.min(100, newStats.supplies + 5); 
            } else {
                newStats.morale = Math.max(0, newStats.morale - 5);
                newStats.health = Math.max(0, newStats.health - 5);
            }
            onResolve(newStats);
        };

        return (
            <div className="encounter-screen card full-width">
                <div className="npc-dialogue-box">
                    <div className="npc-avatar">
                        <User size={48} />
                        <span className="npc-name">{npcName}</span>
                    </div>
                    <div className="dialogue-content">
                        <p className="dialogue-text">"{question.prompt}"</p>
                    </div>
                </div>

                <div className="quiz-options">
                    {question.options.map((option, idx) => (
                        <button 
                            key={idx}
                            className={`btn-option ${selectedOption === option ? (option === question.correctAnswer ? 'correct' : 'incorrect') : ''}`}
                            onClick={() => handleOptionSelect(option)}
                            disabled={isResolved}
                        >
                            {option}
                            {isResolved && option === question.correctAnswer && <Check size={16} className="icon-feedback" />}
                            {isResolved && selectedOption === option && option !== question.correctAnswer && <X size={16} className="icon-feedback" />}
                        </button>
                    ))}
                </div>

                {feedback && (
                    <div className={`feedback-box ${selectedOption === question.correctAnswer ? 'positive' : 'negative'}`}>
                        <p>{feedback}</p>
                        <button className="btn-primary continue-btn" onClick={handleContinue}>
                            Continue Journey
                        </button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="encounter-screen">
            <p>Something happened, but it's not a quiz.</p>
            <button onClick={() => onResolve(playerStats)}>Continue</button>
        </div>
    );
};

export default EncounterScreen;
