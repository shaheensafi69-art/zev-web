'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  Download,
  Globe,
  ArrowRight,
  ShieldCheck,
  Video,
  Users,
  Lock,
  Monitor,
  Heart,
  ChevronDown,
  CheckCircle2,
  Smartphone,
  Flame,
  Star,
  Layers,
  Database,
} from 'lucide-react';
import { getDictionary, isRtlLocale } from '@/dictionaries';
import { AppMockup } from '@/components/AppMockup';
import { EcosystemSection } from '@/components/EcosystemSection';
import { DownloadModal } from '@/components/DownloadModal';

const getShowcaseData = (locale: string) => {
  const dict: Record<string, {
    tag: string;
    heading: string;
    subheading: string;
    shots: { img: string; title: string; subtitle: string }[];
  }> = {
    fa: {
      tag: 'گالری محیط کاربری',
      heading: 'نگاهی به بخش‌های مختلف برنامه زِو',
      subheading: 'رابط کاربری مدرن با تم تاریک، فید استوری، ریلز ۶۰ فریم و دایرکت چت فوق‌سریع',
      shots: [
        { img: '/screenshots/55.jpeg', title: 'فید هوشمند و استوری‌ها', subtitle: 'پست‌ها، لایک و اشتراک لحظات' },
        { img: '/screenshots/57.jpeg', title: 'پخش ویدیو و ریلز ۶۰ فریم', subtitle: 'تماشای ویدیوهای ترند و فول اسکرین' },
        { img: '/screenshots/56.jpeg', title: 'اکسپلور و کشف افراد', subtitle: 'جستجوی اعضای فعال و هشتگ‌ها' },
        { img: '/screenshots/58.jpeg', title: 'پروفایل کاربری و بیو', subtitle: 'صفحه شخصی، آمار و مدیریت پست‌ها' },
        { img: '/screenshots/62.jpeg', title: 'دایرکت و چت خصوصی', subtitle: 'پیام‌رسانی امن و گفتگوی مستقیم' },
        { img: '/screenshots/59.jpeg', title: 'استودیو ایجاد محتوا', subtitle: 'انتشار سریع پست، ریلز و استوری' },
      ],
    },
    ps: {
      tag: 'د اپلیکیشن نندارتون',
      heading: 'د زِو اپلیکیشن بېلابېلو برخو ته کتنه',
      subheading: 'د عصري ډارک تم، سټوریز، ۶۰ فریم ریلز او چټک دایرکټ چټ سره ښکلې تجربه',
      shots: [
        { img: '/screenshots/55.jpeg', title: 'سمارټ فیډ او سټوریز', subtitle: 'پوسټونه، لایک او د شیبو شریکول' },
        { img: '/screenshots/57.jpeg', title: 'د ۶۰ فریم ریلز پلیر', subtitle: 'د ترند ویډیوګانو لوړ کیفیت کتنه' },
        { img: '/screenshots/56.jpeg', title: 'ایکسپلور او د خلکو لټون', subtitle: 'د فعالو غړو او ملګرو موندل' },
        { img: '/screenshots/58.jpeg', title: 'کارن پروفایل او بیو', subtitle: 'شخصي پاڼه او د پوسټونو مدیریت' },
        { img: '/screenshots/62.jpeg', title: 'شخصي چټ او پیغامونه', subtitle: 'خوندي او چټک مخامخ پیغامونه' },
        { img: '/screenshots/59.jpeg', title: 'د محتوا جوړولو سټوډیو', subtitle: 'د نوي پوسټ، ریل او سټوري خپرول' },
      ],
    },
    ar: {
      tag: 'معرض واجهة التطبيق',
      heading: 'استكشف وحدات تطبيق زِو (ZEV)',
      subheading: 'تصميم داكن عصري، قصص تفاعلية، مشغل ريلز 60 إطاراً ومحادثات مشفرة فورية',
      shots: [
        { img: '/screenshots/55.jpeg', title: 'الخلاصة والقصص الذكية', subtitle: 'مشاركة المنشورات واللحظات' },
        { img: '/screenshots/57.jpeg', title: 'مشغل الريلز 60 إطاراً', subtitle: 'فيديوهات عمودية فائقة السلاسة' },
        { img: '/screenshots/56.jpeg', title: 'الاستكشاف والبحث عن الأعضاء', subtitle: 'العثور على المبدعين النشطين' },
        { img: '/screenshots/58.jpeg', title: 'الملف الشخصي والنبذة', subtitle: 'صفحتك الشخصية وإحصائياتك' },
        { img: '/screenshots/62.jpeg', title: 'الرسائل والمحادثات المباشرة', subtitle: 'دردشة خاصة آمنة وفورية' },
        { img: '/screenshots/59.jpeg', title: 'استوديو إنشاء المحتوى', subtitle: 'نشر فوري للمنشور، الريلز والقصة' },
      ],
    },
    ur: {
      tag: 'ایپ انٹرفیس گیلری',
      heading: 'زِو (ZEV) کے تمام ماڈیولز کا جائزہ',
      subheading: 'جدید ڈارک موڈ، فل اسکرین اسٹوریز، 60 فریم ریلز اور تیز ترین ڈائریکٹ چیٹ',
      shots: [
        { img: '/screenshots/55.jpeg', title: 'اسمارٹ فیڈ اور اسٹوریز', subtitle: 'پوسٹس، لائکس اور لمحات کا اشتراک' },
        { img: '/screenshots/57.jpeg', title: '60 فریم ریلز ویڈیو پلیئر', subtitle: 'ٹرینڈنگ ویڈیوز کا شاندار تجربہ' },
        { img: '/screenshots/56.jpeg', title: 'ایکسپلور اور ممبرز کی تلاش', subtitle: 'نئے دوستوں اور تخلیق کاروں کو تلاش کریں' },
        { img: '/screenshots/58.jpeg', title: 'صارف پروفائل اور بائیو', subtitle: 'اپنی ذاتی پروفائل اور شماریات' },
        { img: '/screenshots/62.jpeg', title: 'ڈائریکٹ میسجز اور چیٹ', subtitle: 'محفوظ اور تیز رفتار ذاتی پیغامات' },
        { img: '/screenshots/59.jpeg', title: 'تخلیقی مواد اسٹوڈیو', subtitle: 'پوسٹ، ریلز اور اسٹوری باآسانی بنائیں' },
      ],
    },
    tr: {
      tag: 'Uygulama Görsel Galerisi',
      heading: 'ZEV Uygulama Modüllerini Keşfedin',
      subheading: 'Akıcı karanlık tema, tam ekran hikayeler, 60fps reels ve ultra hızlı direkt mesajlaşma',
      shots: [
        { img: '/screenshots/55.jpeg', title: 'Akıllı Akış ve Hikayeler', subtitle: 'Gönderiler, beğeniler ve anlar' },
        { img: '/screenshots/57.jpeg', title: '60fps Reels ve Video Oynatıcı', subtitle: 'Akıcı dikey video deneyimi' },
        { img: '/screenshots/56.jpeg', title: 'Keşfet ve Kişi Arama', subtitle: 'Aktif üyeleri ve trendleri bulun' },
        { img: '/screenshots/58.jpeg', title: 'Kullanıcı Profili ve Biyo', subtitle: 'Kişisel profil ve istatistikler' },
        { img: '/screenshots/62.jpeg', title: 'Direkt Mesajlar ve Sohbet', subtitle: 'Uçtan uca şifreli güvenli mesajlaşma' },
        { img: '/screenshots/59.jpeg', title: 'İçerik Üretim Stüdyosu', subtitle: 'Gönderi, reels ve hikaye oluşturun' },
      ],
    },
    de: {
      tag: 'App-Galerie',
      heading: 'Erleben Sie alle Module von ZEV',
      subheading: 'Modernes Dark-UI-Design, Vollbild-Storys, flüssige 60fps Reels und Echtzeit-Chat',
      shots: [
        { img: '/screenshots/55.jpeg', title: 'Smart Feed & Storys', subtitle: 'Beiträge, Likes und Momente teilen' },
        { img: '/screenshots/57.jpeg', title: '60fps Reels Video-Player', subtitle: 'Flüssiges vertikales Videoerlebnis' },
        { img: '/screenshots/56.jpeg', title: 'Entdecken & Personensuche', subtitle: 'Aktive Mitglieder und Trends finden' },
        { img: '/screenshots/58.jpeg', title: 'Benutzerprofil & Biografie', subtitle: 'Profilseite, Follower und Beiträge' },
        { img: '/screenshots/62.jpeg', title: 'Direktnachrichten & Privatchat', subtitle: 'Verschlüsselte Sofortnachrichten' },
        { img: '/screenshots/59.jpeg', title: 'Creator-Studio', subtitle: 'Beiträge, Reels und Storys erstellen' },
      ],
    },
    fr: {
      tag: 'Galerie de l’Application',
      heading: 'Découvrez tous les modules de ZEV',
      subheading: 'Interface sombre fluide, stories plein écran, reels à 60fps et messagerie instantanée',
      shots: [
        { img: '/screenshots/55.jpeg', title: 'Fil d’actualités & Stories', subtitle: 'Partage de publications et de moments' },
        { img: '/screenshots/57.jpeg', title: 'Lecteur Reels 60fps', subtitle: 'Vidéos verticales ultra-fluides' },
        { img: '/screenshots/56.jpeg', title: 'Explorer & Recherche de membres', subtitle: 'Découvrez les créateurs actifs' },
        { img: '/screenshots/58.jpeg', title: 'Profil utilisateur & Bio', subtitle: 'Votre espace et statistiques' },
        { img: '/screenshots/62.jpeg', title: 'Messages directs & Chat', subtitle: 'Messagerie instantanée sécurisée' },
        { img: '/screenshots/59.jpeg', title: 'Studio de Création', subtitle: 'Publiez posts, reels et stories' },
      ],
    },
    es: {
      tag: 'Galería de la Aplicación',
      heading: 'Explora todos los módulos de ZEV',
      subheading: 'Interfaz oscura moderna, historias en pantalla completa, reels a 60fps y chat en tiempo real',
      shots: [
        { img: '/screenshots/55.jpeg', title: 'Feed inteligente y Stories', subtitle: 'Publicaciones y momentos compartidos' },
        { img: '/screenshots/57.jpeg', title: 'Reproductor Reels 60fps', subtitle: 'Vídeos verticales con máxima fluidez' },
        { img: '/screenshots/56.jpeg', title: 'Explorar y Búsqueda de personas', subtitle: 'Encuentra miembros activos y creadores' },
        { img: '/screenshots/58.jpeg', title: 'Perfil de usuario y Biografía', subtitle: 'Página personal y estadísticas' },
        { img: '/screenshots/62.jpeg', title: 'Mensajes directos y Chat', subtitle: 'Comunicación privada y cifrada' },
        { img: '/screenshots/59.jpeg', title: 'Estudio de Creación', subtitle: 'Crea posts, reels e historias fácilmente' },
      ],
    },
    ru: {
      tag: 'Галерея приложения',
      heading: 'Познакомьтесь со всеми модулями ZEV',
      subheading: 'Современный темный интерфейс, истории на весь экран, 60fps рилсы и быстрый чат',
      shots: [
        { img: '/screenshots/55.jpeg', title: 'Умная лента и Истории', subtitle: 'Публикации, лайки и моменты' },
        { img: '/screenshots/57.jpeg', title: '60fps Reels Видеоплеер', subtitle: 'Плавный просмотр вертикальных видео' },
        { img: '/screenshots/56.jpeg', title: 'Поиск и Рекомендации', subtitle: 'Поиск активных авторов и друзей' },
        { img: '/screenshots/58.jpeg', title: 'Профиль пользователя и Био', subtitle: 'Личная страница и статистика' },
        { img: '/screenshots/62.jpeg', title: 'Личные сообщения и Чат', subtitle: 'Безопасное приватное общение' },
        { img: '/screenshots/59.jpeg', title: 'Студия создания контента', subtitle: 'Публикация постов, рилс и историй' },
      ],
    },
    zh: {
      tag: '应用界面预览',
      heading: '全方位体验 ZEV 核心功能模块',
      subheading: '现代深色质感UI、全屏精彩动态、60帧高清短视频及极速私信聊天',
      shots: [
        { img: '/screenshots/55.jpeg', title: '智能动态与故事', subtitle: '分享生活瞬间与互动点赞' },
        { img: '/screenshots/57.jpeg', title: '60帧超清短视频播放', subtitle: '沉浸式全屏流畅视频流' },
        { img: '/screenshots/56.jpeg', title: '探索与成员搜索', subtitle: '发现活跃创作者与热门话题' },
        { img: '/screenshots/58.jpeg', title: '个人主页与简介', subtitle: '管理发布内容与个人影响力' },
        { img: '/screenshots/62.jpeg', title: '私信与即时聊天', subtitle: '安全加密的私密好友对话' },
        { img: '/screenshots/59.jpeg', title: '创作发布工作室', subtitle: '一键发布图文、短视频与故事' },
      ],
    },
    ja: {
      tag: 'アプリ画面ギャラリー',
      heading: 'ZEVの多彩なモジュールを体験',
      subheading: '流麗なダークUIデザイン、フルスクリーンストーリー、60fpsリール動画、超高速ダイレクトチャット',
      shots: [
        { img: '/screenshots/55.jpeg', title: 'スマートフィード＆ストーリー', subtitle: '投稿、いいね、感動の瞬間をシェア' },
        { img: '/screenshots/57.jpeg', title: '60fps高画質リール再生', subtitle: '極めて滑らかな縦型動画ストリーミング' },
        { img: '/screenshots/56.jpeg', title: '見つける・メンバー検索', subtitle: 'アクティブなクリエイターを発見' },
        { img: '/screenshots/58.jpeg', title: 'プロフィール＆自己紹介', subtitle: '個人ページ、投稿管理、フォロワー数' },
        { img: '/screenshots/62.jpeg', title: 'ダイレクトメッセージ＆チャット', subtitle: '暗号化された安心の個人チャット' },
        { img: '/screenshots/59.jpeg', title: 'クリエイティブスタジオ', subtitle: '投稿、リール、ストーリーを素早く作成' },
      ],
    },
    ko: {
      tag: '앱 화면 갤러리',
      heading: 'ZEV의 모든 주요 기능 둘러보기',
      subheading: '세련된 다크 테마 UI, 전체 화면 스토리, 60fps 고화질 릴스 및 실시간 다이렉트 채팅',
      shots: [
        { img: '/screenshots/55.jpeg', title: '스마트 피드 및 스토리', subtitle: '게시물, 좋아요, 소중한 순간 공유' },
        { img: '/screenshots/57.jpeg', title: '60fps 고화질 릴스 재생', subtitle: '매끄러운 세로형 비디오 스트리밍' },
        { img: '/screenshots/56.jpeg', title: '탐색 및 사용자 검색', subtitle: '인기 크리에이터와 친구 찾기' },
        { img: '/screenshots/58.jpeg', title: '프로필 및 바이오', subtitle: '내 프로필, 통계 및 게시물 관리' },
        { img: '/screenshots/62.jpeg', title: '다이렉트 메시지 및 채팅', subtitle: '안전하고 빠른 1:1 비밀 대화' },
        { img: '/screenshots/59.jpeg', title: '콘텐츠 제작 스튜디오', subtitle: '게시물, 릴스, 스토리 손쉬운 생성' },
      ],
    },
    hi: {
      tag: 'ऐप इंटरफ़ेस गैलरी',
      heading: 'ZEV के सभी मॉड्यूल्स का अनुभव करें',
      subheading: 'आधुनिक डार्क थीम, फ़ुल-स्क्रीन स्टोरीज़, 60fps रील्स और सुरक्षित डायरेक्ट चैट',
      shots: [
        { img: '/screenshots/55.jpeg', title: 'स्मार्ट फ़ीड और स्टोरीज़', subtitle: 'पोस्ट्स, लाइक्स और पलों का साझाकरण' },
        { img: '/screenshots/57.jpeg', title: '60fps रील्स वीडियो प्लेयर', subtitle: 'अल्ट्रा-स्मूथ वर्टिकल वीडियो अनुभव' },
        { img: '/screenshots/56.jpeg', title: 'एक्सप्लोर और सदस्य खोज', subtitle: 'सक्रिय क्रिएटर्स और दोस्तों को खोजें' },
        { img: '/screenshots/58.jpeg', title: 'यूज़र प्रोफ़ाइल और बायो', subtitle: 'व्यक्तिगत प्रोफ़ाइल और आंकड़े' },
        { img: '/screenshots/62.jpeg', title: 'डायरेक्ट मैसेज और चैट', subtitle: 'सुरक्षित और तेज़ निजी बातचीत' },
        { img: '/screenshots/59.jpeg', title: 'क्रिएशन स्टूडियो', subtitle: 'पोस्ट, रील और स्टोरी आसानी से बनाएं' },
      ],
    },
    en: {
      tag: 'App Visual Showcase',
      heading: 'Experience ZEV Across All Modules',
      subheading: 'Fluid dark UI design, full-screen stories, 60fps responsive reels, and real-time private chatting',
      shots: [
        { img: '/screenshots/55.jpeg', title: 'Smart Feed & Stories', subtitle: 'Posts, reactions, and authentic moments' },
        { img: '/screenshots/57.jpeg', title: '60fps Reels & Videos', subtitle: 'Ultra-fluid vertical video player' },
        { img: '/screenshots/56.jpeg', title: 'Explore & People Search', subtitle: 'Discover active creators and hashtags' },
        { img: '/screenshots/58.jpeg', title: 'Profile & Creator Bio', subtitle: 'Your personal brand, stats, and posts' },
        { img: '/screenshots/62.jpeg', title: 'Direct Messages & Chat', subtitle: 'Secure, end-to-end encrypted messaging' },
        { img: '/screenshots/59.jpeg', title: 'Content Creation Studio', subtitle: 'Publish posts, reels, and stories instantly' },
      ],
    },
  };

  return dict[locale] || dict.en;
};

const getFaqList = (locale: string) => {
  if (locale === 'fa') {
    return [
      {
        q: 'اپلیکیشن زو (ZEV) چیست و چه کسانی می‌توانند استفاده کنند؟',
        a: 'زو یک پلتفرم شبکه اجتماعی نسل جدید با الهام از مدرن‌ترین استانداردهای بین‌المللی است که توسط نخبگان افغان برنامه‌نویسی شده است. هدف آن ایجاد فضایی امن، آزاد و پویا برای اشتراک‌گذاری لحظات، تماشای ریلز و ارتباط صمیمانه برای افغان‌ها و تمام مردم سراسر جهان است.',
      },
      {
        q: 'ارتباط زو با اکادمی صفی و صافی‌پی چیست؟',
        a: 'زو عضو اصلی اکوسیستم شرکت‌های بین‌المللی صفی است. جالب است بدانید که زو از همان دیتابیس ابری متمرکز و سرورهای احراز هویت اکادمی صفی بهره می‌برد! دانشجویان اکادمی صفی می‌توانند با همان نام کاربری و ایمیل خود در زو لاگین کرده و نشان‌های تایید دانشجو یا مربی دریافت کنند. همچنین تسویه درآمدهای تولیدکنندگان محتوا از طریق صافی‌پی انجام می‌گیرد.',
      },
      {
        q: 'چگونه می‌توانم از زو در کامپیوتر یا لپتاپ استفاده کنم؟',
        a: 'ما زو را با فناوری پیشرفته چندپلتفرمه فلاتر ساخته‌ایم! شما می‌توانید بدون نیاز به شبیه‌ساز یا نصب سنگین، مستقیماً از طریق مرورگر وب در سایت web.zevapp.com وارد اکانت خود شوید و از تمام امکانات فید، چت و ریلز لذت ببرید.',
      },
      {
        q: 'چگونه حریم خصوصی و امنیت اطلاعات من تضمین می‌شود؟',
        a: 'اطلاعات شما با پروتکل‌های استانداردی مانند TLS 1.3 و رمزنگاری AES-256 محافظت می‌شود. ما قفل درون‌برنامه‌ای با پین‌کد و سنسور بیومتریک (اثر انگشت) ارائه می‌دهیم و به هیچ عنوان داده‌های شخصی شما را به شرکت‌های تبلیغاتی ثالث نمی‌فروشیم.',
      },
      {
        q: 'خط مشی زو در خصوص محتوای نامناسب و امنیت کودکان چیست؟',
        a: 'زو سیاست تحمل صفر مطلق در قبال هرگونه سوءاستفاده یا محتوای آسیب‌رسان به کودکان (CSAM) دارد و بلافاصله با مراجع نظارتی و قانونی بین‌المللی همکاری می‌کند. صفحه ویژه «محافظت از کودکان» ما تمام دستورالعمل‌ها را به تفصیل تشریح کرده است.',
      },
    ];
  }
  if (locale === 'ps') {
    return [
      {
        q: 'زو (ZEV) اپلیکیشن څه شی دی او څوک یې کارولی شي؟',
        a: 'زو د نوې نسل ټولنیزه شبکه ده چې د نړیوالو معیارونو سره سم د افغان انجینرانو لخوا جوړه شوې ده. دا د شیبو شریکولو، ریلز ویډیوګانو او د نړۍ له هر ګوټ څخه د خلکو سره د خوندي او صمیمانه اړیکو لپاره یو آزاد پلیټفارم دی.',
      },
      {
        q: 'د زِو، صافي اکاډمۍ او صافي‌پي ترمنځ اړیکه څه ده؟',
        a: 'زِو د صافي شرکتونو د اکوسیستم یوه مهمه برخه ده. زِو او صافي اکاډمي یو ګډ بادل ډیټابیس کاروي، نو د اکاډمۍ محصلین کولی شي د خپل اکاونټ سره مستقیم زِو ته ننوځي او تصدیق ترلاسه کړي. د محتوا د عایداتو تادیه د صافي‌پي له لارې کیږي.',
      },
      {
        q: 'زه څنګه کولی شم په کمپیوټر یا لیپټاپ کې له زِو څخه ګټه واخلم؟',
        a: 'زِو په عصري فلاتر ټیکنالوژۍ سمبال دی. تاسو کولی شئ له کوم ایمولیټر پرته، مستقیم له هر براوزر څخه په web.zevapp.com کې ننوځئ او له ټولو فیچرز څخه خوند واخلئ.',
      },
      {
        q: 'زما د معلوماتو محرمیت او امنیت څنګه خوندي کیږي؟',
        a: 'ستاسو ټول معلومات د TLS 1.3 او AES-256 پرمختللي کوډ کولو سره خوندي کیږي. موږ په اپلیکیشن کې بیومیټریک لاک او پین کوډ لرو او هیڅکله ستاسو معلومات نه پلورو.',
      },
      {
        q: 'د ماشومانو د خوندیتوب په اړه د زِو تګلاره څه ده؟',
        a: 'زِو د ماشومانو د ناوړه ګټې اخیستنې او زیان رسوونکو محتویاتو پر وړاندې د صفر زغم تګلاره لري او د نړۍ له قانوني مراجعو لکه NCMEC سره نږدې همکاري کوي.',
      },
    ];
  }
  if (locale === 'ar') {
    return [
      {
        q: 'ما هو تطبيق زِو (ZEV) ومن يمكنه استخدامه؟',
        a: 'زِو (ZEV) هو جيل جديد من منصات التواصل الاجتماعي صممه مهندسون أفغان للعالم أجمع وفق أعلى المعايير العالمية. يوفر بيئة آمنة وسريعة لمشاركة الريلز والقصص والمحادثات المباشرة.',
      },
      {
        q: 'ما العلاقة بين زِو وأكاديمية صافي وSafiPay؟',
        a: 'زِو هو ركيزة أساسية في منظومة مجموعة صافي الدولية. يتشارك التطبيق نفس قاعدة البيانات السحابية ونظام المصادقة مع أكاديمية صافي، كما تتم معالجة عوائد المبدعين عبر صافي بي SafiPay.',
      },
      {
        q: 'كيف يمكنني استخدام زِو على جهاز الكمبيوتر أو الحاسوب المحمول؟',
        a: 'تم تطوير زِو بتقنيات Flutter المتطورة متعددة المنصات. يمكنك فتح تطبيق الويب مباشرة عبر المتصفح على الرابط web.zevapp.com دون الحاجة لأي محاكي.',
      },
      {
        q: 'كيف يتم حماية خصوصيتي وأمان بياناتي؟',
        a: 'نحمي بياناتك باستخدام تشفير TLS 1.3 أثناء النقل وتشفير AES-256 أثناء التخزين، بالإضافة إلى قفل البصمة ورمز PIN، ولا نبيع بياناتك الشخصية مطلقاً.',
      },
      {
        q: 'ما هي سياسة زِو بشأن سلامة الأطفال والمحتوى غير الملائم؟',
        a: 'نحن نطبق سياسة عدم التسامح المطلق تجاه أي مواد مسيئة للأطفال ونتعاون على مدار الساعة مع المنظمات الدولية مثل NCMEC والسلطات القانونية.',
      },
    ];
  }
  if (locale === 'ur') {
    return [
      {
        q: 'زِو (ZEV) ایپ کیا ہے اور اسے کون استعمال کر سکتا ہے؟',
        a: 'زِو اگلی نسل کا ایک سوشل نیٹ ورک ہے جسے افغان انجینئرز نے عالمی معیار پر تیار کیا ہے۔ یہ پاکستان، افغانستان اور دنیا بھر کے صارفین کے لیے ریلز، اسٹوریز اور محفوظ چیٹ کے لیے ایک شاندار پلیٹ فارم ہے۔',
      },
      {
        q: 'زِو، صافی اکیڈمی اور صافی پے کا باہمی تعلق کیا ہے؟',
        a: 'زِو صافی انٹرنیشنل ایکو سسٹم کا حصہ ہے۔ یہ صافی اکیڈمی کے ساتھ مشترکہ کلاؤڈ ڈیٹا بیس کا حامل ہے، جس کی بدولت اکیڈمی کے طلباء اسی آئی ڈی سے لاگ ان ہو سکتے ہیں، اور آمدنی کی منتقلی صافی پے سے ہوتی ہے۔',
      },
      {
        q: 'میں کمپیوٹر یا لیپ ٹاپ پر زِو کیسے استعمال کر سکتا ہوں؟',
        a: 'ہم نے زِو کو جدید فلوٹر ٹیکنالوجی سے بنایا ہے۔ آپ بغیر کسی ایمولیٹر کے براہ راست کسی بھی براؤزر میں web.zevapp.com پر جا کر تمام فیچرز استعمال کر سکتے ہیں۔',
      },
      {
        q: 'میری پرائیویسی اور ذاتی ڈیٹا کا تحفظ کیسے ممکن بنایا گیا ہے؟',
        a: 'آپ کا تمام ڈیٹا TLS 1.3 اور بینکاری معیار کے AES-256 انکرپشن سے محفوظ ہے۔ ہم ان-ایپ بائیو میٹرک لاک بھی فراہم کرتے ہیں اور آپ کا ڈیٹا کسی تیسرے فریق کو نہیں بیچتے۔',
      },
      {
        q: 'بچوں کے تحفظ اور نامناسب مواد کے حوالے سے زِو کی کیا پالیسی ہے؟',
        a: 'زِو پر بچوں کے ساتھ بدسلوکی کے کسی بھی مواد پر مکمل زیرو ٹالرنس پالیسی نافذ ہے اور ہم عالمی قوانین اور NCMEC کے ساتھ مکمل تعاون کرتے ہیں۔',
      },
    ];
  }
  return [
    {
      q: 'What is ZEV and who can use it?',
      a: 'ZEV is a next-generation social network inspired by modern international standards, engineered with pride by Afghan software developers. It provides a safe, vibrant, and private space for sharing reels, stories, photos, and thoughts with friends and creators worldwide.',
    },
    {
      q: 'What is the relationship between ZEV, Safi Academy, and SafiPay?',
      a: 'ZEV is a flagship pillar of the Safi Ecosystem. It natively shares its cloud database and authentication architecture with Safi Academy. Students and instructors log into ZEV seamlessly using the same credentials, with synchronized creator verification and monetization via SafiPay.',
    },
    {
      q: 'How can I access ZEV on my desktop or laptop?',
      a: 'ZEV is engineered with modern cross-platform technology. You can launch the web application directly in your browser at web.zevapp.com with full access to feeds, reels, messages, and stories without any emulator.',
    },
    {
      q: 'How does ZEV protect my data and privacy?',
      a: 'Your data is secured in transit using TLS 1.3 and at rest with AES-256 encryption. We support optional in-app PIN and biometric locks, and we never sell your personal data to third-party data brokers.',
    },
    {
      q: 'What is ZEV’s policy on child safety and moderation?',
      a: 'ZEV maintains strict zero tolerance for any child abuse material or predatory behavior. We enforce automated screening, rapid human moderation, and cooperate with international child protection authorities like NCMEC.',
    },
  ];
};

export default function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const dict = getDictionary(locale);
  const isFa = isRtlLocale(locale);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const showcaseData = getShowcaseData(locale);
  const faqs = getFaqList(locale);

  const stats = [
    { label: dict.hero.activeUsers, value: dict.hero.activeUsersVal, icon: Users },
    { label: dict.hero.reelsShared, value: dict.hero.reelsSharedVal, icon: Video },
    { label: dict.hero.countries, value: dict.hero.countriesVal, icon: Globe },
    { label: dict.hero.security, value: '100% Encrypted', icon: Lock },
  ];

  const features = [
    {
      title: dict.features.f1Title,
      desc: dict.features.f1Desc,
      icon: Video,
      color: '#FC466B',
    },
    {
      title: dict.features.f2Title,
      desc: dict.features.f2Desc,
      icon: Flame,
      color: '#FC466B',
    },
    {
      title: dict.features.f3Title,
      desc: dict.features.f3Desc,
      icon: Lock,
      color: '#FC466B',
    },
    {
      title: dict.features.f4Title,
      desc: dict.features.f4Desc,
      icon: Monitor,
      color: '#FC466B',
    },
    {
      title: dict.features.f5Title,
      desc: dict.features.f5Desc,
      icon: Star,
      color: '#FC466B',
    },
    {
      title: dict.features.f6Title,
      desc: dict.features.f6Desc,
      icon: ShieldCheck,
      color: '#FC466B',
    },
  ];

  return (
    <div style={{ backgroundColor: '#FFFFFF', color: '#0F172A' }}>
      {/* HERO SECTION */}
      <section
        style={{
          position: 'relative',
          paddingTop: 40,
          paddingBottom: 80,
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
        }}
      >
        {/* Ambient Glows */}
        <div
          className="ambient-glow ambient-pink"
          style={{ top: '-10%', left: '50%', transform: 'translateX(-50%)', opacity: 0.5 }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: 50,
              alignItems: 'center',
            }}
          >
            {/* Left Content */}
            <div>
              {/* Badge */}
              <div className="badge-pill">
                <Sparkles size={14} />
                <span>{dict.hero.badge}</span>
              </div>

              {/* Headline */}
              <h1
                style={{
                  fontSize: 'clamp(36px, 5.5vw, 64px)',
                  fontWeight: 900,
                  lineHeight: 1.12,
                  letterSpacing: '-1.5px',
                  marginBottom: 22,
                }}
              >
                <span className="text-gradient-pink">{dict.hero.titleHighlight}</span>
                <br />
                <span style={{ color: '#000000' }}>{dict.hero.titleRest}</span>
              </h1>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: 'clamp(16px, 2vw, 19px)',
                  color: '#334155',
                  lineHeight: 1.65,
                  marginBottom: 36,
                  maxWidth: 620,
                  fontWeight: 500,
                }}
              >
                {dict.hero.subtitle}
              </p>

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 14,
                  marginBottom: 28,
                }}
              >
                <a
                  href="https://web.zevapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ padding: '15px 32px', fontSize: 16 }}
                >
                  <Globe size={18} />
                  <span>{dict.hero.ctaWeb}</span>
                  <ArrowRight size={16} />
                </a>

                <button
                  onClick={() => setDownloadModalOpen(true)}
                  className="btn-secondary"
                  style={{ padding: '15px 32px', fontSize: 16 }}
                >
                  <Download size={18} color="#FC466B" />
                  <span>{dict.hero.ctaDownload}</span>
                </button>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 13,
                  color: '#64748B',
                }}
              >
                <CheckCircle2 size={16} color="#FC466B" />
                <span>{dict.hero.ctaStoreSubtitle}</span>
              </div>
            </div>

            {/* Right Showcase Image Hero */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* Outer decorative ring */}
              <div
                style={{
                  position: 'absolute',
                  width: '90%',
                  aspectRatio: '1',
                  borderRadius: '50%',
                  border: '1.5px dashed rgba(252, 70, 107, 0.35)',
                  animation: 'pulseGlow 8s infinite',
                  pointerEvents: 'none',
                }}
              />

              {/* Main Visual Card */}
              <div
                className="animate-float"
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: 440,
                  borderRadius: 36,
                  padding: 8,
                  background: '#FFF1F4',
                  border: '2px solid rgba(252, 70, 107, 0.4)',
                  boxShadow: '0 25px 60px rgba(252, 70, 107, 0.25)',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '9 / 15',
                    borderRadius: 30,
                    overflow: 'hidden',
                    background: '#0B0C15',
                  }}
                >
                  <Image
                    src="/screenshots/3.jpg"
                    alt="ZEV Feed and Social Experience"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </div>
              </div>

              {/* Floating Badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '10%',
                  left: isFa ? 'auto' : '-3%',
                  right: isFa ? '-3%' : 'auto',
                  background: '#FFFFFF',
                  border: '1.5px solid rgba(252, 70, 107, 0.4)',
                  padding: '12px 20px',
                  borderRadius: 22,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  boxShadow: '0 12px 30px rgba(252, 70, 107, 0.2)',
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    background: '#FC466B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                  }}
                >
                  <Video size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#000000' }}>
                    {isFa ? 'ریلز و استوری ترند' : 'Trending Reels Studio'}
                  </div>
                  <div style={{ fontSize: 11, color: '#FC466B', fontWeight: 700 }}>
                    {isFa ? 'کیفیت فوق‌العاده ۶۰fps' : 'Ultra HD 60fps'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STATS STRIP - Pink Box */}
          <div
            className="pink-box"
            style={{
              marginTop: 70,
              padding: '24px 36px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 24,
              background: '#FFF1F4',
              border: '1.5px solid rgba(252, 70, 107, 0.35)',
              boxShadow: '0 10px 30px rgba(252, 70, 107, 0.1)',
            }}
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: '#FC466B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      boxShadow: '0 4px 12px rgba(252, 70, 107, 0.35)',
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 900,
                        color: '#000000',
                        letterSpacing: '-0.5px',
                      }}
                    >
                      {stat.value}
                    </div>
                    <div style={{ fontSize: 13, color: '#475569', fontWeight: 600 }}>{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section
        id="features"
        style={{
          position: 'relative',
          padding: '90px 0',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', maxWidth: 740, margin: '0 auto 60px' }}>
            <div className="badge-pill">
              <Sparkles size={14} />
              <span>{dict.features.tag}</span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 900,
                lineHeight: 1.2,
                marginBottom: 16,
                color: '#000000',
              }}
            >
              {dict.features.title}
            </h2>
            <p style={{ fontSize: 17, color: '#334155', lineHeight: 1.6 }}>{dict.features.subtitle}</p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 28,
            }}
          >
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="pink-box"
                  style={{
                    padding: 36,
                    borderRadius: 28,
                    background: '#FFF7F9',
                    border: '1.5px solid rgba(252, 70, 107, 0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 8px 24px rgba(252, 70, 107, 0.08)',
                  }}
                >
                  <div>
                    <div
                      style={{
                        width: 54,
                        height: 54,
                        borderRadius: 16,
                        background: '#FC466B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        marginBottom: 20,
                        boxShadow: '0 6px 18px rgba(252, 70, 107, 0.3)',
                      }}
                    >
                      <Icon size={26} />
                    </div>

                    <h3
                      style={{
                        fontSize: 20,
                        fontWeight: 900,
                        color: '#000000',
                        marginBottom: 12,
                      }}
                    >
                      {feat.title}
                    </h3>

                    <p style={{ color: '#334155', fontSize: 15, lineHeight: 1.7, margin: 0 }}>
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* APP MOCKUP SHOWCASE */}
      <AppMockup />

      {/* SAFI ECOSYSTEM & PARTNER SHOWCASE */}
      <EcosystemSection locale={locale} dict={dict} />

      {/* SCREENSHOT GALLERY */}
      <section
        style={{
          position: 'relative',
          padding: '90px 0',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', maxWidth: 740, margin: '0 auto 60px' }}>
            <div className="badge-pill">
              <Smartphone size={14} />
              <span>{showcaseData.tag}</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, marginBottom: 14, color: '#000000' }}>
              {showcaseData.heading}
            </h2>
            <p style={{ fontSize: 17, color: '#334155' }}>
              {showcaseData.subheading}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 22,
            }}
          >
            {showcaseData.shots.map((shot, idx) => (
              <div
                key={idx}
                className="pink-box"
                style={{
                  padding: 14,
                  borderRadius: 26,
                  textAlign: 'center',
                  background: '#FFF7F9',
                  border: '1.5px solid rgba(252, 70, 107, 0.3)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(252, 70, 107, 0.08)',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '9 / 18',
                    borderRadius: 20,
                    overflow: 'hidden',
                    background: '#0F101A',
                    marginBottom: 14,
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  <Image src={shot.img} alt={shot.title} fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ fontSize: 15, fontWeight: 900, color: '#000000', marginBottom: 4 }}>
                  {shot.title}
                </div>
                <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>
                  {shot.subtitle}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section style={{ padding: '90px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container-narrow">
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            <h2 style={{ fontSize: 34, fontWeight: 900, marginBottom: 14, color: '#000000' }}>
              {locale === 'fa'
                ? 'پرسش‌های متداول'
                : locale === 'ps'
                ? 'پرله پسې پوښتنې (FAQ)'
                : locale === 'ar'
                ? 'الأسئلة الشائعة'
                : locale === 'ur'
                ? 'عام پوچھے جانے والے سوالات'
                : locale === 'tr'
                ? 'Sıkça Sorulan Sorular'
                : locale === 'de'
                ? 'Häufig gestellte Fragen'
                : locale === 'fr'
                ? 'Foire aux questions'
                : locale === 'es'
                ? 'Preguntas frecuentes'
                : locale === 'ru'
                ? 'Часто задаваемые вопросы'
                : 'Frequently Asked Questions'}
            </h2>
            <p style={{ fontSize: 16, color: '#334155' }}>
              {locale === 'fa'
                ? 'پاسخ به سوالات مهم درباره نحوه کار، اکوسیستم صفی و امنیت زو'
                : locale === 'ps'
                ? 'د زِو د کارکړنې، صافي اکوسیستم او محرمیت په اړه مهم ځوابونه'
                : locale === 'ar'
                ? 'إجابات شاملة حول كيفية عمل زِو، منظومة صافي والخصوصية والأمان'
                : locale === 'ur'
                ? 'زِو کے استعمال، صافی ایکو سسٹم اور سیکیورٹی سے متعلق اہم جوابات'
                : 'Everything you need to know about ZEV, the Safi Ecosystem, and privacy.'}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="pink-box"
                  style={{
                    borderRadius: 18,
                    border: isOpen
                      ? '1.5px solid #FC466B'
                      : '1.5px solid rgba(252, 70, 107, 0.25)',
                    background: isOpen ? '#FFF1F4' : '#FFFFFF',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'none',
                      border: 'none',
                      color: '#000000',
                      fontSize: 16,
                      fontWeight: 800,
                      textAlign: isFa ? 'right' : 'left',
                      cursor: 'pointer',
                      gap: 16,
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={20}
                      color="#FC466B"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease',
                        flexShrink: 0,
                      }}
                    />
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: '0 24px 22px',
                        color: '#334155',
                        fontSize: 15,
                        lineHeight: 1.75,
                        borderTop: '1px solid rgba(252, 70, 107, 0.2)',
                        paddingTop: 16,
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER - Solid Pink Box with White/Black contrast */}
      <section
        id="download"
        style={{
          position: 'relative',
          padding: '60px 0 100px',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div
            className="pink-box-solid"
            style={{
              padding: '60px 40px',
              borderRadius: 36,
              textAlign: 'center',
              boxShadow: '0 20px 60px rgba(252, 70, 107, 0.35)',
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(28px, 4vw, 46px)',
                fontWeight: 900,
                color: '#FFFFFF',
                marginBottom: 16,
              }}
            >
              {dict.downloadSection.title}
            </h2>
            <p
              style={{
                fontSize: 17,
                color: '#FFFFFF',
                maxWidth: 620,
                margin: '0 auto 36px',
                lineHeight: 1.6,
                opacity: 0.95,
              }}
            >
              {dict.downloadSection.subtitle}
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 16,
                marginBottom: 20,
              }}
            >
              <a
                href="https://web.zevapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-white"
                style={{ padding: '16px 36px', fontSize: 16 }}
              >
                <Globe size={18} />
                <span>{dict.downloadSection.btnWeb}</span>
                <ArrowRight size={18} />
              </a>

              <button
                onClick={() => setDownloadModalOpen(true)}
                className="btn-white"
                style={{ padding: '16px 36px', fontSize: 16 }}
              >
                <Download size={18} />
                <span>{dict.hero.ctaDownload}</span>
              </button>
            </div>

            <div style={{ fontSize: 13, color: '#FFFFFF', opacity: 0.85 }}>{dict.downloadSection.apkNote}</div>
          </div>
        </div>
      </section>

      {/* Download Modal Trigger */}
      <DownloadModal isOpen={downloadModalOpen} onClose={() => setDownloadModalOpen(false)} />
    </div>
  );
}
