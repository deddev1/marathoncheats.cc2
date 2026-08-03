import type { SeoLocaleCode } from '../locales';
import type { SeoMeta } from './homeSeo';

export type BlogSlug =
  | 'marathoncheats-esp'
  | 'marathoncheats-aimbot'
  | 'marathoncheats-hwid'
  | 'marathon-extraction-tips-with-esp';

type LocalizedBlogSeo = Record<BlogSlug, Record<SeoLocaleCode, SeoMeta>>;

export const BLOG_POST_SEO: LocalizedBlogSeo = {
  'marathoncheats-esp': {
    en: {
      title: 'Marathon ESP Guide: Wallhack & Loot | Marathon Cheats',
      description:
        'Marathon ESP guide: player wallhack boxes, skeleton lines, loot highlights, distance reads, and range sliders for external overlays on Steam Windows.',
    },
    de: {
      title: 'Marathon ESP Guide: Wallhack & Loot | Marathon Cheats',
      description:
        'Marathon ESP Guide: Spieler-Wallhack-Boxen, Skelettlinien, Loot-Highlights, Distanzanzeigen und Reichweitenregler für externe Overlays auf Steam Windows.',
    },
    fr: {
      title: 'Guide ESP Marathon : wallhack et loot | Marathon Cheats',
      description:
        'Guide ESP Marathon : boîtes wallhack joueur, lignes squelette, surbrillance du butin, distances et curseurs de portée pour overlays externes sur Steam Windows.',
    },
    es: {
      title: 'Guía ESP Marathon: wallhack y botín | Marathon Cheats',
      description:
        'Guía ESP Marathon: cajas wallhack de jugadores, líneas de esqueleto, resaltado de botín, lecturas de distancia y controles de rango para overlays en Steam Windows.',
    },
    pt: {
      title: 'Guia ESP Marathon: wallhack e loot | Marathon Cheats',
      description:
        'Guia ESP Marathon: caixas wallhack de jogadores, linhas de esqueleto, destaque de loot, leituras de distância e controles de alcance para overlays no Steam Windows.',
    },
    ja: {
      title: 'Marathon ESPガイド：ウォールハックとルート | Marathon Cheats',
      description:
        'Marathon ESPガイド：プレイヤーウォールハック枠、スケルトンライン、ルートハイライト、距離表示、射程スライダーなど外部オーバーレイの設定を解説します。',
    },
    ko: {
      title: 'Marathon ESP 가이드: 월핵 & 루트 | Marathon Cheats',
      description:
        'Marathon ESP 가이드: 플레이어 월핵 박스, 스켈레톤 라인, 루트 하이라이트, 거리 표시, 범위 슬라이더 등 Windows Steam 외부 오버레이 설정을 설명합니다.',
    },
    tr: {
      title: 'Marathon ESP rehberi: wallhack ve loot | Marathon Cheats',
      description:
        'Marathon ESP rehberi: oyuncu wallhack kutuları, iskelet çizgileri, loot vurguları, mesafe okumaları ve harici overlay menzil ayarları Steam Windows için.',
    },
    pl: {
      title: 'Poradnik ESP Marathon: wallhack i loot | Marathon Cheats',
      description:
        'Poradnik ESP Marathon: boxy wallhack graczy, linie szkieletu, podświetlanie łupu, odczyty dystansu i suwaki zasięgu dla zewnętrznych overlayów na Steam Windows.',
    },
    it: {
      title: 'Guida ESP Marathon: wallhack e loot | Marathon Cheats',
      description:
        'Guida ESP Marathon: box wallhack giocatori, linee scheletro, evidenziazione loot, letture distanza e cursori di portata per overlay esterni su Steam Windows.',
    },
    nl: {
      title: 'Marathon ESP-gids: wallhack en loot | Marathon Cheats',
      description:
        'Marathon ESP-gids: speler wallhack-boxen, skeletlijnen, loot-highlights, afstandsweergave en bereikschuifregelaars voor externe overlays op Steam Windows.',
    },
    'zh-CN': {
      title: 'Marathon ESP 指南：穿墙与战利品透视 | Marathon Cheats',
      description:
        'Marathon ESP 指南：玩家穿墙框、骨骼线、战利品高亮、距离读取与范围滑块，适用于 Windows 版 Steam 的外部透视叠加层设置与使用技巧。',
    },
    sv: {
      title: 'Marathon ESP-guide: wallhack och loot | Marathon Cheats',
      description:
        'Marathon ESP-guide: spelar-wallhack-rutor, skelettlinjer, loot-markeringar, avståndsavläsning och räckviddsreglage för externa overlays på Steam Windows.',
    },
    ru: {
      title: 'Гайд ESP Marathon: wallhack и лут | Marathon Cheats',
      description:
        'Гайд ESP Marathon: боксы wallhack игроков, линии скелета, подсветка лута, дистанция и ползунки дальности для внешних оверлеев на Steam Windows.',
    },
    id: {
      title: 'Panduan ESP Marathon: wallhack & loot | Marathon Cheats',
      description:
        'Panduan ESP Marathon: kotak wallhack pemain, garis kerangka, sorotan loot, pembacaan jarak, dan slider jangkauan untuk overlay eksternal di Steam Windows.',
    },
  },
  'marathoncheats-aimbot': {
    en: {
      title: 'Marathon Aimbot Setup: FOV & Smoothing | Marathon Cheats',
      description:
        'Marathon aimbot setup guide: bone selector, FOV circle, smoothing, visibility check, no-recoil control, and natural tuning for extraction shooter raids.',
    },
    de: {
      title: 'Marathon Aimbot Setup: FOV & Smoothing | Marathon Cheats',
      description:
        'Marathon Aimbot Setup: Knochenauswahl, FOV-Kreis, Smoothing, Sichtbarkeitsprüfung, No-Recoil-Kontrolle und natürliches Tuning für Extraction-Raids.',
    },
    fr: {
      title: 'Config aimbot Marathon : FOV et lissage | Marathon Cheats',
      description:
        'Guide aimbot Marathon : sélecteur d\'os, cercle FOV, lissage, vérification de visibilité, contrôle du recul et réglages naturels pour les raids d\'extraction.',
    },
    es: {
      title: 'Config aimbot Marathon: FOV y suavizado | Marathon Cheats',
      description:
        'Guía aimbot Marathon: selector de huesos, círculo FOV, suavizado, comprobación de visibilidad, control sin retroceso y ajuste natural para incursiones.',
    },
    pt: {
      title: 'Setup aimbot Marathon: FOV e suavização | Marathon Cheats',
      description:
        'Guia aimbot Marathon: seletor de ossos, círculo FOV, suavização, verificação de visibilidade, controle sem recuo e ajuste natural para raids de extração.',
    },
    ja: {
      title: 'Marathonエイムボット設定：FOVとスムージング',
      description:
        'Marathonエイムボット設定ガイド：ボーンセレクター、FOVサークル、スムージング、視認チェック、ノーリコイル制御、抽出シューターレイド向け自然な調整方法。',
    },
    ko: {
      title: 'Marathon 에임봇 설정: FOV 및 스무딩 | Marathon Cheats',
      description:
        'Marathon 에임봇 설정 가이드: 본 선택, FOV 원, 스무딩, 가시성 확인, 노 리코일 제어, 추출 슈터 레이드에 맞는 자연스러운 튜닝 방법을 설명합니다.',
    },
    tr: {
      title: 'Marathon aimbot kurulum rehberi: FOV ve yumuşatma',
      description:
        'Marathon aimbot rehberi: kemik seçici, FOV dairesi, yumuşatma, görünürlük kontrolü, geri tepme kontrolü ve extraction raidleri için doğal ayarlar.',
    },
    pl: {
      title: 'Setup aimbot Marathon: FOV i wygładzanie | Marathon Cheats',
      description:
        'Poradnik aimbot Marathon: wybór kości, koło FOV, wygładzanie, sprawdzanie widoczności, kontrola odrzutu i naturalne strojenie pod rajdy extraction.',
    },
    it: {
      title: 'Setup aimbot Marathon: FOV e smoothing | Marathon Cheats',
      description:
        'Guida aimbot Marathon: selettore ossa, cerchio FOV, smoothing, controllo visibilità, no-recoil e taratura naturale per raid extraction shooter.',
    },
    nl: {
      title: 'Marathon aimbot setup: FOV en smoothing | Marathon Cheats',
      description:
        'Marathon aimbot-gids: botselector, FOV-cirkel, smoothing, zichtbaarheidscheck, no-recoil en natuurlijke tuning voor extraction-raids op PC.',
    },
    'zh-CN': {
      title: 'Marathon 自瞄设置：FOV 与平滑度 | Marathon Cheats',
      description:
        'Marathon 自瞄设置指南：骨骼选择、FOV 圆圈、平滑度、可见性检测、无后坐力控制，以及适用于撤离射击突袭的自然调参技巧。',
    },
    sv: {
      title: 'Marathon aimbot-setup: FOV och smoothing | Marathon Cheats',
      description:
        'Marathon aimbot-guide: benväljare, FOV-cirkel, smoothing, synlighetskontroll, no-recoil och naturlig tuning för extraction-raider på PC.',
    },
    ru: {
      title: 'Настройка аимбота Marathon: FOV и сглаживание',
      description:
        'Гайд по аимботу Marathon: выбор кости, круг FOV, сглаживание, проверка видимости, контроль отдачи и естественная настройка для рейдов extraction.',
    },
    id: {
      title: 'Setup aimbot Marathon: FOV & smoothing | Marathon Cheats',
      description:
        'Panduan aimbot Marathon: pemilih tulang, lingkaran FOV, smoothing, cek visibilitas, kontrol recoil, dan tuning natural untuk raid extraction shooter.',
    },
  },
  'marathoncheats-hwid': {
    en: {
      title: 'Marathon HWID Spoofer Guide: BattlEye Bans | Marathon Cheats',
      description:
        'Marathon anti-cheat and HWID guide: how BattlEye hardware bans work, when a spoofer helps, and how to protect your PC after a Marathon cheat ban.',
    },
    de: {
      title: 'Marathon HWID Spoofer Guide: BattlEye Bans | Marathon Cheats',
      description:
        'Marathon Anti-Cheat- und HWID-Guide: wie BattlEye Hardware-Bans funktionieren, wann ein Spoofer hilft und wie Sie Ihren PC nach einem Cheat-Ban schützen.',
    },
    fr: {
      title: 'Guide HWID Marathon : bans BattlEye | Marathon Cheats',
      description:
        'Guide anti-cheat et HWID Marathon : fonctionnement des bans matériels BattlEye, quand un spoofer aide et comment protéger votre PC après un ban cheat.',
    },
    es: {
      title: 'Guía HWID Marathon: bans de BattlEye | Marathon Cheats',
      description:
        'Guía anti-cheat y HWID Marathon: cómo funcionan los bans de hardware BattlEye, cuándo ayuda un spoofer y cómo proteger tu PC tras un ban por cheats.',
    },
    pt: {
      title: 'Guia HWID Marathon: bans BattlEye | Marathon Cheats',
      description:
        'Guia anti-cheat e HWID Marathon: como funcionam bans de hardware BattlEye, quando um spoofer ajuda e como proteger seu PC após ban por cheat.',
    },
    ja: {
      title: 'Marathon HWIDスプーファーガイド：BattlEye BAN',
      description:
        'MarathonアンチチートとHWIDガイド：BattlEyeのハードウェアBANの仕組み、スプーファーが有効な場合、チートBAN後のPC保護方法を解説します。',
    },
    ko: {
      title: 'Marathon HWID 스푸퍼 가이드: BattlEye 밴 | Marathon Cheats',
      description:
        'Marathon 안티치트 및 HWID 가이드: BattlEye 하드웨어 밴 작동 방식, 스푸퍼가 도움이 되는 경우, 치트 밴 후 PC 보호 방법을 설명합니다.',
    },
    tr: {
      title: 'Marathon HWID spoofer rehberi: BattlEye banları',
      description:
        'Marathon anti-cheat ve HWID rehberi: BattlEye donanım banları nasıl çalışır, spoofer ne zaman yardımcı olur ve cheat banı sonrası PC koruma adımları.',
    },
    pl: {
      title: 'Poradnik HWID Marathon: bany BattlEye | Marathon Cheats',
      description:
        'Poradnik anti-cheat i HWID Marathon: jak działają bany sprzętowe BattlEye, kiedy pomaga spoofer i jak chronić PC po banie za cheaty Marathon.',
    },
    it: {
      title: 'Guida HWID Marathon: ban BattlEye | Marathon Cheats',
      description:
        'Guida anti-cheat e HWID Marathon: come funzionano i ban hardware BattlEye, quando aiuta uno spoofer e come proteggere il PC dopo un ban per cheat.',
    },
    nl: {
      title: 'Marathon HWID spoofer-gids: BattlEye bans | Marathon Cheats',
      description:
        'Marathon anti-cheat en HWID-gids: hoe BattlEye hardware-bans werken, wanneer een spoofer helpt en hoe je je PC beschermt na een cheat-ban.',
    },
    'zh-CN': {
      title: 'Marathon HWID 欺骗器指南：BattlEye 封禁',
      description:
        'Marathon 反作弊与 HWID 指南：BattlEye 硬件封禁原理、何时需要欺骗器，以及在外挂封禁后保护电脑与恢复游戏访问的建议。',
    },
    sv: {
      title: 'Marathon HWID spoofer-guide: BattlEye-bans | Marathon Cheats',
      description:
        'Marathon anti-cheat- och HWID-guide: hur BattlEye hårdvarubans fungerar, när en spoofer hjälper och hur du skyddar din PC efter ett cheat-ban.',
    },
    ru: {
      title: 'Гайд HWID spoofer Marathon: баны BattlEye и защита',
      description:
        'Гайд по античиту и HWID Marathon: как работают аппаратные баны BattlEye, когда помогает спуфер и как защитить ПК после бана за читы.',
    },
    id: {
      title: 'Panduan HWID spoofer Marathon: ban BattlEye & tips',
      description:
        'Panduan anti-cheat dan HWID Marathon: cara kerja ban hardware BattlEye, kapan spoofer membantu, dan cara melindungi PC setelah ban cheat.',
    },
  },
  'marathon-extraction-tips-with-esp': {
    en: {
      title: 'Marathon Extraction Tips: 8 ESP Raid Plays | Marathon Cheats',
      description:
        'Marathon extraction tips for Bungie\'s extraction shooter: ESP awareness, player alerts, loot routing, fight decisions, and radar timing with wallhack overlays.',
    },
    de: {
      title: 'Marathon Extraction-Tipps: 8 ESP-Raid-Plays | Marathon Cheats',
      description:
        'Marathon Extraction-Tipps für Bungies Shooter: ESP-Bewusstsein, Spielerwarnungen, Loot-Routen, Kampfentscheidungen und Radar-Timing mit Wallhack-Overlays.',
    },
    fr: {
      title: 'Astuces extraction Marathon : 8 plays ESP | Marathon Cheats',
      description:
        'Astuces extraction Marathon : conscience ESP, alertes joueurs, routes de butin, décisions de combat et timing radar avec overlays wallhack.',
    },
    es: {
      title: 'Consejos extracción Marathon: 8 jugadas ESP | Marathon Cheats',
      description:
        'Consejos de extracción Marathon: conciencia ESP, alertas de jugadores, rutas de botín, decisiones de combate y timing de radar con overlays wallhack.',
    },
    pt: {
      title: 'Dicas de extração Marathon: 8 jogadas ESP | Marathon Cheats',
      description:
        'Dicas de extração Marathon: consciência ESP, alertas de jogadores, rotas de loot, decisões de luta e timing de radar com overlays wallhack.',
    },
    ja: {
      title: 'Marathon抽出Tips：ESPレイド8つの戦術 | Marathon Cheats',
      description:
        'Marathon抽出シューターのTips：ESP認識、プレイヤー警告、ルート経路、交戦判断、ウォールハックオーバーレイを使ったレーダータイミングを紹介。',
    },
    ko: {
      title: 'Marathon 추출 팁: ESP 레이드 8가지 | Marathon Cheats',
      description:
        'Marathon 추출 슈터 팁: ESP 인지, 플레이어 경고, 루트 경로, 교전 결정, 월핵 오버레이를 활용한 레이더 타이밍 전략을 설명합니다.',
    },
    tr: {
      title: 'Marathon extraction ipuçları: 8 ESP raid hamlesi',
      description:
        'Marathon extraction ipuçları: ESP farkındalığı, oyuncu uyarıları, loot rotaları, savaş kararları ve wallhack overlay ile radar zamanlaması.',
    },
    pl: {
      title: 'Porady extraction Marathon: 8 zagrań ESP | Marathon Cheats',
      description:
        'Porady extraction Marathon: świadomość ESP, alerty graczy, trasy łupu, decyzje walki i timing radaru z overlayami wallhack w rajdach.',
    },
    it: {
      title: 'Consigli extraction Marathon: 8 mosse ESP | Marathon Cheats',
      description:
        'Consigli extraction Marathon: consapevolezza ESP, avvisi giocatori, rotte loot, decisioni di combattimento e timing radar con overlay wallhack.',
    },
    nl: {
      title: 'Marathon extraction-tips: 8 ESP raid-plays | Marathon Cheats',
      description:
        'Marathon extraction-tips: ESP-bewustzijn, spelerswaarschuwingen, loot-routes, gevechtsbeslissingen en radar-timing met wallhack-overlays.',
    },
    'zh-CN': {
      title: 'Marathon 撤离技巧：8 个 ESP 突袭策略 | Marathon Cheats',
      description:
        'Marathon 撤离射击技巧：ESP 感知、玩家警报、战利品路线、交战决策，以及配合穿墙叠加层的雷达时机与更安全撤离策略。',
    },
    sv: {
      title: 'Marathon extraction-tips: 8 ESP-raidspel | Marathon Cheats',
      description:
        'Marathon extraction-tips: ESP-medvetenhet, spelarvarningar, loot-rutter, stridsbeslut och radartiming med wallhack-overlays i raider.',
    },
    ru: {
      title: 'Советы по extraction Marathon: 8 ESP-ходов | Marathon Cheats',
      description:
        'Советы по extraction Marathon: осознанность ESP, оповещения об игроках, маршруты лута, решения в бою и тайминг радара с wallhack-оверлеями.',
    },
    id: {
      title: 'Tips extraction Marathon: 8 permainan ESP raid',
      description:
        'Tips extraction Marathon: kesadaran ESP, peringatan pemain, rute loot, keputusan bertarung, dan timing radar dengan overlay wallhack.',
    },
  },
};

export function getBlogPostSeo(slug: string, locale: SeoLocaleCode): SeoMeta | undefined {
  const entry = BLOG_POST_SEO[slug as BlogSlug];
  return entry?.[locale] ?? entry?.en;
}

const BLOG_TITLE_SUFFIX = ' | Marathon Cheats';
const BLOG_TITLE_MAX = 60;

export function buildBlogPostTitle(postTitle: string, locale: SeoLocaleCode = 'en') {
  const slug = Object.keys(BLOG_POST_SEO).find(key => {
    const enTitle = BLOG_POST_SEO[key as BlogSlug].en.title;
    return enTitle.includes(postTitle.slice(0, 20));
  });

  if (slug) {
    const seo = getBlogPostSeo(slug, locale);
    if (seo?.title) return seo.title;
  }

  const maxBaseLength = BLOG_TITLE_MAX - BLOG_TITLE_SUFFIX.length;
  if (postTitle.length <= maxBaseLength) {
    return `${postTitle}${BLOG_TITLE_SUFFIX}`;
  }

  return `${postTitle.slice(0, maxBaseLength - 1).trimEnd()}…${BLOG_TITLE_SUFFIX}`;
}
