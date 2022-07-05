DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS comments;


CREATE TABLE images(
    id SERIAL PRIMARY KEY,
    url VARCHAR NOT NULL,
    username VARCHAR NOT NULL,
    title VARCHAR NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    id_image INT REFERENCES images(id),
    username VARCHAR NOT NULL,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/imageboard/jAVZmnxnZ-U95ap2-PLliFFF7TO0KqZm.jpg',
    'funkychicken',
    'Welcome to Spiced and the Future!',
    'This photo brings back so many great memories.'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/imageboard/wg8d94G_HrWdq7bU_2wT6Y6F3zrX-kej.jpg',
    'discoduck',
    'Elvis',
    'We can''t go on together with suspicious minds.'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://s3.amazonaws.com/imageboard/XCv4AwJdm6QuzjenFPKJocpipRNNMwze.jpg',
    'discoduck',
    'To be or not to be',
    'That is the question.'
);



-- 
-- https://www.tradeinn.com/f/13779/137798322/clementoni-disney-winnie-the-pooh-my-first-puzzle-3-6-9-12-pieces.jpg

-- https://www.seekpng.com/png/detail/576-5767525_micky-maus-disney-mickey-mouse.png

-- https://www.gratistodo.com/wp-content/uploads/2016/12/Pato-Donald-1.gif

-- https://akns-images.eonline.com/eol_images/Entire_Site/2018616/rs_600x600-180716134424-600-rugrats-ch-071618.jpg?fit=around%7C700:700&output-quality=90&crop=700:700;center,top

-- https://imagenpng.com/wp-content/uploads/2019/06/4oye-arnold.jpg