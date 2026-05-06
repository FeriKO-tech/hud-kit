import type { Quest, QuestObjective, QuestTrackerProps } from '../types';

function objectiveProgress(objective: QuestObjective) {
  if (objective.completed) return 1;
  if (typeof objective.current === 'number' && typeof objective.max === 'number' && objective.max > 0) {
    return Math.min(1, Math.max(0, objective.current / objective.max));
  }
  return 0;
}

function questProgress(quest: Quest) {
  if (typeof quest.progress === 'number') return Math.min(1, Math.max(0, quest.progress));
  if (!quest.objectives || quest.objectives.length === 0) return 0;
  return quest.objectives.reduce((sum, objective) => sum + objectiveProgress(objective), 0) / quest.objectives.length;
}

export function QuestTracker({
  quests,
  title = 'Quests',
  onQuestClick,
  className,
}: QuestTrackerProps) {
  return (
    <section className={['hk-root', 'hk-quest', className].filter(Boolean).join(' ')}>
      <header className="hk-quest__header">
        <span>{title}</span>
        <span className="hk-quest__count">{quests.length}</span>
      </header>
      <div className="hk-quest__list">
        {quests.map((quest) => {
          const progress = questProgress(quest);
          const isInteractive = Boolean(onQuestClick);

          return (
            <button
              className={['hk-quest__item', quest.active && 'hk-quest__item--active'].filter(Boolean).join(' ')}
              type="button"
              key={quest.id}
              disabled={!isInteractive}
              onClick={() => onQuestClick?.(quest)}
            >
              <span className="hk-quest__title">{quest.title}</span>
              {quest.description && <span className="hk-quest__desc">{quest.description}</span>}
              <span className="hk-quest__bar" aria-hidden="true">
                <span className="hk-quest__fill" style={{ width: `${progress * 100}%` }} />
              </span>
              {quest.objectives && quest.objectives.length > 0 && (
                <span className="hk-quest__objectives">
                  {quest.objectives.map((objective) => (
                    <span
                      className={[
                        'hk-quest__objective',
                        objectiveProgress(objective) >= 1 && 'hk-quest__objective--done',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      key={objective.id}
                    >
                      {objective.text}
                      {typeof objective.current === 'number' && typeof objective.max === 'number' && (
                        <span className="hk-quest__objective-progress">
                          {objective.current}/{objective.max}
                        </span>
                      )}
                    </span>
                  ))}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
