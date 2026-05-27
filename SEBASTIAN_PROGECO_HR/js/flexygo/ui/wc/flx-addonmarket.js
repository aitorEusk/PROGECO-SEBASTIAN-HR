/**
 * @namespace flexygo.ui.wc
 */
var flexygo;
(function (flexygo) {
    var ui;
    (function (ui) {
        var wc;
        (function (wc) {
            /**
            * Library for the FlxAddonMarketElement
            *
            * @class FlxAddonMarketElement
            * @constructor
            * @return {FlxAddonMarketElement} .
            */
            class FlxAddonMarketElement extends HTMLElement {
                constructor() {
                    //If a constructor is defined, is REQUIRED call the super constructor
                    super();
                    /**
                    * Set if element has been connected to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                }
                /**
                * Init the webcomponent. REQUIRED.
                * @method init
                */
                init() {
                    this.render();
                }
                /**
                * Refresh de webcomponent. REQUIRED.
                * @method refresh
                */
                refresh() {
                    this.render();
                }
                /**
                * Render HTML data.
                * @method render
                */
                render() {
                    const me = $(this);
                    me.empty();
                    flexygo.ajax.post('~/api/AddonMarket', 'GetAddons', { ModuleName: this.moduleName }, (response) => {
                        if (response.Addons.length > 0) {
                            let addonHtml = ``;
                            //Search
                            addonHtml += `
                            <div class="addon-search margin-bottom-l margin-top-l">
                                <input type="text" class="addon-search-input" placeholder="${flexygo.localization.translate('flxaddonmarket.search')}">
                            </div>
                        `;
                            addonHtml += `<div class="row">`;
                            response.Addons.forEach((addon, index) => {
                                addonHtml += `<div class="col-3 col-m-4 col-s-12 margin-bottom-xl padding-right-l">`;
                                addonHtml += `  <div class="addon-card">`;
                                //Icon
                                addonHtml += `    <div class="addon-header">`;
                                addonHtml += `      <div class="addon-icon">`;
                                addonHtml += `        <img src="${addon.IconUrl}">`;
                                addonHtml += `      </div>`;
                                addonHtml += `      <div class="addon-action">`;
                                let btnClass = "addon-btn clickable";
                                let btnIcon = "flx-icon icon-download";
                                let btnTitle = flexygo.localization.translate('flxaddonmarket.download');
                                if (addon.Installed) {
                                    if (addon.Update) {
                                        btnClass += " addon-btn-update";
                                        btnIcon = "flx-icon icon-update";
                                        btnTitle = flexygo.localization.translate('flxaddonmarket.update');
                                    }
                                    else {
                                        btnClass += " addon-btn-installed";
                                        btnIcon = "flx-icon icon-checkbox";
                                        btnTitle = flexygo.localization.translate('flxaddonmarket.complete');
                                    }
                                }
                                addonHtml += `        <button id="${addon.Id}" version="${addon.Version}" class="${btnClass}" title="${btnTitle}">`;
                                addonHtml += `          <i class="${btnIcon}"></i>`;
                                addonHtml += `        </button>`;
                                if (addon.Installed) {
                                    addonHtml += `
                                    <button id="${addon.Id}" version="${addon.Version}" class="addon-btn addon-btn-remove clickable" title="${flexygo.localization.translate('flxaddonmarket.delete')}">
                                        <i class="flx-icon icon-trash"></i>
                                    </button>
                                `;
                                }
                                addonHtml += `      </div>`;
                                addonHtml += `    </div>`;
                                addonHtml += `    <div class="addon-body">`;
                                addonHtml += `      <h6 class="addon-title">${addon.Title} <span class="addon-version">v${addon.Version}</span></h6>`;
                                //Authors
                                if (addon.Authors && addon.Authors.length > 0) {
                                    addonHtml += `      <div class="addon-authors">`;
                                    addonHtml += `        <i class="flx-icon icon-user margin-right-s"></i>`;
                                    addonHtml += `        <span>${addon.Authors.join(', ')}</span>`;
                                    addonHtml += `      </div>`;
                                }
                                // Tags
                                if (addon.Tags && addon.Tags.length > 0) {
                                    addonHtml += `      <div class="addon-tags">`;
                                    addon.Tags.forEach(tag => {
                                        addonHtml += `        <span class="addon-tag">${tag}</span>`;
                                    });
                                    addonHtml += `      </div>`;
                                }
                                //Description
                                addonHtml += `      <small title="${addon.Description}" class="addon-desc">${addon.Description}</small>`;
                                addonHtml += `    </div>`;
                                addonHtml += `  </div>`;
                                addonHtml += `</div>`;
                            });
                            addonHtml += `</div>`;
                            flexygo.utils.modules.removeSkeleton(this.closest('flx-module'));
                            me.append(addonHtml);
                            me.find('.addon-search-input').on('input', (e) => {
                                const query = e.target.value.toLowerCase();
                                me.find('.addon-card').each((i, card) => {
                                    const title = $(card).find('.addon-title').text().toLowerCase();
                                    const description = $(card).find('.addon-desc').text().toLowerCase();
                                    if (title.includes(query) || description.includes(query)) {
                                        $(card).parent().show();
                                    }
                                    else {
                                        $(card).parent().hide();
                                    }
                                });
                                const visible = me.find('.addon-card:visible').length;
                                if (visible === 0) {
                                    if (me.find('.no-addons-message').length === 0) {
                                        let notfoundHTML = `
                                    <div class="no-addons-message">
                                        <i class="flx-icon icon-information-5 no-addons-icon txt-warning"></i>
                                        <div class="no-addons-text">${flexygo.localization.translate('flxaddonmarket.notfound')}</div>
                                    </div>
                                `;
                                        me.append(notfoundHTML);
                                    }
                                }
                                else {
                                    me.find('.no-addons-message').remove();
                                }
                            });
                            me.find('.addon-btn').on("click", (e) => {
                                const btn = e.target.closest('.addon-btn');
                                if ($(btn).hasClass('addon-btn-installed'))
                                    return;
                                const id = btn.getAttribute('id');
                                const version = btn.getAttribute('version');
                                if ($(btn).hasClass('addon-btn-remove')) {
                                    this.uninstallAddon(id);
                                    return;
                                }
                                this.installAddon(id, version);
                            });
                        }
                        else {
                            let addonHtml = ``;
                            addonHtml += `
                            <div class="no-addons-message">
                                <i class="flx-icon icon-information-5 no-addons-icon txt-warning"></i>
                                <div class="no-addons-text">${flexygo.localization.translate('flxaddonmarket.notfound')}</div>
                            </div>
                        `;
                            flexygo.utils.modules.removeSkeleton(this.closest('flx-module'));
                            me.append(addonHtml);
                        }
                    });
                }
                installAddon(id, version) {
                    flexygo.msg.confirm(flexygo.localization.translate('flxaddonmarket.install'), (result) => {
                        if (result) {
                            flexygo.utils.showLoading(null, flexygo.localization.translate('flxaddonmarket.installing'));
                            flexygo.ajax.post('~/api/AddonMarket', 'DownloadAddon', { ModuleName: this.moduleName, Id: id, Version: version }, (response) => {
                                if (response) {
                                    flexygo.nav.execProcess('sysInstallAddon', 'sysAddon', `Addons.AddonId = '${id}' `, null, [{ 'key': 'nuget', 'value': `~/Custom/temp/${id}.${version}.nupkg` }], 'sliderightx50%', false, $(this));
                                }
                            }, (error) => {
                                flexygo.utils.removeLoadingEffect();
                                flexygo.msg.error(error.responseJSON.message, null, error.responseJSON.title);
                            });
                        }
                    });
                }
                uninstallAddon(id) {
                    flexygo.msg.confirm(flexygo.localization.translate('flxaddonmarket.uninstall'), (result) => {
                        if (result) {
                            flexygo.ui.wc.FlxModuleElement.prototype.deleteModuleResponse('sysAddon', `Addons.AddonId = '${id}' `, $(this).closest('flx-module'), $(this));
                        }
                    });
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    let element = $(this);
                    this.connected = true;
                    this.moduleName = element.attr("ModuleName");
                    this.init();
                }
                /**
                * Fires when the attribute value of the element is changed.
                * @method attributeChangedCallback
                */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    let needInit = false;
                    if (attrName.toLowerCase() == 'modulename' && newVal && newVal != '') {
                        this.moduleName = newVal;
                        needInit = true;
                    }
                    if (this.connected && needInit) {
                        this.init();
                    }
                }
            }
            /**
            * Array of observed attributes. REQUIRED
            * @property observedAttributes {Array}
            */
            FlxAddonMarketElement.observedAttributes = ['ModuleName'];
            wc.FlxAddonMarketElement = FlxAddonMarketElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define('flx-addonmarket', flexygo.ui.wc.FlxAddonMarketElement);
//# sourceMappingURL=flx-addonmarket.js.map