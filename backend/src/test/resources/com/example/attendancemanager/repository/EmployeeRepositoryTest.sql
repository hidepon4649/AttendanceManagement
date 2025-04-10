-- 最初にお掃除
DELETE FROM employee WHERE id=11;
-- 次にテストデータを挿入
INSERT INTO employee (id, email, is_admin, name, password) VALUES
(11, 'itohtohirofumi11@email.com', b'1', '伊藤博文11', '$2a$12$9S./kSh2vC6VqFPQLg1ege7gWPmJ556aCDBO2Qg/tj5ZWEiBoRb1i');
