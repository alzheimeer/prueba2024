CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    categoria VARCHAR(100) NOT NULL
);

INSERT INTO productos (nombre, descripcion, categoria) VALUES
('Producto 1', 'Descripción del producto 1', 'Categoría A'),
('Producto 2', 'Descripción del producto 2', 'Categoría B'),
('Producto 3', 'Descripción del producto 3', 'Categoría A'),
('Producto 4', 'Descripción del producto 4', 'Categoría C'),
('Producto 5', 'Descripción del producto 5', 'Categoría B'),
('Producto 6', 'Descripción del producto 6', 'Categoría A'),
('Producto 7', 'Descripción del producto 7', 'Categoría C'),
('Producto 8', 'Descripción del producto 8', 'Categoría B'),
('Producto 9', 'Descripción del producto 9', 'Categoría A'),
('Producto 10', 'Descripción del producto 10', 'Categoría C')
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre), descripcion=VALUES(descripcion), categoria=VALUES(categoria);