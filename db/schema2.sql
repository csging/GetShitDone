USE todolist_db;

CREATE TABLE list (
   id INTEGER(30) NOT NULL AUTO_INCREMENT, 
   user_id INTEGER(30),
   task VARCHAR(100),
   complete BOOLEAN NOT NULL DEFAULT 0,
   task_group VARCHAR(100),
   PRIMARY KEY(id),
   FOREIGN KEY (user_id) REFERENCES users(id) 
);

-- INSERT INTO list (task, user_id) 
-- VALUES ('Comnplete backend connection to the front end.', 1);

-- INSERT INTO list (task, user_id) 
-- VALUES ('Comnplete connection to Heroku.', 1);

-- INSERT INTO list (task,user_id) 
-- VALUES ('Comnplete front end design.', 1);

-- INSERT INTO list (task, user_id) 
-- VALUES ('Comnplete to-do-list component.', 1);

-- INSERT INTO list (task, user_id) 
-- VALUES ('Comnplete total to-do-list component.', 1);

-- INSERT INTO list (task, user_id) 
-- VALUES ('Comnplete most productive component.', 1);