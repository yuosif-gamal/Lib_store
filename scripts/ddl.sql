CREATE SCHEMA bms;
CREATE TABLE bms.book (
	book_id serial4 NOT NULL,
	book_title varchar(500) NOT NULL,
	book_description varchar(10000) NULL,
	author_id int4 NOT NULL,
	book_publisher varchar(50) NOT NULL,
	book_pages int4 NULL,
	store_id int4 NOT NULL,
	created_on timestamp NOT NULL,
	created_by varchar(50) NOT NULL,
	CONSTRAINT book_pkey PRIMARY KEY (book_id)
);

ALTER TABLE bms.book ADD CONSTRAINT book_author_fk FOREIGN KEY (author_id) REFERENCES bms.author(author_id);
ALTER TABLE bms.book ADD CONSTRAINT book_store_fk FOREIGN KEY (store_id) REFERENCES bms.store(store_id);
CREATE TABLE bms.store (
	store_id serial4 NOT NULL,
	store_name varchar(500) NOT NULL,
	store_code varchar(5) NOT NULL,
	store_address varchar(50) NOT NULL,
	created_on timestamp NOT NULL,
	created_by varchar(50) NOT NULL,
	CONSTRAINT store_pkey PRIMARY KEY (store_id)
);


CREATE TABLE bms.users (
	user_id serial4 NOT NULL,
	username varchar(50) NOT NULL,
	"password" varchar(50) NOT NULL,
	email varchar(355) NOT NULL,
	created_on timestamp NOT NULL,
	last_login timestamp NULL,
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_pkey PRIMARY KEY (user_id),
	CONSTRAINT users_username_key UNIQUE (username)
);


CREATE TABLE bms.author (
	author_id serial4 NOT NULL,
	author_name varchar(100) NOT NULL,
	author_nationality varchar(50) NULL,
	created_on timestamp NOT NULL,
	created_by varchar(50) NOT NULL,
	age int4 NULL,
	CONSTRAINT author_pkey PRIMARY KEY (author_id)
);


CREATE OR REPLACE FUNCTION bms.arrange_books_alphabetically()
  RETURNS TABLE(book_title varchar(500), book_description varchar(10000), author_id int4, book_publisher varchar(50), book_pages int4, store_id int4, created_on timestamp, created_by varchar(50))
  LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
    SELECT b.book_title, b.book_description, b.author_id, b.book_publisher, b.book_pages, b.store_id, b.created_on, b.created_by
    FROM bms.book AS b
    ORDER BY b.book_title;
END;
$$;

CREATE OR REPLACE FUNCTION bms.calculate_number_total_books_in_store(p_store_id integer)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE
  total_books INTEGER;
BEGIN
  SELECT COUNT(*)
  INTO total_books
  FROM bms.book
  WHERE store_id = p_store_id;

  RETURN total_books;
END;
$function$;

CREATE OR REPLACE FUNCTION bms.get_books_in_range_of_pages(start_page INT, end_page INT)
  RETURNS TABLE (
    book_id INT,
    book_title VARCHAR(500),
    author_id INT,
    book_pages INT
  )
AS $$
BEGIN
  RETURN QUERY
    SELECT b.book_id, b.book_title, b.author_id, b.book_pages
    FROM bms.book AS b
    WHERE b.book_pages >= start_page AND b.book_pages <= end_page;
END;
$$ LANGUAGE plpgsql;
