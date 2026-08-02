import { SITE_URL } from '../seo/config';

const SHARE_URL = `${SITE_URL}/marathoncheats-buy`;
const SHARE_TEXT = 'Marathon Cheats — ESP, aimbot and wallhack for Bungie\'s extraction shooter.';

function shareLink(platform: 'x' | 'reddit') {
  const encodedUrl = encodeURIComponent(SHARE_URL);
  const encodedText = encodeURIComponent(SHARE_TEXT);

  if (platform === 'x') {
    return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
  }

  return `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedText}`;
}

export function ShareCard() {
  return (
    <div className="premium-panel share-card">
      <h2 className="share-card__title">Share this page</h2>
      <p className="share-card__desc">
        Know someone looking for Marathon cheats? Send them the buy page with ESP, aimbot, and setup details.
      </p>
      <div className="share-card__actions">
        <a
          href={shareLink('x')}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost share-card__btn"
        >
          Share on X
        </a>
        <a
          href={shareLink('reddit')}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost share-card__btn"
        >
          Share on Reddit
        </a>
      </div>
    </div>
  );
}
