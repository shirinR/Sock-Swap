DROP DATABASE IF EXISTS socks_db;
CREATE database socks_db;

USE socks_db;

CREATE TABLE items (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL,
	description VARCHAR(500) NOT NULL,
	condition VARCHAR(100) NOT NULL,
	value DECIMAL(10,4) NOT NULL,
	trade_request BOOLEAN DEFAULT false,
	image_path VARCHAR(100) NOT NULL,
	FOREIGN KEY (id) REFERENCES owners(id),
	PRIMARY KEY (id)
);

CREATE TABLE owners (
	id INT NOT NULL AUTO_INCREMENT,
	user_name VARCHAR(100) NOT NULL,
	password VARCHAR (20) NOT NULL,

	
	PRIMARY KEY (id)
);