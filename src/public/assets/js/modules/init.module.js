import * as events from './events.module.js';
import * as OreFormRenderer from './renderer/ore.module.js';
import * as StoneFormRenderer from './renderer/stone.module.js';

window.addEventListener('load', () => {
    events.preInit();
    OreFormRenderer.init();
    StoneFormRenderer.init();
    events.init();
    document.body.classList.add('show');
});