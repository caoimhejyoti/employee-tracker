INSERT INTO department (department_name)
VALUES  ('HR'),
        ('Sales'),
        ('Legal'),
        ('Finance'),
        ('Engineering');


INSERT INTO role (title, salary, department_id)
VALUES  ('Sales Team Manager', 100000, 2),
        ('Salesperson', 80000, 2),
        ('Legal Team Manager', 250000, 3),
        ('Lawyer', 190000, 3),
        ('Engineering Team Manager', 150000, 4),
        ('Software Engineer', 120000, 4),
        ('Finance Team Manager', 160000, 5),
        ('Accountant', 120000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Rory', 'Gilmore', 1, NULL),
        ('Lane', 'Kim', 2, 1),
        ('Lorelai', 'Gilmore', 3, NULL ),
        ('Luke', 'Danes', 4, 3),
        ('Sookie', 'St.James', 5, NULL),
        ('Kirk', 'Gleason', 6, 5),
        ('Richard', 'Gilmore', 7, NULL),
        ('Emily', 'Gilmore', 8, 7);

