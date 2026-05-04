import { useEffect } from 'react';
import type { DialogueBoxProps } from '../types';
import { useTypewriter } from '../hooks/useTypewriter';

export function DialogueBox({
  speaker,
  text,
  choices = [],
  onChoice,
  onComplete,
  typeSpeed = 40,
  avatar,
  className,
}: DialogueBoxProps) {
  const { displayedText, isComplete } = useTypewriter(text, typeSpeed);

  useEffect(() => {
    if (isComplete) onComplete?.();
  }, [isComplete, onComplete]);

  return (
    <section className={['hk-root', 'hk-dlg', className].filter(Boolean).join(' ')} aria-live="polite">
      {(speaker || avatar) && (
        <header className="hk-dlg__header">
          {avatar && <img className="hk-dlg__avatar" src={avatar} alt={speaker ? `${speaker} avatar` : 'Dialogue avatar'} />}
          {speaker && <span className="hk-dlg__speaker">{speaker}</span>}
        </header>
      )}
      <div className="hk-dlg__text">
        {displayedText}
        {!isComplete && <span className="hk-dlg__cursor" />}
      </div>
      {isComplete && choices.length > 0 && (
        <div className="hk-dlg__choices">
          {choices.map((choice) => (
            <button className="hk-dlg__choice" type="button" key={choice.id} onClick={() => onChoice?.(choice)}>
              {choice.text}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
