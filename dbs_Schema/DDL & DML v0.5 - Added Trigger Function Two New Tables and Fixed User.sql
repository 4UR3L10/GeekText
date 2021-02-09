/* Do not forget to Refresh everytime you use DDL */

/* DDL: */
CREATE DATABASE geektext;

USE geektext;

CREATE TABLE `user` 
(
  `UserID` int NOT NULL AUTO_INCREMENT,
  `UserFullName` varchar(50) NOT NULL,
  `Password` varchar(30) NOT NULL,
  `EmailAddress` varchar(50) NOT NULL,
  `EmlAddrssVld` char(1) NOT NULL,
  `NickName` varchar(20) NOT NULL,
  `AnonymusStat` char(1) NOT NULL,
  PRIMARY KEY (`UserID`)
);

/* date format is yyyy-mm-dd */
CREATE TABLE `credit_card` 
(
  `CardNumber` bigint NOT NULL,
  `UserID` int NOT NULL,
  `CardType` varchar(30) NOT NULL,
  `CrdtHldrName` varchar(50) NOT NULL,
  `ExpMonth` int NOT NULL,
  `ExpYear` int NOT NULL,
  `CrdtCrdVld` char(1) NOT NULL,
  `DefaultCard` char(1) NOT NULL,  
  PRIMARY KEY (`CardNumber`)
);

CREATE TABLE `billing_address` 
(
  `BillAddressID` int NOT NULL AUTO_INCREMENT,
  `CardNumber` bigint NOT NULL,
  `BillFirstName` varchar(50) NOT NULL,
  `BillLastName` varchar(50) NOT NULL,
  `BillAddress` varchar(50) NOT NULL,
  `BillAddress2` varchar(50) DEFAULT NULL,
  `BillCity` varchar(50) NOT NULL,
  `BillState` varchar(3) NOT NULL,
  `BillZipCode` varchar(10) NOT NULL,
  `BillCountry` varchar(50) NOT NULL,
  `BillPhnNmbr` varchar(20) NOT NULL,
  PRIMARY KEY (`BillAddressID`)
);

CREATE TABLE `home_address` 
(
  `HomeAddressID` int NOT NULL AUTO_INCREMENT,
  `UserID` int NOT NULL,
  `Address` varchar(50) NOT NULL,
  `Address2` varchar(50) DEFAULT NULL,
  `City` varchar(50) NOT NULL,
  `State` varchar(3) NOT NULL,
  `ZipCode` varchar(10) NOT NULL,
  `Country` varchar(50) NOT NULL,
  `HmAddrssVld` char(1) NOT NULL, 
  PRIMARY KEY (`HomeAddressID`)
);

CREATE TABLE `shipping_address` 
(
  `ShipAddressID` int NOT NULL AUTO_INCREMENT,
  `UserID` int NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `Address` varchar(50) NOT NULL,
  `Address2` varchar(50) DEFAULT NULL,
  `City` varchar(50) NOT NULL,
  `State` varchar(3) NOT NULL,
  `ZipCode` varchar(10) NOT NULL,
  `Country` varchar(50) NOT NULL,
  `DefaultAddress` char(1) NOT NULL,  
  PRIMARY KEY (`ShipAddressID`)
);

/* Check Average */
/* Check Cover */
CREATE TABLE `book` 
(
  `BookID` varchar(15) NOT NULL,
  `BookTitle` varchar(200) NOT NULL,
  `Price` decimal(5,2) NOT NULL,
  `ReleaseDate` date NOT NULL,
  `Cover` mediumblob DEFAULT NULL,
  `ShortBio` varchar(500) NOT NULL,
  `Description` text NOT NULL,
  `Genre` varchar(20) NOT NULL,
  `Stock` int NOT NULL,
  `AvgRate` decimal(2,1) NOT NULL,
  `Biography` text NOT NULL,
  PRIMARY KEY (`BookID`)
); 

CREATE TABLE `publisher` 
(
  `PublisherID` int NOT NULL AUTO_INCREMENT,
  `PublisherName` varchar(20) NOT NULL,
  `PublisherInfo` varchar(500) NOT NULL,
  PRIMARY KEY (`PublisherID`)
);

CREATE TABLE `published` 
(
  `PublisherID` int NOT NULL,
  `BookID` varchar(15) NOT NULL,
  `PublishDate` date NOT NULL,
  PRIMARY KEY (`PublisherID`,`BookID`)
);

CREATE TABLE `author` 
(
  `AuthorID` int NOT NULL AUTO_INCREMENT,
  `BookID` varchar(15) NOT NULL,
  `AuthorFullName` varchar(50) NOT NULL,
  PRIMARY KEY (`AuthorID`)
); 

CREATE TABLE `wishlist` 
(
  `WishListID` int NOT NULL AUTO_INCREMENT,
  `UserID` int NOT NULL,
  `WishListName` varchar(50) NOT NULL,
  PRIMARY KEY (`WishListID`)
); 

CREATE TABLE `wishlist_books` 
(
  `WshLstDtlsID` int NOT NULL AUTO_INCREMENT,
  `WishListID` int NOT NULL,
  `BookID` varchar(15) NOT NULL,
  PRIMARY KEY (`WshLstDtlsID`)
); 

CREATE TABLE `purchase` 
(
  `PurchaseID` int NOT NULL AUTO_INCREMENT,
  `UserID` int NOT NULL,
  `CardNumber` bigint NOT NULL,
  `PurchaseDate` date NOT NULL,
  `PurchaseTime` time NOT NULL,
  `Status` varchar(15) NOT NULL,
  `TrnsctnAmnt` decimal(6,2) NOT NULL,
  PRIMARY KEY (`PurchaseID`)
); 

CREATE TABLE `purchase_details` 
(
  `PrchsDtlsID` int NOT NULL AUTO_INCREMENT,
  `PurchaseID` int NOT NULL,
  `BookID` varchar(15) NOT NULL,
  `Quantity` int NOT NULL,
  PRIMARY KEY (`PrchsDtlsID`)
); 

/* Check unique primary key */
CREATE TABLE `shopping_cart` 
(
  `UserID` int NOT NULL,
  `BookID` varchar(15) NOT NULL,
  `Quantity` int NOT NULL,
  PRIMARY KEY (`UserID`,`BookID`)
); 

/* Check unique primary key */
CREATE TABLE `save_later` 
(
  `UserID` int NOT NULL,
  `BookID` varchar(15) NOT NULL,
  `Quantity` int NOT NULL,
  PRIMARY KEY (`UserID`,`BookID`)
); 

/* Check rate decimal or Int */
/* Check comment size */
CREATE TABLE `rate_comment` 
(
  `RtCmmntID` int NOT NULL AUTO_INCREMENT,
  `UserID` int NOT NULL,
  `BookID` varchar(15) NOT NULL,
  `Rate` int NOT NULL,
  `Comment` text NOT NULL,
  PRIMARY KEY (`RtCmmntID`)
);

/* Constraints */
ALTER TABLE `credit_card`
ADD KEY `fk_credit_card_userid` (`UserID`),
ADD CONSTRAINT `fk_credit_card_userid` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `shipping_address`
ADD KEY `fk_shipping_address_userid` (`UserID`),
ADD CONSTRAINT `fk_shipping_address_userid` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `author`
ADD KEY `fk_author_bookid` (`BookID`),
ADD CONSTRAINT `fk_author_bookid` FOREIGN KEY (`BookID`) REFERENCES `book` (`BookID`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `wishlist`
ADD KEY `fk_wishlist_userid` (`UserID`),
ADD CONSTRAINT `fk_wishlist_userid` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `wishlist_books`
ADD KEY `fk_wishlist_books_wishlistid` (`WishListID`),
ADD CONSTRAINT `fk_wishlist_books_wishlistid` FOREIGN KEY (`WishListID`) REFERENCES `wishlist` (`WishListID`) ON DELETE RESTRICT ON UPDATE CASCADE,
ADD KEY `fk_wishlist_books_bookid` (`BookID`),
ADD CONSTRAINT `fk_wishlist_books_bookid` FOREIGN KEY (`BookID`) REFERENCES `book` (`BookID`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `shopping_cart`
ADD KEY `fk_shopping_cart_userid` (`UserID`),
ADD CONSTRAINT `fk_shopping_cart_userid` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE,
ADD KEY `fk_shopping_cart_bookid` (`BookID`),
ADD CONSTRAINT `fk_shopping_cart_bookid` FOREIGN KEY (`BookID`) REFERENCES `book` (`BookID`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `save_later`
ADD KEY `fk_save_later_userid` (`UserID`),
ADD CONSTRAINT `fk_save_later_userid` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE,
ADD KEY `fk_save_later_bookid` (`BookID`),
ADD CONSTRAINT `fk_save_later_bookid` FOREIGN KEY (`BookID`) REFERENCES `book` (`BookID`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `rate_comment`
ADD KEY `fk_rate_comment_userid` (`UserID`),
ADD CONSTRAINT `fk_rate_comment_userid` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE,
ADD KEY `fk_rate_comment_bookid` (`BookID`),
ADD CONSTRAINT `fk_rate_comment_bookid` FOREIGN KEY (`BookID`) REFERENCES `book` (`BookID`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `purchase`
ADD KEY `fk_purchase_userid` (`UserID`),
ADD CONSTRAINT `fk_purchase_userid` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE,
ADD KEY `fk_purchase_cardnumber` (`CardNumber`),
ADD CONSTRAINT `fk_purchase_cardnumber` FOREIGN KEY (`CardNumber`) REFERENCES `credit_card` (`CardNumber`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `purchase_details`
ADD KEY `fk_purchase_details_purchaseid` (`PurchaseID`),
ADD CONSTRAINT `fk_purchase_details_purchaseid` FOREIGN KEY (`PurchaseID`) REFERENCES `purchase` (`PurchaseID`) ON DELETE RESTRICT ON UPDATE CASCADE,
ADD KEY `fk_purchase_details_bookid` (`BookID`),
ADD CONSTRAINT `fk_purchase_details_bookid` FOREIGN KEY (`BookID`) REFERENCES `book` (`BookID`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `published`
ADD KEY `fk_published_userid` (`PublisherID`),
ADD CONSTRAINT `fk_published_userid` FOREIGN KEY (`PublisherID`) REFERENCES `publisher` (`PublisherID`) ON DELETE RESTRICT ON UPDATE CASCADE,
ADD KEY `fk_published_bookid` (`BookID`),
ADD CONSTRAINT `fk_published_bookid` FOREIGN KEY (`BookID`) REFERENCES `book` (`BookID`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `billing_address`
ADD KEY `fk_billing_address_cardnumber` (`cardnumber`),
ADD CONSTRAINT `fk_billing_address_cardnumber` FOREIGN KEY (`CardNumber`) REFERENCES `credit_card` (`CardNumber`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `home_address`
ADD KEY `fk_home_address_userid` (`UserID`),
ADD CONSTRAINT `fk_home_address_userid` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

/* DML: */
USE geektext;

/* User */
INSERT INTO `geektext`.`user` (`UserID`, `UserFullName`, `Password`, `EmailAddress`, `EmlAddrssVld`, `NickName`, `AnonymusStat`) 
VALUES 
ROW ('1', 'Brina Lelievre', 'x57D9G0', 'blelievre0@dell.com', 'Y', 'Marie-noël', 'N'),
ROW ('2', 'Keith Korous', '2Ie3vhxP', 'kkorous1@apache.org', 'Y', 'Jú', 'N'),
ROW ('3', 'Raff Prettjohn', 'BP94DftE', 'rprettjohn2@wired.com', 'N', 'Zhì', 'N'),
ROW ('4', 'Corly Stivey', '2FjOFsCV8dw', 'igosker4@people.com.cn', 'N','Rébecca', 'Y'),
ROW ('5', 'Isa Gosker', 'ubyC311GkZTk', 'cstivey3@smugmug.com', 'Y', 'Ruò', 'N');

/* Credit Card */
INSERT INTO `geektext`.`credit_card` (`CardNumber`, `UserID`, `CardType`, `CrdtHldrName`, `ExpMonth`, `ExpYear`, `CrdtCrdVld`, `DefaultCard`) 
VALUES
ROW ('3574607617337144', '1', 'jcb', 'Brina Lelievre', '1', '2022', 'Y', 'Y'),
ROW ('6370523149278491', '1', 'instapayment', 'Gabie Riddles','10', '2021', 'N', 'Y'),
ROW ('50184182855182175', '2', 'maestro', 'Keith Korous','1', '2022', 'Y', 'Y'),
ROW ('3542093080036563', '3', 'jcb', 'Raff Prettjohn','2', '2022', 'Y', 'Y'),
ROW ('4936956643804739', '4', 'switch', 'Gorden Admans','5', '2022', 'N', 'N'),
ROW ('201473862571045', '4', 'mastercard', 'Opalina Handrok','4', '2022', 'N', 'N'),
ROW ('3551464415770259', '4', 'americanexpress', 'Corly Stivey','5', '2022', 'Y', 'Y'),
ROW ('3552694376983769', '5', 'jcb', 'Isa Gosker','11', '2021', 'Y', 'Y');

/* Billing Address */
INSERT INTO `geektext`.`billing_address` (`BillAddressID`, `CardNumber`, `BillFirstName`, `BillLastName`, `BillAddress`, `BillCity`, `BillState`, `BillZipCode`, `BillCountry`, `BillPhnNmbr`) 
VALUES 
ROW ('800', '3574607617337144', 'Brina', 'Lelievre', '202 Maple Way', 'Miami', 'FL', '33190', 'USA', '561-245-3145'),
ROW ('801', '6370523149278491', 'Keith', 'Korous', '95 Columbus Pass', 'Tokyo', 'KN', '33148', 'JPN', '570-729-3472'),
ROW ('802', '50184182855182175', 'Raff', 'Prettjohn', '27613 Lawn Way', 'Yokohama', 'HK', '33295', 'EGY', '572-541-3446'),
ROW ('803', '3542093080036563', 'Corly', 'Stivey', '92187 Weeping Birch Center', 'Osaka', 'CB', '33578', 'ESP', '361-860-2780'),
ROW ('804', '4936956643804739', 'Isa', 'Gosker', '92187 Weeping Birch Center', 'Osaka', 'SK', '33518', 'CHN', '158-935-1418'),
ROW ('805', '201473862571045', 'Peter', 'Albert', '691 Schmedeman Circle', 'Miami', 'FL', '33190', 'USA', '882-984-2167'),  
ROW ('806', '3551464415770259', 'Maria', 'Gomez', '48046 Fallview Point', 'Miami', 'FL', '33190', 'USA', '270-637-7346'), 
ROW ('807', '3552694376983769', 'Chester', 'Bennington', '48046 Fallview Point', 'Miami', 'FL', '33190', 'USA', '576-914-1880');

/* Home Address */
INSERT INTO `geektext`.`home_address` (`HomeAddressID`, `UserID`, `Address`, `City`, `State`, `ZipCode`, `Country`, `HmAddrssVld`) 
VALUES 
ROW ('700', '1', '202 Maple Way', 'Miami', 'FL', '33190', 'USA', 'Y'),
ROW ('701', '2', '06 Rockefeller Plaza', 'Tokyo', 'KN', '33148', 'JPN', 'Y'),
ROW ('702', '3', '678 Cherokee Place', 'Yokohama', 'HK', '33295', 'EGY', 'Y'),
ROW ('703', '4', '926 Debra Drive', 'Osaka', 'CB', '33578', 'ESP', 'Y'),
ROW ('704', '5', '04 Truax Road', 'Nagoya', 'SK', '33518', 'CHN', 'Y');

/* Shipping Address */
INSERT INTO `geektext`.`shipping_address` (`ShipAddressID`, `UserID`, `FirstName`, `LastName`, `Address`, `City`, `State`, `ZipCode`, `Country`, `DefaultAddress`) 
VALUES 
ROW ('100', '1', 'Brina', 'Lelievre', '202 Maple Way', 'Miami', 'FL', '33190', 'USA', 'Y'),
ROW ('101', '2', 'Keith', 'Korous', '06 Rockefeller Plaza', 'Tokyo', 'KN', '33148', 'JPN', 'Y'),
ROW ('102', '3', 'Raff', 'Prettjohn', '678 Cherokee Place', 'Yokohama', 'HK', '33295', 'EGY', 'Y'),
ROW ('103', '4', 'Corly', 'Stivey', '926 Debra Drive', 'Osaka', 'CB', '33578', 'ESP', 'Y'),
ROW ('104', '5', 'Isa', 'Gosker', '04 Truax Road', 'Nagoya', 'SK', '33518', 'CHN', 'Y');

/* Book */
INSERT INTO `geektext`.`book` (`BookID`, `BookTitle`, `Price`, `ReleaseDate`, `ShortBio`, `Description`, `Genre`, `Stock`, `AvgRate`, `Biography`) 
VALUES 
ROW ('9781974700523', 'Demon Slayer: Kimetsu no Yaiba', '5.99', '2018-07-03', 'Tanjiro sets out on the path of the Demon Slayer to save his sister and avenge his family!', 'Tanjiro sets out on the path of the Demon Slayer to save his sister and avenge his family! In Taisho-era Japan, kindhearted Tanjiro Kamado makes a living selling charcoal. But his peaceful life is shattered when a demon slaughters his entire family. His little sister Nezuko is the only survivor, but she has been transformed into a demon herself! Tanjiro sets out on a dangerous journey to find a way to return his sister to normal and destroy the demon who ruined his life. Learning to destroy demons won’t be easy, and Tanjiro barely knows where to start. The surprise appearance of another boy named Giyu, who seems to know what’s going on, might provide some answers—but only if Tanjiro can stop Giyu from killing his sister first!', 'Shonen', '92', '0', 'Tanjiros virtuous life selling charcoal to support his mother and siblings is upended when a vampiric demon murders his family, leaving his little sister Nezuko alive but cursed'),
ROW ('9781569319017', 'One Piece', '25.99', '2003-09-02', 'Join Monkey D. Luffy and his swashbuckling crew in their search for the ultimate treasure, One Piece!', 'As a child, Monkey D. Luffy dreamed of becoming King of the Pirates. But his life changed when he accidentally gained the power to stretch like rubber...at the cost of never being able to swim again! Years, later, Luffy sets off in search of the “One Piece,” said to be the greatest treasure in the world... As a child, Monkey D. Luffy was inspired to become a pirate by listening to the tales of the buccaneer "Red-Haired" Shanks. But his life changed when Luffy accidentally ate the Gum-Gum Devil Fruit and gained the power to stretch like rubber...at the cost of never being able to swim again! Years later, still vowing to become the king of the pirates, Luffy sets out on his adventure...one guy alone in a rowboat, in search of the legendary "One Piece," said to be the greatest treasure in the world...', 'Horror', '504', '0', 'Eiichiro Oda began his manga career at the age of 17, when his one-shot cowboy manga Wanted! won second place in the coveted Tezuka manga awards. Oda went on to work as an assistant to some of the biggest manga artists in the industry, including Nobuhiro Watsuki, before winning the Hop Step Award for new artists. His pirate adventure One Piece, which debuted in Weekly Shonen Jump magazine in 1997, quickly became one of the most popular manga in Japan.'),
ROW ('9781421592541', 'Dragon Ball Super', '18.99', '2017-05-02', 'Goku’s adventure from the best-selling classic manga Dragon Ball continues in this new series written by Akira Toriyama himself!', 'Ever since Goku became Earth’s greatest hero and gathered the seven Dragon Balls to defeat the evil Boo, his life on Earth has grown a little dull. But new threats loom overhead, and Goku and his friends will have to defend the planet once again in this continuation of Akira Toriyama’s best-selling series, Dragon Ball! Having defeated Boo, Goku is starting to get bored with his life on Earth. His wife, Chi-chi, wants him to get a job, but all he wants to do is train and fight stronger enemies. Elsewhere in the universe, the God of Destruction, Beerus, and his attendant Whis are traveling from planet to planet in search of food and entertainment. After blowing up some hapless victims, Beerus is reminded of a man from his dreams with the moniker “Super Saiyan God,” or something like that... The God of Destruction sets his sights on Earth to track down this mysterious man! Maybe this will give Goku something to do?', 'Action', '486', '0', 'Renowned worldwide for his playful, innovative storytelling and humorous, distinctive art style, Akira Toriyama burst onto the manga scene in 1980 with the wildly popular Dr. Slump. His hit series Dragon Ball (published in the U.S. as Dragon Ball and Dragon Ball Z) ran from 1984 to 1995 in Shueishas Weekly Shonen Jump magazine. He is also known for his design work on video games such as Dragon Quest, Chrono Trigger, Tobal No. 1 and Blue Dragon. His recent manga works include COWA!, Kajika, Sand Land, Neko Majin, Jaco the Galactic Patrolman and a childrens book, Toccio the Angel. He lives with his family in Japan.'),
ROW ('9781421597126', 'The Promised Neverland', '9.99', '2017-12-05', 'The children of the Grace Field House orphanage must escape a macabre fate before it’s too late.', 'Life at Grace Field House is good for Emma and her fellow orphans. While the daily studying and exams they have to take are tough, their loving caretaker provides them with delicious food and plenty of playtime. But perhaps not everything is as it seems... Emma, Norman and Ray are the brightest kids at the Grace Field House orphanage. And under the care of the woman they refer to as “Mom,” all the kids have enjoyed a comfortable life. Good food, clean clothes and the perfect environment to learn—what more could an orphan ask for? One day, though, Emma and Norman uncover the dark truth of the outside world they are forbidden from seeing.', 'Mistery', '827', '0', 'Kaiu Shirai debuted in 2015 with Ashley Gate no Yukue on the Shonen Jump+ website. Shirai first worked with Posuka Demizu on the two-shot Poppy no Negai, which was released in February 2016.Posuka Demizu debuted as a manga artist with the 2013 CoroCoro series Oreca Monster Bouken Retsuden. A collection of illustrations, The Art of Posuka Demizu, was released in 2016 by PIE International.'),
ROW ('9781974707737', 'My Hero Academia', '48.99', '2019-08-06', 'Midoriya inherits the superpower of the world’s greatest hero, but greatness won’t come easy.', 'What would the world be like if 80 percent of the population manifested superpowers called “Quirks”? Heroes and villains would be battling it out everywhere! Being a hero would mean learning to use your power, but where would you go to study? The Hero Academy of course! But what would you do if you were one of the 20 percent who were born Quirkless? With All Might in retirement, Endeavor takes up the mantle of the number one hero, a position he’s coveted for years. But now that he has it, he’s not entirely comfortable with the responsibilities and risks that come with it—both heroes and villains are always gunning for number one. What does the future hold for Midoriya, and what do his dreams about One For All mean?', 'Action','576', 4.5, 'Kohei Horikoshi was born in Aichi, Japan, in 1986. He received a Tezuka Award Honorable Mention in 2006, and after publishing several short stories in Akamaru Jump, his first serialized work in Weekly Shonen Jump was Oumagadoki Zoo in 2010. My Hero Academia is his third series in Weekly Shonen Jump');

/* Author */
INSERT INTO `geektext`.`author` (`AuthorID`, `BookID`, `AuthorFullName`) 
VALUES 
ROW ('50', '9781974700523', 'Koyoharu Gotouge'),
ROW ('51', '9781974700523', 'Nakaba Suzuki'),
ROW ('52', '9781569319017', 'Eiichiro Oda'),
ROW ('53', '9781421592541', 'Akira Toriyama'),
ROW ('54', '9781421597126', 'Kaiu Shirai'),
ROW ('55', '9781421597126', 'Posuka Demizu'),
ROW ('56', '9781974707737', 'Kohei Horikoshi');

/* WishList */
INSERT INTO `geektext`.`wishlist` (`WishListID`, `UserID`, `WishListName`) 
VALUES 
ROW ('20', '1', 'Deals'),
ROW ('21', '1', 'PS4'),
ROW ('22', '1', 'KH'),
ROW ('23', '2', 'Tech'),
ROW ('24', '2', 'Manga'),
ROW ('25', '3', 'Science Fiction'),
ROW ('26', '4', 'Harry Potter'),
ROW ('27', '5', 'Solo Leveling');

/* WishList Books */
INSERT INTO `geektext`.`wishlist_books` (`WshLstDtlsID`, `WishListID`, `BookID`) 
VALUES 
ROW ('1', '20', '9781974700523'),
ROW ('2', '20', '9781569319017'),
ROW ('3', '20', '9781421592541'),
ROW ('4', '20', '9781421597126'),
ROW ('5', '20', '9781974707737'),
ROW ('6', '21', '9781974700523'),
ROW ('7', '21', '9781569319017'),
ROW ('8', '21', '9781421592541'),
ROW ('9', '21', '9781421597126'),
ROW ('10', '22', '9781421592541'),
ROW ('11', '23', '9781974707737'),
ROW ('12', '24', '9781569319017'),
ROW ('13', '25', '9781421597126'),
ROW ('14', '26', '9781421592541'),
ROW ('15', '27', '9781974700523'),
ROW ('16', '27', '9781569319017'),
ROW ('17', '27', '9781421592541'),
ROW ('18', '27', '9781421597126'),
ROW ('19', '27', '9781974707737');

/* Shopping Cart */
INSERT INTO `geektext`.`shopping_cart` (`UserID`, `BookID`, `Quantity`) 
VALUES ('5', '9781974700523', '7');

/* Save Later */
INSERT INTO `geektext`.`save_later` (`UserID`, `BookID`, `Quantity`) 
VALUES ('4', '9781569319017', '9');

/* Purchase */
INSERT INTO `geektext`.`purchase` (`PurchaseID`, `UserID`, `CardNumber`, `PurchaseDate`, `PurchaseTime`, `Status`, `TrnsctnAmnt`) 
VALUES 
ROW ('1', '3', '3574607617337144', '2021-01-28', '22:50:32 ', 'Completed', '117.64'),
ROW ('2', '4', '3551464415770259', '2021-01-28', '22:51:44 ', 'Completed', '48.99');

/* Purchase Details */
INSERT INTO `geektext`.`purchase_details` (`PrchsDtlsID`, `PurchaseID`, `BookID`, `Quantity`) 
VALUES 
ROW ('5', '1', '9781569319017', '1'),
ROW ('6', '1', '9781974700523', '1'),
ROW ('7', '1', '9781421592541', '1'),
ROW ('8', '1', '9781421597126', '1'),
ROW ('9', '1', '9781974707737', '1'),
ROW ('10', '2', '9781974707737', '1');

/* Publisher */
INSERT INTO `geektext`.`publisher` (`PublisherID`, `PublisherName`, `PublisherInfo`) 
VALUES ('600', 'VIZ Media LLC', 'VIZ Media LLC. is an American manga publisher, anime distributor and entertainment company headquartered in San Francisco, California. It was founded in 1986 as VIZ LLC');

/* Published */
INSERT INTO `geektext`.`published` (`PublisherID`, `BookID`, `PublishDate`) 
VALUES 
ROW ('600', '9781974700523', '2020-01-27'),
ROW ('600', '9781569319017', '2017-11-23'),
ROW ('600', '9781421592541', '2001-04-04'),
ROW ('600', '9781421597126', '2011-07-12'),
ROW ('600', '9781974707737', '2010-03-15');

/* Rate Comment */
INSERT INTO `geektext`.`rate_comment` (`RtCmmntID`, `UserID`, `BookID`, `Rate`, `Comment`) 
VALUES 
ROW ('300', '3', '9781974707737', '5', 'Best manga of all times!'),
ROW ('301', '4', '9781974707737', '4', 'Good Book!');

/* Trigger Function to calculate the average everytime a comment is inserted. */
DELIMITER $$
USE `geektext`$$
CREATE TRIGGER `Update_Book_Avg_After_Insert` 
AFTER INSERT ON `rate_comment` 
FOR EACH ROW BEGIN
  UPDATE geektext.book
  SET AvgRate = (SELECT AVG(Rate) FROM geektext.rate_comment
                 WHERE BookID = NEW.BookID)
  WHERE BookID = NEW.BookID;
END$$
DELIMITER ;