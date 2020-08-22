window.onload = () => {
    const header = document.createElement('h1')
    const currentEmail = document.createElement('input')
    const newEmail = document.createElement('input');
    const oldUsername = document.createElement('input')
    const newUsername = document.createElement('input')
    const oldPassword = document.createElement('input')
    const newPassword = document.createElement('input')
    const submitChange = document.createElement('button');
    const form = document.createElement('form');
    const breakDiv = document.createElement('br');

    header.innerText = 'Update User Information:'
    submitChange.innerText = 'Submit Changes'
    currentEmail.placeholder = 'Input current email'
    newEmail.placeholder = "New email"
    newUsername.placeholder = "New Username"
    oldUsername.placeholder = 'Input current Username'
    oldPassword.placeholder = 'Current Password'
    newPassword.placeholder = "New password"
    currentEmail.name = 'currentEmail'
    oldUsername.name = 'oldUsername'
    oldPassword.name = "oldPassword"
    form.id = 'form';
    document.body.appendChild(header);
    document.body.appendChild(form)
    form.appendChild(oldUsername);
    form.appendChild(newUsername)
    document.createElement('br');
    form.appendChild(currentEmail);
    form.appendChild(newEmail);
    //form.innerHTML = '<br>'
    form.appendChild(breakDiv);
    form.appendChild(newPassword);
    form.appendChild(oldPassword)
    form.appendChild(breakDiv);
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