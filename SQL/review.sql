use MovieDB


CREATE TABLE MovieSch.ReviewMovi
(
    ReviewId INT IDENTITY(1,1) PRIMARY KEY,
    MovieId INT NOT NULL,
    UserAccountId NVARCHAR(100) NOT NULL,
    ReviewText NVARCHAR(MAX) NOT NULL,
    CreatedAt DATETIME NOT NULL,
    UpdatedAt DATETIME NULL
);



CREATE PROCEDURE AddReview
    @MovieId INT,
    @UserAccountId NVARCHAR(100),
    @ReviewText NVARCHAR(MAX)
AS
BEGIN
    INSERT INTO MovieSch.ReviewMovi (MovieId, UserAccountId, ReviewText, CreatedAt)
    VALUES (@MovieId, @UserAccountId, @ReviewText, GETUTCDATE());
END



CREATE PROCEDURE GetReviewsByMovie
    @MovieId INT
AS
BEGIN
    SELECT ReviewId, MovieId, UserAccountId, ReviewText, CreatedAt, UpdatedAt
    FROM MovieSch.ReviewMovi
    WHERE MovieId = @MovieId
    ORDER BY CreatedAt DESC;
END




CREATE PROCEDURE GetReviewById
    @ReviewId INT
AS
BEGIN
    SELECT ReviewId, MovieId, UserAccountId, ReviewText, CreatedAt, UpdatedAt
    FROM MovieSch.ReviewMovi
    WHERE ReviewId = @ReviewId;
END




CREATE PROCEDURE UpdateReview
    @ReviewId INT,
    @ReviewText NVARCHAR(MAX),
    @UpdatedAt DATETIME
AS
BEGIN
    UPDATE MovieSch.ReviewMovi
    SET ReviewText = @ReviewText, UpdatedAt = @UpdatedAt
    WHERE ReviewId = @ReviewId;
END




CREATE PROCEDURE DeleteReview
    @ReviewId INT
AS
BEGIN
    DELETE FROM MovieSch.ReviewMovi
    WHERE ReviewId = @ReviewId;
END

exec GetReviewById


select * from MovieSch.ReviewMovi

truncate table  MovieSch.ReviewMovi