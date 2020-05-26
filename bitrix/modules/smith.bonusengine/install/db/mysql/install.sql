CREATE TABLE IF NOT EXISTS b_smith_bonusengine_event
(
    ID INT NOT NULL AUTO_INCREMENT,
    MODULE_CODE VARCHAR(100) NOT NULL,
    EVENT_CODE VARCHAR(100) NOT NULL,
    POINTS INT NOT NULL,
    SITE_ID VARCHAR(50) NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS b_smith_bonusengine_basket
(
    ID INT NOT NULL AUTO_INCREMENT,
    USER_ID INT NOT NULL,
    ORDER_ID INT NOT NULL,
    POINTS FLOAT NOT NULL,
    SITE_ID VARCHAR(50) NULL,
    PRIMARY KEY (ID)
);