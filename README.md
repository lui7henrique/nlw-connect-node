# NLW Connect - Referral System API

A Node.js API for managing event subscriptions with a referral system, built with Fastify, PostgreSQL, and Redis.

## Technologies

- Node.js
- TypeScript
- Fastify
- PostgreSQL (with Drizzle ORM)
- Redis
- Docker

## Features

- Event subscription system
- Referral tracking
- Ranking system
- API documentation with Swagger

## Getting Started

### Prerequisites

- Node.js
- Docker and Docker Compose

### Installation

1. Clone the repository

```bash
git clone https://github.com/lui7henrique/nlw-connect-node
```

2. Install dependencies:

```bash
bun install
```

3. Start the PostgreSQL container:

```bash
docker compose up -d
```

4. Copy `.env.example` to `.env` and configure your environment variables

```bash
cp .env.example .env
```

5. Run the migrations:

```bash
bun run db:migrate
```

6. Start:

```bash
bun run dev
```

The API will be available at `http://localhost:3333` and the documentation at `http://localhost:3333/docs`


### Build

```bash
bun run build
```


