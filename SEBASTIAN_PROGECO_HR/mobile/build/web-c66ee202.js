import { H as WebPlugin } from './conftoken-949aae77.js';
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

class ZPLPrinterWeb extends WebPlugin {
    async echo(options) {
        console.log('ECHO', options);
        return options;
    }
    print(options) {
        console.log(options);
        return new Promise((resolve, reject) => {
            if (options) {
                resolve(true);
            }
            else {
                reject(false);
            }
        });
    }
    listenPrinters() { }
    openBluetoothSettings() { }
    enableBluetooth() { }
    disconnect() { }
    getStatusPrinter() { }
    getZPLFromImage() { }
}

export { ZPLPrinterWeb };
