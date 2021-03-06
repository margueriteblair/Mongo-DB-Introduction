window.onload = () => {
    const header = document.createElement('h1')
    const formId = document.createElement('input')
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
    formId.placeholder = 'User _id'
    newEmail.placeholder = "Email"
    newUsername.placeholder = "Username"
    newPassword.placeholder = "New password"
    formId.name = 'id'
    formId.id = 'id'
    form.id = 'form';
    newEmail.minLength = 3;
    newPassword.minLength = 7;
    newUsername.minLength = 7;

    document.body.appendChild(header);
    document.body.appendChild(form)
    form.appendChild(formId);
    form.appendChild(newUsername)
    form.appendChild(newEmail);
    form.appendChild(newPassword);
    document.body.appendChild(submitChange);
//assumption that we're using the admin account for this
    submitChange.addEventListener('mouseup', () => {
        console.log('Changes submitted');
        console.log(location.origin)
        const formElm = document.getElementById('form')
        const userID = formElm.id.value.trim();
        const reqBody = {};

        if (formElm.id.value.trim() == "") {
            return alert('Must provide user ID')
        } else if (userID.length !== 24){
            return alert(`ID must be in proper format with 24 characters`)
        }

        if (newEmail.value.trim().length < 6 || newEmail.value.trim().length > 200 || !newEmail.value.match(/\@[a-z]*\.[a-z]*/)) {
            //reqBody.email.includes('@') || reqBody.email.substring(email.indexOf('@')).includes('.')
                return alert(`Email must be between 6 and 200 characters and have a valid @.`)
        }
        if (newUsername.value.length < 7 || newUsername.value.length > 33) {
            return alert(`Username must be between 7 and 33.`)

        }
        if (newPassword.value.trim().length < 7) {
                return alert(`Password needs minimum value of 7 characters`);
                passedValidation = false; //why did we put this after? return already halts the program

        }

        console.log(`All inputs pass frontend validation test.`)
        for (const input of formElm) {
            if (input.value.trim() !== "" && input.name !== 'id') {
                reqBody[input.name] = input.value.trim();
            } else if (input.name !== 'id'){
                const missinginputs = [];
                missinginputs.push(input.name)
                return alert(`${input.name} needs a value.`)
            }
        }
        console.log(reqBody);
        const endpoint = `${location.origin}/user/update/${formElm.id.value}`  //not colon id
        console.log(endpoint)
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', endpoint)
        xhr.onload = () => {
            const res = JSON.parse(xhr.responseText);
            console.log(res);
        }
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(reqBody));
    })

}