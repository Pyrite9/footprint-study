--테이블 생성 (create)
CREATE TABLE assignment (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100)
);
-- 데이터 추가(insert)
INSERT INTO assignment (username, email) VALUES ('hong', 'hong@daum.net');
INSERT INTO assignment (username, email) VALUES ('jang', 'hojin@gamil.com');
INSERT INTO assignment (username, email) VALUES ('jhj', 'jjjjjjj@gamil.com');
INSERT INTO assignment (username, email) VALUES ('ji', 'njj@naver.com');
INSERT INTO assignment (username, email) VALUES ('won', 'sliee@ddddddd.com');

--테이블 조회(select)
SELECT * FROM assignment;

--조건 검색(where)
SELECT * FROM assignment WHERE username = 'hong';

--데이터 수정(update)
UPDATE assignment SET email = 'new_hong@naver.com' WHERE username = 'hong';
UPDATE assignment SET email = 'new_jang@naver.com' WHERE username = 'jang';

--데이터 삭제(delete)
DELETE FROM assignment WHERE username = 'hong';

--내림차순 정령(order by ~ desc)
SELECT * FROM assignment ORDER BY id DESC;

--테이블 삭제(drop)
DROP TABLE assignment;