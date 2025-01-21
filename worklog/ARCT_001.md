# Worklog Item - ARCT 001

## Task Overview

Task Name: **Set up database schema and migrations**

### Action Items

- [x] ~~Create database schema for articles and users, including fields for title, content, tags, and timestamps.~~  
- [x] ~~Write migration scripts and test locally with a sample database.~~

**Acceptance Criteria:**  

- [x] Schema is created and verified by running migrations;  
- [x] test data can be inserted and queried successfully.

## Notes

We don't necessarily need to run any sqlx migrations. Since we're using docker-compose and a modern postgres image, we can leverage volumes to copy over an init.sql file that can contain all of the database, table, and relation setup.

Changed 'articles' to 'posts'

## Date Log

Opened ticket on 1/20/2025
