import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#050505',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://theswedish.netlify.app'),
  title: {
    default: '더스웨디시 | 수도권·충청 프리미엄 홈타이 & 방문 스웨디시마사지',
    template: '%s | 더스웨디시',
  },
  description:
    '수도권·충청 전지역 방문 스웨디시마사지, 홈타이, 방문아로마 30분 도착 100% 안심 예약 플랫폼 더스웨디시입니다.',
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
  openGraph: {
    title: '더스웨디시 (The Swedish) - 프리미엄 홈케어 테라피',
    description:
      '서울·경기·인천·충청권 전지역 30분 도착! 프라이빗 방문 스웨디시 & 홈타이 전문 예약 플랫폼',
    url: 'https://theswedish.netlify.app',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        {/* 🟢 네이버 서치어드바이저 소유확인 메타태그 직접 삽입 */}
        <meta
          name="naver-site-verification"
          content="445be2ac4c8c60aad6738d83702c71aa03bac14e"
        />
      </head>
      <body className="bg-[#050505] text-gray-100 antialiased selection:bg-amber-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}