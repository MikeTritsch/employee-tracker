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

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Nathan", "MacKinnon", "001", NULL),
        ("Cale", "Makar", "002", NULL),
        ("Mikko", "Rantanen", "003", NULL),
        ("Jack", "Johnson", "004", 1),
        ("Josh", "Manson", "005", 2),
        ("Katie", "Gaus", "006", 3);