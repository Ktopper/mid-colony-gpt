import { useState, useEffect, useMemo } from 'react';
import { Lock, Search, Trophy } from 'lucide-react';
import { getMixedQuestions } from '../utils';
import { Question } from '../types';
import { ScreenShell, FeedbackPanel, ProgressBar } from './Shared';

export default function GovernorsGate({ onComplete, onBack }: { onComplete: () => void, onBack: () => void }) {
    const [phase, setPhase] = useState<'intro' | 'playing' | 'outro'>('intro');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    useEffect(() => {
        // Get 8 random questions from across all games for the final challenge
        setQuestions(getMixedQuestions(8));
    }, []);

    const handleStart = () => setPhase('playing');

    const handleAnswer = (answer: string) => {
        if (selectedAnswer !== null) return;
        setSelectedAnswer(answer);
        setIsCorrect(answer === questions[currentIndex].correctAnswer);
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedAnswer(null);
            setIsCorrect(null);
        } else {
            setPhase('outro');
        }
    };

    const handleRetry = () => {
        setSelectedAnswer(null);
        setIsCorrect(null);
    };

    const currentQuestion = questions.length > 0 ? questions[currentIndex] : null;

    const currentOptions = useMemo(() => {
        if (!currentQuestion) return [];
        if (currentQuestion.type === 'true-false') {
            return ['True', 'False'];
        }
        // Simple fisher-yates inline for the options
        const shuffled = [...currentQuestion.options];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }, [currentQuestion]);

    if (phase === 'intro') {
        return (
            <ScreenShell title="The Governor's Gate" color="#1e293b" icon={<Lock size={32} />}>
                <div style={{
                    backgroundColor: '#334155',
                    borderRadius: 'var(--radius-lg)',
                    padding: '48px 32px',
                    margin: '16px 0 32px 0',
                    display: 'flex',
                    justifyContent: 'center',
                    border: '4px solid #0f172a',
                    boxShadow: 'inset 0 10px 15px -3px rgba(0,0,0,0.5)'
                }}>
                    <Lock size={80} color="#fbbf24" />
                </div>
                <p style={{ fontSize: '1.2rem', marginBottom: '24px', textAlign: 'center' }}>
                    You hold all four relics! The final gate is unlocked.
                    Use everything you learned about the Middle Colonies to pass the final mixing challenge!
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: 'auto' }}>
                    <button className="btn-secondary" onClick={onBack} style={{ backgroundColor: '#64748b', boxShadow: '0 5px 0 #475569' }}>Back to Hub</button>
                    <button className="btn-primary" onClick={handleStart} style={{ backgroundColor: '#1e293b', boxShadow: '0 6px 0 #0f172a', color: '#fbbf24' }}>Enter the Gate</button>
                </div>
            </ScreenShell>
        );
    }

    if (phase === 'outro') {
        return (
            <ScreenShell title="Gate Conquered!" color="#fbbf24" icon={<Trophy size={32} />}>
                <div style={{ padding: '32px', backgroundColor: '#fef3c7', borderRadius: 'var(--radius-md)', marginBottom: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '2px solid #f59e0b' }}>
                    <Trophy size={80} color="#d97706" />
                    <h3 style={{ marginTop: '24px', color: '#b45309', fontSize: '1.5rem', textAlign: 'center' }}>You are a true historian of the Middle Colonies!</h3>
                </div>
                <button className="btn-primary" onClick={onComplete} style={{ backgroundColor: '#f59e0b', boxShadow: '0 5px 0 #b45309', alignSelf: 'center', fontSize: '1.2rem', padding: '16px 32px' }}>
                    Claim Victory
                </button>
            </ScreenShell>
        );
    }

    if (!currentQuestion) return null;

    return (
        <ScreenShell title="The Governor's Gate" color="#1e293b" icon={<Search size={32} color="white" />}>

            <div style={{
                backgroundColor: '#0f172a',
                padding: '24px',
                borderRadius: 'var(--radius-xl)',
                marginBottom: '24px',
                color: 'white'
            }}>
                <ProgressBar current={currentIndex + 1} total={questions.length} color="#fbbf24" />
                <h3 style={{ fontSize: '1.4rem', lineHeight: 1.5, margin: '24px 0 0 0', textAlign: 'center' }}>
                    {currentQuestion.prompt}
                </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {currentOptions.map((opt, idx) => {
                    let bgColor = 'white';
                    let textColor = '#1e293b';
                    let borderColor = '#cbd5e1';
                    let boxShadowColor = '#cbd5e1';

                    if (selectedAnswer !== null) {
                        if (opt === currentQuestion.correctAnswer) {
                            bgColor = '#fbbf24';
                            textColor = '#451a03';
                            borderColor = '#fbbf24';
                            boxShadowColor = '#d97706';
                        } else if (opt === selectedAnswer) {
                            bgColor = '#ef4444';
                            textColor = 'white';
                            borderColor = '#ef4444';
                            boxShadowColor = '#b91c1c';
                        } else {
                            bgColor = '#f8fafc';
                            textColor = '#94a3b8';
                            borderColor = '#e2e8f0';
                            boxShadowColor = 'transparent';
                        }
                    }

                    return (
                        <button
                            key={idx}
                            className="btn-secondary"
                            style={{
                                backgroundColor: bgColor,
                                color: textColor,
                                boxShadow: `0 5px 0 ${boxShadowColor}`,
                                border: `2px solid ${borderColor}`,
                                padding: '16px 24px',
                                textAlign: 'center',
                                borderRadius: 'var(--radius-md)',
                                opacity: (selectedAnswer !== null && opt !== currentQuestion.correctAnswer && opt !== selectedAnswer) ? 0.6 : 1,
                                fontSize: '1.1rem',
                                fontWeight: 600
                            }}
                            onClick={() => handleAnswer(opt)}
                            disabled={selectedAnswer !== null}
                        >
                            {opt}
                        </button>
                    )
                })}
            </div>

            {isCorrect === true && (
                <FeedbackPanel
                    isCorrect={true}
                    text={currentQuestion.positiveFeedback}
                    onNext={handleNext}
                />
            )}
            {isCorrect === false && (
                <FeedbackPanel
                    isCorrect={false}
                    text={currentQuestion.negativeFeedback}
                    onRetry={handleRetry}
                />
            )}
        </ScreenShell>
    );
}
