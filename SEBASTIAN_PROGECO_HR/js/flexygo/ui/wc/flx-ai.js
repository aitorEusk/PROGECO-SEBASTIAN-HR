var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
            * Library for the FlxAIElement
            *
            * @class FlxAIElement
            * @constructor
            * @return {FlxAIElement} .
            */
            class FlxAIElement extends HTMLElement {
                constructor() {
                    //If a constructor is defined, is REQUIRED call the super constructor
                    super();
                    this.extensions = ".jpg,.jpeg,.png,.gif,.pdf,.docx,.odt,.c,.h,.cpp,.cc,.cxx,.hpp,.cs,.java,.py,.js,.mjs,.cjs,.ts,.php,.rb,.go,.rs,.swift,.kt,.kts,.scala,.sh,.bash,.lua,.pl,.r,.dart,.html,.htm,.css,.xml,.json,.sql,.asm,.s,.ps,.ps1,.bat,.txt,.csv,.log";
                    this.initTemplate = `
<div class="chat_window">
    <div class="top-menu">
        <div class="close-button">
            <div class="fa fa-close chat_ai_close"></div>
        </div>
        <div class="title">
            <h3>{{name}}</h3>
       </div>
       <div class="top-right-menu">
            <div class="fullscreen-button">
                <i class="flx-icon icon-select clickable ui-widget-content" title="Put in main frame"></i>
            </div>
            <div class="ai-title">
                <div title="${flexygo.localization.translate('flxai.aitooltip')} {{model}}" data-toggle="tooltip" data-placement="top">
                        <h3><i class="title-content">${flexygo.localization.translate('flxai.aititle')}</i></h3>
                </div>
            </div>
        </div>
    </div>
    <ul class="messages">
    </ul>
    <div class="bottom_wrapper">
        <div class="document_input_wrapper"></div>
        <div class="message_input_wrapper">
            <div class="textarea_container">
                <textarea class="message_input" tabindex="2" placeholder="${flexygo.localization.translate('flxai.placeholder')} "></textarea>
            </div>
            <button id="send_document" class="send_message btn" title="${flexygo.localization.translate('flxai.senddocument')}.">
                <i class="notloading flx-icon icon-clip"></i>
                <i class="loading flx-icon icon-load icon-spin" style="display: none;"></i>
            </button>
            <button id="send_voice_message" class="send_message btn flx-icon icon-mic"></button>
            <button id="send_text_message" class="send_message btn flx-icon icon-order-right" disabled></button>
            <input id="send_document_input" type="file" accept="${this.extensions}" style="display: none;">
        </div>
        <div class="chat_tools btn-group"></div>
    </div>
</div>`;
                    this.messageTemplate = `
      <li class="message {{positionClass}}">
  <div class="avatar">
    <img src="{{srcavatar}}" is="flx-img" alt="{{avatar}}" class="chatter_thread_message_avatar img-circle">
    <div class="chat_ai_timestamp">{{time}}</div>
  </div>
  <div class="text_wrapper">
    <div class="chat_ai_author">
        <span>{{author}}</span>
        
    </div>
    <div class="chat_ai_text">{{message}}</div>
  </div>
</li>`;
                    /**
                    * Set if element has been connected to DOM
                    * @property connected {boolean}
                    */
                    this.connected = false;
                    /**
                    * ChatGPT messages
                    * @property messages {string}
                    */
                    this.messages = [];
                    /**
                     * Documents
                     * @property documents {string[]}
                     */
                    this.documents = [];
                    this.isTemplate = false;
                }
                /**
                * Fires when element is attached to DOM
                * @method connectedCallback
                */
                connectedCallback() {
                    this.connected = true;
                    if ($(this).attr('manualInit') != 'true') {
                        this.init();
                    }
                }
                /**
                * Init the webcomponent. REQUIRED.
                * @method init
                */
                init() {
                    var _a;
                    let me = $(this);
                    me.removeAttr('manualInit');
                    let objectwhere = me.attr("objectwhere");
                    if (!flexygo.utils.isBlank(me.attr("SettingId"))) {
                        this.settingId = me.attr("SettingId");
                    }
                    else {
                        let match = objectwhere ? objectwhere.match(/SettingId='(.*?)'/) : null;
                        this.settingId = match ? match[1] : null;
                    }
                    if (!flexygo.utils.isBlank(me.attr("ConversationId"))) {
                        this.conversationId = me.attr("ConversationId");
                    }
                    else {
                        let match = objectwhere ? objectwhere.match(/ConversationId='(.*?)'/) : null;
                        this.conversationId = match ? match[1] : null;
                    }
                    let module = (_a = this.targetItem) === null || _a === void 0 ? void 0 : _a.closest('flx-module')[0];
                    let obj = '';
                    let tmp = '';
                    if (module != null) {
                        if (module.objectname == "sysObjectTemplate" || module.objectname == "temp") {
                            this.isTemplate = true;
                            obj = $(module.closest('flx-module')).find('input[name="ObjectName"][type="text"]').val();
                            tmp = $(module.closest('flx-module')).find('input[name="TemplateId"]').val();
                            this.conversationId = obj + "-" + tmp;
                        }
                    }
                    if (flexygo.utils.isBlank(me.attr("typeId"))) {
                        me.attr("typeId", "chat");
                    }
                    if (me.attr("typeId") == "chat") {
                        flexygo.events.on(this, "dialog", "closing", this.close);
                    }
                    if (marked !== undefined) {
                        marked.use({
                            extensions: [{
                                    name: 'link',
                                    renderer(token) {
                                        return `<a target="_blank" href="${token.href}">${token.text}</a>`;
                                    }
                                }]
                        });
                    }
                    flexygo.ajax.post('~/api/AI', 'GetChatGPTSetting', { SettingId: this.settingId, Defaults: this.defaults }, (response) => {
                        if (response && response.AssistantId == this.settingId) {
                            this.settings = response;
                            this.settings.ProfilePhoto = flexygo.utils.resolveUrl(this.settings.ProfilePhoto);
                            this.render();
                            this.getButtons();
                            let beginMessage = flexygo.utils.isBlank(this.settings.IntroMessage) ? flexygo.localization.translate('flxai.beginMessage') : this.settings.IntroMessage;
                            this.writeMessage("assistant", 'AI', this.settings.ProfilePhoto, this.settings.Name, moment().format('LT'), beginMessage, false, "left_message", this.settings.Name, this.settings.ProfilePhoto);
                            if (!flexygo.utils.isBlank(this.conversationId)) {
                                let params = [];
                                params.push({ 'key': 'SettingId', 'value': this.settingId }, { 'key': 'ConversationId', 'value': this.conversationId }, { 'key': 'Type', 'value': this.isTemplate ? 'TemplateHelper' : '' });
                                flexygo.nav.execProcess("loadGPTConversation", 'sysObjectTemplate', `TemplateId = '${tmp}'`, null, params, "modal640x480", false, $(this), null, false, null, null);
                            }
                            else {
                                this.conversationId = flexygo.utils.uniqueUUID();
                            }
                        }
                        else {
                            flexygo.msg.error(flexygo.localization.translate('flxai.settingNotFound').replace("{0}", this.settingId));
                        }
                    }, (error) => {
                        flexygo.exceptions.httpShow(error);
                        this.close();
                    });
                }
                /**
                * Refresh de webcomponent. REQUIRED.
                * @method refresh
                */
                refresh() {
                    this.messages = [];
                    if ($(this).attr('manualInit') != 'true') {
                        this.init();
                    }
                }
                /**
                * Render HTML data.
                * @method render
                */
                render() {
                    let me = this;
                    $(this).empty;
                    if (this.settings) {
                        $(this).html(flexygo.utils.parser.compile({ "name": this.settings.Name, "model": this.settings.Model }, this.initTemplate));
                    }
                    else {
                        $(this).html(flexygo.utils.parser.compile({ "name": 'Chat', "model": 'GPT' }, this.initTemplate));
                    }
                    $(this).find('[data-toggle="tooltip"]').tooltip();
                    this.input = $(this).find('.message_input_wrapper .message_input')[0];
                    this.sendButton = $(this).find('#send_text_message');
                    this.voiceButton = $(this).find('#send_voice_message');
                    this.documentButton = $(this).find('#send_document');
                    this.documentInput = $(this).find('#send_document_input');
                    this.sendButton.hide(); // Hide send button at start
                    if ($(this).attr("typeId") == "chat") {
                        $(this).find('.chat_ai_close').off('click.closeAI').on('click.closeAI', () => {
                            me.close();
                        });
                        $(this).closest('.ui-dialog[role="dialog"]').off('click.close_chat_ai').on('click.close_chat_ai', (e) => {
                            if ($(e.target.closest('flx-ai')).length == 0 && !$(e.target).is('button.ui-dialog-titlebar-close')) {
                                me.close();
                            }
                        });
                    }
                    if (this.isTemplate) {
                        $(this).find('.fullscreen-button').hide();
                    }
                    $(this).find('.fullscreen-button').on('click', () => {
                        me.close();
                        me.parentElement.parentElement.remove();
                        let where = `SettingId='${this.settingId}'`;
                        if (this.messages.length > 1)
                            where = `SettingId='${this.settingId}' AND ConversationId='${this.conversationId}'`;
                        flexygo.nav.openPageName('AssistantChatFullScreen', null, where, JSON.stringify({ 'conversationId': this.conversationId }), 'current', false);
                    });
                    this.sendButton.off('click.send_message_AI').on('click.send_message_AI', (e) => {
                        if (!e.currentTarget.hasAttribute("disabled")) {
                            if (!flexygo.utils.isBlank(this.settings.Token) && this.settings.Token == 'Valid') {
                                const msgs = [];
                                me.documents.forEach((doc) => {
                                    if (doc.type === "image") {
                                        msgs.push({ "type": "image_url", "image_url": { "url": doc.content }, "filename": doc.name, "filetype": doc.type });
                                    }
                                    else if (doc.type === "pdf") {
                                        msgs.push({ "type": "file", "file": { "filename": doc.name, "file_data": doc.content }, "filename": doc.name, "filetype": doc.type });
                                    }
                                    else {
                                        msgs.push({ "type": "text", "text": doc.content, "filename": doc.name, "filetype": doc.type });
                                    }
                                });
                                msgs.push({ "type": "text", "text": this.input.value });
                                this.sendToAI(msgs);
                            }
                            else {
                                let btnLink = '<a class="btn fa fa-external-link" onclick="flexygo.nav.openHelpId(\'syshelp-OpenAI\',\'new\',false,$(this))" target="_blank"/a>';
                                flexygo.msg.alert(`<div><span>${flexygo.localization.translate('flxai.alertInfoMessage')}</span> ${btnLink}</div>`);
                            }
                        }
                    });
                    this.voiceButton.on('click', (e) => {
                        if (this.voiceButton.hasClass("listening")) {
                            this.recognition.stop();
                        }
                        else {
                            let speechOk = false;
                            const speech_recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                            try {
                                if (speech_recognition) {
                                    speechOk = true;
                                }
                            }
                            catch (ex) {
                                speechOk = false;
                            }
                            if (speechOk) {
                                this.recognition = new speech_recognition();
                                this.recognition.interimResults = true;
                                this.recognition.continuous = true;
                                this.recognition.lang = flexygo.context.currentUserCultureId;
                                this.recognition.start();
                                const pastInput = this.input.value;
                                this.recognition.onstart = () => {
                                    this.sendButton.prop("disabled", true);
                                    this.input.placeholder = flexygo.localization.translate('flxsearch.speak');
                                    this.voiceButton.addClass('listening');
                                };
                                const is_android = flexygo.utils.getOS() === 'ANDROID';
                                this.recognition.onresult = (event) => {
                                    //We use the result with the highest confidence
                                    let result, greatest_confidence = -1;
                                    for (let i = 0; i < event.results.length; i++) {
                                        const new_result = event.results[i];
                                        if (new_result[0].confidence > greatest_confidence) {
                                            result = new_result;
                                        }
                                    }
                                    if (pastInput.trim().length > 0) {
                                        this.input.value = pastInput + ' ' + result[0].transcript;
                                    }
                                    else {
                                        this.input.value = result[0].transcript;
                                    }
                                    me.resizeInput();
                                    //We do not stop on android to avoid unintended behaviours, because it would stop after just a few words
                                    if (result.isFinal && !is_android) {
                                        this.recognition.stop();
                                    }
                                };
                                this.recognition.onspeechend = () => {
                                    this.recognition.stop();
                                };
                                this.recognition.onend = () => {
                                    this.voiceButton.removeClass('listening');
                                    this.input.placeholder = flexygo.localization.translate('flxai.placeholder');
                                    if (!flexygo.utils.isAgentMobile())
                                        this.input.focus();
                                    // when finish put the send button again
                                    if (this.input.value.trim().length > 0) {
                                        this.sendButton.removeAttr("disabled");
                                        me.sendButton.show();
                                        me.voiceButton.hide();
                                    }
                                };
                            }
                            else {
                                $('#send_voice_message').remove();
                            }
                        }
                    });
                    $(this.input).keydown(function (event) {
                        if (event.keyCode === 13 && !event.shiftKey) {
                            event.preventDefault();
                            me.sendButton.click();
                            me.sendButton.hide();
                            me.voiceButton.show();
                        }
                    });
                    $(this.input).off('input').on('input', () => {
                        if (me.input.value && !me.sendButton.hasClass("waitingResponse")) {
                            me.sendButton.removeAttr("disabled");
                        }
                        else {
                            me.sendButton[0].setAttribute("disabled", "disabled");
                        }
                        if (me.input.value) {
                            me.sendButton.show();
                            me.voiceButton.hide();
                        }
                        else {
                            me.sendButton.hide();
                            me.voiceButton.show();
                        }
                        me.resizeInput();
                    });
                    $(this.documentButton).on('click', (e) => {
                        this.documentInput.click();
                    });
                    $(this.documentInput).on("change", (event) => {
                        this.readDocuments(event);
                    });
                }
                readDocuments(event) {
                    const inputElement = event.target;
                    if (inputElement.files && inputElement.files.length > 0) {
                        let me = this;
                        let file = inputElement.files[0];
                        let type = "";
                        var ext = file.name.toLowerCase().match(/\.([^\.]+)$/)[1];
                        switch (ext) {
                            case 'jpg':
                            case 'jpeg':
                            case 'png':
                            case 'gif':
                                type = "image";
                                break;
                            case 'pdf':
                                type = "pdf";
                                break;
                            case 'docx':
                            case 'odt':
                                type = "word";
                                break;
                            case 'c':
                            case 'h':
                            case 'cpp':
                            case 'cc':
                            case 'cxx':
                            case 'hpp':
                            case 'cs':
                            case 'java':
                            case 'py':
                            case 'js':
                            case 'mjs':
                            case 'cjs':
                            case 'ts':
                            case 'php':
                            case 'rb':
                            case 'go':
                            case 'rs':
                            case 'swift':
                            case 'kt':
                            case 'kts':
                            case 'scala':
                            case 'sh':
                            case 'bash':
                            case 'lua':
                            case 'pl':
                            case 'r':
                            case 'dart':
                            case 'html':
                            case 'htm':
                            case 'css':
                            case 'xml':
                            case 'json':
                            case 'sql':
                            case 'asm':
                            case 's':
                            case 'ps':
                            case 'ps1':
                            case 'bat':
                                type = "code";
                                break;
                            case 'txt':
                            case 'csv':
                            case 'log':
                                type = "text";
                                break;
                        }
                        if (type.length > 0) {
                            const reader = new FileReader();
                            reader.onload = function (e) {
                                me.addDocuments(e.target.result, type, file);
                            };
                            if (type === "image" || type === "pdf") {
                                reader.readAsDataURL(file);
                            }
                            else {
                                reader.readAsText(file);
                            }
                        }
                        else {
                            flexygo.msg.warning(flexygo.localization.translate("flxai.mediatypenotallowed") + "!");
                        }
                    }
                }
                addDocuments(content, type, file = null) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const documentWrapper = $(".document_input_wrapper");
                        let name = file ? file.name : null;
                        this.documentLoading(true); // Show loading animation
                        if (type === "image") {
                            if ($(`.img_context[src="${content}"]`).length > 0)
                                return;
                            this.documents.push({ type, content });
                            documentWrapper.prepend(`
            <div class="ia-image-container">
                <img class="img_context" src="${content}" alt="${name}">
                <button class="close_image flx-icon icon-close" title="${flexygo.localization.translate("flxai.removedocument")}"></button>
                <p class="doc_name">${name}</p>
            </div>`);
                        }
                        else {
                            if (this.documents.some(doc => doc.name === name))
                                return;
                            this.documents.push({ type, content, name });
                            documentWrapper.prepend(`
            <div class="ia-image-container">
                <i class="img_context ${this.getDocumentIconClass(type)} dtc-icon" title="${name}"></i>
                <button class="close_image flx-icon icon-close" title="${flexygo.localization.translate("flxai.removedocument")}"></button>
                <p class="doc_name">${name}</p>
            </div>`);
                        }
                        this.documentLoading(false); // Stop loading animation
                        documentWrapper.find(".close_image").off("click").on("click", (event) => {
                            const container = $(event.target).closest(".ia-image-container");
                            const docTitle = container.find(".img_context").attr("title") || container.find(".img_context").attr("src");
                            container.remove();
                            this.clearDocuments(docTitle);
                            event.stopPropagation();
                        });
                        // Max 4 documents per message
                        if (this.documents.length >= 4) {
                            this.documentButton[0].setAttribute("disabled", "disabled");
                        }
                        if (!this.sendButton.hasClass("waitingResponse")) {
                            this.sendButton.removeAttr("disabled");
                        }
                        this.sendButton.show();
                        this.voiceButton.hide();
                    });
                }
                clearDocuments(identificator) {
                    this.documents.forEach((doc) => {
                        if (doc.content == identificator || doc.name != null && doc.name == identificator) {
                            let index = this.documents.indexOf(doc);
                            this.documents.splice(index, 1);
                        }
                    });
                    if (this.documents.length === 0 && !this.input.value) {
                        this.sendButton[0].setAttribute("disabled", "disabled");
                        this.sendButton.hide();
                        this.voiceButton.show();
                    }
                    if (this.documents.length < 4) {
                        this.documentButton.removeAttr("disabled");
                    }
                    const newInput = $(`<input id="send_document_input" type="file" accept="${this.extensions}" style="display: none;">`);
                    this.documentInput.replaceWith(newInput);
                    this.documentInput = $(this).find('#send_document_input');
                    $(this.documentInput).on("change", (e) => { this.readDocuments(e); });
                }
                getButtons() {
                    try {
                        let me = this;
                        this.settings.Buttons.forEach((button) => {
                            let btn = $(`<button id="${button.ButtonId}" class="btn btn-default ${button.IconName}" tabindex="5" type="button" title="${button.Title}"/>`);
                            if (!flexygo.utils.isBlank(me.targetItem) && me.targetItem.length > 0) {
                                let value = $(me.targetItem).attr("property");
                                if (!flexygo.utils.isBlank(value)) {
                                    button.Prompt = button.Prompt.replace(/{{Value}}/g, `{{${value}}}`);
                                }
                            }
                            if (!flexygo.utils.isBlank(me.defaults) && me.defaults.length > 0) {
                                me.defaults.forEach((pair) => {
                                    button.Prompt = button.Prompt.replace('{{' + pair.key + '}}', pair.value);
                                });
                            }
                            btn.off(`click.${button.ButtonId}`).on(`click.${button.ButtonId}`, () => {
                                me.sendButton.removeAttr("disabled");
                                me.input.value = button.Prompt;
                                me.sendButton.show();
                                me.voiceButton.hide();
                                me.sendButton.focus();
                                me.resizeInput();
                            });
                            $(this).find('.chat_tools').append(btn);
                        });
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
                /**
                * Send message to AI.
                * @method sendToAI
                * @param {String} message. Message to send to AI
                */
                sendToAI(message) {
                    var _a;
                    let json = new Object();
                    let plainJson = new Object();
                    let len = message.length - 1;
                    // Only if its not called from a toolbar
                    if (!flexygo.utils.isBlank(this.targetItem) && this.targetItem.length > 0 && $((_a = this.targetItem) === null || _a === void 0 ? void 0 : _a.context).is('button')) {
                        let module = this.targetItem.closest('flx-module')[0];
                        let properties = $(module).find('[property]');
                        properties.each(function () {
                            plainJson[$(this).attr('property')] = this.getValue();
                            if ($(this).is('flx-code')) {
                                let value = $(this).attr('type') == 'html' ? flexygo.string.escapeHTML(this.getValue()) : this.getValue();
                                json[$(this).attr('property')] = `<flx-code forcecodemirror="true" help mode="view" type="${$(this).attr('type')}" value="${value}"/>`;
                            }
                            else {
                                json[$(this).attr('property')] = this.getValue();
                            }
                        });
                    }
                    message[len].text = flexygo.utils.parseAIMessage(message[len].text);
                    let originalMessage = flexygo.utils.parser.recursiveCompile(plainJson, message[len].text);
                    message[len].text = flexygo.utils.parser.recursiveCompile(json, message[len].text);
                    let profilePhoto = flexygo.profiles.avatar;
                    if (profilePhoto == "~/img/Avatars/avatar_blank.png") {
                        profilePhoto = "";
                    }
                    else {
                        profilePhoto = flexygo.utils.resolveUrl(flexygo.profiles.avatar);
                    }
                    this.writeMessage("user", flexygo.context.currentUserLogin.toUpperCase(), profilePhoto, flexygo.context.currentUserFullName, moment().format('LT'), message, false, "right_message", this.settings.Name, '', originalMessage);
                    this.resetAttachments();
                    // Template modification add up
                    if (this.isTemplate) {
                        this.modifyForTemplates(json, plainJson, originalMessage);
                    }
                    let params = {
                        Chat: this.settings,
                        Messages: JSON.stringify(this.messages),
                        ConversationId: this.conversationId,
                        ConversationType: "Chat",
                    };
                    this.writeMessage("assistant", 'AI', this.settings.ProfilePhoto, this.settings.Name, moment().format('LT'), '<i class="flx-icon icon-load icon-pulse"></i>', false, "left_message", this.settings.Name, this.settings.ProfilePhoto);
                    flexygo.ajax.post("~/api/AI", 'RequestChatGPT', params, (response) => {
                        if (response) {
                            let resp = JSON.parse(response.Result);
                            if (resp.error) {
                                this.updateLastMessage("assistant", 'AI', this.settings.ProfilePhoto, this.settings.Name, moment().format('LT'), resp.error.message, false, "left_message", this.settings.ProfilePhoto);
                            }
                            else if (resp.choices && resp.choices[0]) {
                                if (resp.choices[0].message.content) {
                                    let originalMessage = resp.choices[0].message.content;
                                    let message = flexygo.utils.parseAIMessage(originalMessage);
                                    this.updateLastMessage("assistant", 'AI', this.settings.ProfilePhoto, this.settings.Name, moment().format('LT'), message, true, "left_message", this.settings.ProfilePhoto, originalMessage);
                                }
                                else {
                                    this.updateLastMessage("assistant", 'AI', this.settings.ProfilePhoto, this.settings.Name, moment().format('LT'), 'ERROR', false, "left_message", this.settings.ProfilePhoto);
                                }
                            }
                            else {
                                this.updateLastMessage("assistant", 'AI', this.settings.ProfilePhoto, this.settings.Name, moment().format('LT'), 'ERROR', false, "left_message", this.settings.ProfilePhoto);
                            }
                        }
                        this.sendButton.removeClass("waitingResponse");
                        if (this.input.value) {
                            this.sendButton.removeAttr("disabled");
                        }
                        else {
                            this.sendButton.hide();
                            this.voiceButton.show();
                        }
                    });
                }
                writeMessage(role, avatar, srcavatar, author, time, message, enableReturn, positionClass, name, ProfilePhoto, originalMessage = null) {
                    this.messages.push({ "role": role, "content": message });
                    if (originalMessage !== null) {
                        originalMessage = message[message.length - 1].text;
                    }
                    else {
                        originalMessage = message;
                    }
                    let msg = this.messageTemplate;
                    msg = flexygo.utils.parser.compile({ "avatar": avatar, "srcavatar": srcavatar, "author": author, time: time, "message": originalMessage, "positionClass": positionClass, "name": name, "ProfilePhoto": ProfilePhoto }, msg);
                    msg = $(msg);
                    if (typeof message !== "string") {
                        this.documents.forEach((doc) => {
                            const chatAiText = $(msg).find('.text_wrapper .chat_ai_text');
                            if (doc.type === "image") {
                                chatAiText.prepend(`<img class="chat_ai_image" src="${doc.content}">`);
                            }
                            else {
                                if (chatAiText.find('.chat_ai_documents').length === 0) {
                                    chatAiText.prepend(`<div class="chat_ai_documents"></div>`);
                                }
                                chatAiText.find('.chat_ai_documents').prepend(`
            <div class="chat_ai_file">
                <i class="${this.getDocumentIconClass(doc.type)} dtc-icon" title="${doc.name}"></i>
                <span class="doc_name">${doc.name}</span>
            </div>`);
                            }
                        });
                    }
                    $(this).find('.messages').append(msg);
                    $(this).find('.messages').scrollTop($(this).find('.message:last')[0].offsetTop);
                    msg.addClass('appeared');
                    setTimeout(() => {
                        $(this).find('.messages').scrollTop($(this).find('.message:last')[0].offsetTop);
                    }, 500);
                    if (enableReturn) {
                        this.setReturnButton(msg, originalMessage);
                    }
                }
                parseToMarkdown(message) {
                    if (typeof marked !== 'undefined') {
                        const codeBlocks = message.match(/<flx-code [\s\S]*?<\/flx-code>/g) || [];
                        let newMessage = message;
                        codeBlocks.forEach((codeBlock, index) => {
                            newMessage = message.replace(codeBlock, `__CODE_BLOCK_${index}__`);
                        });
                        newMessage = newMessage.replace(/<\/?p>/gi, '\n');
                        newMessage = newMessage.replace(/<br\s*\/?>/gi, '\n');
                        newMessage = newMessage.replace(/__CODE_BLOCK_(\d+)__/g, (match, index) => {
                            return codeBlocks[index];
                        });
                        return marked.parse(newMessage);
                    }
                    else {
                        return message;
                    }
                }
                updateLastMessage(role, avatar, srcavatar, author, time, message, enableReturn, positionClass, profilePhoto, originalMessage = null) {
                    this.messages[this.messages.length - 1] = { "role": role, "content": originalMessage ? originalMessage : message };
                    originalMessage = originalMessage ? originalMessage : message;
                    let msg;
                    try {
                        let parsedMessage = flexygo.utils.parseAIMessage(message);
                        msg = this.messageTemplate;
                        msg = flexygo.utils.parser.compile({ "avatar": avatar, "srcavatar": srcavatar, "author": author, time: time, "message": this.parseToMarkdown(message), "positionClass": positionClass, "ProfilePhoto": profilePhoto }, msg);
                        msg = $(msg);
                        $(this).find('.messages .message:last').replaceWith(msg);
                    }
                    catch (_a) {
                        msg = this.messageTemplate;
                        msg = flexygo.utils.parser.compile({ "avatar": avatar, "srcavatar": srcavatar, "author": author, time: time, "message": message, "positionClass": positionClass }, msg);
                        msg = $(msg);
                        $(this).find('.messages .message:last').replaceWith(msg);
                    }
                    msg.addClass('appeared');
                    setTimeout(() => { $(this).find('.messages').scrollTop($(this).find('.message:last')[0].offsetTop); }, 500);
                    if (enableReturn) {
                        this.setReturnButton(msg, originalMessage);
                    }
                    // If there are attached documents, activate directly the send button
                    if (this.documents.length > 0) {
                        this.sendButton.removeAttr("disabled");
                    }
                }
                updateLastFunctionMessage(avatar, srcavatar, author, time, message, enableReturn, positionClass, originalMessage) {
                    let msg = this.messageTemplate;
                    msg = flexygo.utils.parser.compile({ "avatar": avatar, "srcavatar": srcavatar, "author": author, time: time, "message": message, "positionClass": positionClass }, msg);
                    msg = $(msg);
                    $(this).find('.messages .message:last').replaceWith(msg);
                    msg.addClass('appeared');
                    setTimeout(() => { $(this).find('.messages').scrollTop($(this).find('.message:last')[0].offsetTop); }, 500);
                    if (enableReturn) {
                        this.setReturnButton(msg, originalMessage);
                    }
                }
                setReturnButton(msgElement, originalMessage) {
                    var _a;
                    // Only if its not called from a toolbar
                    if (!flexygo.utils.isBlank(this.targetItem) && this.targetItem.length > 0 && $((_a = this.targetItem) === null || _a === void 0 ? void 0 : _a.context).is('button')) {
                        // Avoid this behavior if called from Assistant list's direct chat button
                        if (this.targetItem.is('button')) {
                            return;
                        }
                        if (this.targetItem.is('flx-htmledit'))
                            originalMessage = flexygo.utils.parser.replaceAll(originalMessage, '\n', '<br/>');
                        if (msgElement.find('flx-code').length <= 0) {
                            msgElement.find('.chat_ai_author').append($('<button class="flx-icon icon-return-2 copy_response icon-zoom-115" type="button"/>'));
                            msgElement.find('.chat_ai_author .copy_response').on("click", () => {
                                if (this.targetItem.is('flx-code')) {
                                    this.targetItem[0].setValueWithHistory(originalMessage);
                                }
                                else {
                                    this.targetItem.val(originalMessage);
                                }
                                $(this).find('.chat_ai_close').click();
                            });
                        }
                    }
                }
                resetAttachments() {
                    // Reset text input
                    this.input.value = '';
                    this.input.style.height = "40px";
                    this.sendButton.addClass("waitingResponse");
                    this.sendButton[0].setAttribute("disabled", "disabled");
                    this.documentButton.removeAttr("disabled"); // In case is disabled because of max documents per message
                    // Clear document attachment handling
                    if (this.documents.length > 0) {
                        this.documents = [];
                        $(".document_input_wrapper").empty();
                        const newInput = $(`<input id="send_document_input" type="file" accept="${this.extensions}" style="display: none;">`);
                        this.documentInput.replaceWith(newInput);
                        this.documentInput = $(this).find('#send_document_input');
                        $(this.documentInput).on("change", (e) => { this.readDocuments(e); });
                    }
                }
                modifyForTemplates(json, plainJson, instructions) {
                    let menLen = this.messages.length - 1;
                    let conLen = this.messages[menLen].content.length - 1;
                    if (json["TemplateId"] == null) {
                        this.messages[menLen].content[conLen].text += '\n-- -\nThat is the user message, if it is asking to create or modify a template, do not do it.Tell him "Save first the template." in his language.If is not asking that help him with whatever may asked.';
                    }
                    else {
                        let msg = `If the users instructions are a question, provide an answer. However, ** ONLY ** if the user request is a template modification, modify the template according to the provided guidelines without pausing, stopping, or responding until all modification steps are completed. Directly call the \`modifyTemplate\` tool with the modified html, without informing or notifying the user.
    - Template Type: '${json["TypeId"]}'
    - Object Name: '${json["ObjectName"]}'
    - View Name: '${json["ViewName"]}'`;
                        if (json["TypeId"] == 'list') {
                            msg +=
                                `    - Header: ${plainJson["Header"]}
                        - Item Layout: ${plainJson["Body"]}
                        - Empty: ${plainJson["Empty"]}
                        - Footer: ${plainJson["Footer"]}`;
                        }
                        else {
                            msg +=
                                `    -Template: ${plainJson["Body"]}`;
                        }
                        msg +=
                            `    - User Instructions: Modify this template as a ${json["TypeId"]} template, following this instructions: ${instructions}`;
                        this.messages[menLen].content[conLen].text = msg;
                    }
                }
                documentLoading(hasEnter) {
                    if (hasEnter) {
                        this.sendButton[0].setAttribute("disabled", "disabled");
                        this.sendButton.addClass("waitingResponse");
                        this.documentButton[0].setAttribute("disabled", "disabled");
                        this.documentButton.find('.loading').show();
                        this.documentButton.find('.notloading').hide();
                    }
                    else {
                        this.sendButton.removeAttr("disabled");
                        this.sendButton.removeClass("waitingResponse");
                        this.documentButton.removeAttr("disabled");
                        this.documentButton.find('.notloading').show();
                        this.documentButton.find('.loading').hide();
                    }
                }
                getDocumentIconClass(type) {
                    switch (type) {
                        case "pdf":
                            return 'flx-icon icon-pdf-1';
                        case "text":
                            return 'flx-icon icon-txt-file-symbol';
                        case "word":
                            return 'fa fa-file-word-o';
                        case "code":
                            return 'fa fa-file-code-o';
                    }
                }
                /**
                *
                * @method open
                */
                open(options) {
                    if (!flexygo.utils.isBlank(options.TargetItem) && options.TargetItem.length > 0 || !flexygo.utils.isBlank(options.SettingId)) {
                        let histObj = new flexygo.nav.FlexygoHistory();
                        histObj.targetid = 'slideright';
                        let modal = flexygo.targets.createContainer(histObj, true, null, true);
                        if (!modal) {
                            return;
                        }
                        modal.empty();
                        modal.closest('.ui-dialog').find('.ui-dialog-title').html('Lowdy');
                        let id = options.TargetItem ? options.TargetItem[0].options.ChatGPTSettingId : options.SettingId;
                        let vm = ($(`<flx-ai SettingId="${id}" mode="template"></flx-ai>`)[0]);
                        vm.targetItem = options.TargetItem;
                        modal.append(vm);
                    }
                }
                open_from_toolbar(settingId, module, defaults, initialMessage, hideFirstAIMessage = false, hideInitialMessage = false, waitForResponse = false) {
                    var _a;
                    return __awaiter(this, void 0, void 0, function* () {
                        let histObj = new flexygo.nav.FlexygoHistory();
                        histObj.targetid = 'slideright';
                        let modal = flexygo.targets.createContainer(histObj, true, null, true);
                        if (!modal) {
                            return;
                        }
                        modal.empty();
                        modal.closest('.ui-dialog').find('.ui-dialog-title').html('Lowdy');
                        let vm = ($(`<flx-ai SettingId="${settingId}" mode="template"></flx-ai>`)[0]);
                        vm.targetItem = module;
                        if (defaults != null) {
                            vm.defaults = defaults;
                        }
                        modal.append(vm);
                        while (vm.settings == undefined) {
                            yield new Promise(resolve => setTimeout(resolve, 10));
                        }
                        // Parse & process each document & message uploaded
                        const msgs = [];
                        if (initialMessage != null) {
                            // Parse documents added for initial message
                            (_a = initialMessage.docs) === null || _a === void 0 ? void 0 : _a.forEach((doc) => {
                                if (doc.type === "image") {
                                    msgs.push({ "type": "image_url", "image_url": { "url": doc.content }, "filename": doc.name, "filetype": doc.type });
                                }
                                else if (doc.type === "pdf") {
                                    msgs.push({ "type": "file", "file": { "filename": doc.name, "file_data": doc.content }, "filename": doc.name, "filetype": doc.type });
                                }
                                else {
                                    msgs.push({ "type": "text", "text": doc.content, "filename": doc.name, "filetype": doc.type });
                                }
                            });
                            msgs.push({ "type": "text", "text": initialMessage === null || initialMessage === void 0 ? void 0 : initialMessage.text });
                        }
                        // Add defaults to the WC (Required for parsing of the variables in server-side code)
                        if (defaults != null) {
                            vm.defaults = defaults;
                        }
                        if (msgs != null && msgs.length > 0) {
                            if (waitForResponse)
                                $(vm).hide();
                            let messages = 0;
                            // Await until the ai default message appears in the component.
                            if (hideFirstAIMessage) {
                                while ($(vm).find('.message').length <= messages) {
                                    yield new Promise(resolve => setTimeout(resolve, 10));
                                }
                                $(vm).find('.message').first().remove();
                            }
                            else {
                                messages++;
                            }
                            //Impersonate the AI if the initialMessage role is "assistant"
                            if (initialMessage.role === 'assistant') {
                                vm.writeMessage("assistant", 'AI', vm.settings.ProfilePhoto, vm.settings.Name, moment().format('LT'), initialMessage.text, true, "left_message", vm.settings.ProfilePhoto, null);
                                if (waitForResponse)
                                    $(vm).show();
                                return;
                            }
                            else {
                                vm.sendToAI(msgs);
                            }
                            // Await until the defined initial message appears in the component.
                            if (initialMessage != null) {
                                if (hideInitialMessage) {
                                    while ($(vm).find('.message').length <= messages) {
                                        yield new Promise(resolve => setTimeout(resolve, 10));
                                    }
                                    $(vm).find('.message')[messages].remove();
                                }
                            }
                            // Await until the response is completely loaded in the component.
                            if (waitForResponse) {
                                flexygo.utils.showLoading();
                                while ($(vm).find('.message .icon-load').length > 0) {
                                    yield new Promise(resolve => setTimeout(resolve, 10));
                                }
                                flexygo.utils.removeLoadingEffect();
                                $(vm).show();
                            }
                        }
                    });
                }
                open_conversation(settingId, conversationId, module) {
                    let histObj = new flexygo.nav.FlexygoHistory();
                    histObj.targetid = 'slideright';
                    let modal = flexygo.targets.createContainer(histObj, true, null, true);
                    if (!modal) {
                        return;
                    }
                    modal.empty();
                    modal.closest('.ui-dialog').find('.ui-dialog-title').html('Lowdy');
                    let vm = ($(`<flx-ai SettingId="${settingId}" ConversationId="${conversationId}" mode="template"></flx-ai>`)[0]);
                    vm.targetItem = module;
                    modal.append(vm);
                }
                close(e) {
                    flexygo.events.off(this, "dialog", "closing");
                    let closeButton = $(this).closest('.ui-dialog').find('button.ui-dialog-titlebar-close');
                    if (closeButton.length > 0) {
                        $(this).find('.chat_window').addClass('closing');
                        closeButton.trigger('click');
                    }
                }
                resizeInput() {
                    this.input.style.height = '40px';
                    let initialChatWindowHeight = $(this).find('.chat_window').height();
                    const numberOfLines = Math.ceil(this.input.scrollHeight / 24) - 1;
                    const newHeight = numberOfLines == 1 ? 40 : 40 + (numberOfLines * 24);
                    if ($(this.input).height() < newHeight) {
                        this.input.style.height = `${newHeight}px`;
                    }
                }
                /**
                * Fires when the attribute value of the element is changed.
                * @method attributeChangedCallback
                */
                attributeChangedCallback(attrName, oldVal, newVal) {
                    let needInit = false;
                    if (attrName.toLowerCase() == 'settings' && newVal && newVal != '') {
                        this.settings = newVal;
                        needInit = true;
                    }
                    if (this.connected && needInit) {
                        this.init();
                    }
                }
                /**
                * Fires when element is detached to DOM
                * @method disconnectedCallback
                */
                disconnectedCallback() {
                    var _a;
                    if ((_a = this.voiceButton) === null || _a === void 0 ? void 0 : _a.hasClass("listening")) {
                        this.recognition.stop();
                    }
                }
            }
            /**
            * Array of observed attributes. REQUIRED
            * @property observedAttributes {Array}
            */
            FlxAIElement.observedAttributes = ['settings'];
            wc.FlxAIElement = FlxAIElement;
        })(wc = ui.wc || (ui.wc = {}));
    })(ui = flexygo.ui || (flexygo.ui = {}));
})(flexygo || (flexygo = {}));
window.customElements.define("flx-ai", flexygo.ui.wc.FlxAIElement);
//# sourceMappingURL=flx-ai.js.map