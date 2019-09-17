
/* clean database */
DELETE FROM posts;
DELETE FROM userrole;
DELETE FROM roles;
DELETE FROM users;



/* insert users */
INSERT INTO users
(id, name, email, password, createdAt, updatedAt)
VALUES
(1, 'Joao Leite', 'joao.leite@isobar.com', 'password', NOW(), NOW());

INSERT INTO users
(id, name, email, password, createdAt, updatedAt)
VALUES
(2, 'Joao Moura', 'joao.moura@isobar.com', 'password', NOW(), NOW());



/* insert roles */
INSERT INTO roles
(id, name, createdAt, updatedAt)
VALUE
(1, 'admin', NOW(), NOW());

INSERT INTO roles
(id, name, createdAt, updatedAt)
VALUE
(2, 'editor', NOW(), NOW());

INSERT INTO roles
(id, name, createdAt, updatedAt)
VALUE
(3, 'reviewer', NOW(), NOW());

INSERT INTO roles
(id, name, createdAt, updatedAt)
VALUE
(4, 'guest', NOW(), NOW());



/* userrole relation */
INSERT INTO userrole
(userId, roleId, createdAt, updatedAt)
VALUE
(1, 1, NOW(), NOW());

INSERT INTO userrole
(userId, roleId, createdAt, updatedAt)
VALUE
(1, 2, NOW(), NOW());

INSERT INTO userrole
(userId, roleId, createdAt, updatedAt)
VALUE
(1, 3, NOW(), NOW());

INSERT INTO userrole
(userId, roleId, createdAt, updatedAt)
VALUE
(2, 3, NOW(), NOW());

INSERT INTO userrole
(userId, roleId, createdAt, updatedAt)
VALUE
(2, 4, NOW(), NOW());



/* insert posts */
INSERT INTO posts
(id, title, createdAt, updatedAt, ownerId)
VALUES
(1, 'New iPhone released yesterday', NOW(), NOW(), 1);

INSERT INTO posts
(id, title, createdAt, updatedAt, ownerId)
VALUES
(2, 'Animals in extinction', NOW(), NOW(), 1);
