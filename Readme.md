# 📦 GEMS AI API Service

This RESTful API service that powers GEMS AI.

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **Postgres** with **TypeORM**
- **Swagger UI** with **TSOA**
- **Dotenv**
- **Nodemon** for development

---

## 🧑‍💻 Getting Started

### Prerequisites

- [Supabase (Postrges + Vector Embeddings)](https://supabase.com/docs/guides/ai)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

```bash
git clone https://github.com/Bonifaceebuka/gems-ai.git
cd gems-ai
cp .env.example .env
npm install
npm run migration:run
npm run dev