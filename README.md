# JKILA

The Jira killing app :\

## TUTOR FOR DEV

Удалить папку .git 

server: 
git init
git add .
git commit -m "init"
heroku login
heroku create
зайти на хероку, создать аддон psql и посмотреть креды для бд, вставить в конфиг сервера
git add .
git push heroku main

client:
git init 
посмотреть адрес хероку сервера и вставить в .env для коннекта
git add .
git commit -m "init"
heroku login
heroku create jkila
git push heroku main

### To be in the role of an ADMIN, log in as user:
username:admin;
password:admin;
