/**
 * @namespace flexygo.culture.frfr
 */
var flexygo;
(function (flexygo) {
    var culture;
    (function (culture) {
        var frfr;
        (function (frfr) {
            frfr.presences = {
                day: 'Jour',
                workingHours: 'Heures de travail',
                absenceHours: 'Heures d\'absence',
                workedHours: 'Heures travaillées',
                difference: 'Différence',
                nonBusinessDay: 'Non ouvrable',
                holidays: 'Vacances',
                hours: 'Heures',
                days: 'Jours'
            };
            frfr.warnings = {
                filterHolidays: 'Filtrez les employés pour voir leurs vacances/absences',
                removeHolidays: 'Cet enregistrement de vacances est intégré dans une seule instance. Sa suppression supprimera tous les autres jours qui partagent votre instance. Voulez-vous continuer ?'
            };
            frfr.planner = {
                shifts: 'Postes',
                groups: 'Groupes',
                employees: 'Employés',
                shift: 'Poste',
                group: 'Groupe',
                employee: 'Employé',
                showdetails: 'Voir détails',
                showdraggables: 'Déplaçables',
                today: 'Aujourd\'hui',
                week: 'Hebdomadaire',
                month: 'Mensuel',
                absences: 'Absences',
                patterns: 'Modèles',
                deleteplans: 'Supprimer les planifications',
                EmployeeSchedule: 'Planification de l\'employé',
                GroupSchedule: 'Planification du groupe',
                OfficePeriods: 'Période de bureau',
                EmployeeRule0: 'Règle de l\'employé',
                EmployeePeriods: 'Période de l\'employé',
                GroupScheduleFreeDay: 'Jour libre du groupe',
                PositionPeriods: 'Période du poste de travail',
                UnitsPeriods: 'Période de l\'unité organisationnelle',
                ScopePeriods: 'Période de portée',
                AssistenceShift: 'Poste enregistré',
            };
            frfr.emp = {
                nocalendar: 'Pas de calendrier associé',
                deletebtn: 'Supprimer jours fériés',
                weeklyBtn: 'Ajouter un jour férié hebdomadaire',
                excelFileTitle: 'Nom du fichier',
                excelFileMsg: 'Donnez un nom au fichier',
                noItemsSelected: 'Aucun élément sélectionné',
                selectAtLeastOneEmployee: 'Vous devez sélectionner au moins un employé',
                errorUpdatingShift: 'Erreur lors de la mise à jour du poste',
                applyFilterToModifyBalances: 'Veuillez appliquer un filtre pour modifier les soldes.',
                selectCompanyGroupUnitAndDateRange: 'Vous devez sélectionner une société, un groupe ou une unité, et une plage de dates (début et fin) pour exporter les données.',
                selectDateRange: 'Vous devez sélectionner une plage de dates (début et fin) pour exporter les données.',
                cannotChangePlanificationStatus: 'Impossible de modifier la planification d\'un employé lorsque ses pointages ont le statut',
                existingMarkingsConfirm: 'Il y a déjà des pointages pour ce jour. Voulez-vous le replanifier ?',
                cantUpdateSchedule: 'Impossible de mettre à jour la planification',
                cannotModifyPastPlanification: 'Impossible de modifier une planification déjà passée.',
                employeeCreated: 'Employé(e) créé(e) avec succès',
                employeeCreatedHolidaysError: 'L\'employé a été créé mais un problème est survenu lors du remplissage des congés totaux',
                filterByDateRequired: 'Il est nécessaire de filtrer par une date de début et une date de fin',
                instanceAbsences: 'Absences',
                instanceHolidays: 'Congés',
            };
            frfr.balance = {
                year: 'Année',
                month: 'Mois',
                week: 'Semaine',
                back: 'Retour',
                foward: 'Avancer'
            };
            frfr.employeemanager = {
                employee: 'Employé(e)',
                employeePersonal: 'Données personnelles',
                employeeContract: 'Contrat',
                employeeOrganization: 'Organisation',
                save: 'Enregistrer',
                next: 'Suivant',
                exit: 'Quitter',
                empmanagertitle: 'Création d\'employé(e)s'
            };
            frfr.historiclst = {
                selectoption: 'Sélectionnez une option',
                selectoptionmsg: 'Impossible de générer les listes sans sélectionner une option à afficher'
            };
            frfr.months = {
                1: 'Janvier',
                2: 'Février',
                3: 'Mars',
                4: 'Avril',
                5: 'Mai',
                6: 'Juin',
                7: 'Juillet',
                8: 'Août',
                9: 'Septembre',
                10: 'Octobre',
                11: 'Novembre',
                12: 'Décembre'
            };
            frfr.weekdays = {
                mon: 'Lu',
                tue: 'Ma',
                wed: 'Me',
                thu: 'Je',
                fri: 'Ve',
                sat: 'Sa',
                sun: 'Di'
            };
            frfr.accesspoint = {
                errormsg: 'Code d\'accès non trouvé',
                exit: 'Sortie',
                enter: 'Entrée',
                helloexit: 'Bonjour',
                helloenter: 'Au revoir',
                lastmarking: 'Votre dernière pointage',
                noplanning: 'Vous n\'avez pas de planification pour aujourd\'hui',
                employeeNotFound: 'Employé introuvable',
                accessIdNotFound: 'Code d\'accès introuvable',
            };
            frfr.messages = {
                multipleabsencescalendar: 'Il y a plus d\'un enregistrement de congé/ absence pour cette date, sélectionnez celui que vous voulez ouvrir dans la liste déroulante.',
                markingsunplannedabsences: 'Vous n\'avez sélectionné aucun employé, les pointages seront insérés pour toutes les absences non planifiées. Voulez-vous continuer ?',
                holidaysunplannedabsences: 'Vous n\'avez sélectionné aucun employé, une absence non justifiée sera insérée pour toutes les absences non planifiées. Voulez-vous continuer ?'
            };
            frfr.documents = {
                missingData: 'Données requises non trouvées pour supprimer le document',
                confirmDelete: 'Êtes-vous sûr de vouloir supprimer ce document?',
                deleteSuccess: 'Document supprimé avec succès'
            };
            frfr.workdays = {
                noWorkDaysSelected: 'Aucune journée sélectionnée pour la validation',
                workDaysValidated: 'Journées validées avec succès',
                noWorkDaysSelectedUndo: 'Aucune journée sélectionnée pour annuler la validation',
                workDaysUnvalidated: 'Validation des journées annulée avec succès',
                noWorkDaysSelectedBalance: 'Aucune journée sélectionnée pour consolider le solde',
                workDaysBalanced: 'Solde des journées consolidé avec succès',
                noWorkDaysSelectedBalanceUndo: 'Aucune journée sélectionnée pour annuler le solde',
                workDaysBalanceUndone: 'Solde des journées annulé avec succès',
                changeFestiveWorkedAllEmployeesConfirm: 'Aucun élément sélectionné. Le processus sera exécuté pour tous les employés accessibles. Voulez-vous continuer ?',
                changeFestiveWorkedSuccess: 'Processus exécuté avec succès',
                refreshDayDateBatchConfirm: 'Aucun élément sélectionné. Le processus sera exécuté pour tous les employés accessibles. Voulez-vous continuer ?',
                refreshAllDayDateBatchConfirm: 'Aucun employé sélectionné. Le processus sera exécuté pour tous les employés accessibles sur la période. Voulez-vous continuer ?',
                changePlanificationAllDayDateBatchConfirm: 'Aucun employé sélectionné. La planification sera modifiée pour tous les employés accessibles sur la période. Voulez-vous continuer ?',
                changePlanificationWrapperBatchConfirm: 'Aucun élément sélectionné. La planification sera modifiée pour tous les employés accessibles à cette date. Voulez-vous continuer ?',
                changePlanificationWrapperBatchGroupedConfirm: 'Aucun employé sélectionné. La planification sera modifiée pour tous les employés accessibles sur la période. Voulez-vous continuer ?',
                noEmployeesSelectedCannotExecute: 'Aucun employé sélectionné. Veuillez sélectionner au moins un employé pour exécuter le processus.',
                recalcMetricsDirtyBatchConfirm: 'Aucun élément sélectionné. Les métriques seront recalculées pour toutes les journées sales des employés accessibles à cette date. Voulez-vous continuer ?',
                recalcMetricsDirtyGroupedConfirm: 'Aucun employé sélectionné. Les métriques seront recalculées pour toutes les journées sales des employés accessibles sur la période. Voulez-vous continuer ?',
                recalcMetricsDirtySuccess: 'Journées sales recalculées avec succès.',
                adminRecalcHistoryRangeConfirm: 'Aucun élément sélectionné. Le recalcul complet (métriques et incidents) sera exécuté pour tous les employés accessibles dans la plage de dates. Voulez-vous continuer ?',
                noHeaderDates: 'Aucune date trouvée dans l\'en-tête',
                noModuleOrList: 'Module ou liste introuvable',
                monthly: 'Mensuel',
                weekly: 'Hebdomadaire'
            };
            frfr.dirtylog = {
                calendar: 'Calendrier',
                date: 'Date',
                description: 'Description',
                view: 'Voir',
                type: 'Type',
                datestart: 'Date de début',
                dateend: 'Date de fin',
                reason: 'Motif',
                leavetype: 'Type de congé',
                shift: 'Poste',
                breaksigned: 'Pause signée',
                workonfestive: 'Travail les jours fériés',
                line: 'Ligne',
                starttime: 'Heure de début',
                duration: 'Durée',
                hours: 'heures'
            };
            frfr.heatmap = {
                noData: 'Aucune donnée à afficher',
                less: 'Moins',
                more: 'Plus',
                date: 'Date',
                healthScore: 'Score de santé',
                status: 'État',
                months: 'Jan,Fév,Mar,Avr,Mai,Jun,Jul,Aoû,Sep,Oct,Nov,Déc',
                days: 'Lun,Mar,Mer,Jeu,Ven,Sam,Dim'
            };
            frfr.incidences = {
                selectResolutionType: 'Veuillez sélectionner un type de résolution',
                noResolutionType: 'Impossible d\'obtenir le type de résolution',
                noCurrentReference: 'Impossible d\'obtenir la référence actuelle',
                incidencesResolved: 'Incidents résolus avec succès'
            };
            frfr.projects = {
                deleteweekplan: 'Êtes-vous sûr de vouloir supprimer la planification hebdomadaire ?'
            };
            frfr.onlineapp = {
                welcome: 'Bienvenue sur Sebastian',
                goodbye: 'Au revoir'
            };
            frfr.climatepulse = {
                good: 'Bien',
                neutral: 'Neutre',
                difficult: 'Difficile',
                send: 'Envoyer',
                thanks: 'Merci pour votre partage !',
                'comment.placeholder': 'Commentaire bref optionnel...'
            };
            frfr.testdatawizard = {
                title: 'Générateur de Données Demo',
                detecting: 'Détection...',
                stepConfig: 'Configuration',
                stepPreview: 'Aperçu',
                stepResult: 'Résultat',
                restrictedTitle: 'Accès Restreint',
                restrictedMsg1: 'Des données opérationnelles ont été détectées dans la base de données.',
                restrictedMsg2: 'Pour des raisons de sécurité, <strong>il n\'est pas possible de générer des données de test</strong> sur une installation en cours d\'utilisation.',
                backToHome: 'Retour à l\'accueil',
                sectorLabel: '1. Sélectionnez le Secteur',
                sectorOffices: 'Bureaux',
                sectorManufacturing: 'Fabrication',
                sectorServices: 'Services',
                volumeLabel: '2. Volume d\'Employés',
                volumeHint: 'Faites glisser pour ajuster entre 10 et 200 employés.',
                structureLabel: '3. Options Structurelles',
                multiCompany: 'Multi-entreprise',
                multiOffice: 'Multi-site',
                circuitsLabel: '4. Données à Générer',
                circuitOrg: 'Structure Organisationnelle',
                circuitEmployees: 'Employés et Fiches',
                circuitShifts: 'Quarts et Calendriers',
                circuitAbsences: 'Absences Demo',
                circuitMarkings: 'Pointages Historiques (2 mois)',
                circuitContracts: 'Contrats (PRO)',
                next: 'Suivant',
                previewTitle: 'Révision de la génération',
                previewDesc: 'Veuillez confirmer les données avant de lancer le processus. Ce processus peut prendre quelques secondes.',
                previewSummary: 'Résumé',
                previewSector: 'Secteur :',
                previewStructure: 'Structure :',
                previewVolume: 'Volume :',
                previewEmployeesEst: 'Employés (estimé)',
                previewMode: 'Mode :',
                previewDetails: 'Détails :',
                timeEstimate: 'Temps estimé : <strong>30-60 secondes</strong>. Ne fermez pas cette fenêtre.',
                back: 'Retour',
                generate: 'Générer les Données',
                generating: 'Génération des données...',
                pleaseWait: 'Veuillez patienter',
                successTitle: 'Génération Terminée !',
                companies: 'Entreprises',
                offices: 'Bureaux',
                employees: 'Employés',
                historicYears: 'Années Historiques',
                demoModeTitle: 'Mode démo actif',
                demoModeWarning: 'Tant que des données de test sont présentes dans le système, toute donnée saisie manuellement dans l\'application sera également supprimée en cliquant sur <em>Supprimer les Données</em>. La base de données sera complètement vide.',
                deleteData: 'Supprimer les Données',
                finish: 'Terminer',
                licensePrefix: 'Licence : ',
                testDataActive: 'Données de Test Actives',
                generationComplete: 'Génération terminée',
                confirmDelete: 'Êtes-vous sûr de vouloir SUPPRIMER les données générées ?',
                deletingData: 'Suppression des données...',
                errorGenerating: 'Erreur lors de la génération : ',
                errorDeleting: 'Erreur lors de la suppression : ',
                detailsBase: 'Données de base, Employés, Quarts, Absences',
                detailsMarkings: ', Pointages',
                detailsContracts: ', Contrats',
                structureCompany: '1 Entreprise',
                structureCompanies: ' Entreprises',
                structureOffice: ', 1 Site/Entreprise',
                structureOffices: ' Sites/Entreprise'
            };
        })(frfr = culture.frfr || (culture.frfr = {}));
    })(culture = flexygo.culture || (flexygo.culture = {}));
})(flexygo || (flexygo = {}));
//# sourceMappingURL=language-frfr.js.map