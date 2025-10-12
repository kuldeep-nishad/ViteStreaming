use MovieDB

select * from sys.schemas

drop table MovieSch.UserDetail

    CREATE TABLE MovieSch.UserDetail (
    Userid INT primary key IDENTITY(1,1),  -- Auto-increment ID
    Name NVARCHAR(15) NULL,             -- Name is optional
    Email NVARCHAR(30) NOT NULL UNIQUE, -- Email is required & unique
    PhoneNumber NVARCHAR(20) NULL,      -- Phone number optional
    OTP NVARCHAR(6) NULL,               -- OTP can be null initially
    OTPCreatedAt DATETIME NULL,             -- OTP timestamp
     UserAccountId NVARCHAR(10) NOT NULL DEFAULT (LEFT(CONVERT(VARCHAR(36), NEWID()), 10)) UNIQUE
);



    select * from MovieSch.UserDetail


CREATE PROCEDURE INSERT_USERDETAIL
@Name NVARCHAR(30),
@Email NVARCHAR(50),
@PhoneNumber NVARCHAR(20)
AS
BEGIN
    INSERT INTO MovieSch.UserDetail(Name, Email, PhoneNumber)
    VALUES (@Name, @Email, @PhoneNumber);
END

   


   CREATE PROCEDURE UPDATE_USERDETAIL
    @Id INT,
    @Name NVARCHAR(30),
    @PhoneNumber NVARCHAR(20)
AS
BEGIN
    UPDATE MovieSch.UserDetail
    SET Name = @Name,
        PhoneNumber = @PhoneNumber
    WHERE Userid = @Id;
END




CREATE PROCEDURE UPDATE_USER_OTP
    @Email NVARCHAR(50),
    @OTP NVARCHAR(6),
    @OTPCreatedAt DATETIME
AS
BEGIN
    UPDATE MovieSch.UserDetail
    SET OTP = @OTP,
        OTPCreatedAt = @OTPCreatedAt
    WHERE Email = @Email;
END




CREATE PROCEDURE DELETE_USER
    @Id INT
AS
BEGIN
    DELETE FROM MovieSch.UserDetail
    WHERE userId = @Id;
END


CREATE PROCEDURE GET_USER_BY_EMAIL
    @Email NVARCHAR(50)
AS
BEGIN
    SELECT * FROM MovieSch.UserDetail
    WHERE Email = @Email;
END

-- Insert dummy data into MovieSch.UserDetail
INSERT INTO MovieSch.UserDetail (Name, Email, PhoneNumber, OTP, OTPCreatedAt)
VALUES 
('Alex', 'alex@gmail.com', '9876543210', '123456', GETDATE()),
('Sophia', 'sophia@yahoo.com', '9123456780', '654321', GETDATE()),
('John', 'john123@hotmail.com', '9988776655', NULL, NULL),
('Emma', 'emma@gmail.com', NULL, '112233', GETDATE()),
('Liam', 'liam@outlook.com', '9001122334', NULL, NULL),
('Olivia', 'olivia@yahoo.com', '9112233445', '778899', GETDATE()),
('Noah', 'noah@gmail.com', '9887766554', NULL, NULL),
('Mia', 'mia123@gmail.com', '9223344556', '445566', GETDATE()),
('Ethan', 'ethan@hotmail.com', NULL, NULL, NULL),
('Ava', 'ava@protonmail.com', '9332211445', '889900', GETDATE());


SELECT * FROM MovieSch.UserDetail WHERE Email='alex@gmail.com';

EXEC GET_USER_BY_EMAIL @Email = 'alex@gmail.com'

exec DELETE_USER @id=12

truncate table MovieSch.UserDetail