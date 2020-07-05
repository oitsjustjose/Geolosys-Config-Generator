export const parsed = (any) => {
    if (!any) {
        return;
    } else if (isNaN(Number(any))) {
        return String(any);
    } else {
        return Number(any);
    }
};

export const makeNotification = (title, contents) => {
    const modal = document.getElementById('notification');

    modal.querySelector('.modal-title').innerHTML = title;
    modal.querySelector('.modal-body').innerHTML = contents;

    new bootstrap.Modal.getInstance(modal).show();
};