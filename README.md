# Campus Placement Portal

A full-stack placement-management demo built with React + TypeScript + Tailwind CSS, Express, MongoDB, and JWT.

## Features
- Student, recruiter, and placement-cell views
- Student profiles and placement applications
- Recruiter job postings and applicant shortlists
- JWT-based authentication demo
- REST API with validation and consistent error responses

## Project structure
- `client/` React + TypeScript + Tailwind frontend
- `server/` Express REST API with MongoDB models
- `docs/API.md` endpoint guide

## Run locally
### Requirements
Node.js 20+, npm, MongoDB Community or MongoDB Atlas.

### Server
```bash
cd server
cp .env.example .env
npm install
npm run dev
```
On Windows PowerShell, copy the env file with:
```powershell
Copy-Item .env.example .env
```

### Client
In another terminal:
```bash
cd client
npm install
npm run dev
```
Open the Vite URL shown in the terminal. The client expects the API at `http://localhost:5000/api`.

### Seed demo data
After configuring `MONGODB_URI` and `JWT_SECRET` in `server/.env`:
```bash
cd server
npm run seed
```
Demo accounts are printed by the seed script. This is a portfolio starter, not a production-ready system. Add rate limiting, stronger authorization, audit logging, and deployment secrets before production use.
