USE attendance_db;

CREATE TABLE IF NOT EXISTS employee (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
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
    FOREIGN KEY (employee_id) REFERENCES employee(id)
);