export interface Dictionary {
  nav: {
    home: string;
    platform: string;
    features: string;
    featuresDesc: string;
    ecosystem: string;
    ecosystemDesc: string;
    webApp: string;
    webAppDesc: string;
    about: string;
    trustSafety: string;
    childSafety: string;
    childSafetyDesc: string;
    privacy: string;
    privacyDesc: string;
    terms: string;
    termsDesc: string;
    deleteAccount?: string;
    deleteAccountDesc?: string;
    support: string;
    openWebApp: string;
    download: string;
  };
  hero: {
    badge: string;
    titleHighlight: string;
    titleRest: string;
    subtitle: string;
    ctaWeb: string;
    ctaDownload: string;
    ctaStoreSubtitle: string;
    activeUsers: string;
    activeUsersVal: string;
    reelsShared: string;
    reelsSharedVal: string;
    countries: string;
    countriesVal: string;
    security: string;
  };
  ecosystem: {
    tag: string;
    title: string;
    subtitle: string;
    databaseNoticeTitle: string;
    databaseNoticeDesc: string;
    visitSite: string;
  };
  team: {
    tag: string;
    title: string;
    subtitle: string;
    roles?: {
      directorFounder: string;
      ceoEurope: string;
      coFounder: string;
      ecosystemManager: string;
      leadDeveloper: string;
    };
    members?: {
      shaheen: { name: string; role: string; badge: string; bio: string };
      sahel: { name: string; role: string; badge: string; bio: string };
      mujtaba: { name: string; role: string; badge: string; bio: string };
      shirin: { name: string; role: string; badge: string; bio: string };
      mobin: { name: string; role: string; badge: string; bio: string };
    };
  };
  features: {
    tag: string;
    title: string;
    subtitle: string;
    f1Title: string;
    f1Desc: string;
    f2Title: string;
    f2Desc: string;
    f3Title: string;
    f3Desc: string;
    f4Title: string;
    f4Desc: string;
    f5Title: string;
    f5Desc: string;
    f6Title: string;
    f6Desc: string;
  };
  downloadSection: {
    tag: string;
    title: string;
    subtitle: string;
    btnWeb: string;
    btnDownload: string;
    apkNote: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    legal: string;
    safety: string;
    ecosystem: string;
    platforms: string;
    rights: string;
    madeWith: string;
  };
}
