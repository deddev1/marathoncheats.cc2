type LanguageFlagProps = {
  countryCode: string;
  className?: string;
};

/** Small country flag image shown beside language labels in the selector. */
export function LanguageFlag({ countryCode, className = '' }: LanguageFlagProps) {
  return (
    <span
      className={`language-flag${className ? ` ${className}` : ''}`}
      aria-hidden="true"
    >
      <img
        src={`https://flagcdn.com/w20/${countryCode}.png`}
        srcSet={`https://flagcdn.com/w40/${countryCode}.png 2x`}
        alt=""
        width={20}
        height={15}
        loading="lazy"
        decoding="async"
        className="language-flag__image"
      />
    </span>
  );
}
