import { H as WebPlugin } from './conftoken-949aae77.js';
import { I as ImpactStyle, N as NotificationType } from './app-globals-ae429937.js';
import './process-es6-cc264d03.js';
import './jquery-254bc370.js';
import './_commonjsHelpers-2a12c1e6.js';
import './utils-515e0805.js';
import './index-3f6ae35e.js';
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
import './whiteboard-1d18dc95.js';
import './parser-ca618554.js';
import './index-f4584d95.js';

class HapticsWeb extends WebPlugin {
    constructor() {
        super(...arguments);
        this.selectionStarted = false;
    }
    async impact(options) {
        const pattern = this.patternForImpact(options === null || options === void 0 ? void 0 : options.style);
        this.vibrateWithPattern(pattern);
    }
    async notification(options) {
        const pattern = this.patternForNotification(options === null || options === void 0 ? void 0 : options.type);
        this.vibrateWithPattern(pattern);
    }
    async vibrate(options) {
        const duration = (options === null || options === void 0 ? void 0 : options.duration) || 300;
        this.vibrateWithPattern([duration]);
    }
    async selectionStart() {
        this.selectionStarted = true;
    }
    async selectionChanged() {
        if (this.selectionStarted) {
            this.vibrateWithPattern([70]);
        }
    }
    async selectionEnd() {
        this.selectionStarted = false;
    }
    patternForImpact(style = ImpactStyle.Heavy) {
        if (style === ImpactStyle.Medium) {
            return [43];
        }
        else if (style === ImpactStyle.Light) {
            return [20];
        }
        return [61];
    }
    patternForNotification(type = NotificationType.Success) {
        if (type === NotificationType.Warning) {
            return [30, 40, 30, 50, 60];
        }
        else if (type === NotificationType.Error) {
            return [27, 45, 50];
        }
        return [35, 65, 21];
    }
    vibrateWithPattern(pattern) {
        if (navigator.vibrate) {
            navigator.vibrate(pattern);
        }
        else {
            throw this.unavailable('Browser does not support the vibrate API');
        }
    }
}

export { HapticsWeb };
