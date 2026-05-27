/**
 * Climate Pulse — Access Point Overlay
 * Touch-optimized overlay for tablet kiosks (no keyboard).
 * Called after marking insertion: sebastian.climatePulseAP.show(employeeId)
 */
var sebastian;
(function (sebastian) {
    var climatePulseAP;
    (function (climatePulseAP) {
        let _pulseData = null;
        let _selectedValue = null;
        let _selectedFactors = [];
        let _$container = null;
        let _timeoutHandle = null;
        function show(employeeId) {
            if (!employeeId)
                return;
            let proc = new flexygo.Process('pClimatePulse_GetPending', null, null);
            let params = [
                { Key: 'EmployeeId', Value: employeeId },
                { Key: 'Channel', Value: 'ACCESS_POINT' }
            ];
            proc.run(params, (ret) => {
                if (!ret || !ret.Data || !ret.Data.Pulse || !ret.Data.Pulse.length)
                    return;
                let p = ret.Data.Pulse[0];
                _pulseData = {
                    PulseId: p.PulseId,
                    ConfigId: p.ConfigId,
                    QuestionText: p.QuestionText,
                    SecondaryQuestionText: p.SecondaryQuestionText,
                    HasFactors: p.HasFactors,
                    PrivacyMode: p.PrivacyMode,
                    AccessPointTimeoutSec: p.AccessPointTimeoutSec || 15,
                    Factors: ret.Data.Factors || []
                };
                _selectedValue = null;
                _selectedFactors = [];
                renderStep1();
            });
        }
        climatePulseAP.show = show;
        function renderStep1() {
            cleanup();
            _$container = $('<div class="climate-pulse-container climate-pulse-ap"></div>');
            let $overlay = $('<div class="climate-pulse-overlay"></div>');
            let $card = $('<div class="climate-pulse-card"></div>');
            let $header = $('<div class="climate-pulse-header"></div>');
            $header.append('<span class="climate-pulse-title">' + (_pulseData.QuestionText || 'How are you feeling today?') + '</span>');
            $card.append($header);
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
                    _selectedValue = opt.value;
                    if (opt.value <= 2 && _pulseData.HasFactors) {
                        renderStep2();
                    }
                    else {
                        submit();
                    }
                });
                $buttons.append($btn);
            });
            $card.append($buttons);
            let privacyIcon = _pulseData.PrivacyMode === 0 ? '🔒' : '🔏';
            let lang = (flexygo.context.currentCulture || 'es-ES').substring(0, 2);
            let privacyTexts = {
                es: _pulseData.PrivacyMode === 0 ? 'Anónima · nadie sabrá quién eres' : 'Privada · solo visible para tus responsables',
                en: _pulseData.PrivacyMode === 0 ? 'Anonymous · no one will know who you are' : 'Private · only visible to your managers',
                ca: _pulseData.PrivacyMode === 0 ? 'Anònima · ningú sabrà qui ets' : 'Privada · només visible per als teus responsables',
                fr: _pulseData.PrivacyMode === 0 ? 'Anonyme · personne ne saura qui vous êtes' : 'Privée · visible uniquement par vos responsables'
            };
            let privacyText = privacyTexts[lang] || privacyTexts['en'];
            $card.append('<div class="climate-pulse-privacy">' + privacyIcon + ' ' + privacyText + '</div>');
            let timeout = (_pulseData.AccessPointTimeoutSec || 15) * 1000;
            let $timer = $('<div class="climate-pulse-timer"><div class="climate-pulse-timer-bar"></div></div>');
            $card.append($timer);
            $overlay.append($card);
            _$container.append($overlay);
            $('body').append(_$container);
            setTimeout(() => {
                $overlay.addClass('climate-pulse-visible');
                $card.addClass('climate-pulse-card-visible');
                $timer.find('.climate-pulse-timer-bar').css('transition', `width ${timeout / 1000}s linear`).css('width', '0%');
            }, 50);
            _timeoutHandle = window.setTimeout(() => { dismiss(); }, timeout);
        }
        function renderStep2() {
            if (_timeoutHandle) {
                clearTimeout(_timeoutHandle);
                _timeoutHandle = null;
            }
            let $card = _$container.find('.climate-pulse-card');
            $card.find('.climate-pulse-buttons, .climate-pulse-timer').remove();
            let $secondary = $('<div class="climate-pulse-secondary"></div>');
            $secondary.append('<p class="climate-pulse-subtitle">' + (_pulseData.SecondaryQuestionText || 'What is influencing your day?') + '</p>');
            if (_pulseData.Factors && _pulseData.Factors.length > 0) {
                let $factors = $('<div class="climate-pulse-factors"></div>');
                _pulseData.Factors.forEach((factor) => {
                    let $fBtn = $(`<button class="climate-pulse-factor" data-id="${factor.FactorId}"></button>`);
                    $fBtn.html(`<i class="${factor.IconClass || 'flx-icon-tag'}"></i> ${factor.Name}`);
                    $fBtn.on('click', function () {
                        let idx = _selectedFactors.indexOf(factor.FactorId);
                        if (idx > -1) {
                            _selectedFactors.splice(idx, 1);
                            $(this).removeClass('selected');
                        }
                        else {
                            _selectedFactors.push(factor.FactorId);
                            $(this).addClass('selected');
                        }
                    });
                    $factors.append($fBtn);
                });
                $secondary.append($factors);
            }
            let $actions = $('<div class="climate-pulse-actions" style="justify-content:center"></div>');
            let sendLabel = flexygo.localization.translate('climatepulse.send') || 'Send';
            let $submit = $(`<button class="climate-pulse-submit">${sendLabel}</button>`);
            $submit.on('click', () => { submit(); });
            $actions.append($submit);
            $secondary.append($actions);
            $card.append($secondary);
            _timeoutHandle = window.setTimeout(() => { submit(); }, 30000);
        }
        function submit() {
            if (_timeoutHandle) {
                clearTimeout(_timeoutHandle);
                _timeoutHandle = null;
            }
            let proc = new flexygo.Process('pClimatePulse_SubmitResponseAP', null, null);
            let params = [
                { Key: 'PulseId', Value: _pulseData.PulseId },
                { Key: 'ResponseValue', Value: _selectedValue },
                { Key: 'FactorIds', Value: _selectedFactors.join(',') }
            ];
            proc.run(params, () => { renderThanks(); });
        }
        function dismiss() {
            if (_timeoutHandle) {
                clearTimeout(_timeoutHandle);
                _timeoutHandle = null;
            }
            let proc = new flexygo.Process('pClimatePulse_Dismiss', null, null);
            let params = [{ Key: 'PulseId', Value: _pulseData.PulseId }];
            proc.run(params, () => { cleanup(); });
        }
        function renderThanks() {
            if (!_$container)
                return;
            let $card = _$container.find('.climate-pulse-card');
            $card.empty();
            $card.addClass('climate-pulse-thanks');
            let thanksMsg = flexygo.localization.translate('climatepulse.thanks') || 'Thank you!';
            $card.html(`<div class="climate-pulse-thanks-emoji">🙏</div><p>${thanksMsg}</p>`);
            setTimeout(() => { cleanup(); }, 800);
        }
        function cleanup() {
            if (_timeoutHandle) {
                clearTimeout(_timeoutHandle);
                _timeoutHandle = null;
            }
            if (_$container) {
                _$container.find('.climate-pulse-overlay').removeClass('climate-pulse-visible');
                let ref = _$container;
                setTimeout(() => { ref.remove(); }, 400);
                _$container = null;
            }
        }
    })(climatePulseAP = sebastian.climatePulseAP || (sebastian.climatePulseAP = {}));
})(sebastian || (sebastian = {}));
//# sourceMappingURL=ClimatePulseAP.js.map