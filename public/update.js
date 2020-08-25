window.onload = () => {
    const header = document.createElement('h1')
    const id = document.createElement('input')
    const newEmail = document.createElement('input');
    const newUsername = document.createElement('input')
    const newPassword = document.createElement('input')
    const submitChange = document.createElement('button');
    const form = document.createElement('form');

    header.innerText = 'Update User Information:'
    submitChange.innerText = 'Submit Changes'
    newEmail.name = "email"
    newUsername.name = 'username';
    newPassword.name = 'password'
    id.placeholder = 'User _id'
    newEmail.placeholder = "Email"
    newUsername.placeholder = "Username"
    newPassword.placeholder = "New password"
    id.name = 'id'
    form.id = 'form';
    
    document.body.appendChild(header);
    document.body.appendChild(form)
    form.appendChild(id);
    form.appendChild(newUsername)
    form.appendChild(newEmail);
    form.appendChild(newPassword);
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