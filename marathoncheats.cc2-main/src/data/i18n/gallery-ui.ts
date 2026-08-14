import type { LocaleCode } from './locales';

export type GalleryUi = {
	eyebrow: string;
	title: string;
	subtitle: string;
	lead: string;
	highlights: { title: string; copy: string }[];
	updatesLabel: string;
	updatesShort: string;
};

export const galleryUi: Record<LocaleCode, GalleryUi> = {
	en: {
		eyebrow: 'marathon cheats',
		title: 'marathon cheats gallery',
		subtitle: 'Simple marathon cheats visuals — ESP, wallhack, aimbot, and radar for Bungie Marathon on PC.',
		lead: 'Marathon Cheats helps you spot runners, hostiles, loot, and extracts with ESP, aimbot, and radar in one license.',
		highlights: [
			{ title: 'marathon cheats esp', copy: 'See players through walls with marathon cheats esp and wallhack overlays.' },
			{ title: 'marathon cheats radar', copy: 'Track nearby threats with marathon cheats radar before you push or extract.' },
			{ title: 'marathon cheats aimbot', copy: 'Use soft aim and aimbot controls tuned for Marathon raids on Windows PC.' },
		],
		updatesLabel: 'marathon cheats updates',
		updatesShort: 'Updates',
	},
	es: {
		eyebrow: 'Marathon Cheats',
		title: 'Galería Bungie Marathon',
		subtitle: 'Visuales de Bungie Marathon con loadouts, peleas de escuadrón y combate battle royale — junto a herramientas ESP, radar y Aimbot.',
		lead: 'Marathon Cheats está pensado para el loop BR de Bungie Marathon: leer el mapa, rastrear escuadrones enemigos, lootear y sobrevivir al extract.',
		highlights: [
			{ title: 'ESP de players y escuadrones', copy: 'Detecta players enemigos y contornos de escuadrón en Verdansk y loot-run para elegir peleas con mejor información.' },
			{ title: 'Marcadores de loot y cofres', copy: 'Resalta loadouts, cofres y loot de alto nivel sin saturar la pantalla en plena partida.' },
			{ title: 'Controles Aimbot Bungie Marathon', copy: 'Ajusta suavidad, prioridad de objetivo y teclas para AR, SMG y francotirador antes de comprar.' },
		],
		updatesLabel: 'Actualizaciones Marathon Cheats',
		updatesShort: 'Updates',
	},
	fr: {
		eyebrow: 'Marathon Cheats',
		title: 'Galerie Bungie Marathon',
		subtitle: 'Visuels Bungie Marathon — loadouts, combats d\'escouade et battle royale — avec ESP, radar et Aimbot.',
		lead: 'Marathon Cheats suit la boucle BR de Bungie Marathon : lire la carte, suivre les escouades, loot et survivre au extract.',
		highlights: [
			{ title: 'ESP players & escouades', copy: 'Repérez les players ennemis sur Verdansk et loot-run pour choisir vos engagements.' },
			{ title: 'Marqueurs loot & coffres', copy: 'Mettez en évidence loadouts, coffres et loot haut niveau sans encombrer l\'écran.' },
			{ title: 'Réglages Aimbot Bungie Marathon', copy: 'Ajustez fluidité, priorité cible et raccourcis pour AR, SMG et sniper.' },
		],
		updatesLabel: 'Mises à jour Marathon Cheats',
		updatesShort: 'Updates',
	},
	de: {
		eyebrow: 'Marathon Cheats',
		title: 'Bungie Marathon Galerie',
		subtitle: 'Bungie Marathon-Bilder zu Loadouts, Squad-Kämpfen und raid — mit ESP, Radar und Aimbot.',
		lead: 'Marathon Cheats passt zur BR-Schleife von Bungie Marathon: Karte lesen, Gegner-Trupps tracken, looten und Reboot van überleben.',
		highlights: [
			{ title: 'Player- & Squad-ESP', copy: 'Erkenne feindliche Playeren auf Verdansk und loot-run für bessere Rotationsentscheidungen.' },
			{ title: 'Loot- & Vertragsmarker', copy: 'Hebe Loadout-Drops, Verträge und High-Tier-Loot hervor ohne Screen-Spam.' },
			{ title: 'Bungie Marathon Aimbot Steuerung', copy: 'Feinjustiere Glätte, Zielpriorität und Hotkeys für AR, SMG und Sniper.' },
		],
		updatesLabel: 'Marathon Cheats Updates',
		updatesShort: 'Updates',
	},
	pt: {
		eyebrow: 'Marathon Cheats',
		title: 'Galeria Bungie Marathon',
		subtitle: 'Visuais de Bungie Marathon com loadouts, combates de esquadrão e battle royale — com ESP, radar e Aimbot.',
		lead: 'Marathon Cheats segue o loop BR do Bungie Marathon: ler o mapa, rastrear esquadrões, lootar e sobreviver ao extract.',
		highlights: [
			{ title: 'ESP de players e esquadrões', copy: 'Detecte players inimigos em Verdansk e loot-run para escolher lutas com melhor intel.' },
			{ title: 'Marcadores de loot e cofres', copy: 'Destaque loadouts, cofres e loot de alto nível sem poluir a tela.' },
			{ title: 'Controles Aimbot Bungie Marathon', copy: 'Ajuste suavidade, prioridade de alvo e atalhos para AR, SMG e sniper.' },
		],
		updatesLabel: 'Atualizações Marathon Cheats',
		updatesShort: 'Updates',
	},
	it: {
		eyebrow: 'Marathon Cheats',
		title: 'Galleria Bungie Marathon',
		subtitle: 'Immagini Bungie Marathon — loadout, scontri di squadra e battle royale — con ESP, radar e Aimbot.',
		lead: 'Marathon Cheats è pensato per il loop BR di Bungie Marathon: leggere la mappa, tracciare squadre nemiche, loot e sopravvivere al extract.',
		highlights: [
			{ title: 'ESP playeri e squadre', copy: 'Individua playeri nemici su Verdansk e loot-run per scegliere i fight con più intel.' },
			{ title: 'Marker loot e coffreti', copy: 'Evidenzia loadout, coffreti e loot di alto livello senza riempire lo schermo.' },
			{ title: 'Controlli Aimbot Bungie Marathon', copy: 'Regola smoothness, priorità bersaglio e hotkey per AR, SMG e sniper.' },
		],
		updatesLabel: 'Aggiornamenti Marathon Cheats',
		updatesShort: 'Updates',
	},
	nl: {
		eyebrow: 'Marathon Cheats',
		title: 'Bungie Marathon galerij',
		subtitle: 'Bungie Marathon-beelden van loadouts, squadgevechten en battle royale — met ESP, radar en Aimbot.',
		lead: 'Marathon Cheats volgt de BR-loop van Bungie Marathon: kaart lezen, vijandelijke squads volgen, looten en de extract overleven.',
		highlights: [
			{ title: 'Player- & squad-ESP', copy: 'Spot vijandelijke players op Verdansk en loot-run voor betere rotatiebeslissingen.' },
			{ title: 'Loot- & chestmarkers', copy: 'Markeer loadout-drops, chesten en high-tier loot zonder schermoverlast.' },
			{ title: 'Bungie Marathon Aimbot instellingen', copy: 'Stel smoothness, doelprioriteit en hotkeys af voor AR, SMG en sniper.' },
		],
		updatesLabel: 'Marathon Cheats updates',
		updatesShort: 'Updates',
	},
	pl: {
		eyebrow: 'Marathon Cheats',
		title: 'Galeria Bungie Marathon',
		subtitle: 'Grafiki Bungie Marathon — loadouty, walki drużynowe i battle royale — z ESP, radar i Aimbot.',
		lead: 'Marathon Cheats pasuje do pętli BR Bungie Marathon: czytaj mapę, śledź wrogie drużyny, lootuj i przeżyj extract.',
		highlights: [
			{ title: 'ESP players i drużyn', copy: 'Wykrywaj wrogich players na Verdansk i loot-run dla lepszych decyzji rotacyjnych.' },
			{ title: 'Markery lootu i skrzyń', copy: 'Podświetlaj loadouty, petity i wysokiej klasy loot bez zaśmiecania ekranu.' },
			{ title: 'Sterowanie Aimbot Bungie Marathon', copy: 'Dostosuj płynność, priorytet celu i skróty dla AR, SMG i snajperki.' },
		],
		updatesLabel: 'Aktualizacje Marathon Cheats',
		updatesShort: 'Updates',
	},
	ru: {
		eyebrow: 'Marathon Cheats',
		title: 'Галерея Bungie Marathon',
		subtitle: 'Визуалы Bungie Marathon — лоадауты, бои отрядов и battle royale — с ESP, радаром и Aimbot.',
		lead: 'Marathon Cheats создан для BR-цикла Bungie Marathon: читать карту, отслеживать вражеские отряды, лут и выживать в extract.',
		highlights: [
			{ title: 'ESP игроков и отрядов', copy: 'Замечайте вражеских игроков на Verdansk и loot-run для лучших решений по ротации.' },
			{ title: 'Маркеры лута и сундуков', copy: 'Подсвечивайте loadout, сундуки и высокий лут без перегрузки экрана.' },
			{ title: 'Настройки Aimbot Bungie Marathon', copy: 'Настройте плавность, приоритет цели и горячие клавиши для AR, SMG и снайперки.' },
		],
		updatesLabel: 'Обновления Marathon Cheats',
		updatesShort: 'Updates',
	},
	tr: {
		eyebrow: 'Marathon Cheats',
		title: 'Bungie Marathon galerisi',
		subtitle: 'Loadout, takım savaşları ve battle royale görselleri — ESP, radar ve Aimbot ile.',
		lead: 'Marathon Cheats, Bungie Marathon BR döngüsü için: haritayı oku, düşman takımları izle, loot al ve extract\'da hayatta kal.',
		highlights: [
			{ title: 'Player ve takım ESP', copy: 'Verdansk ve loot-run\'da düşman playerleri görerek daha iyi rotasyon kararları alın.' },
			{ title: 'Loot ve kontrat işaretleri', copy: 'Loadout, kontrat ve üst seviye loot\'u ekranı doldurmadan vurgulayın.' },
			{ title: 'Bungie Marathon Aimbot kontrolleri', copy: 'AR, SMG ve sniper için yumuşaklık, hedef önceliği ve kısayolları ayarlayın.' },
		],
		updatesLabel: 'Marathon Cheats güncellemeleri',
		updatesShort: 'Updates',
	},
	ar: {
		eyebrow: 'Marathon Cheats',
		title: 'معرض Bungie Marathon',
		subtitle: 'صور Bungie Marathon — loadouts ومعارك الفرق وbattle royale — مع ESP ورادار وAimbot.',
		lead: 'Marathon Cheats مبني لحلقة BR في Bungie Marathon: قراءة الخريطة، تتبع الفرق، جمع اللوت والنجاة في extract.',
		highlights: [
			{ title: 'ESP للمشغلين والفرق', copy: 'اكتشف players المعادين على Verdansk وloot-run لاختيار القتالات بذكاء.' },
			{ title: 'علامات اللوت والصناديق', copy: 'أبرز loadouts والصناديق واللوت العالي دون ازدحام الشاشة.' },
			{ title: 'تحكم Aimbot Bungie Marathon', copy: 'اضبط النعومة وأولوية الهدف والاختصارات للـ AR وSMG والقناص.' },
		],
		updatesLabel: 'تحديثات Marathon Cheats',
		updatesShort: 'Updates',
	},
	ja: {
		eyebrow: 'Marathon Cheats',
		title: 'Bungie Marathon ギャラリー',
		subtitle: 'ロードアウト、スクワッド戦、BRコンバットのBungie Marathonビジュアル — ESP、レーダー、エイムボット付き。',
		lead: 'Marathon CheatsはBungie MarathonのBRループ向け：マップを読み、敵スクワッドを追跡し、ルートしてextractを生き延びる。',
		highlights: [
			{ title: 'players＆スクワッドESP', copy: 'Verdanskとloot-runで敵playersを把握し、ローテ判断を改善。' },
			{ title: 'ルート＆チェストマーカー', copy: 'ロードアウト、チェスト、高ティアルートを画面を埋めずに表示。' },
			{ title: 'Bungie Marathonエイムボット設定', copy: 'AR、SMG、スナイパー向けにスムーズさ、ターゲット優先度、ホットキーを調整。' },
		],
		updatesLabel: 'Marathon Cheats更新',
		updatesShort: 'Updates',
	},
	ko: {
		eyebrow: 'Marathon Cheats',
		title: 'Bungie Marathon 갤러리',
		subtitle: '로드아웃, 스쿼드 전투, BR 컴뱃 Bungie Marathon 비주얼 — ESP, 레이더, 에임봇 포함.',
		lead: 'Marathon Cheats는 Bungie Marathon BR 루프용: 맵 읽기, 적 스쿼드 추적, 루트 수집, extract 생존.',
		highlights: [
			{ title: 'players & 스쿼드 ESP', copy: 'Verdansk와 loot-run에서 적 players를 파악해 로테이션 결정을 개선.' },
			{ title: '루트 & 상자 마커', copy: '로드아웃, 상자, 고티어 루트를 화면을 가리지 않고 강조.' },
			{ title: 'Bungie Marathon 에임봇 컨트롤', copy: 'AR, SMG, 스나이퍼용 부드러움, 타겟 우선순위, 단축키 조정.' },
		],
		updatesLabel: 'Marathon Cheats 업데이트',
		updatesShort: 'Updates',
	},
	zh: {
		eyebrow: 'Marathon Cheats',
		title: 'Bungie Marathon 图库',
		subtitle: 'Bungie Marathon 视觉 — 配装、小队战斗和大逃杀 — 配合 ESP、雷达和自瞄。',
		lead: 'Marathon Cheats 为 Bungie Marathon BR 循环设计：读图、追踪敌方小队、搜刮并在 extract 存活。',
		highlights: [
			{ title: 'players与小队 ESP', copy: '在 Verdansk 和 loot-run 发现敌方players，做出更好的转点决策。' },
			{ title: '物资与宝箱标记', copy: '高亮配装、宝箱和高级物资，不遮挡屏幕。' },
			{ title: 'Bungie Marathon 自瞄控制', copy: '调整 AR、SMG 和狙击的平滑度、目标优先级和热键。' },
		],
		updatesLabel: 'Marathon Cheats 更新',
		updatesShort: 'Updates',
	},
	hi: {
		eyebrow: 'Marathon Cheats',
		title: 'Bungie Marathon गैलरी',
		subtitle: 'Loadout, squad fights और battle royale visuals — ESP, radar और Aimbot के साथ।',
		lead: 'Marathon Cheats Bungie Marathon BR loop के लिए: map पढ़ें, enemy squads track करें, loot करें और extract survive करें।',
		highlights: [
			{ title: 'Player & Squad ESP', copy: 'Verdansk और loot-run पर enemy players spot करें बेहतर rotation decisions के लिए।' },
			{ title: 'Loot & Chest Markers', copy: 'Loadout drops, chests और high-tier loot highlight करें screen clutter के बिना।' },
			{ title: 'Bungie Marathon Aimbot Controls', copy: 'AR, SMG और sniper के लिए smoothness, target priority और hotkeys tune करें।' },
		],
		updatesLabel: 'Marathon Cheats updates',
		updatesShort: 'Updates',
	},
	id: {
		eyebrow: 'Marathon Cheats',
		title: 'Galeri Bungie Marathon',
		subtitle: 'Visual Bungie Marathon — loadout, pertempuran squad, dan battle royale — dengan ESP, radar, dan Aimbot.',
		lead: 'Marathon Cheats untuk loop BR Bungie Marathon: baca peta, lacak squad musuh, loot, dan selamat di extract.',
		highlights: [
			{ title: 'ESP player & squad', copy: 'Deteksi player musuh di Verdansk dan loot-run untuk keputusan rotasi lebih baik.' },
			{ title: 'Marker loot & peti', copy: 'Sorot loadout, peti, dan loot tier tinggi tanpa membanjiri layar.' },
			{ title: 'Kontrol Aimbot Bungie Marathon', copy: 'Atur smoothness, prioritas target, dan hotkey untuk AR, SMG, dan sniper.' },
		],
		updatesLabel: 'Update Marathon Cheats',
		updatesShort: 'Updates',
	},
	th: {
		eyebrow: 'Marathon Cheats',
		title: 'แกลเลอรี Bungie Marathon',
		subtitle: 'ภาพ Bungie Marathon — loadout การต่อสู้ทีม และ battle royale — พร้อม ESP เรดาร์และ Aimbot',
		lead: 'Marathon Cheats สำหรับลูป BR ของ Bungie Marathon: อ่านแผนที่ ติดตามทีมศัตรู เก็บ loot และรอด extract',
		highlights: [
			{ title: 'ESP ผู้เล่นและทีม', copy: 'มองเห็นศัตรูบน Verdansk และ loot-run เพื่อตัดสินใจหมุนเวียนได้ดีขึ้น' },
			{ title: 'มาร์กเกอร์ loot และหีบ', copy: 'เน้น loadout หีบและ loot ระดับสูงโดยไม่รกหน้าจอ' },
			{ title: 'ควบคุม Aimbot Bungie Marathon', copy: 'ปรับความนุ่ม ลำดับเป้าหมาย และ hotkey สำหรับ AR SMG และ sniper' },
		],
		updatesLabel: 'อัปเดต Marathon Cheats',
		updatesShort: 'Updates',
	},
	vi: {
		eyebrow: 'Marathon Cheats',
		title: 'Thư viện Bungie Marathon',
		subtitle: 'Hình ảnh Bungie Marathon — loadout, chiến đấu squad và battle royale — với ESP, radar và Aimbot.',
		lead: 'Marathon Cheats cho vòng BR Bungie Marathon: đọc bản đồ, theo dõi squad địch, loot và sống sót extract.',
		highlights: [
			{ title: 'ESP player & squad', copy: 'Phát hiện player địch trên Verdansk và loot-run để quyết định rotate tốt hơn.' },
			{ title: 'Đánh dấu loot & rương', copy: 'Làm nổi bật loadout, rương và loot cao cấp mà không che màn hình.' },
			{ title: 'Điều khiển Aimbot Bungie Marathon', copy: 'Tinh chỉnh độ mượt, ưu tiên mục tiêu và phím tắt cho AR, SMG và sniper.' },
		],
		updatesLabel: 'Cập nhật Marathon Cheats',
		updatesShort: 'Updates',
	},
	uk: {
		eyebrow: 'Marathon Cheats',
		title: 'Галерея Bungie Marathon',
		subtitle: 'Візуали Bungie Marathon — loadout, бої загонів і battle royale — з ESP, радаром і Aimbot.',
		lead: 'Marathon Cheats для BR-циклу Bungie Marathon: читати карту, відстежувати ворожі загони, лут і виживати в extract.',
		highlights: [
			{ title: 'ESP гравців і загонів', copy: 'Помічайте ворожих гравців на Verdansk і loot-run для кращих ротацій.' },
			{ title: 'Маркери луту й скринь', copy: 'Підсвічуйте loadout, контракти та високий лут без перевантаження екрана.' },
			{ title: 'Налаштування Aimbot Bungie Marathon', copy: 'Налаштуйте плавність, пріоритет цілі та гарячі клавіші для AR, SMG і снайперки.' },
		],
		updatesLabel: 'Оновлення Marathon Cheats',
		updatesShort: 'Updates',
	},
	cs: {
		eyebrow: 'Marathon Cheats',
		title: 'Galerie Bungie Marathon',
		subtitle: 'Bungie Marathon vizuály — loadouty, squad souboje a battle royale — s ESP, radarem a Aimbot.',
		lead: 'Marathon Cheats pro BR smyčku Bungie Marathon: číst mapu, sledovat nepřátelské squady, loot a přežít extract.',
		highlights: [
			{ title: 'ESP players a squadů', copy: 'Spozorujte nepřátelské operátory na Verdansk a loot-run pro lepší rotační rozhodnutí.' },
			{ title: 'Markery lootu a petitů', copy: 'Zvýrazněte loadouty, petity a high-tier loot bez přeplnění obrazovky.' },
			{ title: 'Ovládání Aimbot Bungie Marathon', copy: 'Nastavte smoothness, prioritu cíle a hotkeys pro AR, SMG a sniper.' },
		],
		updatesLabel: 'Aktualizace Marathon Cheats',
		updatesShort: 'Updates',
	},
	ro: {
		eyebrow: 'Marathon Cheats',
		title: 'Galerie Bungie Marathon',
		subtitle: 'Vizualuri Bungie Marathon — loadout, lupte de squad și battle royale — cu ESP, radar și Aimbot.',
		lead: 'Marathon Cheats pentru bucla BR Bungie Marathon: citește harta, urmărește squad-uri inamice, loot și supraviețuiește extract.',
		highlights: [
			{ title: 'ESP playeri și squad-uri', copy: 'Detectează playeri inamici pe Verdansk și loot-run pentru decizii de rotație mai bune.' },
			{ title: 'Markere loot și cheste', copy: 'Evidențiază loadout-uri, cheste și loot de nivel înalt fără a aglomera ecranul.' },
			{ title: 'Controale Aimbot Bungie Marathon', copy: 'Ajustează smoothness, prioritate țintă și hotkeys pentru AR, SMG și sniper.' },
		],
		updatesLabel: 'Actualizări Marathon Cheats',
		updatesShort: 'Updates',
	},
	sv: {
		eyebrow: 'Marathon Cheats',
		title: 'Bungie Marathon galleri',
		subtitle: 'Bungie Marathon-bilder — loadouts, squadstrider och battle royale — med ESP, radar och Aimbot.',
		lead: 'Marathon Cheats för Bungie Marathon:s BR-loop: läs kartan, spåra fiendesquads, loota och överlev extract.',
		highlights: [
			{ title: 'Player- & squad-ESP', copy: 'Spotta fiendeplayerer på Verdansk och loot-run för bättre rotationsbeslut.' },
			{ title: 'Loot- & petitsmarkörer', copy: 'Markera loadout-drops, petit och high-tier loot utan skärmklutter.' },
			{ title: 'Bungie Marathon Aimbot-kontroller', copy: 'Justera smoothness, målprioritet och snabbtangenter för AR, SMG och sniper.' },
		],
		updatesLabel: 'Marathon Cheats uppdateringar',
		updatesShort: 'Updates',
	},
};

export function getGalleryUi(locale: LocaleCode): GalleryUi {
	return galleryUi[locale];
}
