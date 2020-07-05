import { parsed, makeNotification } from '../util.module.js';

export const read = () => {
    const stoneCfg = document.getElementById('stoneconfig');

    let stones = Array();
    let err = false;

    stoneCfg.querySelectorAll('form').forEach((form) => {
        const stone = parse(form);

        if (stone == -1) {
            err = true;
            return;
        } else {
            stones.push(stone);
        }
    });

    if (err) {
        return -1;
    }

    return stones;
};



/**
 * 
 * @param {HTMLFormElement} form 
 */
const parse = (form) => {
    let stone = {};

    const allInputs = Array.from(form.querySelectorAll('input'));

    for (let inp of allInputs) {
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
            makeNotification(
                `One of Your Forms is Incomplete`,
                `
                There was an error in one of your Stone Configs that needs to be resolved (see in red).
                <br>
                <br>
                Your config file will not be available until this issue is resolved.
                `
            );
            return -1;
        }

        if (inp.name.includes('-')) { /* parse out any JSONArray() objs */
            const key = inp.name.substr(0, inp.name.indexOf('-'));

            if (Object.keys(stone).includes(key)) {
                stone[key].push(parsed(inp.value));
            } else {
                stone[key] = [parsed(inp.value)];
            }
        } else {
            stone[inp.name] = parsed(inp.value);
        }
    }

    return stone;
};