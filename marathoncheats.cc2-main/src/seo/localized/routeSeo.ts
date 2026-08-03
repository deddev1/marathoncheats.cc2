import type { SeoLocaleCode } from '../locales';
import type { SeoMeta } from './homeSeo';

export type RouteSeoKey = 'store' | 'blog' | 'terms' | 'privacy' | 'refund' | 'notFound';

export const ROUTE_PATHS: Record<RouteSeoKey, string> = {
  store: '/marathoncheats-buy',
  blog: '/blog',
  terms: '/terms',
  privacy: '/privacy',
  refund: '/refund',
  notFound: '/404',
};

const store: Record<SeoLocaleCode, SeoMeta> = {
  en: {
    title: 'Marathon Cheats from $40/mo | ESP, Aimbot & Wallhack',
    description:
      'Buy Marathon Cheats from $40/mo on Steam Windows. External ESP, aimbot, wallhack, loot ESP, loader download, Discord support, and post-patch loader updates.',
  },
  de: {
    title: 'Marathon Cheats ab 40 $/Monat | ESP, Aimbot & Wallhack',
    description:
      'Marathon Cheats ab 40 $/Monat für Steam auf Windows. Externes ESP, Aimbot, Wallhack, Loot-ESP, Loader-Download, Discord-Support und Updates nach Patches.',
  },
  fr: {
    title: 'Marathon Cheats dès 40 $/mois | ESP, aimbot & wallhack',
    description:
      'Achetez Marathon Cheats dès 40 $/mois sur Steam Windows. ESP externe, aimbot, wallhack, loot ESP, téléchargement du loader, support Discord et mises à jour.',
  },
  es: {
    title: 'Marathon Cheats desde 40 $/mes | ESP, aimbot y wallhack',
    description:
      'Compra Marathon Cheats desde 40 $/mes en Steam Windows. ESP externo, aimbot, wallhack, loot ESP, descarga del loader, soporte en Discord y actualizaciones.',
  },
  pt: {
    title: 'Marathon Cheats a partir de US$ 40/mês | ESP e aimbot',
    description:
      'Compre Marathon Cheats a partir de US$ 40/mês no Steam para Windows. ESP externo, aimbot, wallhack, loot ESP, download do loader, suporte no Discord e updates.',
  },
  ja: {
    title: 'Marathon Cheats 月額40ドル〜 | ESP・エイムボット対応',
    description:
      'Marathon Cheatsを月額40ドルから購入。Windows版Steam向け外部ESP、エイムボット、ウォールハック、ルートESP、ローダーDL、Discordサポート、パッチ後の更新に対応。',
  },
  ko: {
    title: 'Marathon Cheats 월 $40부터 | ESP, 에임봇, 월핵',
    description:
      'Marathon Cheats를 월 $40부터 구매하세요. Windows Steam용 외부 ESP, 에임봇, 월핵, 루트 ESP, 로더 다운로드, Discord 지원 및 패치 후 업데이트를 제공합니다.',
  },
  tr: {
    title: 'Marathon Cheats aylık 40 $ | ESP, aimbot ve wallhack',
    description:
      'Marathon Cheats aylık 40 $ ile Steam Windows için. Harici ESP, aimbot, wallhack, loot ESP, loader indirme, Discord desteği ve yama sonrası güncellemeler.',
  },
  pl: {
    title: 'Marathon Cheats od 40 $/mies. | ESP, aimbot i wallhack',
    description:
      'Kup Marathon Cheats od 40 $/mies. na Steam Windows. Zewnętrzne ESP, aimbot, wallhack, loot ESP, pobranie loadera, wsparcie Discord i aktualizacje po patchach.',
  },
  it: {
    title: 'Marathon Cheats da 40 $/mese | ESP, aimbot e wallhack',
    description:
      'Acquista Marathon Cheats da 40 $/mese su Steam Windows. ESP esterno, aimbot, wallhack, loot ESP, download loader, supporto Discord e aggiornamenti post-patch.',
  },
  nl: {
    title: 'Marathon Cheats vanaf $40/mnd | ESP, aimbot & wallhack',
    description:
      'Koop Marathon Cheats vanaf $40/mnd op Steam Windows. Externe ESP, aimbot, wallhack, loot ESP, loader-download, Discord-support en updates na patches.',
  },
  'zh-CN': {
    title: 'Marathon Cheats 每月40美元起 | ESP自瞄穿墙功能',
    description:
      '以每月40美元起购买 Marathon Cheats，适用于 Windows 版 Steam。提供外部 ESP、自瞄、穿墙、战利品透视、加载器下载、Discord 支持与补丁后更新。',
  },
  sv: {
    title: 'Marathon Cheats från 40 $/mån | ESP, aimbot & wallhack',
    description:
      'Köp Marathon Cheats från 40 $/månad på Steam Windows. Extern ESP, aimbot, wallhack, loot ESP, loader-nedladdning, Discord-support och uppdateringar efter patchar.',
  },
  ru: {
    title: 'Marathon Cheats от $40/мес | ESP, аимбот и wallhack',
    description:
      'Купите Marathon Cheats от $40/мес. для Steam на Windows. Внешний ESP, аимбот, wallhack, loot ESP, загрузка лоадера, поддержка в Discord и обновления после патчей.',
  },
  id: {
    title: 'Marathon Cheats mulai $40/bln | ESP, aimbot & wallhack',
    description:
      'Beli Marathon Cheats mulai $40/bulan di Steam Windows. ESP eksternal, aimbot, wallhack, loot ESP, unduhan loader, dukungan Discord, dan pembaruan pasca-patch.',
  },
};

const blog: Record<SeoLocaleCode, SeoMeta> = {
  en: {
    title: 'Marathon Cheat Guides: ESP, Aimbot, HWID & Setup Tips',
    description:
      'Learn how Marathon cheats work: ESP and aimbot setup, system requirements, BattlEye anti-cheat risks, performance impact, and post-patch loader status for PC.',
  },
  de: {
    title: 'Marathon Cheat Guides: ESP, Aimbot, HWID & Setup-Tipps',
    description:
      'Erfahren Sie, wie Marathon Cheats funktionieren: ESP- und Aimbot-Setup, Systemanforderungen, BattlEye-Risiken, Performance und Loader-Status nach Patches auf Steam.',
  },
  fr: {
    title: 'Guides Marathon Cheats : ESP, aimbot, HWID et config',
    description:
      'Découvrez le fonctionnement des cheats Marathon : configuration ESP et aimbot, configuration requise, risques BattlEye, impact performance et statut du loader.',
  },
  es: {
    title: 'Guías Marathon Cheats: ESP, aimbot, HWID y configuración',
    description:
      'Aprende cómo funcionan los cheats de Marathon: ESP y aimbot, requisitos del sistema, riesgos de BattlEye, rendimiento y estado del loader tras parches.',
  },
  pt: {
    title: 'Guias Marathon Cheats: ESP, aimbot, HWID e configuração',
    description:
      'Saiba como os cheats de Marathon funcionam: setup de ESP e aimbot, requisitos de sistema, riscos do BattlEye, desempenho e status do loader após atualizações.',
  },
  ja: {
    title: 'Marathonチートガイド：ESP・エイムボット・HWID設定',
    description:
      'Marathonチートの仕組みを解説。ESPとエイムボットの設定、システム要件、BattlEyeのリスク、パフォーマンスへの影響、パッチ後のローダー状況を紹介します。',
  },
  ko: {
    title: 'Marathon 치트 가이드: ESP, 에임봇, HWID 및 설정',
    description:
      'Marathon 치트 작동 방식을 알아보세요. ESP와 에임봇 설정, 시스템 요구 사항, BattlEye 리스크, 성능 영향, 패치 후 로더 상태를 설명합니다.',
  },
  tr: {
    title: 'Marathon hile rehberleri: ESP, aimbot, HWID ve kurulum',
    description:
      'Marathon hilelerinin nasıl çalıştığını öğrenin: ESP ve aimbot kurulumu, sistem gereksinimleri, BattlEye riskleri, performans etkisi ve yama sonrası loader durumu.',
  },
  pl: {
    title: 'Poradniki Marathon Cheats: ESP, aimbot, HWID i setup',
    description:
      'Dowiedz się, jak działają cheaty Marathon: konfiguracja ESP i aimbot, wymagania systemowe, ryzyka BattlEye, wpływ na wydajność i status loadera po patchach.',
  },
  it: {
    title: 'Guide Marathon Cheats: ESP, aimbot, HWID e configurazione',
    description:
      'Scopri come funzionano i cheat Marathon: setup ESP e aimbot, requisiti di sistema, rischi BattlEye, impatto sulle prestazioni e stato del loader dopo le patch.',
  },
  nl: {
    title: 'Marathon cheat-gidsen: ESP, aimbot, HWID en setup',
    description:
      'Leer hoe Marathon cheats werken: ESP- en aimbot-setup, systeemvereisten, BattlEye-risico\'s, prestatie-impact en loaderstatus na patches op PC.',
  },
  'zh-CN': {
    title: 'Marathon 外挂指南：ESP、自瞄、HWID 与安装技巧',
    description:
      '了解 Marathon 外挂的工作原理：ESP 与自瞄设置、系统要求、BattlEye 反作弊风险、性能影响，以及补丁后加载器状态与 PC 端使用建议。',
  },
  sv: {
    title: 'Marathon cheat-guider: ESP, aimbot, HWID och setup',
    description:
      'Lär dig hur Marathon-cheats fungerar: ESP- och aimbot-setup, systemkrav, BattlEye-risker, prestandapåverkan och loaderstatus efter patchar på PC.',
  },
  ru: {
    title: 'Гайды Marathon Cheats: ESP, аимбот, HWID и настройка',
    description:
      'Узнайте, как работают читы Marathon: настройка ESP и аимбота, системные требования, риски BattlEye, влияние на FPS и статус лоадера после патчей.',
  },
  id: {
    title: 'Panduan Marathon Cheats: ESP, aimbot, HWID & setup',
    description:
      'Pelajari cara kerja cheat Marathon: pengaturan ESP dan aimbot, persyaratan sistem, risiko BattlEye, dampak performa, dan status loader setelah patch di PC.',
  },
};

const terms: Record<SeoLocaleCode, SeoMeta> = {
  en: {
    title: 'Marathon Cheats Terms of Service | Subscription Rules',
    description:
      'Read marathoncheats.cc terms of service for Marathon cheat subscriptions, eligibility rules, liability limits, account policies, and how to contact support.',
  },
  de: {
    title: 'Marathon Cheats AGB | Abo-Regeln und Nutzungsbedingungen',
    description:
      'Lesen Sie die Nutzungsbedingungen von marathoncheats.cc für Marathon-Cheat-Abos, Berechtigungsregeln, Haftungsbeschränkungen, Kontorichtlinien und Support-Kontakt.',
  },
  fr: {
    title: 'Marathon Cheats CGU | Règles d\'abonnement et conditions',
    description:
      'Consultez les conditions d\'utilisation de marathoncheats.cc pour les abonnements Marathon Cheats, règles d\'éligibilité, responsabilité, comptes et contact support.',
  },
  es: {
    title: 'Marathon Cheats Términos de servicio | Reglas de suscripción',
    description:
      'Lee los términos de servicio de marathoncheats.cc para suscripciones de cheats Marathon, reglas de elegibilidad, responsabilidad, cuentas y contacto de soporte.',
  },
  pt: {
    title: 'Marathon Cheats Termos de serviço | Regras de assinatura',
    description:
      'Leia os termos de serviço do marathoncheats.cc para assinaturas de cheats Marathon, regras de elegibilidade, responsabilidade, contas e como contatar o suporte.',
  },
  ja: {
    title: 'Marathon Cheats 利用規約 | サブスクリプション規則',
    description:
      'marathoncheats.ccの利用規約をご確認ください。Marathonチートのサブスクリプション、利用資格、責任制限、アカウント方針、サポート連絡先を説明しています。',
  },
  ko: {
    title: 'Marathon Cheats 이용약관 | 구독 규정 안내',
    description:
      'marathoncheats.cc 이용약관을 확인하세요. Marathon 치트 구독, 자격 규정, 책임 제한, 계정 정책 및 지원 문의 방법을 안내합니다.',
  },
  tr: {
    title: 'Marathon Cheats Hizmet Şartları | Abonelik kuralları',
    description:
      'Marathon hile abonelikleri için marathoncheats.cc hizmet şartlarını okuyun. Uygunluk kuralları, sorumluluk sınırları, hesap politikaları ve destek iletişimi.',
  },
  pl: {
    title: 'Marathon Cheats Regulamin | Zasady subskrypcji',
    description:
      'Przeczytaj regulamin marathoncheats.cc dla subskrypcji cheatów Marathon: zasady kwalifikacji, ograniczenia odpowiedzialności, konta i kontakt z pomocą techniczną.',
  },
  it: {
    title: 'Marathon Cheats Termini di servizio | Regole abbonamento',
    description:
      'Leggi i termini di servizio di marathoncheats.cc per gli abbonamenti Marathon Cheats: idoneità, limiti di responsabilità, policy account e contatto supporto.',
  },
  nl: {
    title: 'Marathon Cheats Servicevoorwaarden | Abonnementsregels',
    description:
      'Lees de servicevoorwaarden van marathoncheats.cc voor Marathon cheat-abonnementen, geschiktheidsregels, aansprakelijkheid, accountbeleid en supportcontact.',
  },
  'zh-CN': {
    title: 'Marathon Cheats 服务条款 | 订阅规则说明',
    description:
      '阅读 marathoncheats.cc 服务条款，了解 Marathon 外挂订阅资格、责任限制、账户政策及支持联系方式等相关规则与说明。',
  },
  sv: {
    title: 'Marathon Cheats Användarvillkor | Prenumerationsregler',
    description:
      'Läs användarvillkoren på marathoncheats.cc för Marathon cheat-prenumerationer, behörighetsregler, ansvarsbegränsningar, kontopolicy och supportkontakt.',
  },
  ru: {
    title: 'Marathon Cheats Условия использования | Правила подписки',
    description:
      'Ознакомьтесь с условиями marathoncheats.cc для подписок Marathon Cheats: правила допуска, ограничение ответственности, политика аккаунтов и контакт поддержки.',
  },
  id: {
    title: 'Marathon Cheats Ketentuan Layanan | Aturan langganan',
    description:
      'Baca ketentuan layanan marathoncheats.cc untuk langganan cheat Marathon, aturan kelayakan, batas tanggung jawab, kebijakan akun, dan cara menghubungi dukungan.',
  },
};

const privacy: Record<SeoLocaleCode, SeoMeta> = {
  en: {
    title: 'Marathon Cheats Privacy Policy | Data & Analytics Use',
    description:
      'Read marathoncheats.cc privacy policy for what data we collect, how analytics and checkout partners are used, cookie practices, and how to contact us.',
  },
  de: {
    title: 'Marathon Cheats Datenschutz | Daten- und Analyse-Nutzung',
    description:
      'Lesen Sie die Datenschutzerklärung von marathoncheats.cc: welche Daten wir erfassen, wie Analyse- und Checkout-Partner genutzt werden, Cookies und Kontakt.',
  },
  fr: {
    title: 'Marathon Cheats Confidentialité | Données et analyses',
    description:
      'Consultez la politique de confidentialité de marathoncheats.cc : données collectées, partenaires analytiques et paiement, cookies et comment nous contacter.',
  },
  es: {
    title: 'Marathon Cheats Privacidad | Datos y uso de analíticas',
    description:
      'Lee la política de privacidad de marathoncheats.cc sobre qué datos recopilamos, uso de analíticas y checkout, cookies y cómo contactarnos.',
  },
  pt: {
    title: 'Marathon Cheats Privacidade | Dados e uso de analytics',
    description:
      'Leia a política de privacidade do marathoncheats.cc sobre dados coletados, parceiros de analytics e checkout, cookies e como entrar em contato conosco.',
  },
  ja: {
    title: 'Marathon Cheats プライバシーポリシー | データと分析',
    description:
      'marathoncheats.ccのプライバシーポリシーをご確認ください。収集データ、分析・決済パートナーの利用、Cookieの取り扱い、お問い合わせ方法を説明します。',
  },
  ko: {
    title: 'Marathon Cheats 개인정보 처리방침 | 데이터 및 분석',
    description:
      'marathoncheats.cc 개인정보 처리방침을 확인하세요. 수집 데이터, 분석 및 결제 파트너 이용, 쿠키 정책, 문의 방법을 안내합니다.',
  },
  tr: {
    title: 'Marathon Cheats Gizlilik Politikası | Veri ve analiz',
    description:
      'marathoncheats.cc gizlilik politikasını okuyun: toplanan veriler, analiz ve ödeme ortakları, çerez uygulamaları ve bizimle iletişim yolları.',
  },
  pl: {
    title: 'Marathon Cheats Polityka prywatności | Dane i analityka',
    description:
      'Przeczytaj politykę prywatności marathoncheats.cc: jakie dane zbieramy, partnerzy analityczni i płatności, pliki cookie i kontakt z nami.',
  },
  it: {
    title: 'Marathon Cheats Privacy Policy | Dati e analisi',
    description:
      'Leggi l\'informativa privacy di marathoncheats.cc su dati raccolti, partner analytics e checkout, cookie e come contattarci per richieste privacy.',
  },
  nl: {
    title: 'Marathon Cheats Privacybeleid | Gegevens en analytics',
    description:
      'Lees het privacybeleid van marathoncheats.cc over verzamelde gegevens, analytics- en checkoutpartners, cookies en hoe je contact met ons opneemt.',
  },
  'zh-CN': {
    title: 'Marathon Cheats 隐私政策 | 数据与分析使用说明',
    description:
      '阅读 marathoncheats.cc 隐私政策，了解我们收集的数据、分析与结账合作伙伴的使用方式、Cookie 实践以及联系方式。',
  },
  sv: {
    title: 'Marathon Cheats Integritetspolicy | Data och analys',
    description:
      'Läs integritetspolicyn på marathoncheats.cc om vilken data vi samlar in, hur analys- och checkout-partners används, cookies och hur du kontaktar oss.',
  },
  ru: {
    title: 'Marathon Cheats Политика конфиденциальности | Данные',
    description:
      'Ознакомьтесь с политикой конфиденциальности marathoncheats.cc: какие данные собираем, аналитика и платёжные партнёры, cookies и контакт с нами.',
  },
  id: {
    title: 'Marathon Cheats Kebijakan Privasi | Data & analitik',
    description:
      'Baca kebijakan privasi marathoncheats.cc tentang data yang dikumpulkan, penggunaan analitik dan mitra checkout, cookie, dan cara menghubungi kami.',
  },
};

const refund: Record<SeoLocaleCode, SeoMeta> = {
  en: {
    title: 'Marathon Cheats Refund Policy | Subscriptions & Support',
    description:
      'Read Marathon Cheats refund policy for subscriptions sold through marathoncheats.cc, including eligibility windows, chargeback rules, and support contact steps.',
  },
  de: {
    title: 'Marathon Cheats Rückerstattung | Abos und Support-Hilfe',
    description:
      'Lesen Sie die Rückerstattungsrichtlinie für Marathon-Cheat-Abos über marathoncheats.cc: Fristen, Chargeback-Regeln und Schritte zur Support-Kontaktaufnahme.',
  },
  fr: {
    title: 'Marathon Cheats Remboursement | Abonnements et support',
    description:
      'Consultez la politique de remboursement Marathon Cheats pour les abonnements via marathoncheats.cc : délais, règles de rétrofacturation et contact support.',
  },
  es: {
    title: 'Marathon Cheats Reembolsos | Suscripciones y soporte',
    description:
      'Lee la política de reembolso de Marathon Cheats para suscripciones en marathoncheats.cc: plazos de elegibilidad, contracargos y pasos para contactar soporte.',
  },
  pt: {
    title: 'Marathon Cheats Reembolso | Assinaturas e suporte',
    description:
      'Leia a política de reembolso do Marathon Cheats para assinaturas via marathoncheats.cc: prazos de elegibilidade, estornos e como entrar em contato com o suporte.',
  },
  ja: {
    title: 'Marathon Cheats 返金ポリシー | サブスクとサポート',
    description:
      'marathoncheats.ccで販売されるMarathon Cheatsの返金ポリシーをご確認ください。対象期間、チャージバック規則、サポートへの連絡手順を説明します。',
  },
  ko: {
    title: 'Marathon Cheats 환불 정책 | 구독 및 지원 안내',
    description:
      'marathoncheats.cc를 통해 판매되는 Marathon Cheats 환불 정책을 확인하세요. 자격 기간, 차지백 규정, 지원 문의 절차를 안내합니다.',
  },
  tr: {
    title: 'Marathon Cheats İade Politikası | Abonelik ve destek',
    description:
      'marathoncheats.cc üzerinden satılan Marathon hile abonelikleri için iade politikasını okuyun: uygunluk süreleri, chargeback kuralları ve destek adımları.',
  },
  pl: {
    title: 'Marathon Cheats Zwroty | Subskrypcje i wsparcie',
    description:
      'Przeczytaj politykę zwrotów Marathon Cheats dla subskrypcji przez marathoncheats.cc: okna kwalifikacji, chargeback i kroki kontaktu z pomocą techniczną.',
  },
  it: {
    title: 'Marathon Cheats Rimborsi | Abbonamenti e supporto',
    description:
      'Leggi la policy rimborsi Marathon Cheats per abbonamenti su marathoncheats.cc: finestre di idoneità, chargeback e passaggi per contattare il supporto.',
  },
  nl: {
    title: 'Marathon Cheats Restitutiebeleid | Abonnementen & support',
    description:
      'Lees het restitutiebeleid van Marathon Cheats voor abonnementen via marathoncheats.cc: termijnen, chargeback-regels en stappen om support te contacteren.',
  },
  'zh-CN': {
    title: 'Marathon Cheats 退款政策 | 订阅与支持说明',
    description:
      '阅读 Marathon Cheats 退款政策，了解通过 marathoncheats.cc 销售的订阅退款资格期限、拒付规则及联系支持的步骤。',
  },
  sv: {
    title: 'Marathon Cheats Återbetalning | Prenumerationer & support',
    description:
      'Läs återbetalningspolicyn för Marathon Cheats-prenumerationer via marathoncheats.cc: tidsfönster, chargeback-regler och steg för att kontakta support.',
  },
  ru: {
    title: 'Marathon Cheats Возврат средств | Подписки и поддержка',
    description:
      'Ознакомьтесь с политикой возврата Marathon Cheats для подписок через marathoncheats.cc: сроки, правила chargeback и шаги для связи с поддержкой.',
  },
  id: {
    title: 'Marathon Cheats Kebijakan Refund | Langganan & dukungan',
    description:
      'Baca kebijakan refund Marathon Cheats untuk langganan via marathoncheats.cc: jendela kelayakan, aturan chargeback, dan langkah menghubungi dukungan.',
  },
};

const notFound: Record<SeoLocaleCode, SeoMeta> = {
  en: {
    title: 'Page Not Found on Marathon Cheats | 404 Error & Help',
    description:
      'Sorry, this Marathon Cheats page could not be found. Return to the homepage or read ESP, aimbot, and HWID spoofer guides in our Marathon cheat blog.',
  },
  de: {
    title: 'Seite nicht gefunden | Marathon Cheats 404-Hilfe',
    description:
      'Diese Marathon Cheats Seite wurde nicht gefunden. Zur Startseite zurück oder ESP-, Aimbot- und HWID-Guides im Marathon-Cheat-Blog lesen.',
  },
  fr: {
    title: 'Page introuvable | Erreur 404 Marathon Cheats',
    description:
      'Cette page Marathon Cheats est introuvable. Retournez à l\'accueil ou consultez nos guides ESP, aimbot et HWID sur le blog Marathon Cheats.',
  },
  es: {
    title: 'Página no encontrada | Error 404 Marathon Cheats',
    description:
      'No se encontró esta página de Marathon Cheats. Vuelve al inicio o lee guías de ESP, aimbot y HWID en nuestro blog de cheats Marathon.',
  },
  pt: {
    title: 'Página não encontrada | Erro 404 Marathon Cheats',
    description:
      'Esta página do Marathon Cheats não foi encontrada. Volte à página inicial ou leia guias de ESP, aimbot e HWID no nosso blog de cheats Marathon.',
  },
  ja: {
    title: 'ページが見つかりません | Marathon Cheats 404',
    description:
      'お探しのMarathon Cheatsページは見つかりませんでした。ホームに戻るか、ESP・エイムボット・HWIDガイドをMarathonチートブログでご覧ください。',
  },
  ko: {
    title: '페이지를 찾을 수 없음 | Marathon Cheats 404',
    description:
      '요청하신 Marathon Cheats 페이지를 찾을 수 없습니다. 홈으로 돌아가거나 블로그에서 ESP, 에임봇, HWID 가이드를 확인하세요.',
  },
  tr: {
    title: 'Sayfa bulunamadı | Marathon Cheats 404 yardım sayfası',
    description:
      'Bu Marathon Cheats sayfası bulunamadı. Ana sayfaya dönün veya blogumuzda ESP, aimbot ve HWID spoof rehberlerini okuyarak yardım alın.',
  },
  pl: {
    title: 'Nie znaleziono strony | Błąd 404 Marathon Cheats',
    description:
      'Nie znaleziono tej strony Marathon Cheats. Wróć na stronę główną lub przeczytaj poradniki ESP, aimbot i HWID na naszym blogu o cheatach.',
  },
  it: {
    title: 'Pagina non trovata | Errore 404 Marathon Cheats',
    description:
      'Questa pagina Marathon Cheats non è stata trovata. Torna alla home o leggi le guide ESP, aimbot e HWID nel nostro blog sui cheat Marathon.',
  },
  nl: {
    title: 'Pagina niet gevonden | Marathon Cheats 404-fout',
    description:
      'Deze Marathon Cheats-pagina is niet gevonden. Ga terug naar de homepage of lees ESP-, aimbot- en HWID-gidsen op onze Marathon cheat-blog.',
  },
  'zh-CN': {
    title: '页面未找到 | Marathon Cheats 404 错误帮助',
    description:
      '找不到此 Marathon Cheats 页面。返回首页，或在我们的 Marathon 外挂博客中阅读 ESP、自瞄与 HWID 指南。',
  },
  sv: {
    title: 'Sidan hittades inte | Marathon Cheats 404-fel',
    description:
      'Den här Marathon Cheats-sidan kunde inte hittas. Gå till startsidan eller läs ESP-, aimbot- och HWID-guider i vår Marathon cheat-blogg.',
  },
  ru: {
    title: 'Страница не найдена | Ошибка 404 Marathon Cheats',
    description:
      'Страница Marathon Cheats не найдена. Вернитесь на главную или читайте гайды по ESP, аимботу и HWID в нашем блоге о читах Marathon.',
  },
  id: {
    title: 'Halaman tidak ditemukan | Error 404 Marathon Cheats',
    description:
      'Halaman Marathon Cheats ini tidak ditemukan. Kembali ke beranda atau baca panduan ESP, aimbot, dan HWID di blog cheat Marathon kami.',
  },
};

export const LOCALIZED_ROUTE_SEO: Record<RouteSeoKey, Record<SeoLocaleCode, SeoMeta>> = {
  store,
  blog,
  terms,
  privacy,
  refund,
  notFound,
};

export function getRouteSeo(key: RouteSeoKey, locale: SeoLocaleCode): SeoMeta {
  return LOCALIZED_ROUTE_SEO[key][locale] ?? LOCALIZED_ROUTE_SEO[key].en;
}
