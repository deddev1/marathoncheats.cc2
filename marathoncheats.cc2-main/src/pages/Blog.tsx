import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatedSection } from '../components/AnimatedSection';
import { NotFoundPage } from './NotFound';
import { SITE_IMAGES } from '../content/siteImages';
import { SeoImage } from '../components/SeoImage';
import { BLOG_LIST_HEADING } from '../seo/pageHeadings';

export const BLOG_POSTS = [
  {
    slug: 'marathoncheats-esp',
    title: 'Marathon ESP: See Every Enemy Through Walls',
    category: 'ESP',
    date: 'July 1, 2026',
    readTime: '6 min read',
    image: SITE_IMAGES.esp,
    excerpt:
      'A complete guide to Marathon ESP — 2D boxes, skeleton lines, loot highlights, player distance, and range sliders. Everything you need to dominate every raid with full information.',
    body: `
ESP — Extra Sensory Perception — is the backbone of any serious Marathon cheat. Where aimbot gives you precision, ESP gives you information, and in an extraction shooter, information is everything.

## What Does Marathon ESP Show?

A well-built ESP overlay renders data directly onto your screen in real time, tied to the game's internal entity list. In Marathon, that means:

- **2D Box ESP**: A bounding rectangle around every enemy, visible through any surface. Even behind reinforced walls, shipping containers, or dense terrain, the box stays locked to the player model.
- **Skeleton Lines**: Full bone-structure rendering — head, shoulders, spine, hips, knees. Lets you predict crouching, prone movement, and angles before the enemy rounds a corner.
- **Player Distance**: Exact metre count to every visible entity. At 200m you might hold. At 40m you push. Distance context changes your decision-making entirely.
- **Loot Highlights**: Weapons, high-tier armour, keycards, and valuables all glow through walls with custom colours. No more running past a Tier-4 SMG because you didn't check a dark corner.
- **Player Alerts**: An on-screen notification fires the moment any enemy enters your configured detection radius. You'll know before they know about you.
- **Info Color**: Fully customisable ESP colours so your overlay stays readable and never feels cluttered.

## Player & AI ESP Range Sliders

Marathon ESP lets you separate player ESP range from loot ESP range. For solos in early raid, keep loot range maxed and player range moderate to avoid HUD clutter. As the raid matures and squads rotate, shrink loot range and push player detection to max.

## Loot & World ESP

Show Loot highlights nearby weapons, gear, and valuables through walls. Show Ore & Plants marks resource nodes for efficient farming. Show Chests identifies containers instantly. Loot ESP Range limits how far items appear so your overlay stays clean.

## Why External ESP Is Safer

An external cheat reads game memory from a separate process rather than injecting code into the Marathon executable. Because nothing is injected, signature-based detection and module scanning find nothing to flag. The draw calls happen via an overlay window on top of the game — clean, external, and outside Marathon's memory space.

## Tips for First-Time Users

1. Start with box ESP only — learn to read positions before adding skeleton and distance.
2. Set a subtle colour palette rather than bright red, which strains eyes on long sessions.
3. Use range sliders to cap at 120m initially. Seeing hundreds of enemy tags across the map is overwhelming.
4. Enable loot ESP last, once you're comfortable with player tracking.

ESP is the single feature that most dramatically changes how Marathon feels. Once you've raided with it, returning without it feels like playing blind.
    `,
  },
  {
    slug: 'marathoncheats-aimbot',
    title: 'Marathon Aimbot: Bone Selector, FOV & Smoothing Guide',
    category: 'Aimbot',
    date: 'July 3, 2026',
    readTime: '7 min read',
    image: SITE_IMAGES.aimbot,
    excerpt:
      'Configure a Marathon aimbot that looks human — choosing the right bone target, smoothing curves, FOV radius, visibility checks, and recoil control to stay under the radar while dominating raids.',
    body: `
A raw aimbot that snaps instantly to every target is both obvious and unpleasant to play. A well-tuned aimbot feels like an extension of your own skill — catching targets you'd nearly miss, correcting for movement, never snapping unnaturally. Here's how to configure it correctly.

## Custom Aim Key

Bind aimbot activation to any key you choose. Using a side mouse button keeps it seamless and natural — activation never interrupts your movement inputs.

## Bone Selection: Head vs Chest vs Neck

**Head**: Maximum damage per shot, kills faster. Risk: head hitboxes are small and move more erratically. Looks suspicious if you're consistently landing headshots at 150m on moving targets.

**Chest/Upper Chest**: Larger hitbox, more forgiving. Consistent damage but requires more shots. Looks natural for rifle combat distances.

**Neck**: Sweet spot. Close to the head damage multiplier but with a slightly larger and more stable hitbox. Recommended default for most scenarios.

## FOV Circle Size

The FOV circle defines how far from your crosshair the aimbot will reach to acquire a target. A tiny FOV (10–15°) only assists when enemies are nearly on your crosshair — very subtle. A large FOV (60°+) yanks your aim across the screen — obvious.

**Recommended**: Start at 25–35° for general use. Enable Draw FOV to see the circle on-screen while configuring.

## Aim Smooth: The Most Important Setting

Smoothing controls how fast the aimbot moves from your current crosshair position to the target. A value of 1 is instant snap. Values of 8–15 produce a curved, human-looking glide.

**Start at 10–12** and only reduce it if you're missing mobile targets at close range.

## Visibility Check

Always enable the visibility check. This ensures the aimbot only locks targets that have line-of-sight — enemies behind solid cover get ignored. Without this, your crosshair tracks through walls, which looks extremely suspicious.

## Simple Recoil Control

The recoil control module reads the current weapon's kick and applies inverse compensation — pushing the crosshair down to counteract muzzle rise. The result is flat, controlled spray during sustained fire.

Key setting: don't max out to 100%. At 65–80%, it looks like a highly skilled player controlling recoil manually.

## Sample Config for New Users

| Setting | Value |
|---|---|
| Bone Target | Neck |
| FOV | 30° |
| Smoothing | 12 |
| Visibility Check | On |
| Recoil Control | 70% |
| Aim Key | Mouse 4 (side button) |

Run this config for your first 5 raids. Adjust from there based on your natural aim style.
    `,
  },
  {
    slug: 'marathoncheats-hwid',
    title: 'Marathon HWID Spoofer: Evade Hardware Bans Explained',
    category: 'Spoofer',
    date: 'July 5, 2026',
    readTime: '7 min read',
    image: '/blog-hwid-spoofer.webp',
    excerpt:
      'Hardware ID bans are the nuclear option BattlEye uses against cheaters in Marathon. Here\'s exactly how HWID spoofing works, what IDs get flagged, and how to protect your hardware.',
    body: `
A hardware ban — also called an HWID ban — is the most severe action Bungie can take. Unlike an account ban, it targets your physical machine. Create a new account, re-install the game, buy a new copy — none of it matters. The ban follows your hardware.

## What Is a Hardware ID?

Marathon's BattlEye anti-cheat fingerprints your machine using a combination of identifiers:

- **HDD/SSD serial number**
- **Motherboard UUID**
- **CPU ID**
- **GPU device ID**
- **NIC (network card) MAC address**
- **BIOS/UEFI serial strings**

These are collected, hashed, and stored server-side. When a ban is issued, every combination of those strings gets blacklisted. Even with a new Windows install or a new account, those hardware strings re-report identically.

## How HWID Spoofing Works

A quality HWID spoofer intercepts the Windows API calls and driver queries that BattlEye uses to read hardware identifiers, substituting randomised values. The anti-cheat receives spoofed strings, not your real hardware. From its perspective, you're on a completely different machine.

A spoofer must operate at kernel (Ring 0) level to intercept queries before they leave the system. User-mode spoofers that only patch the registry are trivially defeated by anti-cheat that queries hardware directly via driver interfaces.

## What Gets Spoofed

A comprehensive spoofer covers:
- All storage device serials (SATA, NVMe, USB)
- Motherboard manufacturer strings and UUID
- BIOS version and serial
- MAC addresses across all network adapters
- GPU device instance paths
- CPU microcode identifiers
- Volume GUIDs

## When Do You Need a Spoofer?

If you're starting fresh, you don't need a spoofer yet. You want one if:

1. You received an HWID ban on a previous account or after a ban wave
2. You're running cheats on a machine that shares hardware fingerprints with a banned account
3. You want a proactive layer against detection before your hardware gets fingerprinted

## Spoofer + Cheat Workflow

Run the spoofer **before** launching Marathon. It patches hardware IDs at the session level. Then launch the game and cheat loader as normal. When you're done, reboot to reset. Your real hardware identifiers are never exposed during the game session.

## Marathon BattlEye and HWID Bans

Marathon uses **BattlEye** anti-cheat — a stronger protection layer compared to Bungie's previous titles like Destiny 2. BattlEye actively monitors system behaviour and is capable of issuing both account bans and HWID bans. Keeping your cheat updated and using a spoofer together gives you the best protection against ban waves.
    `,
  },
  {
    slug: 'marathon-extraction-tips-with-esp',
    title: 'Marathon Extraction Tips: 8 ESP Strategies for Safer Extracts',
    category: 'Guides',
    date: 'July 26, 2026',
    readTime: '8 min read',
    image: SITE_IMAGES.loot,
    excerpt:
      'Eight Marathon extraction tips for Bungie\'s extraction shooter — ESP awareness, player alerts, loot routing, fight-or-flight calls, and radar timing so you extract with gear instead of respawning empty-handed.',
    body: `
Winning a Marathon raid is not about the most kills. In this extraction shooter, the only score that matters is what you carry out. Marathon cheats with ESP, wallhack overlays, and radar-style distance reads change how you plan every rotation — but only if you use the information deliberately.

These eight Marathon extraction tips assume you are running external ESP with player boxes, loot highlights, and player alerts. The goal is safer extracts, not louder fights.

## 1. Scan With ESP Before You Move

Never sprint from cover because the lane looks empty. A wallhack box or skeleton line on ESP tells you if a Runner is holding an angle you cannot see. Pause for two seconds, sweep player ESP range, then commit to a path. Information first, movement second — that is the core habit behind every successful extract.

## 2. Treat Player Alerts Like a Tripwire

Player alerts fire when hostiles enter your detection radius. Do not treat them as a prompt to push. Use alerts to reposition: break line of sight, move to high ground, or route toward an extract corridor. Good positioning with player alerts means you always have an exit lane before the fight starts.

## 3. Route Loot With ESP, Not Memory

Loot ESP shows weapons, armour, and containers through walls. Plan a loop that hits high-tier pickups without backtracking through open ground. Mark your next two loot targets on mental map, but let ESP confirm they are still uncontested. Efficient loot routing with ESP cuts raid time — and every extra minute on Tau Ceti IV is another squad rotation rolling in.

## 4. Cap Loot Range When the Raid Heats Up

Early raid, wide loot ESP range is fine. Mid-raid, when player ESP tags multiply, shrink loot range so your overlay stays readable. Clutter causes missed threats. Marathon extraction tips that ignore HUD discipline fail the moment three squads converge on the same zone.

## 5. Know When to Engage vs Avoid Fights

ESP does not obligate you to shoot. Engage when you have cover, distance advantage, or a finishing angle on a solo. Avoid fights when player ESP shows multiple contacts, when you are carrying valuable loot, or when the timer favors extraction over domination. Third-parties love wounded squads — wallhack awareness should make you the squad that walks away.

## 6. Use Radar Distance Reads for Rotation Timing

Distance metres on player ESP act like a lightweight radar. Watch whether contacts are closing or drifting away. If ranges are shrinking from two directions, rotate immediately — do not finish one more loot pull. Rotation timing is how solos and duos survive in an extraction shooter built around PvPvE pressure.

## 7. Extract Early When Radar Shows Convergence

The best Marathon extraction tip is boring: leave with profit. If ESP shows two or more player tags moving toward your zone within sixty seconds, head to extract. A Tier-3 weapon in your stash beats a heroic last stand every time.

## 8. Pair ESP Awareness With Natural Movement

Marathon cheats give you wallhack-level information, but your movement should still look human. Do not hard-track enemies through cover. Do not sprint directly at every loot glow. Let ESP guide decisions while your pathing stays unpredictable.

## Putting It Together

Stack these habits across your next five raids: scan, alert, route, filter, fight selectively, rotate on radar, extract early, move naturally. For player ESP, loot ESP, aimbot tools, and loader access, compare **Marathon Cheats** plans on the pricing page — monthly and lifetime options include full ESP and wallhack features for Steam on Windows.

Ready to run these plays with full overlays? View pricing and feature breakdown on the buy page linked below.
    `,
  },
];

const CATEGORIES = ['All', 'ESP', 'Aimbot', 'Spoofer', 'Guides'];

function BlogCard({ post, featured = false }: { post: typeof BLOG_POSTS[0]; featured?: boolean }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <article
        className="feature-card glass-card"
        style={{
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: featured ? '16/7' : '16/9' }}>
          <SeoImage
            src={post.image}
            fallbackAlt={post.title}
            loading="lazy"
            width={featured ? 1280 : 720}
            height={featured ? 560 : 405}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s cubic-bezier(.25,.1,.25,1)',
              display: 'block',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)')}
            onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(6,4,9,0.85) 0%, rgba(6,4,9,0.1) 60%, transparent 100%)',
          }} />
          <span style={{
            position: 'absolute',
            top: 14,
            left: 14,
            background: 'var(--accent)',
            color: '#fff',
            fontFamily: 'var(--font-body)',
            fontSize: '0.6875rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            padding: '4px 10px',
            borderRadius: 'var(--radius-sm)',
          }}>
            {post.category}
          </span>
        </div>
        <div style={{ padding: featured ? '28px 32px 32px' : '22px 24px 28px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{post.date}</span>
            <span style={{ color: 'var(--border-bright)', fontSize: '0.6rem' }} aria-hidden="true">●</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{post.readTime}</span>
          </div>
          {/* h3 — correct hierarchy under the page h1 "Marathon Cheat Blog" */}
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: featured ? 'clamp(1.4rem, 2.5vw, 1.9rem)' : 'clamp(1.1rem, 1.8vw, 1.35rem)',
            color: 'var(--text-primary)',
            lineHeight: 1.2,
            letterSpacing: '0.01em',
            textTransform: 'uppercase',
            margin: 0,
          }}>
            {post.title}
          </h3>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
            margin: 0,
            flex: 1,
          }}>
            {post.excerpt}
          </p>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            marginTop: 8,
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--accent-bright)',
            letterSpacing: '0.02em',
          }}>
            Read Article
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}

export function BlogListPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.category === activeCategory);

  const [featured, ...rest] = filtered;

  return (
    <div style={{ background: 'var(--bg-void)', minHeight: '100vh' }}>
      <div style={{
        position: 'relative',
        paddingTop: 'clamp(100px, 14vw, 160px)',
        paddingBottom: 'clamp(40px, 6vw, 80px)',
        paddingLeft: 'clamp(20px, 6vw, 80px)',
        paddingRight: 'clamp(20px, 6vw, 80px)',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 300,
          background: 'radial-gradient(ellipse, rgba(168,85,247,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} aria-hidden="true" />
        <AnimatedSection>
          <p className="section-label" style={{ justifyContent: 'center', marginBottom: 16 }}>Setup &amp; Compatibility Guides</p>
          {/* Single H1 on this page */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            color: 'var(--text-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            lineHeight: 1,
            margin: '0 auto 16px',
          }}>
            {BLOG_LIST_HEADING.h1}
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.95rem, 1.5vw, 1.125rem)',
            color: 'var(--text-secondary)',
            maxWidth: 560,
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            {BLOG_LIST_HEADING.intro}
          </p>
        </AnimatedSection>
      </div>

      <div style={{
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingBottom: 'clamp(32px, 5vw, 56px)',
        paddingLeft: 'clamp(20px, 6vw, 80px)',
        paddingRight: 'clamp(20px, 6vw, 80px)',
      }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '8px 18px',
              borderRadius: 'var(--radius-md)',
              border: activeCategory === cat ? '1px solid var(--accent)' : '1px solid var(--border-dim)',
              background: activeCategory === cat ? 'var(--accent-dim)' : 'transparent',
              color: activeCategory === cat ? 'var(--accent-bright)' : 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'var(--transition-fast)',
            }}
            onMouseEnter={e => {
              if (activeCategory !== cat) {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-bright)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
              }
            }}
            onMouseLeave={e => {
              if (activeCategory !== cat) {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-dim)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
              }
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 clamp(20px, 6vw, 80px) clamp(80px, 10vw, 140px)',
      }}>
        {filtered.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '80px 0' }}>No posts in this category yet.</p>
        ) : (
          <>
            {featured && (
              <AnimatedSection>
                <div style={{ marginBottom: 'clamp(32px, 5vw, 56px)' }}>
                  <BlogCard post={featured} featured />
                </div>
              </AnimatedSection>
            )}
            {rest.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
                gap: 'clamp(20px, 3vw, 32px)',
              }}>
                {rest.map((post) => (
                  <AnimatedSection key={post.slug}>
                    <BlogCard post={post} />
                  </AnimatedSection>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 clamp(20px, 6vw, 80px) clamp(80px, 10vw, 140px)',
      }}>
        <AnimatedSection>
          <nav aria-label="Related pages" style={{ paddingTop: 8 }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.875rem',
              color: 'var(--text-primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: 16,
            }}>
              More on Marathon Cheats
            </h2>
            <ul style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px 24px',
            }}>
              <li><Link to="/" className="hero-section__guides-link" style={{ marginBottom: 0 }}>Homepage</Link></li>
              <li><Link to="/marathoncheats-buy" className="hero-section__guides-link" style={{ marginBottom: 0 }}>Pricing &amp; features</Link></li>
              <li><Link to="/blog/marathoncheats-esp" className="hero-section__guides-link" style={{ marginBottom: 0 }}>ESP guide</Link></li>
              <li><Link to="/blog/marathoncheats-aimbot" className="hero-section__guides-link" style={{ marginBottom: 0 }}>Aimbot guide</Link></li>
              <li><Link to="/blog/marathoncheats-hwid" className="hero-section__guides-link" style={{ marginBottom: 0 }}>HWID guide</Link></li>
            </ul>
          </nav>
        </AnimatedSection>
      </div>
    </div>
  );
}

function renderBody(body: string) {
  const lines = body.trim().split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let tableRows: string[] = [];
  let inTable = false;

  const flushTable = () => {
    if (tableRows.length < 2) { tableRows = []; inTable = false; return; }
    const [header, , ...rows] = tableRows;
    elements.push(
      <div key={`table-${i}`} style={{ overflowX: 'auto', margin: '24px 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)', fontSize: '0.875rem' }}>
          <thead>
            <tr>
              {header.split('|').filter(Boolean).map((h, j) => (
                <th key={j} style={{
                  padding: '10px 16px',
                  textAlign: 'left',
                  color: 'var(--accent-bright)',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  fontSize: '0.75rem',
                  borderBottom: '1px solid var(--border-dim)',
                  whiteSpace: 'nowrap',
                }}>{h.trim()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} style={{ borderBottom: '1px solid var(--border-ghost)' }}>
                {row.split('|').filter(Boolean).map((cell, ci) => (
                  <td key={ci} style={{
                    padding: '10px 16px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                  }}>{cell.trim()}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    tableRows = [];
    inTable = false;
  };

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('|')) {
      inTable = true;
      tableRows.push(line);
      i++;
      continue;
    }

    if (inTable) flushTable();

    if (!line.trim()) { i++; continue; }

    if (line.startsWith('## ')) {
      /* h2 — correct under the article h1 */
      elements.push(
        <h2 key={i} style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
          color: 'var(--text-primary)',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          marginTop: 40,
          marginBottom: 12,
          paddingTop: 8,
          borderTop: '1px solid var(--border-ghost)',
        }}>{line.replace('## ', '')}</h2>
      );
    } else if (line.startsWith('### ')) {
      /* h3 — correct under h2 */
      elements.push(
        <h3 key={i} style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
          color: 'var(--accent-bright)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginTop: 28,
          marginBottom: 8,
        }}>{line.replace('### ', '')}</h3>
      );
    } else if (line.startsWith('- **')) {
      const match = line.match(/^- \*\*(.+?)\*\*:(.*)/);
      if (match) {
        elements.push(
          <li key={i} style={{
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            lineHeight: 1.7,
            marginLeft: 20,
            marginBottom: 6,
          }}>
            <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{match[1]}</strong>:{match[2]}
          </li>
        );
      }
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={i} style={{
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          lineHeight: 1.7,
          marginLeft: 20,
          marginBottom: 6,
        }}>{line.replace(/^- /, '')}</li>
      );
    } else if (/^\d+\./.test(line)) {
      elements.push(
        <li key={i} style={{
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          lineHeight: 1.7,
          marginLeft: 24,
          marginBottom: 6,
          listStyleType: 'decimal',
        }}>{line.replace(/^\d+\.\s/, '')}</li>
      );
    } else {
      const parts = line.split(/(\*\*.+?\*\*)/g);
      elements.push(
        <p key={i} style={{
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.9375rem',
          lineHeight: 1.75,
          margin: '0 0 14px',
        }}>
          {parts.map((part, pi) =>
            part.startsWith('**') ? (
              <strong key={pi} style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                {part.replace(/\*\*/g, '')}
              </strong>
            ) : part
          )}
        </p>
      );
    }
    i++;
  }

  if (inTable) flushTable();
  return elements;
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return <NotFoundPage />;
  }

  const related = BLOG_POSTS.filter(p => p.slug !== slug).slice(0, 2);

  return (
    <article style={{ background: 'var(--bg-void)', minHeight: '100vh' }}>
      {/* Hero image */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '21/7', overflow: 'hidden', maxHeight: 480 }}>
        <SeoImage
          src={post.image}
          fallbackAlt={post.title}
          loading="eager"
          width={1280}
          height={427}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(6,4,9,0.2) 0%, rgba(6,4,9,0.7) 70%, var(--bg-void) 100%)',
        }} />
        <span style={{
          position: 'absolute',
          bottom: 32,
          left: 'clamp(20px, 6vw, 80px)',
          background: 'var(--accent)',
          color: '#fff',
          fontFamily: 'var(--font-body)',
          fontSize: '0.6875rem',
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          padding: '5px 12px',
          borderRadius: 'var(--radius-sm)',
        }}>
          {post.category}
        </span>
      </div>

      {/* Article content */}
      <div style={{
        maxWidth: 800,
        margin: '0 auto',
        padding: 'clamp(32px, 5vw, 64px) clamp(20px, 6vw, 80px) clamp(64px, 10vw, 120px)',
      }}>
        <Link
          to="/blog"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            marginBottom: 28,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)')}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)')}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M12 7H2M6 3L2 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Blog
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{post.date}</span>
          <span style={{ color: 'var(--border-bright)', fontSize: '0.5rem' }} aria-hidden="true">●</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{post.readTime}</span>
        </div>

        {/* Single H1 for this page */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          color: 'var(--text-primary)',
          textTransform: 'uppercase',
          letterSpacing: '0.03em',
          lineHeight: 1.15,
          marginBottom: 24,
        }}>
          {post.title}
        </h1>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.05rem',
          color: 'var(--accent-bright)',
          lineHeight: 1.7,
          marginBottom: 36,
          paddingBottom: 32,
          borderBottom: '1px solid var(--border-dim)',
        }}>
          <strong>{post.title}.</strong> {post.excerpt}
        </p>

        <div>{renderBody(post.body)}</div>

        {/* Internal CTA linking to /marathoncheats-buy */}
        <div style={{
          marginTop: 56,
          padding: '32px 36px',
          borderRadius: 'var(--radius-lg)',
          background: 'linear-gradient(135deg, rgba(168,85,247,0.08) 0%, rgba(124,58,237,0.06) 100%)',
          border: '1px solid var(--border-bright)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
        }}>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>
              Compare Marathon Cheat Pricing
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Full ESP, aimbot, loot ESP, and loader download — from $40/month on the official buy page.
            </p>
          </div>
          <Link
            to="/marathoncheats-buy"
            className="btn-primary"
            style={{ flexShrink: 0 }}
          >
            View Pricing &amp; Features
          </Link>
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 clamp(20px, 6vw, 80px) clamp(80px, 10vw, 140px)',
        }}>
          <AnimatedSection>
            <p className="section-label" style={{ marginBottom: 24 }}>Related Articles</p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
              gap: 28,
            }}>
              {related.map(p => <BlogCard key={p.slug} post={p} />)}
            </div>
          </AnimatedSection>
        </div>
      )}
    </article>
  );
}
