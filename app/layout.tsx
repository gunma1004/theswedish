import type { Metadata, Viewport } from 'next';
import './globals.css';

// 📱 1. 모바일 반응형 뷰포트 및 브라우저 테마 색상 설정
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#050505',
};

// 🟢 2. 글로벌 SEO 메타데이터 설정
export const metadata: Metadata = {
  metadataBase: new URL('https://theswedish.co.kr'), // 실제 운영 도메인으로 필요 시 변경
  title: {
    default: '더스웨디시 | 수도권·충청 프리미엄 홈타이 & 방문 스웨디시마사지',
    template: '%s | 더스웨디시',
  },
  description:
    '서울, 경기, 인천, 천안, 아산, 대전, 청주 전 지역 30분 도착 보장! 방문 스웨디시마사지, 홈타이, 방문 아로마마사지 100% 안심 정찰제 예약 플랫폼 더스웨디시(The Swedish)입니다.',
  keywords: [
    '더스웨디시',
    'The Swedish',
    '스웨디시마사지',
    '홈타이',
    '방문스웨디시마사지',
    '방문타이마사지',
    '방문아로마마사지',
    '서울홈타이',
    '경기스웨디시',
    '인천홈타이',
    '대전스웨디시',
    '천안홈타이',
    '청주스웨디시',
    '아산홈타이',
  ],
  authors: [{ name: '더스웨디시 (The Swedish)' }],
  creator: '더스웨디시',
  publisher: '더스웨디시',
  formatDetection: {
    telephone: true,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/logo.png',
  },
  openGraph: {
    title: '더스웨디시 (The Swedish) - 프리미엄 홈케어 테라피',
    description:
      '서울·경기·인천·충청권 전지역 30분 도착! 프라이빗 방문 스웨디시 & 홈타이 전문 예약 플랫폼',
    url: 'https://theswedish.co.kr',
    siteName: '더스웨디시',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/my-banner.png',
        width: 1200,
        height: 630,
        alt: '더스웨디시 프리미엄 홈케어 배너',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '더스웨디시 | 수도권·충청 프리미엄 홈타이 & 방문 스웨디시마사지',
    description: '서울·경기·인천·천안·아산·대전·청주 전 지역 안심 방문 스웨디시 & 홈타이 예약',
    images: ['/my-banner.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 구글/네이버 검색 로봇이 플랫폼 정보를 구조화하여 빠르게 인식하도록 돕는 JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: '더스웨디시 (The Swedish)',
    image: 'https://theswedish.co.kr/my-banner.png',
    description: '수도권 및 충청권 전지역 방문 스웨디시마사지, 홈타이, 방문아로마마사지 중개 플랫폼',
    areaServed: [
      { '@type': 'AdministrativeArea', name: '서울특별시' },
      { '@type': 'AdministrativeArea', name: '경기도' },
      { '@type': 'AdministrativeArea', name: '인천광역시' },
      { '@type': 'AdministrativeArea', name: '대전광역시' },
      { '@type': 'AdministrativeArea', name: '천안시' },
      { '@type': 'AdministrativeArea', name: '아산시' },
      { '@type': 'AdministrativeArea', name: '청주시' },
    ],
    priceRange: '₩₩',
    currenciesAccepted: 'KRW',
    paymentAccepted: 'Cash, Bank Transfer',
  };

  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#050505] text-gray-100 antialiased selection:bg-amber-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}