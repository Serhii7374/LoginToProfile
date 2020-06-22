const getS = selector => document.querySelector(selector);
let regName = /^[a-zA-Z]{1,20}$/;
let regName2 = /^[a-zA-Z]{1,20}$/;
let regEmail = /^[\w_\.-]{1,}@\w{1,}\.\w{2,7}(\.\w{2,7})?$/;
let regPass = /^[\w_]{8,15}$/;

// функція для перевір
function signUp() {
    validForm1();

    // створюєм пустий обєкт
    let obj = {};
    // якщо всі поля валідні тоді добавляєм в обєкт данні з полів
    if (getS('.box1').classList.contains('valid') && getS('.box2').classList.contains('valid') && getS('.box3').classList.contains('valid') && getS('.box4').classList.contains('valid')) {
        obj.name = getS('.first').value;
        obj.surname = getS('.last').value;
        obj.email = getS('.email').value;
        obj.pass = getS('.pass').value;

        // конвертуємо обєкт у JSON формат
        const toJson = JSON.stringify(obj);
        let num = localStorage.length;
       
        if (num > 0) {
            // якщо localStorage не пустий то запускаємо цикл
            // який розпарсує кожен обєкт з localStorage і перевіряє чиє ідентичні емейли   
            let fromJson = {};
            let check = false;
            for (let i = 0; i < num; i++) {
                fromJson = JSON.parse(localStorage.getItem(`user${i + 1}`));
                if (fromJson.email === obj.email) {
                    check = true
                };
            }
            // якщо емейл вже існує то зявляється ерор що емейл існує
            // і очищується поле
            if (check == true) {
                getS('.email').value = "";
                getS('.box3').classList.remove('valid');
                getS('.box3').classList.add('invalid6')
                getS('.l3').classList.remove('up', 'padding');
            } else {
                // якщо емейлу ще нема тоді добавляється новий юзер у localStorage 
                localStorage.setItem(`user${num + 1}`, toJson)
                decorateNoneForm1()
            }
        } else { 
            // якщо localStorage пустий то добавляємо першого юзера
            localStorage.setItem(`user1`, toJson);
            decorateNoneForm1()
        };
    };
}

// фунція для добавлення классів зі стилями для гарних плейс холдерів
function place() {
    event.target.value
        ? event.target.parentElement.firstElementChild.classList.add('up') || event.target.classList.add('padding')
        : event.target.parentElement.firstElementChild.classList.remove('up') || event.target.classList.remove('padding')
}

// переключення між формою логіну і добаляння юзера
function signNow() {
    getS('.main').classList.toggle('hidden');
    getS('.sign').classList.toggle('hidden')
}

// функція залогіну
function signIn() {
    validForm2();
    // перевіряєм в полях валідні данні згідно регулярок
    if (getS('.box2_3').classList.contains('valid') && getS('.box2_4').classList.contains('valid')) {
        // перевіряємо чи вже є якісь юзери в БД
        if (localStorage.length > 0) {
            // якщо БД не пуста, то циклом перевіряємо кожен обєкт
            // на співпадіння емейлу та відповіднясть паролю його паролю
            let fromJson = {};
            let check = false;
            let userForLogin = {};
            for (let i = 0; i < localStorage.length; i++) {
                fromJson = JSON.parse(localStorage.getItem(`user${i + 1}`));
                if (fromJson.email === getS('.email2').value && fromJson.pass === getS('.pass2').value) {
                    check = true;
                    userForLogin = fromJson;
                };
            }
            // якщо емейл та його пароль зійшлися тоді заповнюємо профайл і переходимо до нього
            if (check == true) {
                getS('.proFile').classList.remove('hidden');
                getS('.sign').classList.add('hidden')
                getS('.userName').textContent = `${userForLogin.name} ${userForLogin.surname}`;
                getS('.userEmail').textContent = `${userForLogin.email}`;
                getS('.box2_4').classList.remove('invalid5');
                decorateNoneForm2();
            } else {
                // якщо такого юзера нема  то помилка user not found
                alert(`user not found`);
            }
        } else {
            // якщо БД пуста то помилка 
            getS('.box2_4').classList.remove('invalid4');
            getS('.box2_4').classList.add('invalid5')
        };
    }
}

// розлогін з профайлу і поакрнення до форми логіну
function out() {
    getS('.proFile').classList.add('hidden');
    getS('.sign').classList.remove('hidden')
}

// валідація першої форми з допомогої регулярних виразів і добавляння відповідних стилів до полів
function validForm1() {
    regName.test(getS('.first').value)
        ? getS('.box1').classList.remove('invalid1') || getS('.box1').classList.add('valid')
        : getS('.box1').classList.add('invalid1') || getS('.box1').classList.remove('valid');
    regName2.test(getS('.last').value)
        ? getS('.box2').classList.remove('invalid2') || getS('.box2').classList.add('valid')
        : getS('.box2').classList.add('invalid2') || getS('.box2').classList.remove('valid');
    regEmail.test(getS('.email').value)
        ? getS('.box3').classList.remove('invalid3') || getS('.box3').classList.add('valid')
        : getS('.box3').classList.add('invalid3') || getS('.box3').classList.remove('valid');
    regPass.test(getS('.pass').value)
        ? getS('.box4').classList.remove('invalid4') || getS('.box4').classList.add('valid')
        : getS('.box4').classList.add('invalid4') || getS('.box4').classList.remove('valid');
}

// валідація другої форми з допомогої регулярних виразів  і добавляння відповідних стилів до полів
function validForm2() {
    regEmail.test(getS('.email2').value)
        ? getS('.box2_3').classList.remove('invalid3') || getS('.box2_3').classList.add('valid')
        : getS('.box2_3').classList.add('invalid3') || getS('.box2_3').classList.remove('valid');
    regPass.test(getS('.pass2').value)
        ? getS('.box2_4').classList.remove('invalid4') || getS('.box2_4').classList.add('valid')
        : getS('.box2_4').classList.add('invalid4') || getS('.box2_4').classList.remove('valid');
}

// скидування стилів першої форми і очищення полів
function decorateNoneForm1() {
    f1.reset();
    getS('.box1').classList.remove('valid');
    getS('.box2').classList.remove('valid');
    getS('.box3').classList.remove('valid');
    getS('.box3').classList.remove('invalid6');
    getS('.box4').classList.remove('valid');
    getS('.l1').classList.remove('up', 'padding');
    getS('.l2').classList.remove('up', 'padding');
    getS('.l3').classList.remove('up', 'padding');
    getS('.l4').classList.remove('up', 'padding');
}

// скидування стилів другої форми і очищення полів
function decorateNoneForm2() {
    f2.reset();
    getS('.box2_3').classList.remove('valid');
    getS('.box2_4').classList.remove('valid');
    getS('.l5').classList.remove('up', 'padding');
    getS('.l6').classList.remove('up', 'padding');
}