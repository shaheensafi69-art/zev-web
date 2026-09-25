# 🚀 ZEV Web (zevapp.com)

> **The Next-Generation Afghan-Founded Global Social Network**  
> نسل جدید شبکه اجتماعی پیشرفته با هویت جهانی و ساختار مدرن

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Styling-Custom_Pink_%23FC466B-FC466B?style=for-the-badge)](https://zevapp.com)

---

## 🌟 Overview (معرفی پروژه)

**ZEV (زِو)** is a high-performance, privacy-focused social network application built for users across the globe. This repository contains the official production web application for [zevapp.com](https://zevapp.com).

### ✨ Key Features (ویژگی‌های کلیدی)
- 🌐 **19 Full Native Languages Support**: Dynamic `/[locale]` localization across 19 global languages (Persian/Dari, Pashto, English, Arabic, Turkish, Urdu, German, French, Spanish, Russian, Chinese, Japanese, Korean, Hindi, and more).
- 🔄 **Bidirectional RTL/LTR Support**: Fully optimized typographic and layout support for right-to-left languages (`fa`, `ps`, `ar`, `ur`) and left-to-right languages.
- 🎨 **Signature Design System**: Pure White (`#FFFFFF`) with vivid Hot Pink (`#FC466B`) accents and high-contrast Black typography.
- 📱 **Cross-Platform Ecosystem**: Direct links and download launchers for Android (APK), iOS, Windows, macOS, Linux, and Web version.
- 🛡️ **Child Safety & Trust Priority (P1)**: Dedicated child safety center, transparent privacy policy, and full terms of service.
- 🏢 **Safi Ecosystem Integration**: Seamless hub connecting [Safi Academy](https://safiacademy.org), [SafiPay](https://safipay.net), [Safi International Capital](https://safiinternationalcapitalltd.site), and other group ventures.

---

## 📂 Project Structure (ساختار پروژه)

```text
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx         # Multilingual Root Layout (Fonts, Metadata, Direction)
│   │   ├── page.tsx           # Home Page
│   │   ├── about/             # About Us & Leadership Team
│   │   ├── features/          # App Features & Highlights
│   │   ├── ecosystem/         # Safi Ecosystem ventures
│   │   ├── child-safety/      # Child Protection & Safety Center (P1)
│   │   ├── privacy/           # Privacy Policy
│   │   ├── terms/             # Terms of Service
│   │   └── support/           # 24/7 Support & Help Center
│   └── page.tsx               # Root Locale Redirector
├── components/
│   ├── Navbar.tsx             # Floating Categorized Glass Header
│   ├── Footer.tsx             # Professional Multilingual Footer
│   └── DownloadModal.tsx      # Multi-Platform App Download Launcher
├── dictionaries/
│   ├── locales/               # 19 Dedicated Native Language Translation Files
│   ├── index.ts               # Translation Helper & Language Directory
│   └── types.ts               # Strict TypeScript Dictionaries
└── public/
    └── zev-logo.png           # Official Brand Assets
```

---

## 🛠️ Getting Started (راه‌اندازی پروژه)

### Prerequisites
- Node.js 18.17+ or later
- npm or pnpm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/shaheensafi69-art/zev-web.git
cd zev-web

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start
```

---

## 👨‍💻 Founder & Organization
- **Founder & CEO**: Shaheen Safi (شاهین صفی)
- **Organization**: Safi International Capital Ltd.
- **Official Domains**: 
  - [zevapp.com](https://zevapp.com)
  - [safiacademy.org](https://safiacademy.org)
  - [safipay.net](https://safipay.net)

---

## 📄 License
All rights reserved © 2026 ZEV Technologies & Safi International Capital Ltd.
