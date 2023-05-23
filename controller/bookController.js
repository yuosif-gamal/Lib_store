var query = require('../database/query')
var dbconnect = require ('../database/connection')
exports.getAllBooks = async (req , res) =>{
    try {
        console.log('in controller .. ');
        var get_books_query = query.queryList.GET_ALL_BOOKS;
        var result = await dbconnect.DataBaseQuery(get_books_query);
        console.log('get_all_books..' );
        return res.status(200).send(JSON.stringify(result.rows));
    } catch (error) {
        console.log("error : " + error);  
        return res.status(500).send({error : 'ERROR , cant select all Books'});
    }
}

exports.getBookDetailsByID = async (req , res) =>{
    try {
        console.log('in controller .. ');
        var id = req.params.id;
        var get_book_details = query.queryList.GET_BOOK_DETAILS_BY_ID;
        console.log('get_book_details' + " in id : " + id );
        var result = await dbconnect.DataBaseQuery(get_book_details,[id]);
        return res.status(200).send(JSON.stringify(result.rows));
    } catch (error) {
        console.log("error : " + error);  
        return res.status(500).send({error : 'ERROR , cant select all Books'});
    }
}
exports.getBookInSpscificStore = async (req , res) =>{
    try {
        console.log('in controller .. ');
        var store_id = req.params.store_id;
        var GET_ALL_BOOKS_IN_STORE = query.queryList.GET_ALL_BOOKS_IN_STORE;
        var result = await dbconnect.DataBaseQuery(GET_ALL_BOOKS_IN_STORE,[store_id]);
        console.log('GET_ALL_BOOKS_IN_STORE' + " in code : " + store_id );
        return res.status(200).send(JSON.stringify(result.rows));
    } catch (error) {
        console.log("error : " + error);  
        return res.status(500).send({error : 'ERROR , cant select all Books'});
    }
}
exports.getBooksByPageRange = async (req, res) => {
    try {
      const  startPage = req.params.startPage;
      const  endPage = req.params.endPage;
      const getBooksByPageRangeQuery = query.queryList.GET_BOOKS_BY_PAGE_RANGE;
      const result = await dbconnect.DataBaseQuery(getBooksByPageRangeQuery, [startPage, endPage]);
      return res.status(200).send(JSON.stringify(result.rows));
    } catch (error) {
      console.log('error:', error);
      return res.status(500).send({ error: 'ERROR: Unable to retrieve books by page range' });
    }
  };
  
exports.getBooksByAuthorID = async (req, res) => {
    try {
      const author_id = req.params.author_id ;
      const getBooksByAuthorQuery = query.queryList.GET_BOOKS_BY_AUTHOR_ID;
      const result = await dbconnect.DataBaseQuery(getBooksByAuthorQuery, [author_id]);
      return res.status(200).send(JSON.stringify(result.rows));
    } catch (error) {
      console.log('error: ', error);
      return res.status(500).send({ error: 'ERROR: Unable to retrieve books by author' });
    }
  }

  exports.getBooksByAuthorName = async (req, res) => {
    try {
      const author_name = req.params.author_name ;
      const getBooksByAuthorQuery = query.queryList.GET_BOOKS_BY_AUTHOR_NAME;
      const result = await dbconnect.DataBaseQuery(getBooksByAuthorQuery, [author_name]);
      console.log(author_name);
      return res.status(200).send(JSON.stringify(result.rows));
    } catch (error) {
      console.log('error: ', error);
      return res.status(500).send({ error: 'ERROR: Unable to retrieve books by author' });
    }
  }
  exports.getBookDetailsByTitle = async (req, res) => {
    try {
      const title = req.params.title;
      const getBookDetailsQuery = query.queryList.GET_BOOK_DETAILS_BY_TITLE;
      const result = await dbconnect.DataBaseQuery(getBookDetailsQuery, [title]);
      if (result.rows.length === 0) {
        return res.status(404).send({error : 'ERROR , cant FOUND IT'});
      }
      return res.status(200).send(JSON.stringify(result.rows));
    } catch (error) {
      console.log('error:', error);
      return res.status(500).send({error : 'ERROR , cant select all Books'});
    }
  }

exports.saveBook =  async (req , res) =>{
    try {
        console.log('in controller .. ');
        var create_by = 'admin';
        var create_on = new Date();
        var title = req.body.title;
        var publisher  = req.body.publisher;
        var pages = req.body.pages;
        var description = req.body.description;
        var store_id = req.body.store_id;
        var author_id = req.body.author_id;
        if (!title  || !store_id ||  !publisher || !author_id){
            return res.status(500).send({error : ' all should not be empty '});
        }
        values = [title, description, publisher, pages, author_id, store_id, create_on, create_by];

        console.log(values);
        var save_new_book = query.queryList.SAVE_NEW_BOOK;
        console.log('save_new_book');
        await dbconnect.DataBaseQuery(save_new_book , values);
        
        return res.status(201).send("done , saved in database ") ;
    } catch (error) { 
        console.log("error : " + error) ;
        return res.status(500).send({error : 'ERROR , cant save'});
    }
}

 
exports.updateBook =  async (req , res) =>{
    try {
        console.log('in controller .. ');
        var create_by = 'admin';
        var create_on = new Date();
        var title = req.body.title;
        var bookID=req.body.bookID;
        var publisher  = req.body.publisher;
        var pages = req.body.pages;
        var description = req.body.description;
        var author_id = req.body.author_id;
        var store_id = req.body.store_id;
        if (!title || !store_id ||  !publisher || !author_id){
            return res.status(500).send({error : ' book author and book title be not empty '});
        }
        values = [title, description, publisher, pages,store_id, author_id,  create_on, create_by, bookID];
        console.log(values);
        var update_book = query.queryList.UPDATE_BOOK;
        await dbconnect.DataBaseQuery(update_book , values);
        
        return res.status(201).send("done , saved in database ") ;
    } catch (error) { 
        console.log("error : " + error) ;
        return res.status(500).send({error : 'ERROR , cant save'});
    }

}

exports.deleteBook = async (req , res) => {
    var id = req.params.id;
    try {
      if(!id){
        return res.status(500).send({ error: 'can not delete empty bookId' })
        }
        var deleteBookQuery = query.queryList.DELETE_BOOK;
        console.log('delete with id .. ' + id);
        await dbconnect.DataBaseQuery(deleteBookQuery , [id]);
        return res.status(200).send("Successfully book deleted ");
    } catch (err) {
        console.log("Error : " + err);
        return res.status(500).send({error : 'Failed to delete book with id : '+ id});
    }
}


exports.arrangeBooksAlphabetically = async (req, res) => {
  try {
    const arrangeBooksQuery = query.queryList.ARRANGE_BOOKS_ALPHABETICALLY;
    const result = await dbconnect.DataBaseQuery(arrangeBooksQuery);
    console.log(result);
    return res.status(200).send(JSON.stringify(result.rows));
  } catch (error) {
    console.log('error: ', error);
    return res.status(500).send({ error: 'ERROR: Unable to retrieve books' });
  }
};
