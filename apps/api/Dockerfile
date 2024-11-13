# Create a base layer with a small Linux image
FROM debian:buster-slim AS base

# Create a layer where we setup Rust
FROM base AS rust

# Install dependencies needed for building Rust application
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    libssl-dev \
    pkg-config \
    libpq-dev \
    && curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y \
    && . $HOME/.cargo/env \
    && rustup update stable \
    && rustup default stable

# Create a layer for setting up the workspace
FROM rust AS workspace

# Create our working directory
RUN mkdir -p /home/app/project-arcturus/apps/api

# Move over to our working directory
WORKDIR /home/app/project-arcturus/apps/api

# Copy our server dependencies
COPY Cargo.* ./

# Copy our source code
COPY ./src/ ./src/
COPY ./public/ ./public/

# Create a layer to build our app
FROM workspace AS builder

# Build our production server
RUN . $HOME/.cargo/env && cargo build --release

# Create a layer to run our app, we can reuse our teeny tiny linux image
FROM base AS runner

# Install necessary runtime dependencies (note, we don't even need Rust!)
RUN apt-get update && apt-get install -y \
    libssl-dev \
    ca-certificates \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Create working directory
RUN mkdir -p /home/app/project-arcturus/apps/api
WORKDIR /home/app/project-arcturus/apps/api

# Copy Rust binary + public folder
COPY --from=builder /home/app/project-arcturus/apps/api/target/release/project-arcturus-file-server /home/app/project-arcturus/apps/api
COPY --from=builder /home/app/project-arcturus/apps/api/public/ /home/app/project-arcturus/apps/api/public/

# Ensure the Rust binary has execution permissions
RUN chmod +x /home/app/project-arcturus/apps/api/project-arcturus-file-server

# Expose port 8080
EXPOSE 8080

# Set environment variables
ENV PORT=8080
ENV RUST_ENV=DOCKER

# Run the Rust binary
CMD ["./project-arcturus-file-server"]
