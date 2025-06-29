-- DropForeignKey
ALTER TABLE "BlogView" DROP CONSTRAINT "BlogView_blogId_fkey";

-- AddForeignKey
ALTER TABLE "BlogView" ADD CONSTRAINT "BlogView_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
