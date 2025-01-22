# Worklog Item - ARCT 002

## STATUS

[DONE (MERGED)]

## Task Overview

Task Name: **Add database connection to the Actix Web Service**

### Action Items

- [x] Configure Actix Web API to establish a connection with the database (PostgreSQL)
- [x] Add a connection pool using sqlx or another Rust database library.
- [x] Verify connection pooling works as expected.
- [x] Ensure proper error handling for database connection issues.
- [ ] Write a unit test to confirm the connection setup. [skipping]

**Acceptance Criteria:**  

- [x] A working database connection is established in the Rust API.
- [x] Database connection pooling is enabled and functional.
- [x] Proper error messages are logged if the connection fails.
- [ ] The connection setup is verified via unit tests. [skipped]
- [x] Code changes are committed and reviewed with a passing CI status.

## Notes

Okay so we're in a good spot already. We have a function in our database mod `establish_connection` which sets up a Pool of connections to a postgres database that runs in the same docker network as the actix web server. I've renamed it `establish_connection_to_pg_database` to make it more clear what it does and also to claim I've done something.  

Maybe a solid idea to get a crash course in sqlx.

Added anyhow for better error handling.

Bumped db connections in pool from 2 to 10.

Set up min connection of 1 and idle timeout of 5 mins to recycle unused connections.

Swapped error handling to use anyhow for db module.

## Date Log

Opened ticket on 1/20/2025

Closed ticket on 1/20/2025
