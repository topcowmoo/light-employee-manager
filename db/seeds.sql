INSERT INTO
    department (name)
VALUES
    ('Legal'),
    ('Human Resources'),
    ('Marketing'),
    ('Sales');

INSERT INTO
    role (title, salary, department_id)
VALUES
    ('Legal Section Lead', 92800.00, 1),
    ('Lawyer', 76000.00, 1),
    ('HR Lead', 60000.00, 2),
    ('HR Representative', 44500.00, 2),
    ('Marketing Manager', 57000.00, 3),
    ('Market Research Analyst', 31500.00, 3),
    ('Admin Lead', 58500.00, 4),
    ('Salesperson', 49000.00, 4);

INSERT INTO
    employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Constance', 'Inquirer', 1, NULL),
    ('Dom', 'Event', 2, 1),
    ('Java', 'Script', 3, NULL),
    ('Jay', 'Son', 4, 3),
    ('Mark', 'Up', 5, NULL),
    ('Jessica', 'Ajax', 6, 5),
    ('Jerry', 'Jest', 7, NULL),
    ('Mabel', 'Byte', 8, 7);