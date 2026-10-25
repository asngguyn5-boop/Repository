import React, { useState } from 'react';
import { INITIAL_SITE_SETTINGS, FORMSPREE_URL } from './constants';

export const App: React.FC = () => {
  const [siteSettings] = useState(INITIAL_SITE_SETTINGS);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, phone, message, submittedAt: new Date().toLocaleString() })
      });
      alert('성공적으로 접수되었습니다.');
      setName(''); setPhone(''); setMessage('');
    } catch (err) {
      alert('전송에 실패했습니다. 전화로 문의해 주세요.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-300 p-6 flex flex-col justify-between">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        <header className="border-b border-zinc-800 pb-6">
          <span className="text-xs text-blue-500 font-bold tracking-widest uppercase">INDEPENDENT MEDIA PLATFORM</span>
          <h1 className="text-4xl font-extrabold text-white mt-1">{siteSettings.companyName}</h1>
          <p className="text-sm text-zinc-400 mt-2">{siteSettings.footerDescription}</p>
        </header>

        <section className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-4">
          <h2 className="text-xl font-bold text-white">독자 제보 및 영상·드론 촬영 접수</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-zinc-400 mb-1">성함 / 단체명</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white" placeholder="홍길동" />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">연락처</label>
              <input type="text" value={phone} onChange={e => setPhone(e.target.value)} required className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white" placeholder="010-0000-0000" />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1">문의 내용 / 제보 내용</label>
              <textarea value={message} onChange={e => setMessage(e.target.value)} required rows={4} className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white" placeholder="상세한 내용을 입력해 주세요." />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition">발행인에게 즉시 전송하기</button>
          </form>
        </section>
      </div>

      <footer className="max-w-4xl mx-auto w-full border-t border-zinc-800 pt-6 mt-12 text-xs text-zinc-500 space-y-1">
        <p>제호: {siteSettings.companyName} | 등록번호: {siteSettings.registrationNum} | 등록일자: 2026년 02월 12일</p>
        <p>발행인·편집인: {siteSettings.publisher} | 주소: {siteSettings.address} | 전화번호: {siteSettings.phone}</p>
        <p className="mt-2 text-zinc-600">Copyright © AI천안뉴스·기획사 All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;