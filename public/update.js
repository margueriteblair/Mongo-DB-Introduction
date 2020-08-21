window.onload = () => {
    const header = document.createElement('h1')
    const email = document.createElement('input')
    const username = document.createElement('input')
    const password = document.createElement('input')
    const submitChange = document.createElement('button');

    header.innerText = 'Update User Information:'
    submitChange.innerText = 'Submit Changes'
    email.placeholder = 'Updated Email'
    username.placeholder = 'Update Username'
    password.placeholder = 'Update Password'
    email.name = 'email'
    username.name = 'username'
    password.name = "password"
    document.body.appendChild(header);
    document.body.appendChild(username);
    document.body.appendChild(email);
    document.body.appendChild(password);
    document.body.appendChild(submitChange);

}