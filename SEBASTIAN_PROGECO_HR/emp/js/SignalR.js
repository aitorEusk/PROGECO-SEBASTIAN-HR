var sebastian;
(function (sebastian) {
    var signalr;
    (function (signalr) {
        function section(e) {
            const sender = e.sender;
            const { event } = sender;
            switch (event) {
                case "section-refreshInsertMarking-module":
                    $('flx-list[modulename=emp_InsertMarking_Home_withLocation]')[0].refresh();
            }
        }
        signalr.section = section;
        function initSignalRInsertMarkingModule() {
            //sebastian.signalr.initSignalRInsertMarkingModule()
            flexygo.events.off($("flx-list[modulename=emp_InsertMarking_Home_withLocation]")[0], 'push', 'updated', sebastian.signalr.section);
            flexygo.events.on($("flx-list[modulename=emp_InsertMarking_Home_withLocation]")[0], 'push', 'updated', sebastian.signalr.section);
        }
        signalr.initSignalRInsertMarkingModule = initSignalRInsertMarkingModule;
    })(signalr = sebastian.signalr || (sebastian.signalr = {}));
})(sebastian || (sebastian = {}));
//# sourceMappingURL=SignalR.js.map