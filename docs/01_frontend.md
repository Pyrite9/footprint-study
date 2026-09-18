# 발자국 학습 계획 — 프론트엔드 (09.18 ~ 10.16)

먼저 `00_common.md`를 읽습니다. 1주차에는 공통 할 일과 아래 1주차를 함께 합니다.

프론트엔드는 발자국의 화면을 만듭니다. 과제 목록, 역할 배정, 산출물 업로드, 동료평가 화면이 여기에 속합니다.

---

## 1주차 (09.18 ~ 09.27) — HTML과 CSS

**왜 배우는가**
React가 화면에 그리는 것은 결국 HTML과 CSS입니다. 발자국의 화면은 세 가지로 이루어져 있습니다. 목록(과제 목록, 파일 목록), 입력 양식(과제 생성, 평가 입력), 좌우 배치(왼쪽 근거 패널과 오른쪽 평가 입력)입니다. 이 세 가지를 HTML과 CSS로 만들 수 있으면 모든 화면의 뼈대를 만들 수 있습니다.

### 환경 확인

- [ ] Node.js 버전을 확인합니다. 터미널에서 `node -v`를 실행합니다. `v24`로 시작해야 합니다. 다른 버전이거나 없으면 Node.js 24 LTS를 설치합니다. 팀 전체가 24로 통일합니다.
  - 찾아볼 것: `node.js 24 lts download`
- [ ] Vite로 React 프로젝트를 만들고 실행합니다. 저장소 밖의 아무 폴더에 만듭니다. 브라우저에 기본 화면이 보이면 됩니다. 실행만 확인하고 제출하지 않습니다.
  - 찾아볼 것: `vite getting started`, 명령어 `npm create vite@latest`
- [ ] VS Code 확장 Live Server를 설치합니다. 2주차에 씁니다.
  - 찾아볼 것: `vscode live server`

### 할 일

- [ ] HTML 문서의 기본 구조를 만듭니다.
  - 찾아볼 것: `MDN HTML basics`
- [ ] header, main, section, ul, li 태그로 화면을 나눕니다.
  - 찾아볼 것: `MDN semantic HTML`
- [ ] form, label, input, button으로 입력 양식을 만듭니다.
  - 찾아볼 것: `MDN your first form`
- [ ] CSS 선택자와 box model(margin, border, padding)을 읽습니다.
  - 찾아볼 것: `MDN CSS box model`
- [ ] flex로 요소를 가로로 배치합니다.
  - 찾아볼 것: `MDN flexbox`, `flexbox froggy`(연습 게임)

**제출물:** 과제 목록 정적 페이지. 과제 3개(과제명, 기간)가 보이고, 아래에 추가 양식이 있습니다. 버튼은 동작하지 않아도 됩니다.

※ 용어 — 태그: HTML에서 화면 요소를 나타내는 표시(`<ul>`, `<form>` 등) · 선택자: CSS에서 꾸밀 대상을 고르는 방법 · box model: 요소의 안쪽 여백, 테두리, 바깥 여백 구조 · flex: 요소를 가로 또는 세로로 배치하는 CSS 기능 · 정적 페이지: 눌러도 내용이 바뀌지 않는 페이지

---

## 2주차 (09.28 ~ 10.04) — JavaScript

**왜 배우는가**
React는 JavaScript로 씁니다. React 코드의 대부분은 두 가지 일입니다. 배열을 목록으로 바꾸는 일(map)과, 버튼과 양식에 반응하는 일(이벤트)입니다. 이번 주에는 데이터가 바뀔 때 화면을 직접 다시 그리는 코드를 씁니다. 3주차에 React가 이 일을 어떻게 대신해 주는지 비교하게 됩니다. fetch는 서버에서 데이터를 가져오는 방법입니다. 발자국의 모든 화면은 fetch로 데이터를 받아 오면서 시작합니다.

- [ ] 변수, 함수, 조건문, 반복문을 익힙니다.
  - 찾아볼 것: javascript.info 1부 "JavaScript 기본"
- [ ] 객체와 배열을 익힙니다.
  - 찾아볼 것: `javascript.info object`, `javascript.info array`
- [ ] 배열의 map을 씁니다.
  - 찾아볼 것: `javascript.info array methods`의 map 부분
- [ ] JavaScript로 화면 요소를 찾고 새로 만듭니다.
  - 찾아볼 것: `querySelector`, `createElement`, `javascript.info document`
- [ ] 버튼 클릭과 양식 제출을 처리합니다.
  - 찾아볼 것: `addEventListener`, `submit event preventDefault`
- [ ] `tasks.json` 파일을 만들고 fetch로 읽습니다. fetch 예시 코드를 복사해서 주소만 바꿔도 됩니다. 자세한 원리는 4주차에 다시 봅니다.
  - 찾아볼 것: `javascript.info fetch`
  - 페이지는 Live Server로 엽니다. 파일을 직접 열면 fetch가 동작하지 않습니다.

**제출물:** `tasks.json`을 읽어서 목록을 표시합니다. 양식을 제출하면 목록에 항목이 추가됩니다. 새로고침하면 사라져도 됩니다.

**10.04 확인:** 이 제출물을 보고 동료평가 화면 담당자를 정합니다.

※ 용어 — 객체: 이름과 값을 묶은 데이터(`{ title: "과제1" }`) · 배열: 여러 값을 순서대로 담은 데이터 · map: 배열의 각 항목을 다른 모양으로 바꾸는 기능 · DOM: JavaScript가 다루는 화면 요소의 구조 · 이벤트: 클릭이나 제출처럼 사용자가 일으키는 일 · fetch: 서버나 파일에서 데이터를 가져오는 기능

---

## 3주차 (10.05 ~ 10.11) — React 기초

**왜 배우는가**
2주차에는 데이터가 바뀔 때마다 화면을 직접 다시 그렸습니다. React에서는 데이터(state)만 바꾸면 화면이 알아서 다시 그려집니다. 같은 페이지를 React로 다시 만들면서 이 차이를 확인합니다. 발자국의 모든 화면은 컴포넌트와 state로 만듭니다.

- [ ] `members/영문이름/week3/` 안에 Vite로 React 프로젝트를 새로 만듭니다. 방법은 1주차 환경 확인과 같습니다.
- [ ] react.dev의 "빠르게 시작하기(Quick Start)"를 따라 합니다.
- [ ] 컴포넌트를 나누고 props로 값을 넘깁니다.
  - 찾아볼 것: `react.dev passing props to a component`
- [ ] useState로 값을 저장하고 바꿉니다.
  - 찾아볼 것: `react.dev state a component's memory`
- [ ] 배열을 목록으로 그립니다. key를 넣습니다.
  - 찾아볼 것: `react.dev rendering lists`
- [ ] 조건에 따라 다른 화면을 그립니다.
  - 찾아볼 것: `react.dev conditional rendering`
- [ ] input 값을 state와 연결합니다.
  - 찾아볼 것: `react controlled input`

**제출물:** 2주차 페이지를 React로 다시 만듭니다. 컴포넌트는 2개 이상(TaskList, TaskForm)으로 나눕니다. 데이터는 코드 안의 배열을 씁니다.

※ 용어 — 컴포넌트: 화면의 한 조각을 만드는 함수 · props: 부모 컴포넌트가 자식 컴포넌트에 넘기는 값 · state: 컴포넌트가 기억하는 값. 바뀌면 화면이 다시 그려짐 · key: 목록의 각 항목을 구분하는 고유한 값

---

## 4주차 (10.12 ~ 10.16) — 서버에서 데이터 가져오기

**왜 배우는가**
지금까지는 데이터를 코드 안에 넣었습니다. 실제 서비스는 데이터를 서버에서 가져옵니다. useEffect는 화면이 열릴 때 서버에 요청을 보내는 자리입니다. 서버는 느리거나 실패할 수 있습니다. 그래서 기다리는 중과 실패한 경우를 화면에 보여 주어야 합니다. 이번 주에는 실제 서버 대신 가짜 API를 씁니다. 가짜 API는 실제 서버와 같은 방식으로 응답하므로, 11월에 주소만 바꾸면 실제 서버에 연결됩니다.

- [ ] 팀 조장이 만든 React 예시 프로젝트를 본인 폴더에 복사하고 README대로 실행합니다.
- [ ] `npm run mock`으로 가짜 API를 실행합니다. 브라우저에서 가짜 API 주소를 열어 JSON이 보이는지 확인합니다.
  - 찾아볼 것: `json-server`
- [ ] 화면이 처음 열릴 때 가짜 API에서 목록을 가져옵니다.
  - 찾아볼 것: `react.dev synchronizing with effects`, `react fetch data useEffect`
- [ ] 불러오는 중에는 "불러오는 중"을 표시합니다. 가짜 API를 끈 상태에서는 오류 문구를 표시합니다.

**예시가 아직 없으면:** 3주차에 만든 본인 프로젝트에 `json-server`를 설치합니다. 2주차의 `tasks.json` 내용으로 `db.json`을 만듭니다. `db.json`은 `{ "tasks": [ ... ] }` 형태여야 합니다.

**제출물:** 가짜 API에서 목록을 불러와 보여 주는 화면 1개. 마감은 10.16(금) 밤입니다.

※ 용어 — API: 서버가 요청을 받는 주소와 규칙 · 가짜 API(mock): 실제 서버 없이 같은 모양의 응답을 돌려주는 연습용 서버 · useEffect: 화면이 그려진 뒤에 실행할 일을 적는 자리

---

## 11월 첫 주 예정

- [ ] 양식을 제출하면 API로 POST 요청을 보냅니다.
  - 찾아볼 것: `fetch POST JSON`
- [ ] React Router로 목록 페이지와 추가 페이지를 나눕니다.
  - 찾아볼 것: `react router tutorial`
- [ ] 가짜 API 대신 실제 백엔드 API에 연결합니다. 방법은 팀 조장이 안내합니다.
- [ ] (동료평가 담당만) 조원 3명, 항목 2개의 점수를 입력하는 화면을 만듭니다. state는 객체 하나로 관리합니다.
  - 찾아볼 것: `react.dev updating objects in state`
