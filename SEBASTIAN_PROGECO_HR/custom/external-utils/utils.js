//GENERIC UTILS
var flexygo;
(function (flexygo) {
    var external;
    (function (external) {
        var utils;
        (function (utils) {
            //RETURNS AN OBJECT WITH THE DAFAULTS OF A PAGE GIVEN AN ELEMENT
            function parseDefaults(element) {
                let pageHistory = flexygo.history.get($(element));
                let defaults;
                if (pageHistory.defaults)
                    defaults = JSON.parse(pageHistory.defaults.replace(/'/gm, '"'));
                return defaults || {};
            }
            utils.parseDefaults = parseDefaults;
            //Executes bag processes manually from a buttom, adding the parameter ids with the ids selected of a desired object
            function execBagProcess(element, object, process, params) {
                let checkedIds = flexygo.selection.getArray(object);
                let ids = checkedIds.join(',');
                params.push({ Key: 'ids', Value: ids });
                flexygo.nav.execProcess(process, null, null, '{\'ids\':\'' + ids + '\'}', params, 'sliderightx850', false, $(element));
                flexygo.ui.wc.FlxModuleElement.prototype.bagSelectionNone(object, null, flexygo.utils.getModule(element), $(element));
            }
            utils.execBagProcess = execBagProcess;
            //Replaces values in a html element, used to parse values not availables on the actual scope
            function replaceValues(element, values) {
                values.forEach(value => {
                    $(element).html($(element).html().replace(Object.keys(value)[0], value[Object.keys(value)[0]]));
                    $(element).html($(element).html().replace(Object.keys(value)[0].toLowerCase(), value[Object.keys(value)[0]]));
                });
            }
            utils.replaceValues = replaceValues;
            //modulename = module with a sticky header, is has to contain an #stickyHeader element
            //elementToStickOn = element after wich we will put the #stickyHeader element
            //the function relies on:
            //#stickyGroup = elemento que agrupa toda la informacion (incluida cabecera) que pertenece al grupo sticky
            //#stickyHeader = elemento que se reposicionara debajo del elementToStickOn al llegar a la parte superior de la pagina
            //.headerSuffix (opcional) = elemento que se reposicionara debajo del #stickyHeader al llegar a la parte superior de la pagina
            //.stickyHeaderLine = lineas de informacion del #stickyGroup, se utilizan como referencia de un elemento estatico para contolar el cambio de #stickyHeader
            function stickyOnScroll(moduleName, elementToStickOn) {
                //FLEXYGO TODO: 
                //check size on resize
                // multiple suffixes
                // sticky hasta que el modulo desaparezca
                // copiar el contenido al sticky, no mover el sticky, moverlo hace que suba la platilla del modulo ya que hay una parte de este que desaparece
                if ($(`[modulename=${moduleName}]`).length === 0) {
                    $('[id=realMain]').off('scroll.stickyOn' + moduleName);
                    console.log(`unsubscribing event "stickyOn${moduleName}" as the module not exists`);
                    return;
                }
                let stickyGroups = $(`[modulename=${moduleName}]`).find('[id*=stickyGroup]');
                let newStickyHeaderTop = $(elementToStickOn).offset().top + $(elementToStickOn).outerHeight();
                let offsetIzqModulo = $(`flx-module[modulename=${moduleName}]`).offset().left;
                let widthModulo = $(`flx-module[modulename=${moduleName}]`).outerWidth();
                let affixStyle = {
                    'top': newStickyHeaderTop,
                    'width': widthModulo,
                    'left': offsetIzqModulo,
                    'box-shadow': '0px 5px 5px -5px rgb(0 0 0 / 40%)',
                    'z-index': '1'
                };
                if ($(`flx-module[modulename=${moduleName}]`).css('border')) {
                    affixStyle['border-left'] = $(`flx-module[modulename=${moduleName}]`).css('border');
                    affixStyle['border-right'] = $(`flx-module[modulename=${moduleName}]`).css('border');
                }
                let stickySidebar;
                let stickyHeader;
                stickyGroups.each((i, elem) => {
                    stickyHeader = $(elem).find('[id*=stickyHeader]');
                    let firstStickyHeaderLine = $(elem).find('.stickyHeaderLine:first');
                    stickySidebar = firstStickyHeaderLine.offset().top - firstStickyHeaderLine.outerHeight() - newStickyHeaderTop + 30; //MADRE MIA QUE CHAPUZA
                    //let sidebar = stickyHeader.find('.sidebar')
                    if (stickySidebar < 0) {
                        stickyHeader.addClass('affix');
                        stickyHeader.css(affixStyle);
                        if (stickyHeader.css('background-color') === 'rgba(0, 0, 0, 0)') {
                            stickyHeader.css('background', '#ffffff');
                        }
                    }
                    else {
                        stickyHeader.removeClass('affix');
                        stickyHeader.removeAttr('style');
                        /*stickyHeader.css('box-shadow', '');
                        stickyHeader.css('top', '');
                        stickyHeader.css('width', '');
                        stickyHeader.css('left', '');
                        stickyHeader.css('border', '');*/
                    }
                });
                /*let headerInitialSuffixStyle = {
                    'top': 'initial',
                    'width': '',
                    'left': 'initial',
                    'box-shadow': 'initial',
                    'position': 'initial',
                    'background': 'initial',
                    'border-left': 'initial',
                    'border-right': 'initial'
                }*/
                // $('.headerSuffix').removeClass('cabfijada');
                //$('.headerSuffix').css(headerInitialSuffixStyle);
                $('.headerSuffix').removeAttr('style');
                if ($('.affix').length > 0) {
                    let lastSuffix;
                    $('.headerSuffix').each((i, elem) => {
                        stickySidebar = $(elem).offset().top - $(elem).outerHeight() - ($('.affix:first').offset().top - 1 + $('.affix:first').outerHeight());
                        if (stickySidebar < 0) {
                            lastSuffix = elem;
                        }
                    });
                    if (lastSuffix) {
                        //check if the fixed header is visible
                        if ($('.affix:first').is(':hidden')) {
                            $(lastSuffix).css({
                                'top': newStickyHeaderTop,
                            });
                        }
                        else {
                            $(lastSuffix).css({
                                'top': $('.affix:first').offset().top - 1 + $('.affix:first').outerHeight(),
                            });
                        }
                        $('.affix').css('box-shadow', 'unset');
                        $(lastSuffix).css({
                            'width': widthModulo,
                            'left': offsetIzqModulo,
                            'position': 'fixed',
                            'box-shadow': '0px 5px 5px -5px rgb(0 0 0 / 40%)'
                        });
                        if ($(`flx-module[modulename=${moduleName}]`).css('border')) {
                            $(lastSuffix).css('border-left', $(`flx-module[modulename=${moduleName}]`).css('border'));
                            $(lastSuffix).css('border-right', $(`flx-module[modulename=${moduleName}]`).css('border'));
                        }
                        if ($(lastSuffix).css('background-color') === 'rgba(0, 0, 0, 0)') {
                            $(lastSuffix).css('background', '#ffffff');
                        }
                    }
                }
            }
            utils.stickyOnScroll = stickyOnScroll;
            function selectTargetsClick(event, element) {
                if ($(element).hasClass('target')) {
                    $(element).removeClass('target');
                }
                else {
                    if (event.shiftKey) {
                        let cont = $(element).closest('.selectClickCont');
                        let selectedItems = $(cont).find('.target');
                        $('.selectClickItem').removeClass('target');
                        if (selectedItems.length > 0) {
                            let firstItem = parseInt(selectedItems[0].id.split('-')[1]);
                            let currentItem = parseInt(element.id.split('-')[1]);
                            if (firstItem < currentItem) {
                                for (let i = firstItem; i <= currentItem; i++) {
                                    $(cont).find('#selectClickItem-' + i).addClass('target');
                                }
                            }
                            else if (firstItem > currentItem) {
                                for (let i = currentItem; i <= firstItem; i++) {
                                    $(cont).find('#selectClickItem-' + i).addClass('target');
                                }
                            }
                        }
                        else {
                            $(element).addClass('target');
                        }
                    }
                    else if (event.ctrlKey) {
                        $(element).addClass('target');
                    }
                    else {
                        let parentCont = $(element).closest('div.selectClickCont');
                        let otherTarget = $('.target');
                        otherTarget.each((index, elem) => {
                            if (!$(elem.parentElement).is(parentCont)) {
                                $(elem).removeClass('target');
                            }
                        });
                        $(element).addClass('target');
                    }
                }
            }
            utils.selectTargetsClick = selectTargetsClick;
            function setOptionToTargetClick(element, processName, patternType, patternShiftId) {
                let ids = [];
                let cycleId;
                let targetItems = $('.target');
                if (targetItems.length > 0) {
                    cycleId = targetItems[0].closest('.selectClickCont').id.split('-')[1];
                    targetItems.each((index, elem) => {
                        ids.push(elem.id.split('-')[1]);
                    });
                    let params = [
                        { Key: 'PatternShiftId', value: parseInt(patternShiftId) },
                        { Key: 'CycleId', value: parseInt(cycleId) },
                        { Key: 'SequenceIds', Value: ids.join(',') },
                        { Key: 'PatternTypeId', Value: parseInt(patternType) }
                    ];
                    flexygo.nav.execProcess(processName, null, null, null, params, 'popup', false, $(element), false, false);
                }
            }
            utils.setOptionToTargetClick = setOptionToTargetClick;
            function showRegisterCount(element) {
                setTimeout(() => {
                    let me = $(element);
                    let listElements = me.find('flx-list');
                    listElements.each((i, el) => {
                        let list = el;
                        let number = list.maxRows;
                        let span = $(list).find('#listCounter');
                        span.html('Total: ' + number.toString());
                    });
                }, 500);
            }
            utils.showRegisterCount = showRegisterCount;
            utils.propertyUpdate = (el) => {
                objectUpdate(el, el.val());
            };
            function objectUpdate(element, value) {
                let objName = element.closest('.objectRow').attr('Obj');
                let objFilter = element.closest('.objectRow').attr('Filter');
                let objPK = element.closest('.objectRow').attr('PKField');
                let objValue = element.closest('.objectRow').attr('PK');
                let objWhere = objFilter != null ? objFilter : objPK + '=\'' + objValue + '\'';
                let obj = new flexygo.obj.Entity(objName, objWhere);
                let propertyName = element.attr('propertyField');
                obj.read();
                let objectKeys = Object.keys(obj.data);
                objectKeys.forEach((element) => {
                    if (element.toLowerCase() == 'updatedby') {
                        obj.data[element].Value = flexygo.context.currentReference;
                    }
                    if (element.toLowerCase() == 'lastupdated') {
                        obj.data[element].Value = moment().format('YYYY-MM-DDTHH:mm:ss');
                    }
                });
                obj.data[element.attr('propertyField')].Value = value;
                if (!obj.update()) {
                    element.closest('flx-module')[0].refresh();
                }
            }
            utils.objectUpdate = objectUpdate;
        })(utils = external.utils || (external.utils = {}));
    })(external = flexygo.external || (flexygo.external = {}));
})(flexygo || (flexygo = {}));
//# sourceMappingURL=utils.js.map