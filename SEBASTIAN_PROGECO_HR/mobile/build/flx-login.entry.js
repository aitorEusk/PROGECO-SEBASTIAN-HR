import { r as registerInstance, k as h, l as getElement } from './index-3f6ae35e.js';
import { B as Browser } from './index-f4584d95.js';
import { j as jquery } from './jquery-254bc370.js';
import { f as Capacitor, j as gps, w as storage, W as Webapi, C as ConftokenProvider, m as msg, u as util, l as flxSync, n as nav } from './conftoken-949aae77.js';
import './_commonjsHelpers-2a12c1e6.js';
import './process-es6-cc264d03.js';
import './utils-515e0805.js';
import './animation-160b6d8d.js';
import './helpers-0fb1c204.js';
import './ios.transition-9f5405f1.js';
import './index-7e5eab7f.js';
import './md.transition-d5eeb7f8.js';
import './cubic-bezier-ed243a9b.js';
import './index-d086042f.js';
import './ionic-global-7b33f09f.js';
import './index-cc97b114.js';
import './index-f393b124.js';
import './hardware-back-button-508e48cf.js';
import './overlays-71eb67ef.js';

const flxLoginCss = "ion-content.loginpage{--ion-background-color:#333333;--ion-background-color-rgb:51,51,51;--ion-color-primary:#2db7b0;--ion-text-color:#dddddd;--ion-text-color-rgb:221,221,221;--ion-color-step-50:#3c3c3c;--ion-color-step-100:#444444;--ion-color-step-150:#4d4d4d;--ion-color-step-200:#555555;--ion-color-step-250:#5e5e5e;--ion-color-step-300:#666666;--ion-color-step-350:#6f6f6f;--ion-color-step-400:#777777;--ion-color-step-450:#808080;--ion-color-step-500:#888888;--ion-color-step-550:#919191;--ion-color-step-600:#999999;--ion-color-step-650:#a2a2a2;--ion-color-step-700:#aaaaaa;--ion-color-step-750:#b3b3b3;--ion-color-step-800:#bbbbbb;--ion-color-step-850:#c4c4c4;--ion-color-step-900:#cccccc;--ion-color-step-950:#d5d5d5}ion-toolbar.applist{--ion-background-color:#2db7b0;color:white}ion-grid{margin-top:env(safe-area-inset-top)}ion-spinner.urlSpinner{width:15px}label#URLError{color:red;float:right;position:absolute;bottom:0px;right:0px;font-size:0.8em}ion-icon.urlState[name=\"close-circle-outline\"]{color:red}ion-icon.urlState[name=\"checkmark-circle-outline\"]{color:#a2ff6c7c}ion-content>div.loginScreen{height:100%;display:flex;flex-direction:column;justify-content:center}ion-content.comesFromSleep>div.loginScreen .logItem{margin-bottom:56px}#sso-button{--background:white;color:#0e487b}#sso-button img.ahora-logo{height:54%;margin-right:10px}#sso-button span{font-size:11px;font-weight:bold}#sso-button img.business-hub-logo{height:36%;margin-left:10px}";

const FlxLogin = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.url = '';
    this.user = '';
    this.pass = '';
    this.logo = './assets/img/logo.png';
    this.aad_url = '';
    this.sameUrlAndUser = false;
    this.oldUrl = '';
    this.oldUser = '';
    this.comes_from_sleep = false;
    this.apps = undefined;
    this.modal = undefined;
  }
  componentWillLoad() {
    this.refresh();
    if (Capacitor.getPlatform() === 'android') {
      gps.showActivationMsg(null, false);
    }
    storage.get('flexyApp').then((apps) => {
      if (apps.sleepModeURL)
        this.comes_from_sleep = true;
    });
  }
  componentDidLoad() {
    jquery('#passInput').on('keyup', (e) => {
      if (e.key === 'Enter' || e.keycode === 13) {
        this.login();
      }
    });
    if (this.url) {
      this.onURLChange(true);
    }
  }
  async refresh() {
    let api = new Webapi();
    let auth = await api.getAuth();
    let config = await ConftokenProvider.config();
    let urlConfig = (config ? config.urlConfig : null);
    if (auth) {
      this.url = auth.url;
      this.oldUrl = auth.url;
      this.oldUser = auth.user;
    }
    if (urlConfig) {
      this.url = (urlConfig.url ? urlConfig.url : this.url);
      this.user = (urlConfig.user ? urlConfig.user : this.oldUser);
    }
  }
  async login() {
    if (!this.url) {
      msg.showError(util.translate('login.blankUrl', true), false);
      jquery('[name=url]').addClass('danger').focus();
      return;
    }
    if (!this.user) {
      msg.showError(util.translate('login.blankUsr', true), false);
      jquery('[name=user]').focus();
      return;
    }
    if (!this.pass) {
      msg.showError(util.translate('login.blankPsw', true), false);
      jquery('[name=pass]').focus();
      return;
    }
    this.loadingStart();
    let api = new Webapi();
    this.logUser(api, true);
  }
  loginBySSO() {
    //We store the current url so we can use it on the token that will be generated when the user has identified by SSO
    storage.set('login_by_sso_url', this.url).then(async () => {
      await storage.set('login_by_sso_aad_url', this.aad_url);
      Browser.open({ url: this.aad_url });
    });
  }
  logUser(api, firstTime) {
    let GUID = util.GUID();
    api.login(this.url, this.user, this.pass, GUID).then((auth_token) => {
      //Once logged we check for possible multiple apps
      api.getCollection('sysOfflineApp').then((apps) => {
        this.selectApp(apps, GUID, auth_token);
      }).catch(error => {
        this.loader.dismiss();
        this.catchErr(error);
      });
    }).catch(async (error) => {
      await ConftokenProvider.removeApp(GUID);
      if (firstTime && error.error !== 'invalid_grant') {
        this.toggleHttpExtension();
        this.logUser(api, false);
      }
      else {
        if (error.error !== 'invalid_grant') {
          this.toggleHttpExtension();
        }
        this.loader.dismiss();
        if (error.message === 'Failed to fetch') {
          error.message = util.translate('login.connectionErr', true);
        }
        else if (error.error === 'invalid_grant') {
          error.message = util.translate('login.invalidPsw', true);
        }
        console.log(error);
        this.catchErr(error);
      }
    });
  }
  toggleHttpExtension() {
    if (this.url.startsWith('https'))
      this.url = this.url.replace('https', 'http');
    else
      this.url = this.url.replace('http', 'https');
  }
  catchErr(error) {
    let message = 'Unknown login error';
    if (error) {
      if (typeof error == 'string') {
        message = error;
      }
      else if (error.error && error.error.error_description) {
        message = error.error.error_description;
      }
      else if (error.message) {
        message = error.message;
      }
    }
    msg.showError(message);
  }
  //We declare this 2 functions as a method so we can execute it on app.ts for SSO login
  async loadingStart() {
    this.loader = document.createElement('ion-loading');
    this.loader.message = 'Loading';
    document.body.appendChild(this.loader);
    this.loader.present();
  }
  async loadingFinish() {
    this.loader.dismiss();
  }
  async onURLChange(is_on_first_load = false) {
    this.aad_url = ''; //We deactivate the aad_enabled to avoid this button from being clicked in apps with no aad
    const url_item = this.component.querySelector('#url-item');
    const url_spinner = url_item.querySelector('ion-spinner');
    const url_state_icon = url_item.querySelector('ion-icon.urlState');
    const error_item = url_item.querySelector('#URLError');
    url_spinner.classList.remove('hidden');
    url_state_icon.classList.add('hidden');
    //Only when the URL gets changed form the input we update the this.url variable
    if (!is_on_first_load) {
      this.url = url_item.querySelector('ion-input').value;
      this.url = this.url.trim();
      if (!this.url.startsWith('http')) {
        this.url = 'https://' + this.url;
      }
      if (this.url.endsWith('/')) {
        this.url = this.url.substring(0, this.url.length - 1);
      }
    }
    //We call the WebApi so we can retrieve the configured logo and the abh URL
    let api = new Webapi();
    let api_info = await api.getWebApiInfo(this.url + '/WebApi', false);
    //If it fails the first time we try changing http protocol
    if (api_info.flxDataError) {
      //We do not directly change the URL so if the error was another we do not change the http protocol
      let http_altered_url;
      if (this.url.startsWith('https')) {
        http_altered_url = this.url.replace('https', 'http');
      }
      else {
        http_altered_url = this.url.replace('http', 'https');
      }
      //Only if there was no error on the new api call we then change the url and api_info to the new ones
      const new_api_info = await api.getWebApiInfo(http_altered_url + '/WebApi', false);
      if (!new_api_info.flxDataError) {
        this.url = http_altered_url;
        api_info = new_api_info;
      }
    }
    url_spinner.classList.add('hidden');
    if (api_info && ((!api_info.flxDataError) || (api_info.flxDataError && api_info.flxDataError.Message === 'An error has occurred.'))) {
      error_item.classList.add('hidden');
      url_state_icon.setAttribute('name', 'checkmark-circle-outline');
      url_state_icon.classList.remove('hidden');
      let newLogo = false;
      if (api_info.tags) {
        //We get and set the logo
        let logoTag = api_info.tags.find(tag => {
          if (tag.name === 'Logo')
            return tag;
        });
        if (logoTag && logoTag.description) {
          this.logo = logoTag.description;
          newLogo = true;
        }
        //We get and set the aad_url
        let aad_url = api_info.tags.find(tag => {
          if (tag.name === 'aadURL')
            return tag;
        });
        if (aad_url === null || aad_url === void 0 ? void 0 : aad_url.description) {
          this.aad_url = aad_url.description;
        }
      }
      if (!newLogo) {
        this.logo = './assets/img/logo.png';
      }
    }
    else {
      error_item.classList.remove('hidden');
      url_state_icon.setAttribute('name', 'close-circle-outline');
      url_state_icon.classList.remove('hidden');
    }
  }
  //Given the list of apps of the URL we either log to the only app, show the apps list or say there're no apps
  //We declare this as a method so we can execute it on app.ts for SSO login
  async selectApp(apps, GUID, auth_token) {
    //We filter the non active apps
    apps = apps.filter(app => app.Active);
    this.loader.dismiss();
    if (apps.length === 0) {
      msg.showError('No apps found', false);
    }
    else if (apps.length === 1) {
      const data = await ConftokenProvider.setApp(apps[0], this.url, this.user, GUID, auth_token);
      this.afterAppIsSet(data);
    }
    else {
      this.apps = apps;
      this.appsList(apps, GUID, auth_token);
    }
    storage.set('loggedOut', false);
  }
  togglePasswordMode(itm) {
    let input = itm.closest('ion-item').find('[name="pass"]');
    let icon = itm.closest('ion-item').find('.iconPass');
    if (input.is('[type="password"]')) {
      input.attr('type', 'text');
      icon.attr('name', 'eye-off');
    }
    else {
      input.attr('type', 'password');
      icon.attr('name', 'eye');
    }
  }
  appsList(apps, GUID, authToken) {
    let html = `
    <span>
      <ion-header fullscreen>
        <ion-toolbar class='applist'>
          <ion-title>${util.translate('login.appsListTitle')}</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="loginpage"> 
        <ion-list>     
    `;
    for (var i = 0; i < apps.length; i++) {
      html += `
          <ion-item id="${i}">
            <ion-label>
              <h2><i class="flx-icon icon-${apps[i].IconName}"></i> ${apps[i].Title}</h2>
              <p>${apps[i].Descrip ? apps[i].Descrip : ''}</p>
            </ion-label>
          </ion-item>
      `;
    }
    html += `
        </ion-list>
      </ion-content>
    </span>
    `;
    let content = jquery(html);
    content.find('ion-item[id]').on('click', el => {
      this.navToSelectedApp(el.currentTarget.id, GUID, authToken);
    });
    this.modal = document.createElement('ion-modal');
    this.modal.component = content[0];
    document.body.appendChild(this.modal);
    this.modal.present();
  }
  async navToSelectedApp(appName, GUID, authToken) {
    this.closeAppSelector();
    ConftokenProvider.setApp(this.apps[appName], this.url, this.user, GUID, authToken).then(async (data) => {
      this.afterAppIsSet(data);
    });
  }
  async afterAppIsSet(data) {
    if (data.new) {
      let redirect = "flexygo.nav._nav('/home','root').then(() => { document.location.reload(); });";
      flxSync.syncData(false, redirect);
    }
    else {
      await ConftokenProvider.changeCurrentApp(data.GUID);
      await nav._nav('/home', 'root');
      document.location.reload();
    }
  }
  async closeAppSelector() {
    this.modal.dismiss();
  }
  render() {
    return [
      h("ion-header", { class: this.comes_from_sleep ? 'ion-no-border' : 'hidden' }, h("ion-toolbar", { color: "header", class: "ion-text-center" }, h("ion-buttons", { slot: "end" }, h("ion-button", { color: "outstanding", onClick: () => { nav._nav('sleep', 'root'); } }, h("ion-icon", { slot: "icon-only", name: "arrow-undo-outline" }))))),
      h("ion-content", { class: (this.comes_from_sleep ? "comesFromSleep" : "") + " ion-padding loginpage" }, h("div", { class: "loginScreen" }, h("div", { class: "ion-text-center ion-padding-horizontal" }, h("ion-label", null, h("img", { alt: "Logo", style: { maxHeight: "80px" }, src: this.logo }))), h("div", { class: "ion-padding" }, h("ion-item", { id: "url-item" }, h("ion-input", { name: "url", type: "url", onChange: () => this.onURLChange(), value: this.url, placeholder: "app.company.com" }), h("ion-spinner", { class: "urlSpinner hidden" }), h("ion-icon", { class: "urlState" }), h("label", { id: "URLError", class: "error hidden" }, util.translate('login.wrongtURL', true)), h("ion-icon", { name: "globe", slot: "start", class: "ion-align-self-center" })), h("ion-item", { id: "username-item" }, h("ion-input", { name: "user", type: "text", onInput: (ev) => this.user = ev.target.value, value: this.user, placeholder: util.translate('login.username', true) }), h("ion-icon", { name: "person", slot: "start", class: "ion-align-self-center" })), h("ion-item", { id: "password-item", class: "logItem" }, h("ion-input", { id: "passInput", name: "pass", type: "password", onInput: (ev) => this.pass = ev.target.value, onIonFocus: (ev) => { ev.target.querySelector('input').select(); }, clearOnEdit: "false", value: this.pass, placeholder: util.translate('login.password', true) }), h("ion-icon", { name: "lock-closed", slot: "start", class: "ion-align-self-center" }), h("ion-icon", { class: "iconPass", name: "eye", slot: "end", onClick: (ev) => { this.togglePasswordMode(jquery(ev.currentTarget)); } }))), h("div", { class: "ion-padding" }, h("ion-button", { size: "large", color: "outstanding", shape: "round", expand: "block", onClick: () => this.login() }, util.translate('login.login', true))), this.aad_url ?
        h("div", { class: "ion-padding" }, h("ion-button", { id: "sso-button", size: "large", shape: "round", expand: "block", onClick: () => this.loginBySSO() }, h("img", { class: "ahora-logo", src: "./assets/icon/ahora-icon.svg" }), h("span", null, util.translate('login.loginWith', true)), h("img", { class: "business-hub-logo", src: "./assets/icon/business-hub.svg" })))
        :
          null))
    ];
  }
  get component() { return getElement(this); }
};
FlxLogin.style = flxLoginCss;

export { FlxLogin as flx_login };
