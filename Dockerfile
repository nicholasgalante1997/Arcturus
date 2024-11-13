# Use the official Node.js 22 Image (Alpine version) as the base
FROM node:22-alpine AS node_base

# Add PNPM home to PATH
ENV PATH="/pnpm:$PATH"

# Enable PNPM via corepack
RUN corepack enable

# Create a layer with pnpm setup to use as `base`
FROM node_base as base

# Create a layer for dependency installation
FROM base as dependencies

# Create our working directory
RUN mkdir -p /home/app/project-arcturus

# Move over to our working directory
WORKDIR /home/app/project-arcturus

# Copy our turborepo workspace root package.json
COPY ./package.json ./package.json

# Copy our turborepo workspace root pnpm-lock.yaml
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml

# Copy our turborepo workspace root pnpm-workspace.yaml
COPY ./pnpm-workspace.yaml ./pnpm-workspace.yaml

# Copy our turborepo workspace root turbo.json
COPY ./turbo.json ./turbo.json

# Copy our website
COPY ./apps/web ./apps/web

# Copy our packages
COPY ./packages ./packages

# Install dependencies
RUN pnpm install --frozen-lockfile

# Create a layer for build
FROM dependencies AS build

# Build the application
RUN pnpm build

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
COPY --from=build /home/app/project-arcturus/pnpm-lock.yaml /home/app/project-arcturus/pnpm-lock.yaml

# Copy the turborepo pnpm-workspace.yaml from the build layer
COPY --from=build /home/app/project-arcturus/pnpm-workspace.yaml /home/app/project-arcturus/pnpm-workspace.yaml

# Copy the turborepo turbo.json from the build layer
COPY --from=build /home/app/project-arcturus/turbo.json /home/app/project-arcturus/turbo.json

# Copy the turborepo workspace root from the build layer
COPY --from=build /home/app/project-arcturus/apps/web /home/app/project-arcturus/apps/web
COPY --from=build /home/app/project-arcturus/packages /home/app/project-arcturus/packages

RUN rm -rf /home/app/project-arcturus/node_modules \
    home/app/project-arcturus/apps/web/node_modules \
    home/app/project-arcturus/packages/@tokens/node_modules \
    home/app/project-arcturus/packages/@components/node_modules \
    home/app/project-arcturus/packages/@state/node_modules \
    home/app/project-arcturus/packages/@renderer/node_modules

RUN pnpm install --prod --frozen-lockfile

CMD ["pnpm",  "start"]