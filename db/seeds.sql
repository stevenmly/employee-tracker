INSERT INTO departments (name)
VALUES 
("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES
("Sales Lead", 80000, 1), 
("Salesperson", 65000, 1), 
("Lead Engineer", 130000, 2), 
("Software Engineer", 115000, 2), 
("Accountant", 100000, 3), 
("Legal Team Lead", 150000, 4), 
("Lawyer", 180000, 4);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("John", "Doe", 1, null),
("Mike", "Chan", 2, 1),
("Ashley", "Rodriguez", 3, null),
("Kevin", "Tupik", 4, 3),
("Malia", "Brown", 5, null),
("Sarah", "Lourd", 6, null),
("Tom", "Allen", 7, 6),
("Tammer", "Galal", 7, 6); 