import { r as registerPlugin } from './conftoken-949aae77.js';

const Browser = registerPlugin('Browser', {
    web: () => import('./web-51fe6817.js').then(m => new m.BrowserWeb()),
});

export { Browser as B };
