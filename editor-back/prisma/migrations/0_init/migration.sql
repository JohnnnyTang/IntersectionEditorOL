-- CreateTable
CREATE TABLE "users" (
    "uid" UUID NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "email" VARCHAR(128) NOT NULL,
    "password" VARCHAR(64) NOT NULL,
    "tasks" INTEGER[],
    "role" VARCHAR(16) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("uid")
);
