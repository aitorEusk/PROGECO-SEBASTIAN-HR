/**
 * Climate Pulse — Portal WebComponent
 * Displays an overlay climate pulse prompt triggered after clock-out, on login, or on navigation.
 * 3-step flow: response (green/yellow/red) → factors (optional) → thanks
 *
 * Usage: <flx-climatepulse></flx-climatepulse>
 */
var flexygo;
(function (flexygo) {
    var ui;
    (function (ui) {
        var wc;
        (function (wc) {
            class FlxClimatePulseElement extends HTMLElement {
                constructor() {
                    super();
                    this.connected = false;
                    this.pulseData = null;
                    this.selectedValue = null;
                    this.selectedFactors = [];
                    this.comment = '';
                    this.step = 1; // 1=main, 2=factors, 3=thanks
                    this.lang = (flexygo.context.currentCulture || 'es-ES').substring(0, 2);
                }
                init() {
                    this.loadPending();
                }
                refresh() {
                    this.loadPending();
                }
                loadPending() {
                    let me = this;
                    let employeeId = flexygo.context.currentReference;
                    if (!employeeId)
                        return;
                    let proc = new flexygo.Process('pClimatePulse_GetPending', null, null);
                    let params = [
                        { Key: 'EmployeeId', Value: employeeId },
                        { Key: 'Channel', Value: 'PORTAL' }
                    ];
                    proc.run(params, (ret) => {
                        if (ret && ret.Data && ret.Data.Pulse && ret.Data.Pulse.length > 0) {
                            let pulse = ret.Data.Pulse[0];
                            let isFirstLoad = !sessionStorage.getItem('climatepulse_session');
                            sessionStorage.setItem('climatepulse_session', '1');
                            if (isFirstLoad && !pulse.ShowOnLogin) {
                                $(me).empty();
                                return;
                            }
                            if (!isFirstLoad && !pulse.ShowOnClockOut) {
                                $(me).empty();
                                return;
                            }
                            me.pulseData = pulse;
                            me.pulseData.Factors = ret.Data.Factors || [];
                            me.step = 1;
                            me.selectedValue = null;
                            me.selectedFactors = [];
                            me.comment = '';
                            me.render();
                        }
                        else {
                            $(me).empty();
                        }
                    });
                }
                render() {
                    let me = this;
                    let $el = $(this);
                    $el.empty();
                    if (!me.pulseData)
                        return;
                    if (me.step === 3) {
                        me.renderThanks($el);
                        return;
                    }
                    let $container = $('<div class="climate-pulse-container"></div>');
                    let $overlay = $('<div class="climate-pulse-overlay"></div>');
                    let $card = $('<div class="climate-pulse-card"></div>');
                    let $header = $('<div class="climate-pulse-header"></div>');
                    $header.append('<span class="climate-pulse-title">' + (me.pulseData.QuestionText || 'How are you feeling at work today?') + '</span>');
                    let $dismiss = $('<button class="climate-pulse-dismiss" title="Not now">&times;</button>');
                    $dismiss.on('click', () => { me.dismiss(); });
                    $header.append($dismiss);
                    $card.append($header);
                    if (me.step === 1) {
                        me.renderStep1($card);
                    }
                    else if (me.step === 2) {
                        me.renderStep2($card);
                    }
                    $overlay.append($card);
                    $container.append($overlay);
                    $el.append($container);
                    setTimeout(() => {
                        $overlay.addClass('climate-pulse-visible');
                        $card.addClass('climate-pulse-card-visible');
                    }, 50);
                }
                renderStep1($card) {
                    let me = this;
                    let $buttons = $('<div class="climate-pulse-buttons"></div>');
                    let options = [
                        { value: 3, color: '#4caf50', emoji: '😊', label: flexygo.localization.translate('climatepulse.good') || 'Good' },
                        { value: 2, color: '#ff9800', emoji: '😐', label: flexygo.localization.translate('climatepulse.neutral') || 'Neutral' },
                        { value: 1, color: '#f44336', emoji: '😔', label: flexygo.localization.translate('climatepulse.difficult') || 'Difficult' }
                    ];
                    options.forEach((opt) => {
                        let $btn = $(`<button class="climate-pulse-btn" data-value="${opt.value}"></button>`);
                        $btn[0].style.setProperty('--pulse-color', opt.color);
                        $btn.html(`<span class="climate-pulse-emoji">${opt.emoji}</span><span class="climate-pulse-label">${opt.label}</span>`);
                        $btn.on('click', () => {
                            me.selectedValue = opt.value;
                            if (opt.value <= 2 && me.pulseData.HasFactors) {
                                me.step = 2;
                                me.render();
                            }
                            else {
                                me.submit();
                            }
                        });
                        $buttons.append($btn);
                    });
                    $card.append($buttons);
                    let privacyIcon = me.pulseData.PrivacyMode === 0 ? '🔒' : '🔏';
                    let lang = me.lang;
                    let privacyTexts = {
                        es: me.pulseData.PrivacyMode === 0 ? 'Anónima · nadie sabrá quién eres' : 'Privada · solo visible para tus responsables',
                        en: me.pulseData.PrivacyMode === 0 ? 'Anonymous · no one will know who you are' : 'Private · only visible to your managers',
                        ca: me.pulseData.PrivacyMode === 0 ? 'Anònima · ningú sabrà qui ets' : 'Privada · només visible per als teus responsables',
                        fr: me.pulseData.PrivacyMode === 0 ? 'Anonyme · personne ne saura qui vous êtes' : 'Privée · visible uniquement par vos responsables'
                    };
                    let privacyText = privacyTexts[lang] || privacyTexts['en'];
                    $card.append('<div class="climate-pulse-privacy">' + privacyIcon + ' ' + privacyText + '</div>');
                }
                renderStep2($card) {
                    let me = this;
                    let $secondary = $('<div class="climate-pulse-secondary"></div>');
                    $secondary.append('<p class="climate-pulse-subtitle">' + (me.pulseData.SecondaryQuestionText || 'Can you tell us more?') + '</p>');
                    if (me.pulseData.Factors && me.pulseData.Factors.length > 0) {
                        let $factors = $('<div class="climate-pulse-factors"></div>');
                        me.pulseData.Factors.forEach((factor) => {
                            let $fBtn = $(`<button class="climate-pulse-factor" data-id="${factor.FactorId}"></button>`);
                            $fBtn.html(`<i class="${factor.IconClass || 'flx-icon-tag'}"></i> ${factor.Name}`);
                            $fBtn.on('click', function () {
                                let idx = me.selectedFactors.indexOf(factor.FactorId);
                                if (idx > -1) {
                                    me.selectedFactors.splice(idx, 1);
                                    $(this).removeClass('selected');
                                }
                                else {
                                    me.selectedFactors.push(factor.FactorId);
                                    $(this).addClass('selected');
                                }
                            });
                            $factors.append($fBtn);
                        });
                        $secondary.append($factors);
                    }
                    let $commentArea = $('<div class="climate-pulse-comment-area"></div>');
                    let placeholderTexts = { es: 'Comentario breve opcional...', en: 'Optional short comment...', ca: 'Comentari breu opcional...', fr: 'Commentaire bref optionnel...' };
                    let placeholder = placeholderTexts[me.lang] || placeholderTexts['es'];
                    let $textarea = $(`<textarea class="climate-pulse-comment" maxlength="500" placeholder="${placeholder}"></textarea>`);
                    $textarea.on('input', function () { me.comment = $(this).val(); });
                    $commentArea.append($textarea);
                    $secondary.append($commentArea);
                    let $actions = $('<div class="climate-pulse-actions"></div>');
                    let $back = $('<button class="climate-pulse-back">&larr;</button>');
                    $back.on('click', () => {
                        me.step = 1;
                        me.selectedFactors = [];
                        me.comment = '';
                        me.render();
                    });
                    let sendTexts = { es: 'Enviar', en: 'Send', ca: 'Enviar', fr: 'Envoyer' };
                    let sendLabel = sendTexts[me.lang] || sendTexts['es'];
                    let $submit = $(`<button class="climate-pulse-submit">${sendLabel}</button>`);
                    $submit.on('click', () => { me.submit(); });
                    $actions.append($back);
                    $actions.append($submit);
                    $secondary.append($actions);
                    $card.append($secondary);
                }
                renderThanks($el) {
                    let me = this;
                    let $container = $('<div class="climate-pulse-container"></div>');
                    let $overlay = $('<div class="climate-pulse-overlay climate-pulse-visible"></div>');
                    let $thanks = $('<div class="climate-pulse-thanks climate-pulse-card-visible"></div>');
                    let thanksTexts = { es: '¡Gracias por compartir!', en: 'Thank you for sharing!', ca: 'Gràcies per compartir!', fr: 'Merci d\'avoir partagé !' };
                    let thanksMsg = thanksTexts[me.lang] || thanksTexts['es'];
                    $thanks.html(`<div class="climate-pulse-thanks-emoji">🙏</div><p>${thanksMsg}</p>`);
                    $overlay.append($thanks);
                    $container.append($overlay);
                    $el.append($container);
                    setTimeout(() => {
                        $overlay.removeClass('climate-pulse-visible');
                        setTimeout(() => { $el.empty(); }, 400);
                    }, 2000);
                }
                submit() {
                    let me = this;
                    let proc = new flexygo.Process('pClimatePulse_SubmitResponse', null, null);
                    let params = [
                        { Key: 'PulseId', Value: me.pulseData.PulseId },
                        { Key: 'ResponseValue', Value: me.selectedValue },
                        { Key: 'Comment', Value: me.comment || '' },
                        { Key: 'FactorIds', Value: me.selectedFactors.join(',') }
                    ];
                    proc.run(params, () => {
                        me.step = 3;
                        me.render();
                    });
                }
                dismiss() {
                    let me = this;
                    let $el = $(this);
                    let proc = new flexygo.Process('pClimatePulse_Dismiss', null, null);
                    let params = [{ Key: 'PulseId', Value: me.pulseData.PulseId }];
                    proc.run(params, () => {
                        $el.find('.climate-pulse-overlay').removeClass('climate-pulse-visible');
                        setTimeout(() => { $el.empty(); }, 400);
                    });
                }
                connectedCallback() {
                    this.connected = true;
                    this.init();
                }
                attributeChangedCallback(attrName, oldVal, newVal) {
                    if (this.connected) {
                        this.init();
                    }
                }
            }
            FlxClimatePulseElement.observedAttributes = [];
            wc.FlxClimatePulseElement = FlxClimatePulseElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-climatepulse', flexygo.ui.wc.FlxClimatePulseElement);
//# sourceMappingURL=ClimatePulse.js.map