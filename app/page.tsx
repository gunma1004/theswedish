"use client";

import { useState, useEffect } from "react";
import { regionData } from "@/data/regions";// 만약 에러 시 '@/data/regions' 로 변경

// 🎯 5개 정식 제휴업체 데이터
const initialShops = [
  {
    id: 1,
    name: "✨ 한국미인테라피",
    location: "서울·경기·인천·충청권 전지역 (실시간 신속 방문)",
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
    location: "수도권 및 천안·아산·대전·청주 전지역",
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
    location: "서울·경기·인천 전지역 상시 신속 방문",
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
    location: "서울·경기·인천·대전·충청 전지역",
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
    location: "수도권 및 충청 전지역 30분 내 방문",
    desc: "🚀 100% 현장 정찰제! 수도권 및 충청권 전지역 평균 30분 내 신속 방문 보장",
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

export default function HomePage() {
  const [selectedRegion, setSelectedRegion] = useState("seoul");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedDong, setSelectedDong] = useState("");

  // 새로고침 시 무작위(랜덤) 셔플
  const [shuffledShops, setShuffledShops] = useState(initialShops);

  useEffect(() => {
    const shuffled = [...initialShops].sort(() => Math.random() - 0.5);
    setShuffledShops(shuffled);
  }, []);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
    setSelectedDistrict("");
    setSelectedDong("");
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
    setSelectedDong("");
  };

  const handleSearch = () => {
    if (!selectedDistrict) {
      alert("원하시는 구/시/군 지역을 먼저 선택해주세요!");
      return;
    }
    const targetUrl = selectedDong
      ? `/${selectedRegion}/${selectedDistrict}/${encodeURIComponent(selectedDong)}`
      : `/${selectedRegion}/${selectedDistrict}`;
    window.location.href = targetUrl;
  };

  const currentDistricts = regionData[selectedRegion]?.districts || {};
  const currentDongs =
    selectedDistrict && currentDistricts[selectedDistrict]
      ? currentDistricts[selectedDistrict].dongs
      : [];

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* 상단 헤더 */}
      <header className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-amber-500/20 px-4 py-3.5 shadow-[0_4px_20px_rgba(245,158,11,0.08)]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-black text-xl shadow-[0_0_15px_rgba(245,158,11,0.4)] group-hover:scale-105 transition-transform">
              TS
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                더스웨디시
              </span>
              <span className="text-[10px] text-gray-400 tracking-tight uppercase font-medium">
                THE SWEDISH &middot; 수도권 &middot; 충청권 프리미엄 홈케어
              </span>
            </div>
          </a>

          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
            <span className="text-xs px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 border border-amber-500/30 font-bold shadow-inner">
              ✨ 24시 실시간 방문예약
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1">
        {/* 메인 배너 및 안내 섹션 */}
        <section className="text-center my-2">
          {/* 📍 상단 메인 배너 이미지 */}
          <div className="mb-6 overflow-hidden rounded-3xl border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.15)] relative w-full">
            <img
              src="/my-banner.png"
              alt="더스웨디시 메인 배너"
              className="w-full h-auto object-cover block"
            />
          </div>

          <div className="mb-6 py-6 px-4 rounded-3xl bg-gradient-to-b from-[#121214] to-[#0a0a0c] border border-amber-500/20 text-center shadow-lg relative overflow-hidden">
            <span className="inline-block text-xs font-bold text-amber-400 tracking-widest uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mb-3">
              Premium Swedish & Home Thai Platform
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              내 공간에서 누리는 가장 완벽한 힐링 <br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                더스웨디시 (The Swedish)
              </span>
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
              서울 · 경기 · 인천 · 천안 · 아산 · 대전 · 청주 전 지역 <br />
              스웨디시마사지 &middot; 홈타이 &middot; 방문아로마마사지 엄선 제휴 샵 실시간 연결
            </p>
          </div>

          {/* 3단계 지역 선택 검색 박스 */}
          <div className="bg-gradient-to-b from-[#18181b] to-[#0f0f11] border-2 border-amber-500/40 p-6 rounded-3xl max-w-xl mx-auto mb-14 shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none"></div>

            <div className="flex items-center justify-between mb-4">
              <label className="text-xs text-amber-400 font-black uppercase tracking-wider flex items-center gap-1.5">
                📍 내 주변 제휴업체 찾기
              </label>
              <span className="text-[11px] text-gray-400 bg-black/40 px-2.5 py-1 rounded-lg border border-white/5">
                수도권 &middot; 충청권 전지역 대기
              </span>
            </div>

            <div className="space-y-3.5">
              <div>
                <span className="text-[11px] text-gray-400 block mb-1 font-semibold">1단계: 시·도 선택</span>
                <select
                  value={selectedRegion}
                  onChange={handleRegionChange}
                  className="bg-black/80 text-sm text-white w-full outline-none cursor-pointer font-bold p-3.5 rounded-xl border border-amber-500/30 focus:border-amber-400 transition-colors shadow-inner"
                >
                  {Object.keys(regionData).map((key) => (
                    <option key={key} value={key} className="bg-[#1e1e1e] text-white">
                      {regionData[key].name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="text-[11px] text-gray-400 block mb-1 font-semibold">2단계: 구·시·군 선택</span>
                <select
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  className="bg-black/80 text-sm text-white w-full outline-none cursor-pointer font-bold p-3.5 rounded-xl border border-amber-500/30 focus:border-amber-400 transition-colors shadow-inner"
                >
                  <option value="" className="bg-[#1e1e1e] text-gray-400">구 / 시 / 군을 선택해주세요</option>
                  {Object.keys(currentDistricts).map((dKey) => (
                    <option key={dKey} value={dKey} className="bg-[#1e1e1e] text-white">
                      {currentDistricts[dKey].name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="text-[11px] text-gray-400 block mb-1 font-semibold">3단계: 읍·면·동 선택 (선택사항)</span>
                <select
                  value={selectedDong}
                  onChange={(e) => setSelectedDong(e.target.value)}
                  disabled={!selectedDistrict}
                  className="bg-black/80 text-sm text-white w-full outline-none cursor-pointer font-medium p-3.5 rounded-xl border border-amber-500/30 disabled:opacity-30 transition-colors shadow-inner"
                >
                  <option value="" className="bg-[#1e1e1e] text-gray-400">동 전체 보기 (빠른 검색)</option>
                  {currentDongs.map((dong, idx) => (
                    <option key={idx} value={dong} className="bg-[#1e1e1e] text-white">
                      {dong}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSearch}
                className="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black font-black py-4 rounded-2xl text-sm transition-all shadow-[0_0_25px_rgba(245,158,11,0.4)] mt-3 cursor-pointer transform active:scale-[0.98]"
              >
                🚀 내 주변 테라피 제휴샵 확인하기
              </button>
            </div>
          </div>
        </section>

        {/* 추천 제휴 업체 리스트 */}
        <section className="space-y-6">
          <div className="flex justify-between items-end mb-4 px-2">
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
                <span>🏆</span> 더스웨디시 추천 프리미엄 제휴샵
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                철저한 위생 관리와 검증된 실력을 갖춘 안심 홈케어 테라피입니다.
              </p>
            </div>
          </div>

          {shuffledShops.map((shop) => (
            <article
              key={shop.id}
              className="bg-gradient-to-b from-[#141416] to-[#0d0d0f] border border-amber-500/20 hover:border-amber-500/60 transition-all duration-300 rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative group"
            >
              <div className="relative h-48 md:h-56 w-full overflow-hidden">
                <img
                  src={shop.image}
                  alt={shop.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-transparent to-black/30"></div>

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className={`text-[11px] px-3 py-1 rounded-full shadow-lg ${shop.badgeColor}`}>
                    {shop.badge}
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-7 -mt-6 relative z-10">
                <div className="mb-2">
                  <span className="text-xs text-amber-400/90 font-bold bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 inline-block mb-2">
                    📍 {shop.location}
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
                      `${shop.name} 예약 문의드립니다. (더스웨디시 보고 연락드렸어요)`
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

      {/* 하단 푸터 */}
      <footer className="bg-[#030303] border-t border-white/10 py-10 text-center text-gray-500 text-xs mt-auto">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <p className="text-gray-400 font-bold">더스웨디시는 건전하고 품격 있는 1:1 방문 홈케어 테라피 정보 플랫폼입니다.</p>
          <p className="text-[11px] text-gray-500">
            서비스 가능 지역: 서울특별시 &middot; 경기도 &middot; 인천광역시 &middot; 천안시 &middot; 아산시 &middot; 대전광역시 &middot; 청주시
          </p>
          <p className="text-[11px] text-gray-600">COPYRIGHT &copy; THE SWEDISH ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}