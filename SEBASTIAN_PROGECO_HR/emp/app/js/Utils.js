var Access = Access || {};
Access.utils = Access.utils || {};

Access.utils.findResource = function (resourceName) {
    let resources = flexygo.conftoken.resources;
    let validResource;
    resources.forEach((resource) => {
        if (resource.FileName == resourceName) {
            validResource = resource;
        }
    });

    return validResource;
};

Access.utils.returnResource = function (resourceName) {
    let res = Access.utils.findResource(resourceName);
    if (res != undefined) {
        return (b64 = "data:" + res.MimeType + ";base64," + res.B64);
    } else { return ""; }

};

Access.utils.isNull = function (text) {
    if (text == null || text == undefined || text == "") {
        return true;
    }
    else {
        return false;
    }
};

Access.utils.tableHasChanges = async function (tableName) {
    let changesMarkings = await flexygo.sql.getValue(`SELECT COUNT(*) FROM ${tableName} WHERE _isInserted=1 OR _isUpdated=1 OR _isDeleted=1`);

    return (changesMarkings > 0 ? 1 : 0);
};


/******** FUNCIONES DE MAPA ********/
Access.utils.toRadianes = function (grados) {
    return grados * (Math.PI / 180);
};

Access.utils.calculateDistance = function (lat1, lon1, lat2, lon2) {
    const earthRadius = 6371000; // Radio de la Tierra en metros

    let dLat = Access.utils.toRadianes(lat2 - lat1);
    let dLon = Access.utils.toRadianes(lon2 - lon1);

    let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(Access.utils.toRadianes(lat1)) * Math.cos(Access.utils.toRadianes(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    let distanceInMeters = earthRadius * c;
    return distanceInMeters;
}

Access.utils.coordInRadius = function (lat1, lon1, lat2, lon2, radius) { // Radio en metros
    let distance = Access.utils.calculateDistance(lat1, lon1, lat2, lon2);
    return distance <= radius;
};

