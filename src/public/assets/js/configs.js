window.addEventListener('load', async () => {
    const resp = await fetch('/configs', {
        method: 'POST'
    });

    const configs = await resp.json();
    render(configs);

    /* Give the body enough space for a bottom navbar */
    document.body.style.paddingBottom = `${document.querySelector('.navbar.fixed-bottom').clientHeight}px`;

    document.body.classList.add('show');
});

const render = (configs) => {
    for (const [idx, config] of configs.entries()) {
        const row = makeRow(idx, config);
        document.getElementById('config-body').appendChild(row);
    }
};

const makeRow = (idx, config) => {
    const row = document.createElement('tr');

    const rowHead = document.createElement('th');
    rowHead.setAttribute('scope', 'row');
    rowHead.innerText = `${idx + 1}`;

    const jsonD = document.createElement('td');
    const json = document.createElement('a');
    json.href = `${location.origin}/configs/${config}`;
    json.innerText = config;

    jsonD.appendChild(json);
    row.appendChild(rowHead);
    row.appendChild(jsonD);

    return row;
};