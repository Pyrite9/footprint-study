# infra — 데이터베이스와 파일 저장소 실행

이 폴더는 발자국에 필요한 프로그램 2개를 Docker로 실행합니다.

- PostgreSQL 17: 데이터베이스입니다.
- MinIO: 파일을 저장하는 서버입니다. 산출물 업로드 단계에서 씁니다. 지금은 켜 두기만 합니다.

## 준비

Docker Desktop을 실행합니다. 왼쪽 아래에 "Engine running"이 보여야 합니다.

## 실행 (3단계)

터미널(PowerShell)에서 실행합니다.

1. 이 폴더로 이동합니다.

   ```powershell
   cd infra
   ```

2. 설정 파일을 복사합니다. 처음 한 번만 합니다.

   ```powershell
   Copy-Item .env.example .env
   ```

   macOS는 `cp .env.example .env`입니다. 값은 바꾸지 않고 그대로 씁니다.

3. 실행합니다.

   ```powershell
   docker compose up -d
   ```

   처음에는 이미지를 받느라 1~2분이 걸립니다.

## 확인

```powershell
docker compose ps
```

`footprint-postgres`의 STATUS에 `healthy`가 보이면 성공입니다. 잠깐 `starting`으로 보일 수 있습니다.

## 접속 정보

`.env.example`의 값을 그대로 썼을 때의 정보입니다.

### PostgreSQL (DBeaver 접속에 씁니다)

| 항목 | 값 |
|---|---|
| Host | `localhost` |
| Port | `5432` |
| Database | `footprint` |
| Username | `footprint` |
| Password | `change-me` |

### MinIO

| 항목 | 값 |
|---|---|
| 관리 화면 | http://localhost:9001 |
| API 주소 | http://localhost:9000 |
| 계정 | `footprint` |
| 비밀번호 | `change-me-please` |

## 끄기

```powershell
docker compose down
```

데이터는 남습니다. 다음에 `docker compose up -d`를 하면 그대로 이어집니다.

데이터까지 지우고 처음부터 다시 시작하려면 `-v`를 붙입니다.

```powershell
docker compose down -v
```

## 자주 나는 오류

### 1. `port is already allocated`

다른 프로그램이 5432 포트를 쓰고 있습니다. `.env`에서 `POSTGRES_PORT`를 `5433`으로 바꾸고 다시 실행합니다. 이때 DBeaver의 Port도 `5433`으로 맞춥니다.

### 2. 비밀번호를 바꿨는데 접속이 안 됩니다

비밀번호는 처음 실행할 때만 적용됩니다. `.env`를 고친 뒤에는 데이터를 지우고 다시 실행해야 합니다.

```powershell
docker compose down -v
docker compose up -d
```

학습 중에는 비밀번호를 바꾸지 않는 것을 권합니다. 바꾸면 백엔드 예시를 실행할 때 설정이 하나 더 필요합니다.

### 3. `footprint-minio`가 바로 꺼집니다

`.env`의 `MINIO_ROOT_PASSWORD`가 8자보다 짧습니다. 8자 이상으로 바꿉니다.

## 주의

- `.env`는 commit 하지 않습니다. `.gitignore`에 들어 있습니다. `.env.example`만 저장소에 올립니다.
- 이 설정은 내 컴퓨터에서 학습할 때만 씁니다.

※ 용어 — Docker: 프로그램을 설치 없이 실행해 주는 도구 · 컨테이너: Docker가 실행한 프로그램 하나 · 포트: 한 컴퓨터 안에서 프로그램을 구분하는 번호 · `.env`: 비밀번호나 포트 같은 설정값을 적어 두는 파일
