let msg = document.getElementById("msg");
let checker = false,
    lister = true;

let btnFight, btnTry;
let randomWarrior;
let ntnLeft, btnRight, btnExit;
let step = 1,
    apCounter = 0,
    apple = 0;

let hints = document.getElementById("hints");

let marketTheft = document.getElementById("market");
let food = document.getElementById("food");

let battleList = document.getElementById("battleCourse");
let streetFight = document.getElementById("streetFight");
let rasulFight = document.getElementById("rasulFight");
let jafarFight = document.getElementById("jafarFight");


let heroApples = document.getElementById("HeroApples");
let heroGold = document.getElementById("HeroGold");
let heroHealth = document.getElementById("HeroHealth");

let enemyGold = document.getElementById("EnemyGold");
let enemyHealth = document.getElementById("EnemyHealth");

marketTheft.addEventListener("click", stealOnMarket);
streetFight.addEventListener("click", function () { fight(warrior) });
rasulFight.addEventListener("click", function () { fight(rasul) });
jafarFight.addEventListener("click", function () { fight(jafar) });

food.addEventListener("click", function () {

    if (aladdin.apples > 0) {
        if (aladdin.health < 100) {
            aladdin.health += 10;
            aladdin.apples -= 1;
            heroApples.innerHTML = aladdin.apples;
            heroHealth.value = aladdin.health;
        } else {
            aladdin.health = 100;
            aladdin.apples -= 1;
            heroApples.innerHTML = aladdin.apples;
            heroHealth.value = aladdin.health;
        }

    } else {
        hints.style.display = "block";
        hints.innerHTML = "I need at least one apple!";

    }

})

let aladdin = {
    health: 100,
    strong: 10,
    damage: 2,
    lucky: 50,
    apples: 1,
    gold: 0,

};

heroGold.innerHTML = aladdin.gold;
heroApples.innerHTML = aladdin.apples;

let market = {
    name: "Abis Mal",
    health: 20,
    strong: 10,
    damage: 2,
    apples: 50,
    gold: 20
}

let warrior = {
    name: "Security",
    health: 60,
    strong: 10,
    damage: 1,
    lucky: 20,
    apples: 5,
    gold: 20
};

let rasul = {
    name: "Rasul",
    health: 100,
    strong: 20,
    damage: 2,
    lucky: 20,
    apples: 5,
    gold: 30
}

let jafar = {
    name: "Jafar",
    health: 200,
    strong: 30,
    damage: 3,
    lucky: 20,
    apples: 5,
    gold: 50
}

let abu = {
    lucky: 5,
};


function fight(enemy) {

    if (!checker) {

        // очистить записи предыдущего боя
        if (!lister) {
            msg.innerHTML = "";
            hints.style.display = "none";
            let lis = document.getElementsByTagName("li");
            for (let i = (lis.length - 1); i >= 0; i--) {
                lis[i].remove();
            }
        }

        // создаем копию врага
        randomWarrior = Object.assign({}, enemy);
        document.getElementById("Name").innerHTML = randomWarrior.name;
        enemyHealth.value = randomWarrior.health;
        enemyGold.innerHTML = randomWarrior.gold;

        // добавляем кнопку боя
        btnFight = createButton("Fight!");

        btnFight.addEventListener("click", function () {

            hints.style.display = "none";

            //Аладдин бьет первым

            kickOne(aladdin, randomWarrior, enemyHealth, "Aladdin");

            //Урон наносит враг

            kickOne(randomWarrior, aladdin, heroHealth, randomWarrior.name);

            if (aladdin.health <= 0) {
                hints.style.display = "block";
                hints.innerHTML = "I lost my chance!"
                checker = false;
                lister = false;
                return tryAgain();
            }

            if (randomWarrior.health <= 0) {
                aladdin.gold += randomWarrior.gold;
                heroGold.innerHTML = aladdin.gold;
                checker = false;
                lister = false;
                return msg.innerHTML = "Aladdin win!";
            }
        });

        checker = true;

    } else {
        hints.style.display = "block";
        hints.innerHTML = "Defeat the current opponent first!";
    }
}

function kickOne(attacking, defender, healthUpdate, text) {
    // броня 0,3 процент от урона -минус
    defender.health -= attacking.strong * attacking.damage;
    healthUpdate.value = defender.health;
    let elemLi = document.createElement("li");
    elemLi.textContent = `${text} damages ${attacking.strong * attacking.damage}`;
    battleList.prepend(elemLi);
}

function tryAgain() {

    msg.innerHTML = "";
    btnTry = createButton("Try again");

    btnTry.addEventListener("click", function () {
        hints.style.display = "none";
        aladdin.health = 100;
        heroHealth.value = aladdin.health;
        aladdin.strong = 10;
        aladdin.damage = 2;
        aladdin.lucky = 50;
        aladdin.apples = 5;
        heroApples.innerHTML = aladdin.apples;
        aladdin.gold = 0;
        heroGold.innerHTML = aladdin.gold;
        enemyHealth.value = 0;
        enemyGold = 0;
    }
    );

};

function stealOnMarket() {

    if (!checker) {

        // очистить записи предыдущего боя
        if (!lister) {
            msg.innerHTML = "";
            hints.style.display = "none";
            let lis = document.getElementsByTagName("li");
            for (let i = (lis.length - 1); i >= 0; i--) {
                lis[i].remove();
            }
        }

        // создаем кнопки пути

        btnExit = createButton("Exit market");
        btnLeft = createButton("Go Left");
        btnRight = createButton("Go right");
        checker = true;

    }
    else {
        hints.style.display = "block";
        hints.innerHTML = "I'm already here! Help me find the way!";
    }

    btnLeft.addEventListener("click", randomWay);
    btnRight.addEventListener("click", randomWay);
    btnExit.addEventListener("click", exitWay);

}

// рандомное нападение продавца

function randomWay() {

    if (step <= 10) {

        if (apCounter <= 12) {
            apple += Math.floor(Math.random() * 3);
            aladdin.apples += apple;
            apCounter += apple;
            step++;
            inputMsg(apple);
            return heroApples.innerHTML = aladdin.apples;
        } else {
            step = 1;
            apCounter = 0;
            apple = 0;

            checker = false;
            lister = false;

            return fight(market);
        }
    }
    else {
        step = 1;
        apCounter = 0;
        apple = 0;
        checker = true;
        lister = false;
        return fight(market);
    }
}

function abisFight() {
    msg.innerHTML = "";
    hints.style.display = "none";
    aladdin.health -= market.strong * market.damage;
    step = 1;
    apCounter = 0;
    apple = 0;
}

function exitWay() {
    msg.innerHTML = "";
    hints.style.display = "none";
    step = 1;
    apCounter = 0;
    apple = 0;
}

function msgSellerCatch() {
    hints.style.display = "block";
    hints.innerHTML = "Oh no! The seller caught me!";
    msg.innerHTML = "";
}

function createButton(text) {
    let btn = document.createElement("input");
    btn.type = "button";
    btn.value = text;
    msg.prepend(btn);
    return btn;
}

function inputMsg(num) {
    let elemLi = document.createElement("li");
    if (num > 1) {
        elemLi.textContent = `Aladdin stealing ${num} apples`;
    } else {
        elemLi.textContent = `Aladdin stealing ${num} apple`;
    }
    return battleList.prepend(elemLi);
}





