type LanguageFlagProps = {
  emoji: string;
  className?: string;
};

/** Small country flag shown beside language labels in the selector. */
export function LanguageFlag({ emoji, className = '' }: LanguageFlagProps) {
  return (
    <span
      className={`language-flag${className ? ` ${className}` : ''}`}
      aria-hidden="true"
    >
      {emoji}
    </span>
  );
}
