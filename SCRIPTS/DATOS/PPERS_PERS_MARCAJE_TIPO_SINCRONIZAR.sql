CREATE OR ALTER   PROCEDURE [dbo].[PPERS_PERS_MARCAJE_TIPO_SINCRONIZAR]
	@p_Tipos pers_marcaje_tipo_TYPE READONLY
AS
BEGIN
	BEGIN TRY

		MERGE INTO PERS_Marcaje_tipo AS Target
		USING (
			SELECT * FROM @p_Tipos
		) AS Source
		ON Target.IdTipoMarcaje = Source.IdTipoMarcaje
		WHEN MATCHED THEN
			UPDATE SET
			IdTipoMarcaje = Source.IdTipoMarcaje,
			[Name] = Source.[Name]

		WHEN NOT MATCHED BY TARGET THEN
			INSERT (IdTipoMarcaje, [Name])
			VALUES (Source.IdTipoMarcaje, Source.[Name])
		
		--WHEN NOT MATCHED BY SOURCE THEN
		--	DELETE
		;
		

		RETURN -1
	END TRY
	BEGIN CATCH
		SELECT ERROR_MESSAGE()
		RETURN 0
	END CATCH
END




