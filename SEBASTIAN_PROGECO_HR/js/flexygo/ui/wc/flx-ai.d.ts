declare var webkitSpeechRecognition: any;
declare var marked: any;
/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    interface ChatGPTMessageContent {
        type: string;
        text?: string;
        image_url?: {
            url: string;
        };
        file?: {
            filename: string;
            file_data: string;
        };
        filename?: string;
        filetype?: string;
    }
    interface ChatGPTDocument {
        type: string;
        content: string;
        name?: string;
    }
    /**
    * Library for the FlxAIElement
    *
    * @class FlxAIElement
    * @constructor
    * @return {FlxAIElement} .
    */
    export class FlxAIElement extends HTMLElement {
        constructor();
        targetItem: JQuery;
        objectTemplate: string;
        extensions: string;
        initTemplate: string;
        messageTemplate: string;
        /**
        * Array of observed attributes. REQUIRED
        * @property observedAttributes {Array}
        */
        static readonly observedAttributes: string[];
        /**
        * Set if element has been connected to DOM
        * @property connected {boolean}
        */
        connected: boolean;
        /**
        * ChatGPT settings
        * @property settings {string}
        */
        settings: flexygo.api.ChatGPTSetting;
        /**
        * ChatGPT settings Id
        * @property settingId {string}
        */
        settingId: string;
        /**
        * ChatGPT messages
        * @property messages {string}
        */
        messages: any[];
        /**
         * Conversation Id
         * @property conversationId
         */
        conversationId: string;
        /**
         * Documents
         * @property documents {string[]}
         */
        documents: ChatGPTDocument[];
        isTemplate: boolean;
        defaults: any;
        /**
        * Fires when element is attached to DOM
        * @method connectedCallback
        */
        connectedCallback(): void;
        /**
        * Init the webcomponent. REQUIRED.
        * @method init
        */
        init(): void;
        /**
        * Refresh de webcomponent. REQUIRED.
        * @method refresh
        */
        refresh(): void;
        input: HTMLTextAreaElement;
        sendButton: JQuery;
        voiceButton: JQuery;
        documentButton: JQuery;
        documentInput: JQuery;
        recognition: any;
        /**
        * Render HTML data.
        * @method render
        */
        render(): void;
        readDocuments(event: any): void;
        addDocuments(content: any, type: any, file?: any): Promise<void>;
        clearDocuments(identificator: any): void;
        getButtons(): void;
        /**
        * Send message to AI.
        * @method sendToAI
        * @param {String} message. Message to send to AI
        */
        sendToAI(message: ChatGPTMessageContent[]): void;
        writeMessage(role: any, avatar: any, srcavatar: any, author: any, time: any, message: any, enableReturn: any, positionClass: any, name: any, ProfilePhoto: any, originalMessage?: any): void;
        parseToMarkdown(message: any): string;
        updateLastMessage(role: any, avatar: any, srcavatar: any, author: any, time: any, message: any, enableReturn: any, positionClass: any, profilePhoto: any, originalMessage?: any): void;
        updateLastFunctionMessage(avatar: any, srcavatar: any, author: any, time: any, message: any, enableReturn: any, positionClass: any, originalMessage: any): void;
        setReturnButton(msgElement: JQuery, originalMessage: any): void;
        resetAttachments(): void;
        modifyForTemplates(json: any, plainJson: any, instructions: any): void;
        documentLoading(hasEnter: any): void;
        getDocumentIconClass(type: any): "flx-icon icon-pdf-1" | "flx-icon icon-txt-file-symbol" | "fa fa-file-word-o" | "fa fa-file-code-o";
        /**
        *
        * @method open
        */
        open(options: flexygo.api.ChatGPTOptions): void;
        open_from_toolbar(settingId: string, module: JQuery, defaults: any, initialMessage: {
            docs?: ChatGPTDocument[];
            role: string;
            text?: string;
        } | null, hideFirstAIMessage?: boolean, hideInitialMessage?: boolean, waitForResponse?: boolean): Promise<void>;
        open_conversation(settingId: string, conversationId: string, module: JQuery): void;
        close(e?: flexygo.events.FlexygoEvent): void;
        resizeInput(): void;
        /**
        * Fires when the attribute value of the element is changed.
        * @method attributeChangedCallback
        */
        attributeChangedCallback(attrName: any, oldVal: any, newVal: any): void;
        /**
        * Fires when element is detached to DOM
        * @method disconnectedCallback
        */
        disconnectedCallback(): void;
    }
    export {};
}
