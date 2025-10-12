use MovieDB

select * from sys.schemas

create table MovieSch.Movieinfo(
    MovieID INT PRIMARY KEY identity (1,1),
    Title NVARCHAR(100) NOT NULL,
    ReleaseDate DATE,
    Runtime NVARCHAR(50),
    Rating NVARCHAR(15),
    AgeRecommendation NVARCHAR(15),
    MovieSummary NVARCHAR(250),
    Keywords NVARCHAR(200),
    PosterUrl NVARCHAR(80),
    VideoUrl  NVARCHAR(100),
    Category NVARCHAR(50)

    )

    select * from MovieSch.Movieinfo

    create procedure InsertMoviDetail    --used
    @Title NVARCHAR(100),
    @ReleaseDate DATE,
    @Runtime NVARCHAR(50),
    @Rating NVARCHAR(15),
    @AgeRecommendation NVARCHAR(15),
    @MovieSummary NVARCHAR(250),
    @Keywords NVARCHAR(200),
    @PosterUrl NVARCHAR(80),
    @VideoUrl  NVARCHAR(100),
    @Category NVARCHAR(50) 
    as
    begin
    insert into MovieSch.Movieinfo
    values(@Title,@ReleaseDate,@Runtime,@Rating,@AgeRecommendation,@MovieSummary,@Keywords,@PosterUrl,@VideoUrl ,@Category)
    end


    create procedure GetMoviDetail   --used
    as
    begin
    Select * from MovieSch.Movieinfo with (nolock)
    end

    exec GetMoviDetail


    create procedure GetMoviById   --used
    @MoById int
    as
    begin
    Select * from MovieSch.MovieInfo with (nolock) where  MovieID =@MoById
    end

    create procedure  DeleteMoviDetail   --used
    @movId int
    as
    begin
    delete from MovieSch.Movieinfo 
    where MovieID=@movId
    end

    SELECT * FROM sys.procedures WHERE name = 'DeleteMoviDetail';


    create procedure UpdateMoviDetail     --used
    @movId INT,
    @Title NVARCHAR(100),
    @ReleaseDate DATE,
    @Runtime NVARCHAR(50),
    @Rating NVARCHAR(15),
    @AgeRecommendation NVARCHAR(15),
    @MovieSummary NVARCHAR(250),
    @Keywords NVARCHAR(200),
    @PosterUrl NVARCHAR(80),
    @VideoUrl  NVARCHAR(100),
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
        Category =@Category
    WHERE MovieID = @movId;
   END


   DROP PROCEDURE IF EXISTS InsertMoviDetail;
DROP PROCEDURE IF EXISTS GetMoviDetail;
DROP PROCEDURE IF EXISTS GetMoviById;
DROP PROCEDURE IF EXISTS DeleteMoviDetail;
DROP PROCEDURE IF EXISTS UpdateMoviDetail;

CREATE PROCEDURE SearchMoviesByTitle  --used
    @Title NVARCHAR(100)
AS
BEGIN
    SELECT * 
    FROM MovieSch.Movieinfo with (nolock)
    WHERE Title LIKE '%' + @Title + '%';
END

EXEC SearchMoviesByTitle @Title = 'x';


select * from MovieSch.Movieinfo where Title like '%Tokyo%'

IF OBJECT_ID('MovieSch.SearchMoviesByTitle', 'P') IS NOT NULL
    DROP PROCEDURE MovieSch.SearchMoviesByTitle;
GO



ALTER TABLE MovieSch.Movieinfo
ADD Category NVARCHAR(50);

truncate table MovieSch.Movieinfo



INSERT INTO MovieSch.Movieinfo
(Title, ReleaseDate, Runtime, Rating, AgeRecommendation, MovieSummary, Keywords, PosterUrl, VideoUrl, Category)
VALUES
('Avengers: Endgame', '2019-04-26', '181 min', 'IMDb 8.4/10', '13+', 'After Thanos wipes out half the universe, the remaining Avengers assemble to reverse his actions.', 'Avengers, Marvel, Superhero, Endgame', '/img/avengers-endgame.jpeg', '/img/avengers-endgame.mp4', 'Marvel'),  --all img work video erro
('Avengers: Infinity War', '2018-04-27', '149 min', 'IMDb 8.4/10', '13+', 'Avengers and allies attempt to stop Thanos from collecting all the Infinity Stones.', 'Avengers, Marvel, Infinity War, Thanos', '/img/avengers-infinitywar.jpeg', '/img/avengers-endgame.mp4', 'Marvel'),
('Black Panther', '2018-02-16', '134 min', 'IMDb 7.3/10', '13+', 'T''Challa returns home to Wakanda to take the throne but faces a powerful challenger.', 'Black Panther, Wakanda, Marvel', '/img/black-panther.jpeg', '/img/avengers-endgame.mp4', 'Marvel'),
('Black Panther: Wakanda Forever', '2022-11-11', '161 min', 'IMDb 6.8/10', '13+', 'Wakanda grieves T''Challa and must defend their nation while introducing new heroes.', 'Black Panther, Wakanda Forever, Marvel', '/img/wakanda-forever.jpg', '/imgavengers-endgame.mp4', 'Marvel'),
('Captain Marvel', '2019-03-08', '123 min', 'IMDb 6.7/10', '13+', 'Carol Danvers becomes one of the universe''s most powerful heroes when Earth is caught in the middle of a galactic war.', 'Captain Marvel, Marvel, Brie Larson', '/img/captain-marvel.jpg', '/img/avengers-endgame.mp4', 'Marvel'),
('Doctor Strange', '2016-11-04', '115 min', 'IMDb 7.5/10', '13+', 'A neurosurgeon''s life changes after a car accident leads him to discover the hidden world of magic and alternate dimensions.', 'Doctor Strange, Marvel, Magic', '/img/doctor-strange.jpeg', '/img/avengers-endgame.mp4', 'Marvel'),
    
('Fast X', '2023-05-19', '141 min', 'IMDb 6.1/10', '13+', 'Dominic Toretto and family face a vengeful foe in the tenth main Fast & Furious installment.', 'Fast X, Fast & Furious, Action, Cars', '/img/fast-x.jpeg', '/img/fast-x.mp4', 'Latest Release'),
(' Wakanda Forever', '2022-11-11', '161 min', 'IMDb 6.8/10', '13+', 'Wakanda grieves Challa and must defend their nation while introducing new heroes.', 'Black Panther, Wakanda Forever, Marvel', '/img/wakanda-forever.jpg', '/img/wakanda-forever.mp4', 'Latest Release'),
('Snow White (Upcoming)', '2025-12-25', 'TBD', 'IMDb TBD', 'All', 'Live-action retelling of Snow White with modern effects and storytelling.', 'Snow White, Disney, Fairy Tale', '/img/snow-white.jpg', '/img/snow-white.mp4', 'Latest Release'),
('Start-Up', '2020-10-17', '60 min per episode', 'IMDb 8.2/10', '13+', 'Drama following young entrepreneurs and their start-up journey.', 'Start-Up, K-Drama, Business', '/img/startup.jpeg', '/img/startup.mp4', 'Latest Release'), 
('Business Proposal', '2022-02-28', '70 min per episode', 'IMDb 8.1/10', '13+', 'A quirky romance unfolds between a boss and his employee.', 'Business Proposal, K-Drama, Romance', '/img/business-proposal.jpg', '/img/business-proposal.mp4', 'Latest Release'),  


('Beauty and the Beast', '2017-03-17', '129 min', 'IMDb 7.1/10', 'All', 'Live-action remake: Belle forms an unlikely friendship with a prince trapped in a beasts form.', 'Beauty and the Beast, Disney, Fairy Tale', '/img/beauty-beast.jpeg', '/img/beauty-beast.mp4', 'Fairytale'),
('Frozen', '2013-11-27', '102 min', 'IMDb 7.4/10', 'All', 'Sisters Elsa and Anna navigate magic, family, and an eternal winter in their kingdom.', 'Frozen, Disney, Elsa, Anna', '/img/frozen-1.jpeg', '/img/frozen.mp4', 'Fairytale'),
('Frozen II', '2019-11-22', '103 min', 'IMDb 6.9/10', 'All', 'Elsa, Anna, and friends travel to an enchanted forest to discover the origin of Elsa powers.', 'Frozen II, Disney, sequel', '/img/frozen-2.jpeg', '/img/frozen.mp4', 'Fairytale'),--
('Snow White and the Seven Dwarfs', '1937-12-21', '83 min', 'IMDb 7.6/10', 'All', 'Classic Disney animated film where Snow White befriends seven dwarfs and faces the Evil Queen.', 'Snow White, Disney, Classic, Fairy Tale', '/img/snow-white.jpg', '/img/snow-white.mp4', 'Fairytale'),
('Tangled', '2010-11-24', '100 min', 'IMDb 7.7/10', 'All', 'Rapunzel, a long-lost princess with magical hair, sets off on an adventure with a runaway thief.', 'Tangled, Disney, Rapunzel', '/img/tangled.jpeg', '/img/tangled.mp4', 'Fairytale'),
('Cinderella (2015)', '2015-03-13', '105 min', 'IMDb 6.9/10', 'All', 'A live-action retelling of the classic fairy tale about a young woman who finds love with a prince.', 'Cinderella, Disney, Fairy Tale', '/img/cinderella.jpeg', '/img/cinderella.mp4', 'Fairytale'),
('Maleficent', '2014-05-30', '97 min', 'IMDb 7.0/10', 'All', 'A reimagining of Disney Sleeping Beauty, told from the perspective of the villain Maleficent.', 'Maleficent, Disney, Angelina Jolie', '/img/maleficent.jpeg', '/img/maleficent.mp4', 'Fairytale'),


('Hera Pheri', '2000-03-31', '138 min', 'IMDb 8.2/10', '13+', 'Three struggling men get entangled in a ransom/phone-scam comedy of errors.', 'Hera Pheri, Bollywood, Comedy, Akshay Kumar', '/img/hera-pheri.jpeg', '/img/hera-pheri.mp4', 'Comedy'),
('Phir Hera Pheri', '2006-06-09', '153 min', 'IMDb 7.7/10', '13+', 'Sequel to Hera Pheri; more money-trouble and comic misunderstandings for the same trio.', 'Phir Hera Pheri, Bollywood, Comedy', '/img/phir-hera-pheri.jpeg', '/img/phir-hera-pheri.mp4', 'Comedy'),
('Welcome', '2007-12-21', '158 min', 'IMDb 7.2/10', '13+', 'A comical gangster-family meets a man who wants to marry into chaos and laughter ensues.', 'Welcome, Bollywood, Comedy', '/img/welcome.jpeg', '/img/welcome.mp4', 'Comedy'),
('Entertainment', '2014-08-08', '150 min', 'IMDb 5.5/10', '13+', 'A man discovers that his father left him a fortune, but there a catch: he has to share it with a dog.', 'Entertainment, Bollywood, Comedy', '/img/entertainment.jpg', '/img/entertainment.mp4', 'Comedy'),
('Dhamaal', '2007-12-07', '145 min', 'IMDb 7.1/10', '13+', 'Four friends embark on a journey to find a hidden treasure, leading to a series of comedic situations.', 'Dhamaal, Bollywood, Comedy', '/img/dhamaal.jpeg', '/img/dhamaal.mp4', 'Comedy'),
('Golmaal: Fun Unlimited', '2006-07-14', '142 min', 'IMDb 7.5/10', '13+', 'Four friends antics and misunderstandings lead to comic situations and mayhem.', 'Golmaal, Bollywood, Comedy, Rohit Shetty', '/img/golmaal.jpeg', '/img/golmaal.mp4', 'Comedy'), 
('Housefull', '2010-04-30', '145 min', 'IMDb 6.7/10', '13+', 'A man is forced to marry a woman he doesnt love, leading to a series of comedic events.', 'Housefull, Bollywood, Comedy', '/img/housefull.jpeg', '/img/housefull.mp4', 'Comedy'),


('Pokémon Detective Pikachu', '2019-05-10', '104 min', 'IMDb 6.6/10', 'All', 'A young man teams up with a talking Pikachu to uncover the mystery of his missing father.', 'Pokemon, Detective Pikachu, Family, Live-action', '/img/pokemon.jpeg', '/img/pokemon.mp4', 'Family/Kids'),
('Motu Patlu: King of Kings', '2016-10-14', '110 min', 'IMDb 5.7/10', 'All', 'Animated feature based on the Indian TV characters Motu and Patlu on a jungle adventure.', 'Motu Patlu, Indian animation, Kids', '/img/motu-patlu.jpeg', '/img/motu-patlu.mp4', 'Family/Kids'),
('Oggy and the Cockroaches', '1998-09-06', '21 min', 'IMDb 7.2/10', 'All', 'French slapstick animated series about Oggy and three troublemaking cockroaches (episodes ~21 min).', 'Oggy, animated series, slapstick, kids', '/img/oggy.jpeg', '/img/oggy.mp4', 'Family/Kids'),
('Pakdam Pakdai', '2010-01-01', '5 min', 'IMDb 6.0/10', 'All', 'Indian animated series featuring the adventures of a dog and a mouse.', 'Pakdam Pakdai, Indian animation, Kids', '/img/pakdam-pakdai.jpeg', '/img/pakdam-pakdai.mp4', 'Family/Kids'),
('Zig & Sharko', '2010-01-01', '7 min', 'IMDb 6.5/10', 'All', 'French animated series about a shark who tries to eat a mermaid, thwarted by a hyena.', 'Zig & Sharko, French animation, Kids', '/img/zig-sharko.jpeg', '/img/zig-sharko.mp4', 'Family/Kids'),

('Oggy and the Cockroaches', '1998-09-06', '21 min', 'IMDb 7.2/10', 'All', 'French slapstick animated series about Oggy and three troublemaking cockroaches (episodes ~21 min).', 'Oggy, animated series, slapstick, kids', '/img/oggy.jpeg', '/img/oggy.mp4', 'Kids Corner'),
('Pakdam Pakdai', '2010-01-01', '5 min', 'IMDb 6.0/10', 'All', 'Indian animated series featuring the adventures of a dog and a mouse.', 'Pakdam Pakdai, Indian animation, Kids', '/img/pakdam-pakdai.jpeg', '/img/pakdam-pakdai.mp4', 'Kids Corner'),
('Zig & Sharko', '2010-01-01', '7 min', 'IMDb 6.5/10', 'All', 'French animated series about a shark who tries to eat a mermaid, thwarted by a hyena.', 'Zig & Sharko, French animation, Kids', '/img/zig-sharko.jpeg', '/img/zig-sharko.mp4', 'Kids Corner'),


('Sultan', '2016-07-06', '170 min', 'IMDb 7.5/10', '13+', 'A wrestler struggles for redemption and love in this sports drama starring Salman Khan.', 'Sultan, Salman Khan, Bollywood, Sports Drama', '/img/sultan.jpeg', '/img/sultan.mp4', 'Superhit Movies'),--
('Toilet: Ek Prem Katha', '2017-08-11', '105 min', 'IMDb 7.0/10', '13+', 'A man fights social stigma to build a toilet in his village to win back his wife.', 'Toilet Ek Prem Katha, Akshay Kumar, Bollywood, Social Comedy', '/img/toilet.jpeg', '/img/toilet.mp4', 'Superhit Movies'),--
('The Fate of the Furious', '2017-04-14', '136 min', 'IMDb 6.6/10', '13+', 'Dominic is forced to betray his crew when a mysterious woman manipulates him.', 'F8, Fast & Furious, Action', '/img/Fast-8.jpeg', '/img/Fast-8.mp4', 'Superhit Movies'),
('F9: The Fast Saga', '2021-06-25', '143 min', 'IMDb 5.2/10', '13+', 'Dom and the crew face a new threat while confronting family secrets and past.', 'F9, Fast & Furious, Action', '/img/Fast-9.jpeg', '/img/fast-x.mp4', 'Superhit Movies'),
('Fast X', '2023-05-19', '141 min', 'IMDb 6.1/10', '13+', 'Dominic Toretto and family face a vengeful foe in the tenth main Fast & Furious installment.', 'Fast X, Fast & Furious, Action, Cars', '/img/fast-x.jpeg', '/img/fast-x.mp4', 'Superhit Movies'),
('Hera Pheri', '2000-03-31', '138 min', 'IMDb 8.2/10', '13+', 'Three struggling men get entangled in a ransom/phone-scam comedy of errors.', 'Hera Pheri, Bollywood, Comedy', '/img/hera-pheri.jpeg', '/img/hera-pheri.mp4', 'Superhit Movies'),
('Avengers: Infinity War', '2018-04-27', '149 min', 'IMDb 8.4/10', '13+', 'Avengers and allies attempt to stop Thanos from collecting all the Infinity Stones.', 'Avengers, Marvel, Infinity War, Thanos', '/img/avengers-infinitywar.jpeg', '/img/avengers-endgame.mp4', 'Superhit Movies'),


('Pokémon Detective Pikachu', '2019-05-10', '104 min', 'IMDb 6.6/10', 'All', 'A young man teams up with a talking Pikachu to uncover the mystery of his missing father.', 'Pokemon, Detective Pikachu, Family, Live-action', '/img/pokemon.jpeg', '/img/pokemon.mp4', 'Kids Corner'),
('Motu Patlu: King of Kings', '2016-10-14', '110 min', 'IMDb 5.7/10', 'All', 'Animated feature based on the Indian TV characters Motu and Patlu on a jungle adventure.', 'Motu Patlu, Indian animation, Kids', '/img/motu-patlu.jpeg', '/img/motu-patlu.mp4', 'Kids Corner'),
('Oggy and the Cockroaches', '1998-09-06', '21 min', 'IMDb 7.2/10', 'All', 'French slapstick animated series about Oggy and three troublemaking cockroaches.', 'Oggy, animated series, slapstick, kids', '/img/oggy.jpeg', '/img/oggy.mp4', 'Kids Corner'),
('Zig & Sharko', '2010-01-01', '7 min', 'IMDb 6.5/10', 'All', 'French animated series about a shark who tries to eat a mermaid, thwarted by a hyena.', 'Zig & Sharko, French animation, Kids', '/img/zig-sharko.jpeg', '/img/zig-sharko.mp4', 'Kids Corner'),
('The Bad Guys', '2022-04-22', '100 min', 'IMDb 6.9/10', 'All', 'A group of animal criminals attempt to pull off a heist while trying to go "good".', 'The Bad Guys, DreamWorks, Animated, Kids', '/img/the-bad-guys.jpeg', '/img/the-bad-guys.mp4', 'Kids Corner'),
('Madagascar', '2005-05-27', '86 min', 'IMDb 6.9/10', 'All', 'Four animals from a New York zoo escape and end up on Madagascar island.', 'Madagascar, DreamWorks, Animated, Kids', '/img/madagascar.jpeg', '/img/madagascar.mp4', 'Kids Corner'),
('Kung Fu Panda', '2008-06-06', '92 min', 'IMDb 7.6/10', 'All', 'A clumsy panda becomes the Dragon Warrior to defend the Valley of Peace.', 'Kung Fu Panda, DreamWorks, Animated, Kids', '/img/kung-fu-panda.jpeg', '/img/kung-fu-panda.mp4', 'Kids Corner'),


('Start-Up', '2020-10-17', '60 min per episode', 'IMDb 8.2/10', '13+', 'Drama following young entrepreneurs and their start-up journey.', 'Start-Up, K-Drama, Business', '/img/startup.jpeg', '/img/startup.mp4', 'K-Drama'),
('Business Proposal', '2022-02-28', '70 min per episode', 'IMDb 8.1/10', '13+', 'A quirky romance unfolds between a boss and his employee.', 'Business Proposal, K-Drama, Romance', '/img/business-proposal.jpg', '/img/business-proposal.mp4', 'K-Drama'),
('My Girlfriend Is an Alien', '2019-01-10', '45 min per episode', 'IMDb 7.9/10', '13+', 'A romantic sci-fi comedy about a woman from outer space.', 'My Girlfriend Is an Alien, C-Drama, Sci-Fi', '/img/my-girlfriend-is-an-alien.jpeg', '/img/my-girlfriend-is-an-alien.mp4', 'K-Drama'),
('Queen of Tears', '2024-01-01', '50 min per episode', 'IMDb TBD', '13+', 'Upcoming drama series about a queen navigating power, betrayal, and love.', 'Queen of Tears, K-Drama, Drama', '/img/queen-of-tears.jpeg', '/img/queen-of-tears.mp4', 'K-Drama'),
('Crash Landing on You', '2019-12-14', '60 min per episode', 'IMDb 8.6/10', '13+', 'A South Korean heiress accidentally lands in North Korea and meets a soldier.', 'Crash Landing on You, K-Drama, Romance', '/img/crash-landing-on-you.jpeg', '/img/crash-landing-on-you.mp4', 'K-Drama'),
('It’s Okay to Not Be Okay', '2020-06-20', '70 min per episode', 'IMDb 8.0/10', '13+', 'A caregiver and a childrens book author form an unlikely bond.', 'Its Okay to Not Be Okay, K-Drama, Romance', '/img/its-okay-to-not-be-okay.jpg', '/img/its-okay-to-not-be-okay.mp4', 'K-Drama');

('Vincenzo', '2021-02-20', '80 min per episode', 'IMDb 8.6/10', '13+', 'A Korean-Italian mafia lawyer returns to Korea to fight a conglomerate.', 'Vincenzo, K-Drama, Crime, Comedy');



 
INSERT INTO MovieSch.Movieinfo
(Title, ReleaseDate, Runtime, Rating, AgeRecommendation, MovieSummary, Keywords, PosterUrl, VideoUrl, Category)
VALUES
('Doctor Strange', '2016-11-04', '115 min', 'IMDb 7.5/10', '13+', 'A neurosurgeon''s life changes after a car accident leads him to discover the hidden world of magic and alternate dimensions.', 'Doctor Strange, Marvel, Magic', '/img/doctor-strange.jpeg', '/img/avengers-endgame.mp4', 'Latest Release'),
('Madagascar', '2005-05-27', '86 min', 'IMDb 6.9/10', 'All', 'Four animals from a New York zoo escape and end up on Madagascar island.', 'Madagascar, DreamWorks, Animated, Kids', '/img/madagascar.jpeg', '/img/madagascar.mp4', 'Family/Kids'),
('Kung Fu Panda', '2008-06-06', '92 min', 'IMDb 7.6/10', 'All', 'A clumsy panda becomes the Dragon Warrior to defend the Valley of Peace.', 'Kung Fu Panda, DreamWorks, Animated, Kids', '/img/kung-fu-panda.jpeg', '/img/kung-fu-panda.mp4', 'Family/Kids')




