CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    author JSONB NOT NULL,  -- Store author information as JSON
    category VARCHAR(100) NOT NULL,
    arch_category VARCHAR(100),
    search_terms TEXT[] NOT NULL,  -- Store search terms as an array
    genres TEXT[] NOT NULL,
    release_date TEXT NOT NULL, -- Just proxy an ISO Timestamp String for now
    estimated_reading_time TEXT NOT NULL,
    media JSONB NOT NULL,  -- Store media information as JSON
    content TEXT NOT NULL,  -- Store the markdown content
    is_test_data BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a table for post views
CREATE TABLE IF NOT EXISTS post_views (
    post_id INTEGER NOT NULL,
    view_count INTEGER NOT NULL DEFAULT 0,
    last_viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_test_data BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (post_id),
    CONSTRAINT fk_post_id FOREIGN KEY (post_id) REFERENCES posts (id)
);

CREATE TABLE IF NOT EXISTS metrics (
    id SERIAL PRIMARY KEY,
    metric_event_name VARCHAR(100) NOT NULL,
    metric_event_data JSONB,
    metric_event_issuer VARCHAR(100) NOT NULL,
    is_test_data BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    event_name VARCHAR(100) NOT NULL,
    event_data JSONB,
    event_issuer VARCHAR(100) NOT NULL,
    is_test_data BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    is_test_data BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(100) NOT NULL,
    user_id INTEGER NOT NULL,
    is_test_data BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (id)
);
