/**
 * @namespace flexygo.ui.wc
 */
declare namespace flexygo.ui.wc {
    /**
    * Library for the FlxAddonMarketElement
    *
    * @class FlxAddonMarketElement
    * @constructor
    * @return {FlxAddonMarketElement} .
    */
    class FlxAddonMarketElement extends HTMLElement {
        constructor();
        /**
        * Array of observed attributes. REQUIRED
        * @property observedAttributes {Array}
        */
        static readonly observedAttributes: string[];
        /**
        * Component Module Name
        * @property moduleName {string}
        */
        moduleName: string;
        /**
        * Set if element has been connected to DOM
        * @property connected {boolean}
        */
        connected: boolean;
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
        /**
        * Render HTML data.
        * @method render
        */
        render(): void;
        installAddon(id: string, version: string): void;
        uninstallAddon(id: string): void;
        /**
        * Fires when element is attached to DOM
        * @method connectedCallback
        */
        connectedCallback(): void;
        /**
        * Fires when the attribute value of the element is changed.
        * @method attributeChangedCallback
        */
        attributeChangedCallback(attrName: any, oldVal: any, newVal: any): void;
    }
}
