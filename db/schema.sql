CREATE TABLE department (
  id INT NOT NULL,
  name VARCHAR(128) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL,
  title VARCHAR(128) NOT NULL,
  salary DECIMAL NOT NULL,
  deparment_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (deparment_id),
  REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(128) NOT NULL,
  last_name VARCHAR(128)  NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (manager_id) REFERENCES employee(id),
  FOREIGN KEY (role_id) REFERENCES role(id)
)