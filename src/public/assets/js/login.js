window.addEventListener('load', () => {
    const queries = new URLSearchParams(location.search)
    if (queries.has('error')) {
        makeNotification('Failed to Log In', `
            Failed to log you in! Confirm that your username and
            password are correct or contact your administration 
            if you do not have an account.
        `)
    }

    history.replaceState(null, '', location.href.replace('?error', ''))
})

const makeNotification = (title, contents) => {
    const modal = document.getElementById('notification')

    modal.querySelector('.modal-title').innerHTML = title
    modal.querySelector('.modal-body').innerHTML = contents

    new bootstrap.Modal(modal).show()
}