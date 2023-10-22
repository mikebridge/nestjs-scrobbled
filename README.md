# LastFM API Wrapper with NestJS / Postgres / Prisma

** This is a work-in-progress **

This is a demo project using exported Last.fm data to create a REST API with NestJS, GraphQL, Postgres, and Prisma.

## Requirements

- [docker compose](https://docs.docker.com/compose/install/)
- [nvm](https://github.com/nvm-sh/nvm)

## Setup


### Create the db

```sh
docker compose build
docker compose up -d

# until we have the server configured, just use local npx
nvm use
npx prisma migrate dev
```

```sh
# TODO: switch to this later
# docker-compose run --rm server npx prisma init
```

### `Import From Last.FM`

Export your LastFM list from [here](https://benjaminbenben.com/lastfm-to-csv/)

Import the raw data into the Scrobble table:

```
COPY Scrobble(artist, album, track, datecreated)
FROM last_fm_export.csv'
DELIMITER ','
CSV HEADER;
```

Then populate the data using your [favourite SQL client](https://dbeaver.io/)

```sql
INSERT INTO "Artist"(name)
SELECT DISTINCT Artist
FROM    "Scrobble";

-- todo: Handle the NULL album names
INSERT INTO "Album"("artistId", Name)
SELECT DISTINCT "Artist".id AS ArtistId,
                "Scrobble".Album AS Name
FROM "Scrobble"
    JOIN "Artist" ON "Scrobble".Artist="Artist".Name;

```

```sql
INSERT INTO "Track"("albumId", name)
SELECT DISTINCT "Album".id, track FROM "Scrobble"
INNER JOIN "Album"
ON "Album".name = "Scrobble".album
INNER JOIN "Artist"
ON "Album"."artistId" = "Artist".id
AND "Scrobble".artist = "Artist".name;
```

## Original Setup

This project was generated something like this:

```
npm install -g @nestjs/cli
nest new nestjs-scrobbled
cd nestjs-scrobbled
# see: https://docs.nestjs.com/recipes/prisma
npm install prisma --save-dev
npx prisma init
docker compose build
# start up postgres so we can run the migrations
docker compose up -d

# create the migrations
npx prisma migrate dev --name init
# various other migrations
# npx prisma migrate dev --name create-scrobble
# ...


```

## Notes

- The original version of this used 
