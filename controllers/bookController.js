const pool = require('../config/db');

exports.createBook = async (req, res) => {
  const { title, author, year, genre } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO books (title, author, year, genre, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, author, year, genre, req.user.userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books WHERE user_id = $1', [req.user.userId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBook = async (req, res) => {
  const { title, author, year, genre } = req.body;
  try {
    const result = await pool.query(
      'UPDATE books SET title = $1, author = $2, year = $3, genre = $4 WHERE id = $5 AND user_id = $6 RETURNING *',
      [title, author, year, genre, req.params.id, req.user.userId]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await pool.query('DELETE FROM books WHERE id = $1 AND user_id = $2', [req.params.id, req.user.userId]);
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
