# Colegio Northern Landing Admin

Next.js app with a public landing page, protected admin dashboard, Auth.js login,
Prisma, and PostgreSQL persistence.

Admins manage landing copy, sections, contact information, and photos. Photos are
not uploaded to the app. The admin pastes a public Google Drive share link, and
the app stores the Drive file id for display on the public page.

## Stack

- Next.js App Router
- Auth.js credentials login
- Prisma
- PostgreSQL
- Vitest

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

3. Update `.env` with a PostgreSQL `DATABASE_URL`, a long `AUTH_SECRET`, and the
   first admin credentials:

   ```env
   ADMIN_EMAIL="admin@northern.edu"
   ADMIN_PASSWORD="change-this-password"
   ```

4. Create the database schema and seed default content:

   ```bash
   npm run prisma:migrate
   npm run db:seed
   ```

5. Start the app:

   ```bash
   npm run dev
   ```

## Admin

- Public landing page: `http://localhost:3000`
- Admin login: `http://localhost:3000/admin/login`
- Admin dashboard: `http://localhost:3000/admin`

The seed command creates or updates one admin user from `ADMIN_EMAIL` and
`ADMIN_PASSWORD`.

## Google Drive Photos

Before adding a photo in the admin:

1. Upload the image to Google Drive.
2. Open sharing settings.
3. Set access to `Anyone with the link can view`.
4. Paste the share link into `/admin/photos`.

Supported links include:

- `https://drive.google.com/file/d/<file-id>/view`
- `https://drive.google.com/open?id=<file-id>`
- `https://drive.google.com/uc?export=view&id=<file-id>`

Google Drive is convenient for admin-managed photos, but it is not a dedicated
image CDN. If reliability or performance becomes critical, the stored file ids
make it possible to migrate later.

## Quality Checks

```bash
npm run test
npm run lint
npm run build
```
