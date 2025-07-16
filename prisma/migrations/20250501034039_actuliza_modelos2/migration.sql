/*
  Warnings:

  - You are about to drop the column `time` on the `Appointment` table. All the data in the column will be lost.
  - Made the column `date` on table `Appointment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `start` on table `TimeBlock` required. This step will fail if there are existing NULL values in that column.
  - Made the column `end` on table `TimeBlock` required. This step will fail if there are existing NULL values in that column.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Appointment] ALTER COLUMN [date] DATETIME NOT NULL;
ALTER TABLE [dbo].[Appointment] DROP COLUMN [time];

-- AlterTable
ALTER TABLE [dbo].[TimeBlock] ALTER COLUMN [start] DATETIME2 NOT NULL;
ALTER TABLE [dbo].[TimeBlock] ALTER COLUMN [end] DATETIME2 NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
