-- H2 user initialization with detailed distinct accounts and slightly expanded realistic data
INSERT INTO users (id, username, password, role) VALUES 
(1, 'standard_user', '$2a$10$EqwrWgGbt5mSwivmt2ab9uOpTw3Vla9GO5dnTETJrDv7/n.DTdwNK', 'ROLE_USER'),
(2, 'admin_root', '$2a$10$2watSsTlecfqivzh/zgVHuoboq9AtvXct9J6G6iefBqBWnyzbEzHu', 'ROLE_ADMIN'),
(3, 'guest_user', '$2a$10$EqwrWgGbt5mSwivmt2ab9uOpTw3Vla9GO5dnTETJrDv7/n.DTdwNK', 'ROLE_USER');
