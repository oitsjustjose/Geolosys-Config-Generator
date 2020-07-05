window.addEventListener('load', () => {
    const queries = new URLSearchParams(location.search);

    if (queries.has('exists')) {
        makeNotification('Username Already Exists', 'Sorry - that username already exists 😭');
        history.replaceState(null, '', location.href.replace('?exists', ''));
    }
});

const validations = {
    username: false,
    pass: false,
    passConf: false
};


const checkUsername = (username) => {
    if (username.value.length < 6) {
        username.classList.add('is-invalid');
        document.getElementById('register-btn').disabled = true;
        validations.username = false;
    } else {
        validations.username = true;
        if (validations.pass && validations.passConf && validations.username) {
            document.getElementById('register-btn').disabled = false;
        }
        username.classList.remove('is-invalid');
    }
};

/**
 * 
 * @param {HTMLInputElement} password 
 */
const checkPass = (password) => {
    if (password.value.length < 8) {
        password.classList.add('is-invalid');
        document.getElementById('register-btn').disabled = true;
        validations.pass = false;
    } else {
        validations.pass = true;
        if (validations.pass && validations.passConf && validations.username) {
            document.getElementById('register-btn').disabled = false;
        }
        password.classList.remove('is-invalid');
        checkPassConf(document.getElementById('password-conf'));
    }
};

/**
 * 
 * @param {HTMLInputElement} password 
 */
const checkPassConf = (password) => {
    if (password.value != document.getElementById('password').value) {
        password.classList.add('is-invalid');
        document.getElementById('register-btn').disabled = true;
        validations.passConf = false;
    } else {
        validations.passConf = true;
        if (validations.pass && validations.passConf && validations.username) {
            document.getElementById('register-btn').disabled = false;
        }
        password.classList.remove('is-invalid');
    }
};


const makeNotification = (title, contents) => {
    const modal = document.getElementById('notification');

    modal.querySelector('.modal-title').innerHTML = title;
    modal.querySelector('.modal-body').innerHTML = contents;

    new bootstrap.Modal(modal).show();
};
