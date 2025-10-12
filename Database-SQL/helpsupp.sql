USE MovieDB;
GO

-- Drop table if needed (optional)
-- DROP TABLE IF EXISTS MovieSch.HelpSupport;
-- GO

-- Rename column (if table already exists)
ALTER TABLE MovieSch.HelpSupport
RENAME COLUMN Message TO Description;
GO

-- Drop existing procedures
DROP PROCEDURE IF EXISTS INSERT_HELPSUPPORT;
DROP PROCEDURE IF EXISTS GET_TICKETS_BY_USER;
DROP PROCEDURE IF EXISTS GET_ALL_TICKETS;
DROP PROCEDURE IF EXISTS GET_TICKET_BY_ID;
DROP PROCEDURE IF EXISTS UPDATE_TICKET;
GO

-- Create table (if starting fresh)
CREATE TABLE MovieSch.HelpSupport
(
    TicketId INT IDENTITY(1,1) PRIMARY KEY,
    UserAccountId NVARCHAR(100) NOT NULL,
    Subject NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX) NOT NULL,  -- renamed
    CreatedAt DATETIME NOT NULL
);
GO

drop table MovieSch.HelpSupport

-- Insert ticket
CREATE PROCEDURE INSERT_HELPSUPPORT
    @UserAccountId NVARCHAR(100),
    @Subject NVARCHAR(200),
    @Description NVARCHAR(MAX),
    @CreatedAt DATETIME
AS
BEGIN
    INSERT INTO MovieSch.HelpSupport (UserAccountId, Subject, Description, CreatedAt)
    VALUES (@UserAccountId, @Subject, @Description, @CreatedAt)
END
GO

-- Get tickets by user
CREATE PROCEDURE GET_TICKETS_BY_USER
    @UserAccountId NVARCHAR(100)
AS
BEGIN
    SELECT * FROM MovieSch.HelpSupport
    WHERE UserAccountId = @UserAccountId
    ORDER BY CreatedAt DESC
END
GO

-- Get all tickets
CREATE PROCEDURE GET_ALL_TICKETS
AS
BEGIN
    SELECT * FROM MovieSch.HelpSupport
    ORDER BY CreatedAt DESC
END
GO

-- Get single ticket
CREATE PROCEDURE GET_TICKET_BY_ID
    @TicketId INT
AS
BEGIN
    SELECT * FROM MovieSch.HelpSupport
    WHERE TicketId = @TicketId
END
GO

-- Update ticket
CREATE PROCEDURE UPDATE_TICKET
    @TicketId INT,
    @Subject NVARCHAR(200),
    @Description NVARCHAR(MAX)
AS
BEGIN
    UPDATE MovieSch.HelpSupport
    SET Subject = @Subject,
        Description = @Description
    WHERE TicketId = @TicketId
END
GO



ALTER TABLE MovieSch.HelpSupport
ADD Status NVARCHAR(50) DEFAULT 'Pending',
    AdminResponse NVARCHAR(MAX) NULL;
GO


CREATE PROCEDURE GET_TICKETS_BY_USER
    @UserAccountId NVARCHAR(100)
AS
BEGIN
    SELECT TicketId, UserAccountId, Subject, Description, Status, AdminResponse, CreatedAt
    FROM MovieSch.HelpSupport
    WHERE UserAccountId = @UserAccountId
    ORDER BY CreatedAt DESC
END
GO
