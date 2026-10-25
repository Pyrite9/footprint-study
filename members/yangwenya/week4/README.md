# ReactHomework

## 이 프로젝트는 무엇인가요?
React `useEffect`와 `fetch()`를 사용해 Mock API에서 작업 목록을 받아 화면에 표시하는 연습 프로젝트입니다.

## 실행 방법 (Windows / VS Code)

### 1. 프로젝트 폴더 열기
압축을 푼 `ReactHomework` 폴더를 VS Code에서 엽니다.

### 2. 패키지 설치
VS Code 메뉴에서 Terminal → New Terminal을 누르고 입력합니다.

```bash
npm install
```

설치가 끝날 때까지 기다립니다.

### 3. Mock API 실행
첫 번째 터미널에서 입력합니다.

```bash
npm run mock
```

이 터미널은 켜 둡니다. 브라우저에서 `http://localhost:4000/tasks`를 열면 JSON 데이터가 보여야 합니다.

### 4. React 페이지 실행
VS Code에서 Terminal → New Terminal을 눌러 두 번째 터미널을 열고 입력합니다.

```bash
npm run dev
```

터미널에 나온 주소(보통 `http://localhost:5173`)를 Ctrl+클릭하거나 브라우저에 입력합니다.

## 과제 핵심
- `useState`: 작업 목록, 로딩 상태, 에러 상태 저장
- `useEffect`: 페이지가 처음 열릴 때 API 요청
- `fetch()`: `http://localhost:4000/tasks`에서 데이터 가져오기
- `loading`: 데이터를 가져오는 동안 로딩 문구 표시
- `error`: 요청 실패 시 에러 문구 표시
- `map()`: 받아온 작업을 목록으로 표시

## 참고
이 프로젝트는 시작용 예제입니다. 교수님/조장의 별도 템플릿이나 추가 요구사항이 있다면 그 지침을 우선하세요.
