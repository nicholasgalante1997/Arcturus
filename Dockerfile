# Use the official Node.js 22 Image (Alpine version) as the base
FROM oven/bun:1-alpine AS base

# Create a layer for dependency installation
FROM base as dependencies

# Create our working directory
RUN mkdir -p /home/app/project-arcturus

# Move over to our working directory
WORKDIR /home/app/project-arcturus

# Copy our turborepo workspace root package.json
COPY ./package.json ./package.json

# Copy our turborepo workspace root bun.lockb
COPY ./bun.lockb ./bun.lockb

# Copy our turborepo workspace root turbo.json
COPY ./turbo.json ./turbo.json

# Copy our website
COPY ./apps/web ./apps/web

# Copy our packages
COPY ./packages ./packages

# Install dependencies
RUN bun install

# Create a layer for build
FROM dependencies AS build

# Build the application
RUN bun run check-types
RUN bun run build

# Create a layer for running the app
# We can use our smaller pnpm enabled node base image here
# And copy over the built application
# Without the source code and development dependency bloat
FROM base AS runtime

# Create our working directory
RUN mkdir -p /home/app/project-arcturus

# Move over to our working directory
WORKDIR /home/app/project-arcturus

# Copy the turborepo package.json from the build layer
COPY --from=build /home/app/project-arcturus/package.json /home/app/project-arcturus/package.json

# Copy the turborepo pnpm-lock.yaml from the build layer
COPY --from=build /home/app/project-arcturus/bun.lockb /home/app/project-arcturus/bun.lockb

# Copy the turborepo turbo.json from the build layer
COPY --from=build /home/app/project-arcturus/turbo.json /home/app/project-arcturus/turbo.json

# Copy the turborepo workspace root from the build layer
COPY --from=build /home/app/project-arcturus/apps/web /home/app/project-arcturus/apps/web
COPY --from=build /home/app/project-arcturus/packages /home/app/project-arcturus/packages

RUN rm -rf /home/app/project-arcturus/node_modules \
    home/app/project-arcturus/apps/web/node_modules

RUN bun install --production

CMD ["bun", "run", "docker"]