USE attendance_db;
-- password: password
INSERT INTO employee (id, email, is_admin, role, name, password) VALUES
(1, 'itohtohirofumi@email.com', b'1', 'ADMIN', '伊藤博文', '$2a$12$9S./kSh2vC6VqFPQLg1ege7gWPmJ556aCDBO2Qg/tj5ZWEiBoRb1i'),
(2, 'kurodakiyotaka@email.com', b'0', 'USER', '黒田清隆', '$2a$12$9S./kSh2vC6VqFPQLg1ege7gWPmJ556aCDBO2Qg/tj5ZWEiBoRb1i'),
(3, 'yamagataaritomo@email.com', b'0', 'USER', '山縣有朋', '$2a$12$9S./kSh2vC6VqFPQLg1ege7gWPmJ556aCDBO2Qg/tj5ZWEiBoRb1i'),
(4, 'matsukatamasayoshi@email.com', b'0', 'USER', '松方正義', '$2a$12$9S./kSh2vC6VqFPQLg1ege7gWPmJ556aCDBO2Qg/tj5ZWEiBoRb1i'),
(5, 'ohkumashigenobu@email.com', b'0', 'USER', '大隈重信', '$2a$12$9S./kSh2vC6VqFPQLg1ege7gWPmJ556aCDBO2Qg/tj5ZWEiBoRb1i');

INSERT INTO attendance (clock_in_time, clock_out_time, date, employee_id) VALUES
('2024-11-01 08:25:00.000000', '2024-11-01 18:10:00.000000', '2024-11-01', 1),
('2024-11-02 08:25:00.000000', '2024-11-02 18:10:00.000000', '2024-11-02', 1),
('2024-11-03 08:25:00.000000', '2024-11-03 18:10:00.000000', '2024-11-03', 1),
('2024-11-04 08:25:00.000000', '2024-11-04 18:10:00.000000', '2024-11-04', 1),
('2024-11-05 08:25:00.000000', '2024-11-05 18:10:00.000000', '2024-11-05', 1),
('2024-11-06 08:25:00.000000', '2024-11-06 18:10:00.000000', '2024-11-06', 1),
('2024-11-07 08:25:00.000000', '2024-11-07 18:10:00.000000', '2024-11-07', 1),
('2024-11-08 08:25:00.000000', '2024-11-08 18:10:00.000000', '2024-11-08', 1),
('2024-11-09 08:25:00.000000', '2024-11-09 18:10:00.000000', '2024-11-09', 1),
('2024-11-10 08:25:00.000000', '2024-11-10 18:10:00.000000', '2024-11-10', 1);
