CREATE SCHEMA bms;
CREATE TABLE bms.book (
	book_id serial NOT NULL,
	book_title varchar(500) NOT NULL,
	book_description varchar(10000) NULL,
	book_author varchar(50) NOT NULL,
	book_publisher varchar(50) NOT NULL,
	book_pages int4 NULL,
	store_code varchar(5) NOT NULL,
	created_on timestamp NOT NULL,
	created_by varchar(50) NOT NULL,
	CONSTRAINT book_pkey PRIMARY KEY (book_id)
);

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
  user_id serial PRIMARY KEY,
  username VARCHAR (50) UNIQUE NOT NULL,
  password VARCHAR (50) NOT NULL,
  email VARCHAR (355) UNIQUE NOT NULL,
  created_on TIMESTAMP NOT NULL,
  last_login TIMESTAMP
);


CREATE TABLE bms.author (
	author_id serial4 NOT NULL,
	author_name varchar(100) NOT NULL,
	age int4 NULL,
	author_nationality varchar(50) NULL,
	created_on timestamp NOT NULL,
	created_by varchar(50) NOT NULL,
	CONSTRAINT author_pkey PRIMARY KEY (author_id)
);