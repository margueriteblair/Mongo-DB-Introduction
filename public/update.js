window.onload = () => {
    const header = document.createElement('h1')
    const id = document.createElement('input')
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
    id.placeholder = 'User _id'
    newEmail.placeholder = "New email"
    newEmail.className = "new"
    newPassword.className = 'new'
    newUsername.className = 'new';
    newUsername.placeholder = "New Username"
    oldUsername.placeholder = 'Input current Username'
    oldPassword.placeholder = 'Current Password'
    newPassword.placeholder = "New password"
    id.name = 'id'
    oldUsername.name = 'oldUsername'
    oldPassword.name = "oldPassword"
    form.id = 'form';
    document.body.appendChild(header);
    document.body.appendChild(form)
    form.appendChild(id);
    form.appendChild(newUsername)
    //form.innerHTML = '<br>'
    form.appendChild(breakDiv);
    form.appendChild(oldPassword)
    document.body.appendChild(submitChange);

    submitChange.addEventListener('mouseup', () => {
        console.log('Changes submitted');
        console.log(location.origin)
        const endpoint = `${location.origin}'/user/update/${formElm.formId.value}`  //not colon id 
        const formElm = document.getElementById('form')
        const reqBody = {};
        for (const input of formElm) {
            if (input.value.length > 0) {
                reqBody[input.name] = input.value
            }
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