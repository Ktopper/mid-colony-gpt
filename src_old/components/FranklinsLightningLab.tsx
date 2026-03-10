import { useState, useEffect, useMemo } from 'react';
import { Zap, TestTube, Lightbulb, CheckCircle } from 'lucide-react';
import { franklinsLightningLabData } from '../data';
import { shuffle } from '../utils';
import { Question } from '../types';
import { ScreenShell, FeedbackPanel } from './Shared';

export default function FranklinsLightningLab({ onComplete, onBack }: { onComplete: () => void, onBack: () => void }) {
    const [phase, setPhase] = useState<'intro' | 'playing' | 'outro'>('intro');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    useEffect(() => {
        setQuestions(shuffle(franklinsLightningLabData.questions));
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

    // Scramble options once per question
    const currentOptions = useMemo(() => {
        if (!currentQuestion) return [];
        if (currentQuestion.type === 'true-false') {
            return ['True', 'False'];
        }
        return shuffle(currentQuestion.options);
    }, [currentQuestion]);

    if (phase === 'intro') {
        return (
            <ScreenShell title="Franklin's Lightning Lab" color="var(--color-relic-crystal)" icon={<TestTube size={32} />}>
                <div style={{
                    backgroundColor: '#fffbeb',
                    borderRadius: 'var(--radius-lg)',
                    padding: '32px',
                    margin: '16px 0 32px 0',
                    display: 'flex',
                    justifyContent: 'center',
                    border: '4px solid #fde68a'
                }}>
                    <Zap size={80} color="var(--color-relic-crystal)" />
                </div>
                <p style={{ fontSize: '1.2rem', marginBottom: '24px', textAlign: 'center' }}>
                    Welcome to the lab! Help Benjamin Franklin sort out his facts, inventions, and the industries of the big cities to earn the Spark Crystal!
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: 'auto' }}>
                    <button className="btn-secondary" onClick={onBack} style={{ backgroundColor: '#64748b', boxShadow: '0 5px 0 #475569' }}>Back to Hub</button>
                    <button className="btn-primary" onClick={handleStart} style={{ backgroundColor: 'var(--color-relic-crystal)', boxShadow: '0 6px 0 #d97706' }}>Enter Lab</button>
                </div>
            </ScreenShell>
        );
    }

    if (phase === 'outro') {
        return (
            <ScreenShell title="Lab Complete!" color="var(--color-relic-crystal)" icon={<CheckCircle size={32} />}>
                <p style={{ fontSize: '1.2rem', marginBottom: '24px', textAlign: 'center' }}>
                    Brilliant deduction! You successfully organized Franklin's facts and powered up the lab!
                </p>
                <div style={{ padding: '24px', backgroundColor: '#fffbeb', borderRadius: 'var(--radius-md)', marginBottom: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Zap size={64} color="var(--color-relic-crystal)" />
                    <h3 style={{ marginTop: '16px', color: 'var(--color-secondary-dark)' }}>Spark Crystal Unlocked!</h3>
                </div>
                <button className="btn-primary" onClick={onComplete} style={{ backgroundColor: 'var(--color-relic-crystal)', boxShadow: '0 5px 0 #d97706', alignSelf: 'center' }}>
                    Claim Relic & Return
                </button>
            </ScreenShell>
        );
    }

    if (!currentQuestion) return null;

    return (
        <ScreenShell title="Franklin's Lightning Lab" color="var(--color-relic-crystal)" icon={<TestTube size={32} />}>

            {/* Battery Progress / Puzzle Tracker */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
                {questions.map((_, idx) => {
                    const isPast = idx < currentIndex;
                    const isCurrent = idx === currentIndex;
                    return (
                        <div key={idx} style={{
                            width: '40px',
                            height: '16px',
                            backgroundColor: isPast ? 'var(--color-relic-crystal)' : (isCurrent ? '#fef3c7' : '#e2e8f0'),
                            border: `2px solid ${isCurrent || isPast ? '#d97706' : '#cbd5e1'}`,
                            borderRadius: '4px',
                            transition: 'all 0.3s ease'
                        }} />
                    )
                })}
            </div>

            <div style={{
                backgroundColor: '#334155', // Chalkboard dark theme
                color: 'white',
                padding: '24px',
                borderRadius: 'var(--radius-lg)',
                marginBottom: '24px',
                position: 'relative'
            }}>
                <div style={{ position: 'absolute', top: '-16px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--color-relic-crystal)', borderRadius: '50%', padding: '8px', border: '4px solid white' }}>
                    <Lightbulb size={24} color="white" />
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center', marginBottom: '16px', marginTop: '12px' }}>
                    Experiment {currentIndex + 1}
                </div>
                <h3 style={{ textAlign: 'center', fontSize: '1.4rem', lineHeight: 1.4 }}>
                    {currentQuestion.prompt}
                </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: currentOptions.length === 2 ? '1fr 1fr' : '1fr', gap: '12px' }}>
                {currentOptions.map((opt, idx) => {
                    let bgColor = 'white';
                    let textColor = '#334155';
                    let borderColor = '#cbd5e1';
                    let boxShadowColor = '#cbd5e1';

                    if (selectedAnswer !== null) {
                        if (opt === currentQuestion.correctAnswer) {
                            bgColor = 'var(--color-relic-crystal)';
                            textColor = 'white';
                            borderColor = 'var(--color-relic-crystal)';
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
                                opacity: (selectedAnswer !== null && opt !== currentQuestion.correctAnswer && opt !== selectedAnswer) ? 0.6 : 1,
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
