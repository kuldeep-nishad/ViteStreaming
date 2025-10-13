create Database MovieDB     /* run each quey one by one */

use  MovieDB

-- Create schema if not exists
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'MovieSch')
BEGIN
    EXEC('CREATE SCHEMA MovieSch');
END;
GO

-- Drop existing table if it exists
DROP TABLE IF EXISTS MovieSch.Movieinfo;
GO

-- Create table
CREATE TABLE MovieSch.Movieinfo (
    MovieID INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(100) NOT NULL,
    ReleaseDate DATE,
    Runtime NVARCHAR(50),
    Rating NVARCHAR(15),
    AgeRecommendation NVARCHAR(15),
    MovieSummary NVARCHAR(250),
    Keywords NVARCHAR(200),
    PosterUrl NVARCHAR(120),
    VideoUrl NVARCHAR(120),
    Category NVARCHAR(50)
);
GO


/* =========================================================
   STORED PROCEDURES
========================================================= */

-- Insert movie
DROP PROCEDURE IF EXISTS MovieSch.InsertMoviDetail;
GO
CREATE PROCEDURE MovieSch.InsertMoviDetail
    @Title NVARCHAR(100),
    @ReleaseDate DATE,
    @Runtime NVARCHAR(50),
    @Rating NVARCHAR(15),
    @AgeRecommendation NVARCHAR(15),
    @MovieSummary NVARCHAR(250),
    @Keywords NVARCHAR(200),
    @PosterUrl NVARCHAR(120),
    @VideoUrl NVARCHAR(120),
    @Category NVARCHAR(50)
AS
BEGIN
    INSERT INTO MovieSch.Movieinfo
    (Title, ReleaseDate, Runtime, Rating, AgeRecommendation, MovieSummary, Keywords, PosterUrl, VideoUrl, Category)
    VALUES
    (@Title, @ReleaseDate, @Runtime, @Rating, @AgeRecommendation, @MovieSummary, @Keywords, @PosterUrl, @VideoUrl, @Category);
END;
GO


-- Get all movies
DROP PROCEDURE IF EXISTS MovieSch.GetMoviDetail;
GO
CREATE PROCEDURE MovieSch.GetMoviDetail
AS
BEGIN
    SELECT * FROM MovieSch.Movieinfo WITH (NOLOCK);
END;
GO


-- Get movie by ID
DROP PROCEDURE IF EXISTS MovieSch.GetMoviById;
GO
CREATE PROCEDURE MovieSch.GetMoviById
    @MoById INT
AS
BEGIN
    SELECT * FROM MovieSch.Movieinfo WITH (NOLOCK)
    WHERE MovieID = @MoById;
END;
GO


-- Delete movie
DROP PROCEDURE IF EXISTS MovieSch.DeleteMoviDetail;
GO
CREATE PROCEDURE MovieSch.DeleteMoviDetail
    @movId INT
AS
BEGIN
    DELETE FROM MovieSch.Movieinfo
    WHERE MovieID = @movId;
END;
GO


-- Update movie
DROP PROCEDURE IF EXISTS MovieSch.UpdateMoviDetail;
GO
CREATE PROCEDURE MovieSch.UpdateMoviDetail
    @movId INT,
    @Title NVARCHAR(100),
    @ReleaseDate DATE,
    @Runtime NVARCHAR(50),
    @Rating NVARCHAR(15),
    @AgeRecommendation NVARCHAR(15),
    @MovieSummary NVARCHAR(250),
    @Keywords NVARCHAR(200),
    @PosterUrl NVARCHAR(120),
    @VideoUrl NVARCHAR(120),
    @Category NVARCHAR(50)
AS
BEGIN
    UPDATE MovieSch.Movieinfo
    SET Title = @Title,
        ReleaseDate = @ReleaseDate,
        Runtime = @Runtime,
        Rating = @Rating,
        AgeRecommendation = @AgeRecommendation,
        MovieSummary = @MovieSummary,
        Keywords = @Keywords,
        PosterUrl = @PosterUrl,
        VideoUrl = @VideoUrl,
        Category = @Category
    WHERE MovieID = @movId;
END;
GO


-- Search movies by title
DROP PROCEDURE IF EXISTS MovieSch.SearchMoviesByTitle;
GO
CREATE PROCEDURE MovieSch.SearchMoviesByTitle
    @Title NVARCHAR(100)
AS
BEGIN
    SELECT *
    FROM MovieSch.Movieinfo WITH (NOLOCK)
    WHERE Title LIKE '%' + @Title + '%';
END;
GO


/* =========================================================
   DUMMY MOVIE DATA (SAFE FOR OPEN SOURCE)
========================================================= */



INSERT INTO MovieSch.Movieinfo
(Title, ReleaseDate, Runtime, Rating, AgeRecommendation, MovieSummary, Keywords, PosterUrl, VideoUrl, Category)
VALUES
('The Last Horizon', '2023-08-12', '142 min', 'IMDb 8.1/10', '13+', 'A team of explorers ventures beyond known galaxies in search of a lost civilization.', 'Sci-Fi, Adventure, Exploration', '/img/dummy1.jpg', '/videos/sample1.mp4', 'Sci-Fi'),
('Crimson Dawn', '2024-01-10', '130 min', 'IMDb 7.6/10', '16+', 'A retired soldier must confront his past to prevent a global war.', 'Action, Thriller, Military', '/img/dummy2.jpg', '/videos/sample2.mp4', 'Action'),
('Echoes of Tomorrow', '2022-05-21', '125 min', 'IMDb 8.0/10', '13+', 'When scientists discover a way to send memories back in time, chaos unfolds.', 'Drama, Sci-Fi, Time Travel', '/img/dummy3.jpg', '/videos/sample3.mp4', 'Drama'),
('Neon Skies', '2023-02-14', '119 min', 'IMDb 7.8/10', '13+', 'In a futuristic city, a hacker fights against an AI-controlled government.', 'Cyberpunk, Technology, AI', '/img/dummy4.jpg', '/videos/sample4.mp4', 'Tech'),
('Parallel Streets', '2021-10-05', '135 min', 'IMDb 7.9/10', '16+', 'Two detectives from different realities investigate the same murder case.', 'Mystery, Thriller, Multiverse', '/img/dummy5.jpg', '/videos/sample5.mp4', 'Mystery');
GO


TRUNCATE TABLE MovieSch.Movieinfo;  /*after checking the data is inser and you are able to see in frontent 
delete the dummy data */
GO      