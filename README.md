# URL Shortener API

This is an in-memory URL shortener service built with Node.js + Express.

## Getting Started

```bash
git clone <repo-url>
cd url-shortener
npm install
npm start
```

## API Routes Overview

| Method | Endpoint                   | Description                                         |
| ------ | -------------------------- | --------------------------------------------------- |
| POST   | `/api/encode`              | Shortens a given long URL                           |
| POST   | `/api/decode`              | Retrieves the original long URL from a short one    |
| GET    | `/api/statistic/:url_path` | Gets stats about a short URL                        |
| GET    | `/api/list`                | Lists all shortened URLs                            |
| GET    | `/:url_path`               | Redirects to original long URL (not part of `/api`) |
