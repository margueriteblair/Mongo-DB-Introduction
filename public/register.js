window.onload = () => {
    //create a form and append to a div
    //create blank elements 
    //set properties and event listeners
    //append to the dom
    const header = document.createElement('h1')
    const mainDiv = document.createElement('div');
    const form = document.createElement('form');
    const emailInput = document.createElement('input')
    const passwordInput = document.createElement('input')
    const passwordConfirm = document.createElement('input')
    const userNameInput = document.createElement('input')
    const submitButton = document.createElement('button')
    
    emailInput.placeholder = 'Email';
    emailInput.type = 'email';
    emailInput.id = 'email'
    emailInput.name = 'email'
    passwordInput.placeholder = 'Password';
    passwordInput.type = 'password'
    passwordInput.name = 'password'
    passwordInput.id = 'pswd1'
    passwordConfirm.placeholder = 'Confirm Password';
    passwordConfirm.type = 'password';
    passwordConfirm.id = 'pswd2';
    passwordConfirm.name = 'password'
    userNameInput.placeholder = 'Username';
    userNameInput.type = 'text'
    userNameInput.name = 'username';
    userNameInput.id = 'username'
    submitButton.innerText = 'Submit';
    header.innerText = 'Register Today!';
    form.id = 'form';
    //frontend validation
    userNameInput.minLength = 3;
    userNameInput.maxLength = 33;
    passwordInput.minLength = 7;
    emailInput.minLength = 3;
    emailInput.maxLength = 200;
    
    
    document.body.appendChild(header)
    document.body.appendChild(mainDiv);
    mainDiv.appendChild(form);
    mainDiv.appendChild(submitButton)
    form.appendChild(userNameInput)
    form.appendChild(emailInput)
    form.appendChild(passwordInput)
    form.appendChild(passwordConfirm)
    
    let inputs = document.querySelectorAll('input');
    for (const input of inputs) {
        input.classList.add('input');
    }
    
    submitButton.onclick = submitReg;

    function submitReg() {
        let passedValidation = true;

        if (emailInput.value.trim().length < 6 || emailInput.value.trim().length > 200 || !emailInput.value.match(/\@[a-z]*\.[a-z]*/)) {
            //reqBody.email.includes('@') || reqBody.email.substring(email.indexOf('@')).includes('.')
                return alert(`Email must be between 6 and 200 characters and have a valid @.`)
        }
        if (userNameInput.value.length < 7 || userNameInput.value.length > 33) {
            return alert(`Username must be between 7 and 33 characters.`)
        }
        if (passwordInput.value !== passwordConfirm.value) {
            return alert(`Passwords must match.`)
        }
        if (passwordInput.value.trim().length < 7) {
                return alert(`Password needs minimum value of 7 characters`);
                passedValidation = false;

        }
        const formElem = document.getElementById('form');
        const reqBody = {};
        for (const input of formElem) {
            if (input.value.trim() !== "") {
                reqBody[input.name] = input.value
                continue;
            } else {
                return alert(`Missing fields`)
            }
        }
        const endpoint = location.origin + '/user/register';

        fetch(endpoint, reqBody)
        .then(res => res.json())
        .then(res => {
            if (res.status !== 201) {
                let errors = res.validationErrors;
                let errorsMessages = [];

                errors.forEach(error => {const {field, msg} = error;
                errorsMessages.push(`${field}: ${msg}`)
                })
                const alertText = errorMsgs.join("\n")
                return alert(alertText);
            }
        })
        console.log(reqBody)
        const xhr = new XMLHttpRequest();
        xhr.open('POST', endpoint);
        xhr.onload = () => {
            const res = JSON.parse(xhr.responseText)
            console.log(res)
        }
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(reqBody))


    }
    }

    
    
