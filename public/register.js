

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
    
    
    submitButton.addEventListener('mouseup', () => {
        console.log('You submitted your information!')
        for (const input of inputs) {
            console.log(input.value)
        }
    submitButton.onclick = submitReg;
        //console.log(form.children)
    })
    
    }
    
    function submitReg() {
        const formElem = document.getElementById('form');
        const reqBody = {};
        for (const input of formElem) {
            if (input.value.trim() !== "") {
                reqBody[input.name] = input.value
            } else {
                const missing = document.createElement(li)
                missing.innerText = `${input.name} needs a value.`
                document.body.appendChild(missing)
            }
        }
        console.log(reqBody)
        const endpoint = location.origin + '/user/post/new';
        const xhr = new XMLHttpRequest();
        xhr.open('POST', endpoint)
        xhr.onload = () => {
            const res = JSON.parse(xhr.responseText)
            console.log(res)
        }
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(reqBody))
    }