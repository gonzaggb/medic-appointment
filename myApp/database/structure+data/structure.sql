CREATE DATABASE turnos_clinica

CREATE TABLE users (
id INT AUTO_INCREMENT NOT NULL,
first_name VARCHAR(100) NOT NULL,
last_name VARCHAR(100) NOT NULL,
birth_date DATE NOT NULL,
dni INT UNSIGNED NOT NULL UNIQUE,
adress VARCHAR(255) NOT NULL,
state VARCHAR(255) NOT NULL,
zip_code INT NOT NULL,
phone VARCHAR(20),
email VARCHAR(255),
social_network VARCHAR(255),
PASSWORD VARCHAR(255) NOT NULL,
PRIMARY KEY(id))

CREATE TABLE user_access (
id INT AUTO_INCREMENT NOT NULL,
user_id INT NOT NULL,
rol_id INT NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY (user_id) REFERENCES users (id),
FOREIGN KEY (rol_id) REFERENCES roles (id)
)

CREATE TABLE roles (
id INT AUTO_INCREMENT NOT NULL,
NAME VARCHAR(20) UNIQUE,
PRIMARY KEY(id)
)

CREATE TABLE patients (
id INT AUTO_INCREMENT NOT NULL,
health_insurance VARCHAR(100),
health_insurance_number VARCHAR(100),
clinic_history_id INT NOT NULL,
user_access_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (user_access_id) REFERENCES user_access (id)
)

CREATE TABLE secretaries (
id INT AUTO_INCREMENT NOT NULL,
admission_date DATE,
user_access_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (user_access_id) REFERENCES user_access (id)
)

CREATE TABLE professionals (
id INT AUTO_INCREMENT NOT NULL,
registration_number INT NOT NULL UNIQUE,
active BOOLEAN NOT NULL,
user_access_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (user_access_id) REFERENCES user_access (id)
)

