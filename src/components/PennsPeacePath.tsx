import { useState, useEffect, useMemo } from 'react';
import { BookHeart, Key, MessageCircleHeart } from 'lucide-react';
import { pennsPeacePathData } from '../data';
import { shuffle } from '../utils';
import { Question } from '../types';
import { ScreenShell, FeedbackPanel, ProgressBar } from './Shared';

export default function PennsPeacePath({ onComplete, onBack }: { onComplete: () => void, onBack: () => void }) {
    const [phase, setPhase] = useState<'intro' | 'playing' | 'outro'>('intro');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    useEffect(() => {
        // We want to shuffle the questions to add replayability
        setQuestions(shuffle(pennsPeacePathData.questions));
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
            <ScreenShell title="Penn's Peace Path" color="var(--color-relic-key)" icon={<BookHeart size={32} />}>
                <p style={{ fontSize: '1.2rem', marginBottom: '16px', textAlign: 'center' }}>
                    Welcome to the Peace Path!
                </p>
                <p style={{ fontSize: '1.1rem', marginBottom: '24px', textAlign: 'center', color: 'var(--color-text-light)' }}>
                    Follow the trail to learn about William Penn, the Quakers, and their strong beliefs in equality, fairness, and peace. Make thoughtful choices to earn the Peace Key!
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: 'auto' }}>
                    <button className="btn-secondary" onClick={onBack} style={{ backgroundColor: '#64748b', boxShadow: '0 5px 0 #475569' }}>Return to Hub</button>
                    <button className="btn-primary" onClick={handleStart} style={{ backgroundColor: 'var(--color-relic-key)', boxShadow: '0 6px 0 #059669' }}>Walk the Path</button>
                </div>
            </ScreenShell>
        );
    }

    if (phase === 'outro') {
        return (
            <ScreenShell title="Peace Path Complete!" color="var(--color-relic-key)" icon={<Key size={32} />}>
                <p style={{ fontSize: '1.2rem', marginBottom: '24px', textAlign: 'center' }}>
                    Wonderful! You've learned about the important, peaceful history of the Quakers and William Penn's vision.
                </p>
                <div style={{ padding: '24px', backgroundColor: '#ecfdf5', borderRadius: 'var(--radius-md)', marginBottom: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Key size={64} color="var(--color-relic-key)" />
                    <h3 style={{ marginTop: '16px', color: 'var(--color-relic-key)' }}>Peace Key Unlocked!</h3>
                </div>
                <button className="btn-primary" onClick={onComplete} style={{ backgroundColor: 'var(--color-primary)', alignSelf: 'center' }}>
                    Claim Relic & Return
                </button>
            </ScreenShell>
        );
    }

    if (!currentQuestion) return null;

    return (
        <ScreenShell title="Penn's Peace Path" color="var(--color-relic-key)" icon={<BookHeart size={32} />}>
            <ProgressBar current={currentIndex + 1} total={questions.length} color="var(--color-relic-key)" />

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '24px', backgroundColor: '#f0fdf4', padding: '16px', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: '50%', boxShadow: 'var(--shadow-sm)' }}>
                    <MessageCircleHeart size={32} color="var(--color-relic-key)" />
                </div>
                <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.25rem', margin: 0, color: '#065f46', lineHeight: 1.4 }}>
                        "{currentQuestion.prompt}"
                    </h3>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {currentOptions.map((opt, idx) => {
                    let bgColor = 'white';
                    let textColor = '#064e3b';
                    let borderColor = '#a7f3d0';
                    let boxShadowColor = '#a7f3d0';

                    if (selectedAnswer !== null) {
                        if (opt === currentQuestion.correctAnswer) {
                            bgColor = 'var(--color-relic-key)';
                            textColor = 'white';
                            borderColor = 'var(--color-relic-key)';
                            boxShadowColor = '#047857';
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
                                textAlign: 'left',
                                padding: '16px 24px',
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
