INSERT INTO department (dept_name)
VALUES  ("Engineering"), -- 1
        ("Customer Service"), -- 2
        ("Human Resources/HR"); -- 3

INSERT INTO role (id, title, salary, department_id)
VALUES  ("001", "QA Manager", 80000, 1),
        ("002", "Front-End Developer", 70000, 1),
        ("003", "Director of Customer Relations", 90000, 2),
        ("004", "HR Coordinator", 60000, 3),
        ("005", "Project Manager", 60000, 1),
        ("006", "Back-End Developer", 75000, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  ("001", "Nathan", "MacKinnon", "001", 1),
        ("002", "Cale", "Makar", "002", 2),
        ("003", "Mikko", "Rantanen", "003", 3),
        ("004", "Jack", "Johnson", "004", NULL),
        ("005", "Josh", "Manson", "005", NULL),
        ("006", "Katie", "Gaus", "006", NULL);