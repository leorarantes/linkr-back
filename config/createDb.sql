CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "photoLink" TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "sessions" (
    "id" SERIAL PRIMARY KEY,
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL REFERENCES "users"("id"),
    "lastStatus" DOUBLE PRECISION NOT NULL,
    "expired" BOOLEAN NOT NULL DEFAULT FALSE,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "posts" (
    "id" SERIAL PRIMARY KEY,
    "link" TEXT NOT NULL,
    "description" TEXT,
    "userId" INTEGER NOT NULL REFERENCES "users"("id"),
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "likes" (
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES "users"("id"),
    "postId" INTEGER NOT NULL REFERENCES "posts"("id"),
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "hashtags" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "useCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "postsHashtags" (
    "id" SERIAL PRIMARY KEY,
    "hashtagId" INTEGER NOT NULL REFERENCES "hashtags"("id"),
    "postId" INTEGER NOT NULL REFERENCES "posts"("id"),
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "follows" (
    "id" SERIAL PRIMARY KEY,
    "followerId" INTEGER NOT NULL REFERENCES "users"("id"),
    "followedId" INTEGER NOT NULL REFERENCES "users"("id"),
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
