FROM node:22-alpine as builder

ARG TURBO_VERCEL_TEAM_NAMESPACE
ENV TURBO_TEAM=${TURBO_VERCEL_TEAM_NAMESPACE}

ARG TURBO_VERCEL_REMOTE_CACHE_TOKEN
ENV TURBO_TOKEN=${TURBO_VERCEL_REMOTE_CACHE_TOKEN}

ENV TURBO_REMOTE_CACHE=true

RUN echo "${TURBO_REMOTE_CACHE}"
RUN echo "${TURBO_TEAM}"
RUN echo "${TURBO_TOKEN}"

# Set PNPM Env Variables, Necessary for PNPM setup in Docker Env
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV RUNTIME_STAGE="production"

RUN corepack enable

RUN mkdir -p /home/app/turbo

WORKDIR /home/app/turbo

COPY ./package.json ./package.json
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
COPY ./pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY ./turbo.json ./turbo.json
COPY ./apps ./apps
COPY ./packages ./packages

RUN pnpm install --frozen-lockfile

RUN pnpm build

CMD ["pnpm",  "start"]