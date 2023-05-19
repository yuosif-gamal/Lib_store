var query = require('../database/query')
var dbconnect = require ('../database/connection')

exports.saveAuthor = async (req, res) => {
  try {
    console.log('in controller...');
    var authorName = req.body.authorName;
    if (!authorName) {
      return res.status(500).send({ error: 'Author name cannot be empty' });
    }
    var create_on = new Date();
    var create_by = 'admin';
    var values = [authorName, create_on, create_by];
    console.log(values);
    var save_new_author = query.queryList.SAVE_NEW_AUTHOR;
    console.log('save_new_author');
    await dbconnect.DataBaseQuery(save_new_author, values);
    return res.status(201).send("Author saved in the database.");
  } catch (error) {
    console.log("Error: " + error);
    return res.status(500).send({ error: 'Failed to save author' });
  }
}


exports.getAllAuthors = async (req, res) => {
  try {
    const getAllAuthorsQuery = query.queryList.GET_ALL_AUTHORS;
    const result = await dbconnect.DataBaseQuery(getAllAuthorsQuery);
    return res.status(200).send(JSON.stringify(result.rows));
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).send({ error: 'ERROR: Unable to retrieve authors' });
  }
};

exports.getAuthorById = async (req, res) => {
  try {
    const authorId = req.params.id;

    const getAuthorByIdQuery = query.queryList.GET_AUTHOR_BY_ID;
    const result = await dbconnect.DataBaseQuery(getAuthorByIdQuery, [authorId]);

    if (result.rows.length === 0) {
      return res.status(404).send({ error: 'Author not found' });
    }

    return res.status(200).send(JSON.stringify(result.rows[0]));
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).send({ error: 'ERROR: Unable to retrieve author' });
  }
};

exports.updateAuthorById = async (req, res) => {
  try {
    const authorId = req.params.id;
    const { authorName } = req.body;

    if (!authorName) {
      return res.status(400).send({ error: 'Author name is required' });
    }

    const updateAuthorQuery = query.queryList.UPDATE_AUTHOR_BY_ID;
    await dbconnect.DataBaseQuery(updateAuthorQuery, [authorName, authorId]);

    return res.status(200).send('Author updated successfully');
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).send({ error: 'ERROR: Unable to update author' });
  }
};

exports.deleteAuthorById = async (req, res) => {
  try {
    const authorId = req.params.id;

    const deleteAuthorQuery = query.queryList.DELETE_AUTHOR_BY_ID;
    await dbconnect.DataBaseQuery(deleteAuthorQuery, [authorId]);

    return res.status(200).send('Author deleted successfully');
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).send({ error: 'ERROR: Unable to delete author' });
  }
};
