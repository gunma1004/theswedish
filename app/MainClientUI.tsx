"use client";

import { useState, useEffect } from "react";

// 서울·경기·인천 + 충청권(천안·아산·대전·청주) 전지역 데이터
const regionData: Record<
  string,
  { name: string; districts: Record<string, { name: string; dongs: string[] }> }
> = {
  seoul: {
    name: "서울특별시",
    districts: {
      gangnam: { name: "강남구", dongs: ["역삼동", "논현동", "삼성동", "대치동", "신사동", "청담동", "압구정동", "개포동", "일원동", "수서동", "도곡동", "자곡동", "세곡동"] },
      seocho: { name: "서초구", dongs: ["서초동", "잠원동", "반포동", "방배동", "양재동", "내곡동"] },
      songpa: { name: "송파구", dongs: ["잠실동", "신천동", "풍납동", "송파동", "석촌동", "삼전동", "가락동", "문정동", "장지동", "방이동", "오금동", "거여동", "마천동"] },
      gangdong: { name: "강동구", dongs: ["천호동", "강일동", "상일동", "명일동", "고덕동", "암사동", "성내동", "둔촌동", "길동"] },
      mapo: { name: "마포구", dongs: ["공덕동", "아현동", "도화동", "용강동", "대흥동", "염리동", "신수동", "서교동", "합정동", "망원동", "연남동", "성산동", "상암동"] },
      yongsan: { name: "용산구", dongs: ["후암동", "용산동", "남영동", "청파동", "원효로동", "효창동", "용문동", "이촌동", "이태원동", "한남동", "서빙고동", "보광동"] },
      yeongdeungpo: { name: "영등포구", dongs: ["영등포동", "여의도동", "당산동", "도림동", "문래동", "양평동", "신길동", "대림동"] },
      guro: { name: "구로구", dongs: ["신도림동", "구로동", "가리봉동", "고척동", "개봉동", "오류동", "항동", "수궁동"] },
      geumcheon: { name: "금천구", dongs: ["가산동", "독산동", "시흥동"] },
      gangseo: { name: "강서구", dongs: ["염창동", "등촌동", "화곡동", "가양동", "마곡동", "내발산동", "외발산동", "공항동", "방화동"] },
      yangcheon: { name: "양천구", dongs: ["목동", "신월동", "신정동"] },
      dongjak: { name: "동작구", dongs: ["노량진동", "상도동", "흑석동", "사당동", "대방동", "신대방동"] },
      gwanak: { name: "관악구", dongs: ["봉천동", "신림동", "남현동", "보라매동", "청룡동", "낙성대동", "대학동"] },
      seodaemun: { name: "서대문구", dongs: ["충정로동", "천연동", "북아현동", "신촌동", "연희동", "홍제동", "홍은동", "남가좌동", "북가좌동"] },
      jongno: { name: "종로구", dongs: ["청운동", "효자동", "사직동", "삼청동", "부암동", "평창동", "혜화동", "창신동", "숭인동", "종로1~4가동"] },
      jung: { name: "중구", dongs: ["소공동", "회현동", "명동", "필동", "장충동", "을지로동", "신당동", "다산동", "약수동", "황학동"] },
      seongdong: { name: "성동구", dongs: ["왕십리동", "마장동", "사근동", "행당동", "응봉동", "금호동", "옥수동", "성수동", "송정동", "용답동"] },
      gwangjin: { name: "광진구", dongs: ["중곡동", "능동", "구의동", "광장동", "자양동", "화양동", "군자동"] },
      dongdaemun: { name: "동대문구", dongs: ["신설동", "용두동", "제기동", "전농동", "답십리동", "장안동", "청량리동", "회기동", "이문동"] },
      jungnang: { name: "중랑구", dongs: ["면목동", "상봉동", "중화동", "묵동", "망우동", "신내동"] },
      seongbuk: { name: "성북구", dongs: ["성북동", "돈암동", "안암동", "보문동", "정릉동", "길음동", "종암동", "월곡동", "장위동", "석관동"] },
      gangbuk: { name: "강북구", dongs: ["미아동", "번동", "수유동", "우이동", "삼양동", "송중동", "송천동"] },
      dobong: { name: "도봉구", dongs: ["쌍문동", "방학동", "창동", "도봉동"] },
      nowon: { name: "노원구", dongs: ["월계동", "공릉동", "하계동", "중계동", "상계동"] },
      eunpyeong: { name: "은평구", dongs: ["녹번동", "불광동", "갈현동", "구산동", "대조동", "응암동", "역촌동", "신사동", "증산동", "수색동", "진관동"] }
    }
  },
  gyeonggi: {
    name: "경기도",
    districts: {
      suwon: { name: "수원시", dongs: ["인계동", "매탄동", "영통동", "광교동", "곡반정동", "권선동", "세류동", "호매실동", "금곡동", "화서동", "정자동", "조원동", "파장동"] },
      seongnam: { name: "성남시 (분당·판교)", dongs: ["정자동", "서현동", "야탑동", "이매동", "수내동", "구미동", "판교동", "삼평동", "백현동", "운중동", "신흥동", "태평동", "성남동", "상대원동"] },
      goyang: { name: "고양시 (일산·덕양)", dongs: ["백석동", "마두동", "장항동", "정발산동", "식사동", "탄현동", "주엽동", "대화동", "행신동", "화정동", "원흥동", "삼송동", "지축동"] },
      yongin: { name: "용인시 (수지·기흥·처인)", dongs: ["풍덕천동", "죽전동", "상현동", "성복동", "신갈동", "기흥동", "보정동", "동백동", "마북동", "김량장동", "역북동", "유방동"] },
      bucheon: { name: "부천시", dongs: ["중동", "상동", "심곡동", "원미동", "소사동", "역곡동", "송내동", "오정동", "원종동", "고강동"] },
      ansan: { name: "안산시", dongs: ["고잔동", "중앙동", "초지동", "선부동", "본오동", "사동", "이동", "일동", "와동", "월피동"] },
      anyang: { name: "안양시 (평촌·만안)", dongs: ["평촌동", "범계동", "비산동", "호계동", "관양동", "안양동", "석수동", "박달동"] },
      hwaseong: { name: "화성시 (동탄·향남)", dongs: ["동탄동", "병점동", "진안동", "반월동", "봉담읍", "향남읍", "남양읍", "새솔동"] },
      pyeongtaek: { name: "평택시 (고덕·송탄)", dongs: ["고덕동", "비전동", "동삭동", "세교동", "합정동", "서정동", "지산동", "송탄동", "안중읍", "포승읍"] },
      siheung: { name: "시흥시 (배곧·은계)", dongs: ["배곧동", "정왕동", "은계동", "대야동", "신천동", "은행동", "목감동", "장현동", "능곡동"] },
      gimpo: { name: "김포시 (한강신도시)", dongs: ["구래동", "장기동", "운양동", "마산동", "풍무동", "사우동", "걸포동", "고촌읍", "통진읍"] },
      paju: { name: "파주시 (운정)", dongs: ["운정동", "야당동", "동패동", "와동동", "금촌동", "문산읍", "조리읍"] },
      uijeongbu: { name: "의정부시", dongs: ["의정부동", "호원동", "장암동", "신곡동", "민락동", "낙양동", "금오동", "가능동"] },
      namyangju: { name: "남양주시 (다산·별내)", dongs: ["다산동", "별내동", "평내동", "호평동", "와부읍", "진접읍", "화도읍", "오남읍"] },
      hanam: { name: "하남시 (미사·위례)", dongs: ["미사동", "망월동", "풍산동", "덕풍동", "신장동", "감이동", "학암동", "위례동"] },
      gwangmyeong: { name: "광명시 (일직·철산)", dongs: ["철산동", "하안동", "소하동", "일직동", "광명동"] },
      gunpo: { name: "군포시 (산본)", dongs: ["산본동", "당동", "당정동", "부곡동", "금정동", "대야미동"] },
      gwangju_gy: { name: "광주시", dongs: ["경안동", "쌍령동", "송정동", "탄벌동", "태전동", "오포읍", "초월읍", "곤지암읍"] },
      icheon: { name: "이천시", dongs: ["창전동", "중리동", "증포동", "안흥동", "부발읍", "장호원읍"] },
      osan: { name: "오산시", dongs: ["원동", "궐동", "청학동", "오산동", "세교동", "수청동", "금암동"] },
      anseong: { name: "안성시", dongs: ["공도읍", "대덕면", "안성동", "당왕동", "아양동", "옥산동"] }
    }
  },
  incheon: {
    name: "인천광역시",
    districts: {
      yeonsu: { name: "연수구 (송도)", dongs: ["송도동", "옥련동", "연수동", "청학동", "동춘동", "선학동"] },
      namdong: { name: "남동구 (구월·논현)", dongs: ["구월동", "간석동", "만수동", "논현동", "서창동", "도림동"] },
      bupyeong: { name: "부평구", dongs: ["부평동", "산곡동", "청천동", "갈산동", "삼산동", "부개동", "십정동"] },
      seogu: { name: "서구 (청라·검단)", dongs: ["청라동", "검단동", "원당동", "당하동", "마전동", "가정동", "신현동", "석남동", "가좌동", "연희동", "경서동"] },
      michuhol: { name: "미추홀구 (주안)", dongs: ["주안동", "용현동", "학익동", "도화동", "숭의동", "관교동", "문학동"] },
      junggu: { name: "중구 (영종)", dongs: ["운서동", "중산동", "운남동", "영종동", "신포동", "동인천동", "연안동"] },
      gyeyang: { name: "계양구", dongs: ["계산동", "작전동", "효성동", "서운동", "임학동", "용종동"] }
    }
  },
  cheonan: {
    name: "천안시",
    districts: {
      seobuk: { name: "서북구 (불당·두정·성정)", dongs: ["불당동", "두정동", "성정동", "백석동", "쌍용동", "차암동", "성성동", "직산읍", "성거읍", "입장면"] },
      dongnam: { name: "동남구 (신부·청수)", dongs: ["신부동", "청수동", "청당동", "원성동", "봉명동", "신방동", "목천읍", "풍세면", "병천면"] }
    }
  },
  asan: {
    name: "아산시",
    districts: {
      asan_main: { name: "아산시 전역 (배방·탕정·온양)", dongs: ["배방읍", "탕정면", "온천동", "모종동", "풍기동", "용화동", "신창면", "음봉면", "둔포면"] }
    }
  },
  daejeon: {
    name: "대전광역시",
    districts: {
      yuseong: { name: "유성구 (봉명·도안·관평)", dongs: ["봉명동", "상대동", "도안동", "장대동", "궁동", "어은동", "노은동", "지족동", "반석동", "관평동", "전민동", "원내동"] },
      seo: { name: "서구 (둔산·월평·탄방)", dongs: ["둔산동", "탄방동", "월평동", "만년동", "갈마동", "괴정동", "용문동", "가장동", "변동", "도마동", "정림동", "가수원동", "관저동"] },
      jung: { name: "중구 (은행·선화·오류)", dongs: ["은행동", "선화동", "대흥동", "문창동", "옥계동", "대사동", "부사동", "용두동", "오류동", "태평동", "유천동", "문화동", "산성동"] },
      dong: { name: "동구 (용전·가양)", dongs: ["용전동", "가양동", "자양동", "가오동", "판암동", "홍도동", "삼성동", "성남동", "인동", "효동", "신안동"] },
      daedeok: { name: "대덕구 (송촌·신탄진)", dongs: ["송촌동", "중리동", "법동", "비래동", "오정동", "신탄진동", "석봉동", "목상동", "덕암동"] }
    }
  },
  cheongju: {
    name: "청주시",
    districts: {
      heungdeok: { name: "흥덕구 (복대·가경·오송)", dongs: ["복대동", "가경동", "봉명동", "송절동", "강서동", "비하동", "오송읍", "옥산면"] },
      seowon: { name: "서원구 (산남·분평)", dongs: ["산남동", "분평동", "수곡동", "성화동", "개신동", "모충동", "사직동", "사창동", "남이면", "현도면"] },
      cheongwon: { name: "청원구 (율량·오창)", dongs: ["율량동", "주성동", "우암동", "내덕동", "오창읍", "내수읍", "북이면"] },
      sangdang: { name: "상당구 (용암·금천)", dongs: ["용암동", "금천동", "탑동", "대성동", "영운동", "용담동", "방서동", "동남지구", "문의면", "가덕면"] }
    }
  }
};

// 5개 제휴업체 데이터
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
  }
];

export default function MainClientUI() {
  const [selectedRegion, setSelectedRegion] = useState("seoul");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedDong, setSelectedDong] = useState("");
  
  // 새로고침 시 무작위(랜덤) 셔플 상태 관리
  const [shuffledShops, setShuffledShops] = useState(initialShops);

  useEffect(() => {
    // Fisher-Yates 셔플 알고리즘으로 페이지 로드 시 무작위 정렬
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
      ? `/${selectedRegion}/${selectedDistrict}/${selectedDong}`
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
        
        {/* 메인 히어로 섹션 */}
        <section className="text-center my-2">
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

          {/* 지역 선택 검색 박스 */}
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

        {/* 추천 제휴 업체 리스트 (새로고침 시 랜덤 정렬) */}
        <section className="space-y-6">
          <div className="flex justify-between items-end mb-4 px-2">
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
                <span>🏆</span> 더스웨디시 추천 프리미엄 제휴샵
              </h2>
              <p className="text-xs text-gray-400 mt-1">철저한 위생 관리와 검증된 실력을 갖춘 안심 홈케어 테라피입니다.</p>
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
                    <div key={idx} className="flex justify-between text-xs md:text-sm items-center py-1.5 border-b border-white/5 last:border-0">
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
                    href={`sms:${shop.phone}?body=${encodeURIComponent(`${shop.name} 예약 문의드립니다. (더스웨디시 보고 연락드렸어요)`)}`} 
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