const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const axios = require('axios');
const app = express();


app.use(express.json());
app.use(cors());
 
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbpadelstore'
});

app.listen(3009, () => console.log("Servicio en el puerto 3009"));

connection.connect(error => {
    if (error) throw error;
    console.log("Conexión con la base de datos establecida");
});

//-----------------Mostrar-------------------------
app.get('/paletas', (req, res) => { 
    connection.query('SELECT p.id, p.nombre, p.descripcion, p.marca, tc.nombre AS tipo_nombre, p.stock, p.precio, p.imagen_url FROM paletas p INNER JOIN tipocategoria tc ON p.tipo_categoria_id = tc.id', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.get('/paletas/:id', (req, res) => {
    const paletaId = req.params.id;
    connection.query(
        'SELECT p.id, p.nombre, p.descripcion, p.marca, tc.nombre AS tipo_nombre, p.stock, p.precio, p.imagen_url ' +
        'FROM paletas p ' +
        'INNER JOIN tipocategoria tc ON p.tipo_categoria_id = tc.id ' +
        'WHERE p.id = ?',
        [paletaId],
        (error, results) => {
            if (error) throw error;

            if (results.length === 0) {
                res.status(404).json({ message: 'Paleta no encontrada' });
            } else {
                res.json(results[0]);
            }
        }
    );
});

app.get('/tipocategoria', (req, res) => {
    connection.query('SELECT * FROM tipocategoria', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.get('/items_carrito/:producto_id', (req, res) => {
    const productoId = req.params.producto_id;
    connection.query('SELECT * FROM items_carrito WHERE producto_id = ?', productoId, (error, results) => {
        if (error) throw error;
        res.json(results[0]);
    });
});
app.get('/items_carrito', (req, res) => {
    connection.query(`
    SELECT ic.id, ic.cantidad, ic.producto_id, p.nombre AS nombre_paleta, p.precio, p.stock
    FROM items_carrito ic
    INNER JOIN paletas p ON ic.producto_id = p.id
  `, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});


app.get('/ofertas', (req, res) => {
    connection.query('SELECT o.id, o.nombre, o.descuento, o.precio, p.id AS paleta_id, p.nombre AS paleta_nombre, p.marca, p.imagen_url FROM ofertas o JOIN paletas p ON o.paleta_id = p.id', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});


//----------------insertar---------------------------
app.post("/paletas", (req, res) => {
    connection.query('INSERT INTO paletas SET ?', req.body, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.post("/items_carrito", (req, res) => {
    const newItem = {
        producto_id: req.body.producto_id,
        cantidad: req.body.cantidad
    };

    connection.query('INSERT INTO items_carrito SET ?', newItem, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.post('/ofertas', (req, res) => {
    const { nombre, descuento, paleta_id, precio, imagen_url } = req.body;
    connection.query(
        'INSERT INTO ofertas (nombre, descuento, paleta_id, precio, imagen_url) VALUES (?, ?, ?, ?, ?)',
        [nombre, descuento, paleta_id, precio, imagen_url],
        (error, results) => {
            if (error) {
                console.error('Error al insertar oferta:', error);
                return res.status(500).json({ error: 'Error interno del servidor' });
            }
            res.sendStatus(200);
        }
    );
});


//................modificar-----------------------------
app.put('/paletas/:id', (req, res) => {
    const paletaId = req.params.id;
    const { stock } = req.body;

    console.log("Actualizando stock de paleta:", paletaId);
    console.log("Nuevo stock:", stock);

    connection.query('UPDATE paletas SET stock = ? WHERE id = ?', [stock, paletaId], (error, results) => {
        if (error) throw error;
        console.log("Stock actualizado con éxito");
        res.json({ message: 'Stock actualizado con éxito' });
    });
});

app.put('/paletasMod/:id', (req, res) => {
    const paletaId = req.params.id;
    const {
        nombre,
        descripcion,
        marca,
        tipo_categoria_id,
        stock,
        precio,
        imagen_url
    } = req.body;

    const updateQuery = `
        UPDATE paletas
        SET nombre = ?, descripcion = ?, marca = ?, tipo_categoria_id = ?, stock = ?, precio = ?, imagen_url = ?
        WHERE id = ?
    `;

    const values = [
        nombre,
        descripcion,
        marca,
        tipo_categoria_id,
        stock,
        precio,
        imagen_url,
        paletaId
    ];

    connection.query(updateQuery, values, (error, results) => {
        if (error) {
            console.error("Error al actualizar la paleta:", error);
            res.status(500).json({ error: "No se pudo actualizar la paleta" });
        } else {
            console.log("Paleta actualizada con éxito");
            res.json({ message: "Paleta actualizada con éxito" });
        }
    });
});

app.put("/items_carrito/:producto_id", (req, res) => {
    const producto_id = req.params.producto_id;
    const { cantidad } = req.body;

    connection.query(
        'UPDATE items_carrito SET cantidad = ? WHERE producto_id = ?',
        [cantidad, producto_id],
        (error, results) => {
            if (error) throw error;
            res.json(results);
        }
    );
});

app.put('/ofertas/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, descuento, paleta_id, precio, imagen_url } = req.body;

    connection.query(
        'UPDATE ofertas SET nombre = ?, descuento = ?, paleta_id = ?, precio = ?, imagen_url = ? WHERE id = ?',
        [nombre, descuento, paleta_id, precio, imagen_url, id],
        (error, results) => {
            if (error) {
                console.error('Error al actualizar oferta:', error);
                return res.status(500).json({ error: 'Error interno del servidor' });
            }
            res.sendStatus(200);
        }
    );
});

//----------------Eliminar-------------------------------
app.delete("/paletas/:id", (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM paletas WHERE id = ?', id, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.delete('/items_carrito/:id', (req, res) => {
    const itemId = req.params.id;
    connection.query('SELECT * FROM items_carrito WHERE id = ?', itemId, (error, results) => {
        if (error) throw error;

        if (results.length === 0) {
            res.status(404).json({ message: 'Item no encontrado en el carrito' });
        } else {
            const item = results[0];
            connection.query('DELETE FROM items_carrito WHERE id = ?', itemId, (error, deleteResult) => {
                if (error) throw error;
                res.json(item);
            });
        }
    });
});


app.delete('/ofertas/:id', (req, res) => {
    const ofertaId = req.params.id;
    connection.query('DELETE FROM ofertas WHERE id = ?', [ofertaId], (error, results) => {
        if (error) throw error;
        res.sendStatus(200);
    });
});


// Ruta para obtener el valor del dólar blue
app.get('/dolar_blue', async (req, res) => {
    try {
        
        const response = await axios.get('https://api.bluelytics.com.ar/v2/latest');

        const valorDolarBlue = response.data.blue.value_avg;

        res.json({ valor: valorDolarBlue });
    } catch (error) {
        console.error('Error al obtener el valor del dólar blue:', error);
        res.status(500).json({ error: 'Error al obtener el valor del dólar blue' });
    }
});