export interface SiteSettings {
  companyName: string;
  registrationNum: string;
  publisher: string;
  editor: string;
  address: string;
  phone: string;
  email: string;
  footerDescription: string;
  brandSlogan: string;
}

export const FORMSPREE_URL = 'https://formspree.io/f/mqeqpaqa';

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  companyName: 'AI천안뉴스 • 기획사',
  registrationNum: '충남, 아00645',
  publisher: '김상균',
  editor: '김상균',
  address: '충청남도 천안시 동남구 버들로 1-4 (대흥동)',
  phone: '041-551-2752',
  email: 'asngguyn5@gmail.com',
  footerDescription: '지역경제 정보 등을 게재하여 충남도민의 알권리 증진과 삶의 질 개선에 기여하고 지역경제를 활성화하고자 함',
  brandSlogan: '천안 상균아놀자tv'
};