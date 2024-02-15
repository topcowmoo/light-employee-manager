INSERT INTO department (id, name)
VALUES  ('Legal'),
        ('Human Resources'),
        ('Marketing'),
        ('Sales');

INSERT INTO role (id, title, salary, department_id)
VALUES  ('Admin Lead', 58500.00, 4),
        ('Salesperson', 49000.00, 4),
        ('Legal Section Lead', 92800.00, 1),
        ('Lawyer', 76000.00, 1),
        ('HR Lead', 60000.00, 2),
        ('HR Representative', 44500.00, 2),
        ('Marketing Manager', 57000.00, 3),
        ('Market Research Analyst', 31500.00, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  ('Constance', 'Inquirer', 3, NULL),
        ('Dom', 'Event', 4, 3),
        ('Java', 'Script', 5, NULL),
        ('Jay', 'Son', 6, 5),
        ('Mark', 'Up', 7, NULL),
        ('Jessica', 'Ajax', 8, 7),
        ('Jerry', 'Jest', 1, NULL),
        ('Mabel', 'Byte', 2, 1);