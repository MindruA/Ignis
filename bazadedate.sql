CREATE TABLE lighters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    image VARCHAR(255)
);
INSERT INTO lighters (name, price, stock, image)
VALUES ('Bricheta Zmeu', 129.99, 100, 'b2.png');
INSERT INTO lighters (name, price, stock, image)
VALUES ('Bricheta Hargiog', 29.99, 100, 'b2.png');