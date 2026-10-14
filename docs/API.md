# API reference

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/health` | API health |
| POST | `/auth/register` | Create a student account |
| POST | `/auth/login` | Return JWT |
| GET | `/jobs` | List open jobs |
| POST | `/jobs` | Create a job (recruiter/admin token) |
| GET | `/applications/me` | List current student's applications |
| POST | `/applications` | Apply to a job |
| PATCH | `/applications/:id/status` | Update application status (recruiter/admin) |

Authentication uses `Authorization: Bearer <token>`. See route files for request fields and role checks.
