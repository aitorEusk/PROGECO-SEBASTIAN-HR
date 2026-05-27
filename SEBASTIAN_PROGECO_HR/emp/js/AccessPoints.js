var sebastian;
(function (sebastian) {
    var accesspoint;
    (function (accesspoint) {
        let insertingMarking = false;
        function clickNumber(value, elem) {
            let codeInput = $('#accesscode');
            codeInput.val(function (i, val) {
                return val + value;
            });
            codeInput.focus();
            restartEmployee();
        }
        accesspoint.clickNumber = clickNumber;
        function restartEmployee() {
            $('#ap-emp-elems').empty();
            $('#insertmarking-tr').addClass('hide');
            $('#validate-tr').removeClass('hide');
        }
        accesspoint.restartEmployee = restartEmployee;
        function eraseCode(elem) {
            let codeInput = $('#accesscode');
            codeInput.val('');
            codeInput.focus();
            restartEmployee();
        }
        accesspoint.eraseCode = eraseCode;
        function getLastMarking(employeeId) {
            let process = new flexygo.Process('emp_AccessPoints_GetLastMarkingEmployee', null, null);
            let params = [
                { 'Key': 'EmployeeId', 'Value': employeeId } // Cambiamos el 'key':EmployeeId por 'key':AccessId
            ];
            process.run(params, (response) => {
                if (response) {
                    if (response.Data) {
                        setEmployeeInfo(response.Data, employeeId);
                    }
                    else {
                        return null;
                    }
                }
            });
        }
        accesspoint.getLastMarking = getLastMarking;
        function validateCode(accessCode) {
            let module = $('flx-module[modulename="emp_accessPoint_EmpInfo"]')[0];
            let employee = new flexygo.obj.Entity('emp_employee', `Employees.AccessId = '${accessCode}'  AND ISNULL(Employees.Blocked,0) = 0`);
            employee.read();
            if (employee.data.EmployeeId['Value'] != null) {
                !module.objectdefaults ? module.objectdefaults = { accessId: accessCode } : module.objectdefaults.accessId = accessCode;
                return employee.data['EmployeeId'].Value;
            }
            else {
                flexygo.msg.warning(flexygo.localization.translate('accesspoint.errormsg'));
                return null;
            }
        }
        accesspoint.validateCode = validateCode;
        function clickValidateButton(elem) {
            insertingMarking = false;
            let empCode = $('#accesscode').val();
            let num1 = validateCode(empCode);
            if (num1 != null) {
                getLastMarking(num1);
            }
        }
        accesspoint.clickValidateButton = clickValidateButton;
        function setEmployeeInfo(lastMarkingData, employeeId) {
            let module = $('flx-module[modulename="emp_accessPoint_EmpInfo"]')[0];
            let flxhtml = $(module).find('flx-html')[0];
            let keyboardModule = $('flx-module[modulename="emp_AccessPoint_Keyboard"]')[0];
            let photoContent;
            let empContent;
            let markingContent;
            //let photo: string = lastMarkingData['Photo'] ? lastMarkingData['flxPath'].replace('~', '.') : './img/Avatars/avatar_blank.png';
            let photo = lastMarkingData['Photo'] ? lastMarkingData['flxPath'].replace('~', '.') : '';
            let elemsCont = $('#ap-emp-elems');
            let insertMarkingTr = $('#insertmarking-tr');
            let validateTr = $('#validate-tr');
            let insertMarkingBtn = $('#insertmarking-btn');
            let empViewId = keyboardModule.objectdefaults.seeCode ? employeeId : '';
            let empInitials = (lastMarkingData['FullName'].split(' ')[0].substring(0) + lastMarkingData['FullName'].split(' ')[1].substring(0)).toUpperCase();
            let hello = (flexygo.localization.translate('accesspoint.hello' + lastMarkingData['TypeText']));
            validateTr.addClass('hide');
            insertMarkingTr.removeClass('hide');
            insertMarkingBtn.empty();
            insertMarkingBtn.html(flexygo.localization.translate('accesspoint.' + lastMarkingData['ButtonText']));
            photoContent = ` <div id="ap-photo"><img is="flx-img" alt="${empInitials}" src="${photo}"  class="img-responsive img-circle" /></div>`;
            empContent = `<div id="ap-empname"><span class=""><span class="emp-upper">${hello} </span><span>${lastMarkingData['FullName']}</span></span></div>`;
            if (lastMarkingData['Checktime'] != null && lastMarkingData['Checktime'] != '') {
                markingContent = `<div id="ap-lastmarking" style="border-top: 1px solid;padding: 5px;padding-top: 20px">
                                <div class="size-m">${flexygo.localization.translate('accesspoint.lastmarking')}:</div>
                                <div class="block">${lastMarkingData['Checktime']}</div>
                                <div class="block">
                                    <b>${flexygo.localization.translate('accesspoint.' + lastMarkingData['TypeText'])}</b>
                                </div>
                              </div>`;
            }
            else {
                markingContent = '';
            }
            elemsCont.empty();
            elemsCont.html(photoContent + empContent + markingContent);
            $('#accesscode').val('');
            !module.objectdefaults ? module.objectdefaults = { employeeId: employeeId } : module.objectdefaults.employeeId = employeeId;
        }
        accesspoint.setEmployeeInfo = setEmployeeInfo;
        function setInitialConfiguration(elem) {
            let component = $('#mod-emp_AccessPoint_Keyboard')[0];
            let module = $('flx-module[modulename="emp_AccessPoint_Keyboard"]')[0];
            let data = component.data;
            let backgroundImage = data[0].flxpath.replaceAll('~', '.');
            $('#ap-emp-elems').css({
                'color': data[0].Color1,
                'background-color': data[0].Color2,
            });
            $('.ap-maincont').css({
                'color': data[0].Color1,
            });
            $('.ap-clock-main').css('color', data[0].Color1);
            $('.ap-emp-main').css('color', data[0].Color1);
            $('.ap-icon-fullscreen').css('color', data[0].Color1);
            $('#ap-location').css('color', data[0].Color1);
            //data[0].DarkSkin ? $('.ap-maincont').addClass('ap-dark') : $('.ap-maincont').addClass('ap-light');
            $('.ap-numberinput').css({
                'background-color': data[0].Color2,
                'border': '2px solid',
                'color': data[0].Color1,
            });
            $('.ap-actionbtns').css({
                'background-color': data[0].Color2,
                'border': '2px solid',
                'color': data[0].Color1,
            });
            $('.ap-textinput').css({
                'color': data[0].Color1,
            });
            if (!data[0].SeeKeyboard)
                $('tr.ap-keyrow').addClass('hide');
            if (!data[0].SeeCode)
                $('#accesscode')[0].setAttribute('type', 'password');
            module.objectdefaults = { seeCode: data[0].SeeCode, seeKeyboard: data[0].SeeKeyboard };
            $('main[pagename="emp_EmployeesAccessPoint').off('keydown').on('keydown', (e) => {
                e.stopPropagation();
                e.preventDefault();
                $("#accesscode").focus();
                if (e.keyCode === 13) { //enter
                    if (!$('tr#validate-tr').hasClass('hide')) {
                        $('button#validate-btn').click();
                    }
                    else if (!$('tr#insertmarking-tr').hasClass('hide')) {
                        $('button#insertmarking-btn').click();
                    }
                }
                else if (e.keyCode === 32 || e.keyCode === 46 || e.keyCode === 27) { //esc 27, 32 espacio, 46 del
                    eraseCode(this);
                }
                else if (e.keyCode === 8) { //retroceso
                    $("#accesscode").val($("#accesscode").val().slice(0, -1));
                }
                else if (isAlphanumeric(e.keyCode)) {
                    //números y letras
                    $("#accesscode").val($("#accesscode").val() + e.key);
                    $('#insertmarking-tr').addClass('hide');
                    $('#validate-tr').removeClass('hide');
                }
            });
            $('#accesscode').focus();
        }
        accesspoint.setInitialConfiguration = setInitialConfiguration;
        function isAlphanumeric(keyCode) {
            return ((keyCode >= 48 && keyCode <= 57) ||
                ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 96 && keyCode <= 122))) && (keyCode < 112 || keyCode > 123);
        }
        function insertMarking(elem) {
            if (insertingMarking)
                return;
            insertingMarking = true;
            sebastian.utils.setLoadingAnimation();
            let module = $('flx-module[modulename="emp_accessPoint_EmpInfo"]')[0];
            let employeeId;
            let accessId;
            let locId = parseInt($(elem).closest('.access-point-main').attr('locationid'));
            let terminalCode = $(elem).closest('.access-point-main').attr('terminalcode');
            if (module.objectdefaults && module.objectdefaults.employeeId != undefined) {
                employeeId = module.objectdefaults.employeeId;
            }
            else {
                flexygo.msg.error(flexygo.localization.translate('accesspoint.employeeNotFound'));
                insertingMarking = false;
                sebastian.utils.removeLoadingAnimation();
                return;
            }
            // Busca y establece el valor de accessId
            if (module.objectdefaults && module.objectdefaults.accessId != undefined) {
                accessId = module.objectdefaults.accessId;
            }
            else {
                flexygo.msg.error(flexygo.localization.translate('accesspoint.accessIdNotFound'));
                insertingMarking = false;
                sebastian.utils.removeLoadingAnimation();
                return;
            }
            module.objectdefaults = null;
            let process = new flexygo.Process('emp_AccessPoints_insertAccessMarking');
            let params = [
                { 'Key': 'EmployeeId', 'Value': employeeId },
                { 'Key': 'AccessId', 'Value': accessId },
                { 'Key': 'LocId', 'Value': locId },
                { 'Key': 'TerminalCode', 'Value': terminalCode }
            ];
            process.run(params, (ret) => {
                if (ret) {
                    if (ret.JSCode) {
                        insertingMarking = false;
                        eval(ret.JSCode);
                    }
                    else {
                        $('#ap-emp-elems').empty();
                        $('#validate-tr').removeClass('hide');
                        $('#insertmarking-tr').addClass('hide');
                        $('#insertmarking-btn').empty();
                        flexygo.msg.success(ret.SuccessMessage);
                        insertingMarking = false;
                        // Climate Pulse — show survey only on clock-out
                        try {
                            if (ret.Data && ret.Data.MarkingTypeId === 'S') {
                                let cpEmpId = employeeId;
                                setTimeout(function () {
                                    if (typeof sebastian !== 'undefined' && sebastian.climatePulseAP) {
                                        sebastian.climatePulseAP.show(cpEmpId);
                                    }
                                }, 200);
                            }
                        }
                        catch (e) { }
                    }
                    sebastian.utils.removeLoadingAnimation();
                }
            });
        }
        accesspoint.insertMarking = insertMarking;
        function setClockEvents() {
            let updateDatetime = function () {
                let pHours = $("#ap-hours");
                let pSecs = $("#ap-secs");
                let pMins = $("#ap-minutes");
                let pWeekDay = $("#ap-wd");
                let pDay = $("#ap-day");
                let pMonth = $("#ap-month");
                let pYear = $("#ap-year");
                let date = moment();
                let hour = date.hour();
                let minutes = date.minute();
                let secs = date.second();
                pWeekDay.text(date.format('dddd'));
                pDay.text(date.date());
                pMonth.text(date.format('MMMM'));
                pYear.text(date.year());
                if (hour < 10) {
                    pHours.text("0" + hour);
                }
                else {
                    pHours.text(hour);
                }
                ;
                if (minutes < 10) {
                    pMins.text("0" + minutes);
                }
                else {
                    pMins.text(minutes);
                }
                ;
                if (secs < 10) {
                    pSecs.text("0" + secs);
                }
                else {
                    pSecs.text(secs);
                }
                ;
            };
            updateDatetime();
            let intervalo = setInterval(updateDatetime, 1000);
        }
        accesspoint.setClockEvents = setClockEvents;
        let refreshInterval = null;
        let markingTime = null;
        function refreshMarkingTime(elem, MarkingTypeId, HPlanificadas, LastTime, HMarcajes, percentage) {
            clearInterval(refreshInterval);
            let totalSeconds = Math.floor(HMarcajes * 3600);
            const formatTime = (seconds) => {
                const hours = Math.floor(seconds / 3600);
                const minutes = Math.floor((seconds % 3600) / 60);
                return `${hours < 10 ? '0' + hours : hours}h ${minutes < 10 ? '0' + minutes : minutes}min`;
            };
            const safeHPlanificadas = HPlanificadas !== null && HPlanificadas !== void 0 ? HPlanificadas : 0;
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
                    $('span#marking-time').text(formatTime(totalSeconds));
                    totalSeconds++;
                    // Solucionando el problema de Infinity
                    if (safeHPlanificadas > 0) {
                        percentage = Math.floor((totalSeconds / 3600) / safeHPlanificadas * 100);
                        $('span#progress-bar').html(`<flx-timeline-progressbar color="#003c6a" percentage="${percentage}"></flx-timeline-progressbar>`);
                    }
                    else {
                        $('span#progress-bar').html(`<span class="padding-m txt-notify">${flexygo.localization.translate('accesspoint.noplanning')}</span>`);
                    }
                };
                refreshMarkingTimer();
                refreshInterval = setInterval(refreshMarkingTimer, 1000);
            }
            else if (MarkingTypeId === 'S') {
                $('span#marking-time').text(formatTime(totalSeconds));
                if (safeHPlanificadas > 0) {
                    percentage = Math.floor((totalSeconds / 3600) / safeHPlanificadas * 100);
                    $('span#progress-bar').html(`<flx-timeline-progressbar color="#003c6a" percentage="${percentage}"></flx-timeline-progressbar>`);
                }
                else {
                    $('span#progress-bar').html(`<span class="padding-m txt-notify">${flexygo.localization.translate('accesspoint.noplanning')}</span>`);
                }
            }
            else {
                $('span#marking-time').text('0H 0min');
                $('span#progress-bar').html(`<flx-timeline-progressbar color="#003c6a" percentage="0"></flx-timeline-progressbar>`);
            }
            $(elem).on('destroyed', () => {
                clearInterval(refreshInterval);
            });
        }
        accesspoint.refreshMarkingTime = refreshMarkingTime;
        //export function initSignalRInsertMarkingModule() {
        //    flexygo.events.off($("flx-list[modulename=emp_InsertMarking_Home_withLocation]")[0], 'push', 'updated', sebastian.signalr.section);
        //    flexygo.events.on($("flx-list[modulename=emp_InsertMarking_Home_withLocation]")[0], 'push', 'updated', sebastian.signalr.section);
        //}
    })(accesspoint = sebastian.accesspoint || (sebastian.accesspoint = {}));
})(sebastian || (sebastian = {}));
//# sourceMappingURL=AccessPoints.js.map