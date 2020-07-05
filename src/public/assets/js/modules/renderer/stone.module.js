import * as components from './components.module.js';
import * as events from '../events.module.js';

export const init = () => {
    components.makeCard(document.getElementById('stoneconfig'), makeForm);
};

/**
 * @param {boolean} usingNewConfig 
 */
const makeForm = (usingNewConfig) => {
    const form = document.createElement('form');
    form.style.padding = '12px';

    form.appendChild(components.makeHeader('Stone Block'));
    const stoneWrapper = document.createElement('div');
    stoneWrapper.className = 'mb-3';
    const nameInput = document.createElement('input');
    nameInput.className = 'form-control';
    nameInput.type = 'text';
    nameInput.name = 'name';
    nameInput.setAttribute('data-toggle', 'tooltip');
    nameInput.setAttribute('data-placement', 'top');
    nameInput.setAttribute('data-html', 'true');
    nameInput.setAttribute('title', 'Format: &lt;modid:block&gt; or &lt;modid:block:meta&gt;');
    nameInput.setAttribute('required', 'required');
    new bootstrap.Tooltip(nameInput, {});
    stoneWrapper.appendChild(nameInput);
    form.appendChild(stoneWrapper);

    form.appendChild(components.makeHeader('Maximum Y-Level'));
    const yMaxWrapper = document.createElement('div');
    yMaxWrapper.className = 'mb-3';
    const yMax = document.createElement('input');
    yMax.className = 'form-control';
    yMax.value = 1;
    yMax.type = 'number';
    yMax.min = 0;
    yMax.max = 255;
    yMax.name = 'yMax';
    yMax.setAttribute('required', 'required');
    yMaxWrapper.appendChild(yMax);
    form.appendChild(yMaxWrapper);

    form.appendChild(components.makeHeader('Minimum Y-Level'));
    const yMinWrapper = document.createElement('div');
    yMinWrapper.className = 'mb-3';
    const yMin = document.createElement('input');
    yMin.className = 'form-control';
    yMin.value = 0;
    yMin.type = 'number';
    yMin.min = 0;
    yMin.max = 255;
    yMin.name = 'yMin';
    yMin.setAttribute('required', 'required');
    yMinWrapper.appendChild(yMin);
    form.appendChild(yMinWrapper);

    form.appendChild(components.makeHeader('Chance <a href="https://oitsjustjo.se/M3NfQxBsZ" target="_blank">(Relative to All Chances)</a>'));
    const chanceTheWrapper = document.createElement('div');
    chanceTheWrapper.className = 'mb-3';
    const chance = document.createElement('input');
    chance.className = 'form-control';
    chance.type = 'number';
    chance.min = 1;
    chance.name = 'chance';
    chance.setAttribute('required', 'required');
    chanceTheWrapper.appendChild(chance);
    form.appendChild(chanceTheWrapper);

    form.appendChild(components.makeHeader('Size'));
    const sizeWrapper = document.createElement('div');
    sizeWrapper.className = 'mb-3';
    const size = document.createElement('input');
    size.className = 'form-control';
    size.type = 'number';
    size.min = 1;
    size.name = 'size';
    size.setAttribute('required', 'required');
    sizeWrapper.appendChild(size);
    form.appendChild(sizeWrapper);

    form.appendChild(components.makeHeader('Dimension Blacklist'));
    const dimBlWrapper = document.createElement('div');
    dimBlWrapper.className = 'mb-3';
    dimBlWrapper.appendChild(
        components.makeExpandableSet(
            'dimBlacklist',
            dimBlWrapper,
            document.getElementById('switch-112-mode').checked ? 'text' : 'number',
            document.getElementById('switch-112-mode').checked ? '&lt;modid:dimension&gt;' : null
        )
    );
    form.appendChild(dimBlWrapper);

    return form;
};