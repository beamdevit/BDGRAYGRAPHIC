# BDGRAYGRAPHIC

Independent development copy of [beamdevit/promptthumweb](https://github.com/beamdevit/promptthumweb), exported from commit `e91a0b75c9737767a3fcb8c9efed4f3d57cd6786`.

The frontend, Payload CMS admin, API routes, collections, globals, migrations, tests, and public source assets retain their original structure and functionality. This repository starts with a new Git history. Only this setup guide and additional ignore rules are added to the source snapshot.

## Requirements

- Node.js 24 LTS (the project requires Node.js 20.9 or later)
- npm
- A separate development PostgreSQL database for running the app

## Install and run locally

```sh
npm ci
```

Copy `.env.example` to `.env.local`. Set `DATABASE_URI` to your **development** PostgreSQL database, and generate a new `PAYLOAD_SECRET`:

```sh
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Keep optional notification credentials empty until you configure independent development integrations. Do not reuse production credentials or point either `DATABASE_URI` or `DATABASE_URL` at the original website's database.

Once the development database is configured:

```sh
npm run payload -- migrate
npm run dev
```

Open `http://localhost:3000` and `http://localhost:3000/admin`. Create a new admin account for this database when prompted.

## Build

```sh
npm run build
```

Build does not run migrations. `npm start` **does** run migrations before starting the app, so only run it after verifying the development database configuration.

## Tests

```sh
node --experimental-vm-modules --test --test-isolation=none tests/admin-regressions.test.mjs tests/categories.test.mjs tests/visitor-analytics.test.mjs
```

The separate database integration tests require their documented test dependencies and an isolated test database/runtime.

## Repository isolation

The only intended remote is:

```text
origin  https://github.com/beamdevit/BDGRAYGRAPHIC.git
```

Check `git remote -v` before pushing. Do not add the original repository as a push remote.

Production database records, admin accounts, uploaded media (`public/media`), environment files, API keys, credentials, Git history, and deployment connections are not included. Content stored in the database must be created separately in the development database. No deployment has been configured as part of this copy.
