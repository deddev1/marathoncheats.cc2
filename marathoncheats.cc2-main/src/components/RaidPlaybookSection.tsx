import { AnimatedSection } from './AnimatedSection';

type PlaybookItem = {
  bold: string;
  text: string;
};

type PlaybookGroup = {
  title: string;
  items: PlaybookItem[];
};

const PLAYBOOK_GROUPS: PlaybookGroup[] = [
  {
    title: 'Before you load in',
    items: [
      {
        bold: 'latest loader',
        text: ' — download the newest build from your order page after every Marathon patch.',
      },
      {
        bold: 'Windows settings',
        text: ' — disable Core Isolation and exploit protection; our setup guide takes under two minutes.',
      },
      {
        bold: 'external overlay',
        text: ' — Marathon Cheats runs outside the game process on Steam, not injected into memory.',
      },
      {
        bold: 'Steam on Windows 10 or 11',
        text: ' — confirm your OS build (up to 25H2) and launcher before you purchase.',
      },
    ],
  },
  {
    title: 'During the raid',
    items: [
      {
        bold: 'player & AI ESP',
        text: ' — track hostiles with boxes, skeleton lines, and distance reads before you push.',
      },
      {
        bold: 'aimbot with FOV limit',
        text: ' — use smoothing, visible-only checks, and a tight radius so aim stays believable.',
      },
      {
        bold: 'loot ESP',
        text: ' — route toward valuable containers and resources instead of wandering blind.',
      },
      {
        bold: 'responsible play',
        text: ' — obvious behavior still draws manual reports even with external software.',
      },
    ],
  },
];

export function RaidPlaybookSection() {
  return (
    <section className="raid-playbook-section" aria-labelledby="raid-playbook-heading">
      <div className="section-shell">
        <AnimatedSection>
          <div className="premium-panel raid-playbook-shell">
            <header className="raid-playbook-header">
              <p className="section-label">Playbook</p>
              <h2 id="raid-playbook-heading" className="display-heading raid-playbook-header__title">
                Get more from every Marathon raid
              </h2>
              <p className="raid-playbook-header__lead">
                A quick guide for setting up safely and using ESP, aimbot, and loot tools without wasting your subscription.
              </p>
            </header>

            <div className="raid-playbook-groups">
              {PLAYBOOK_GROUPS.map(group => (
                <div key={group.title} className="raid-playbook-group">
                  <h3 className="raid-playbook-group__title">{group.title}</h3>
                  <ul className="raid-playbook-list">
                    {group.items.map(item => (
                      <li key={item.bold} className="raid-playbook-list__item">
                        <span className="license-includes-list__dot" aria-hidden />
                        <span>
                          <strong>{item.bold}</strong>
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
