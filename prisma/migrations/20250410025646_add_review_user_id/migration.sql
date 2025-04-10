/*
  Warnings:

  - Added the required column `userId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN "userId" TEXT;

-- Update Reviews with first user ID or delete all reviews if no users exist
DO $$
DECLARE
    first_user_id TEXT;
BEGIN
    SELECT id INTO first_user_id FROM "user" LIMIT 1;
    
    IF first_user_id IS NULL THEN
        -- No users exist, delete all reviews
        DELETE FROM "Review";
    ELSE
        -- Set userId for all reviews to the first user's ID
        UPDATE "Review" SET "userId" = first_user_id;
    END IF;
END $$;

-- Make userId NOT NULL after setting values
ALTER TABLE "Review" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
