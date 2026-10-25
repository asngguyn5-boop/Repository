import React, { useState, useEffect } from 'react';
import { INITIAL_SITE_SETTINGS, FORMSPREE_URL, REPRESENTATIVE_PROFILE } from './constants';

export const App: React.FC = () => {
  const [siteSettings] = useState(INITIAL_SITE_SETTINGS);
  const [activeTab, setActiveTab] = useState<'home' | 'reception' | 'profile'>('home');

  // 접수 폼 상태값
  const [formType, setFormType] = useState('독자 기사 제보');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    document.title = `${siteSettings.companyName} - ${siteSettings.brandSlogan}`;
  }, [siteSettings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          type: formType,
          name,
          phone,
          message,
          submittedAt: new Date().toLocaleString()
        })
      });
      alert('성공적으로 접수되었습니다. 확인 후 신속히 연락드리겠습니다.');
      setName(''); setPhone(''); setMessage('');
    } catch (err) {
      alert('전송 중 오류가 발생했습니다. 전화(041-551-2752)로 문의해 주세요.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans flex flex-col justify-between">
      {/* ── 상단 네비게이션 헤더 ── */}
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <span className="text-xs text-blue-500 font-extrabold tracking-widest uppercase">INDEPENDENT MEDIA PLATFORM</span>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-black text-white cursor-pointer" onClick={() => setActiveTab('home')}>
                {siteSettings.companyName}
              </h1>
              <span className="text-xs bg-blue-600/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded font-bold">공식 인터넷신문</span>
            </div>
          </div>
          
          <nav className="flex items-center gap-2">
            <button 
              onClick={() => setActiveTab('home')} 
              className={`px-4 py-2 rounded-xl text-sm font-bold transition ${activeTab === 'home' ? 'bg-blue-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:text-white'}`}>
              뉴스 홈
            </button>
            <button 
              onClick={() => setActiveTab('reception')} 
              className={`px-4 py-2 rounded-xl text-sm font-bold transition ${activeTab === 'reception' ? 'bg-blue-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:text-white'}`}>
              제보 / 촬영 접수
            </button>
            <button 
              onClick={() => setActiveTab('profile')} 
              className={`px-4 py-2 rounded-xl text-sm font-bold transition ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:text-white'}`}>
              발행인 프로필
            </button>
          </nav>
        </div>
      </header>

      {/* ── 메인 콘텐츠 영역 ── */}
      <main className="max-w-6xl mx-auto px-4 py-8 w-full flex-grow">
        {/* TAB 1: 뉴스 홈 메인 화면 */}
        {activeTab === 'home' && (
          <div className="space-y-12">
            {/* 히어로 헤드라인 섹션 */}
            <section className="bg-gradient-to-br from-zinc-900 to-black p-8 rounded-3xl border border-zinc-800 relative overflow-hidden">
              <div className="max-w-2xl relative z-10 space-y-4">
                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">THE HEADLINE REPORT</span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                  지역 주민의 목소리를 담는 공정한 미디어
                </h2>
                <p className="text-zinc-400 text-base leading-relaxed">
                  {siteSettings.footerDescription} AI천안뉴스는 천안과 충남 지역의 다양한 소식을 빠르고 정확하게 전달합니다.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button onClick={() => setActiveTab('reception')} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold transition">
                    영상 · 드론 촬영 및 기사 제보하기 ➔
                  </button>
                  <a href={REPRESENTATIVE_PROFILE.blogUrl} target="_blank" rel="noreferrer" className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-2xl font-bold transition">
                    네이버 블로그 바로가기
                  </a>
                </div>
              </div>
            </section>

            {/* 주요 카테고리 뉴스 그리드 */}
            <section className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
                주요 서비스 및 제보 안내
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-zinc-900/60 p-6 rounded-2xl border border-zinc-800 space-y-3">
                  <div className="text-blue-500 font-bold text-lg">📹 영상 촬영 · 편집</div>
                  <p className="text-sm text-zinc-400">지역 행사, 홍보 영상, 유튜브 콘텐츠 기획 및 전문 영상 편집 지원</p>
                  <button onClick={() => { setFormType('영상촬영 편집 문의'); setActiveTab('reception'); }} className="text-xs text-blue-400 font-bold hover:underline">신청하기 ➔</button>
                </div>
                <div className="bg-zinc-900/60 p-6 rounded-2xl border border-zinc-800 space-y-3">
                  <div className="text-blue-500 font-bold text-lg">🚁 드론 항공 촬영</div>
                  <p className="text-sm text-zinc-400">1종 드론 자격 보유 전문가의 초고화질 조감도, 부동산, 행사 드론 비행 촬영</p>
                  <button onClick={() => { setFormType('드론 항공 촬영 문의'); setActiveTab('reception'); }} className="text-xs text-blue-400 font-bold hover:underline">신청하기 ➔</button>
                </div>
                <div className="bg-zinc-900/60 p-6 rounded-2xl border border-zinc-800 space-y-3">
                  <div className="text-blue-500 font-bold text-lg">📰 1인 언론 미디어</div>
                  <p className="text-sm text-zinc-400">천안 지역 소상공인 홍보, 환경 감시, 시민들의 목소리를 전하는 뉴스 보도</p>
                  <button onClick={() => { setFormType('독자 기사 제보'); setActiveTab('reception'); }} className="text-xs text-blue-400 font-bold hover:underline">제보하기 ➔</button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: 고객 접수 센터 */}
        {activeTab === 'reception' && (
          <section className="max-w-2xl mx-auto bg-zinc-900 p-8 rounded-3xl border border-zinc-800 space-y-6">
            <h2 className="text-2xl font-bold text-white">독자 제보 및 촬영 문의 접수</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">접수 항목 선택</label>
                <select value={formType} onChange={e => setFormType(e.target.value)} className="w-full bg-black border border-zinc-700 rounded-xl p-3 text-white">
                  <option value="독자 기사 제보">독자 기사 제보</option>
                  <option value="영상촬영 편집 문의">영상촬영 및 편집 문의</option>
                  <option value="드론 항공 촬영 문의">드론 항공 촬영 문의</option>
                  <option value="소상공인 홍보 문의">소상공인 홍보 문의</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">성함 / 단체명</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-black border border-zinc-700 rounded-xl p-3 text-white" placeholder="홍길동" />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">연락처</label>
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} required className="w-full bg-black border border-zinc-700 rounded-xl p-3 text-white" placeholder="010-0000-0000" />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">문의 내용</label>
                <textarea value={message} onChange={e => setMessage(e.target.value)} required rows={5} className="w-full bg-black border border-zinc-700 rounded-xl p-3 text-white" placeholder="상세한 내용을 적어주세요." />
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition">
                발행인에게 실시간 전송하기
              </button>
            </form>
          </section>
        )}

        {/* TAB 3: 발행인 프로필 */}
        {activeTab === 'profile' && (
          <section className="max-w-3xl mx-auto bg-zinc-900 p-8 rounded-3xl border border-zinc-800 space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <img src={REPRESENTATIVE_PROFILE.imageUrl} alt={REPRESENTATIVE_PROFILE.name} className="w-36 h-48 object-cover rounded-2xl border border-zinc-700" />
              <div className="space-y-2 text-center md:text-left">
                <span className="text-xs text-blue-400 font-bold uppercase">{REPRESENTATIVE_PROFILE.title}</span>
                <h2 className="text-3xl font-extrabold text-white">{REPRESENTATIVE_PROFILE.name}</h2>
                <p className="text-sm text-zinc-400 leading-relaxed">{REPRESENTATIVE_PROFILE.description}</p>
              </div>
            </div>

            <div className="border-t border-zinc-800 pt-6 space-y-3">
              <h4 className="text-sm font-bold text-white">주요 경력 및 사회 활동</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-zinc-400">
                {REPRESENTATIVE_PROFILE.careers.map((item, idx) => (
                  <li key={idx} className="bg-black/50 p-3 rounded-xl border border-zinc-800/80">
                    • {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>

      {/* ── 하단 법적 공시 푸터 (인터넷신문사업 등록 정보) ── */}
      <footer className="border-t border-zinc-800 bg-zinc-950 py-8 text-xs text-zinc-500">
        <div className="max-w-6xl mx-auto px-4 space-y-2">
          <div className="font-bold text-zinc-400 text-sm">{siteSettings.companyName}</div>
          <p>제호: {siteSettings.companyName} | 등록번호: {siteSettings.registrationNum} | 등록일자: {siteSettings.registrationDate}</p>
          <p>발행인·편집인: {siteSettings.publisher} | 청소년보호책임자: {siteSettings.youthProtectionOfficer}</p>
          <p>주소: {siteSettings.address} | 전화번호: {siteSettings.phone} | 이메일: {siteSettings.email}</p>
          <p className="pt-2 text-zinc-600">Copyright © {siteSettings.companyName} All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;