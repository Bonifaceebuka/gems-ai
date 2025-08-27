# 📦 GEMS AI API Service

This RESTful API service that powers GEMS AI.

---

## Implemented Features

- User registration and login for admin user
- Customer creation by chatting an AI
- Viewing the list of the created customers
- Manual creation of customers by form submission


## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **Postgres** with **TypeORM**
- **Swagger UI** with **TSOA**
- **Dotenv**
- **Ollma** with **mistral:latest**
- **Nodemon** for development

---

## 🧑‍💻 Getting Started

### Prerequisites

- [Supabase (Postrges + Vector Embeddings)](https://supabase.com/docs/guides/ai)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation & Setup

```bash
git clone https://github.com/Bonifaceebuka/gems-ai.git
cd gems-ai
cp .env.example .env
npm install
npm run migration:run
npm run dev

The Swagger documentation can be found on http://localhost:2031/swagger/api
```
### NOTE
- Please to be able to see the Swagger DOC, set your `PORT` value on your `.env` file to `2031` or change `"servers":["localhost:2031"]` at line 20 of tsoa.json file that can be found at the root of the project to have your chosen `PORT` number.


### To Startup Ollama locally

- If you already have Ollama setup for your PC and `mistral:lastest` follow option 2, else, use option 1

#### OPTION 1

- Download Ollama for your Operating frim - https://ollama.com/download if you don't have it already setup on your PC
- Install and run `mistral:lastest` model from ollama with this command - `ollama run mistral`, If you don't already have it installed.

#### OPTION 2
- Open your terminal and run `ollama run mistral`
