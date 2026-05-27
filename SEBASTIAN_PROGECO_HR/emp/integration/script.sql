/**** STORED PARA MOSTRAR LAS PRESENCIAS ****/
CREATE OR ALTER PROCEDURE [dbo].[pPers_Sebastian_ShowDailyPresences](
  	@EmployeeId		INT,
	@CurrentUser	INT,
	@RoleId			nvarchar(100),
	@Year			nvarchar(4),
	@Month			nvarchar(2)
)
AS
----------------------------------------------------------------------------------
--#NAME
--		PERS_Sebastian_ShowDailyPresences
--#CREATION
-- 		03/12/2019 - Javier Alcolea
--#CLASIFICATION
-- 		Flexygo/MyStoreds
--#DESCRIPTION
-- 		Stored procedure to get daily presences in Sebastian
--#PARAMETERS
--
--#OBSERVATIONS
-- 		
--#CHANGES
----------------------------------------------------------------------------------
BEGIN TRY

	BEGIN TRAN

	DECLARE @StartDate VARCHAR(8) = CONCAT(@Year,CASE WHEN LEN(@Month) < 2 THEN CONCAT('0',@Month) ELSE @Month END,'01')
	DECLARE @EndDate VARCHAR(8) = CONVERT(varchar, EOMONTH(CAST(CONCAT(@Year,CASE WHEN LEN(@Month) < 2 THEN CONCAT('0',@Month) ELSE @Month END,'01') as datetime)), 112)

    IF @EmployeeId=@CurrentUser OR @RoleId='admins' BEGIN
     		
		SELECT * FROM fun_Dame_Horas_Presencia_Diarias(@EmployeeId,@StartDate,@EndDate) order by Dia
					
    END   
    ELSE 
		BEGIN
			SELECT 'You do Not have enough credentials to view this Object.' as WarningMessage
			ROLLBACK TRAN
			RETURN 1;
		END
	COMMIT

	RETURN 1
END TRY

BEGIN CATCH
	IF @@TRANCOUNT >0 BEGIN
		ROLLBACK TRAN 
	END

	DECLARE @CatchError NVARCHAR(MAX)
	SET @CatchError=ERROR_MESSAGE()
	RAISERROR(@CatchError,12,1)
 
	RETURN 0

END CATCH
GO

/**** STORED PARA GUARDAR LAS VACACIONES ****/
CREATE OR ALTER PROCEDURE [dbo].[pVuelca_Vacaciones] (@IdEmpleado int, @Fecha smalldatetime, @IdTipo int, @Descrip varchar(1000))
AS
BEGIN TRY 

	IF EXISTS (SELECT IdEmpleado FROM Calendario_Empleados 
				WHERE IdEmpleado = @IdEmpleado AND IdIncidencia = @IdTipo AND CONVERT(varchar, @Fecha, 112) BETWEEN CONVERT(varchar, FechaIni, 112) AND CONVERT(varchar, FechaFin, 112)) BEGIN
		RAISERROR('ESTE DÍA YA ESTÁ ASIGNADO', 12, 1) 
	END 

	;WITH LaJornada AS (SELECT TOP 1 J.IdJornada, JE.IdEmpleado, JE.FechaIni, J.HoraInicio, JE.FechaFin, J.HoraFin FROM Jornadas J 
						INNER JOIN Jornadas_Empleados JE ON J.IdJornada = JE.IdJornada AND JE.IdEmpleado = @IdEmpleado 
						INNER JOIN Jornadas_TiposHoras JTH ON J.IdTipoHora = JTH.IdTipoHora 
						WHERE CONVERT(varchar, @Fecha, 112) BETWEEN CONVERT(varchar, JE.FechaIni, 112) AND CONVERT(varchar, JE.FechaFin, 112)
						ORDER BY JTH.HorasExceso DESC)

	INSERT INTO Calendario_Empleados(IdEmpleado, IdIncidencia, IdJornada, FechaIniJornada, FechaIni, HoraIni, FechaFin, HoraFin, Descrip)
	SELECT IdEmpleado, @IdTipo, IdJornada, FechaIni, @Fecha, HoraInicio, @Fecha, HoraFin, @Descrip 
 	FROM LaJornada

	RETURN -1

END TRY 

BEGIN CATCH
	IF @@TRANCOUNT >0 BEGIN
		ROLLBACK TRAN 
	END

	DECLARE @CatchError NVARCHAR(MAX)
	SET @CatchError=dbo.funImprimeError(ERROR_MESSAGE(),ERROR_NUMBER(),ERROR_PROCEDURE(),@@PROCID ,ERROR_LINE())
	RAISERROR(@CatchError,12,1)
 
	RETURN 0

END CATCH
GO