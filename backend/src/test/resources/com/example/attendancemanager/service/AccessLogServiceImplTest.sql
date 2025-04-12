-- 最初にお掃除
DELETE FROM access_log WHERE id IN ('99990', '99991', '99992', '99993', '99994');
-- 次にテストデータを挿入
INSERT INTO access_log (id,username,class_name,method_name,method_params,user_roles,access_date,access_time) VALUES
('99990', 'itohtohirofumi@email.com', 'com.example.attendancemanager.service.AccessLogServiceImplTest', 'testGetAccessLogsByDate', '[2024-01-01]', 'ROLE_ADMIN,ROLE_USER', '2024-01-01', '2024-01-01 09:00:00.000000'),
('99991', 'itohtohirofumi@email.com', 'com.example.attendancemanager.service.AccessLogServiceImplTest', 'testGetAccessLogsByDate', '[2024-01-01]', 'ROLE_ADMIN,ROLE_USER', '2024-01-01', '2024-01-01 09:00:00.000000'),
('99992', 'itohtohirofumi@email.com', 'com.example.attendancemanager.service.AccessLogServiceImplTest', 'testGetAccessLogsByDate', '[2024-01-01]', 'ROLE_ADMIN,ROLE_USER', '2024-01-01', '2024-01-01 09:00:00.000000'),
('99993', 'itohtohirofumi@email.com', 'com.example.attendancemanager.service.AccessLogServiceImplTest', 'testGetAccessLogsByDate', '[2024-01-01]', 'ROLE_ADMIN,ROLE_USER', '2024-01-01', '2024-01-01 09:00:00.000000'),
('99994', 'itohtohirofumi@email.com', 'com.example.attendancemanager.service.AccessLogServiceImplTest', 'testGetAccessLogsByDate', '[2024-01-01]', 'ROLE_ADMIN,ROLE_USER', '2024-01-01', '2024-01-01 09:00:00.000000');
