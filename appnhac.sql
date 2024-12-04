CREATE DATABASE AppNhac;
USE AppNhac;


CREATE TABLE songs (
    id INT PRIMARY KEY,
    title VARCHAR(255),
    artist VARCHAR(255),
    artist_id INT,
    duration VARCHAR(10),
    image VARCHAR(255),
    listens VARCHAR(20),
    uri VARCHAR(255)
);

CREATE TABLE suggestions (
    id INT PRIMARY KEY,
    image VARCHAR(255)
);

CREATE TABLE charts (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    title VARCHAR(255),
    status VARCHAR(50),
    img VARCHAR(255)
);

CREATE TABLE albums (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    artist VARCHAR(255),
    img VARCHAR(255)
);

CREATE TABLE artists (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    img VARCHAR(255)
);

CREATE TABLE comments (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    comment TEXT,
    time VARCHAR(50),
    likes INT,
    avatar VARCHAR(255)
);

CREATE TABLE replies (
    id INT PRIMARY KEY,
    comment_id INT,
    name VARCHAR(255),
    link VARCHAR(255),
    comment TEXT,
    time VARCHAR(50),
    likes INT,
    avatar VARCHAR(255),
    FOREIGN KEY (comment_id) REFERENCES comments(id)
);

CREATE TABLE posts (
    id INT PRIMARY KEY,
    user VARCHAR(255),
    trackTitle VARCHAR(255),
    image VARCHAR(255),
    avatar VARCHAR(255),
    likes INT,
    comments INT,
    shares INT,
    plays INT,
    duration VARCHAR(10),
    time VARCHAR(50)
);

CREATE TABLE recommends (
    id INT PRIMARY KEY,
    title VARCHAR(255),
    image VARCHAR(255)
);

INSERT INTO songs (id, title, artist, artist_id, duration, image, listens, uri) VALUES
(1, 'Vì yêu', 'Kasim Hoàng Vũ', 5, '03:36', 'https://i.imgur.com/IfdXEyA.png', '2.1M', 'http://streaming.amusic.vn/amusic/songs/iphone/24/198328/198328.mp3'),
(2, 'Careless whisper', 'George Michael', 6, '03:35', 'https://i.imgur.com/PeO2qP4.png', '68M', 'http://streaming.amusic.vn/amusic/songs/iphone/68/560188/560188.mp3'),
(3, 'Trang giấy trắng', 'Phạm Trưởng', 9, '04:54', 'https://i.imgur.com/cw2HnIf.png', '45M', 'http://streaming.amusic.vn/amusic/songs/iphone/2/21001/21001.mp3'),
(4, 'Vẽ một nụ cười', 'SMS', 7, '03:52', 'https://i.imgur.com/HM9CW6N.png', '20M', 'http://streaming.amusic.vn/amusic/songs/iphone/76/625006/625006.mp3'),
(5, 'Chân tình', 'Vân Trường', 4, '04:29', 'https://i.imgur.com/RhbT2pP.png', '10M', 'http://streaming.amusic.vn/amusic/songs/iphone/6/51943/51943.mp3'),
(6, 'Xe đạp', 'Thùy Chi, M4U', 8, '06:22', 'https://i.imgur.com/0CU59dN.png', '70M', 'http://streaming.amusic.vn/amusic/songs/iphone/3/25210/25210.mp3');


INSERT INTO suggestions (id, image) VALUES
(1, 'https://i.imgur.com/ndZqCqs.png'),
(2, 'https://i.imgur.com/l0L1Imu.png');


INSERT INTO charts (id, name, title, status, img) VALUES
(1, 'Daily chart-toppers', 'Top 50 Canada', 'update', 'https://i.imgur.com/wyg2WmC.png'),
(2, 'Daily chart-toppers', 'Top 50 Globle', 'update', 'https://i.imgur.com/Zj7dypN.png'),
(3, 'Daily chart-toppers', 'Top 50 Trending', 'update', 'https://i.imgur.com/uWQhS4B.png');


INSERT INTO albums (id, name, artist, img) VALUES
(1, 'ME', 'Jessica Gonzalez', 'https://i.imgur.com/EfMqrd3.png'),
(2, 'Magna nost', 'Brian Thomas', 'https://i.imgur.com/J2CCne8.png'),
(3, 'Magna noow', 'Christoph Krammer', 'https://i.imgur.com/MHW7AMc.png');


INSERT INTO artists (id, name, img) VALUES
(1, 'Jennifer Wilson', 'https://i.imgur.com/QDM1Cxt.png'),
(2, 'Elizabeth Hall', 'https://i.imgur.com/J5jsZ2F.png'),
(3, 'Anthony Thow', 'https://i.imgur.com/Ii3HulR.png'),
(4, 'Vân Trường', 'https://i.imgur.com/RhbT2pP.png'),
(5, 'Kasim Hoàng Vũ', 'https://i.imgur.com/IfdXEyA.png'),
(6, 'George Michael', 'https://i.imgur.com/PeO2qP4.png'),
(7, 'SMS', 'https://i.imgur.com/HM9CW6N.png'),
(8, 'Thùy Chi, M4U', 'https://i.imgur.com/0CU59dN.png'),
(9, 'Phạm Trưởng', 'https://i.imgur.com/cw2HnIf.png');


-- Thêm dữ liệu vào bảng comments
INSERT INTO comments (id, name, comment, time, likes, avatar) VALUES
(1, 'Sally Rooney', 'Do duis cul 😍', '17h', 1, 'https://i.imgur.com/OKGRj6b.png'),
(2, 'Jason', 'Minim magna exc 😍', '48m', 1, 'https://i.imgur.com/LCYifSG.png'),
(3, 'Liam Pham', 'Commodo 🔥', '48m', 1, 'https://i.imgur.com/MXO0MyT.png');

-- Thêm dữ liệu vào bảng replies (phản hồi)
INSERT INTO replies (id, comment_id, name, link, comment, time, likes, avatar) VALUES
(1, 2, 'Michael Key', '@Jason Smith', 'Deserunt officia consectetur adipisci', '40m', 2, 'https://i.imgur.com/MXO0MyT.png'),
(2, 3, 'Kiran Glaucus', '', 'Esse consequat cillum ex', '40m', 1, 'https://i.imgur.com/LCYifSG.png');





INSERT INTO posts (id, user, trackTitle, image, avatar, likes, comments, shares, plays, duration, time) VALUES
(1, 'Jessica Gonzalez', 'FLOWER', 'https://i.imgur.com/Zb4j1Ma.png', 'https://i.imgur.com/OKGRj6b.png', 20, 3, 1, 125, '05:15', '3d'),
(2, 'William King', 'Me', 'https://i.imgur.com/tZf22K4.png', 'https://i.imgur.com/MXO0MyT.png', 45, 9, 2, 245, '05:15', '5d');



INSERT INTO recommends (id, title, image) VALUES
(1, 'Magna nost', 'https://i.imgur.com/88K0WkM.png'),
(2, 'Exerciatio', 'https://i.imgur.com/tvjhmSc.png'),
(3, 'Tempor nate', 'https://i.imgur.com/u4Ugwhb.png');


