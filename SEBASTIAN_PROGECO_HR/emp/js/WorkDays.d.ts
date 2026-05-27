declare namespace sebastian.workdays {
    /**
     * Alterna la selección en el bag para un registro de jornada diaria.
     * Actualiza el icono según el estado de selección.
     * Usado en la vista diaria de fichajes (toggleRowCheckCore con data-iddoc).
     * Call: sebastian.workdays.toggleRowCheck(IdDoc, element)
     * @param IdDoc - ID del documento del registro emp_vHR_Employee_Daydate
     * @param element - Elemento icono a actualizar
     */
    function toggleRowCheck(IdDoc: any, element?: HTMLElement): void;
    /**
     * Alterna la selección en el bag para todos los registros de la vista diaria.
     * Obtiene los datos mediante getView y actualiza todos los iconos.
     * Call: sebastian.workdays.toggleAllRowCheck(element, DayDate)
     * @param element - Elemento cabecera que disparó la acción
     * @param DayDate - Fecha del día para filtrar los registros
     */
    function toggleAllRowCheck(element: HTMLElement, DayDate: string): void;
    /**
     * Refresca los datos de jornada diaria en batch para los registros seleccionados.
     * Si hay elementos seleccionados en el bag, ejecuta el proceso para la selección.
     * Si no hay selección, pide confirmación antes de ejecutar para todos los empleados visibles (ACM).
     * Call: sebastian.workdays.refreshDayDateBatch(element)
     * @param element - Elemento que disparó la acción
     */
    function refreshDayDateBatch(element: HTMLElement): void;
    /**
     * Lanza el proceso de cambio de planificación en batch para la vista diaria.
     * Si hay elementos seleccionados, ejecuta directamente. Si no, pide confirmación.
     * Llama al wrapper pEmployeePeriod_ChangePlanification_Batch_Wrapper con StartDate=EndDate=DayDate.
     * Call: sebastian.workdays.ChangePlanificationWrapperBatch(element)
     * @param element - Elemento que disparó la acción
     */
    function ChangePlanificationWrapperBatch(element: HTMLElement): void;
    /**
     * Recalcula las métricas de las jornadas sucias (DirtyFlag=1) en la vista diaria.
     * Si hay selección, ejecuta para los registros seleccionados.
     * Si no, pide confirmación y ejecuta para todos los visibles (ACM).
     * Usa flexygo.Process.run() con callback para refrescar el listado tras completar el SP.
     * Call: sebastian.workdays.EmployeesAssistenceRecalcMetricsRecalcDirty(element)
     * @param element - Elemento que disparó la acción
     */
    function EmployeesAssistenceRecalcMetricsRecalcDirty(element: HTMLElement): void;
    /**
     * Recalcula el historial completo (métricas + incidencias) en la vista diaria.
     * Si hay selección, ejecuta para los registros seleccionados.
     * Si no, pide confirmación y ejecuta para todos los visibles (ACM).
     * Llama al proceso DLL Recalculate_metrics_and_incidents (HistoricalRecalc.ExecuteBatchRecalcByDay).
     * Call: sebastian.workdays.AdminRecalcHistoryRange(element)
     * @param element - Elemento que disparó la acción
     */
    function AdminRecalcHistoryRange(element: HTMLElement): void;
    /**
     * Ejecuta el proceso de cambio de festivo trabajado en batch para la vista diaria.
     * Si hay selección, abre el proceso directamente.
     * Si no, pide confirmación antes de ejecutar para todos los empleados visibles.
     * Call: sebastian.workdays.changeFestiveWorkedBatch(element)
     * @param element - Elemento que disparó la acción
     */
    function changeFestiveWorkedBatch(element: HTMLElement): void;
    /**
     * Valida o desvalida un periodo de jornada individual por IdDoc.
     * Abre el proceso de cierre/apertura de periodo como popup.
     * Call: sebastian.workdays.togglePeriodValidation(element, idDoc, true)  // validar
     * Call: sebastian.workdays.togglePeriodValidation(element, idDoc, false) // desvalidar
     * @param element - Elemento que disparó la acción
     * @param idDoc - IdDoc del periodo de jornada
     * @param validate - true para validar, false para desvalidar
     */
    function togglePeriodValidation(element: HTMLElement, idDoc: any, validate: boolean): void;
    /**
     * Alterna la selección en el bag para un registro de la vista agrupada por empleados.
     * Usa toggleRowCheckCore con atributo iddoc y actualiza el contador.
     * Call: sebastian.workdays.toggleRowCheckEmployees(IdDoc, element)
     * @param IdDoc - ID del documento del registro
     * @param element - Elemento icono a actualizar
     */
    function toggleRowCheckEmployees(IdDoc: any, element?: HTMLElement): void;
    /**
     * Alterna la selección en el bag para todos los registros de la vista agrupada por empleados.
     * Usa los datos de listElement.data y actualiza el contador.
     * Call: sebastian.workdays.toggleAllRowCheckEmployees(element)
     * @param element - Elemento cabecera que disparó la acción
     */
    function toggleAllRowCheckEmployees(element: HTMLElement): void;
    /**
     * Muestra el número de registros seleccionados en el bag dentro del botón contador.
     * Call: sebastian.workdays.showSelectedRowsEmployees(element)
     * @param element - Elemento donde se encuentra el contador
     */
    function showSelectedRowsEmployees(element: HTMLElement): void;
    /**
     * Alterna el estado de selección de una fila de jornada agrupada.
     * Usa atributos DOM (checked) en lugar del bag de Flexygo.
     * Actualiza los module defaults con las filas seleccionadas.
     * Call: sebastian.workdays.toggleRowCheckGroupedView(event)
     * @param event - Evento click del div que contiene el icono
     */
    function toggleRowCheckGroupedView(event: Event): void;
    /**
     * Alterna la selección de todos los empleados en la vista agrupada por periodo.
     * Marca/desmarca todas las filas y actualiza los module defaults con todos los empleados.
     * Cuando selecciona todo, obtiene los datos mediante getView para incluir empleados paginados.
     * Call: sebastian.workdays.toggleAllEmployeesGroupedView(event)
     * @param event - Evento click del icono de la cabecera
     */
    function toggleAllEmployeesGroupedView(event: Event): void;
    /**
     * Restaura el estado de selección de filas al cargar el módulo.
     * Compara las fechas guardadas en module defaults con las fechas actuales de la vista.
     * Si coinciden, marca las filas correspondientes como checked.
     * Si no coinciden, limpia los datos guardados.
     * Call: sebastian.workdays.restoreCheckedWorkDaysOnLoad(element)
     * @param element - Elemento del módulo que se está cargando
     */
    function restoreCheckedWorkDaysOnLoad(element: HTMLElement): void;
    /**
     * Valida todas las jornadas seleccionadas en la vista agrupada.
     * Llama al SP HR_pWorkDays_Validate_Batch_FromJson.
     * Call: sebastian.workdays.validateCheckedWorkDays(element, currentReference)
     * @param element - Elemento que disparó la validación
     * @param currentReference - ID de referencia actual
     */
    function validateCheckedWorkDays(element: HTMLElement, currentReference: number): void;
    /**
     * Deshace la validación de todas las jornadas seleccionadas en la vista agrupada.
     * Llama al SP HR_pWorkDays_Validate_Undo_Batch_FromJson.
     * Call: sebastian.workdays.unvalidateCheckedWorkDays(element, currentReference)
     * @param element - Elemento que disparó la acción
     * @param currentReference - ID de referencia actual
     */
    function unvalidateCheckedWorkDays(element: HTMLElement, currentReference: number): void;
    /**
     * Consolida el saldo de todas las jornadas seleccionadas en la vista agrupada.
     * Llama al SP HR_pWorkDays_Balance_Batch_FromJson.
     * Call: sebastian.workdays.balanceCheckedWorkDays(element, currentReference)
     * @param element - Elemento que disparó la acción
     * @param currentReference - ID de referencia actual
     */
    function balanceCheckedWorkDays(element: HTMLElement, currentReference: number): void;
    /**
     * Deshace la consolidación de saldo de todas las jornadas seleccionadas.
     * Llama al SP HR_pEmployeeDate_Balance_Undo_FromJson.
     * Call: sebastian.workdays.undoBalanceCheckedWorkDays(element, currentReference)
     * @param element - Elemento que disparó la acción
     * @param currentReference - ID de referencia actual
     */
    function undoBalanceCheckedWorkDays(element: HTMLElement, currentReference: number): void;
    /**
     * Refresca los datos de jornada en batch para el periodo agrupado.
     * Si hay empleados seleccionados (via checkedWorkDaysGrouped), ejecuta para esos empleados.
     * Si no, pide confirmación antes de ejecutar para todos los visibles (ACM).
     * Call: sebastian.workdays.refreshAllDayDateBatch(element)
     * @param element - Elemento que disparó la acción
     */
    function refreshAllDayDateBatch(element: HTMLElement): void;
    /**
     * Lanza el proceso wrapper de cambio de planificación en batch para la vista agrupada.
     * Si hay empleados seleccionados, ejecuta para esos empleados.
     * Si no, pide confirmación antes de ejecutar para todos los visibles (ACM).
     * Call: sebastian.workdays.ChangePlanificationWrapperBatchGrouped(element)
     * @param element - Elemento que disparó la acción
     */
    function ChangePlanificationWrapperBatchGrouped(element: HTMLElement): void;
    /**
     * Lanza el proceso de cambio de planificación para todas las jornadas en batch (agrupado).
     * Si hay empleados seleccionados, ejecuta para esos empleados.
     * Si no, pide confirmación antes de ejecutar para todos los visibles (ACM).
     * Call: sebastian.workdays.changePlanificationAllDayDateBatch(element)
     * @param element - Elemento que disparó la acción
     */
    function changePlanificationAllDayDateBatch(element: HTMLElement): void;
    /**
     * Recalcula las métricas de jornadas sucias (DirtyFlag=1) en la vista agrupada.
     * Si hay empleados seleccionados (via checkedWorkDaysGrouped), ejecuta para esos empleados.
     * Si no, pide confirmación antes de ejecutar para todos los visibles (ACM).
     * Usa flexygo.Process.run() con callback para refrescar tras completar.
     * Call: sebastian.workdays.recalcMetricsDirtyGrouped(element)
     * @param element - Elemento que disparó la acción
     */
    function recalcMetricsDirtyGrouped(element: HTMLElement): void;
    /**
     * Recalcula las métricas de las jornadas sucias (DirtyFlag=1) en la vista agrupada.
     * Si hay empleados seleccionados (via checkedWorkDaysGrouped), ejecuta para esos empleados.
     * Si no, pide confirmación antes de ejecutar para todos los visibles (ACM).
     * Usa flexygo.Process.run() con callback para refrescar el listado tras completar el SP.
     * Call: sebastian.workdays.EmployeesAssistenceRecalcMetricsRecalcDirtyGrouped(element)
     * @param element - Elemento que disparó la acción
     */
    function EmployeesAssistenceRecalcMetricsRecalcDirtyGrouped(element: HTMLElement): void;
    /**
     * Recalcula el historial completo (métricas + incidencias) en la vista agrupada.
     * Si hay empleados seleccionados (via checkedWorkDaysGrouped), ejecuta para esos empleados.
     * Si no, pide confirmación antes de ejecutar para todos los visibles (ACM).
     * Llama al proceso DLL Recalculate_metrics_and_incidents (HistoricalRecalc.ExecuteBatchRecalcByDay).
     * Call: sebastian.workdays.adminRecalcHistoryRangeGrouped(element)
     * @param element - Elemento que disparó la acción
     */
    function adminRecalcHistoryRangeGrouped(element: HTMLElement): void;
    /**
     * Configura el selector de fechas agrupado con modos de vista mensual/semanal.
     * Lee la configuración de defaults y localStorage para determinar el modo y la fecha.
     * Genera el HTML con flechas de navegación, picker de fecha y botones de modo.
     * Prioridad de configuración: defaults > localStorage > valores por defecto.
     * Call: sebastian.workdays.setMarkingsGroupedDateSelector(element)
     * @param element - Elemento donde se renderizará el selector
     */
    function setMarkingsGroupedDateSelector(element: HTMLElement): void;
    /**
     * Gestiona el cambio de fecha desde el input picker del selector agrupado.
     * Parsea el valor según el modo (YYYY-MM para mensual, YYYY-Www para semanal)
     * y navega a la nueva fecha.
     * Call: sebastian.workdays.onMarkingsGroupedDatePickerChange(value, mode)
     * @param value - Valor seleccionado en el picker
     * @param mode - Modo de vista actual ('monthly' o 'weekly')
     */
    function onMarkingsGroupedDatePickerChange(value: string, mode: string): void;
    /**
     * Navega a un mes o semana específico en la vista agrupada.
     * Guarda la nueva fecha y modo en localStorage, calcula StartDate/EndDate
     * y abre la página con los nuevos defaults.
     * Call: sebastian.workdays.manageMarkingMoveToMonthWeek(newDate, mode)
     * @param newDate - Nueva fecha de destino en formato YYYY-MM-DD
     * @param mode - Modo de vista ('monthly' o 'weekly')
     */
    function manageMarkingMoveToMonthWeek(newDate: string, mode: string): void;
    /**
     * Cambia el modo de visualización entre mensual y semanal.
     * Guarda el nuevo modo en localStorage, recalcula StartDate/EndDate
     * y recarga la página con la nueva configuración.
     * Call: sebastian.workdays.changeMarkingsGroupedViewMode(newMode, currentDate)
     * @param newMode - Nuevo modo de vista ('monthly' o 'weekly')
     * @param currentDate - Fecha actual que se está mostrando
     */
    function changeMarkingsGroupedViewMode(newMode: string, currentDate: string): void;
    /**
     * Navega a la página de fichajes diarios para una fecha específica.
     * Limpia los filtros guardados en localStorage antes de navegar.
     * Call: sebastian.workdays.goToDailyMarkingsPage(formatDate, target)
     * @param formatDate - Fecha en formato YYYY-MM-DD
     * @param target - Destino de navegación (ej: 'current', 'sliderightx50p')
     */
    function goToDailyMarkingsPage(formatDate: string, target?: string): void;
    /**
     * Navega a un día específico en la página de gestión de fichajes.
     * Preserva el historial de navegación del módulo.
     * Call: sebastian.workdays.manageMarkingMoveToDay(DayDate)
     * @param DayDate - Fecha de destino en formato YYYY-MM-DD
     */
    function manageMarkingMoveToDay(DayDate: string): void;
    /**
     * Filtra todos los módulos de la página de fichajes aplicando los valores de los
     * multicombos y switches del panel de filtros.
     * Distingue entre filtros generales (aplican a todos los módulos) y filtros
     * específicos de fichajes (marcados con filteronlymarkings, solo aplican a módulos con filterAll=true).
     * Persiste la configuración de filtros en localStorage.
     * Call: sebastian.workdays.filterMarkingsManageModules(element, pageType)
     * @param elem - Elemento que disparó el filtro
     * @param pageType - Tipo de página: 'Daily' o 'Grouped' (por defecto: 'Daily')
     */
    function filterMarkingsManageModules(elem: any, pageType?: 'Daily' | 'Grouped'): void;
    /**
     * Elimina un filtro específico de la página de fichajes.
     * Limpia el componente de filtro, elimina del localStorage y reaplicar filtros restantes.
     * Call: sebastian.workdays.removeSpecificMarkingFilter(element, filterName, pageType)
     * @param elem - Elemento que disparó la acción (típicamente el icono del chip)
     * @param filterName - Atributo name del filtro a eliminar
     * @param pageType - Tipo de página: 'Daily' o 'Grouped' (por defecto: 'Daily')
     */
    function removeSpecificMarkingFilter(elem: any, filterName: string, pageType?: 'Daily' | 'Grouped'): void;
    /**
     * Limpia todos los filtros de la página de fichajes (multicombos, switches y botones).
     * Elimina localStorage, oculta todos los chips de filtro, limpia los valores de los
     * componentes y refresca todos los módulos sin filtro.
     * Call: sebastian.workdays.clearMarkingsManageFilters(element, pageType)
     * @param elem - Elemento que disparó la acción
     * @param pageType - Tipo de página: 'Daily' o 'Grouped' (por defecto: 'Daily')
     */
    function clearMarkingsManageFilters(elem: any, pageType?: 'Daily' | 'Grouped'): void;
    /**
     * Restaura los filtros de fichajes desde localStorage al cargar la página.
     * Lee los valores guardados, los restaura en los componentes de filtro
     * y aplica los filtros automáticamente. Si no hay filtros, colapsa el panel.
     * Se ejecuta con un setTimeout de 500ms para esperar a que los componentes estén listos.
     * Call: sebastian.workdays.getMarkingsFilterLocalStorageItem(pageType)
     * @param pageType - Tipo de página: 'Daily' o 'Grouped' (por defecto: 'Daily')
     */
    function getMarkingsFilterLocalStorageItem(pageType?: 'Daily' | 'Grouped'): void;
    /**
     * Renderiza un gráfico de barras horizontal con los porcentajes de fichajes por ubicación.
     * Lee los datos del flx-list hijo del módulo, filtra ubicaciones con CounterLocations > 0
     * y ajusta los porcentajes para que sumen 100%.
     * Call: sebastian.workdays.renderLocationChart(element)
     * @param element - Elemento flx-module que contiene el flx-list con los datos
     */
    function renderLocationChart(element: HTMLElement): void;
    /**
     * Muestra el combo editor de modo de zona horaria y oculta el label de solo lectura.
     * Permite al usuario cambiar el modo de zona horaria del fichaje.
     * Call: sebastian.workdays.editTimeZoneMode(element)
     * @param element - Elemento icono de lápiz que disparó la acción
     */
    function editTimeZoneMode(element: HTMLElement): void;
    /**
     * Guarda la zona horaria seleccionada como override y refresca el módulo.
     * Ejecuta el proceso HR_pMarkings_OverrideTimeZoneMode para persistir el cambio.
     * Call: sebastian.workdays.saveTimeZoneMode(element, EmployeeId, DateJourney, RegId)
     * @param element - Elemento icono de guardar que disparó la acción
     * @param EmployeeId - ID del empleado
     * @param DateJourney - Fecha de la jornada (YYYY-MM-DD)
     * @param RegId - ID del registro
     */
    function saveTimeZoneMode(element: HTMLElement, EmployeeId: any, DateJourney: string, RegId: any): void;
    /**
     * Procesa el JSON del campo ChangeDetail de Employees_Assistence_DirtyLog
     * y genera HTML con información del cambio y botón de navegación al registro.
     * Soporta múltiples tipos de cambio: festivos, vacaciones, ausencias, bajas,
     * turnos, horarios de turno y días especiales de turno.
     * @param changeType - Tipo de cambio (ej: BANKHOLIDAY_INSERT, VACATION_INSERT, SHIFT_UPDATE, etc.)
     * @param changeDetail - JSON con los detalles del cambio
     * @returns HTML string con la información formateada y enlace de navegación, o '' si no aplica
     */
    function formatDirtyLogChangeDetail(changeType: string, changeDetail: string): string;
    /**
     * Resuelve una incidencia individual para un empleado y fecha específicos.
     * Lee el tipo de resolución de la tarjeta activa (batch-action-card.active)
     * y las notas del textarea del módulo. Ejecuta el SP HR_pIncidence_Resolve.
     * Call: sebastian.workdays.resolveSingleIncidence(element, employeeId, incidenceTypeId, date)
     * @param element - Elemento que disparó la acción
     * @param employeeId - ID del empleado
     * @param incidenceTypeId - Tipo de incidencia a resolver
     * @param date - Fecha de la incidencia (YYYY-MM-DD)
     */
    function resolveSingleIncidence(element: HTMLElement, employeeId: number, incidenceTypeId: number, date: string): void;
    /**
     * Resuelve incidencias en batch para un tipo y rango de fechas específicos.
     * Lee el tipo de resolución de la tarjeta activa y las notas del textarea.
     * Si se proporciona employeesIds, resuelve para esos empleados; si no, usa los de objectdefaults.
     * Call: sebastian.workdays.resolveIncidencesBatch(element, incidenceTypeId, startDate, endDate, employeesIds)
     * @param element - Elemento que disparó la acción
     * @param incidenceTypeId - Tipo de incidencia a resolver
     * @param startDate - Fecha inicio del periodo (YYYY-MM-DD)
     * @param endDate - Fecha fin del periodo (YYYY-MM-DD)
     * @param employeesIds - IDs de empleados separados por coma (opcional)
     */
    function resolveIncidencesBatch(element: HTMLElement, incidenceTypeId: number, startDate: string, endDate: string, employeesIds: string): void;
    /**
     * Actualiza una propiedad de la entidad WorkdayIncidenceType cuando se hace click en un switch.
     * El nuevo valor es el opuesto del estado actual (invertido para onclick).
     * Call: sebastian.workdays.updateWorkdayIncidenceType(this, 'PropertyName', {{IncidenceTypeId}})
     * @param element - Elemento switch que disparó el click
     * @param property - Nombre de la propiedad a actualizar
     * @param incidenceTypeId - IncidenceTypeId para filtrar la entidad
     */
    function updateWorkdayIncidenceType(element: HTMLElement, property: string, incidenceTypeId: number): void;
}
