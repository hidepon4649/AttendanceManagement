USE attendance_db;

CREATE TABLE IF NOT EXISTS employee (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    is_admin BIT(1) NOT NULL,
    name VARCHAR(24) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS attendance (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    clock_in_time DATETIME(6),
    clock_out_time DATETIME(6),
    date DATE,
    employee_id BIGINT,
    break_minutes INT DEFAULT 60, -- 初期値を60分に設定
    remarks TEXT,
    FOREIGN KEY (employee_id) REFERENCES employee (id)
);

CREATE TABLE IF NOT EXISTS access_log (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    class_name VARCHAR(255),
    method_name VARCHAR(255),
    method_params TEXT,
    user_roles VARCHAR(255),
    access_date DATE,
    access_time TIMESTAMP
);