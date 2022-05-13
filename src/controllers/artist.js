// src/controllers/artist.js
// const db = require('../services/db');
const getDb = require('../services/db');

exports.create = async (req, res) => {
  const db = await getDb();
  const { name, genre } = req.body;

  try {
    await db.query('INSERT INTO Artist (name, genre) VALUES (?, ?)', [
      name,
      genre,
    ]);

    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500).json(err);
  }

  db.close();
};

exports.read = async (_, res) => {
  const db = await getDb();

  try {
    const [artists] = await db.query('SELECT * FROM Artist');

    res.status(200).json(artists);
  } catch (err) {
    res.status(500).json(err);
  }
  db.close();
};

exports.readById = async (request, response) => {
  const db = await getDb();
  const { artistId } = request.params;

  const [[artist]] = await db.query('SELECT * FROM Artist WHERE id = ?', [artistId]);

  if (!artist) { response.sendStatus(404); } else {
    response.status(200).json(artist);
  }

  db.close();
};

exports.update = async (request, response) => {
  const databaseConnection = await getDb();
  const { artistId } = request.params;
  const dataToInsert = request.body;
  try {
    const [{ affectedRows: partOfResultObjectThatSaysWhatIsAffected }] = await databaseConnection.query('UPDATE Artist SET ? WHERE id = ?', [dataToInsert, artistId]);

    if (!partOfResultObjectThatSaysWhatIsAffected) {
      response.sendStatus(404);
    } else {
      response.status(200).send(`Artist ${artistId} has been updated`);
    }
  } catch (err) {
    response.sendStatus(500);
  }

  databaseConnection.close();
};

exports.delete = async (request, response) => {
  const databaseConnection = await getDb();
  const { artistId } = request.params;
  try {
    const [{ affectedRows: partOfResultObjectThatSaysWhatIsAffected }] = await databaseConnection.query('DELETE FROM Artist WHERE id = ?', [artistId]);
    if (!partOfResultObjectThatSaysWhatIsAffected) { response.sendStatus(404); } else {
      response.status(200).json(`${artistId} has been deleted`);
    }
    response.status(200).json(`${artistId} has been deleted`);
  } catch (err) {
    response.sendStatus(500);
  }
  databaseConnection.close();
};
