import { MetadataRoute } from 'next';
import { regionData } from "./data/regions"; // 경로에 맞게 '../data/regions' 또는 '@/data/regions' 확인

export default function sitemap(): MetadataRoute.Sitemap {
  // 실제 서비스 도메인 (Netlify 도메인 또는 구입한 도메인)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://theswedish.netlify.app';
  const currentDate = new Date();

  // 1. 메인 페이지 (더스웨디시 홈)
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // 2. 서울·경기·인천 및 천안·아산·대전·청주 전체 시/구/군 및 읍·면·동 단위 URL 자동 생성
  Object.keys(regionData).forEach((regionKey) => {
    const districts = regionData[regionKey].districts;

    Object.keys(districts).forEach((districtKey) => {
      // 2-1. 시/구/군 단위 페이지 (예: /daejeon/yuseong, /cheonan/cheonan_seobuk)
      routes.push({
        url: `${baseUrl}/${regionKey}/${districtKey}`,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 0.8,
      });

      // 2-2. 세부 읍·면·동 단위 페이지 (예: /daejeon/yuseong/봉명동)
      const dongs = districts[districtKey].dongs || [];
      dongs.forEach((dong) => {
        routes.push({
          url: `${baseUrl}/${regionKey}/${districtKey}/${encodeURIComponent(dong)}`,
          lastModified: currentDate,
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      });
    });
  });

  return routes;
}