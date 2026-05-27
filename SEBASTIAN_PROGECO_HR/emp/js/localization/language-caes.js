/**
 * @namespace flexygo.culture.caes
 */
var flexygo;
(function (flexygo) {
    var culture;
    (function (culture) {
        var caes;
        (function (caes) {
            caes.presences = {
                day: 'Dia',
                workingHours: 'Hores de jornada',
                absenceHours: 'Hores d\'absència',
                workedHours: 'Hores treballades',
                difference: 'Diferència',
                nonBusinessDay: 'No laborable',
                holidays: 'Vacances',
                hours: 'Hores',
                days: 'Dies'
            };
            caes.warnings = {
                filterHolidays: 'Filtra els empleats per veure les seves vacances/absències',
                removeHolidays: 'Aquest registre està integrat en una instància. En eliminar-lo s\'eliminaran tots els altres dies que comparteixen la instància. Voleu continuar?'
            };
            caes.planner = {
                shifts: 'Torns',
                groups: 'Grups',
                employees: 'Empleats',
                shift: 'Torn',
                group: 'Grup',
                employee: 'Empleat',
                showdetails: 'Mostra detalls',
                showdraggables: 'Mostra arrossegables',
                today: 'Avui',
                week: 'Setmana',
                month: 'Mes',
                absences: 'Absències',
                patterns: 'Patrons',
                deleteplans: 'Elimina planificacions',
                EmployeeSchedule: 'Planificació d\'empleat',
                GroupSchedule: 'Planificació de grup',
                OfficePeriods: 'Període d\'oficina',
                EmployeeRule0: 'Regla d\'empleat',
                EmployeePeriods: 'Període d\'empleat',
                GroupScheduleFreeDay: 'Dia lliure del grup',
                PositionPeriods: 'Període del lloc de treball',
                UnitsPeriods: 'Període de la unitat organitzativa',
                ScopePeriods: 'Període de l\'àmbit',
                AssistenceShift: 'Torn registrat',
            };
            caes.emp = {
                nocalendar: 'Sense dades de calendari',
                deletebtn: 'Elimina vacances',
                weeklyBtn: 'Insereix vacances setmanals',
                excelFileTitle: 'Nom del fitxer',
                excelFileMsg: 'Poseu nom al fitxer Excel de previsualització',
                noItemsSelected: 'Cap element seleccionat',
                selectAtLeastOneEmployee: 'Heu de seleccionar almenys un empleat',
                errorUpdatingShift: 'Error en actualitzar el torn',
                applyFilterToModifyBalances: 'Apliqueu un filtre per modificar els saldos.',
                selectCompanyGroupUnitAndDateRange: 'Heu de seleccionar una empresa, grup o unitat, i un interval de dates (inici i fi) per exportar les dades.',
                selectDateRange: 'Heu de seleccionar un interval de dates (inici i fi) per exportar les dades.',
                cannotChangePlanificationStatus: 'No es pot canviar la planificació d\'un empleat quan els seus fitxatges estan en estat',
                existingMarkingsConfirm: 'Ja hi ha fitxatges per a aquest dia. Voleu replanificar-lo?',
                cantUpdateSchedule: 'No es pot actualitzar l\'horari',
                cannotModifyPastPlanification: 'No es pot modificar una planificació que ja ha passat.',
                employeeCreated: 'Empleat creat correctament',
                employeeCreatedHolidaysError: 'L\'empleat s\'ha creat però hi ha hagut un problema en omplir el total de vacances',
                filterByDateRequired: 'Cal un filtre de data d\'inici i data de fi',
                instanceAbsences: 'Absències',
                instanceHolidays: 'Vacances',
            };
            caes.balance = {
                year: 'Any',
                month: 'Mes',
                week: 'Setmana',
                back: 'Enrere',
                foward: 'Endavant'
            };
            caes.employeemanager = {
                employee: 'Empleat',
                employeePersonal: 'Dades personals',
                employeeContract: 'Contracte',
                employeeOrganization: 'Organització',
                save: 'Desa',
                next: 'Següent',
                exit: 'Sortir',
                empmanagertitle: 'Nou empleat'
            };
            caes.historiclst = {
                selectoption: 'Seleccioneu una opció',
                selectoptionmsg: 'No es poden generar dades històriques si no se selecciona cap opció.'
            };
            caes.months = {
                1: 'Gener',
                2: 'Febrer',
                3: 'Març',
                4: 'Abril',
                5: 'Maig',
                6: 'Juny',
                7: 'Juliol',
                8: 'Agost',
                9: 'Setembre',
                10: 'Octubre',
                11: 'Novembre',
                12: 'Desembre'
            };
            caes.weekdays = {
                mon: 'Dl',
                tue: 'Dt',
                wed: 'Dc',
                thu: 'Dj',
                fri: 'Dv',
                sat: 'Ds',
                sun: 'Dg'
            };
            caes.accesspoint = {
                errormsg: 'Codi d\'accés de l\'empleat no trobat',
                exit: 'Sortida',
                enter: 'Entrada',
                helloexit: 'Hola',
                helloenter: 'Fins aviat',
                lastmarking: 'El vostre últim fitxatge',
                noplanning: 'Sense planificació per avui',
                employeeNotFound: 'Empleat no trobat',
                accessIdNotFound: 'Codi d\'accés no trobat',
            };
            caes.messages = {
                multipleabsencescalendar: 'Hi ha més d\'un registre de vacances/absència per a aquesta data, seleccioneu el que voleu obrir de la llista emergent.',
                markingsunplannedabsences: 'No heu seleccionat cap empleat, de manera que s\'inseriran fitxatges per a totes les absències no planificades. Voleu continuar?',
                holidaysunplannedabsences: 'No heu seleccionat cap empleat, de manera que s\'inserirà una absència injustificada per a totes les absències no planificades. Voleu continuar?'
            };
            caes.documents = {
                missingData: 'No s\'han trobat les dades necessàries per eliminar el document',
                confirmDelete: 'Esteu segur que voleu eliminar aquest document?',
                deleteSuccess: 'Document eliminat correctament'
            };
            caes.incidences = {
                selectResolutionType: 'Seleccioneu un tipus de resolució',
                noResolutionType: 'No s\'ha pogut obtenir el tipus de resolució',
                noCurrentReference: 'No s\'ha pogut obtenir la referència actual',
                incidencesResolved: 'Incidències resoltes correctament'
            };
            caes.workdays = {
                noWorkDaysSelected: 'Cap dia laborable seleccionat per validar',
                workDaysValidated: 'Dies laborables validats correctament',
                noWorkDaysSelectedUndo: 'Cap dia laborable seleccionat per desvalidar',
                workDaysUnvalidated: 'Validació dels dies laborables desfeta correctament',
                noWorkDaysSelectedBalance: 'Cap dia laborable seleccionat per consolidar el saldo',
                workDaysBalanced: 'Saldo dels dies laborables consolidat correctament',
                noWorkDaysSelectedBalanceUndo: 'Cap dia laborable seleccionat per desfer el saldo',
                workDaysBalanceUndone: 'Saldo dels dies laborables desfet correctament',
                changeFestiveWorkedAllEmployeesConfirm: 'Cap element seleccionat. El procés s\'executarà per a tots els empleats accessibles. Voleu continuar?',
                changeFestiveWorkedSuccess: 'Procés executat correctament',
                refreshDayDateBatchConfirm: 'Cap element seleccionat. El procés s\'executarà per a tots els empleats accessibles. Voleu continuar?',
                refreshAllDayDateBatchConfirm: 'Cap empleat seleccionat. El procés s\'executarà per a tots els empleats accessibles del període. Voleu continuar?',
                changePlanificationAllDayDateBatchConfirm: 'Cap empleat seleccionat. La planificació es canviarà per a tots els empleats accessibles del període. Voleu continuar?',
                changePlanificationWrapperBatchConfirm: 'Cap element seleccionat. La planificació es canviarà per a tots els empleats accessibles en aquesta data. Voleu continuar?',
                changePlanificationWrapperBatchGroupedConfirm: 'Cap empleat seleccionat. La planificació es canviarà per a tots els empleats accessibles del període. Voleu continuar?',
                noEmployeesSelectedCannotExecute: 'Cap empleat seleccionat. Seleccioneu almenys un empleat per executar el procés.',
                recalcMetricsDirtyBatchConfirm: 'Cap element seleccionat. Les mètriques es recalcularan per a tots els dies laborables bruts dels empleats accessibles en aquesta data. Voleu continuar?',
                recalcMetricsDirtyGroupedConfirm: 'Cap empleat seleccionat. Les mètriques es recalcularan per a tots els dies laborables bruts dels empleats accessibles del període. Voleu continuar?',
                recalcMetricsDirtySuccess: 'Jornades brutes recalculades correctament.',
                adminRecalcHistoryRangeConfirm: 'Cap element seleccionat. El recàlcul complet (mètriques i incidències) s\'executarà per a tots els empleats accessibles en l\'interval de dates. Voleu continuar?',
                noHeaderDates: 'No s\'han trobat dates a la capçalera',
                noModuleOrList: 'Mòdul o llista no trobat',
                monthly: 'Mensual',
                weekly: 'Setmanal'
            };
            caes.dirtylog = {
                calendar: 'Calendari',
                date: 'Data',
                description: 'Descripció',
                view: 'Vista',
                type: 'Tipus',
                datestart: 'Data d\'inici',
                dateend: 'Data de fi',
                reason: 'Motiu',
                leavetype: 'Tipus d\'absència',
                shift: 'Torn',
                breaksigned: 'Descans signat',
                workonfestive: 'Treball en festiu',
                line: 'Línia',
                starttime: 'Hora d\'inici',
                duration: 'Durada',
                hours: 'hores'
            };
            caes.heatmap = {
                noData: 'Sense dades per mostrar',
                less: 'Menys',
                more: 'Més',
                date: 'Data',
                healthScore: 'Health Score',
                status: 'Estat',
                months: 'Gen,Feb,Mar,Abr,Mai,Jun,Jul,Ago,Set,Oct,Nov,Des',
                days: 'Dl,Dt,Dc,Dj,Dv,Ds,Dg'
            };
            caes.projects = {
                deleteweekplan: 'Esteu segur que voleu eliminar el pla setmanal?'
            };
            caes.onlineapp = {
                welcome: 'Benvingut a Sebastian',
                goodbye: 'Fins aviat'
            };
            caes.climatepulse = {
                good: 'Bé',
                neutral: 'Normal',
                difficult: 'Difícil',
                send: 'Enviar',
                thanks: 'Gràcies per compartir!',
                'comment.placeholder': 'Comentari breu opcional...'
            };
            caes.testdatawizard = {
                title: 'Generador de Dades Demo',
                detecting: 'Detectant...',
                stepConfig: 'Configuració',
                stepPreview: 'Previsualització',
                stepResult: 'Resultat',
                restrictedTitle: 'Accés Restringit',
                restrictedMsg1: "S'han detectat dades operatives a la base de dades.",
                restrictedMsg2: 'Per seguretat, <strong>no és possible generar dades de prova</strong> sobre una instal·lació en ús.',
                backToHome: "Tornar a l'Inici",
                sectorLabel: '1. Selecciona el Sector',
                sectorOffices: 'Oficines',
                sectorManufacturing: 'Fabricació',
                sectorServices: 'Serveis',
                volumeLabel: "2. Volum d'Empleats",
                volumeHint: 'Llisca per ajustar entre 10 i 200 empleats.',
                structureLabel: '3. Opcions Estructurals',
                multiCompany: 'Multi-empresa',
                multiOffice: 'Multi-centre',
                circuitsLabel: '4. Dades a Generar',
                circuitOrg: 'Estructura Organitzativa',
                circuitEmployees: 'Empleats i Fitxes',
                circuitShifts: 'Torns i Calendaris',
                circuitAbsences: 'Absències Demo',
                circuitMarkings: 'Fitxatges Històrics (2 mesos)',
                circuitContracts: 'Contractes (PRO)',
                next: 'Següent',
                previewTitle: 'Revisió de la generació',
                previewDesc: 'Si us plau confirma les dades abans de llançar el procés. Aquest procés pot trigar uns segons.',
                previewSummary: 'Resum',
                previewSector: 'Sector:',
                previewStructure: 'Estructura:',
                previewVolume: 'Volum:',
                previewEmployeesEst: 'Empleats (estimat)',
                previewMode: 'Mode:',
                previewDetails: 'Detalls:',
                timeEstimate: 'Temps estimat: <strong>30-60 segons</strong>. No tanquis aquesta finestra.',
                back: 'Enrere',
                generate: 'Generar Dades',
                generating: 'Generant dades...',
                pleaseWait: 'Si us plau espera',
                successTitle: 'Generació Completada!',
                companies: 'Empreses',
                offices: 'Oficines',
                employees: 'Empleats',
                historicYears: 'Anys Històric',
                demoModeTitle: 'Mode demo actiu',
                demoModeWarning: "Mentre hi hagi dades de prova al sistema, qualsevol dada que s'insereixi manualment a l'aplicació també s'eliminarà en prémer <em>Eliminar Dades</em>. La base de dades quedarà completament buida.",
                deleteData: 'Eliminar Dades',
                finish: 'Finalitzar',
                licensePrefix: 'Llicència: ',
                testDataActive: 'Dades de Prova Actives',
                generationComplete: 'Generació completada',
                confirmDelete: "Estàs segur d'ELIMINAR les dades generades?",
                deletingData: 'Eliminant dades...',
                errorGenerating: 'Error generant dades: ',
                errorDeleting: 'Error eliminant dades: ',
                detailsBase: 'Dades base, Empleats, Torns, Absències',
                detailsMarkings: ', Fitxatges',
                detailsContracts: ', Contractes',
                structureCompany: '1 Empresa',
                structureCompanies: ' Empreses',
                structureOffice: ', 1 Centre/Empresa',
                structureOffices: ' Centres/Empresa'
            };
        })(caes = culture.caes || (culture.caes = {}));
    })(culture = flexygo.culture || (flexygo.culture = {}));
})(flexygo || (flexygo = {}));
//# sourceMappingURL=language-caes.js.map