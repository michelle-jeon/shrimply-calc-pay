# 💰 세후 급여 계산기

복잡한 세금 및 보험료 체계를 고려한 세후 급여 계산 서비스입니다.

🌐 Live Demo
**[🚀 바로 사용해보기](https://shrimply-calc-pay.vercel.app)**

## ✨ 주요 기능

- **정확한 세후 급여 계산**: 소득세, 지방소득세, 국민연금, 건강보험료, 고용보험료, 장기요양보험료를 모두 고려
- **실시간 계산**: 입력값 변경 시 즉시 결과 확인
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 환경에서 최적화된 사용자 경험
- **직관적인 UI**: 깔끔하고 사용하기 쉬운 인터페이스
- **계산 결과 저장**: pdf로 다운로드하여 실제 급여명세서처럼 사용가능

## 🛠️ 기술 스택

- **Frontend**: React 18 + TypeScript
- **빌드 도구**: Vite
- **스타일링**: Styled Components
- **배포**: Vercel
- **언어**: TypeScript

## 🚀 시작하기

### 필요 조건
- Node.js 18+ 
- npm

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/michelle-jeon/shrimply-calc-pay.git

# 프로젝트 디렉토리로 이동
cd shrimply-calc-pay

# 의존성 설치
npm install
# 또는
yarn install

# 개발 서버 실행
npm run dev
```

개발 서버가 실행되면 `http://localhost:5173`에서 확인할 수 있습니다.

## 📦 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

Vercel을 통해 자동 배포가 설정되어 있습니다.

## 🧮 계산 방식

### 포함된 세금 및 보험료
- **소득세**: 과세표준에 따른 누진세율 적용
- **지방소득세**: 소득세의 10%
- **국민연금**: 월 소득의 4.5% (상한액 적용)
- **건강보험료**: 월 소득의 3.545%
- **장기요양보험료**: 건강보험료의 12.95%
- **고용보험료**: 월 소득의 0.9%

### 소득공제
- 기본공제, 근로소득공제 등 주요 공제항목 반영

## 📁 프로젝트 구조

```
src/
├── assets/             # 이미지 등 에셋
├── components/         # 재사용 가능한 UI 컴포넌트
├── data/               # 간이세액표 등 json 데이터
├── pages/              # root 페이지 레이아웃
├── styles/             # 글로벌 스타일 및 테마
└── App.tsx             # 메인 애플리케이션 컴포넌트
```

## 🎯 사용법

1. **기본급 및 수당 입력**: 세전 월 급여를 입력하세요
2. **(상용직) 공제 선택**: 직원에게 적용 중인 공제 항목을 선택하세요
3. **(상용직) 기준소득월액 입력**: 국민연금 및 고용보험 가입 시 입력한 기준소득월액을 입력하세요 (미입력시 현재 기본급 기준 계산)
3. **결과 확인**: 세후 급여와 각종 공제액을 자동으로 계산하여 표시합니다

## 🔧 개발

### 사용된 주요 라이브러리
- **React**: 사용자 인터페이스 구축
- **TypeScript**: 타입 안전성 보장
- **Styled Components**: CSS-in-JS 스타일링
- **Vite**: 빠른 개발 환경 및 번들링

### 코드 스타일
- ESLint + Prettier 설정으로 일관된 코드 스타일 유지
- TypeScript strict 모드 활성화

## 📝 라이선스

MIT License - 자유롭게 사용, 수정, 배포할 수 있습니다.

## 🤝 기여하기

버그 리포트, 기능 제안, Pull Request 모두 환영합니다!

1. 이 저장소를 Fork 하세요
2. 기능 브랜치를 생성하세요 (`git checkout -b feature/AmazingFeature`)
3. 변경사항을 커밋하세요 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 Push 하세요 (`git push origin feature/AmazingFeature`)
5. Pull Request를 생성하세요

## ⚠️ 주의사항

본 계산기는 참고용으로 제작되었으며, 실제 급여와 차이가 있을 수 있습니다. 정확한 세후 급여는 고용주나 세무 전문가에게 문의하시기 바랍니다.

---

Made with ❤️ by [전미경] (개발) & [이혜민] (기획/디자인)