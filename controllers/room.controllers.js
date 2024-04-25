const pool = require('../config/config').promise();


async function getRooms(req, res, next) {
  try {
    const [rows] = await pool.query('SELECT * FROM habitaciones');
    res.json(rows);
  } catch (error) {
    next(error);
  }
}

async function getRoom(req, res, next) {
  const codigo = req.params.codigo;
  try {
    const [rows] = await pool.query('SELECT * FROM habitaciones WHERE codigo = ?', [codigo]);
    if (rows.length === 0) { 
      return res.status(404).json({ error: 'Habitación no encontrada' });
    }
    res.json(rows[0]); 
  } catch (error) {
    next(error);
  }
}

async function createRoom(req, res, next) {
  const { numero, tipo, valor } = req.body;
  try {
    await pool.query('INSERT INTO habitaciones (numero, tipo, valor) VALUES (?, ?, ?)', [numero, tipo, valor]);
    res.status(201).json({ message: 'Habitación creada correctamente' }); 
  } catch (error) {
    next(error);
  }
}

async function updateRoom(req, res, next) {
  const codigo = req.params.codigo;
  const { numero, tipo, valor } = req.body;
  try {
    const [result] = await pool.query('UPDATE habitaciones SET numero = ?, tipo = ?, valor = ? WHERE codigo = ?', [numero, tipo, valor, codigo]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Habitación no encontrada' });
    }
    res.json({ message: 'Habitación actualizada correctamente' });
  } catch (error) {
    next(error);
  }
}

async function deleteRoom(req, res, next) {
  const codigo = req.params.codigo;
  try {
    const [result] = await pool.query('DELETE FROM habitaciones WHERE codigo = ?', [codigo]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Habitación no encontrada' });
    }
    res.json({ message: 'Habitación eliminada correctamente' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
  deleteRoom
};
