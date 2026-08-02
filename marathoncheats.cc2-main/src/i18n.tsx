import { useState, useEffect, type ReactNode } from 'react';
import { I18nContext } from './i18n/context';

const translations: Record<string, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.buy': 'Buy',
    'hero.status': 'External · Updated for latest patch',
    'hero.subtitle': 'Aimbot, ESP & Wallhack',
    'hero.description': "Marathon Cheats delivers aimbot, ESP, and wallhack for Bungie's Marathon extraction shooter on Steam. Compare external player ESP, loot ESP, radar, pricing, compatibility, reviews, and setup guides.",
    'hero.cta': 'For pricing',
    'hero.features': 'See Features',
    'hero.trust': 'Windows 10 & 11 · Steam · BattlEye · External cheat',
    'meta.title': 'Marathon Cheats | ESP, Aimbot, Wallhack & PC Pricing',
    'meta.description': "Marathon Cheats for Bungie's extraction shooter on Steam. Compare external ESP, aimbot, loot ESP, radar, pricing, compatibility, reviews, and setup guides.",
  },
  de: {
    'nav.home': 'Startseite',
    'nav.blog': 'Blog',
    'nav.buy': 'Kaufen',
    'hero.status': 'Unerkannt · Aktualisiert fur neuesten Patch',
    'hero.subtitle': 'Aimbot, ESP & Wallhack',
    'hero.description': 'Dominiere jeden Raid in Bungies Marathon Extraction-Shooter. Voller ESP, leiser Aimbot, Wallhack und Loot-Highlights — alles in einem externen Cheat. Unerkannt und nach jedem Patch aktualisiert.',
    'hero.cta': 'Preise ansehen',
    'hero.features': 'Features Ansehen',
    'hero.trust': 'Windows 10 & 11 · Steam · BattlEye · Extern & Unerkannt',
    'meta.title': 'Marathon Cheats für Bungies Extraction-Shooter | ESP',
    'meta.description': 'Marathon Cheats mit externem ESP, Aimbot, Wallhack, Loot-Radar und Rückstoßkontrolle. Für Bungies Extraction-Shooter auf Windows 10 und 11 über Steam.',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.blog': 'Blog',
    'nav.buy': 'Acheter',
    'hero.status': 'Indetecte · Mis a jour pour le dernier patch',
    'hero.subtitle': 'Aimbot, ESP & Wallhack',
    'hero.description': "Dominez chaque raid dans le shooter d'extraction Marathon de Bungie. ESP complet, aimbot silencieux, wallhack et surlignage de butin — le tout dans un cheat externe. Indetecte et mis a jour apres chaque patch.",
    'hero.cta': 'Voir les tarifs',
    'hero.features': 'Voir Les Fonctionnalites',
    'hero.trust': 'Windows 10 & 11 · Steam · BattlEye · Externe & Indetecte',
    'meta.title': "Marathon Cheats pour le shooter Marathon de Bungie | ESP",
    'meta.description': "Cheats Marathon avec ESP externe, aimbot silencieux, wallhack, radar de butin et contrôle du recul. Pour le shooter d'extraction de Bungie sur Windows 10 et 11.",
  },
  es: {
    'nav.home': 'Inicio',
    'nav.blog': 'Blog',
    'nav.buy': 'Comprar',
    'hero.status': 'Indetectable · Actualizado para el ultimo parche',
    'hero.subtitle': 'Aimbot, ESP & Wallhack',
    'hero.description': 'Domina cada incursion en el shooter de extraccion Marathon de Bungie. ESP completo, aimbot silencioso, wallhack y resaltado de botin — todo en un cheat externo. Indetectable y actualizado despues de cada parche.',
    'hero.cta': 'Ver precios',
    'hero.features': 'Ver Funciones',
    'hero.trust': 'Windows 10 & 11 · Steam · BattlEye · Externo e Indetectable',
    'meta.title': 'Marathon Cheats para el extraction shooter de Bungie',
    'meta.description': 'Cheats para Marathon con ESP externo, aimbot silencioso, wallhack, radar de botín y control de retroceso. Para Windows 10 y 11 en Steam.',
  },
  pt: {
    'nav.home': 'Inicio',
    'nav.blog': 'Blog',
    'nav.buy': 'Comprar',
    'hero.status': 'Indetectavel · Atualizado para o ultimo patch',
    'hero.subtitle': 'Aimbot, ESP & Wallhack',
    'hero.description': 'Domine cada raid no shooter de extracao Marathon da Bungie. ESP completo, aimbot silencioso, wallhack e destaque de loot — tudo em um cheat externo. Indetectavel e atualizado apos cada patch.',
    'hero.cta': 'Ver precos',
    'hero.features': 'Ver Recursos',
    'hero.trust': 'Windows 10 & 11 · Steam · BattlEye · Externo & Indetectavel',
    'meta.title': 'Marathon Cheats para o extraction shooter da Bungie',
    'meta.description': 'Cheats para Marathon com ESP externo, aimbot silencioso, wallhack, radar de loot e controle de recuo. Para Windows 10 e 11 no Steam.',
  },
  ru: {
    'nav.home': 'Главная',
    'nav.blog': 'Блог',
    'nav.buy': 'Купить',
    'hero.status': 'Необнаруживаемый · Обновлен для последнего патча',
    'hero.subtitle': 'Аимбот, ESP и Wallhack',
    'hero.description': 'Доминируйте в каждом рейде в шутере Marathon от Bungie. Полный ESP, тихий аимбот, wallhack и подсветка лута — все в одном внешнем чите. Необнаруживаемый и обновляемый после каждого патча.',
    'hero.cta': 'Цены',
    'hero.features': 'Смотреть Функции',
    'hero.trust': 'Windows 10 & 11 · Steam · BattlEye · Внешний & Необнаруживаемый',
    'meta.title': 'Marathon Cheats для extraction-шутера Bungie | ESP',
    'meta.description': 'Читы для Marathon с внешним ESP, аимботом, wallhack, радаром лута и контролем отдачи. Для Windows 10 и 11 через Steam.',
  },
  zh: {
    'nav.home': '首页',
    'nav.blog': '博客',
    'nav.buy': '购买',
    'hero.status': '未检测 · 已更新至最新补丁',
    'hero.subtitle': '自瞄, 透视 & 穿墙',
    'hero.description': '在Bungie的Marathon提取射击游戏中称霸每场突袭。完整ESP、静默自瞄、穿墙和战利品高亮——全部集成在一个外部作弊器中。未检测，每次补丁后更新。',
    'hero.cta': '查看价格',
    'hero.features': '查看功能',
    'hero.trust': 'Windows 10 & 11 · Steam · BattlEye · 外部 & 未检测',
    'meta.title': 'Marathon Cheats：Bungie撤离射击游戏外挂',
    'meta.description': '适用于Bungie Marathon的外部辅助，包含ESP透视、静默自瞄、穿墙、战利品雷达与后坐力控制，支持Windows 10和11的Steam版本。',
  },
  ja: {
    'nav.home': 'ホーム',
    'nav.blog': 'ブログ',
    'nav.buy': '購入',
    'hero.status': '未検出 · 最新パッチに対応',
    'hero.subtitle': 'エイムボット、ESP & ウォールハック',
    'hero.description': 'BungieのMarathonで全レイドを制覇。フルESP、サイレントエイムボット、ウォールハック、ルートハイライト — 全て1つの外部チートに。未検出でパッチごとに更新。',
    'hero.cta': '料金を見る',
    'hero.features': '機能を見る',
    'hero.trust': 'Windows 10 & 11 · Steam · BattlEye · 外部 & 未検出',
    'meta.title': 'Marathon Cheats：Bungie抽出シューター向けチート',
    'meta.description': 'BungieのMarathon向け外部チート。ESP、サイレントエイムボット、ウォールハック、ルートレーダー、リコイル制御に対応。Windows 10/11のSteam版向け。',
  },
  ko: {
    'nav.home': '홈',
    'nav.blog': '블로그',
    'nav.buy': '구매',
    'hero.status': '미탐지 · 최신 패치 업데이트됨',
    'hero.subtitle': '에임봇, ESP & 월핵',
    'hero.description': 'Bungie의 Marathon 추출 슈터에서 모든 레이드를 지배하세요. 풀 ESP, 사일런트 에임봇, 월핵, 전리품 하이라이트 — 하나의 외부 치트에 모두. 미탐지이며 매 패치 후 업데이트.',
    'hero.cta': '가격 보기',
    'hero.features': '기능 보기',
    'hero.trust': 'Windows 10 & 11 · Steam · BattlEye · 외부 & 미탐지',
    'meta.title': 'Marathon Cheats: Bungie 추출 슈터용 치트 | ESP',
    'meta.description': 'Bungie Marathon용 외부 치트. ESP, 사일런트 에임봇, 월핵, 전리품 레이더, 반동 제어 지원. Windows 10 및 11 Steam 버전용.',
  },
  tr: {
    'nav.home': 'Anasayfa',
    'nav.blog': 'Blog',
    'nav.buy': 'Satın Al',
    'hero.status': 'Tespit Edilemez · Son yama icin guncellendi',
    'hero.subtitle': 'Aimbot, ESP & Wallhack',
    'hero.description': "Bungie'nin Marathon extraction shooter'inda her baskinda domine edin. Tam ESP, sessiz aimbot, wallhack ve ganimet vurgulama — hepsi tek bir harici hilede. Tespit edilemez ve her yamadan sonra guncellenir.",
    'hero.cta': 'Fiyatlar',
    'hero.features': 'Ozellikleri Gor',
    'hero.trust': 'Windows 10 & 11 · Steam · BattlEye · Harici & Tespit Edilemez',
    'meta.title': "Marathon Cheats: Bungie Extraction Shooter için Hile",
    'meta.description': "Bungie'nin Marathon oyunu için harici ESP, sessiz aimbot, wallhack, loot radarı ve geri tepme kontrolü. Windows 10 ve 11 Steam sürümü için.",
  },
  pl: {
    'nav.home': 'Strona Glowna',
    'nav.blog': 'Blog',
    'nav.buy': 'Kup',
    'hero.status': 'Niewykrywalny · Zaktualizowany do najnowszej latki',
    'hero.subtitle': 'Aimbot, ESP & Wallhack',
    'hero.description': 'Zdominuj kazdy rajd w shooterze ekstrakcyjnym Marathon od Bungie. Pelny ESP, cichy aimbot, wallhack i podswietlanie lupu — wszystko w jednym zewnetrznym cheacie. Niewykrywalny i aktualizowany po kazdej latce.',
    'hero.cta': 'Cennik',
    'hero.features': 'Zobacz Funkcje',
    'hero.trust': 'Windows 10 & 11 · Steam · BattlEye · Zewnetrzny & Niewykrywalny',
    'meta.title': 'Marathon Cheats do extraction shootera Bungie | ESP',
    'meta.description': 'Cheats do Marathon z zewnętrznym ESP, aimbotem, wallhackiem, radarem łupu i kontrolą odrzutu. Dla Windows 10 i 11 na Steam.',
  },
  nl: {
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.buy': 'Koop',
    'hero.status': 'Ondetecteerbaar · Bijgewerkt voor laatste patch',
    'hero.subtitle': 'Aimbot, ESP & Wallhack',
    'hero.description': "Domineer elke raid in Bungie's Marathon extraction shooter. Volledige ESP, stille aimbot, wallhack en buit-highlights — alles in een externe cheat. Ondetecteerbaar en bijgewerkt na elke patch.",
    'hero.cta': 'Prijzen bekijken',
    'hero.features': 'Functies Bekijken',
    'hero.trust': 'Windows 10 & 11 · Steam · BattlEye · Extern & Ondetecteerbaar',
    'meta.title': "Marathon Cheats voor Bungie's extraction shooter | ESP",
    'meta.description': "Marathon cheats met externe ESP, stille aimbot, wallhack, loot-radar en terugslagcontrole. Voor Bungie's extraction shooter op Windows 10 en 11 via Steam.",
  },
  it: {
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.buy': 'Acquista',
    'hero.status': 'Non rilevabile · Aggiornato per ultima patch',
    'hero.subtitle': 'Aimbot, ESP & Wallhack',
    'hero.description': "Domina ogni raid nello shooter di estrazione Marathon di Bungie. ESP completo, aimbot silenzioso, wallhack e evidenziazione bottino — tutto in un cheat esterno. Non rilevabile e aggiornato dopo ogni patch.",
    'hero.cta': 'Vedi prezzi',
    'hero.features': 'Vedi Funzionalita',
    'hero.trust': 'Windows 10 & 11 · Steam · BattlEye · Esterno & Non Rilevabile',
    'meta.title': "Marathon Cheats per l'extraction shooter di Bungie",
    'meta.description': 'Cheat per Marathon con ESP esterno, aimbot silenzioso, wallhack, radar loot e controllo rinculo. Per Windows 10 e 11 su Steam.',
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.blog': 'المدونة',
    'nav.buy': 'شراء',
    'hero.status': 'غير قابل للكشف · محدث لآخر تحديث',
    'hero.subtitle': 'ايمبوت، ESP وولهاك',
    'hero.description': 'سيطر على كل غارة في لعبة Marathon من Bungie. ESP كامل، ايمبوت صامت، ولهاك وتمييز الغنائم — كل ذلك في غش خارجي واحد. غير قابل للكشف ومحدث بعد كل تحديث.',
    'hero.cta': 'الأسعار',
    'hero.features': 'عرض المميزات',
    'hero.trust': 'Windows 10 & 11 · Steam · BattlEye · خارجي وغير قابل للكشف',
    'meta.title': 'Marathon Cheats للعبة الاستخراج من Bungie | ESP',
    'meta.description': 'غش Marathon خارجي مع ESP وAimbot صامت وwallhack ورادار غنائم وتحكم بالارتداد. لإصدار Steam على Windows 10 و11.',
  },
  th: {
    'nav.home': 'หน้าหลัก',
    'nav.blog': 'บล็อก',
    'nav.buy': 'ซื้อ',
    'hero.status': 'ตรวจไม่พบ · อัปเดตสำหรับแพทช์ล่าสุด',
    'hero.subtitle': 'เอมบอท, ESP & วอลแฮค',
    'hero.description': 'ครองทุกเรดใน Marathon ของ Bungie ESP เต็มรูปแบบ, เอมบอทเงียบ, วอลแฮค และไฮไลท์ลูท — ทั้งหมดในโกงภายนอกตัวเดียว ตรวจไม่พบและอัปเดตหลังทุกแพทช์',
    'hero.cta': 'ราคา',
    'hero.features': 'ดูฟีเจอร์',
    'hero.trust': 'Windows 10 & 11 · Steam · BattlEye · ภายนอก & ตรวจไม่พบ',
    'meta.title': 'Marathon Cheats สำหรับเกม extraction shooter ของ Bungie',
    'meta.description': 'ชีท Marathon แบบภายนอกพร้อม ESP, Aimbot เงียบ, wallhack, เรดาร์ลูท และควบคุมแรงถีบ สำหรับ Steam บน Windows 10 และ 11',
  },
  vi: {
    'nav.home': 'Trang Chu',
    'nav.blog': 'Blog',
    'nav.buy': 'Mua',
    'hero.status': 'Khong bi phat hien · Cap nhat cho ban va moi nhat',
    'hero.subtitle': 'Aimbot, ESP & Wallhack',
    'hero.description': 'Thong tri moi cuoc dot kich trong Marathon cua Bungie. ESP day du, aimbot im lang, wallhack va lam noi bat chien loi pham — tat ca trong mot hack ben ngoai. Khong bi phat hien va cap nhat sau moi ban va.',
    'hero.cta': 'Xem gia',
    'hero.features': 'Xem Tinh Nang',
    'hero.trust': 'Windows 10 & 11 · Steam · BattlEye · Ben Ngoai & Khong Bi Phat Hien',
    'meta.title': 'Marathon Cheats cho extraction shooter của Bungie',
    'meta.description': 'Cheat Marathon ngoài với ESP, aimbot im lặng, wallhack, radar loot và kiểm soát giật. Dành cho Steam trên Windows 10 và 11.',
  },
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState(() => {
    const stored = localStorage.getItem('lang');
    if (stored && translations[stored]) return stored;
    const browserLang = navigator.language.split('-')[0];
    if (translations[browserLang]) return browserLang;
    return 'en';
  });

  const setLang = (newLang: string) => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations.en[key] || key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}
