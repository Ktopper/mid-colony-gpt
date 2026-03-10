import { useState, useEffect, useMemo } from 'react';
import { Factory, Briefcase, Store, ShieldCheck } from 'lucide-react';
import { colonyTownChallengeData } from '../data';
import { shuffle } from '../utils';
import { Question } from '../types';
import { ScreenShell, FeedbackPanel } from './Shared';

export default function ColonyTownChallenge({ onComplete, onBack }: { onComplete: () => void, onBack: () => void }) {
    const [phase, setPhase] = useState<'intro' | 'playing' | 'outro'>('intro');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    useEffect(() => {
        setQuestions(shuffle(colonyTownChallengeData.questions));
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
        return shuffle(currentQuestion.options);
    }, [currentQuestion]);

    if (phase === 'intro') {
        return (
            <ScreenShell title="Colony Town Challenge" color="var(--color-relic-seal)" icon={<Factory size={32} />}>
                <div style={{
                    backgroundColor: '#faf5ff',
                    borderRadius: 'var(--radius-lg)',
                    padding: '32px',
                    margin: '16px 0 32px 0',
                    display: 'flex',
                    justifyContent: 'center',
                    border: '4px solid #e9d5ff'
                }}>
                    <Store size={80} color="var(--color-relic-seal)" />
                </div>
                <p style={{ fontSize: '1.2rem', marginBottom: '24px', textAlign: 'center' }}>
                    Welcome to town! Visit the different shops and meeting halls. Answer questions about the people and rules of the colony to earn the Colony Seal!
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: 'auto' }}>
                    <button className="btn-secondary" onClick={onBack} style={{ backgroundColor: '#64748b', boxShadow: '0 5px 0 #475569' }}>Back to Hub</button>
                    <button className="btn-primary" onClick={handleStart} style={{ backgroundColor: 'var(--color-relic-seal)', boxShadow: '0 6px 0 #6d28d9' }}>Enter Town</button>
                </div>
            </ScreenShell>
        );
    }

    if (phase === 'outro') {
        return (
            <ScreenShell title="Town Challenge Complete!" color="var(--color-relic-seal)" icon={<ShieldCheck size={32} />}>
                <p style={{ fontSize: '1.2rem', marginBottom: '24px', textAlign: 'center' }}>
                    Amazing work! You've successfully visited everyone and learned how the society worked.
                </p>
                <div style={{ padding: '24px', backgroundColor: '#faf5ff', borderRadius: 'var(--radius-md)', marginBottom: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Factory size={64} color="var(--color-relic-seal)" />
                    <h3 style={{ marginTop: '16px', color: 'var(--color-relic-seal)' }}>Colony Seal Unlocked!</h3>
                </div>
                <button className="btn-primary" onClick={onComplete} style={{ backgroundColor: 'var(--color-relic-seal)', boxShadow: '0 5px 0 #7c3aed', alignSelf: 'center' }}>
                    Claim Relic & Return
                </button>
            </ScreenShell>
        );
    }

    if (!currentQuestion) return null;

    return (
        <ScreenShell title="Colony Town Challenge" color="var(--color-relic-seal)" icon={<Factory size={32} />}>

            {/* Town Stop Tracker */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px', gap: '8px' }}>
                <span style={{ fontWeight: 'bold', color: 'var(--color-text-light)', marginRight: '8px' }}>TOWN MAP:</span>
                {questions.map((_, idx) => {
                    const isPast = idx < currentIndex;
                    const isCurrent = idx === currentIndex;
                    return (
                        <div key={idx} style={{
                            width: isCurrent || isPast ? '16px' : '10px',
                            height: isCurrent || isPast ? '16px' : '10px',
                            borderRadius: isCurrent ? '2px' : '50%',
                            backgroundColor: isPast ? 'var(--color-relic-seal)' : (isCurrent ? '#a855f7' : '#e2e8f0'),
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }} />
                    )
                })}
            </div>

            <div style={{
                backgroundColor: '#fdf4ff',
                border: '3px solid #f0abfc',
                padding: '24px',
                borderRadius: 'var(--radius-xl)',
                marginBottom: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
            }}>
                <div style={{ color: 'var(--color-relic-seal)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Briefcase size={24} />
                    <span style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Town Stop {currentIndex + 1}
                    </span>
                </div>
                <h3 style={{ fontSize: '1.35rem', lineHeight: 1.5, color: '#4c1d95', margin: 0 }}>
                    {currentQuestion.prompt}
                </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {currentOptions.map((opt, idx) => {
                    let bgColor = 'white';
                    let textColor = '#4c1d95';
                    let borderColor = '#e9d5ff';
                    let boxShadowColor = '#e9d5ff';

                    if (selectedAnswer !== null) {
                        if (opt === currentQuestion.correctAnswer) {
                            bgColor = 'var(--color-relic-seal)';
                            textColor = 'white';
                            borderColor = 'var(--color-relic-seal)';
                            boxShadowColor = '#6d28d9';
                        } else if (opt === selectedAnswer) {
                            bgColor = '#ef4444';
                            textColor = 'white';
                            borderColor = '#ef4444';
                            boxShadowColor = '#b91c1c';
                        } else {
                            bgColor = '#f8fafc';
                            textColor = '#cbd5e1';
                            borderColor = '#f1f5f9';
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
                                textAlign: 'left',
                                borderRadius: 'var(--radius-md)',
                                display: 'flex',
                                alignItems: 'center',
                                opacity: (selectedAnswer !== null && opt !== currentQuestion.correctAnswer && opt !== selectedAnswer) ? 0.6 : 1,
                                fontSize: '1.1rem'
                            }}
                            onClick={() => handleAnswer(opt)}
                            disabled={selectedAnswer !== null}
                        >
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                backgroundColor: selectedAnswer === null ? '#f3e8ff' : 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: '16px',
                                fontWeight: 'bold',
                                color: selectedAnswer === null ? 'var(--color-relic-seal)' : 'inherit'
                            }}>
                                {String.fromCharCode(65 + idx)}
                            </div>
                            <div style={{ flex: 1 }}>{opt}</div>
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
