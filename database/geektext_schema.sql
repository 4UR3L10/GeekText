-- MySQL Workbench Synchronization
-- Generated: 2021-03-31 17:38
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: Kevin

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `geektext` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE IF NOT EXISTS `geektext`.`user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_firstname` VARCHAR(45) NOT NULL,
  `user_lastname` VARCHAR(45) NOT NULL,
  `nickname` VARCHAR(20) NOT NULL,
  `password` VARCHAR(256) NOT NULL,
  `email` VARCHAR(100) NOT NULL COMMENT 'Assuming 1 unique email per user',
  `is_email_valid` TINYINT(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `user_email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `geektext`.`book` (
  `id` VARCHAR(15) NOT NULL COMMENT 'Type ISBN',
  `book_title` VARCHAR(200) NOT NULL,
  `description` MEDIUMTEXT NOT NULL,
  `price` DECIMAL(5,2) NOT NULL,
  `cover` VARCHAR(2000) NOT NULL COMMENT 'An image url',
  `genre` VARCHAR(20) NOT NULL,
  `avg_rating` DECIMAL NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `geektext`.`author` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `author_name` VARCHAR(45) NOT NULL,
  `author_bio` MEDIUMTEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `geektext`.`user_book_review` (
  `user_id` INT(11) NOT NULL,
  `book_id` VARCHAR(15) NOT NULL,
  `rating` INT(11) NOT NULL,
  `comment` TEXT NOT NULL,
  `is_anonymous` TINYINT(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`user_id`, `book_id`),
  INDEX `fk_user_has_book_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_user_book_review_book1_idx` (`book_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_book_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `geektext`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_book_review_book1`
    FOREIGN KEY (`book_id`)
    REFERENCES `geektext`.`book` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `geektext`.`address` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `street` VARCHAR(100) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `state` VARCHAR(20) NOT NULL,
  `zip_code` VARCHAR(10) NOT NULL,
  `country` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `geektext`.`user_home_address` (
  `address_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`address_id`, `user_id`),
  INDEX `fk_user_home_address_address1_idx` (`address_id` ASC) VISIBLE,
  INDEX `fk_user_home_address_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_home_address_address1`
    FOREIGN KEY (`address_id`)
    REFERENCES `geektext`.`address` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_home_address_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `geektext`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `geektext`.`user_shipping_address` (
  `address_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  PRIMARY KEY (`address_id`, `user_id`),
  INDEX `fk_user_shipping_address_address1_idx` (`address_id` ASC) VISIBLE,
  INDEX `fk_user_shipping_address_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_shipping_address_address1`
    FOREIGN KEY (`address_id`)
    REFERENCES `geektext`.`address` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_shipping_address_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `geektext`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `geektext`.`shopping_cart` (
  `user_id` INT(11) NOT NULL,
  `book_id` VARCHAR(15) NOT NULL,
  `cart_quantity` INT(11) NOT NULL,
  PRIMARY KEY (`user_id`, `book_id`),
  INDEX `fk_shopping_cart_book1_idx` (`book_id` ASC) VISIBLE,
  CONSTRAINT `fk_shopping_cart_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `geektext`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_shopping_cart_book1`
    FOREIGN KEY (`book_id`)
    REFERENCES `geektext`.`book` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `geektext`.`user_saved_book` (
  `user_id` INT(11) NOT NULL,
  `book_id` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`user_id`, `book_id`),
  INDEX `fk_user_saved_book_book1_idx` (`book_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_saved_book_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `geektext`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_saved_book_book1`
    FOREIGN KEY (`book_id`)
    REFERENCES `geektext`.`book` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `geektext`.`user_purchase_book` (
  `purchase_id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `book_id` VARCHAR(15) NOT NULL,
  `purchase_quantity` INT(11) NOT NULL,
  `payment_amount` DOUBLE(5,2) NOT NULL,
  `purchase_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`purchase_id`),
  INDEX `fk_user_purchase_book_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_user_purchase_book_book1_idx` (`book_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_purchase_book_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `geektext`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_purchase_book_book1`
    FOREIGN KEY (`book_id`)
    REFERENCES `geektext`.`book` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `geektext`.`credit_card` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `card_number` BIGINT(20) NOT NULL,
  `card_type` VARCHAR(45) NOT NULL,
  `holder_name` VARCHAR(100) NOT NULL,
  `expire_date` CHAR(5) NOT NULL,
  `security_code` VARCHAR(5) NOT NULL,
  `is_card_valid` TINYINT(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `geektext`.`user_credit_card` (
  `user_id` INT(11) NOT NULL,
  `credit_card_id` INT(11) NOT NULL,
  PRIMARY KEY (`user_id`, `credit_card_id`),
  INDEX `fk_user_credit_card_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_user_credit_card_credit_card1_idx` (`credit_card_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_credit_card_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `geektext`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_credit_card_credit_card1`
    FOREIGN KEY (`credit_card_id`)
    REFERENCES `geektext`.`credit_card` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `geektext`.`publisher` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `publisher_name` VARCHAR(100) NOT NULL,
  `publisher_info` MEDIUMTEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `geektext`.`book_published` (
  `publisher_id` INT(11) NOT NULL,
  `book_id` VARCHAR(15) NOT NULL,
  `published_date` DATE NOT NULL,
  PRIMARY KEY (`publisher_id`, `book_id`),
  INDEX `fk_book_published_publisher1_idx` (`publisher_id` ASC) VISIBLE,
  INDEX `fk_book_published_book1_idx` (`book_id` ASC) VISIBLE,
  CONSTRAINT `fk_book_published_publisher1`
    FOREIGN KEY (`publisher_id`)
    REFERENCES `geektext`.`publisher` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_book_published_book1`
    FOREIGN KEY (`book_id`)
    REFERENCES `geektext`.`book` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `geektext`.`wishlist` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `wishlist_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_wishlist_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_wishlist_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `geektext`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `geektext`.`wishlist_book` (
  `wishlist_id` INT(11) NOT NULL,
  `book_id` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`wishlist_id`, `book_id`),
  INDEX `fk_wishlist_book_wishlist1_idx` (`wishlist_id` ASC) VISIBLE,
  INDEX `fk_wishlist_book_book1_idx` (`book_id` ASC) VISIBLE,
  CONSTRAINT `fk_wishlist_book_wishlist1`
    FOREIGN KEY (`wishlist_id`)
    REFERENCES `geektext`.`wishlist` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_wishlist_book_book1`
    FOREIGN KEY (`book_id`)
    REFERENCES `geektext`.`book` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `geektext`.`author_wrote_book` (
  `author_id` INT(11) NOT NULL,
  `book_id` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`author_id`, `book_id`),
  INDEX `fk_author_wrote_book_author1_idx` (`author_id` ASC) VISIBLE,
  INDEX `fk_author_wrote_book_book1_idx` (`book_id` ASC) VISIBLE,
  CONSTRAINT `fk_author_wrote_book_author1`
    FOREIGN KEY (`author_id`)
    REFERENCES `geektext`.`author` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_author_wrote_book_book1`
    FOREIGN KEY (`book_id`)
    REFERENCES `geektext`.`book` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


DELIMITER $$

USE `geektext`$$
CREATE DEFINER = CURRENT_USER TRIGGER `geektext`.`user_book_review_AFTER_INSERT` AFTER INSERT ON `user_book_review` FOR EACH ROW
BEGIN
	UPDATE `geektext`.`book`
	SET avg_rating = (
		SELECT IF(COUNT(*)=0, 0, AVG(rating)) 
        FROM `geektext`.`user_book_review`
		WHERE book_id = new.book_id
	)
	WHERE id = new.book_id;
END$$


DELIMITER ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
