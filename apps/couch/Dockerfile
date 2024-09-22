# https://pnpm.io/docker
FROM node:22-slim as node

# Set PNPM Env Variables
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV RUNTIME_STAGE="production"

# Enable pnpm via corepack @see https://nodejs.org/api/corepack.html
# Create app directory
RUN corepack enable \
    && mkdir -p /home/couch-gag-admin/website

# Change into app directory
WORKDIR /home/couch-gag-admin/website

# Copy over the package manifest and dependency lockfile
COPY ./package.json ./
COPY ./pnpm-lock.yaml ./

# Copy over app
COPY ./sleepy.json ./
COPY ./tsconfig.json ./
COPY ./.babelrc ./
COPY ./scripts/ ./scripts/
COPY ./assets/ ./assets/
COPY ./html/ ./html/
COPY ./src/ ./src/
COPY ./webpack/ ./webpack/
COPY ./writ/ ./writ/

# Install build dependencies
RUN pnpm install

# Package story metadata
# Build a static dist of the website
# Clean development source code and deps

RUN pnpm build:md docker.0.0 \
    && pnpm build \
    && rm -rf node_modules \ 
    src \
    assets \
    html \
    webpack \
    writ

# Nginx webserver
FROM nginx:1.25-alpine-slim as webserver
# Copy static website over to expected distribution directory
COPY --from=node --chown=node:webserver /home/couch-gag-admin/website/build /usr/share/nginx/html
# Copy over our desired nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf
