export const preInit = () => {
    switch112Listener();
};

export const init = () => { };

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
