var Access = Access || {};
Access.Access = Access.Access || {};

Access.Access._markingInProgress = false;

// CLICK ON ENTER OR EXIT
Access.Access.Marking = async function (EmployeeId, TerminalCode, MarkingType, e) {

    if (Access.Access._markingInProgress) return false;
    Access.Access._markingInProgress = true;

    try {

    var location = await flexygo.gps.getCoords(10000, 10);
    var lat = location.coords.latitude;
    var long = location.coords.longitude;
    var latlong = lat + "," + long;
    var locationSetting = await flexygo.sql.getValue('SELECT Content FROM Settings WHERE IdSettings = ?', ['RequestLocation']);
    var IdLocation = null; // Valor por defecto

    // Verificar si se requiere validación de ubicación (solo para entrada)
    if (locationSetting.toString() === '1' && MarkingType.toLowerCase() === 'e') {
        var hasLocation = false;
        var locations = await flexygo.sql.getTable('SELECT * FROM Locations');

        if (locations.rows && locations.rows.length > 0) {
            for (let i = 0; i < locations.rows.length; i++) {
                let row = flexygo.sql.getRow(locations, i);

                var checkRadius = await Access.utils.coordInRadius(row.Latitude, row.Longuitude, lat, long, row.Radius);
                if (checkRadius) {
                    hasLocation = true;
                    IdLocation = row.LocId;
                    break;
                }
            }
        }

        // Si no está en ninguna ubicación válida, redirigir
        if (!hasLocation) {
            flexygo.nav.goList('Offline_HR-Location', 'offline_location_nocoordinates');
            Access.Access._markingInProgress = false;
            return false;
        }
    }

    // Para salida: si no se determinó ubicación, heredar la de la última entrada
    if (MarkingType.toUpperCase() === 'S' && IdLocation === null) {
        var lastEntryLocId = await flexygo.sql.getValue(
            'SELECT LocId FROM Markings WHERE EmployeeId = ? AND MarkingTypeId = ? ORDER BY CheckTime DESC LIMIT 1',
            [EmployeeId, 'E']
        );
        if (lastEntryLocId !== null && lastEntryLocId !== undefined) {
            IdLocation = lastEntryLocId;
        }
    }

    // Crear parámetros y ejecutar proceso
    let params = {
        'ClientDeviceTime': flexygo.utils.currentDateTime(),
        'DeviceTimeZoneId': Intl.DateTimeFormat().resolvedOptions().timeZone,
        'EmployeeId': EmployeeId,
        'LocId': IdLocation,
        'LocTypeField': null,
        'MarkClassId': 0,
        'MobileVisualization': false,
        'newMarkingType': MarkingType,
        'TerminalCode': TerminalCode,
        'Location': latlong,
    };

    flexygo.api.execProcess('HR_p_insertLocatedMarking', params)
        .then(() => {
            flexygo.nav.goHome();
            Access.Access.sendMarkings();
        })
        .catch((err) => {
            flexygo.msg.showError(err);
        })
        .finally(() => {
            Access.Access._markingInProgress = false;
        });

    return true;

    } catch (err) {
        Access.Access._markingInProgress = false;
        flexygo.msg.showError(err);
        return false;
    }
};



// SAVE MARKING NO COORDINATES	
Access.Access.saveMarkingNoCoordinates = async function (EmployeeId, TerminalCode, MarkingType, LocId, e) {

    if (Access.Access._markingInProgress) return false;
    Access.Access._markingInProgress = true;
    var Closed = 0;
    var NoPrice = 0;
    var id = 0;
    var LocationId = LocId;

    // Usar IDs negativos para evitar colisiones con la secuencia del servidor
    var minNegativeId = await flexygo.sql.getValue('SELECT MIN(RegId) FROM Markings WHERE RegId < 0');
    id = (minNegativeId && minNegativeId < 0) ? minNegativeId - 1 : -1;
    flexygo.sql.execSQL("INSERT INTO Markings(RegId, CheckTime, MarkingTypeId, EmployeeId, TerminalCode, InsertedBy, UpdateBy, Inserted, LastUpdate, LocId, _isInserted, Closed, NoPrice) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", [id, flexygo.utils.currentDateTime(), MarkingType, EmployeeId, TerminalCode, EmployeeId, EmployeeId, flexygo.utils.currentDateTime(), flexygo.utils.currentDateTime(), LocationId, 1, Closed, NoPrice])
        .then(() => {
            if (MarkingType == 'E') {
                $('.btnEntrada').hide();
                $('.btnSalida').show();
                $('.time-label').show();
                $('.notime-label').hide();
                //  Access.Access.calculateTimeWorked(EmployeeId);
            }
            flexygo.nav.goHome();
            Access.Access.sendMarkings();

        })
        .catch((err) => {
            flexygo.msg.showError(err);
        })
        .finally(() => {
            Access.Access._markingInProgress = false;
        });

    return true;
};

// SAVE MARKING WITH COORDINATES	
Access.Access.saveMarkingWithCoordinates = async function (EmployeeId, TerminalCode, MarkingType, LocId, e) {

    if (Access.Access._markingInProgress) return false;
    Access.Access._markingInProgress = true;
    var location = await flexygo.gps.getCoords(10000, 10);
    var lat = location.coords.latitude;
    var long = location.coords.longitude;
    var latlong = '';
    latlong = latlong.concat(lat, ",", long);

    var Closed = 0;
    var NoPrice = 0;
    var id = 0;
    var LocationId = LocId;
    // Usar IDs negativos para evitar colisiones con la secuencia del servidor
    var minNegativeId = await flexygo.sql.getValue('SELECT MIN(RegId) FROM Markings WHERE RegId < 0');
    id = (minNegativeId && minNegativeId < 0) ? minNegativeId - 1 : -1;

    flexygo.sql.execSQL("INSERT INTO Markings(RegId, CheckTime, MarkingTypeId, EmployeeId, TerminalCode, InsertedBy, UpdateBy, Inserted, LastUpdate,Location, LocId, _isInserted, Closed, NoPrice) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [id, flexygo.utils.currentDateTime(), MarkingType, EmployeeId, TerminalCode, EmployeeId, EmployeeId, flexygo.utils.currentDateTime(), flexygo.utils.currentDateTime(), latlong, LocationId, 1, Closed, NoPrice])
        .then(() => {
            if (MarkingType == 'E') {
                $('.btnEntrada').hide();
                $('.btnSalida').show();
                $('.time-label').show();
                $('.notime-label').hide();
                //  Access.Access.calculateTimeWorked(EmployeeId);
            }
            flexygo.nav.goHome();
            Access.Access.sendMarkings();
        })
        .catch((err) => {
            flexygo.msg.showError(err);
        })
        .finally(() => {
            Access.Access._markingInProgress = false;
        });


    return true;
};

// INVERT COORDINATES
Access.Access.invertCoordinates = async function (location) {
    var coords = location.split(',');
    return coords[1] + ',' + coords[0];
};

// CHECK IF HAS WORKED TODAY
Access.Access.checkWorkingToday = async function (EmployeeId) {
    const today = new Date().toISOString().slice(0, 10);
    const result = await flexygo.sql.getValue('SELECT CheckTime FROM markings WHERE MarkingTypeId = ? AND EmployeeId = ? AND DATE(CheckTime) = ? LIMIT 1', ['E', EmployeeId, today]);
    if (!!result) {
        $('.noMarking').hide();
        return 'hidden';
    } else {
        return 'visible';
    }
};

Access.Access.checkWorkingTodayHidden = async function (EmployeeId) {
    const today = new Date().toISOString().slice(0, 10);
    const result = await flexygo.sql.getValue('SELECT CheckTime FROM markings WHERE MarkingTypeId = ? AND EmployeeId = ? AND DATE(CheckTime) = ? LIMIT 1', ['E', EmployeeId, today]);
    if (!!result) {
        return 'visible';
    } else {
        return 'hidden';
    }
};

Access.Access.getPhoto = async function () {
    let userPhoto = await flexygo.sql.getValue(`SELECT Photo as [flxpath|Offline_emp_Employee|Photo] FROM emp_EmployeeData WHERE EmployeeId = ${flexygo.conftoken.user.currentReference}`);

    if (userPhoto === null) {
        return userPhoto = Access.utils.returnResource("avatar_blank");
    } else {
        return getFullUrl(userPhoto);
    }
};

async function getFullUrl(url) {

    let token = await flexygo.api.connect();
    url = token.url + url.substring(1);
    return url;
}

Access.Access.infoEmpleadoConectado = async function () {
    let sqlMat = `select EmployeeId, Name from Employees where EmployeeId = ${flexygo.conftoken.user.currentReference}`;

    let tbl = await flexygo.sql.getTable(sqlMat);
    let container = $("<div></div>");
    if (tbl && tbl.rows.length > 0) {
        for (let i = 0; i < tbl.rows.length; i++) {
            let row = flexygo.sql.getRow(tbl, i);

            //            container.append(`
            //    <div>
            //        <ion-grid>
            //            <ion-row style="align-items: center; margin-bottom: -10px;width: 100%;padding-top: 35px;">
            //                <ion-col size="2">
            //                    <img style="border-radius: 25%; vertical-align: middle; width: 120%;" src="${await Access.Access.getPhoto()}">
            //                </ion-col>
            //                <ion-col size="10">
            //                    <span>
            //                        <h3 style="font-size: 1.5em;"> </h3>
            //                    </span>
            //                </ion-col>
            //            </ion-row>
            //        </ion-grid>
            //    </div>
            //`);

            container.append(`
            <ion-item>
            <ion-grid style="padding: unset;">
                    <ion-row>
                    <ion-col size="2" class="flex-vertical-center">
                    <img style="vertical-align: middle"  class="img-circle resposive ${Access.utils.isNull(Access.utils.findResource('avatar_blank')) ? '' : 'resource-photo'}" width="35px" src="${await Access.Access.getPhoto()}">
                    </ion-col>
                        <ion-col size="10" class="ion-no-padding ion-no-margin">

                        <ion-text class="flex-vertical-center" color="primary">{{translate|Hola}} &nbsp;<b>${row.Name}!</b></ion-text>

                        </ion-col>
                    </ion-row>
                </ion-grid>
                </ion-item>
            `);


        }
    }

    return container.html();
};

Access.Access.changeDate = function (val) {
    let fecha = moment(val);
    fecha = fecha.format("YYYY-MM-DD");
    let EmployeeId = `${flexygo.conftoken.user.currentReference}`;

    flexygo.nav.transferList('Offline_emp_Marking', 'Offline_emp_Marking_List', `Markings.EmployeeId='${EmployeeId}' AND DATE(Markings.CheckTime)=DATE('${fecha}')`, { filtered: '' + fecha });
};

Access.Access.sendMarkings = async function () {

    let opts = {
        partialSend: false,
        partialSync: true,
        syncTables: ['Markings'],
        syncViews: []
    };

    flexygo.sync.sendData(opts);

};

Access.Access.refreshMarkings = async function () {

    let isSync = await flexygo.storage.get('IsSync');
    if (Access.utils.isNull(isSync)) {
        let jsCode = null;
        let opts = {
            partialSend: false,
            partialSync: true,
            syncTables: ['Markings'],
            syncViews: []
        };

        //$('body').append(`<ion-loading trigger="open-loading" message="Loading..." duration="3000000" spinner="circles"></ion-loading>`);
        jsCode = 'Access.Access.refreshMarkings_After();';

        flexygo.sync.syncData(false, jsCode, opts);
    } else {
        await flexygo.storage.set('IsSync', null);
    }
    //if (hasChangeMarking || hasChangeNews) {
    //    flexygo.sync.sendData(opts);
    //} else {
    //    flexygo.sync.syncData(false, null, opts);
    //}

};

Access.Access.refreshMarkings_After = async function () {

    await flexygo.storage.set('IsSync', 1);
    flexygo.nav.goList('Offline_emp_Marking', 'Offline_emp_Fichar', `Markings.EmployeeId=${flexygo.conftoken.user.currentReference}`, null);
};

Access.Access.getMap = function (Long, Lat) {
    Long = parseFloat(Long);
    Lat = parseFloat(Lat);

    let ZoomLongitude = Long + 0.004;
    let ZoomLatitude = Lat + 0.015;
    let mapUrl = "https://www.openstreetmap.org/export/embed.html?bbox=" + Long + "," + Lat + "," + ZoomLongitude + "," + ZoomLatitude + "&amp;layer=mapnik&amp;marker=" + Lat + "," + Long;

    return mapUrl;
};

