import * as events from './events.module.js';
import * as renderer from './generators.module.js';

window.addEventListener('load', () => {
    events.preInit();
    renderer.init();
    events.init();
});