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
        if (emailInput.value.length < 6 || emailInput.value.length > 200 || !emailInput.value.match(/\@/)) {
            setTimeout(() => {
                return alert(`Email must be between 6 and 200 characters and have a valid @.`)
            }, 1000);
        }
        if (userNameInput.value.length < 7 || emailInput.value.length > 33) {
            return alert(`Username must be between 7 and 33.`)

        }
        if (passwordInput.value !== passwordConfirm.value) {
            return alert(`Passwords must match.`)
        }
        if (passwordInput.value.length < 7) {
                return alert(`Password needs minimum value of 7 characters`);

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
        console.log(reqBody)
        const endpoint = location.origin + '/user/register';
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
    
