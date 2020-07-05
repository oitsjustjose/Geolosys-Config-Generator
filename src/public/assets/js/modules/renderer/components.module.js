export const makeHeader = (txt) => {
    const tmp = document.createElement('h6');
    tmp.innerHTML = txt;
    return tmp;
};

export const makeExpandableSet = (prefix, container, type, tooltip) => {
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

export const makePair = (prefix, single, container) => {
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

/**
 * 
 * @param {HTMLDivElement} container 
 * @param {Function} formCallback 
 */
export const makeCard = (container, formCallback) => {
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
        makeCard(container, formCallback);
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

    data.appendChild(formCallback(
        document.getElementById('switch-112-mode').checked
    ));

    card.appendChild(data);
    container.appendChild(card);
};