CREATE DATABASE geniat

CREATE TABLE geniat.dbo.Users (
	id int IDENTITY(1,1) NOT NULL,
	Name nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	LastName nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Email nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Password nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[Role] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	createdAt datetimeoffset NOT NULL,
	updatedAt datetimeoffset NOT NULL,
	CONSTRAINT PK__Users__3213E83F7B2677BA PRIMARY KEY (id)
);

CREATE TABLE geniat.dbo.Posts (
	id int IDENTITY(1,1) NOT NULL,
	Title nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Description nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Status bit NULL,
	IdUser int NULL,
	createdAt datetimeoffset NOT NULL,
	updatedAt datetimeoffset NOT NULL,
	CONSTRAINT PK__Posts__3213E83F84354843 PRIMARY KEY (id),
	CONSTRAINT Posts_IdUser_Users_fk FOREIGN KEY (IdUser) REFERENCES geniat.dbo.Users(id)
);