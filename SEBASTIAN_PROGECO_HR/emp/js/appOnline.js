var sebastian;
(function (sebastian) {
    var onlineapp;
    (function (onlineapp) {
        let refreshIntervalApp = null;
        function refreshMarkingTime(elem, MarkingTypeId, HPlanificadas, LastTime, HMarcajes, percentage) {
            clearInterval(refreshIntervalApp);
            let totalSeconds = Math.floor(HMarcajes * 3600);
            const formatTime = (seconds) => {
                const hours = Math.floor(seconds / 3600);
                const minutes = Math.floor((seconds % 3600) / 60);
                return `${hours < 10 ? '0' + hours : hours}h ${minutes < 10 ? '0' + minutes : minutes}min`;
            };
            const safeHPlanificadas = HPlanificadas !== null && HPlanificadas !== void 0 ? HPlanificadas : 0;
            let appChar = $(".app-char")[0];
            if (MarkingTypeId === 'E') {
                const refreshMarkingTimer = () => {
                    const now = new Date();
                    const lastMarkingTimeParts = LastTime.split(':');
                    const lastMarkingDate = new Date();
                    lastMarkingDate.setHours(parseInt(lastMarkingTimeParts[0], 10));
                    lastMarkingDate.setMinutes(parseInt(lastMarkingTimeParts[1], 10));
                    lastMarkingDate.setSeconds(0);
                    lastMarkingDate.setMilliseconds(0);
                    if (lastMarkingDate > now) {
                        lastMarkingDate.setDate(lastMarkingDate.getDate() - 1);
                    }
                    const timeDiffInSeconds = Math.floor((now.getTime() - lastMarkingDate.getTime()) / 1000);
                    totalSeconds = timeDiffInSeconds + Math.floor(HMarcajes * 3600);
                    $(appChar).find('.percentage span').text(formatTime(totalSeconds));
                    totalSeconds++;
                    // Solucionando el problema de Infinity
                    if (safeHPlanificadas > 0) {
                        percentage = Math.floor((totalSeconds / 3600) / safeHPlanificadas * 100);
                        $(appChar).find('.percentage').data('easyPieChart').update(percentage);
                    }
                    else {
                        $('#app-char').html(`<span class="padding-m txt-notify">${flexygo.localization.translate('accesspoint.noplanning')}</span>`);
                    }
                };
                refreshMarkingTimer();
                refreshIntervalApp = setInterval(refreshMarkingTimer, 30000);
            }
            else if (MarkingTypeId === 'S') {
                $(appChar).find('.percentage span').text(formatTime(totalSeconds));
                if (safeHPlanificadas > 0) {
                    percentage = Math.floor((totalSeconds / 3600) / safeHPlanificadas * 100);
                    $(appChar).find('.percentage').data('easyPieChart').update(percentage);
                }
                else {
                    $('span#progress-bar').html(`<span class="padding-m txt-notify">${flexygo.localization.translate('accesspoint.noplanning')}</span>`);
                }
            }
            else {
                $(appChar).find('.percentage span').text('0H 0min');
                $(appChar).find('.percentage').data('easyPieChart').update(0);
            }
            $(elem).on('destroyed', () => {
                clearInterval(refreshIntervalApp);
            });
        }
        onlineapp.refreshMarkingTime = refreshMarkingTime;
        function getHourUTC() {
            const cDate = new Date();
            const cTime = cDate.toLocaleTimeString("es-ES", {
                hour12: false
            });
            let zone;
            try {
                zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            }
            catch (e) {
                const offsetMin = cDate.getTimezoneOffset();
                const symbol = offsetMin <= 0 ? "+" : "-";
                const hours = Math.floor(Math.abs(offsetMin) / 60);
                const minutes = Math.abs(offsetMin) % 60;
                const minutesStr = minutes < 10 ? "0" + minutes : String(minutes);
                zone = minutes === 0 ? `UTC${symbol}${hours}` : `UTC${symbol}${hours}:${minutesStr}`;
            }
            return {
                currentTime: cTime,
                timeZone: zone
            };
        }
        onlineapp.getHourUTC = getHourUTC;
        function execProcessParams(processname, objectname, objectwhere, defaults, module, button, callBack) {
            if (module.find('form').valid()) {
                let props = module.find('[property],[prop]');
                let params = new Array();
                if (props.length > 0) {
                    for (var i = 0; i < props.length; i++) {
                        let prop = $(props[i])[0];
                        params.push({
                            'key': $(prop).attr("property") ? $(prop).attr("property") : $(prop).attr("prop"),
                            'value': prop.getValue()
                        });
                    }
                    flexygo.nav.execProcess(processname, objectname, objectwhere, defaults, params, 'current', true, button, callBack);
                }
                else {
                    flexygo.msg.error(flexygo.localization.translate('flxmodule.noparams'));
                }
            }
            else {
                flexygo.msg.warning(flexygo.localization.translate('flxmodule.requiredrunning'));
            }
        }
        onlineapp.execProcessParams = execProcessParams;
        function registerMarking(IsWorking, EmployeeId, e) {
            let mod = $(e).closest('flx-module')[0];
            let locId = $(mod).find('[property="LocId"]')[0].getValue();
            locId = flexygo.utils.isBlank(locId) ? -1 : parseInt(locId);
            //let projectId = (<HRCombo>$(mod).find('[property="ProjectId"]')[0]).getValue();
            let classId = $(mod).find('[property="MarkClassId"]')[0].getValue();
            let terminalCode = '#APP';
            let currentTimeInfo = getHourUTC();
            if (IsWorking) {
                flexygo.nav.execProcess('HR_p_insertLocatedMarking', '', '', `{'EmployeeId':${EmployeeId}, 'newMarkingType' : 'S', 'LocId' : ${locId}, 'LocTypeField': '', 'MobileVisualization':0
                , 'TerminalCode':'${terminalCode}', 'ClientDeviceTime':'${currentTimeInfo.currentTime}', 'DeviceTimeZoneId':'${currentTimeInfo.timeZone}', 'MarkClassId':${classId} }`, null, 'current', false, $(e), function (res) {
                    debugger;
                    if (res) {
                        if (res.LastException && res.LastException.Message) {
                            flexygo.msg.error(res.LastException.Message);
                        }
                        else if (res.WarningMessage) {
                            flexygo.msg.warning(res.WarningMessage);
                        }
                        else if (res.Success) {
                            let data = res.Data;
                            let markingTime = moment();
                            let formatedTime = markingTime.format("HH:mm");
                            sebastian.onlineapp.showSuccessModal(flexygo.localization.translate('onlineapp.goodbye'), formatedTime, 'flx-icon icon-hand');
                            mod.refresh();
                        }
                    }
                });
            }
            else {
                flexygo.nav.execProcess('HR_p_insertLocatedMarking', '', '', `{'EmployeeId':${EmployeeId}, 'newMarkingType' : 'E', 'LocId' : ${locId}, 'LocTypeField': 'OfficeLocId', 'MobileVisualization':0
            , 'TerminalCode':'${terminalCode}', 'ClientDeviceTime':'${currentTimeInfo.currentTime}', 'DeviceTimeZoneId':'${currentTimeInfo.timeZone}', 'MarkClassId':${classId} }`, null, 'current', false, $(e), function (res) {
                    debugger;
                    if (res) {
                        if (res.LastException && res.LastException.Message) {
                            flexygo.msg.error(res.LastException.Message);
                        }
                        else if (res.WarningMessage) {
                            flexygo.msg.warning(res.WarningMessage);
                        }
                        else if (res.Success) {
                            let data = res.Data;
                            let markingTime = moment();
                            let formatedTime = markingTime.format("HH:mm");
                            sebastian.onlineapp.showSuccessModal(flexygo.localization.translate('onlineapp.welcome'), formatedTime, 'flx-icon icon-checkbox-1');
                            mod.refresh();
                        }
                    }
                });
            }
        }
        onlineapp.registerMarking = registerMarking;
        function showSuccessModal(message, subtitle, icon, duration = 2000) {
            //let template = $(`
            //    <div class="app-modal-overlay">
            //        <div class="app-modal app-message">
            //            <span class="icon"><i class="${icon}"></i></span>
            //            <span class="title">${message}</span>
            //            <span class="sub-title">${subtitle}</span>
            //            <div class="app-progress-bar"></div>
            //        </div>
            //    </div>
            //`);
            let template = $(`
            <span class="icon"><i class="${icon}"></i></span>
            <span class="title">${message}</span>
            <span class="sub-title">${subtitle}</span>
        `);
            showsModal(template, "app-message", 45, duration);
        }
        onlineapp.showSuccessModal = showSuccessModal;
        function showsModal(template, customClass, height = 40, duration = 2000) {
            const $overlay = $(`<div class="app-modal-overlay">
                <div class="app-modal ${customClass}" style="height:${height}%;">
                    <div class="app-progress-bar"></div>
                    <div class="app-modal-template"></div>
                </div>
            </div>`);
            $overlay.find('.app-modal .app-modal-template').append(template);
            $("body").append($overlay);
            const $modal = $overlay.find(".app-modal");
            const $progress = $overlay.find(".app-progress-bar");
            setTimeout(() => {
                $overlay.addClass("app-modal-show");
                $modal.addClass("app-modal-show");
                $progress.css({
                    "transition": `width ${duration}ms linear`,
                    "width": "100%"
                });
            }, 50);
            const hideTimeout = setTimeout(() => closeModal(), duration);
            function closeModal() {
                clearTimeout(hideTimeout);
                $modal.removeClass("app-modal-show");
                setTimeout(() => {
                    $overlay.removeClass("app-modal-show");
                    setTimeout(() => $overlay.remove(), 400);
                }, 300);
            }
            $overlay.on("click", function (e) {
                if (e.target === this)
                    closeModal();
            });
        }
        onlineapp.showsModal = showsModal;
        function initialInstancesTabs(element) {
            let main = $(element).closest("main");
            setTimeout(() => {
                let instances = $(main).find('flx-module[modulename="app_Instances_Types_Tabs"] ul li');
                if (instances.length > 0) {
                    $(instances[0]).click();
                }
            }, 200);
        }
        onlineapp.initialInstancesTabs = initialInstancesTabs;
        function showInstances(typeId, element) {
            let main = $(element).closest("main");
            $(main).find('flx-module:not([modulename="app_Instances_Types_Tabs"])').hide();
            const moduleName = {
                "1": "app_Instance_AddMarking",
                "2": "app_Instance_ModifyMarking"
            };
            let module = $(main).find(`flx-module[modulename="${moduleName[typeId.toString()]}"]`);
            $(module).find("flx-list")[0].init();
            $(module).show();
            $(element).parent().find("li").removeClass("active");
            $(element).addClass("active");
        }
        onlineapp.showInstances = showInstances;
        function showMarkingLines(employeeId, dayDate, element) {
            let template = $(`<flx-module mode="list" class="empty last-module-margin">
                            <flx-list mode="list" objectname="emp_markings" objectwhere="(Markings.EmployeeId=${employeeId} AND Markings.DateJourney='${dayDate}')" 
                            modulename="app_MarkingsDaily_Simple"></flx-list>
                        </flx-module>`);
            showsModal(template, "", 85, 100000);
        }
        onlineapp.showMarkingLines = showMarkingLines;
        function showModifyMarkingForm(regId, element) {
            let template = $(`<flx-module mode="list" class="empty last-module-margin">
                            <flx-list mode="list" objectname="HR_Markings" objectwhere="vHR_Markings.RegId=${regId}" modulename="app_Marking_Modify"></flx-list>
                        </flx-module>`);
            showsModal(template, "", 80, 100000);
        }
        onlineapp.showModifyMarkingForm = showModifyMarkingForm;
        function modifyMarking(e) {
            let mod = $(e).closest("flx-module");
            sebastian.onlineapp.execProcessParams("hr_InstanceModifyMarking", "", "", null, mod, $(e));
        }
        onlineapp.modifyMarking = modifyMarking;
        class HRSwiper extends HTMLElement {
            constructor() {
                super();
                this.swiperTemplate = `
      <div class="hr-swipe-container">
        <div class="hr-swipe-fill"></div>
        <div class="hr-swipe-text">{{text}}</div>
        <div class="hr-swipe-button"><i class="{{icon}}"></i></div>
        <input type="hidden" value="0">
      </div>`;
                this.baseWidth = 0;
                this.startX = 0;
                this.currentX = 0;
                this.isSwiping = false;
                this.updateMaxMove = () => {
                    this.maxMove = Math.max(0, this.container.width() - this.button.width() - 8);
                    //this.baseWidth = (100 * this.button.width() + 8) / this.container.width();
                    this.baseWidth = 0;
                };
            }
            connectedCallback() {
                let me = $(this);
                this.text = me.attr("SwiperText");
                this.icon = me.attr("SwiperIcon");
                this.init();
                $(window).on('resize.swipeButton', this.updateMaxMove);
            }
            init() {
                this.paintLoading();
                setTimeout(() => {
                    this.render();
                    this.setConfig();
                    this.mainEvents();
                }, 200);
            }
            setConfig() {
                this.container = $(this).find('.hr-swipe-container');
                this.button = $(this).find('.hr-swipe-button');
                this.fill = $(this).find('.hr-swipe-fill');
                this.input = $(this).find('input');
                setTimeout(this.updateMaxMove, 50);
                //this.maxMove = this.container.width() - this.button.width() - 8;
            }
            render() {
                let me = $(this);
                let json = {
                    text: this.text,
                    icon: this.icon
                };
                let fullTemplate = flexygo.utils.parser.compile(json, this.swiperTemplate);
                me.html(fullTemplate);
            }
            mainEvents() {
                let self = this;
                let me = $(self);
                this.button.on('mousedown.swipe touchstart.swipe', function (e) {
                    var clientX = e.type === 'mousedown' ? e.clientX : e.originalEvent.touches[0].clientX;
                    self.startSwipe(clientX);
                    if (e.type === 'touchstart')
                        e.preventDefault();
                });
                $(window).on('mousemove.swipe touchmove.swipe', function (e) {
                    //if (!this.isSwiping) return;
                    var clientX = e.type === 'mousemove' ? e.clientX : e.originalEvent.touches[0].clientX;
                    self.moveSwipe(clientX);
                    if (e.type === 'touchmove')
                        e.preventDefault();
                });
                $(window).on('mouseup.swipe touchend.swipe touchcancel.swipe', function () {
                    if (self.isSwiping)
                        self.endSwipe();
                });
            }
            updateValue(val) {
                if (this.input.val() !== val.toString()) {
                    this.input.val(val).trigger('change');
                }
            }
            startSwipe(x) {
                this.startX = x;
                this.isSwiping = true;
                this.button.css('transition', 'none');
                this.fill.css('transition', 'none');
            }
            moveSwipe(x) {
                if (!this.isSwiping)
                    return;
                this.currentX = x - this.startX;
                if (this.currentX < 0)
                    this.currentX = 0;
                if (this.currentX > this.maxMove)
                    this.currentX = this.maxMove;
                this.button.css('left', 4 + this.currentX + 'px');
                //this.baseWidth = 0;
                var dynamicWidth = this.baseWidth + (this.currentX / this.maxMove) * (100 - this.baseWidth);
                this.fill.css('width', dynamicWidth + '%');
            }
            endSwipe() {
                this.button.css('transition', 'left 0.3s ease');
                this.fill.css('transition', 'width 0.3s ease, background 0.3s ease');
                if (this.currentX >= this.maxMove * 0.9) {
                    this.button.css('left', this.maxMove + 4 + 'px');
                    this.fill.css({ 'width': '100%', 'background': '#2d5655' });
                    this.container.addClass('validated');
                    this.updateValue(1);
                }
                else {
                    this.button.css('left', '4px');
                    this.fill.css({ 'width': '0%', 'background': '#2d5655' });
                    this.container.removeClass('validated');
                    this.updateValue(0);
                }
                this.isSwiping = false;
                this.currentX = 0;
            }
            getValue() {
                return this.input.val();
            }
            paintLoading() {
                let containerItem = $(this).find(".hr-ahorafichador-selector");
                containerItem.addClass('flx-relative');
                containerItem.find("> *").addClass("flx-opacity");
                if (containerItem.find('> #flx-dependency-loader').length == 0) {
                    containerItem.append('<div id="flx-dependency-loader"></div>');
                }
            }
            removeLoading() {
                let containerItem = $(this).find(".hr-ahorafichador-selector");
                if (containerItem.length > 0) {
                    containerItem.find('> #flx-dependency-loader').remove();
                    containerItem.find("> *").removeClass('flx-relative flx-opacity');
                }
            }
            disconnectedCallback() {
                $(window).off('.swipe touchmove.swipe mousemove.swipe mouseup.swipe touchend.swipe touchcancel.swipe');
                $(window).off('resize.swipeButton', this.updateMaxMove);
            }
        }
        onlineapp.HRSwiper = HRSwiper;
        class HRCombo extends HTMLElement {
            constructor() {
                super();
                this.comboTemplate = `
          <div class="app-selected-control">
            <span class="app-control-label">{{label}}</span>
            <div class="control">
                <span class="text">{{placeholder}}</span>
                <span class="selected-icon">
                    <i class="flx-icon icon-order-down-1 icon-rotate-180"></i>
                    <i class="flx-icon icon-order-down-1 "></i>
                </span>
                <input type="hidden"/>
            </div>
        </div>`;
            }
            connectedCallback() {
                let me = $(this);
                this.controlid = flexygo.utils.uniqueUUID();
                this.label = me.attr("Label");
                this.placeholder = me.attr("Placeholder");
                this.icon = me.attr("IconClass");
                this.property = me.attr("Property");
                this.objectName = me.attr("ObjectName");
                this.objectWhere = me.attr("ObjectWhere");
                this.viewName = me.attr("ViewName");
                this.valueField = me.attr("ValueField");
                this.descripField = me.attr("DescripField");
                this.defaultValue = me.attr("DefaultValue");
                this.defaultValueText = me.attr("DefaultValueText");
                if (flexygo.utils.isBlank(this.defaultValue) || this.defaultValue.includes("{{")) {
                    this.defaultValue = "";
                    this.defaultValueText = "";
                    me.addClass("hr-empty");
                }
                me.removeAttr("ObjectWhere");
                this.init();
            }
            init() {
                setTimeout(() => {
                    this.render();
                    this.mainEvents();
                }, 200);
            }
            render() {
                let me = $(this);
                //let text = (flexygo.utils.isBlank(this.defaultValue)) ? this.placeholder : this.defaultValueText;
                let json = {
                    label: this.label,
                    placeholder: this.placeholder
                };
                let fullTemplate = flexygo.utils.parser.compile(json, this.comboTemplate);
                me.html(fullTemplate);
                this.control = $(this).find('.control');
                this.input = $(this).find('input');
                me.attr("controlid", this.controlid);
                if (!flexygo.utils.isBlank(this.defaultValue))
                    this.setValue(this.defaultValue, this.defaultValueText, false);
            }
            mainEvents() {
                let self = this;
                let me = $(self);
                this.control.off('click').on('click', (e) => {
                    let modalTemplate = $(`<div class="row" style="overflow:auto;">
                    <hr-selector property="${self.property}" ObjectName="${self.objectName}" ObjectWhere="${self.objectWhere}" ViewName="${self.viewName}" ValueField="${self.valueField}" 
                            DescripField="${self.descripField}" Legend="${self.placeholder}" DefaultValue="${self.getValue()}" AdditionalClass="dflex-column" required></hr-selector>
                </div>`);
                    $(modalTemplate).find('hr-selector').off('change').on('change', (e) => {
                        debugger;
                        let sel = e.currentTarget;
                        let currentValue = sel.getValue();
                        let currentText = $(sel).find(".hr-option-title").html();
                        self.setValue(currentValue, currentText);
                        // Cerramos el modal
                        $(sel.closest('.app-modal-overlay')).click();
                    });
                    showsModal($(modalTemplate), "", 50, 100000);
                });
            }
            setValue(newValue, newText, isChange = true) {
                let me = $(this);
                me.find("input").val(newValue);
                me.attr("value", newValue);
                me.find(".text").html(newText);
                me.removeClass("hr-empty");
                if (isChange) {
                    $(me).trigger("change");
                }
            }
            getValue() {
                return $(this).attr("value") == undefined ? null : $(this).attr("value");
            }
            disconnectedCallback() {
            }
        }
        onlineapp.HRCombo = HRCombo;
        class HRSelector extends HTMLElement {
            constructor() {
                super();
                this.selectorTemplate = `<div class="hr-option {{IsSelected|bool:active,}}" objectid="{{ObjectId}}">
                        <i class="hr-option-icon flx-icon icon-point-2 txt-muted"></i>
                        <i class="hr-option-icon-bg {{Icon|isnull:hidden}}"></i>
                        <div class="hr-option-title">{{Descrip}}</div>
                        <div class="hr-option-subtitle {{SubDescrip|isnull:hidden,}}">{{SubDescrip}}</div>
                    </div>`;
                this.emptyTemplate = `<div class="row hr-markings-placeholder">
                            <div class="app-empty-container">
                                <i class="flx-icon icon-information-3"></i>
                                <h2 class="txt-muted margin-top-xxl" style="font-size:16px;">${flexygo.localization.translate('flxlist.noentriesfound')}</h2>
                            </div>
                        </div>
                        `;
                this.objectwhere = null;
                this.viewName = null;
                this.valuefield = null;
                this.descripfield = null;
                this.subdescripfield = null;
                this.icon = null;
                this.defaultValue = null;
                this.data = null;
                this.selecteddata = new Array();
                this.multiselect = false;
            }
            connectedCallback() {
                let me = $(this);
                let multi = me.attr("multiselect");
                this.multiselect = multi == undefined || multi.toLowerCase() == "false" ? false : true;
                this.objectname = me.attr("ObjectName");
                //this.objectwhere = me.attr("ObjectWhere");
                this.additionalClass = me.attr("AdditionalClass");
                this.viewName = me.attr("ViewName");
                this.valuefield = me.attr("valueField");
                this.descripfield = me.attr("DescripField");
                this.subdescripfield = me.attr("SubDescripField");
                this.icon = me.attr("Icon");
                this.defaultValue = me.attr("DefaultValue") ? me.attr("DefaultValue") : "";
                if (me.attr("ManualInit") != 'true' && !me.hasClass("loading")) {
                    me.addClass("loading");
                    this.init();
                }
                //remove duplicated values
                me.removeAttr("DefaultValue");
            }
            attributeChangedCallback(attrName, oldVal, newVal) {
                oldVal = flexygo.utils.isBlank(oldVal) ? "" : oldVal;
                newVal = flexygo.utils.isBlank(newVal) ? "" : newVal;
                if (this.isConnected && oldVal !== newVal) {
                    if (attrName == 'objectwhere' && $(this).attr("objectwhere") !== undefined)
                        this.init();
                }
            }
            init() {
                this.paintLoading();
                setTimeout(() => {
                    //if (this.selecteddata.length==0) {
                    if ($(this).length > 0) {
                        $(this).attr("value", null);
                        this.selecteddata = new Array();
                        if ($(this).find('.hr-option').length > 0) {
                            this.setValue(this.defaultValue);
                        }
                        else {
                            this.data = null;
                            this.render();
                            this.mainEvents();
                        }
                        $(this).removeClass("loading");
                    }
                    //}
                }, 200);
            }
            clear() {
                let me = $(this);
                me.html("");
            }
            render() {
                let me = $(this);
                this.objectwhere = me.attr("ObjectWhere");
                //me.removeAttr("ObjectWhere");
                let isRequired = !flexygo.utils.isBlank(me.attr("required")) ? 'required' : '';
                let legendTemplate = !flexygo.utils.isBlank(me.attr("legend")) ? `<label data-tag="label" class="padding-top-m ${isRequired}">${me.attr("legend")}<span>:</span></label>` : "";
                let container = $(`${legendTemplate}<div class="hr-ahorafichador-selector flex-wrap ${this.additionalClass}"></div>`);
                me.html(container);
                this.renderItems();
            }
            renderItems() {
                let me = $(this);
                let view = new flexygo.obj.Entity(this.objectname, "");
                this.data = view.getView(this.viewName, 0, 100, this.objectwhere);
                let vals = this.defaultValue.toString().split("|");
                if (this.data.length > 0) {
                    this.data.forEach((valor, i) => {
                        let data = new Map();
                        data.set("ObjectId", !flexygo.utils.isBlank(this.valuefield) ? valor[this.valuefield] : null);
                        data.set("Descrip", !flexygo.utils.isBlank(this.descripfield) ? valor[this.descripfield] : null);
                        data.set("SubDescrip", !flexygo.utils.isBlank(this.subdescripfield) ? valor[this.subdescripfield] : null);
                        data.set("Icon", !flexygo.utils.isBlank(this.icon) ? valor[this.icon] : null);
                        if (vals.includes(valor[this.valuefield].toString())) {
                            data.set("IsSelected", 1);
                            this.setValue(valor[this.valuefield].toString(), false, true);
                            //me.attr("value", this.defaultValue)
                            //this.selecteddata = this.data.find(obj => obj[this.valuefield].toString() === this.defaultValue.toString());
                        }
                        else {
                            data.set("IsSelected", 0);
                        }
                        let json = [...data].reduce((acc, [key, value]) => {
                            acc[key] = value;
                            return acc;
                        }, {});
                        let itemTemplate = $(flexygo.utils.parser.compile(json, this.selectorTemplate));
                        me.find(".hr-ahorafichador-selector").append(itemTemplate);
                        this.removeLoading();
                    });
                }
                else {
                    me.find(".hr-ahorafichador-selector").append(this.emptyTemplate);
                    me.find('[data-tag="label"]').hide();
                }
            }
            mainEvents() {
                let me = $(this);
                if (me.attr("disabled") == undefined) {
                    me.find('.hr-option').off('click').on('click', (e) => {
                        let currentItem = $(e.target).attr("objectid") ? $(e.target) : $(e.target).closest('.hr-option');
                        let currentVal = currentItem.attr("objectid");
                        let isSelected = currentItem.hasClass("active") ? false : true;
                        this.setValue(currentVal, true, isSelected);
                    });
                }
            }
            setValue(newValue, isChange = true, isSelected = true) {
                let me = $(this);
                if (!this.multiselect && isChange)
                    me.find(".hr-option.active").removeClass("active");
                if (!isSelected && this.multiselect) {
                    this.selecteddata = this.selecteddata.filter(obj => obj[this.valuefield].toString() !== newValue.toString());
                    me.find(`.hr-option[objectid="${newValue}"]`).removeClass("active");
                }
                else {
                    if (!flexygo.utils.isBlank(newValue)) {
                        let currentElement = this.data.find(obj => obj[this.valuefield].toString() === newValue.toString());
                        if (this.multiselect) {
                            this.selecteddata.push(currentElement);
                        }
                        else {
                            this.selecteddata = [currentElement];
                        }
                        me.find(`.hr-option[objectid="${newValue}"]`).addClass("active");
                    }
                }
                let newval = this.selecteddata.map(obj => obj[this.valuefield]).join('|');
                me.attr("value", newval);
                if (isChange) {
                    $(me).trigger("change");
                    this.removeLoading();
                }
            }
            getValue() {
                return $(this).attr("value") == undefined ? null : $(this).attr("value");
            }
            paintLoading() {
                let containerItem = $(this).find(".hr-ahorafichador-selector");
                containerItem.addClass('flx-relative');
                containerItem.find("> *").addClass("flx-opacity");
                if (containerItem.find('> #flx-dependency-loader').length == 0) {
                    containerItem.append('<div id="flx-dependency-loader"></div>');
                }
            }
            removeLoading() {
                let containerItem = $(this).find(".hr-ahorafichador-selector");
                if (containerItem.length > 0) {
                    containerItem.find('> #flx-dependency-loader').remove();
                    containerItem.find("> *").removeClass('flx-relative flx-opacity');
                }
            }
            paintLoadingItem(e) {
                let containerItem = $(e).attr("objectid") ? $(e) : $(e).closest('.hr-option');
                containerItem.addClass('flx-relative');
                containerItem.find("*").addClass("flx-opacity");
                if (containerItem.find('#flx-dependency-loader').length == 0) {
                    containerItem.append('<div id="flx-dependency-loader"></div>');
                }
            }
            removeLoadingItem(e) {
                let containerItem = $(e).attr("objectid") ? $(e) : $(e).closest('.hr-option');
                if (containerItem.length > 0) {
                    containerItem.find('#flx-dependency-loader').remove();
                    containerItem.find("*").removeClass('flx-relative flx-opacity');
                }
            }
            disconnectedCallback() {
            }
        }
        HRSelector.observedAttributes = ['objectwhere'];
        onlineapp.HRSelector = HRSelector;
    })(onlineapp = sebastian.onlineapp || (sebastian.onlineapp = {}));
})(sebastian || (sebastian = {}));
window.customElements.define("hr-swiper", sebastian.onlineapp.HRSwiper);
window.customElements.define("hr-selector", sebastian.onlineapp.HRSelector);
window.customElements.define("hr-combo", sebastian.onlineapp.HRCombo);
//# sourceMappingURL=appOnline.js.map