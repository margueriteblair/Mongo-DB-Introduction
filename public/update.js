window.onload = () => {
    const header = document.createElement('h1')
    const currentEmail = document.createElement('input')
    const newEmail = document.createElement('input');
    const username = document.createElement('input')
    const password = document.createElement('input')
    const submitChange = document.createElement('button');
    const form = document.createElement('form')

    header.innerText = 'Update User Information:'
    submitChange.innerText = 'Submit Changes'
    currentEmail.placeholder = 'Input current email'
    newEmail.placeholder = "New email"
    username.placeholder = 'Update Username'
    password.placeholder = 'Update Password'
    currentEmail.name = 'currentEmail'
    username.name = 'username'
    password.name = "password"
    form.id = 'form';
    document.body.appendChild(header);
    document.body.appendChild(form)
    form.appendChild(username);
    form.appendChild(currentEmail);
    form.appendChild(password);
    form.appendChild(submitChange);

    submitChange.addEventListener('mouseup', () => {
        console.log('Changes submitted');
        const formElem = document.getElementById('form')
        const reqBody = {};
        for (const input of formElem) {
            reqBody[input.name] = input.value
        }
        console.log(reqBody);
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', endpoint);
        xhr.onload = () => {
            const res = JSON.parse(xhr.responseText);
            console.log(res);
        }
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(reqBody));
    })

}