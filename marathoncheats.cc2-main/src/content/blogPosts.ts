import { SITE_IMAGES } from './siteImages';

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
] as const;

export type BlogPost = (typeof BLOG_POSTS)[number];
