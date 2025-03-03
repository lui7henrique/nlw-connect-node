# 🎯 NLW Connect - Referral System

Node.js API for event subscriptions with referral system, using Fastify, PostgreSQL and Redis.

## 🚀 Tech Stack

- Node.js + TypeScript
- Fastify
- PostgreSQL + Drizzle ORM
- Redis
- Docker
- OpenAI GPT-4
- AI SDK for tool management

## ⚡ Features

- 📝 Event subscriptions
- 🔗 Referral tracking
- 🏆 Ranking system
- 📚 Swagger docs
- 🤖 AI-powered features:
  - Natural language report generation for referral analytics
  - Real-time insights from Redis and PostgreSQL data

## 🏃‍♂️ Quick Start

Prerequisites: Node.js and Docker

```bash
# Clone and install
git clone https://github.com/lui7henrique/nlw-connect-node
bun install

# Setup
docker compose up -d
cp .env.example .env

# Run migrations and start
bun run db:migrate
bun run dev
```

Access: 
- API: http://localhost:3333
- Docs: http://localhost:3333/docs

## 📦 Build

```bash
bun run build
```


