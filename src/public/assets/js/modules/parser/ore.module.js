import { parsed, makeNotification } from '../util.module.js';

/**
 * Reads through every form on the oreconfig element
 * 
 * @returns {null}
 */
export const read = async () => {
    const oreCfg = document.getElementById('oreconfig');

    let ores = Array();
    let err = false;

    oreCfg.querySelectorAll('form').forEach((form) => {
        const ore = parse(form);

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

    const asJson = JSON.parse(
        JSON.stringify({
            "ores": ores
        })
    );

    const resp = await fetch('/', {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            json: asJson,
        })
    });

    const newDoc = await resp.json();
    makeNotification('Config Upload Complete!', `
        <center>
            You can view your JSON at
            <br>
            <a href="${location.origin}/configs/${newDoc._id}">${location.origin}/configs/${newDoc._id}</a>
        </center>
    `);
};

/**
 * Internal method for parsing a form into an object
 * 
 * Arguments:
 * @param {HTMLFormElement} form: The form to parse away at - selects all [select[name='type'], input] subtypes
 * 
 * @returns {object}
 */
const parse = (form) => {
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

    return ore;
};

