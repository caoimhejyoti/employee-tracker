-- DESCRIPTION: Creating new database
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

-- DESCRIPTION: Use database created. 
USE employees_db;

-- DESCRIPTION: Create table 1 - department
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30)
);

-- DESCRIPTION: Create table 2 - role
-- table references department id
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL UNIQUE,
  salary DECIMAL NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

-- DESCRIPTION: Create table 3 - employee
-- table references role id and manager id 
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id)
);
