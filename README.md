# reboot-template-app

_This is currently a work-in-progress project._

This is a template project to built a dynamic website with few external dependencies.

Features:

* File based routing (routes are generated at startup time based on the files in the ./site/routes and ./cms/routes folders)
* Login page for the admin interface/CMS (session/cookie based authentication)
* Basic functionality to implement translations (cookie based)

The project is written in TypeScript. Express is used as web server framework and sqlite as database.

## Development / Demo setup

The easiest way to run the project is to use deno. Make sure deno is installed on your system.

### Setup example database

    mkdir ./db
    deno run --allow-all ./dbscripts/00_setup-database.ts

    # additional setup scripts as needed
    # deno run --allow-all ./dbscripts/01_setup-entries-table.ts
    # deno run --allow-all ./dbscripts/02_setup-example-data.ts

### Run server

Install and run the server:

    deno task dev

The server should be running at http://localhost:3002 and show the main page of the website.

The admin interface/CMS should be running at http://localhost:3002/cms and show a login screen.

The example user and password are 'admin' and '1234'. This can be changed in the ./dbscripts/00_setup-database.ts script.

NOTE/TODO: Currently the users and passwords cannot yet be managed within the CMS. Ideally unsafe default passwords
should never be used but instead a password should be set when executing the setup database script or at 1st login.
As this is only a demo it is currently left as it is.

### Tailwind CSS (optional)

The bare templates provides no CSS styling. If wanted Tailwind CSS can be used to add styling as follows.

The tailwind CLI is required to rebuild the CSS after changes. Install it via npm or use the standalone
binary. TODO: Add link to tailwind installation instructions.

To rebuild the CSS automatically on changes run in a separate terminal window:

    deno task devtwexample
    deno task devtwadmin

## Deployment with Docker

Copy the .env.example file to .env and adjust the settings as needed.

    cp .env.example .env

Use docker to run the setup database scripts:

    mkdir db/

    docker run --rm \
      --env-file=.env \
      -v db:/db \
      -v .:/app \
      -w /app \
      denoland/deno:latest \
      deno run --allow-all ./dbscripts/00_setup-database.ts

NOTE: Run this for the respective database scripts as needed.

NOTE: This creates the database file with root permissions. Eventually you'll want to correct this:

    sudo chown $USER:$USER ./db/db.sqlite

Then use docker compose to run both servers in containers.

    docker compose up -d

Usually you would use a reverse on the server (e.g. nginx or apache) to forward requests to the two servers
running the CMS and the main website and also set up SSL with e.g. certbot.
