export const preInit = () => {
    switch112Listener();
};

export const init = () => {
    generateJSONListener();
};

const generateJSONListener = () => {
    const btn = document.getElementById('generate-btn');
    const oreCfg = document.getElementById('oreconfig');
    const stoneCfg = document.getElementById('stoneconfig');

    btn.addEventListener('click', () => {
        btn.attributes.disabled = true;

        let ores = Array();
        let err = false;

        oreCfg.querySelectorAll('form').forEach((form) => {
            const ore = parseForm(form);

            if (ore == -1) {
                err = true;
                return;
            } else {
                ores.push(ore);
            }
        });

        if (err) {
            return;
        }

        console.log(ores);
        console.log(JSON.parse(
            JSON.stringify({
                "ores": ores
            })
        ));

        // TODO: save this to the database!!!! If there's no name, name it some random ID maybe? /shrug 
        btn.attributes.disabled = false;
    });
};

const parseForm = (form) => {
    let ore = {
        'blocks': Array(),
        'samples': Array()
    };

    const allInputs = Array.from(form.querySelectorAll('input, select[name="type"]'));

    for (let [idx, inp] of allInputs.entries()) {
        let err = false;
        if (inp.required && !inp.value || (inp.type == 'number' && (parsed(inp.value) > parsed(inp.max) || parsed(inp.value) < parsed(inp.min)))) {
            err = true;
            inp.classList.add('is-invalid');
        } else {
            if (inp.classList.contains('is-invalid')) {
                inp.classList.remove('is-invalid');
            }
        }

        if (err) {
            alert("There was an error in your form (see outlined in red). Your JSON will not be generated until you correct this.");
            return -1;
        }

        if (!inp.value) { /* Skip over *optional*, empty attrs */
            continue;
        }

        if (inp.name.includes('weight-')) { /* Skip weight items because they're parsed using idx+1 */
            continue;
        }

        if (inp.name.includes('block-ore-')) { /* Parse out ores */
            ore.blocks.push(inp.value, parseInt(allInputs[idx + 1].value));
        } else if (inp.name.includes('block-sample-')) { /* Parse out samples*/
            ore.samples.push(inp.value, parseInt(allInputs[idx + 1].value));
        } else if (inp.name.includes('-')) { /* parse out any JSONArray() objs */
            const key = inp.name.substr(0, inp.name.indexOf('-'));

            if (Object.keys(ore).includes(key)) {
                ore[key].push(parsed(inp.value));
            } else {
                ore[key] = [parsed(inp.value)];
            }
        } else { /* parse anything else */
            if (inp.type == 'checkbox') {
                ore[inp.name] = inp.checked;
            } else {
                ore[inp.name] = parsed(inp.value);
            }
        }
    }

    // console.log(ore);
    return ore;
};

const parsed = (any) => {
    if (!any) {
        return;
    }


    if (isNaN(Number(any))) {
        return String(any);
    }

    return Number(any);
};

const switch112Listener = () => {
    const switch112 = document.getElementById('switch-112-mode');

    if (!localStorage.getItem('112-mode')) {
        localStorage.setItem('112-mode', 'true');
    }

    const storedState = localStorage.getItem('112-mode');

    if (storedState == 'true') {
        switch112.setAttribute('checked', '');
    }

    switch112.addEventListener('click', () => {
        localStorage.setItem('112-mode', `${switch112.checked}`);
        location.href = location.href;
    });
};

export const initYListeners = (yMinEl, yMaxEl) => {
    yMinEl.addEventListener('change', () => {
        if (yMinEl.value < 0) {
            yMinEl.value = 0;
        } else if (yMinEl.value > 255) {
            yMinEl.value = 255;
        }

        if (yMinEl.value >= yMaxEl.value) {
            yMinEl.value = (parseInt(yMaxEl.value) - 1);
        }
    });

    yMaxEl.addEventListener('change', () => {
        if (yMaxEl.value < 0) {
            yMaxEl.value = 0;
        } else if (yMaxEl.value > 255) {
            yMaxEl.value = 255;
        }

        if (yMaxEl.value <= yMinEl.value) {
            yMaxEl.value = (parseInt(yMinEl.value) + 1);
            if (yMaxEl.value > 255) {
                yMinEl.value = (parseInt(yMaxEl.value) - 1);
            }
        }
    });
};
