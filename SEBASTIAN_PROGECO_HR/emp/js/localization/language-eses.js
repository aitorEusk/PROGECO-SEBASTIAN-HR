/**
 * @namespace flexygo.culture.eses
 */
var flexygo;
(function (flexygo) {
    var culture;
    (function (culture) {
        var eses;
        (function (eses) {
            eses.presences = {
                day: 'Día',
                workingHours: 'Horas jornada',
                absenceHours: 'Horas ausencias',
                workedHours: 'Horas trabajadas',
                difference: 'Diferencia',
                nonBusinessDay: 'No laborable',
                holidays: 'Vacaciones',
                hours: 'Horas',
                days: 'Dias'
            };
            eses.warnings = {
                filterHolidays: 'Filtra los empleados para ver sus vacaciones/ausencias',
                removeHolidays: 'Este registro de vacaciones está integrado en una instancia. Al eliminarlo se eliminarán el resto de dias que comparten su instancia.¿Desea continuar?'
            };
            eses.planner = {
                shifts: 'Turnos',
                groups: 'Grupos',
                employees: 'Empleados',
                shift: 'Turno',
                group: 'Grupo',
                employee: 'Empleado',
                showdetails: 'Ver detalles',
                showdraggables: 'Arrastrar',
                today: 'Hoy',
                week: 'Semanal',
                month: 'Mensual',
                absences: 'Ausencias',
                patterns: 'Patrones',
                deleteplans: 'Eliminar planificaciones',
                EmployeeSchedule: 'Planificación de empleado',
                GroupSchedule: 'Planificación de grupo',
                OfficePeriods: 'Periodo de oficina',
                EmployeeRule0: 'Regla de empleado',
                EmployeePeriods: 'Periodo de empleado',
                GroupScheduleFreeDay: 'Día libre del grupo',
                PositionPeriods: 'Periodo del puesto de trabajo',
                UnitsPeriods: 'Periodo de la unidad organizativa',
                ScopePeriods: 'Periodo del ámbito',
                AssistenceShift: 'Turno registrado',
            };
            eses.emp = {
                nocalendar: 'Sin calendario asociado',
                deletebtn: 'Eliminar festivos',
                weeklyBtn: 'Añadir festivo semanal',
                excelFileTitle: 'Nombre del archivo',
                excelFileMsg: 'Da un nombre al archivo',
                noItemsSelected: 'No hay elementos seleccionados',
                selectAtLeastOneEmployee: 'Debe seleccionar al menos un empleado',
                errorUpdatingShift: 'Error al actualizar el turno',
                applyFilterToModifyBalances: 'Aplique algún filtro para modificar los balances.',
                selectCompanyGroupUnitAndDateRange: 'Debe seleccionar una compañía, un grupo o una unidad, y un rango de fechas (inicial y final) para poder exportar los datos.',
                selectDateRange: 'Debe seleccionar un rango de fechas (inicial y final) para poder exportar los datos.',
                cannotChangePlanificationStatus: 'No se puede cambiar la planificación de un empleado cuando sus fichajes están en estado',
                existingMarkingsConfirm: 'Ya hay fichajes para este día ¿Quieres replanificarlo?',
                cantUpdateSchedule: 'No se puede actualizar la planificación',
                cannotModifyPastPlanification: 'No se puede modificar una planificación ya pasada.',
                employeeCreated: 'Empleado/a creado correctamente',
                employeeCreatedHolidaysError: 'Se ha creado el empleado pero ha habido un problema rellenando las vacaciones totales',
                filterByDateRequired: 'Es necesario filtrar por una fecha de inicio y una de fin',
                instanceAbsences: 'Ausencias',
                instanceHolidays: 'Vacaciones',
            };
            eses.balance = {
                year: 'Año',
                month: 'Mes',
                week: 'Semana',
                back: 'Atrás',
                foward: 'Adelante'
            };
            eses.employeemanager = {
                employee: 'Empleado/a',
                employeePersonal: 'Datos personales',
                employeeContract: 'Contrato',
                employeeOrganization: 'Organización',
                save: 'Guardar',
                next: 'Siguiente',
                exit: 'Salir',
                empmanagertitle: 'Creación de empleados/as'
            };
            eses.historiclst = {
                selectoption: 'Seleccione alguna opción',
                selectoptionmsg: 'No se pueden generar los listados si no se selecciona una opción para mostrar'
            };
            eses.months = {
                1: 'Enero',
                2: 'Febrero',
                3: 'Marzo',
                4: 'Abril',
                5: 'Mayo',
                6: 'Junio',
                7: 'Julio',
                8: 'Agosto',
                9: 'Septiembre',
                10: 'Octubre',
                11: 'Noviembre',
                12: 'Diciembre'
            };
            eses.weekdays = {
                mon: 'Lu',
                tue: 'Ma',
                wed: 'Mi',
                thu: 'Ju',
                fri: 'Vi',
                sat: 'Sá',
                sun: 'Do'
            };
            eses.accesspoint = {
                errormsg: 'Código de acceso no encontrado',
                exit: 'Salida',
                enter: 'Entrada',
                helloexit: 'Hola',
                helloenter: 'Adiós',
                lastmarking: 'Tu último fichaje',
                noplanning: 'No tienes planificación para hoy',
                employeeNotFound: 'No se encuentra al empleado',
                accessIdNotFound: 'No se encuentra el código de acceso',
            };
            eses.messages = {
                multipleabsencescalendar: 'Hay más de un registro de vacaciones/ausencias para esta fecha, seleccione el que desea abrir de la lista emergente',
                markingsunplannedabsences: 'No ha seleccionado ningún empleado, por lo que se insertarán los fichajes para todas las ausencias no planificadas. ¿Quieres continuar ?',
                holidaysunplannedabsences: 'No ha seleccionado ningún empleado, por lo que se insertará una ausencia pendiente de justificar para todas las ausencias no planificadas. ¿Quieres continuar? '
            };
            eses.documents = {
                missingData: 'No se encontraron los datos necesarios para eliminar el documento',
                confirmDelete: '¿Está seguro de que desea eliminar este documento?',
                deleteSuccess: 'Documento eliminado correctamente'
            };
            eses.incidences = {
                selectResolutionType: 'Por favor, seleccione un tipo de resolución',
                noResolutionType: 'No se pudo obtener el tipo de resolución',
                noCurrentReference: 'No se pudo obtener la referencia actual',
                incidencesResolved: 'Incidencias resueltas correctamente'
            };
            eses.workdays = {
                noWorkDaysSelected: 'No hay jornadas seleccionadas para validar',
                workDaysValidated: 'Jornadas validadas correctamente',
                noWorkDaysSelectedUndo: 'No hay jornadas seleccionadas para desvalidar',
                workDaysUnvalidated: 'Validación de jornadas deshecha correctamente',
                noWorkDaysSelectedBalance: 'No hay jornadas seleccionadas para consolidar el balance',
                workDaysBalanced: 'Balance de jornadas consolidado correctamente',
                noWorkDaysSelectedBalanceUndo: 'No hay jornadas seleccionadas para deshacer el balance',
                workDaysBalanceUndone: 'Balance de jornadas deshecho correctamente',
                changeFestiveWorkedAllEmployeesConfirm: 'No hay elementos seleccionados. Se ejecutará el proceso para todos los empleados accesibles. ¿Desea continuar?',
                changeFestiveWorkedSuccess: 'Proceso ejecutado correctamente',
                refreshDayDateBatchConfirm: 'No hay elementos seleccionados. Se ejecutará el proceso para todos los empleados accesibles. ¿Desea continuar?',
                refreshAllDayDateBatchConfirm: 'No hay empleados seleccionados. Se ejecutará el proceso para todos los empleados accesibles en el periodo. ¿Desea continuar?',
                changePlanificationAllDayDateBatchConfirm: 'No hay empleados seleccionados. Se cambiará la planificación de todos los empleados accesibles en el periodo. ¿Desea continuar?',
                changePlanificationWrapperBatchConfirm: 'No hay elementos seleccionados. Se cambiará la planificación de todos los empleados accesibles para esta fecha. ¿Desea continuar?',
                changePlanificationWrapperBatchGroupedConfirm: 'No hay empleados seleccionados. Se cambiará la planificación de todos los empleados accesibles en el periodo. ¿Desea continuar?',
                noEmployeesSelectedCannotExecute: 'No hay empleados seleccionados. Seleccione al menos un empleado para ejecutar el proceso.',
                recalcMetricsDirtyBatchConfirm: 'No hay elementos seleccionados. Se recalcularán las métricas de todas las jornadas sucias de los empleados accesibles para esta fecha. ¿Desea continuar?',
                recalcMetricsDirtyGroupedConfirm: 'No hay empleados seleccionados. Se recalcularán las métricas de todas las jornadas sucias de los empleados accesibles en el periodo. ¿Desea continuar?',
                recalcMetricsDirtySuccess: 'Jornadas sucias recalculadas correctamente.',
                adminRecalcHistoryRangeConfirm: 'No hay elementos seleccionados. Se ejecutará el recalculo completo (métricas e incidencias) para todos los empleados accesibles en el rango de fechas. ¿Desea continuar?',
                noHeaderDates: 'No se encontraron fechas en el encabezado',
                noModuleOrList: 'No se encontró el módulo o la lista',
                monthly: 'Mensual',
                weekly: 'Semanal'
            };
            eses.dirtylog = {
                calendar: 'Calendario',
                date: 'Fecha',
                description: 'Descripción',
                view: 'Ver',
                type: 'Tipo',
                datestart: 'Fecha inicio',
                dateend: 'Fecha fin',
                reason: 'Motivo',
                leavetype: 'Tipo de baja',
                shift: 'Turno',
                breaksigned: 'Descanso fichado',
                workonfestive: 'Trabaja festivos',
                line: 'Línea',
                starttime: 'Hora inicio',
                duration: 'Duración',
                hours: 'horas'
            };
            eses.heatmap = {
                noData: 'Sin datos para mostrar',
                less: 'Menos',
                more: 'Más',
                date: 'Fecha',
                healthScore: 'Puntuación de salud',
                status: 'Estado',
                months: 'Ene,Feb,Mar,Abr,May,Jun,Jul,Ago,Sep,Oct,Nov,Dic',
                days: 'Lun,Mar,Mié,Jue,Vie,Sáb,Dom'
            };
            eses.projects = {
                deleteweekplan: '¿Está seguro de que desea eliminar la planificación semanal?'
            };
            eses.onlineapp = {
                welcome: 'Bienvenido a Sebastian',
                goodbye: 'Hasta luego'
            };
            eses.climatepulse = {
                good: 'Bien',
                neutral: 'Normal',
                difficult: 'Difícil',
                send: 'Enviar',
                thanks: '¡Gracias por compartir!',
                'comment.placeholder': 'Comentario breve opcional...'
            };
            eses.testdatawizard = {
                title: 'Generador Datos Demo',
                detecting: 'Detectando...',
                stepConfig: 'Configuración',
                stepPreview: 'Previsualización',
                stepResult: 'Resultado',
                restrictedTitle: 'Acceso Restringido',
                restrictedMsg1: 'Se han detectado datos operativos en la base de datos.',
                restrictedMsg2: 'Por seguridad, <strong>no es posible generar datos de prueba</strong> sobre una instalación en uso.',
                backToHome: 'Volver al Inicio',
                sectorLabel: '1. Selecciona el Sector',
                sectorOffices: 'Oficinas',
                sectorManufacturing: 'Fabricación',
                sectorServices: 'Servicios',
                volumeLabel: '2. Volumen de Empleados',
                volumeHint: 'Desliza para ajustar entre 10 y 200 empleados.',
                structureLabel: '3. Opciones Estructurales',
                multiCompany: 'Multi-empresa',
                multiOffice: 'Multi-centro',
                circuitsLabel: '4. Datos a Generar',
                circuitOrg: 'Estructura Organizativa',
                circuitEmployees: 'Empleados y Fichas',
                circuitShifts: 'Turnos y Calendarios',
                circuitAbsences: 'Ausencias Demo',
                circuitMarkings: 'Fichajes Históricos (2 meses)',
                circuitContracts: 'Contratos (PRO)',
                next: 'Siguiente',
                previewTitle: 'Revisión de la generación',
                previewDesc: 'Por favor confirma los datos antes de lanzar el proceso. Este proceso puede tardar unos segundos.',
                previewSummary: 'Resumen',
                previewSector: 'Sector:',
                previewStructure: 'Estructura:',
                previewVolume: 'Volumen:',
                previewEmployeesEst: 'Empleados (estimado)',
                previewMode: 'Modo:',
                previewDetails: 'Detalles:',
                timeEstimate: 'Tiempo estimado: <strong>30-60 segundos</strong>. No cierres esta ventana.',
                back: 'Atrás',
                generate: 'Generar Datos',
                generating: 'Generando datos...',
                pleaseWait: 'Por favor espera',
                successTitle: '¡Generación Completada!',
                companies: 'Empresas',
                offices: 'Oficinas',
                employees: 'Empleados',
                historicYears: 'Años Histórico',
                demoModeTitle: 'Modo demo activo',
                demoModeWarning: 'Mientras haya datos de prueba en el sistema, cualquier dato que se inserte manualmente en la aplicación también se eliminará al pulsar <em>Eliminar Datos</em>. La base de datos quedará completamente vacía.',
                deleteData: 'Eliminar Datos',
                finish: 'Finalizar',
                licensePrefix: 'Licencia: ',
                testDataActive: 'Datos de Prueba Activos',
                generationComplete: 'Generación completada',
                confirmDelete: '¿Estás seguro de ELIMINAR los datos generados?',
                deletingData: 'Eliminando datos...',
                errorGenerating: 'Error generando datos: ',
                errorDeleting: 'Error eliminando datos: ',
                detailsBase: 'Datos base, Empleados, Turnos, Ausencias',
                detailsMarkings: ', Fichajes',
                detailsContracts: ', Contratos',
                structureCompany: '1 Empresa',
                structureCompanies: ' Empresas',
                structureOffice: ', 1 Centro/Empresa',
                structureOffices: ' Centros/Empresa'
            };
        })(eses = culture.eses || (culture.eses = {}));
    })(culture = flexygo.culture || (flexygo.culture = {}));
})(flexygo || (flexygo = {}));
//# sourceMappingURL=language-eses.js.map