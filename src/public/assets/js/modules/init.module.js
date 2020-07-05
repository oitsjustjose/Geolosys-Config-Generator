import * as events from './events.module.js';
import * as OreFormRenderer from './renderer/ore.module.js';
import * as StoneFormRenderer from './renderer/stone.module.js';

window.addEventListener('load', () => {
    events.preInit();
    OreFormRenderer.init();
    StoneFormRenderer.init();
    events.init();

    /* Give the body enough space for a bottom navbar */
    document.body.style.paddingBottom = `${document.querySelector('.navbar.fixed-bottom').clientHeight}px`;

    document.body.classList.add('show');
});