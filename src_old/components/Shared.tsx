import { ReactNode } from 'react';

export function ScreenShell({ title, color, children, icon }: { title: string, color: string, children: ReactNode, icon?: ReactNode }) {
    return (
        <div className="card screen-shell" style={{ borderTop: `8px solid ${color}`, width: '100%', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
            <div className="screen-header" style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', marginBottom: '24px' }}>
                {icon && <span style={{ color }}>{icon}</span>}
                <h2 style={{ color, margin: 0 }}>{title}</h2>
            </div>
            <div className="screen-content" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                {children}
            </div>
        </div>
    );
}

export function FeedbackPanel({ isCorrect, text, onNext, onRetry }: { isCorrect: boolean, text: string, onNext?: () => void, onRetry?: () => void }) {
    const bgColor = isCorrect ? '#dcfce7' : '#fee2e2';
    const textColor = isCorrect ? '#166534' : '#991b1b';

    return (
        <div className="feedback-panel" style={{ backgroundColor: bgColor, color: textColor, padding: '16px', borderRadius: 'var(--radius-md)', marginTop: '24px', textAlign: 'center' }}>
            <p style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: 600 }}>{text}</p>
            {isCorrect && onNext && (
                <button className="btn-primary" onClick={onNext} style={{ backgroundColor: 'var(--color-success)', boxShadow: '0 5px 0 #059669', margin: 0 }}>Next Question</button>
            )}
            {!isCorrect && onRetry && (
                <button className="btn-secondary" onClick={onRetry} style={{ margin: 0, backgroundColor: '#ef4444', boxShadow: '0 5px 0 #b91c1c' }}>Try Again</button>
            )}
        </div>
    );
}

export function ProgressBar({ current, total, color }: { current: number, total: number, color: string }) {
    const percentage = Math.max(0, Math.min(100, (current / total) * 100));
    return (
        <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--color-text-light)', fontWeight: 600, fontSize: '0.9rem' }}>
                <span>Progress</span>
                <span>{current} / {total}</span>
            </div>
            <div className="progress-bar" style={{ background: '#e2e8f0', borderRadius: 'var(--radius-full)', height: '12px', width: '100%', overflow: 'hidden' }}>
                <div className="progress-fill" style={{ background: color, height: '100%', width: `${percentage}%`, transition: 'width 0.3s ease' }}></div>
            </div>
        </div>
    );
}
