import { SYSTEM_REQUIREMENTS } from '../content/systemRequirements';

type SystemRequirementsListProps = {
  className?: string;
  compact?: boolean;
};

export function SystemRequirementsList({ className = '', compact = false }: SystemRequirementsListProps) {
  return (
    <div className={`system-requirements${className ? ` ${className}` : ''}`}>
      <p className="system-requirements__title">System Requirements</p>
      <ul className={`system-requirements__list${compact ? ' system-requirements__list--compact' : ''}`}>
        {SYSTEM_REQUIREMENTS.map(item => (
          <li key={item} className="system-requirements__item">
            <span className="system-requirements__bullet" aria-hidden>
              •
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
