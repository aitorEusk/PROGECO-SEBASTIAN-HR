var sebastian;
(function (sebastian) {
    var workdays;
    (function (workdays) {
        // ╔══════════════════════════════════════════════════════════════════════════╗
        // ║                    FUNCIONES AUXILIARES COMPARTIDAS                      ║
        // ║  Funciones internas reutilizadas por múltiples secciones del archivo.   ║
        // ║  Incluyen manipulación de iconos, obtención de elementos del DOM,       ║
        // ║  cálculo de rangos de fechas y lógica core de selección (bag/toggle).   ║
        // ╚══════════════════════════════════════════════════════════════════════════╝
        /**
         * Actualiza el icono según el estado de selección (check/uncheck).
         * Alterna entre las clases icon-non-check-2 e icon-accepted-2.
         * @param icon - Elemento jQuery del icono
         * @param isSelected - Si el elemento está seleccionado
         */
        function updateIconState(icon, isSelected) {
            if (icon && icon.length) {
                if (isSelected) {
                    icon.removeClass('icon-non-check-2').addClass('icon-accepted-2');
                }
                else {
                    icon.removeClass('icon-accepted-2').addClass('icon-non-check-2');
                }
            }
        }
        /**
         * Busca el elemento icono en diferentes contextos del DOM.
         * Primero busca dentro del elemento, luego como filtro, y finalmente
         * por atributo data-iddoc/iddoc dentro del módulo padre.
         * @param element - El elemento que contiene o es el icono
         * @param moduleElement - Elemento módulo padre (opcional, para búsqueda)
         * @param idDoc - El ID del documento (opcional, para búsqueda)
         * @param useDataAttr - Si usar data-iddoc (true) o iddoc (false)
         * @returns Elemento jQuery del icono encontrado
         */
        function findIcon(element, moduleElement, idDoc, useDataAttr = true) {
            let icon = $(element).find('i');
            if (!icon.length) {
                icon = $(element).filter('i');
            }
            if (!icon.length && moduleElement && idDoc) {
                const attrName = useDataAttr ? 'data-iddoc' : 'iddoc';
                icon = moduleElement.find(`[${attrName}="${idDoc}"] i`).first();
            }
            return icon;
        }
        /**
         * Obtiene el elemento flx-list dentro de un módulo.
         * @param moduleElement - El elemento módulo
         * @returns FlxListElement o null si no se encuentra
         */
        function getListElement(moduleElement) {
            const listElement = moduleElement.find('flx-list')[0];
            return listElement || null;
        }
        /**
         * Calcula el rango de fechas (inicio y fin) según el modo de visualización.
         * En modo mensual, devuelve el primer y último día del mes.
         * En modo semanal, devuelve el lunes y domingo de la semana ISO.
         * @param date - Fecha de referencia
         * @param mode - 'monthly' para mensual o 'weekly' para semanal
         * @returns Objeto con startDate y endDate en formato YYYY-MM-DD
         */
        function calculateDateRange(date, mode) {
            const dateObj = moment(date);
            if (mode === 'monthly') {
                return {
                    startDate: dateObj.startOf('month').format('YYYY-MM-DD'),
                    endDate: dateObj.endOf('month').format('YYYY-MM-DD')
                };
            }
            else {
                return {
                    startDate: dateObj.startOf('isoWeek').format('YYYY-MM-DD'),
                    endDate: dateObj.endOf('isoWeek').format('YYYY-MM-DD')
                };
            }
        }
        /**
         * Actualiza el botón contador con el número de elementos seleccionados en el bag.
         * @param moduleElement - El elemento módulo
         * @param objectName - Nombre del objeto para la selección
         */
        function updateCounterButton(moduleElement, objectName) {
            const selectionLength = flexygo.selection.getArray(objectName).length;
            moduleElement.find('.counter-btn').html(selectionLength.toString());
        }
        /**
         * Dispara eventos de refresco para botones del bag y toolbar del módulo.
         * Actualiza badges de selección y dispara eventos check/uncheck de Flexygo.
         * @param moduleElement - El elemento módulo jQuery
         * @param flxModule - El FlxModuleElement nativo
         * @param listElement - El FlxListElement del listado
         * @param objectName - Nombre del objeto Flexygo
         * @param allSelected - Si todos los items estaban seleccionados antes del toggle
         */
        function triggerBagRefreshEvents(moduleElement, flxModule, listElement, objectName, allSelected) {
            const selectionLength = flexygo.selection.getArray(objectName).length;
            const currentFilter = listElement.processwhere;
            if (listElement.moduleButtons) {
                flxModule.refreshButtons(listElement.moduleButtons, listElement.collectionname, currentFilter);
            }
            // Disparar evento check/uncheck de Flexygo
            const eventType = allSelected ? 'uncheck' : 'check';
            const ev = {
                class: "entity",
                type: eventType,
                sender: listElement,
                masterIdentity: listElement.collectionname,
                detailIdentity: {
                    moduleFilter: currentFilter,
                    selectedItems: flexygo.selection.getArray(objectName)
                }
            };
            flexygo.events.trigger(ev, moduleElement);
            // Actualizar badges en la toolbar del módulo
            if (selectionLength > 0) {
                flxModule.activeBagButtons(moduleElement);
                moduleElement.find('.moduleToolbar [data-type="objectmenu"] .badge').html(selectionLength.toString());
                moduleElement.find('.moduleToolbar [data-type="objectmenu"] .caret').hide();
            }
            else {
                moduleElement.find('.moduleToolbar [data-type="objectmenu"] .badge').remove();
                moduleElement.find('.moduleToolbar [data-type="objectmenu"] .caret').show();
            }
        }
        /**
         * Lógica core de toggle para selección individual en el bag de Flexygo.
         * Alterna la selección de un registro emp_vHR_Employee_Daydate por IdDoc.
         * Usado por toggleRowCheck (vista diaria) y toggleRowCheckEmployees (vista agrupada).
         * @param IdDoc - ID del documento del registro
         * @param element - Elemento HTML que disparó la acción
         * @param useDataAttr - Si usar data-iddoc (true) o iddoc (false) para buscar el icono
         * @param updateCounter - Si actualizar el botón contador tras el toggle
         */
        function toggleRowCheckCore(IdDoc, element, useDataAttr, updateCounter) {
            const objectName = 'emp_vHR_Employee_Daydate';
            const objectWhere = `vHR_Employee_Daydate.IdDoc = ${IdDoc}`;
            const moduleElement = $(element).closest('flx-module');
            if (!moduleElement.length)
                return;
            const icon = findIcon(element, moduleElement, IdDoc, useDataAttr);
            const flxModule = moduleElement[0];
            const button = icon.length ? icon.parent() : $('<button>');
            // Alternar selección en el bag de Flexygo
            flxModule.toggleBag(objectName, objectWhere, button);
            // Actualizar icono según estado de selección
            const isSelected = flexygo.selection.contains(objectName, IdDoc);
            updateIconState(icon, isSelected);
            // Actualizar contador si es necesario
            if (updateCounter) {
                updateCounterButton(moduleElement, objectName);
            }
        }
        /**
         * Lógica core de toggle masivo (seleccionar/deseleccionar todos).
         * Obtiene todos los IdDoc, determina si están todos seleccionados,
         * alterna la selección y actualiza todos los iconos del listado.
         * Usado por toggleAllRowCheck (vista diaria) y toggleAllRowCheckEmployees (vista agrupada).
         * @param element - Elemento cabecera que disparó la acción
         * @param objectName - Nombre del objeto Flexygo para la selección
         * @param getDataFn - Función que devuelve el array de todos los IdDocs
         * @param iconAttribute - Atributo para buscar iconos: 'data-iddoc' o 'iddoc'
         * @param updateCounterFn - Función opcional para actualizar contador (si null, usa toolbar)
         */
        function toggleAllRowCheckCore(element, objectName, getDataFn, iconAttribute, updateCounterFn) {
            const moduleElement = $(element).closest('flx-module');
            if (!moduleElement.length)
                return;
            const listElement = getListElement(moduleElement);
            if (!listElement || !listElement.data)
                return;
            sebastian.utils.addLock(5000);
            // Obtener todos los IdDocs
            const allIdDocs = getDataFn();
            // Verificar si todos los items están actualmente seleccionados
            const allSelected = allIdDocs.every((idDoc) => flexygo.selection.contains(objectName, idDoc));
            // Buscar el icono de la cabecera
            const headerIcon = $(element).find('i');
            if (!headerIcon.length) {
                sebastian.utils.removeLock();
                return;
            }
            // Alternar selección para todos los items
            if (allSelected) {
                allIdDocs.forEach((idDoc) => {
                    if (flexygo.selection.contains(objectName, idDoc)) {
                        flexygo.selection.toggle(objectName, idDoc);
                    }
                });
            }
            else {
                allIdDocs.forEach((idDoc) => {
                    if (!flexygo.selection.contains(objectName, idDoc)) {
                        flexygo.selection.toggle(objectName, idDoc);
                    }
                });
            }
            // Actualizar icono de la cabecera
            updateIconState(headerIcon, !allSelected);
            // Actualizar todos los iconos de las filas
            allIdDocs.forEach((idDoc) => {
                const rowIcon = moduleElement.find(`[${iconAttribute}="${idDoc}"] i`);
                if (rowIcon.length) {
                    const isSelected = flexygo.selection.contains(objectName, idDoc);
                    updateIconState(rowIcon, isSelected);
                }
            });
            // Disparar eventos y actualizar UI
            const flxModule = moduleElement[0];
            const selectionLength = flexygo.selection.getArray(objectName).length;
            if (updateCounterFn) {
                updateCounterFn(moduleElement, selectionLength);
            }
            else {
                triggerBagRefreshEvents(moduleElement, flxModule, listElement, objectName, allSelected);
            }
            sebastian.utils.removeLock();
        }
        // ╔══════════════════════════════════════════════════════════════════════════╗
        // ║              SECCIÓN 1: FUNCIONES DE WORKDAY DIARIAS                    ║
        // ║  Funciones para la vista diaria de jornadas. Operan sobre registros     ║
        // ║  individuales por día (emp_vHR_Employee_Daydate). Incluyen selección    ║
        // ║  individual/masiva, recálculo de métricas, cambio de planificación,     ║
        // ║  validación de periodos y festivos trabajados en la vista diaria.       ║
        // ╚══════════════════════════════════════════════════════════════════════════╝
        /**
         * Alterna la selección en el bag para un registro de jornada diaria.
         * Actualiza el icono según el estado de selección.
         * Usado en la vista diaria de fichajes (toggleRowCheckCore con data-iddoc).
         * Call: sebastian.workdays.toggleRowCheck(IdDoc, element)
         * @param IdDoc - ID del documento del registro emp_vHR_Employee_Daydate
         * @param element - Elemento icono a actualizar
         */
        function toggleRowCheck(IdDoc, element) {
            toggleRowCheckCore(IdDoc, element, true, false);
        }
        workdays.toggleRowCheck = toggleRowCheck;
        /**
         * Alterna la selección en el bag para todos los registros de la vista diaria.
         * Obtiene los datos mediante getView y actualiza todos los iconos.
         * Call: sebastian.workdays.toggleAllRowCheck(element, DayDate)
         * @param element - Elemento cabecera que disparó la acción
         * @param DayDate - Fecha del día para filtrar los registros
         */
        function toggleAllRowCheck(element, DayDate) {
            const objectName = 'emp_vHR_Employee_Daydate';
            const moduleElement = $(element).closest('flx-module');
            const listElement = getListElement(moduleElement);
            toggleAllRowCheckCore(element, objectName, () => {
                const object = new flexygo.obj.Entity(objectName);
                const data = object.getView('emp_vHR_Employee_Daydate_view', 0, 5000, listElement.additionalWhere, null, null, false, ` [{ "key": "DayDate", "value": "${DayDate}" }]`);
                return data.map((item) => item.IdDoc).filter((id) => id != null);
            }, 'iddoc', null // Usa la actualización de toolbar por defecto
            );
        }
        workdays.toggleAllRowCheck = toggleAllRowCheck;
        /**
         * Refresca los datos de jornada diaria en batch para los registros seleccionados.
         * Si hay elementos seleccionados en el bag, ejecuta el proceso para la selección.
         * Si no hay selección, pide confirmación antes de ejecutar para todos los empleados visibles (ACM).
         * Call: sebastian.workdays.refreshDayDateBatch(element)
         * @param element - Elemento que disparó la acción
         */
        function refreshDayDateBatch(element) {
            const objectName = 'emp_vHR_Employee_Daydate';
            const checkedIds = flexygo.selection.getArray(objectName);
            const parsedDefaults = sebastian.utils.parseDefaults(element);
            const date = parsedDefaults["DayDate"];
            flexygo.selection.clear(objectName);
            const runProcess = (idDocsCollection) => {
                const defaults = idDocsCollection
                    ? `{'IdDocsCollection':'${idDocsCollection}','DayDate':'${date}'}`
                    : `{'IdDocsCollection':'','DayDate':'${date}'}`;
                flexygo.nav.execProcess('pDateEmployee_Refresh_Batch', null, null, defaults, null, 'sliderightx30p', false, $(element));
            };
            if (checkedIds && checkedIds.length > 0) {
                runProcess(checkedIds.join(','));
            }
            else {
                flexygo.msg.confirm(flexygo.localization.translate('workdays.refreshDayDateBatchConfirm'), (result) => {
                    if (result) {
                        runProcess(null);
                    }
                });
            }
        }
        workdays.refreshDayDateBatch = refreshDayDateBatch;
        /**
         * Lanza el proceso de cambio de planificación en batch para la vista diaria.
         * Si hay elementos seleccionados, ejecuta directamente. Si no, pide confirmación.
         * Llama al wrapper pEmployeePeriod_ChangePlanification_Batch_Wrapper con StartDate=EndDate=DayDate.
         * Call: sebastian.workdays.ChangePlanificationWrapperBatch(element)
         * @param element - Elemento que disparó la acción
         */
        function ChangePlanificationWrapperBatch(element) {
            const objectName = 'emp_vHR_Employee_Daydate';
            const checkedIds = flexygo.selection.getArray(objectName);
            const parsedDefaults = sebastian.utils.parseDefaults(element);
            const date = parsedDefaults["DayDate"];
            flexygo.selection.clear(objectName);
            const runProcess = (idDocsCollection) => {
                const defaults = idDocsCollection
                    ? `{'EmployeesIds':'','IdDocsCollection':'${idDocsCollection}','StartDate':'${date}','EndDate':'${date}'}`
                    : `{'EmployeesIds':'','IdDocsCollection':'','StartDate':'${date}','EndDate':'${date}'}`;
                flexygo.nav.execProcess('pEmployeePeriod_ChangePlanification_Batch_Wrapper', null, null, defaults, null, 'sliderightx30p', false, $(element));
            };
            if (checkedIds && checkedIds.length > 0) {
                runProcess(checkedIds.join(','));
            }
            else {
                flexygo.msg.confirm(flexygo.localization.translate('workdays.changePlanificationWrapperBatchConfirm'), (result) => {
                    if (result) {
                        runProcess(null);
                    }
                });
            }
        }
        workdays.ChangePlanificationWrapperBatch = ChangePlanificationWrapperBatch;
        /**
         * Recalcula las métricas de las jornadas sucias (DirtyFlag=1) en la vista diaria.
         * Si hay selección, ejecuta para los registros seleccionados.
         * Si no, pide confirmación y ejecuta para todos los visibles (ACM).
         * Usa flexygo.Process.run() con callback para refrescar el listado tras completar el SP.
         * Call: sebastian.workdays.EmployeesAssistenceRecalcMetricsRecalcDirty(element)
         * @param element - Elemento que disparó la acción
         */
        function EmployeesAssistenceRecalcMetricsRecalcDirty(element) {
            const objectName = 'emp_vHR_Employee_Daydate';
            const checkedIds = flexygo.selection.getArray(objectName);
            const parsedDefaults = sebastian.utils.parseDefaults(element);
            const date = parsedDefaults["DayDate"];
            flexygo.selection.clear(objectName);
            const moduleElement = $(element).closest('flx-module')[0];
            const runProcess = (idDocsCollection) => {
                sebastian.utils.addLock(5000);
                const process = new flexygo.Process('pEmployees_Assistence_RecalcMetrics_RecalcDirty');
                const params = [
                    { "Key": 'IdDocsCollection', "Value": idDocsCollection !== null && idDocsCollection !== void 0 ? idDocsCollection : '' },
                    { "Key": 'EmployeesIds', "Value": '' },
                    { "Key": 'DateFrom', "Value": date },
                    { "Key": 'DateTo', "Value": date },
                    { "Key": 'ValidateBy', "Value": flexygo.context.currentReference }
                ];
                process.run(params, (ret) => {
                    const listElement = $(moduleElement).find('flx-list')[0];
                    if (listElement)
                        listElement.refresh();
                    sebastian.utils.removeLock();
                    flexygo.msg.success(flexygo.localization.translate('workdays.recalcMetricsDirtySuccess'));
                }, 'current', true, $(element));
            };
            if (checkedIds && checkedIds.length > 0) {
                runProcess(checkedIds.join(','));
            }
            else {
                flexygo.msg.confirm(flexygo.localization.translate('workdays.recalcMetricsDirtyBatchConfirm'), (result) => {
                    if (result) {
                        runProcess(null);
                    }
                });
            }
        }
        workdays.EmployeesAssistenceRecalcMetricsRecalcDirty = EmployeesAssistenceRecalcMetricsRecalcDirty;
        /**
         * Recalcula el historial completo (métricas + incidencias) en la vista diaria.
         * Si hay selección, ejecuta para los registros seleccionados.
         * Si no, pide confirmación y ejecuta para todos los visibles (ACM).
         * Llama al proceso DLL Recalculate_metrics_and_incidents (HistoricalRecalc.ExecuteBatchRecalcByDay).
         * Call: sebastian.workdays.AdminRecalcHistoryRange(element)
         * @param element - Elemento que disparó la acción
         */
        function AdminRecalcHistoryRange(element) {
            const objectName = 'emp_vHR_Employee_Daydate';
            const checkedIds = flexygo.selection.getArray(objectName);
            const parsedDefaults = sebastian.utils.parseDefaults(element);
            const startDate = parsedDefaults["StartDate"];
            const endDate = parsedDefaults["EndDate"];
            flexygo.selection.clear(objectName);
            const runProcess = (employeesIds) => {
                const defaults = employeesIds
                    ? `{'EmployeesIds':'${employeesIds}','StartDate':'${startDate}','EndDate':'${endDate}'}`
                    : `{'EmployeesIds':'','StartDate':'${startDate}','EndDate':'${endDate}'}`;
                flexygo.nav.execProcess('Recalculate_metrics_and_incidents', null, null, defaults, null, 'sliderightx30p', false, $(element));
            };
            if (checkedIds && checkedIds.length > 0) {
                runProcess(checkedIds.join(','));
            }
            else {
                flexygo.msg.confirm(flexygo.localization.translate('workdays.adminRecalcHistoryRangeConfirm'), (result) => {
                    if (result) {
                        runProcess(null);
                    }
                });
            }
        }
        workdays.AdminRecalcHistoryRange = AdminRecalcHistoryRange;
        /**
         * Ejecuta el proceso de cambio de festivo trabajado en batch para la vista diaria.
         * Si hay selección, abre el proceso directamente.
         * Si no, pide confirmación antes de ejecutar para todos los empleados visibles.
         * Call: sebastian.workdays.changeFestiveWorkedBatch(element)
         * @param element - Elemento que disparó la acción
         */
        function changeFestiveWorkedBatch(element) {
            const objectName = 'emp_vHR_Employee_Daydate';
            const checkedIds = flexygo.selection.getArray(objectName);
            const parsedDefaults = sebastian.utils.parseDefaults(element);
            const date = parsedDefaults["DayDate"];
            flexygo.selection.clear(objectName);
            const runProcess = (idDocsCollection) => {
                const defaults = idDocsCollection
                    ? `{'IdDocsCollection':'${idDocsCollection}','DayDate':'${date}'}`
                    : `{'DayDate':'${date}'}`;
                flexygo.nav.execProcess('pEmp_changeFestiveWorked_batch', null, null, defaults, null, 'sliderightx30p', false, $(element));
            };
            if (checkedIds && checkedIds.length > 0) {
                runProcess(checkedIds.join(','));
            }
            else {
                flexygo.msg.confirm(flexygo.localization.translate('workdays.changeFestiveWorkedAllEmployeesConfirm'), (result) => {
                    if (result) {
                        runProcess(null);
                    }
                });
            }
        }
        workdays.changeFestiveWorkedBatch = changeFestiveWorkedBatch;
        /**
         * Valida o desvalida un periodo de jornada individual por IdDoc.
         * Abre el proceso de cierre/apertura de periodo como popup.
         * Call: sebastian.workdays.togglePeriodValidation(element, idDoc, true)  // validar
         * Call: sebastian.workdays.togglePeriodValidation(element, idDoc, false) // desvalidar
         * @param element - Elemento que disparó la acción
         * @param idDoc - IdDoc del periodo de jornada
         * @param validate - true para validar, false para desvalidar
         */
        function togglePeriodValidation(element, idDoc, validate) {
            const processName = validate
                ? 'HR_pEmployees_PeriodValidation_Close_ByEmployee'
                : 'HR_pEmployees_PeriodValidation_Close_Undo_ByEmployee';
            const process = new flexygo.Process(processName);
            const params = [
                { "Key": 'UserId', "Value": flexygo.context.currentReference }
            ];
            flexygo.nav.execProcess(processName, 'vHR_Employee_Daydates', `vHR_Employee_Daydate.IdDoc in (${idDoc})`, null, params, 'popup640x480', false, $(this));
            //process.run(params, (ret) => {
            //    const moduleElement = $(element).closest('flx-module')[0] as flexygo.ui.wc.FlxModuleElement;
            //    if (moduleElement) {
            //        const listElement = $(moduleElement).find('flx-list')[0] as flexygo.ui.wc.FlxListElement;
            //        if (listElement) {
            //            listElement.refresh();
            //        }
            //    }
            //}, 'current', true, $(element));
        }
        workdays.togglePeriodValidation = togglePeriodValidation;
        // ╔══════════════════════════════════════════════════════════════════════════╗
        // ║              SECCIÓN 2: WORKDAY AGRUPADAS                               ║
        // ║  Funciones para la vista agrupada de jornadas. Operan sobre períodos    ║
        // ║  (semanal/mensual) y múltiples empleados simultáneamente. Incluyen     ║
        // ║  selección agrupada por empleado, validación/consolidación de saldo     ║
        // ║  en batch, recálculo de métricas agrupadas, cambio de planificación    ║
        // ║  por periodo, selector de fechas y navegación mensual/semanal.          ║
        // ╚══════════════════════════════════════════════════════════════════════════╝
        // --------------------------------------------------------------------------
        // Selección de filas en vista agrupada por empleados (bag de Flexygo)
        // --------------------------------------------------------------------------
        /**
         * Alterna la selección en el bag para un registro de la vista agrupada por empleados.
         * Usa toggleRowCheckCore con atributo iddoc y actualiza el contador.
         * Call: sebastian.workdays.toggleRowCheckEmployees(IdDoc, element)
         * @param IdDoc - ID del documento del registro
         * @param element - Elemento icono a actualizar
         */
        function toggleRowCheckEmployees(IdDoc, element) {
            toggleRowCheckCore(IdDoc, element, false, true);
        }
        workdays.toggleRowCheckEmployees = toggleRowCheckEmployees;
        /**
         * Alterna la selección en el bag para todos los registros de la vista agrupada por empleados.
         * Usa los datos de listElement.data y actualiza el contador.
         * Call: sebastian.workdays.toggleAllRowCheckEmployees(element)
         * @param element - Elemento cabecera que disparó la acción
         */
        function toggleAllRowCheckEmployees(element) {
            const objectName = 'emp_vHR_Employee_Daydate';
            const moduleElement = $(element).closest('flx-module');
            const listElement = getListElement(moduleElement);
            toggleAllRowCheckCore(element, objectName, () => {
                return listElement.data.map((item) => item.IdDoc).filter((id) => id != null);
            }, 'iddoc', (moduleElement, selectionLength) => {
                moduleElement.find('.counter-btn').html(selectionLength.toString());
            });
        }
        workdays.toggleAllRowCheckEmployees = toggleAllRowCheckEmployees;
        /**
         * Muestra el número de registros seleccionados en el bag dentro del botón contador.
         * Call: sebastian.workdays.showSelectedRowsEmployees(element)
         * @param element - Elemento donde se encuentra el contador
         */
        function showSelectedRowsEmployees(element) {
            const objectName = 'emp_vHR_Employee_Daydate';
            const checkedIds = flexygo.selection.getArray(objectName);
            $(element).find('.counter-btn span').html(checkedIds.length.toString());
        }
        workdays.showSelectedRowsEmployees = showSelectedRowsEmployees;
        // --------------------------------------------------------------------------
        // Selección de filas en vista agrupada por periodo (atributo checked en DOM)
        // --------------------------------------------------------------------------
        /**
         * Alterna el estado de selección de una fila de jornada agrupada.
         * Usa atributos DOM (checked) en lugar del bag de Flexygo.
         * Actualiza los module defaults con las filas seleccionadas.
         * Call: sebastian.workdays.toggleRowCheckGroupedView(event)
         * @param event - Evento click del div que contiene el icono
         */
        function toggleRowCheckGroupedView(event) {
            // Prevenir propagación del evento
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            // Obtener el div clickado
            const clickedElement = event.currentTarget;
            // Buscar el icono dentro del div
            const icon = clickedElement.querySelector('i');
            if (!icon)
                return;
            // Buscar la fila padre
            const row = clickedElement.closest('.emp-row-list');
            if (!row)
                return;
            // Alternar atributo checked
            const isChecked = row.hasAttribute('checked');
            if (isChecked) {
                // Quitar checked y cambiar icono a no seleccionado
                row.removeAttribute('checked');
                icon.className = 'flx-icon icon-non-check-2';
            }
            else {
                // Añadir checked y cambiar icono a seleccionado
                row.setAttribute('checked', '');
                icon.className = 'flx-icon icon-accepted-2';
            }
            // Actualizar module defaults con las filas seleccionadas
            updateCheckedWorkDaysInModuleDefaults(row);
            // Actualizar botón contador con el número de registros seleccionados
            const moduleElement = $(row).closest('flx-module')[0];
            if (moduleElement && moduleElement.objectdefaults && moduleElement.objectdefaults.checkedWorkDaysGrouped) {
                const counterBtn = $(moduleElement).find('.counter-btn');
                if (counterBtn.length) {
                    counterBtn.text(moduleElement.objectdefaults.checkedWorkDaysGrouped.length.toString());
                }
            }
        }
        workdays.toggleRowCheckGroupedView = toggleRowCheckGroupedView;
        /**
         * Alterna la selección de todos los empleados en la vista agrupada por periodo.
         * Marca/desmarca todas las filas y actualiza los module defaults con todos los empleados.
         * Cuando selecciona todo, obtiene los datos mediante getView para incluir empleados paginados.
         * Call: sebastian.workdays.toggleAllEmployeesGroupedView(event)
         * @param event - Evento click del icono de la cabecera
         */
        function toggleAllEmployeesGroupedView(event) {
            // Prevenir propagación del evento
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            // Obtener el elemento clickado
            const clickedElement = event.currentTarget;
            // Buscar el icono dentro del elemento
            const headerIcon = clickedElement.querySelector('i');
            if (!headerIcon)
                return;
            // Buscar el header con startdate y enddate
            const header = clickedElement.closest('.emp-list-header');
            if (!header)
                return;
            // Obtener fechas de los atributos del header
            const startDate = header.getAttribute('startdate');
            const endDate = header.getAttribute('enddate');
            if (!startDate || !endDate) {
                flexygo.msg.warning(flexygo.localization.translate('workdays.noHeaderDates'));
                return;
            }
            // Buscar el módulo y el listado
            const moduleElement = $(header).closest('flx-module')[0];
            const listElement = $(header).closest('flx-list')[0];
            if (!moduleElement || !listElement || !listElement.data) {
                flexygo.msg.warning(flexygo.localization.translate('workdays.noModuleOrList'));
                return;
            }
            // Alternar atributo allchecked del header
            const isAllChecked = header.hasAttribute('allchecked');
            if (isAllChecked) {
                // Deseleccionar todo
                header.removeAttribute('allchecked');
                // Cambiar icono del header a no seleccionado
                headerIcon.className = 'flx-icon icon-non-check-2';
                // Quitar checked de todas las filas y cambiar iconos
                const allRows = $(moduleElement).find('.emp-row-list');
                allRows.each((index, row) => {
                    $(row).removeAttr('checked');
                    const rowIcon = $(row).find('.flx-icon').first();
                    if (rowIcon.length) {
                        rowIcon.removeClass('icon-accepted-2').addClass('icon-non-check-2');
                    }
                });
                // Limpiar module defaults
                if (moduleElement.objectdefaults) {
                    moduleElement.objectdefaults.checkedWorkDaysGrouped = [];
                }
            }
            else {
                // Seleccionar todo
                header.setAttribute('allchecked', '');
                // Cambiar icono del header a seleccionado
                headerIcon.className = 'flx-icon icon-accepted-2';
                // Añadir checked a todas las filas y cambiar iconos
                const allRows = $(moduleElement).find('.emp-row-list');
                allRows.each((index, row) => {
                    $(row).attr('checked', '');
                    const rowIcon = $(row).find('.flx-icon').first();
                    if (rowIcon.length) {
                        rowIcon.removeClass('icon-non-check-2').addClass('icon-accepted-2');
                    }
                });
                // Obtener todos los empleados de la vista (incluye paginados)
                const object = new flexygo.obj.Entity('emp_vHR_Employee_Daydate');
                const data = object.getView('HR_vAllDayDateDashboard', 0, 5000, listElement.additionalWhere, null, null, false, `[{ "key": "StartDate", "value": "${startDate}" }, { "key": "EndDate", "value": "${endDate}" }]`);
                // Construir array con todos los empleados y sus fechas
                const checkedWorkDaysGrouped = data.map((employee) => ({
                    EmployeeId: employee.EmployeeId.toString(),
                    StartDate: startDate,
                    EndDate: endDate
                }));
                // Actualizar module defaults
                if (moduleElement.objectdefaults == null || moduleElement.objectdefaults == undefined) {
                    moduleElement.objectdefaults = { checkedWorkDaysGrouped: checkedWorkDaysGrouped };
                }
                else {
                    moduleElement.objectdefaults.checkedWorkDaysGrouped = checkedWorkDaysGrouped;
                }
                // Actualizar botón contador
                const counterBtn = $(moduleElement).find('.counter-btn');
                if (counterBtn.length) {
                    counterBtn.text(checkedWorkDaysGrouped.length.toString());
                }
            }
            // Actualizar contador al deseleccionar todo (0 seleccionados)
            if (isAllChecked) {
                const counterBtn = $(moduleElement).find('.counter-btn');
                if (counterBtn.length) {
                    counterBtn.text('0');
                }
            }
        }
        workdays.toggleAllEmployeesGroupedView = toggleAllEmployeesGroupedView;
        /**
         * Actualiza los module defaults con la lista de filas de jornadas seleccionadas (checked).
         * Guarda EmployeeId, StartDate y EndDate de cada fila marcada.
         * Función privada llamada por toggleRowCheckGroupedView.
         * @param changedRow - La fila que acaba de ser alternada
         */
        function updateCheckedWorkDaysInModuleDefaults(changedRow) {
            // Buscar el módulo
            const moduleElement = $(changedRow).closest('flx-module')[0];
            if (!moduleElement)
                return;
            // Obtener todas las filas con checked
            const checkedRows = $(moduleElement).find('.emp-row-list[checked]');
            // Construir array con datos de las filas seleccionadas
            const checkedWorkDaysGrouped = [];
            checkedRows.each((index, row) => {
                const employeeId = $(row).attr('employeeid');
                const startDate = $(row).attr('startdate');
                const endDate = $(row).attr('enddate');
                if (employeeId && startDate && endDate) {
                    checkedWorkDaysGrouped.push({
                        EmployeeId: employeeId,
                        StartDate: startDate,
                        EndDate: endDate
                    });
                }
            });
            // Actualizar module defaults
            if (moduleElement.objectdefaults == null || moduleElement.objectdefaults == undefined) {
                moduleElement.objectdefaults = { checkedWorkDaysGrouped: checkedWorkDaysGrouped };
            }
            else {
                moduleElement.objectdefaults.checkedWorkDaysGrouped = checkedWorkDaysGrouped;
            }
        }
        /**
         * Restaura el estado de selección de filas al cargar el módulo.
         * Compara las fechas guardadas en module defaults con las fechas actuales de la vista.
         * Si coinciden, marca las filas correspondientes como checked.
         * Si no coinciden, limpia los datos guardados.
         * Call: sebastian.workdays.restoreCheckedWorkDaysOnLoad(element)
         * @param element - Elemento del módulo que se está cargando
         */
        function restoreCheckedWorkDaysOnLoad(element) {
            // Buscar el módulo
            const moduleElement = $(element).closest('flx-module')[0];
            if (!moduleElement)
                return;
            // Verificar si hay jornadas guardadas
            if (!moduleElement.objectdefaults || !moduleElement.objectdefaults.checkedWorkDaysGrouped ||
                moduleElement.objectdefaults.checkedWorkDaysGrouped.length === 0) {
                return;
            }
            // Obtener fechas del header
            const header = $(moduleElement).find('.emp-list-header').first();
            if (!header.length)
                return;
            const currentStartDate = header.attr('startdate');
            const currentEndDate = header.attr('enddate');
            if (!currentStartDate || !currentEndDate)
                return;
            // Comparar fechas con el primer elemento guardado
            const firstSavedItem = moduleElement.objectdefaults.checkedWorkDaysGrouped[0];
            if (firstSavedItem.StartDate === currentStartDate && firstSavedItem.EndDate === currentEndDate) {
                // Las fechas coinciden - restaurar estado de selección
                const checkedWorkDaysGrouped = moduleElement.objectdefaults.checkedWorkDaysGrouped;
                // Marcar icono del header como seleccionado
                const headerIcon = header.find('i');
                if (headerIcon.length) {
                    headerIcon.removeClass('icon-non-check-2').addClass('icon-accepted-2');
                }
                header.attr('allchecked', '');
                // Marcar las filas de empleados correspondientes
                checkedWorkDaysGrouped.forEach((item) => {
                    const row = $(moduleElement).find(`.emp-row-list[employeeid="${item.EmployeeId}"]`);
                    if (row.length) {
                        row.attr('checked', '');
                        const rowIcon = row.find('.flx-icon').first();
                        if (rowIcon.length) {
                            rowIcon.removeClass('icon-non-check-2').addClass('icon-accepted-2');
                        }
                    }
                });
                // Actualizar botón contador
                const counterBtn = $(moduleElement).find('.counter-btn');
                if (counterBtn.length) {
                    counterBtn.text(checkedWorkDaysGrouped.length.toString());
                }
            }
            else {
                // Las fechas no coinciden - limpiar datos guardados
                moduleElement.objectdefaults.checkedWorkDaysGrouped = [];
                // Actualizar contador a 0
                const counterBtn = $(moduleElement).find('.counter-btn');
                if (counterBtn.length) {
                    counterBtn.text('0');
                }
            }
        }
        workdays.restoreCheckedWorkDaysOnLoad = restoreCheckedWorkDaysOnLoad;
        // --------------------------------------------------------------------------
        // Procesos batch para vista agrupada (validación, saldo, recálculo)
        // --------------------------------------------------------------------------
        /**
         * Lógica core para ejecutar un proceso batch de jornadas agrupadas.
         * Lee los registros seleccionados desde checkedWorkDaysGrouped en module defaults,
         * los serializa a JSON y ejecuta el proceso Flexygo indicado.
         * Tras completar, refresca el listado y limpia la selección.
         * Función privada usada por validateCheckedWorkDays, unvalidateCheckedWorkDays,
         * balanceCheckedWorkDays y undoBalanceCheckedWorkDays.
         * @param element - Elemento que disparó la acción
         * @param currentReference - ID de referencia actual para el proceso
         * @param processName - Nombre del proceso Flexygo a ejecutar
         * @param emptyWarningMsg - Mensaje de aviso cuando no hay jornadas seleccionadas
         * @param successMsg - Mensaje de éxito tras completar el proceso
         */
        function executeCheckedWorkDaysProcess(element, currentReference, processName, emptyWarningMsg, successMsg) {
            // Buscar el módulo
            const moduleElement = $(element).closest('flx-module')[0];
            if (!moduleElement || !moduleElement.objectdefaults || !moduleElement.objectdefaults.checkedWorkDaysGrouped) {
                flexygo.msg.warning(emptyWarningMsg);
                return;
            }
            const checkedWorkDaysGrouped = moduleElement.objectdefaults.checkedWorkDaysGrouped;
            if (checkedWorkDaysGrouped.length === 0) {
                flexygo.msg.warning(emptyWarningMsg);
                return;
            }
            // Convertir a JSON
            const workDaysJson = JSON.stringify(checkedWorkDaysGrouped);
            // Mostrar loading
            sebastian.utils.addLock(5000);
            // Crear y ejecutar proceso
            const process = new flexygo.Process(processName);
            const params = [
                { "Key": 'CurrentReference', "Value": currentReference },
                { "Key": 'WorkDaysJson', "Value": workDaysJson }
            ];
            process.run(params, (ret) => {
                // Refrescar el listado
                const listElement = $(moduleElement).find('flx-list')[0];
                if (listElement) {
                    listElement.refresh();
                }
                // Refrescar listado de estado de validación agrupada
                const validationStatusList = $('flx-list[modulename="HR_Workday_Grouped_ValidationStatus"]')[0];
                if (validationStatusList) {
                    validationStatusList.refresh();
                }
                // Limpiar selección
                moduleElement.objectdefaults.checkedWorkDaysGrouped = [];
                sebastian.utils.removeLock();
                flexygo.msg.success(successMsg);
            }, 'current', true, $(element));
        }
        /**
         * Valida todas las jornadas seleccionadas en la vista agrupada.
         * Llama al SP HR_pWorkDays_Validate_Batch_FromJson.
         * Call: sebastian.workdays.validateCheckedWorkDays(element, currentReference)
         * @param element - Elemento que disparó la validación
         * @param currentReference - ID de referencia actual
         */
        function validateCheckedWorkDays(element, currentReference) {
            executeCheckedWorkDaysProcess(element, currentReference, 'HR_pWorkDays_Validate_Batch_FromJson', flexygo.localization.translate('workdays.noWorkDaysSelected'), flexygo.localization.translate('workdays.workDaysValidated'));
        }
        workdays.validateCheckedWorkDays = validateCheckedWorkDays;
        /**
         * Deshace la validación de todas las jornadas seleccionadas en la vista agrupada.
         * Llama al SP HR_pWorkDays_Validate_Undo_Batch_FromJson.
         * Call: sebastian.workdays.unvalidateCheckedWorkDays(element, currentReference)
         * @param element - Elemento que disparó la acción
         * @param currentReference - ID de referencia actual
         */
        function unvalidateCheckedWorkDays(element, currentReference) {
            executeCheckedWorkDaysProcess(element, currentReference, 'HR_pWorkDays_Validate_Undo_Batch_FromJson', flexygo.localization.translate('workdays.noWorkDaysSelectedUndo'), flexygo.localization.translate('workdays.workDaysUnvalidated'));
        }
        workdays.unvalidateCheckedWorkDays = unvalidateCheckedWorkDays;
        /**
         * Consolida el saldo de todas las jornadas seleccionadas en la vista agrupada.
         * Llama al SP HR_pWorkDays_Balance_Batch_FromJson.
         * Call: sebastian.workdays.balanceCheckedWorkDays(element, currentReference)
         * @param element - Elemento que disparó la acción
         * @param currentReference - ID de referencia actual
         */
        function balanceCheckedWorkDays(element, currentReference) {
            executeCheckedWorkDaysProcess(element, currentReference, 'HR_pWorkDays_Balance_Batch_FromJson', flexygo.localization.translate('workdays.noWorkDaysSelectedBalance'), flexygo.localization.translate('workdays.workDaysBalanced'));
        }
        workdays.balanceCheckedWorkDays = balanceCheckedWorkDays;
        /**
         * Deshace la consolidación de saldo de todas las jornadas seleccionadas.
         * Llama al SP HR_pEmployeeDate_Balance_Undo_FromJson.
         * Call: sebastian.workdays.undoBalanceCheckedWorkDays(element, currentReference)
         * @param element - Elemento que disparó la acción
         * @param currentReference - ID de referencia actual
         */
        function undoBalanceCheckedWorkDays(element, currentReference) {
            executeCheckedWorkDaysProcess(element, currentReference, 'HR_pEmployeeDate_Balance_Undo_FromJson', flexygo.localization.translate('workdays.noWorkDaysSelectedBalanceUndo'), flexygo.localization.translate('workdays.workDaysBalanceUndone'));
        }
        workdays.undoBalanceCheckedWorkDays = undoBalanceCheckedWorkDays;
        // --------------------------------------------------------------------------
        // Procesos batch agrupados (refresh, planificación, recálculo)
        // --------------------------------------------------------------------------
        /**
         * Refresca los datos de jornada en batch para el periodo agrupado.
         * Si hay empleados seleccionados (via checkedWorkDaysGrouped), ejecuta para esos empleados.
         * Si no, pide confirmación antes de ejecutar para todos los visibles (ACM).
         * Call: sebastian.workdays.refreshAllDayDateBatch(element)
         * @param element - Elemento que disparó la acción
         */
        function refreshAllDayDateBatch(element) {
            var _c;
            const moduleElement = $(element).closest('flx-module')[0];
            const checkedWorkDaysGrouped = (_c = moduleElement === null || moduleElement === void 0 ? void 0 : moduleElement.objectdefaults) === null || _c === void 0 ? void 0 : _c.checkedWorkDaysGrouped;
            const parsedDefaults = sebastian.utils.parseDefaults(element);
            const startDate = parsedDefaults["StartDate"];
            const endDate = parsedDefaults["EndDate"];
            const runProcess = (employeesIds) => {
                const defaults = employeesIds
                    ? `{'EmployeesIds':'${employeesIds}','StartDate':'${startDate}','EndDate':'${endDate}'}`
                    : `{'EmployeesIds':'','StartDate':'${startDate}','EndDate':'${endDate}'}`;
                flexygo.nav.execProcess('pAllDayDate_Refresh_Batch', null, null, defaults, null, 'sliderightx30p', false, $(element));
            };
            if (checkedWorkDaysGrouped && checkedWorkDaysGrouped.length > 0) {
                const employeesIds = [...new Set(checkedWorkDaysGrouped.map((x) => x.EmployeeId))].join(',');
                runProcess(employeesIds);
            }
            else {
                flexygo.msg.confirm(flexygo.localization.translate('workdays.refreshAllDayDateBatchConfirm'), (result) => {
                    if (result) {
                        runProcess(null);
                    }
                });
            }
        }
        workdays.refreshAllDayDateBatch = refreshAllDayDateBatch;
        /**
         * Lanza el proceso wrapper de cambio de planificación en batch para la vista agrupada.
         * Si hay empleados seleccionados, ejecuta para esos empleados.
         * Si no, pide confirmación antes de ejecutar para todos los visibles (ACM).
         * Call: sebastian.workdays.ChangePlanificationWrapperBatchGrouped(element)
         * @param element - Elemento que disparó la acción
         */
        function ChangePlanificationWrapperBatchGrouped(element) {
            var _c;
            const moduleElement = $(element).closest('flx-module')[0];
            const checkedWorkDaysGrouped = (_c = moduleElement === null || moduleElement === void 0 ? void 0 : moduleElement.objectdefaults) === null || _c === void 0 ? void 0 : _c.checkedWorkDaysGrouped;
            const parsedDefaults = sebastian.utils.parseDefaults(element);
            const startDate = parsedDefaults["StartDate"];
            const endDate = parsedDefaults["EndDate"];
            const runProcess = (employeesIds) => {
                const defaults = employeesIds
                    ? `{'IdDocsCollection':'','EmployeesIds':'${employeesIds}','StartDate':'${startDate}','EndDate':'${endDate}'}`
                    : `{'IdDocsCollection':'','EmployeesIds':'','StartDate':'${startDate}','EndDate':'${endDate}'}`;
                flexygo.nav.execProcess('pEmployeePeriod_ChangePlanification_Batch_Wrapper', null, null, defaults, null, 'sliderightx30p', false, $(element));
            };
            if (checkedWorkDaysGrouped && checkedWorkDaysGrouped.length > 0) {
                const employeesIds = [...new Set(checkedWorkDaysGrouped.map((x) => x.EmployeeId))].join(',');
                runProcess(employeesIds);
            }
            else {
                flexygo.msg.alert(flexygo.localization.translate('workdays.noEmployeesSelectedCannotExecute'));
            }
        }
        workdays.ChangePlanificationWrapperBatchGrouped = ChangePlanificationWrapperBatchGrouped;
        /**
         * Lanza el proceso de cambio de planificación para todas las jornadas en batch (agrupado).
         * Si hay empleados seleccionados, ejecuta para esos empleados.
         * Si no, pide confirmación antes de ejecutar para todos los visibles (ACM).
         * Call: sebastian.workdays.changePlanificationAllDayDateBatch(element)
         * @param element - Elemento que disparó la acción
         */
        function changePlanificationAllDayDateBatch(element) {
            var _c;
            const moduleElement = $(element).closest('flx-module')[0];
            const checkedWorkDaysGrouped = (_c = moduleElement === null || moduleElement === void 0 ? void 0 : moduleElement.objectdefaults) === null || _c === void 0 ? void 0 : _c.checkedWorkDaysGrouped;
            const parsedDefaults = sebastian.utils.parseDefaults(element);
            const startDate = parsedDefaults["StartDate"];
            const endDate = parsedDefaults["EndDate"];
            const runProcess = (employeesIds) => {
                const defaults = employeesIds
                    ? `{'EmployeesIds':'${employeesIds}','StartDate':'${startDate}','EndDate':'${endDate}'}`
                    : `{'EmployeesIds':'','StartDate':'${startDate}','EndDate':'${endDate}'}`;
                flexygo.nav.execProcess('pAllDayDate_ChangePlanification_Batch', null, null, defaults, null, null, false, $(element));
            };
            if (checkedWorkDaysGrouped && checkedWorkDaysGrouped.length > 0) {
                const employeesIds = [...new Set(checkedWorkDaysGrouped.map((x) => x.EmployeeId))].join(',');
                runProcess(employeesIds);
            }
            else {
                flexygo.msg.confirm(flexygo.localization.translate('workdays.changePlanificationAllDayDateBatchConfirm'), (result) => {
                    if (result) {
                        runProcess(null);
                    }
                });
            }
        }
        workdays.changePlanificationAllDayDateBatch = changePlanificationAllDayDateBatch;
        /**
         * Recalcula las métricas de jornadas sucias (DirtyFlag=1) en la vista agrupada.
         * Si hay empleados seleccionados (via checkedWorkDaysGrouped), ejecuta para esos empleados.
         * Si no, pide confirmación antes de ejecutar para todos los visibles (ACM).
         * Usa flexygo.Process.run() con callback para refrescar tras completar.
         * Call: sebastian.workdays.recalcMetricsDirtyGrouped(element)
         * @param element - Elemento que disparó la acción
         */
        function recalcMetricsDirtyGrouped(element) {
            var _c;
            const moduleElement = $(element).closest('flx-module')[0];
            const checkedWorkDaysGrouped = (_c = moduleElement === null || moduleElement === void 0 ? void 0 : moduleElement.objectdefaults) === null || _c === void 0 ? void 0 : _c.checkedWorkDaysGrouped;
            const parsedDefaults = sebastian.utils.parseDefaults(element);
            const startDate = parsedDefaults["StartDate"];
            const endDate = parsedDefaults["EndDate"];
            const runProcess = (employeesIds) => {
                sebastian.utils.addLock(5000);
                const process = new flexygo.Process('pEmployees_Assistence_RecalcMetrics_RecalcDirty');
                const params = [
                    { "Key": 'IdDocsCollection', "Value": '' },
                    { "Key": 'EmployeesIds', "Value": employeesIds !== null && employeesIds !== void 0 ? employeesIds : '' },
                    { "Key": 'DateFrom', "Value": startDate },
                    { "Key": 'DateTo', "Value": endDate },
                    { "Key": 'ValidateBy', "Value": flexygo.context.currentReference }
                ];
                process.run(params, (ret) => {
                    const listElement = $(moduleElement).find('flx-list')[0];
                    if (listElement)
                        listElement.refresh();
                    const validationStatusList = $('flx-list[modulename="HR_Workday_Grouped_ValidationStatus"]')[0];
                    if (validationStatusList)
                        validationStatusList.refresh();
                    moduleElement.objectdefaults.checkedWorkDaysGrouped = [];
                    sebastian.utils.removeLock();
                    flexygo.msg.success(flexygo.localization.translate('workdays.recalcMetricsDirtySuccess'));
                }, 'current', true, $(element));
            };
            if (checkedWorkDaysGrouped && checkedWorkDaysGrouped.length > 0) {
                const employeesIds = [...new Set(checkedWorkDaysGrouped.map((x) => x.EmployeeId))].join(',');
                runProcess(employeesIds);
            }
            else {
                flexygo.msg.confirm(flexygo.localization.translate('workdays.recalcMetricsDirtyGroupedConfirm'), (result) => {
                    if (result) {
                        runProcess(null);
                    }
                });
            }
        }
        workdays.recalcMetricsDirtyGrouped = recalcMetricsDirtyGrouped;
        /**
         * Recalcula las métricas de las jornadas sucias (DirtyFlag=1) en la vista agrupada.
         * Si hay empleados seleccionados (via checkedWorkDaysGrouped), ejecuta para esos empleados.
         * Si no, pide confirmación antes de ejecutar para todos los visibles (ACM).
         * Usa flexygo.Process.run() con callback para refrescar el listado tras completar el SP.
         * Call: sebastian.workdays.EmployeesAssistenceRecalcMetricsRecalcDirtyGrouped(element)
         * @param element - Elemento que disparó la acción
         */
        function EmployeesAssistenceRecalcMetricsRecalcDirtyGrouped(element) {
            var _c;
            const moduleElement = $(element).closest('flx-module')[0];
            const checkedWorkDaysGrouped = (_c = moduleElement === null || moduleElement === void 0 ? void 0 : moduleElement.objectdefaults) === null || _c === void 0 ? void 0 : _c.checkedWorkDaysGrouped;
            const parsedDefaults = sebastian.utils.parseDefaults(element);
            const startDate = parsedDefaults["StartDate"];
            const endDate = parsedDefaults["EndDate"];
            const runProcess = (employeesIds) => {
                sebastian.utils.addLock(5000);
                const process = new flexygo.Process('pEmployees_Assistence_RecalcMetrics_RecalcDirty');
                const params = [
                    { "Key": 'IdDocsCollection', "Value": '' },
                    { "Key": 'EmployeesIds', "Value": employeesIds !== null && employeesIds !== void 0 ? employeesIds : '' },
                    { "Key": 'DateFrom', "Value": startDate },
                    { "Key": 'DateTo', "Value": endDate },
                    { "Key": 'ValidateBy', "Value": flexygo.context.currentReference }
                ];
                process.run(params, (ret) => {
                    const listElement = $(moduleElement).find('flx-list')[0];
                    if (listElement)
                        listElement.refresh();
                    const validationStatusList = $('flx-list[modulename="HR_Workday_Grouped_ValidationStatus"]')[0];
                    if (validationStatusList)
                        validationStatusList.refresh();
                    moduleElement.objectdefaults.checkedWorkDaysGrouped = [];
                    sebastian.utils.removeLock();
                    flexygo.msg.success(flexygo.localization.translate('workdays.recalcMetricsDirtySuccess'));
                }, 'current', true, $(element));
            };
            if (checkedWorkDaysGrouped && checkedWorkDaysGrouped.length > 0) {
                const employeesIds = [...new Set(checkedWorkDaysGrouped.map((x) => x.EmployeeId))].join(',');
                runProcess(employeesIds);
            }
            else {
                flexygo.msg.confirm(flexygo.localization.translate('workdays.recalcMetricsDirtyGroupedConfirm'), (result) => {
                    if (result) {
                        runProcess(null);
                    }
                });
            }
        }
        workdays.EmployeesAssistenceRecalcMetricsRecalcDirtyGrouped = EmployeesAssistenceRecalcMetricsRecalcDirtyGrouped;
        /**
         * Recalcula el historial completo (métricas + incidencias) en la vista agrupada.
         * Si hay empleados seleccionados (via checkedWorkDaysGrouped), ejecuta para esos empleados.
         * Si no, pide confirmación antes de ejecutar para todos los visibles (ACM).
         * Llama al proceso DLL Recalculate_metrics_and_incidents (HistoricalRecalc.ExecuteBatchRecalcByDay).
         * Call: sebastian.workdays.adminRecalcHistoryRangeGrouped(element)
         * @param element - Elemento que disparó la acción
         */
        function adminRecalcHistoryRangeGrouped(element) {
            var _c;
            const moduleElement = $(element).closest('flx-module')[0];
            const checkedWorkDaysGrouped = (_c = moduleElement === null || moduleElement === void 0 ? void 0 : moduleElement.objectdefaults) === null || _c === void 0 ? void 0 : _c.checkedWorkDaysGrouped;
            const parsedDefaults = sebastian.utils.parseDefaults(element);
            const startDate = parsedDefaults["StartDate"];
            const endDate = parsedDefaults["EndDate"];
            const runProcess = (employeesIds) => {
                const defaults = employeesIds
                    ? `{'EmployeesIds':'${employeesIds}','StartDate':'${startDate}','EndDate':'${endDate}'}`
                    : `{'EmployeesIds':'','StartDate':'${startDate}','EndDate':'${endDate}'}`;
                flexygo.nav.execProcess('Recalculate_metrics_and_incidents', null, null, defaults, null, 'sliderightx30p', false, $(element));
            };
            if (checkedWorkDaysGrouped && checkedWorkDaysGrouped.length > 0) {
                const employeesIds = [...new Set(checkedWorkDaysGrouped.map((x) => x.EmployeeId))].join(',');
                runProcess(employeesIds);
            }
            else {
                flexygo.msg.confirm(flexygo.localization.translate('workdays.adminRecalcHistoryRangeConfirm'), (result) => {
                    if (result) {
                        runProcess(null);
                    }
                });
            }
        }
        workdays.adminRecalcHistoryRangeGrouped = adminRecalcHistoryRangeGrouped;
        // --------------------------------------------------------------------------
        // Selector de fechas y navegación para vista agrupada (mensual/semanal)
        // --------------------------------------------------------------------------
        /**
         * Configura el selector de fechas agrupado con modos de vista mensual/semanal.
         * Lee la configuración de defaults y localStorage para determinar el modo y la fecha.
         * Genera el HTML con flechas de navegación, picker de fecha y botones de modo.
         * Prioridad de configuración: defaults > localStorage > valores por defecto.
         * Call: sebastian.workdays.setMarkingsGroupedDateSelector(element)
         * @param element - Elemento donde se renderizará el selector
         */
        function setMarkingsGroupedDateSelector(element) {
            let defaults = sebastian.utils.parseDefaults(element);
            let html;
            let storageKey = 'emp-markings-grouped-view';
            let storedData = localStorage.getItem(storageKey);
            let viewMode;
            let currentDate;
            // Determinar el modo de vista 
            // Prioridad 1: defaults.mode
            // Prioridad 2: localStorage
            // Prioridad 3: 'monthly' por defecto
            if (defaults.mode) {
                viewMode = defaults.mode;
            }
            else if (storedData) {
                let parsed = JSON.parse(storedData);
                viewMode = parsed.mode || 'monthly';
            }
            else {
                viewMode = 'monthly';
            }
            // Determinar la fecha
            // Prioridad 1: defaults.CurrentDate
            // Prioridad 2: localStorage date
            // Prioridad 3: moment() (hoy)
            if (defaults.CurrentDate) {
                currentDate = moment(defaults.CurrentDate);
            }
            else if (storedData) {
                let parsed = JSON.parse(storedData);
                currentDate = parsed.date ? moment(parsed.date) : moment();
            }
            else {
                currentDate = moment();
            }
            // Guardar configuración actualizada en localStorage
            localStorage.setItem(storageKey, JSON.stringify({ mode: viewMode, date: currentDate.format('YYYY-MM-DD') }));
            let prevArrow, nextArrow, title, inputPicker;
            if (viewMode === 'monthly') {
                // Modo mensual
                let prevMonth = moment(currentDate).subtract(1, 'months').format('YYYY-MM-DD');
                let nextMonth = moment(currentDate).add(1, 'months').format('YYYY-MM-DD');
                let monthValue = moment(currentDate).format('YYYY-MM');
                prevArrow = `<i class="flx-icon icon-previous-1 size-s clickable" onclick="sebastian.workdays.manageMarkingMoveToMonthWeek('${prevMonth}', 'monthly')"></i>`;
                nextArrow = `<i class="flx-icon icon-next-1 size-s clickable" onclick="sebastian.workdays.manageMarkingMoveToMonthWeek('${nextMonth}', 'monthly')"></i>`;
                inputPicker = `<input type="month" id="markingsGroupedDatePicker" value="${monthValue}" style="position: absolute; opacity: 0; pointer-events: none;" onchange="sebastian.workdays.onMarkingsGroupedDatePickerChange(this.value, 'monthly')" />`;
                title = `<span style="padding: 0px 10px;" class="bold clickable" onclick="document.getElementById('markingsGroupedDatePicker').showPicker()">${moment(currentDate).format('MMMM YYYY').toUpperCase()}</span>`;
            }
            else {
                // Modo semanal
                let weekStart = moment(currentDate).startOf('isoWeek');
                let weekEnd = moment(currentDate).endOf('isoWeek');
                let weekNumber = moment(currentDate).isoWeek();
                let weekValue = moment(currentDate).format('YYYY-[W]WW');
                let prevWeek = moment(currentDate).subtract(1, 'weeks').format('YYYY-MM-DD');
                let nextWeek = moment(currentDate).add(1, 'weeks').format('YYYY-MM-DD');
                prevArrow = `<i class="flx-icon icon-previous-1 size-s clickable" onclick="sebastian.workdays.manageMarkingMoveToMonthWeek('${prevWeek}', 'weekly')"></i>`;
                nextArrow = `<i class="flx-icon icon-next-1 size-s clickable" onclick="sebastian.workdays.manageMarkingMoveToMonthWeek('${nextWeek}', 'weekly')"></i>`;
                inputPicker = `<input type="week" id="markingsGroupedDatePicker" value="${weekValue}" style="position: absolute; opacity: 0; pointer-events: none;" onchange="sebastian.workdays.onMarkingsGroupedDatePickerChange(this.value, 'weekly')" />`;
                title = `<span style="padding: 0px 10px;" class="bold clickable" onclick="document.getElementById('markingsGroupedDatePicker').showPicker()">SEMANA ${weekNumber}. ${weekStart.format('D')} de ${weekStart.format('MMMM')} a ${weekEnd.format('D')} de ${weekEnd.format('MMMM')} de ${weekEnd.format('YYYY')}</span>`;
            }
            // Botones de cambio de modo (mensual/semanal)
            let monthlyBtnClass = viewMode === 'monthly' ? 'active' : '';
            let weeklyBtnClass = viewMode === 'weekly' ? 'active' : '';
            let modeButtons = `
            <div class="hr-date-selector-mode-buttons">
                <span class="clickable hr-date-selector-btn" >
                    <flx-tooltip mode="popover" container="body" placement="bottom">
                        <flx-schedulerview objectname="" initialDate="${moment(currentDate).format('YYYYMMDD')}" id="mod-emp_GeneralDB_JourneysCalendar" modulename="emp_GeneralDB_JourneysCalendar"></flx-schedulerview>
                    </flx-tooltip>
                    <i class="flx-icon icon-calendar-month-1"></i>
                </span>
                <span class="clickable ${monthlyBtnClass} hr-date-selector-btn" onclick="sebastian.workdays.changeMarkingsGroupedViewMode('monthly', '${currentDate.format('YYYY-MM-DD')}')">${flexygo.localization.translate('workdays.monthly')}</span>
                <span class="clickable ${weeklyBtnClass} hr-date-selector-btn" onclick="sebastian.workdays.changeMarkingsGroupedViewMode('weekly', '${currentDate.format('YYYY-MM-DD')}')">${flexygo.localization.translate('workdays.weekly')}</span>
            </div> 
        `;
            html = `<div class="hr-date-selector">${prevArrow}${title}${nextArrow}${inputPicker}</div>${modeButtons}`;
            $(element).find('flx-html div#markingsGroupedDateSelector').html(html);
        }
        workdays.setMarkingsGroupedDateSelector = setMarkingsGroupedDateSelector;
        /**
         * Gestiona el cambio de fecha desde el input picker del selector agrupado.
         * Parsea el valor según el modo (YYYY-MM para mensual, YYYY-Www para semanal)
         * y navega a la nueva fecha.
         * Call: sebastian.workdays.onMarkingsGroupedDatePickerChange(value, mode)
         * @param value - Valor seleccionado en el picker
         * @param mode - Modo de vista actual ('monthly' o 'weekly')
         */
        function onMarkingsGroupedDatePickerChange(value, mode) {
            let newDate;
            if (mode === 'monthly') {
                // Formato del valor: "YYYY-MM"
                newDate = moment(value, 'YYYY-MM').format('YYYY-MM-DD');
            }
            else {
                // Formato del valor: "YYYY-Www" (ej: "2026-W04")
                newDate = moment(value, 'YYYY-[W]WW').format('YYYY-MM-DD');
            }
            manageMarkingMoveToMonthWeek(newDate, mode);
        }
        workdays.onMarkingsGroupedDatePickerChange = onMarkingsGroupedDatePickerChange;
        /**
         * Navega a un mes o semana específico en la vista agrupada.
         * Guarda la nueva fecha y modo en localStorage, calcula StartDate/EndDate
         * y abre la página con los nuevos defaults.
         * Call: sebastian.workdays.manageMarkingMoveToMonthWeek(newDate, mode)
         * @param newDate - Nueva fecha de destino en formato YYYY-MM-DD
         * @param mode - Modo de vista ('monthly' o 'weekly')
         */
        function manageMarkingMoveToMonthWeek(newDate, mode) {
            // Guardar nueva fecha y modo en localStorage
            let storageKey = 'emp-markings-grouped-view';
            localStorage.setItem(storageKey, JSON.stringify({ mode: mode, date: newDate }));
            // Calcular StartDate y EndDate según el modo
            let dateObj = moment(newDate);
            let startDate, endDate;
            if (mode === 'monthly') {
                startDate = dateObj.startOf('month').format('YYYY-MM-DD');
                endDate = dateObj.endOf('month').format('YYYY-MM-DD');
            }
            else {
                // Modo semanal
                startDate = dateObj.startOf('isoWeek').format('YYYY-MM-DD');
                endDate = dateObj.endOf('isoWeek').format('YYYY-MM-DD');
            }
            // Navegar a la página actual con los nuevos defaults
            let pageName = $('main').attr('pagename');
            flexygo.nav.openPageName(pageName, '', '', `{'ViewDate':'${newDate}', 'StartDate':'${startDate}', 'EndDate':'${endDate}'}`, 'current', false, $(this));
        }
        workdays.manageMarkingMoveToMonthWeek = manageMarkingMoveToMonthWeek;
        /**
         * Cambia el modo de visualización entre mensual y semanal.
         * Guarda el nuevo modo en localStorage, recalcula StartDate/EndDate
         * y recarga la página con la nueva configuración.
         * Call: sebastian.workdays.changeMarkingsGroupedViewMode(newMode, currentDate)
         * @param newMode - Nuevo modo de vista ('monthly' o 'weekly')
         * @param currentDate - Fecha actual que se está mostrando
         */
        function changeMarkingsGroupedViewMode(newMode, currentDate) {
            // Guardar nuevo modo en localStorage
            let storageKey = 'emp-markings-grouped-view';
            localStorage.setItem(storageKey, JSON.stringify({ mode: newMode, date: currentDate }));
            // Calcular StartDate y EndDate usando helper
            const { startDate, endDate } = calculateDateRange(currentDate, newMode);
            // Recargar la página con el nuevo modo 
            let pageName = $('main').attr('pagename');
            flexygo.nav.openPageName(pageName, '', '', `{'ViewDate':'${currentDate}', 'StartDate':'${startDate}', 'EndDate':'${endDate}'}`, 'current', false, $(this));
        }
        workdays.changeMarkingsGroupedViewMode = changeMarkingsGroupedViewMode;
        // ╔══════════════════════════════════════════════════════════════════════════╗
        // ║              SECCIÓN 3: FICHAJES DEL EMPLEADO                           ║
        // ║  Funciones de gestión de fichajes: navegación entre páginas de          ║
        // ║  fichajes, filtrado avanzado de módulos con persistencia en             ║
        // ║  localStorage, gráfico de ubicaciones de fichaje y gestión de           ║
        // ║  zonas horarias para fichajes remotos.                                  ║
        // ╚══════════════════════════════════════════════════════════════════════════╝
        // --------------------------------------------------------------------------
        // Navegación entre páginas de fichajes
        // --------------------------------------------------------------------------
        /**
         * Navega a la página de fichajes diarios para una fecha específica.
         * Limpia los filtros guardados en localStorage antes de navegar.
         * Call: sebastian.workdays.goToDailyMarkingsPage(formatDate, target)
         * @param formatDate - Fecha en formato YYYY-MM-DD
         * @param target - Destino de navegación (ej: 'current', 'sliderightx50p')
         */
        function goToDailyMarkingsPage(formatDate, target = 'current') {
            localStorage.removeItem("HR-MarkingsPage-Filter");
            flexygo.nav.openPageName('HR_MarkingsManagementSimple', '', `DateJourney='${formatDate}'`, `{'DayDate':'${formatDate}','StartDate':'${formatDate}','EndDate':'${formatDate}'}`, target, false, $(this));
        }
        workdays.goToDailyMarkingsPage = goToDailyMarkingsPage;
        /**
         * Navega a un día específico en la página de gestión de fichajes.
         * Preserva el historial de navegación del módulo.
         * Call: sebastian.workdays.manageMarkingMoveToDay(DayDate)
         * @param DayDate - Fecha de destino en formato YYYY-MM-DD
         */
        function manageMarkingMoveToDay(DayDate) {
            let hist = flexygo.history.get($('flx-module[modulename=MOD_HR_Employee_Daydate]'));
            flexygo.nav.openPageName('HR_MarkingsManagementSimple', '', `DateJourney='${DayDate}'`, `{'DayDate':'${DayDate}', 'StartDate':'${DayDate}', 'EndDate':'${DayDate}'}`, 'current', false, $(this), false, hist);
        }
        workdays.manageMarkingMoveToDay = manageMarkingMoveToDay;
        // --------------------------------------------------------------------------
        // Constantes y configuración de módulos filtrables
        // --------------------------------------------------------------------------
        /**
         * Array de selectores de módulos para la página de fichajes diarios.
         * filterAll: true = se filtra con todos los filtros (generales + específicos de fichajes)
         * filterAll: false = solo se filtra con filtros generales
         */
        const DAILY_MARKINGS_MODULES = [
            { selector: '[modulename="MOD_HR_Employee_Daydate"]', filterAll: true },
            //{ selector: '[modulename="hr_PlannedAbsencesDaily"]', filterAll: false },
            //{ selector: '[modulename="HR_WorkingDay_Locations"]', filterAll: false },
            //{ selector: '[modulename="HR_Workday_ValidationStatus"]', filterAll: false },
            //{ selector: '[modulename="hr_ME_UnplannerAbsences"]', filterAll: false }
        ];
        /**
         * Array de selectores de módulos para la página de fichajes agrupados.
         * filterAll: true = se filtra con todos los filtros
         * filterAll: false = solo se filtra con filtros generales
         */
        const GROUPING_MARKINGS_MODULES = [
            { selector: '[modulename="HR_AllDayDateDashboard"]', filterAll: true },
            //{ selector: '[modulename="HR_WorkingDay_Grouped_Locations"]', filterAll: false },
            //{ selector: '[modulename="HR_Workday_Grouped_ValidationStatus"]', filterAll: false },
        ];
        // --------------------------------------------------------------------------
        // Filtrado avanzado de módulos de fichajes
        // --------------------------------------------------------------------------
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
        function filterMarkingsManageModules(elem, pageType = 'Daily') {
            let mainFilter = elem.closest('flx-module').find('#hr-markings-filter-main');
            let allMulticombos = $(mainFilter).find('flx-multicombo');
            let allSwitches = $(mainFilter).find('flx-switch');
            let filterAllModulesValues = []; // Para elementos sin filteronlymarkings
            let filterMarkingsOnlyValues = []; // Para elementos con filteronlymarkings
            let localStorageInfo = {};
            // Recorrer todos los multicombos
            allMulticombos.each((index, element) => {
                let value = element.getValue();
                let property = $(element).attr('FilterProperty');
                let tableAlias = $(element).attr('TableAlias');
                let inputType = $(element).prop('nodeName').toLowerCase();
                let inputName = $(element).attr('name');
                let filterItem = $(element).attr('filteritem');
                let isFilterOnlyMarkings = $(element).attr('filteronlymarkings') !== undefined;
                if (value != null && value != '') {
                    // Guardar en localStorage
                    localStorageInfo[inputName] = {
                        value: value,
                        inputType: inputType
                    };
                    // Construir SQL según el tipo de componente
                    let identifier = tableAlias + '.' + property;
                    let sql;
                    switch (inputType) {
                        case 'flx-multicombo':
                            let values = value.split('|');
                            values = values.map(v => `'${v}'`);
                            sql = identifier + ' in (' + values.join(',') + ')';
                            break;
                        case 'flx-dbcombo':
                        case 'flx-text':
                            sql = identifier + ' = \'' + value + '\'';
                            break;
                    }
                    // Agregar a la lista correspondiente
                    if (isFilterOnlyMarkings) {
                        filterMarkingsOnlyValues.push(sql);
                    }
                    else {
                        filterAllModulesValues.push(sql);
                    }
                    // Mostrar el chip de filtro
                    if (filterItem) {
                        $(`#${filterItem}`).removeClass('hidden');
                    }
                }
                else {
                    // Ocultar el chip de filtro si no hay valor
                    if (filterItem) {
                        $(`#${filterItem}`).addClass('hidden');
                    }
                }
            });
            // Recorrer todos los switches
            allSwitches.each((index, element) => {
                let value = $(element).attr('value');
                let isChecked = $(element).attr('checked') !== undefined;
                let inputType = $(element).prop('nodeName').toLowerCase();
                let inputName = $(element).attr('name') || `switch-${index}`;
                let filterItem = $(element).attr('filteritem');
                let filterSentence = $(element).attr('filtersentence');
                let isFilterOnlyMarkings = $(element).attr('filteronlymarkings') !== undefined;
                if (isChecked && value === 'true' && filterSentence) {
                    // Guardar en localStorage
                    localStorageInfo[inputName] = {
                        value: true,
                        inputType: inputType
                    };
                    // Usar filtersentence directamente como SQL
                    let sql = filterSentence;
                    // Agregar a la lista correspondiente
                    if (isFilterOnlyMarkings) {
                        filterMarkingsOnlyValues.push(sql);
                    }
                    else {
                        filterAllModulesValues.push(sql);
                    }
                    // Mostrar el chip de filtro
                    if (filterItem) {
                        $(`#${filterItem}`).removeClass('hidden');
                    }
                }
                else {
                    // Switch no marcado, ocultar el chip de filtro
                    if (filterItem) {
                        $(`#${filterItem}`).addClass('hidden');
                    }
                }
            });
            // Guardar en localStorage
            localStorage.setItem('HR-MarkingsPage-Filter', JSON.stringify(localStorageInfo));
            // Construir WHERE base a partir de los filtros
            let whereMulticombosAll = filterAllModulesValues.length > 0
                ? filterAllModulesValues.join(' AND ')
                : '';
            let whereMulticombosMarkingsOnly = filterMarkingsOnlyValues.length > 0
                ? filterMarkingsOnlyValues.join(' AND ')
                : '';
            // Seleccionar el array de módulos según el tipo de página
            const MODULES_TO_FILTER = pageType === 'Grouped' ? GROUPING_MARKINGS_MODULES : DAILY_MARKINGS_MODULES;
            // Aplicar filtros a los módulos
            MODULES_TO_FILTER.forEach(module => {
                let moduleElement = $(`flx-list${module.selector}`)[0];
                if (moduleElement) {
                    let finalWhere = '';
                    if (module.filterAll) {
                        // Módulos con filterAll: true reciben filtros generales + específicos
                        if (whereMulticombosAll && whereMulticombosMarkingsOnly) {
                            finalWhere = `${whereMulticombosAll} AND ${whereMulticombosMarkingsOnly}`;
                        }
                        else if (whereMulticombosAll) {
                            finalWhere = whereMulticombosAll;
                        }
                        else if (whereMulticombosMarkingsOnly) {
                            finalWhere = whereMulticombosMarkingsOnly;
                        }
                    }
                    else {
                        // Módulos con filterAll: false solo reciben filtros generales
                        finalWhere = whereMulticombosAll;
                    }
                    moduleElement.additionalWhere = finalWhere || '1=1';
                    moduleElement.refresh();
                }
            });
        }
        workdays.filterMarkingsManageModules = filterMarkingsManageModules;
        /**
         * Elimina un filtro específico de la página de fichajes.
         * Limpia el componente de filtro, elimina del localStorage y reaplicar filtros restantes.
         * Call: sebastian.workdays.removeSpecificMarkingFilter(element, filterName, pageType)
         * @param elem - Elemento que disparó la acción (típicamente el icono del chip)
         * @param filterName - Atributo name del filtro a eliminar
         * @param pageType - Tipo de página: 'Daily' o 'Grouped' (por defecto: 'Daily')
         */
        function removeSpecificMarkingFilter(elem, filterName, pageType = 'Daily') {
            let mainFilter = $('flx-module[modulename="HR_MarkingsPage_Filter"]').find('#hr-markings-filter-main');
            // Recuperar localStorage
            let localStorageStr = localStorage.getItem('HR-MarkingsPage-Filter');
            let localStorageInfo = localStorageStr ? JSON.parse(localStorageStr) : {};
            // Buscar el filtro y su tipo
            if (localStorageInfo[filterName]) {
                let inputType = localStorageInfo[filterName].inputType;
                // Limpiar el componente correspondiente
                if (inputType === 'flx-multicombo' || inputType === 'flx-dbcombo') {
                    let combo = $(mainFilter).find(`${inputType}[name="${filterName}"]`);
                    if (combo.length > 0) {
                        combo.val('');
                    }
                }
                else if (inputType === 'flx-switch') {
                    let switchElem = $(mainFilter).find(`flx-switch[name="${filterName}"]`);
                    if (switchElem.length > 0) {
                        //switchElem.removeAttr('checked');
                        //switchElem.attr('value', 'false');
                        switchElem.val('false');
                    }
                }
                else if (inputType === 'flx-text') {
                    let textElem = $(mainFilter).find(`flx-text[name="${filterName}"]`);
                    if (textElem.length > 0) {
                        textElem.val('');
                    }
                }
                // Eliminar del localStorage
                delete localStorageInfo[filterName];
                localStorage.setItem('HR-MarkingsPage-Filter', JSON.stringify(localStorageInfo));
            }
            // Ocultar el chip
            let filterItem = $(mainFilter).find(`[name="${filterName}"]`).attr('filteritem');
            if (filterItem) {
                $(`#${filterItem}`).addClass('hidden');
            }
            // Re-aplicar todos los filtros restantes
            filterMarkingsManageModules(elem, pageType);
        }
        workdays.removeSpecificMarkingFilter = removeSpecificMarkingFilter;
        /**
         * Limpia todos los filtros de la página de fichajes (multicombos, switches y botones).
         * Elimina localStorage, oculta todos los chips de filtro, limpia los valores de los
         * componentes y refresca todos los módulos sin filtro.
         * Call: sebastian.workdays.clearMarkingsManageFilters(element, pageType)
         * @param elem - Elemento que disparó la acción
         * @param pageType - Tipo de página: 'Daily' o 'Grouped' (por defecto: 'Daily')
         */
        function clearMarkingsManageFilters(elem, pageType = 'Daily') {
            const filterModule = $('flx-html[modulename="HR_MarkingsPage_Filter"]')[0];
            let mainFilter = elem.closest('flx-module').find('#hr-markings-filter-main');
            let allMulticombos = $(mainFilter).find('flx-multicombo');
            let allSwitches = $(mainFilter).find('flx-switch');
            // Limpiar localStorage
            localStorage.removeItem("HR-MarkingsPage-Filter");
            // Ocultar todos los chips y limpiar valores de multicombos
            allMulticombos.each((index, element) => {
                let filterItem = $(element).attr('filteritem');
                if (filterItem) {
                    $(`#${filterItem}`).addClass('hidden');
                }
                element.setValue('');
            });
            // Ocultar todos los chips y desmarcar switches
            allSwitches.each((index, element) => {
                let filterItem = $(element).attr('filteritem');
                if (filterItem) {
                    $(`#${filterItem}`).addClass('hidden');
                }
                $(element).removeAttr('checked');
                $(element).attr('value', 'false');
            });
            // Ocultar todos los chips de filtro de botones
            $('[modulename="HR_MarkingsPage_Filter"] [id^="hr-filtered-by-"]').addClass('hidden');
            // Seleccionar el array de módulos según el tipo de página
            const MODULES_TO_CLEAR = pageType === 'Grouped' ? GROUPING_MARKINGS_MODULES : DAILY_MARKINGS_MODULES;
            // Limpiar filtros en todos los módulos
            let clearWhere = null;
            MODULES_TO_CLEAR.forEach(module => {
                let moduleElement = $(`flx-list${module.selector}`)[0];
                if (moduleElement) {
                    moduleElement.additionalWhere = clearWhere;
                    moduleElement.refresh();
                }
            });
            // Refrescar el módulo de filtros
            if (filterModule) {
                filterModule.refresh();
            }
        }
        workdays.clearMarkingsManageFilters = clearMarkingsManageFilters;
        /**
         * Restaura los filtros de fichajes desde localStorage al cargar la página.
         * Lee los valores guardados, los restaura en los componentes de filtro
         * y aplica los filtros automáticamente. Si no hay filtros, colapsa el panel.
         * Se ejecuta con un setTimeout de 500ms para esperar a que los componentes estén listos.
         * Call: sebastian.workdays.getMarkingsFilterLocalStorageItem(pageType)
         * @param pageType - Tipo de página: 'Daily' o 'Grouped' (por defecto: 'Daily')
         */
        function getMarkingsFilterLocalStorageItem(pageType = 'Daily') {
            setTimeout(function () {
                let storedData = localStorage.getItem("HR-MarkingsPage-Filter");
                if (storedData) {
                    let localStorageInfo = JSON.parse(storedData);
                    if (Object.keys(localStorageInfo).length === 0) {
                        $('flx-html[modulename="HR_MarkingsPage_Filter"]').find('b.flx-icon.icon-minus').click();
                        return;
                    }
                    let filterModule = $('flx-html[modulename="HR_MarkingsPage_Filter"]')[0];
                    if (filterModule) {
                        // Restaurar todos los valores de filtro desde localStorage
                        for (let inputName in localStorageInfo) {
                            if (localStorageInfo.hasOwnProperty(inputName)) {
                                let { value, inputType } = localStorageInfo[inputName];
                                // Restaurar según el tipo de componente
                                if (inputType === 'flx-switch') {
                                    let switchElement = $(`flx-switch[name="${inputName}"]`, filterModule);
                                    if (switchElement.length > 0) {
                                        if (value === true) {
                                            switchElement.attr('checked', 'checked');
                                            switchElement.attr('value', 'true');
                                        }
                                        else {
                                            switchElement.removeAttr('checked');
                                            switchElement.attr('value', 'false');
                                        }
                                    }
                                }
                                else {
                                    // Restaurar multicombos, dbcombos, texts
                                    $(`${inputType}[name="${inputName}"]`, filterModule).val(value);
                                }
                            }
                        }
                        // Reaplicar filtros con los valores restaurados
                        sebastian.workdays.filterMarkingsManageModules($(filterModule), pageType);
                    }
                }
                else {
                    $('flx-html[modulename="HR_MarkingsPage_Filter"]').find('b.flx-icon.icon-minus').click();
                }
            }, 500);
        }
        workdays.getMarkingsFilterLocalStorageItem = getMarkingsFilterLocalStorageItem;
        // --------------------------------------------------------------------------
        // Gráfico de ubicaciones y zonas horarias
        // --------------------------------------------------------------------------
        /**
         * Renderiza un gráfico de barras horizontal con los porcentajes de fichajes por ubicación.
         * Lee los datos del flx-list hijo del módulo, filtra ubicaciones con CounterLocations > 0
         * y ajusta los porcentajes para que sumen 100%.
         * Call: sebastian.workdays.renderLocationChart(element)
         * @param element - Elemento flx-module que contiene el flx-list con los datos
         */
        function renderLocationChart(element) {
            // Buscar el flx-list dentro del módulo
            const listElement = $(element).find('flx-list')[0];
            if (!listElement) {
                return;
            }
            // Obtener los datos del listado
            let data = listElement.data;
            if (!data || !Array.isArray(data)) {
                return;
            }
            // Filtrar items con CounterLocations > 0
            let filteredData = data.filter(item => item.CounterLocations > 0);
            if (filteredData.length === 0) {
                $("#hr-locations-prct-bar").html('');
                return;
            }
            // Calcular porcentaje total y ajustar para que sume 100
            let totalPercentage = filteredData.reduce((sum, item) => sum + (item.PercentageByType || 0), 0);
            let adjustedData = filteredData.map(item => (Object.assign(Object.assign({}, item), { adjustedPercentage: item.PercentageByType || 0 })));
            // Si el total no es 100, ajustar el último elemento
            if (totalPercentage !== 100 && adjustedData.length > 0) {
                let difference = 100 - totalPercentage;
                adjustedData[adjustedData.length - 1].adjustedPercentage += difference;
            }
            // Construir el HTML del gráfico
            let chartHtml = '<div class="col-12 padding-0 margin-top-xl hr-bar-custom-char">';
            adjustedData.forEach((item) => {
                const colorClass = item.LocationColor || 'info';
                const percentage = item.adjustedPercentage;
                chartHtml += `<div class="bg-${colorClass}" style="width: ${percentage}%"></div>`;
            });
            chartHtml += '</div>';
            // Renderizar el gráfico en el elemento
            $("#hr-locations-prct-bar").html(chartHtml);
        }
        workdays.renderLocationChart = renderLocationChart;
        /**
         * Muestra el combo editor de modo de zona horaria y oculta el label de solo lectura.
         * Permite al usuario cambiar el modo de zona horaria del fichaje.
         * Call: sebastian.workdays.editTimeZoneMode(element)
         * @param element - Elemento icono de lápiz que disparó la acción
         */
        function editTimeZoneMode(element) {
            $(element).closest('#hr-timezone-mode-descrip-cnt').addClass('hidden');
            $(element).closest('#hr-timezone-mode-data').find('#hr-timezone-mode-descrip-combo').removeClass('hidden');
        }
        workdays.editTimeZoneMode = editTimeZoneMode;
        /**
         * Guarda la zona horaria seleccionada como override y refresca el módulo.
         * Ejecuta el proceso HR_pMarkings_OverrideTimeZoneMode para persistir el cambio.
         * Call: sebastian.workdays.saveTimeZoneMode(element, EmployeeId, DateJourney, RegId)
         * @param element - Elemento icono de guardar que disparó la acción
         * @param EmployeeId - ID del empleado
         * @param DateJourney - Fecha de la jornada (YYYY-MM-DD)
         * @param RegId - ID del registro
         */
        function saveTimeZoneMode(element, EmployeeId, DateJourney, RegId) {
            const container = $(element).closest('#hr-timezone-mode-descrip-combo');
            const combo = container.find('flx-combo[name="cb-timezonemodes"]')[0];
            if (!combo) {
                flexygo.msg.error('Cannot find timezone combo');
                return;
            }
            const newTimeZone = $(combo).val();
            const process = new flexygo.Process('HR_pMarkings_OverrideTimeZoneMode');
            const params = [
                { "Key": 'EmployeeId', "Value": EmployeeId },
                { "Key": 'DateJourney', "Value": DateJourney },
                { "Key": 'RegId', "Value": RegId },
                { "Key": 'NewTimeZoneMode', "Value": newTimeZone }
            ];
            process.run(params, (ret) => {
                const listElement = $(element).closest('flx-list')[0];
                if (listElement) {
                    listElement.refresh();
                }
            }, 'current', true, $(element));
        }
        workdays.saveTimeZoneMode = saveTimeZoneMode;
        // ╔══════════════════════════════════════════════════════════════════════════╗
        // ║              SECCIÓN 4: OTRAS FUNCIONES                                 ║
        // ║  Funciones que no pertenecen a las secciones anteriores: formato de     ║
        // ║  logs de cambios (dirty log), resolución de incidencias de jornada      ║
        // ║  (individual y batch) y configuración de tipos de incidencia.           ║
        // ╚══════════════════════════════════════════════════════════════════════════╝
        // --------------------------------------------------------------------------
        // Formato de logs de cambios (Dirty Log)
        // --------------------------------------------------------------------------
        /**
         * Procesa el JSON del campo ChangeDetail de Employees_Assistence_DirtyLog
         * y genera HTML con información del cambio y botón de navegación al registro.
         * Soporta múltiples tipos de cambio: festivos, vacaciones, ausencias, bajas,
         * turnos, horarios de turno y días especiales de turno.
         * @param changeType - Tipo de cambio (ej: BANKHOLIDAY_INSERT, VACATION_INSERT, SHIFT_UPDATE, etc.)
         * @param changeDetail - JSON con los detalles del cambio
         * @returns HTML string con la información formateada y enlace de navegación, o '' si no aplica
         */
        function formatDirtyLogChangeDetail(changeType, changeDetail) {
            if (!changeDetail) {
                return '';
            }
            // Para RECALC y VALIDATE_UNDO que son texto plano, no devolver nada
            if (changeType === 'RECALC' || changeType === 'VALIDATE_UNDO') {
                return '';
            }
            // Para breaks y special stops, no devolver nada
            if (changeType === 'SHIFT_BREAK_INSERT' ||
                changeType === 'SHIFT_BREAK_UPDATE' ||
                changeType === 'SHIFT_BREAK_DELETE' ||
                changeType === 'SPECIALSTOP_INSERT' ||
                changeType === 'SPECIALSTOP_UPDATE' ||
                changeType === 'SPECIALSTOP_DELETE') {
                return '';
            }
            try {
                const data = JSON.parse(changeDetail);
                let html = '';
                let objectName = '';
                let objectWhere = '';
                let defaults = '';
                let pageName = '';
                // Festivos (BankHolidays)
                if (changeType.startsWith('BANKHOLIDAY_')) {
                    objectName = 'HR_BankHoliday';
                    objectWhere = `BankHolidays.RegId = ${data.RegId}`;
                    defaults = `{'RegId':'${data.RegId}'}`;
                    pageName = 'HR_BankHoliday_Edit';
                    html = `<div class="emp-flex-justify-between txt-primary">
                            <div>
                            <strong>${flexygo.localization.translate('dirtylog.calendar')}:</strong> ${data.CalendarId || ''}<br/>
                            <strong>${flexygo.localization.translate('dirtylog.date')}:</strong> ${moment(data.Date).format('L')}<br/>
                            <strong>${flexygo.localization.translate('dirtylog.description')}:</strong> ${data.Descrip || ''}<br/>
                            </div>
                             <button class="btn hr-white-button size-xs"
                            onclick="flexygo.nav.openPage('edit', '${objectName}', '${objectWhere}', \`${defaults}\`, 'sliderightx50p', false)">
                                ${flexygo.localization.translate('dirtylog.view')}
                            </button>
                        </div>`;
                }
                // Vacaciones (Holidays - Vacations)
                else if (changeType.startsWith('VACATION_')) {
                    objectName = 'emp_Employee_Holiday';
                    objectWhere = `Employees_Holidays.RegId = ${data.RegId}`;
                    defaults = `{'RegId':'${data.RegId}'}`;
                    html = `<div class="emp-flex-justify-between txt-primary">
                            ${data.Reason ? ` ${data.Reason}<br/>` : ''}
                             <button class="btn hr-white-button size-xs" onclick="flexygo.nav.openPage('edit', '${objectName}', '${objectWhere}', \`${defaults}\`, 'sliderightx50p', false)">
                                ${flexygo.localization.translate('dirtylog.view')}
                            </button>
                        </div>`;
                }
                // Ausencias (Holidays - Absences)
                else if (changeType.startsWith('ABSENCE_')) {
                    objectName = 'emp_Employee_Holiday';
                    objectWhere = `Employees_Holidays.RegId = ${data.RegId}`;
                    defaults = `{'RegId':'${data.RegId}'}`;
                    html = `<div class="emp-flex-justify-between txt-primary">
                            ${data.Reason ? ` ${data.Reason}<br/>` : ''}
                             <button class="btn hr-white-button size-xs" onclick="flexygo.nav.openPage('edit', '${objectName}', '${objectWhere}', \`${defaults}\`, 'sliderightx50p', false)">
                                ${flexygo.localization.translate('dirtylog.view')}
                            </button>
                        </div>`;
                }
                // Actualización Vacaciones/Ausencias
                else if (changeType === 'VACATION_ABSENCE_UPDATE') {
                    objectName = 'emp_Employee_Holiday';
                    objectWhere = `Employees_Holidays.RegId = ${data.RegId}`;
                    defaults = `{'RegId':'${data.RegId}'}`;
                    html = `<div class="emp-flex-justify-between txt-primary">
                            ${data.Reason ? ` ${data.Reason}<br/>` : ''}
                             <button class="btn hr-white-button size-xs" onclick="flexygo.nav.openPage('edit', '${objectName}', '${objectWhere}', \`${defaults}\`, 'sliderightx50p', false)">
                                ${flexygo.localization.translate('dirtylog.view')}
                            </button>
                        </div>`;
                }
                // Bajas (Leaves)
                else if (changeType.startsWith('LEAVE_')) {
                    objectName = 'emp_Employee_Leave';
                    objectWhere = `Employees_Leaves.RegId = ${data.RegId}`;
                    defaults = `{'RegId':'${data.RegId}'}`;
                    html = `<div class="emp-flex-justify-between txt-primary">
                <div>
                            <strong>${flexygo.localization.translate('dirtylog.datestart')}:</strong> ${moment(data.date).format('L')}<br/>
                            <strong>${flexygo.localization.translate('dirtylog.dateend')}:</strong> ${moment(data.dateEnd).format('L')}<br/>
                            ${data.Reason ? ` ${data.Reason}<br/>` : ''}
                            </div>
                             <button class="btn hr-white-button size-xs" onclick="flexygo.nav.openPage('edit', '${objectName}', '${objectWhere}', \`${defaults}\`, 'sliderightx50p', false)">
                                ${flexygo.localization.translate('dirtylog.view')}
                            </button>
                        </div>`;
                }
                // Turnos (Shifts)
                else if (changeType === 'SHIFT_UPDATE') {
                    objectName = 'emp_Shift';
                    objectWhere = `Shifts.ShiftId = ${data.ShiftId}`;
                    defaults = `{'ShiftId':'${data.ShiftId}'}`;
                    html = `<div class="emp-flex-justify-between txt-primary">
                </div>
                            <strong>${flexygo.localization.translate('dirtylog.shift')}:</strong> ${data.Descrip || data.ShiftId}<br/>
                            <strong>${flexygo.localization.translate('dirtylog.breaksigned')}:</strong> ${data.BreakSigned ? flexygo.localization.translate('yes') : flexygo.localization.translate('no')}<br/>
                            <strong>${flexygo.localization.translate('dirtylog.workonfestive')}:</strong> ${data.WorkOnFestive ? flexygo.localization.translate('yes') : flexygo.localization.translate('no')}<br/>
                     </div>
                     <button class="btn hr-white-button size-xs" onclick="flexygo.nav.openPage('edit', '${objectName}', '${objectWhere}', \`${defaults}\`, 'sliderightx50p', false)">
                                 ${flexygo.localization.translate('dirtylog.view')}
                            </button>
                        </div>`;
                }
                // Horario de turno (Shift Schedule)
                else if (changeType === 'SHIFT_SCHEDULE_UPDATE') {
                    objectName = 'emp_Shift';
                    objectWhere = `Shifts.ShiftId = ${data.ShiftId}`;
                    defaults = `{'ShiftId':'${data.ShiftId}'}`;
                    html = `<div class="emp-flex-justify-between txt-primary"> 
                </div>
                            <strong>${flexygo.localization.translate('dirtylog.shift')}:</strong> ${data.ShiftId}<br/>
                            <strong>${flexygo.localization.translate('dirtylog.line')}:</strong> ${data.Line || ''}<br/>
                            <strong>${flexygo.localization.translate('dirtylog.starttime')}:</strong> ${data.StartTime || ''}<br/>
                            <strong>${flexygo.localization.translate('dirtylog.duration')}:</strong> ${data.Duration || ''} ${flexygo.localization.translate('dirtylog.hours')}<br/>
                             </div>
                             <button class="btn hr-white-button size-xs" onclick="flexygo.nav.openPage('edit', '${objectName}', '${objectWhere}', \`${defaults}\`, 'sliderightx50p', false)">
                               ${flexygo.localization.translate('dirtylog.view')}
                            </button>
                        </div>`;
                }
                // Días especiales de turno (Shift Special Days)
                else if (changeType.startsWith('SHIFT_SPECIALDAY_')) {
                    objectName = 'emp_Shift';
                    objectWhere = `Shifts.ShiftId = ${data.ShiftId}`;
                    defaults = `{'ShiftId':'${data.ShiftId}'}`;
                    html = `<div class="emp-flex-justify-between txt-primary"><div>
                            <strong>${flexygo.localization.translate('dirtylog.shift')}:</strong> ${data.ShiftId}<br/>
                            <strong>${flexygo.localization.translate('dirtylog.date')}:</strong> ${moment(data.Date).format('L')}<br/>
                            ${data.StartTime ? `<strong>${flexygo.localization.translate('dirtylog.starttime')}:</strong> ${data.StartTime}<br/>` : ''}
                            ${data.Duration ? `<strong>${flexygo.localization.translate('dirtylog.duration')}:</strong> ${data.Duration} ${flexygo.localization.translate('dirtylog.hours')}<br/>` : ''}
                            </div>
                            <button class="btn hr-white-button size-xs" onclick="flexygo.nav.openPage('edit', '${objectName}', '${objectWhere}', \`${defaults}\`, 'sliderightx50p', false)">
                                ${flexygo.localization.translate('dirtylog.view')}
                            </button>
                        </div>`;
                }
                return html;
            }
            catch (e) {
                return '';
            }
        }
        workdays.formatDirtyLogChangeDetail = formatDirtyLogChangeDetail;
        // --------------------------------------------------------------------------
        // Resolución de incidencias de jornada
        // --------------------------------------------------------------------------
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
        function resolveSingleIncidence(element, employeeId, incidenceTypeId, date) {
            // Buscar el módulo
            const moduleElement = $(element).closest('flx-module')[0];
            if (!moduleElement) {
                return;
            }
            // Obtener el tipo de resolución de la tarjeta activa
            const activeCard = $(moduleElement).find('.batch-action-card.active');
            if (!activeCard.length) {
                flexygo.msg.warning(flexygo.localization.translate('incidences.selectResolutionType'));
                return;
            }
            const resolutionType = activeCard.attr('resolutiontype');
            if (!resolutionType) {
                flexygo.msg.error(flexygo.localization.translate('incidences.noResolutionType'));
                return;
            }
            // Obtener ResolvedBy del current reference
            const resolvedBy = flexygo.context.currentReference;
            if (!resolvedBy) {
                flexygo.msg.error(flexygo.localization.translate('incidences.noCurrentReference'));
                return;
            }
            // Obtener notas de resolución del textarea
            const notesTextarea = $(moduleElement).find('.batch-notes-section textarea');
            const resolutionNotes = notesTextarea.length ? notesTextarea.val() : null;
            // Crear y ejecutar proceso
            const process = new flexygo.Process('HR_pIncidence_Resolve');
            const params = [
                { "Key": 'EmployeeId', "Value": employeeId },
                { "Key": 'Date', "Value": date },
                { "Key": 'IncidenceTypeId', "Value": incidenceTypeId },
                { "Key": 'ResolutionType', "Value": resolutionType },
                { "Key": 'ResolvedBy', "Value": resolvedBy },
                { "Key": 'ResolutionNotes', "Value": resolutionNotes }
            ];
            process.run(params, (ret) => {
                // Refrescar listados de incidencias
                const incidentsList = $('flx-list[modulename=hr_mod_ManageMarkingsDaily_Incidences]')[0];
                if (incidentsList) {
                    incidentsList.refresh();
                }
                const incidentsHistoricList = $('flx-list[modulename=HR_WorkDay_Detailed_Incidences_Historic]')[0];
                if (incidentsHistoricList) {
                    incidentsHistoricList.refresh();
                }
                flexygo.nav.closePage($(element));
                flexygo.msg.success(flexygo.localization.translate('incidences.incidencesResolved'));
            }, 'current', true, $(element));
        }
        workdays.resolveSingleIncidence = resolveSingleIncidence;
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
        function resolveIncidencesBatch(element, incidenceTypeId, startDate, endDate, employeesIds) {
            // Buscar el módulo
            const moduleElement = $(element).closest('flx-module')[0];
            var _a, _b;
            if (!moduleElement) {
                return;
            }
            // Obtener el tipo de resolución de la tarjeta activa
            const activeCard = $(moduleElement).find('.batch-action-card.active');
            if (!activeCard.length) {
                flexygo.msg.warning(flexygo.localization.translate('incidences.selectResolutionType'));
                return;
            }
            const resolutionType = activeCard.attr('resolutiontype');
            if (!resolutionType) {
                flexygo.msg.error(flexygo.localization.translate('incidences.noResolutionType'));
                return;
            }
            // Obtener ResolvedBy del current reference
            const resolvedBy = flexygo.context.currentReference;
            if (!resolvedBy) {
                flexygo.msg.error(flexygo.localization.translate('incidences.noCurrentReference'));
                return;
            }
            // Obtener notas de resolución del textarea
            const notesTextarea = $(moduleElement).find('.batch-notes-section textarea');
            const resolutionNotes = notesTextarea.length ? notesTextarea.val() : null;
            // Resolver EmployeesIds: usar parámetro si se proporciona, si no leer de objectdefaults
            const resolvedEmployeesIds = employeesIds !== null && employeesIds !== void 0 ? employeesIds : ((_b = (_a = moduleElement.objectdefaults) === null || _a === void 0 ? void 0 : _a.EmployeesIds) !== null && _b !== void 0 ? _b : null);
            // Crear y ejecutar proceso
            const process = new flexygo.Process('HR_pIncidence_Resolve_Batch_ByDate');
            const params = [
                { "Key": 'IncidenceTypeId', "Value": incidenceTypeId },
                { "Key": 'StartDate', "Value": startDate },
                { "Key": 'EndDate', "Value": endDate },
                { "Key": 'ResolutionType', "Value": resolutionType },
                { "Key": 'ResolvedBy', "Value": resolvedBy },
                { "Key": 'ResolutionNotes', "Value": resolutionNotes },
                { "Key": 'EmployeesIds', "Value": resolvedEmployeesIds }
            ];
            process.run(params, (ret) => {
                // Refrescar listados tras resolver
                if (ret) {
                    const workdayIncidentsList = $('flx-list[modulename="HR_Workday_IncidentsWarnings"]')[0];
                    if (workdayIncidentsList) {
                        workdayIncidentsList.refresh();
                    }
                    const groupedIncidentsList = $('flx-list[modulename="HR_Workday_Grouped_IncidentsWarnings"]')[0];
                    if (groupedIncidentsList) {
                        groupedIncidentsList.refresh();
                    }
                    flexygo.nav.closePage($(element));
                    const listMarkingsElement = $('flx-list[modulename="HR_AllDayDateDashboard"]')[0];
                    const listIncidencesElement = $('flx-list[modulename="HR_Workday_Grouped_IncidentsWarnings"]')[0];
                    listMarkingsElement.refresh();
                    listIncidencesElement.refresh();
                    flexygo.msg.success(flexygo.localization.translate('incidences.incidencesResolved'));
                }
            }, 'current', true, $(element));
        }
        workdays.resolveIncidencesBatch = resolveIncidencesBatch;
        // --------------------------------------------------------------------------
        // Configuración de tipos de incidencia
        // --------------------------------------------------------------------------
        /**
         * Actualiza una propiedad de la entidad WorkdayIncidenceType cuando se hace click en un switch.
         * El nuevo valor es el opuesto del estado actual (invertido para onclick).
         * Call: sebastian.workdays.updateWorkdayIncidenceType(this, 'PropertyName', {{IncidenceTypeId}})
         * @param element - Elemento switch que disparó el click
         * @param property - Nombre de la propiedad a actualizar
         * @param incidenceTypeId - IncidenceTypeId para filtrar la entidad
         */
        function updateWorkdayIncidenceType(element, property, incidenceTypeId) {
            debugger;
            const newValue = $(element).val() ? 0 : 1;
            const entity = new flexygo.obj.Entity('WorkdayIncidenceType', `WorkdayIncidenceType.IncidenceTypeId = ${incidenceTypeId}`);
            if (entity.read()) {
                entity.data[property].Value = newValue;
                entity.update();
            }
        }
        workdays.updateWorkdayIncidenceType = updateWorkdayIncidenceType;
    })(workdays = sebastian.workdays || (sebastian.workdays = {}));
})(sebastian || (sebastian = {}));
//# sourceMappingURL=WorkDays.js.map