# GPT-5.6 Benchmark Report

GPT-5.6 Sol, Terra, Luna를 GPT-5.5, Claude Fable 5, Claude Opus 4.8과 비교하는 정적 웹사이트입니다.

## 실행

별도 빌드 과정이나 외부 라이브러리가 필요하지 않습니다.

로컬 실행:

```bash
python -m http.server 8000
```

브라우저에서 다음 주소를 엽니다.

```text
http://localhost:8000
```

## GitHub Pages 배포

1. 저장소의 기본 브랜치를 `main`으로 설정합니다.
2. 저장소의 `Settings`에서 `Pages`를 엽니다.
3. `Source`를 `GitHub Actions`로 선택합니다.
4. `main` 브랜치에 푸시하면 포함된 워크플로가 사이트를 배포합니다.

## 구조

```text
.
├── .github
│   └── workflows
│       └── deploy-pages.yml
├── css
│   ├── base.css
│   ├── components.css
│   ├── layout.css
│   ├── print.css
│   └── responsive.css
├── js
│   ├── data
│   │   ├── benchmarks.js
│   │   ├── models.js
│   │   └── sources.js
│   ├── features
│   │   ├── benchmark-chart.js
│   │   ├── benchmark-selectors.js
│   │   ├── benchmark-table.js
│   │   ├── cost-calculator.js
│   │   ├── print.js
│   │   └── source-list.js
│   ├── state
│   │   └── chart-state.js
│   ├── utils
│   │   ├── dom.js
│   │   └── format.js
│   ├── app.js
│   └── config.js
├── .nojekyll
├── index.html
└── README.md
```

## 구성

- 벤치마크 선택과 기준 모델 변경
- 모델별 SVG 막대그래프
- 벤치마크 전체 표와 검색
- 입력 및 출력 토큰 비용 계산
- 공식 출처 목록
- 데스크톱, 태블릿, 모바일 반응형 구성
- 인쇄 및 PDF 저장 전용 스타일

## 데이터 수정

벤치마크 수치는 `js/data/benchmarks.js`, 모델 사양과 가격은 `js/data/models.js`, 공식 출처는 `js/data/sources.js`에서 관리합니다.

## 기술 구성

- HTML5
- CSS3
- JavaScript ES Modules
- 외부 프레임워크 및 빌드 도구 없음
