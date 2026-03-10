import { useState, useEffect, useMemo } from 'react';
import { Map, CheckCircle } from 'lucide-react';
import { mapDashData } from '../data';
import { shuffle } from '../utils';
import { Question } from '../types';
import { ScreenShell, FeedbackPanel } from './Shared';

export default function MapDash({ onComplete, onBack }: { onComplete: () => void, onBack: () => void }) {
    const [phase, setPhase] = useState<'intro' | 'playing' | 'outro'>('intro');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    useEffect(() => {
        // Initialize and shuffle questions
        setQuestions(shuffle(mapDashData.questions));
    }, []);

    const handleStart = () => setPhase('playing');

    const handleAnswer = (answer: string) => {
        if (selectedAnswer !== null) return; // Prevent clicking after answering
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

    // Scramble options once per question
    const currentOptions = useMemo(() => {
        if (!currentQuestion) return [];
        if (currentQuestion.type === 'true-false') {
            return ['True', 'False']; // Keep logical order for True/False
        }
        return shuffle(currentQuestion.options);
    }, [currentQuestion]);

    if (phase === 'intro') {
        return (
            <ScreenShell title="Map Dash" color="var(--color-relic-compass)" icon={<Map size={32} />}>
                <div style={{
                    backgroundColor: '#f0fdf4',
                    borderRadius: 'var(--radius-lg)',
                    padding: '32px',
                    margin: '16px 0 32px 0',
                    display: 'flex',
                    justifyContent: 'center',
                    border: '4px dashed #86efac'
                }}>
                    <Map size={80} color="#16a34a" />
                </div>
                <p style={{ fontSize: '1.2rem', marginBottom: '24px', textAlign: 'center' }}>
                    Welcome to Map Dash! Journey across the geography of the Middle Colonies.
                    Answer correctly to step along the trail and earn the Explorer Compass!
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: 'auto' }}>
                    <button className="btn-secondary" onClick={onBack} style={{ backgroundColor: '#64748b', boxShadow: '0 5px 0 #475569' }}>Back to Hub</button>
                    <button className="btn-primary" onClick={handleStart} style={{ backgroundColor: 'var(--color-relic-compass)', boxShadow: '0 6px 0 #2563eb' }}>Start Dash</button>
                </div>
            </ScreenShell>
        );
    }

    if (phase === 'outro') {
        return (
            <ScreenShell title="Map Dash Complete!" color="var(--color-relic-compass)" icon={<CheckCircle size={32} />}>
                <p style={{ fontSize: '1.2rem', marginBottom: '24px', textAlign: 'center' }}>
                    Great job! You navigated the region perfectly and mastered the geography of the Middle Colonies.
                </p>
                <div style={{ padding: '24px', backgroundColor: '#eff6ff', borderRadius: 'var(--radius-md)', marginBottom: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Map size={64} color="var(--color-relic-compass)" />
                    <h3 style={{ marginTop: '16px', color: 'var(--color-relic-compass)' }}>Explorer Compass Unlocked!</h3>
                </div>
                <button className="btn-primary" onClick={onComplete} style={{ backgroundColor: 'var(--color-success)', boxShadow: '0 5px 0 #059669', alignSelf: 'center' }}>
                    Claim Relic & Return
                </button>
            </ScreenShell>
        );
    }

    if (!currentQuestion) return null;

    return (
        <ScreenShell title="Map Dash" color="var(--color-relic-compass)" icon={<Map size={32} />}>
            {/* Map Path Visualization */}
            <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', padding: '0 16px' }}>
                {/* Connecting Line */}
                <div style={{ position: 'absolute', top: '50%', left: '32px', right: '32px', height: '4px', backgroundColor: '#e2e8f0', zIndex: 0, transform: 'translateY(-50%)' }} />
                <div style={{ position: 'absolute', top: '50%', left: '32px', right: '32px', height: '4px', backgroundColor: 'var(--color-relic-compass)', zIndex: 0, transform: 'translateY(-50%)', width: `${Math.max(0, (currentIndex / (questions.length - 1)) * 100)}%`, transition: 'width 0.4s ease' }} />

                {questions.map((_, idx) => {
                    const isPast = idx < currentIndex;
                    const isCurrent = idx === currentIndex;

                    let nodeBg = 'white';
                    let nodeBorder = '#cbd5e1';

                    if (isPast) {
                        nodeBg = 'var(--color-relic-compass)';
                        nodeBorder = 'var(--color-relic-compass)';
                    } else if (isCurrent) {
                        nodeBg = '#eff6ff';
                        nodeBorder = 'var(--color-relic-compass)';
                    }

                    return (
                        <div key={idx} style={{
                            width: isCurrent ? '32px' : '24px',
                            height: isCurrent ? '32px' : '24px',
                            borderRadius: '50%',
                            backgroundColor: nodeBg,
                            border: `${isCurrent ? '4px' : '3px'} solid ${nodeBorder}`,
                            zIndex: 1,
                            transition: 'all 0.3s ease',
                            boxShadow: isCurrent ? '0 0 0 4px #bfdbfe' : 'none'
                        }} />
                    )
                })}
            </div>

            <div className="question-card" style={{ backgroundColor: '#eff6ff', border: '2px solid #bfdbfe', padding: '24px', borderRadius: 'var(--radius-lg)', marginBottom: '16px', flex: 1 }}>
                <div style={{ color: 'var(--color-relic-compass)', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.05em' }}>
                    Map Location {currentIndex + 1} of {questions.length}
                </div>
                <h3 style={{ marginBottom: '24px', fontSize: '1.4rem', textAlign: 'center', color: '#1e3a8a' }}>{currentQuestion.prompt}</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {currentOptions.map((opt, idx) => {
                        let bgColor = 'white';
                        let textColor = 'var(--color-text-dark)';
                        let borderColor = '#cbd5e1';
                        let boxShadowColor = '#cbd5e1';

                        if (selectedAnswer !== null) {
                            if (opt === currentQuestion.correctAnswer) {
                                bgColor = 'var(--color-success)';
                                textColor = 'white';
                                borderColor = 'var(--color-success)';
                                boxShadowColor = '#059669';
                            } else if (opt === selectedAnswer) {
                                bgColor = '#ef4444';
                                textColor = 'white';
                                borderColor = '#ef4444';
                                boxShadowColor = '#b91c1c';
                            } else {
                                // Dim other inactive options
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
                                    textAlign: 'left',
                                    padding: '16px 24px',
                                    opacity: (selectedAnswer !== null && opt !== currentQuestion.correctAnswer && opt !== selectedAnswer) ? 0.6 : 1,
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                                onClick={() => handleAnswer(opt)}
                                disabled={selectedAnswer !== null}
                            >
                                <div style={{ flex: 1 }}>{opt}</div>
                            </button>
                        )
                    })}
                </div>
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
