const pool = require('../config/config').promise();

async function getBookings(req, res, next) {
  try {
    const [rows] = await pool.query('SELECT * FROM reservas');
    res.json(rows);
  } catch (error) {
    next(error);
  }
}

async function getBooking(req, res, next) {
  const codigo = req.params.codigo;
  try {
    const [rows] = await pool.query('SELECT * FROM reservas WHERE codigo = ?', [codigo]);
    if (rows.length === 0) { 
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.json(rows[0]); 
  } catch (error) {
    next(error);
  }
}

async function createBooking(req, res, next) {
  const { codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida } = req.body;
  try {
    await pool.query('INSERT INTO reservas (codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida) VALUES (?, ?, ?, ?, ?, ?)', [codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida]);
    res.status(201).json({ message: 'Reserva creada correctamente' }); 
  } catch (error) {
    next(error);
  }
}

async function updateBooking(req, res, next) {
  const codigo = req.params.codigo;
  const { codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida } = req.body;
  try {
    const [result] = await pool.query('UPDATE reservas SET codigo_habitacion = ?, nombre_cliente = ?, telefono_cliente = ?, fecha_reservacion = ?, fecha_entrada = ?, fecha_salida = ? WHERE codigo = ?', [codigo_habitacion, nombre_cliente, telefono_cliente, fecha_reservacion, fecha_entrada, fecha_salida, codigo]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.json({ message: 'Reserva actualizada correctamente' });
  } catch (error) {
    next(error);
  }
}

async function deleteBooking(req, res, next) {
  const codigo = req.params.codigo;
  try {
    const [result] = await pool.query('DELETE FROM reservas WHERE codigo = ?', [codigo]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.json({ message: 'Reserva eliminada correctamente' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking
};
