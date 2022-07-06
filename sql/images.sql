DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS images;



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
    ' https://imageboard-cy.s3.eu-central-1.amazonaws.com/9phnWKN547FnGno8jVlUCJ7Dql_FQJfa.jpg ',
    'Gofy',
    'Pluto',
    'I hear everything, be aware!'
);

INSERT INTO images (url, username, title, description) VALUES (
    'https://imageboard-cy.s3.eu-central-1.amazonaws.com/YdS21TQYpHjptDXAoo-vjYS2Eg5Ndchy.jpg',
    'Disney',
    'Micky & Friend in the beach',
    'We wish to be there.'
);


INSERT INTO images (url, username, title, description) VALUES (
    'https://imageboard-cy.s3.eu-central-1.amazonaws.com/Gi0BrFCVhSHM7r7pSY_Zkh93zRmYr6CS.jpg',
    'Disney',
    'Peter Pan & Friends',
    'Clasic Book & Movie.'
);

