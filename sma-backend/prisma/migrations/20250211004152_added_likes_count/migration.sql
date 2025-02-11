-- CreateTable
CREATE TABLE "likes" (
    "id" SERIAL NOT NULL,
    "PostId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_PostId_fkey" FOREIGN KEY ("PostId") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
