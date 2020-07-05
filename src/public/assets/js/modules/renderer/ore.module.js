import * as components from './components.module.js';
import * as events from '../events.module.js';

const depositTypeOptions = {
    'deposit': 'Normal',
    'depositMulti': 'Multi-Ore',
    'depositBiome': 'Biome Specific',
    'depositBiomeMulti': 'Multi-Ore & Biome Specific'
};

const structureTypeOptions = {
    'dense': 'Dense',
    'sparse': 'Sparse',
    'dike': 'Dike',
    'layer': 'Layer'
};

export const init = () => {
    components.makeCard(document.getElementById('oreconfig'), makeForm);
};

const makeForm = (usingNewConfig) => {
    const form = document.createElement('form');
    form.style.padding = '12px';

    form.appendChild(components.makeHeader('Deposit Name [Optional]'));

    const nameWrapper = document.createElement('div');
    nameWrapper.className = 'mb-3';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'form-control';
    nameInput.name = 'name';
    nameWrapper.appendChild(nameInput);
    form.appendChild(nameWrapper);

    form.appendChild(components.makeHeader('Deposit Type'));

    const depWrapper = document.createElement('div');
    depWrapper.className = 'mb-3';
    const depositType = document.createElement('select');
    depositType.className = 'form-select';
    depositType.name = 'DepositType';
    for (const [idx, key] of Object.keys(depositTypeOptions).entries()) {
        const opt = document.createElement('option');
        opt.value = key;
        opt.innerText = depositTypeOptions[key];
        if (idx == 0) {
            opt.selected = true;
        }
        depositType.appendChild(opt);
    }
    depWrapper.appendChild(depositType);
    form.appendChild(depWrapper);

    if (usingNewConfig) {
        form.appendChild(components.makeHeader('Deposit Structure Type (<b>1.14+ Only</b>)'));

        const strWrapper = document.createElement('div');
        strWrapper.className = 'mb-3';
        const structureType = document.createElement('select');
        structureType.className = 'form-select';
        structureType.name = 'type';
        for (const [idx, key] of Object.keys(structureTypeOptions).entries()) {
            const opt = document.createElement('option');
            opt.value = key;
            opt.innerText = structureTypeOptions[key];
            if (idx == 0) {
                opt.selected = true;
            }
            structureType.appendChild(opt);
        }
        strWrapper.appendChild(structureType);
        form.appendChild(strWrapper);
    }

    form.appendChild(components.makeHeader('Ore Blocks'));
    const oreWrapper = document.createElement('div');
    const oreInputs = components.makePair('ore', ['deposit', 'depositBiome'].includes(depositType.value), oreWrapper);
    oreWrapper.appendChild(oreInputs);
    form.appendChild(oreWrapper);

    /* Update type of ore wrapper based on change of depositType */
    depositType.addEventListener('change', () => {
        const type = depositType.value;
        oreWrapper.innerHTML = '';

        if (type == 'deposit' || type == 'depositBiome') {
            const newInput = components.makePair('ore', true, oreWrapper);
            oreWrapper.appendChild(newInput);
        } else if (type == 'depositMulti' || type == 'depositBiomeMulti') {
            const newInput = components.makePair('ore', false, oreWrapper);
            oreWrapper.appendChild(newInput);
        } else {
            alert(`Invalid type: ${type}`);
        }
    });

    form.appendChild(components.makeHeader('Sample Blocks'));
    const sampleWrapper = document.createElement('div');
    const sampleInputs = components.makePair('sample', ['deposit', 'depositBiome'].includes(depositType.value), sampleWrapper);
    sampleWrapper.appendChild(sampleInputs);
    form.appendChild(sampleWrapper);

    /* Update type of sample wrapper based on change of depositType */
    depositType.addEventListener('change', () => {
        const type = depositType.value;

        // delChildren(sampleWrapper);
        sampleWrapper.innerHTML = '';

        if (type == 'deposit' || type == 'depositBiome') {
            const newInput = components.makePair('ore', true, sampleWrapper);
            sampleWrapper.appendChild(newInput);
        } else if (type == 'depositMulti' || type == 'depositBiomeMulti') {
            const newInput = components.makePair('ore', false, sampleWrapper);
            sampleWrapper.appendChild(newInput);
        } else {
            alert(`Invalid type: ${type}`);
        }
    });

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

    events.initYListeners(yMin, yMax);

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

    form.appendChild(components.makeHeader('Density'));
    const densityWrapper = document.createElement('div');
    densityWrapper.className = 'mb-3';
    const density = document.createElement('input');
    density.className = 'form-control';
    density.type = 'number';
    density.min = 0;
    density.max = 1;
    density.step = '0.000000001';
    density.name = 'density';
    density.setAttribute('data-toggle', 'tooltip');
    density.setAttribute('data-placement', 'top');
    density.setAttribute('data-html', 'true');
    density.setAttribute('title', 'Any Decimal Between 0-1');
    density.setAttribute('required', 'required');
    new bootstrap.Tooltip(density, {});
    densityWrapper.appendChild(density);
    form.appendChild(densityWrapper);

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

    /* Dynamically show biome white/blacklist if a biome-selective type has been chosen */
    const biomeHeader = components.makeHeader('Biomes To Spawn / Not Spawn');
    biomeHeader.style.display = 'none';
    form.appendChild(biomeHeader);

    const biomeWrapper = document.createElement('div');
    biomeWrapper.className = 'mb-3';
    form.appendChild(biomeWrapper);

    depositType.addEventListener('change', () => {
        const type = depositType.value;

        biomeWrapper.innerHTML = '';
        /* Hide the label first */
        biomeHeader.style.display = 'none';

        if (type == 'depositBiomeMulti' || type == 'depositBiome') {
            /* Reveal the header if applicable */
            const biomeGroup = components.makeExpandableSet(
                'biomes',
                biomeWrapper,
                'text',
                'Format: &lt;modid:biome&gt; OR <a href="https://oitsjustjo.se/GelX-uC1s" target="_blank">Biome Type</a>'
            );
            const checkWrapper = document.createElement('div');
            checkWrapper.className = 'input-group-text';

            const checkLbl = document.createElement('label');
            checkLbl.for = 'isWhitelist';
            checkLbl.className = 'mr-2';
            checkLbl.innerText = 'Whitelist?';

            const checkInput = document.createElement('input');
            checkInput.className = 'form-check-input';
            checkInput.type = 'checkbox';
            checkInput.name = 'isWhitelist';
            checkInput.value = '';
            checkInput.setAttribute('aria-label', 'Checkbox for Text Input:');
            checkWrapper.appendChild(checkLbl);
            checkWrapper.appendChild(checkInput);

            biomeGroup.insertBefore(checkWrapper, biomeGroup.childNodes[biomeGroup.childNodes.length - 1]);

            biomeHeader.style.display = 'block';
            biomeWrapper.appendChild(biomeGroup);
        }
    });

    form.appendChild(components.makeHeader('Blocks This Deposit May Replace'));
    const replWrapper = document.createElement('div');
    replWrapper.className = 'mb-3';
    replWrapper.appendChild(
        components.makeExpandableSet(
            'blockStateMatchers',
            replWrapper,
            'text',
            'Format: &lt;modid:block&gt; or &lt;modid:block:meta&gt;'
        )
    );
    replWrapper.querySelector('input').removeAttribute('required');
    form.appendChild(replWrapper);

    return form;
};

