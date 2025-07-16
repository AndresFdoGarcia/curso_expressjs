BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Usuario] (
    [id] VARCHAR(36) NOT NULL,
    [name] VARCHAR(100) NOT NULL,
    [email] VARCHAR(100) NOT NULL,
    [password] VARCHAR(100) NOT NULL,
    [createdAt] DATETIME CONSTRAINT [Usuario_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [role] TINYINT NOT NULL,
    CONSTRAINT [PK__Usuario__3213E83F4B447F4B] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Usuario_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Appointment] (
    [id] VARCHAR(36) NOT NULL,
    [date] DATETIME,
    [time] VARCHAR(10),
    [userId] VARCHAR(36) NOT NULL,
    [timeBlockId] VARCHAR(36) NOT NULL,
    CONSTRAINT [PK__Appointment__3213E83F4B447F4B] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[TimeBlock] (
    [id] VARCHAR(36) NOT NULL,
    [start] VARCHAR(10),
    [end] VARCHAR(10),
    CONSTRAINT [PK__timeBlock__3213E83F4B447F4B] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Appointment] ADD CONSTRAINT [Appointment_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[Usuario]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Appointment] ADD CONSTRAINT [Appointment_timeBlockId_fkey] FOREIGN KEY ([timeBlockId]) REFERENCES [dbo].[TimeBlock]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
