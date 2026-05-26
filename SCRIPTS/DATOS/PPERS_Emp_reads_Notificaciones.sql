CREATE OR ALTER   PROCEDURE [dbo].[PPERS_Emp_reads_Notificaciones](
	@IdNotificacion	int,	
  	@EmployeeId		int,
	@FirstReadDate	Datetime,
  	@LastReadDate	Datetime
  	
)
AS
----------------------------------------------------------------------------------
--#NAME
--		PPERS_Emp_reads_Notificaciones
--#CREATION
-- 		2025-03-05 - Aitor
--#CLASIFICATION
-- 		Flexygo/MyStoreds
--#DESCRIPTION
-- 		Actualiza el contador de lecturas de la notificacion
--#PARAMETERS
-- 		@Param1:	@IdNotificacion		int
-- 		@Param2:	@EmployeeId			int
-- 		@Param3:	@FirstReadDate	Datetime
-- 		@Param4:	@LastReadDate	Datetime
--#OBSERVATIONS
-- 		
--#CHANGES
----------------------------------------------------------------------------------
BEGIN TRY

	BEGIN TRAN

	IF EXISTS(SELECT IdNotificacion, EmployeeId FROM PERS_Notificaciones_Reads WHERE IdNotificacion=@IdNotificacion AND EmployeeId=@EmployeeId)
    	UPDATE PERS_Notificaciones_Reads SET ReadTimes=ReadTimes+1, LastReadDate=@LastReadDate WHERE IdNotificacion=@IdNotificacion AND EmployeeId=@EmployeeId; 
    ELSE
		INSERT INTO PERS_Notificaciones_Reads (IdNotificacion, EmployeeId, FirstReadDate, LastReadDate, ReadTimes) VALUES (@IdNotificacion, @EmployeeId, @FirstReadDate, @LastReadDate, 1);
   
	COMMIT

	RETURN 1
END TRY

BEGIN CATCH
	IF @@TRANCOUNT >0 BEGIN
		ROLLBACK TRAN 
	END

	DECLARE @CatchError NVARCHAR(MAX)
	SET @CatchError=dbo.funPrintError(ERROR_MESSAGE(),ERROR_NUMBER(),ERROR_PROCEDURE(),@@PROCID ,ERROR_LINE())
	RAISERROR(@CatchError,12,1)
 
	RETURN 0

END CATCH