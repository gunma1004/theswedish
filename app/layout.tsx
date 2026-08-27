export const metadata: Metadata = {
  metadataBase: new URL('https://theswedish.netlify.app'),
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
  // 🟢 네이버 사이트 소유확인 메타태그 추가
  verification: {
    other: {
      'naver-site-verification': '445be2ac4c8c60aad6738d83702c71aa03bac14e',
    },
  },
  openGraph: {
    title: '더스웨디시 (The Swedish) - 프리미엄 홈케어 테라피',
    description: '서울·경기·인천·충청권 전지역 30분 도착! 프라이빗 방문 스웨디시 & 홈타이 전문 예약 플랫폼',
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