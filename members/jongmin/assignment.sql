CREATE TABLE assignment (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    start_date DATE,
    end_date DATE
);

INSERT INTO assignment (title, start_date, end_date)
VALUES ('1주차 과제', '2026-10-01', '2026-10-07');

SELECT * FROM assignment;

SELECT * FROM assignment WHERE title = '1주차 과제';
