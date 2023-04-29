exports.queryList = {
    GET_ALL_STORS : 'SELECT STORE_ID, STORE_NAME, STORE_CODE FROM BMS.STORE',
    SAVE_NEW_STORE : 'INSERT INTO bms.store(store_name, store_code, store_address, created_on, created_by) VALUES($1,$2, $3, $4, $5)',
    GET_ALL_BOOKS : 'SELECT book_id, book_title,  book_author, book_pages  FROM bms.book',

    GET_BOOK_DETAILS :`SELECT BOOK_ID, BOOK_TITLE, BOOK_DESCRIPTION, BOOK_AUTHOR, BOOK_PUBLISHER, BOOK_PAGES, BOOK.STORE_CODE, BOOK.CREATED_ON, BOOK.CREATED_BY , STORE.STORE_NAME , STORE.STORE_ADDRESS FROM BMS.BOOK INNER JOIN BMS.STORE ON BOOK.STORE_CODE = STORE.STORE_CODE 
    WHERE BOOK_ID =$1`,

    GET_ALL_BOOKS_IN_STORE :'SELECT * from bms.book where store_code = $1',

    UPDATE_BOOK : 'UPDATE bms.book SET book_title=$1, book_description=$2, book_author=$3, book_publisher=$4, book_pages=$5, store_code=$6, created_on=$7, created_by=$8 WHERE book_id=$9',
    SAVE_NEW_BOOK :'INSERT INTO bms.book (book_title, book_description, book_author, book_publisher, book_pages, store_code, created_on, created_by) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
    DELETE_BOOK :'DELETE FROM bms.book WHERE book_id=$1'
}