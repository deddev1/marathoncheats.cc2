export type FaqEntry = {
  q: string;
  a: string;
};

/** Informational intent — homepage FAQ schema and visible answers. */
export const HOME_FAQS: FaqEntry[] = [
  {
    q: 'How do Marathon cheats work?',
    a: 'Marathon Cheats is external software that reads game data from outside the Marathon process and draws an overlay for ESP, aimbot, and loot highlights. Nothing is injected into the game executable, and the loader is updated after Bungie patches.',
  },
  {
    q: 'What are the Marathon cheat system requirements?',
    a: 'You need Windows 10 or 11, Steam, a compatible CPU, HVCI/core isolation configured correctly, TPM, and Secure Boot settings that match our compatibility list. Cloud DMA is optional for hardware-separated setups.',
  },
  {
    q: 'Is Marathon Cheats compatible with Steam and BattlEye?',
    a: 'Yes. Marathon Cheats is built for the Steam release of Bungie\'s Marathon extraction shooter and is designed to work alongside BattlEye as an external loader. Always download the latest build after game updates.',
  },
  {
    q: 'Will Marathon Cheats affect performance?',
    a: 'Because the cheat runs as a separate external process, most players report little to no FPS loss during raids. Performance impact depends on your PC specs and overlay settings.',
  },
  {
    q: 'How do Marathon cheat patch updates work?',
    a: 'After Bungie releases a Marathon update, download the newest loader from your order page. Updated builds are usually posted within hours, and Discord support can help if your overlay stops working.',
  },
];

/** Commercial intent — store pricing, download, and purchase FAQs. */
export const STORE_FAQS: FaqEntry[] = [
  {
    q: 'How do I download Marathon Cheats after purchase?',
    a: 'Complete checkout, then open your order page for the loader download link, written setup guide, and setup video. Most users are running in under a minute.',
  },
  {
    q: 'What Marathon cheat features are included?',
    a: 'Your license includes player ESP, loot ESP, item highlights, aimbot, no-recoil control, radar-style awareness tools, and loader updates. See the feature list on this page for the full breakdown.',
  },
  {
    q: 'Can I use my Marathon Cheats license on more than one PC?',
    a: 'Each license is tied to one hardware ID (HWID). If you need to move to a new PC, open a ticket in our Discord and support will transfer your license for you.',
  },
  {
    q: 'Is Marathon Cheats difficult to set up?',
    a: 'No. Setup is quick — you get a step-by-step guide and video on your order page. Most users are running in under a minute. Join Discord if you need help.',
  },
  {
    q: 'Will Marathon Cheats affect FPS or performance?',
    a: 'Marathon Cheats runs as an external process outside the game, so performance impact is minimal. Most players report no noticeable FPS drop during raids.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Checkout accepts major credit and debit cards, crypto, and other payment options shown at purchase.',
  },
  {
    q: 'Marathon Cheats stopped working after a game update. What should I do?',
    a: 'After every Marathon patch, download the latest loader from your order page. Updated builds are usually posted within hours of a new game version.',
  },
  {
    q: 'The overlay does not appear. What do I do?',
    a: 'Confirm Windows 10 or 11 is up to date (Windows 11 24H2 or 25H2 is recommended), run the loader as administrator, and launch Marathon before pressing OK in the loader popup. If the overlay still does not show, open a Discord ticket with your Windows version and we will walk you through it.',
  },
  {
    q: 'How do I purchase Marathon Cheats?',
    a: 'Click Buy on this page to open checkout, or visit the Marathon product page. Choose Monthly ($40) or Lifetime ($150), then use the loader link and setup instructions on your order page.',
  },
];
