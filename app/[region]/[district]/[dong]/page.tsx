import { regionData } from "../../../data/regions";
import Link from "next/link";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{
    region: string;
    district: string;
    dong: string;
  }>;
}

// 🟢 1. 동 단위 7개 템플릿 순환 동적 SEO 메타 태그 생성 (더스웨디시 전용 키워드)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { region, district, dong } = resolvedParams;
  const decodedDong = decodeURIComponent(dong);

  const regionInfo = regionData[region];
  const districtName = regionInfo?.districts[district]?.name || district;
  const regionName = regionInfo?.name || "수도권·충청권";

  // 동 이름 및 구 이름의 문자열 해시 기반 7개 템플릿 균등 분기
  const hash = (decodedDong + district).split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const seed = hash % 7;

  let title = "";
  let description = "";

  switch (seed) {
    case 0:
      title = `${decodedDong} 스웨디시마사지 24시 신속방문 제휴안내 | 더스웨디시`;
      description = `${districtName} ${decodedDong} 스웨디시마사지 실시간 예약. 30분 내 빠른 도착과 100% 현장 정찰제로 편안한 홈타이·방문스웨디시를 경험하세요.`;
      break;
    case 1:
      title = `${districtName} ${decodedDong} 방문스웨디시마사지 홈케어 추천 - 더스웨디시`;
      description = `${decodedDong} 전지역 어디서나 부르는 프라이빗 방문스웨디시마사지! 지친 일상에 활력을 더하는 1:1 맞춤 힐링 테라피 코스를 안내해드립니다.`;
      break;
    case 2:
      title = `${decodedDong} 홈타이·방문아로마마사지 힐링 케어 | 더스웨디시`;
      description = `${regionName} ${districtName} ${decodedDong} 인근 전문 테라피스트 항시 대기. 내 공간에서 편하게 받는 안심 정찰제 방문아로마마사지 서비스.`;
      break;
    case 3:
      title = `${decodedDong} 방문타이마사지·스웨디시 제휴업체 정보 [더스웨디시]`;
      description = `${decodedDong} 방문타이마사지 고객 만족도 최우수 샵 추천! 24시간 연중무휴 신속 방문 서비스로 수준 높은 림프 테라피를 제공합니다.`;
      break;
    case 4:
      title = `${decodedDong} 홈타이 1:1 방문스웨디시마사지 예약 - 더스웨디시`;
      description = `${districtName} ${decodedDong} 전구역 30분 도착 보장. 철저한 위생 관리와 정찰제 요금으로 신뢰받는 홈타이 베스트 제휴점 모음.`;
      break;
    case 5:
      title = `${decodedDong} 스웨디시마사지 안심 정찰제 테라피 추천 | 더스웨디시`;
      description = `${decodedDong} 힐링 테라피 전문 힐러 실시간 배차! 정통 타이부터 프리미엄 스웨디시마사지까지 맞춤형 홈케어를 지금 확인하세요.`;
      break;
    case 6:
    default:
      title = `${districtName} ${decodedDong} 방문아로마마사지 베스트 제휴점 가이드 | 더스웨디시`;
      description = `${regionName} ${districtName} ${decodedDong} 방문스웨디시마사지 24시 상시 상담. 피로 회복을 위한 최고급 1:1 홈타이 코스 및 요금 안내.`;
      break;
  }

  return {
    title,
    description,
    keywords: [
      `${districtName} ${decodedDong} 스웨디시마사지`,
      `${decodedDong} 스웨디시마사지`,
      `${decodedDong} 홈타이`,
      `${decodedDong} 방문스웨디시마사지`,
      `${decodedDong} 방문타이마사지`,
      `${decodedDong} 방문아로마마사지`,
      "더스웨디시",
      "The Swedish"
    ],
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "더스웨디시",
      images: [
        {
          url: "/my-banner.png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// 🎯 제휴 업체 기본 데이터
const defaultShops = [
  {
    id: 1,
    name: "✨ 한국미인테라피",
    location: "전지역 (실시간 신속 방문)",
    desc: "🏆 품격 있는 힐링을 선사하는 최고급 프라이빗 1:1 맞춤형 방문 스웨디시 & 아로마 테라피",
    phone: "0507-1280-3288",
    badge: "만족도 최우수",
    badgeColor: "bg-amber-500 text-black font-extrabold shadow-lg shadow-amber-500/20",
    image: "/shop1.jpg",
    courses: [
      { name: "맞춤형 방문바디케어 (60분)", price: "90,000원", best: false },
      { name: "스페셜 방문아로마마사지 (60분)", price: "140,000원", best: true },
    ],
  },
  {
    id: 2,
    name: "🌟 퀸즈홈테라피",
    location: "전지역 (30분 내 방문)",
    desc: "💯 전문 테라피스트들의 체계적이고 세심한 1:1 맞춤 힐링 및 피로 회복 프로그램",
    phone: "0507-1280-3228",
    badge: "신규 제휴할인",
    badgeColor: "bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-extrabold",
    image: "/shop2.jpg",
    courses: [
      { name: "스탠다드 방문타이마사지 (60분)", price: "60,000원", best: false },
      { name: "VIP 방문스웨디시마사지 (90분)", price: "140,000원", best: true },
    ],
  },
  {
    id: 3,
    name: "🔥 한국골든테라피",
    location: "전지역 상시 신속 방문",
    desc: "⭐ 만족도 1위! 지친 일상을 깨우는 정성 가득한 프리미엄 1:1 홈타이 & 림프 스웨디시",
    phone: "0507-1280-3361",
    badge: "실시간 인기 1위",
    badgeColor: "bg-red-500 text-white font-black animate-pulse",
    image: "/shop3.jpg",
    courses: [
      { name: "릴렉스 건식 홈타이 (60분)", price: "60,000원", best: false },
      { name: "프리미엄 스웨디시마사지 (60분)", price: "140,000원", best: true },
    ],
  },
  {
    id: 4,
    name: "💎 젊고마인드좋은테라피",
    location: "전지역 상시 대기",
    desc: "⚡ 밝고 친절한 에너지를 전하는 감성 힐링! 내 집에서 편안하게 즐기는 힐링 테라피",
    phone: "0507-1280-3180",
    badge: "재방문율 99%",
    badgeColor: "bg-zinc-800 text-amber-400 border border-amber-500/40 font-bold",
    image: "/shop4.jpg",
    courses: [
      { name: "타이/아로마 코스 (60분)", price: "60,000원", best: false },
      { name: "한국 감성 스웨디시 (60분)", price: "140,000원", best: true },
    ],
  },
  {
    id: 5,
    name: "👑 24시미녀테라피",
    location: "전지역 30분 내 도착 보장",
    desc: "🚀 100% 현장 정찰제! 전지역 평균 30분 내 신속 방문 보장 프리미엄 홈케어",
    phone: "0507-1280-3126",
    badge: "24시 신속방문",
    badgeColor: "bg-emerald-500 text-black font-extrabold",
    image: "/shop5.jpg",
    courses: [
      { name: "릴렉스 방문타이마사지 (60분)", price: "60,000원", best: false },
      { name: "시그니처 방문스웨디시마사지 (60분)", price: "140,000원", best: true },
    ],
  },
];

export default async function DongPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { region, district, dong } = resolvedParams;
  const decodedDong = decodeURIComponent(dong);

  const regionInfo = regionData[region];
  const districtObj = regionInfo?.districts[district];
  const districtName = districtObj?.name || district;

  // 새로고침 시 무작위(랜덤) 셔플
  const shuffledShops = [...defaultShops].sort(() => Math.random() - 0.5);

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* 상단 네온 헤더 */}
      <header className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-amber-500/20 px-4 py-3.5 shadow-[0_4px_20px_rgba(245,158,11,0.08)]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-black text-xl shadow-[0_0_15px_rgba(245,158,11,0.4)] group-hover:scale-105 transition-transform">
              TS
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                더스웨디시
              </span>
              <span className="text-[10px] text-gray-400 tracking-tight uppercase font-medium">
                THE SWEDISH &middot; {districtName} {decodedDong}
              </span>
            </div>
          </Link>

          <Link
            href={`/${region}/${district}`}
            className="text-xs px-4 py-2 rounded-xl bg-neutral-800 text-amber-400 font-extrabold border border-amber-500/30 hover:bg-neutral-700 transition-all"
          >
            ← {districtName} 전체 목록으로
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1">
        {/* 📍 동 맞춤 비주얼 배너 */}
        <section className="text-center my-2">
          <div className="mb-6 py-6 px-4 rounded-3xl bg-gradient-to-b from-[#121214] to-[#0a0a0c] border border-amber-500/20 text-center shadow-lg relative overflow-hidden">
            <span className="inline-block text-xs font-bold text-amber-400 tracking-widest uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mb-3">
              {districtName} {decodedDong} DIRECT CARE
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              {districtName} {decodedDong} <br className="sm:hidden" />
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                스웨디시마사지 & 홈타이
              </span>
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
              {decodedDong} 전지역 30분 도착 보장! 안심 1:1 방문 테라피 제휴점
            </p>
          </div>
        </section>

        {/* 제휴 업체 카드 리스트 (새로고침 시 랜덤 정렬) */}
        <section className="space-y-6">
          <div className="flex justify-between items-end mb-4 px-2">
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
                <span>🏆</span> {districtName} {decodedDong} 추천 제휴샵
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                {decodedDong} 전지역 30분 내 도착 가능한 100% 현장 정찰제 프리미엄 샵입니다.
              </p>
            </div>
          </div>

          {shuffledShops.map((shop) => (
            <article
              key={shop.id}
              className="bg-gradient-to-b from-[#141416] to-[#0d0d0f] border border-amber-500/25 hover:border-amber-500/60 transition-all duration-300 rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative group"
            >
              <div className="relative h-48 md:h-56 w-full overflow-hidden">
                <img
                  src={shop.image}
                  alt={`${decodedDong} ${shop.name}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-transparent to-black/30"></div>

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span
                    className={`text-[11px] font-black px-3 py-1 rounded-full shadow-lg ${shop.badgeColor}`}
                  >
                    {shop.badge}
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-7 -mt-6 relative z-10">
                <div className="mb-2">
                  <span className="text-xs text-amber-400/90 font-bold bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 inline-block mb-2">
                    📍 {districtName} {decodedDong} 전지역 신속 방문 테라피
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-black text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {shop.name}
                </h3>
                <p className="text-xs md:text-sm text-gray-300 mb-5 font-medium bg-black/40 p-3 rounded-xl border border-white/5">
                  {shop.desc}
                </p>

                <div className="bg-black/60 rounded-2xl p-4 mb-6 space-y-2.5 border border-white/5 shadow-inner">
                  <div className="text-[11px] text-amber-400 font-bold tracking-wider mb-1 uppercase">
                    💎 대표 코스 및 요금 안내
                  </div>
                  {shop.courses.map((course, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between text-xs md:text-sm items-center py-1.5 border-b border-white/5 last:border-0"
                    >
                      <span className="text-gray-200 flex items-center gap-2 font-medium">
                        {course.best && (
                          <span className="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded font-black">
                            BEST
                          </span>
                        )}
                        {course.name}
                      </span>
                      <span className="font-extrabold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
                        {course.price}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <a
                    href={`tel:${shop.phone}`}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black py-4 rounded-2xl text-xs md:text-sm transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] transform active:scale-95"
                  >
                    <span className="text-base">📞</span> 전화로 즉시예약
                  </a>
                  <a
                    href={`sms:${shop.phone}?body=${encodeURIComponent(
                      `${districtName} ${decodedDong} ${shop.name} 스웨디시/홈타이 예약 문의드립니다. (더스웨디시 보고 연락드렸어요)`
                    )}`}
                    className="flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-black py-4 rounded-2xl text-xs md:text-sm border border-white/10 transition-all hover:border-amber-500/40 transform active:scale-95 shadow-md"
                  >
                    <span className="text-base">💬</span> 간편 문자상담
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>

      <footer className="bg-[#030303] border-t border-white/10 py-10 text-center text-gray-500 text-xs mt-auto">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <p className="text-gray-400 font-bold">더스웨디시는 건전하고 안전한 1:1 방문 홈케어 테라피 정보 플랫폼입니다.</p>
          <p className="text-[11px] text-gray-600">COPYRIGHT &copy; THE SWEDISH ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}