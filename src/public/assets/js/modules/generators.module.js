import * as events from './events.module.js';

export const init = () => {
    makeAccordionCard(document.getElementById('oreconfig'), true);
    // makeAccordionCard(document.getElementById('stoneconfig'), false);
};

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

export const makeAccordionCard = (container, isOre) => {
    const dataId = `${container.id}-config-${container.childNodes.length}`;
    const lblId = `${container.id}-config-header-${container.childNodes.length}`;

    const card = document.createElement('div');
    card.className = 'card';

    const cardHdr = document.createElement('div');
    cardHdr.className = 'card-header';
    cardHdr.id = lblId;

    const cardHdrTxt = document.createElement('h2');
    cardHdrTxt.className = 'mb-0';

    const cardBtns = document.createElement('div');
    cardBtns.className = 'btn-group';
    cardBtns.setAttribute('role', 'group');
    cardBtns.setAttribute('aria-label', 'Card Controls');

    const collapseCtrlBtn = document.createElement('button');
    collapseCtrlBtn.className = 'btn btn-outline-secondary ';
    collapseCtrlBtn.type = 'button';
    collapseCtrlBtn.setAttribute('data-toggle', 'collapse');
    collapseCtrlBtn.setAttribute('data-target', `#${dataId}`);
    collapseCtrlBtn.setAttribute('aria-expanded', 'true');
    collapseCtrlBtn.setAttribute('aria-controls', `${dataId}`);
    collapseCtrlBtn.innerText = `Config Entry`;

    const addAccordionBtn = document.createElement('button');
    addAccordionBtn.className = 'btn btn-success';
    addAccordionBtn.innerHTML = '<i class="fas fa-plus"></i>';
    addAccordionBtn.addEventListener('click', () => {
        makeAccordionCard(container, isOre);
    });

    cardBtns.appendChild(collapseCtrlBtn);
    cardBtns.appendChild(addAccordionBtn);

    if (container.childNodes.length > 1) {
        const delAccordionBtn = document.createElement('button');
        delAccordionBtn.className = 'btn btn-danger';
        delAccordionBtn.innerHTML = '<i class="fas fa-minus"></i>';
        delAccordionBtn.addEventListener('click', () => {
            container.removeChild(card);
        });
        cardBtns.appendChild(delAccordionBtn);
    }

    cardHdrTxt.appendChild(cardBtns);
    cardHdr.appendChild(cardHdrTxt);
    card.appendChild(cardHdr);

    const data = document.createElement('div');
    data.id = dataId;
    data.classList.add('collapse');
    data.setAttribute('aria-labelledby', lblId);
    data.setAttribute('data-parent', `#${container.id}`);
    if (container.childNodes.length == 1) {
        data.classList.add('show');
    }

    if (isOre) {
        data.appendChild(makeOreForm(
            container.childNodes.length,
            document.getElementById('switch-112-mode').checked
        ));
    } else {

    }

    card.appendChild(data);
    container.appendChild(card);
};

const makeOreForm = (formId, usingNewConfig) => {
    const form = document.createElement('form');
    form.style.padding = "12px";

    form.appendChild(makeHeader('Deposit Name [Optional]'));

    const nameWrapper = document.createElement('div');
    nameWrapper.className = 'mb-3';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'form-control';
    nameInput.name = 'name';
    nameWrapper.appendChild(nameInput);
    form.appendChild(nameWrapper);

    form.appendChild(makeHeader('Deposit Type'));

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
        form.appendChild(makeHeader('Deposit Structure Type (<b>1.14+ Only</b>)'));

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

    form.appendChild(makeHeader('Ore Blocks'));
    const oreWrapper = document.createElement('div');
    const oreInputs = makePair('ore', ['deposit', 'depositBiome'].includes(depositType.value), oreWrapper);
    oreWrapper.appendChild(oreInputs);
    form.appendChild(oreWrapper);

    /* Update type of ore wrapper based on change of depositType */
    depositType.addEventListener('change', () => {
        const type = depositType.value;
        oreWrapper.innerHTML = '';

        if (type == 'deposit' || type == 'depositBiome') {
            const newInput = makePair('ore', true, oreWrapper);
            oreWrapper.appendChild(newInput);
        } else if (type == 'depositMulti' || type == 'depositBiomeMulti') {
            const newInput = makePair('ore', false, oreWrapper);
            oreWrapper.appendChild(newInput);
        } else {
            alert(`Invalid type: ${type}`);
        }
    });

    form.appendChild(makeHeader('Sample Blocks'));
    const sampleWrapper = document.createElement('div');
    const sampleInputs = makePair('sample', ['deposit', 'depositBiome'].includes(depositType.value), sampleWrapper);
    sampleWrapper.appendChild(sampleInputs);
    form.appendChild(sampleWrapper);

    /* Update type of sample wrapper based on change of depositType */
    depositType.addEventListener('change', () => {
        const type = depositType.value;

        // delChildren(sampleWrapper);
        sampleWrapper.innerHTML = '';

        if (type == 'deposit' || type == 'depositBiome') {
            const newInput = makePair('ore', true, sampleWrapper);
            sampleWrapper.appendChild(newInput);
        } else if (type == 'depositMulti' || type == 'depositBiomeMulti') {
            const newInput = makePair('ore', false, sampleWrapper);
            sampleWrapper.appendChild(newInput);
        } else {
            alert(`Invalid type: ${type}`);
        }
    });

    form.appendChild(makeHeader('Minimum Y-Level'));
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

    form.appendChild(makeHeader('Maximum Y-Level'));
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

    events.initYListeners(yMin, yMax);

    form.appendChild(makeHeader('Chance <a href="https://oitsjustjo.se/M3NfQxBsZ" target="_blank">(Relative to All Chances)</a>'));
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


    form.appendChild(makeHeader('Size'));
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

    form.appendChild(makeHeader('Density'));
    const densityWrapper = document.createElement('div');
    densityWrapper.className = 'mb-3';
    const density = document.createElement('input');
    density.className = 'form-control';
    density.type = 'number';
    density.min = 0;
    density.max = 1;
    density.step = '0.05';
    density.name = 'density';
    density.setAttribute('required', 'required');
    densityWrapper.appendChild(density);
    form.appendChild(densityWrapper);

    form.appendChild(makeHeader('Dimension Blacklist'));
    const dimBlWrapper = document.createElement('div');
    dimBlWrapper.className = 'mb-3';
    dimBlWrapper.appendChild(
        makeExpandableSet(
            'dimBlacklist',
            dimBlWrapper,
            document.getElementById('switch-112-mode').checked ? 'text' : 'number',
            document.getElementById('switch-112-mode').checked ? '&lt;modid:dimension&gt;' : null
        )
    );
    form.appendChild(dimBlWrapper);

    form.appendChild(makeHeader('Biomes To Spawn / Not Spawn'));
    const biomeWrapper = document.createElement('div');
    biomeWrapper.className = 'mb-3';
    biomeWrapper.appendChild(
        makeExpandableSet(
            'biomes',
            biomeWrapper,
            'text',
            'Format: &lt;modid:biome&gt; OR <a href="https://oitsjustjo.se/GelX-uC1s" target="_blank">Biome Type</a>'
        )
    );
    form.appendChild(biomeWrapper);

    form.appendChild(makeHeader('Blocks This Deposit May Replace'));
    const replWrapper = document.createElement('div');
    replWrapper.className = 'mb-3';
    replWrapper.appendChild(
        makeExpandableSet(
            'replacements',
            replWrapper,
            'text',
            'Format: &lt;modid:block&gt; or &lt;modid:block:meta&gt;'
        )
    );
    form.appendChild(replWrapper);

    return form;
};

const makePair = (prefix, single, container) => {
    const group = document.createElement('div');
    group.className = 'mb-3 input-group';

    const lbl = document.createElement('span');
    lbl.className = 'input-group-text';
    lbl.innerText = 'Block and Chance';

    const block = document.createElement('input');
    block.type = 'text';
    block.className = 'form-control';
    block.setAttribute('data-toggle', 'tooltip');
    block.setAttribute('data-placement', 'top');
    block.setAttribute('title', 'Format: modid:block or modid:block:meta');
    block.name = `block-${prefix}-${container.childNodes.length}`;
    block.setAttribute('required', 'required');
    new bootstrap.Tooltip(block, {});

    const weight = document.createElement('input');
    weight.type = 'number';
    weight.min = '1';
    weight.max = '100';
    weight.className = 'form-control';
    weight.name = `weight-${prefix}-${container.childNodes.length}`;

    if (single) {
        weight.value = 100;
        weight.setAttribute('disabled', '');
    } else {
        weight.setAttribute('data-toggle', 'tooltip');
        weight.setAttribute('data-placement', 'top');
        weight.setAttribute('data-html', 'true');
        weight.setAttribute('title', 'All Chances <b>MUST</b> Add To 100');
        weight.setAttribute('required', 'required');
        new bootstrap.Tooltip(weight, {});
    }

    group.appendChild(lbl);
    group.appendChild(block);
    group.appendChild(weight);

    if (!single) {
        const addBtn = document.createElement('button');
        addBtn.className = 'btn btn-success';
        addBtn.innerHTML = `<i class="fas fa-plus"></i>`;
        addBtn.addEventListener('click', (evt) => {
            evt.preventDefault();
            container.appendChild(makePair(prefix, single, container));
        });

        group.appendChild(addBtn);

        if (container.childNodes.length) {
            const rmBtn = document.createElement('button');
            rmBtn.className = 'btn btn-danger';
            rmBtn.innerHTML = `<i class="fas fa-minus"></i>`;
            rmBtn.addEventListener('click', (evt) => {
                evt.preventDefault();
                container.removeChild(group);
            });
            group.appendChild(rmBtn);
        }
    }

    return group;
};

const makeExpandableSet = (prefix, container, type, tooltip) => {
    const group = document.createElement('div');
    group.className = 'mb-3 input-group';

    const input = document.createElement('input');
    input.type = type;
    input.className = 'form-control';
    input.name = `${prefix}-${container.childNodes.length}`;
    if (tooltip) {
        input.setAttribute('data-toggle', 'tooltip');
        input.setAttribute('data-placement', 'top');
            input.setAttribute('data-html', 'true');
        input.setAttribute('title', tooltip);
        input.setAttribute('required', 'required');
        new bootstrap.Tooltip(input, {});
    }

    group.appendChild(input);

    const addBtn = document.createElement('button');
    addBtn.className = 'btn btn-success';
    addBtn.innerHTML = `<i class="fas fa-plus"></i>`;
    addBtn.addEventListener('click', (evt) => {
        evt.preventDefault();
        container.appendChild(makeExpandableSet(prefix, container, type, tooltip));
    });

    group.appendChild(addBtn);

    if (container.childNodes.length) {
        const rmBtn = document.createElement('button');
        rmBtn.className = 'btn btn-danger';
        rmBtn.innerHTML = `<i class="fas fa-minus"></i>`;
        rmBtn.addEventListener('click', (evt) => {
            evt.preventDefault();
            container.removeChild(group);
        });
        group.appendChild(rmBtn);
    }

    return group;
};

const delChildren = (el) => {
    for (const child of el.children) {
        el.removeChild(child);
    }
};

const makeHeader = (txt) => {
    const tmp = document.createElement('h6');
    tmp.innerHTML = txt;
    return tmp;
};