import './assets/scss/main.scss';
import cardsArr from './cards';
// tablesort lib
// https://github.com/tristen/tablesort
import './assets/tablesort/tablesort.min';
import './assets/tablesort/tablesort.number.min';
import './assets/tablesort/tablesort.css';

function importAll(r) {
    r.keys().forEach(r);
}

importAll(require.context('./assets/sounds/', true, /\.mp3$/));

let cardsDiv = document.querySelector('.cards');
let menuUl = document.querySelector('.menu_ul');
let scoreDiv = document.querySelector('.score');
let startGameBtn = document.querySelector('.categories_start_game');
let gameModeBtn = document.querySelector('#switch');
let categoriesDiv = document.querySelector('.categories');

const English = {
    isStartPage: true,
    isStatsPage: false,
    isTrainMode: true,
    isGameStart: false,
    wordsArr: [],
    statsArr: {},
    currNumberWord: 0,
    wrongWordsCount: 0,

    init() {
        // check stats save
        if (localStorage.getItem('stats')) {
            English.statsArr = JSON.parse(localStorage.getItem('stats'));
        }

        English.isStartPage = true;

        // set categories
        this.setCards(0);

        let categoriesName = document.querySelector('.categories_name');
        categoriesName.innerHTML = 'Main Page';

        // set menu
        let menuLi = document.querySelector('.menu_ul li');
        if (!menuLi) {
            let menuLi = document.createElement('li');
            menuLi.innerHTML = `<img src="./assets/img/menu/main_page.svg" alt=""><a class="card_name active" href="#">Main Page</a>`;
            menuUl.append(menuLi);
            for (let i = 0; i < cardsArr[0].length; i++) {
                let menuLi = document.createElement('li');
                menuLi.innerHTML = `<img src="./assets/img/menu/${cardsArr[0][i].word}.svg" alt=""><a class="card_name" href="#">${cardsArr[0][i].word}</a>`;
                menuUl.append(menuLi);
            }
        }
    },

    // remove all cards, reset state
    clearCards() {
        cardsDiv.innerHTML = '';
        scoreDiv.innerHTML = '';

        startGameBtn.style.display = 'none';
        startGameBtn.innerHTML = 'Start game';
        English.isStartPage = false;
        English.isStatsPage = false;
        English.isGameStart = false;
        English.currNumberWord = 0;
        English.wrongWordsCount = 0;
    },

    // generate cards
    setCards(n) {
        for (let i = 0; i < cardsArr[n].length; i++) {
            let card = document.createElement('div');
            card.classList.add('card');
            // categories card
            if (cardsArr[n][i].category) {
                card.innerHTML = `<div class="card_img">
                                  </div>
                                  <div class="card_description">
                                    <div class="card_name">${cardsArr[n][i].word}</div>
                                  </div>`;
                let cardImg = card.querySelector('.card_img');
                cardImg.style.background = `no-repeat center url('./assets/${cardsArr[n][i].image}')`;
                cardImg.style.backgroundSize = `contain`;
                // not categories card
            } else {
                card.classList.add('card_flip');
                card.innerHTML = `<div class="card_front">
                                    <div class="card_img">

                                    </div>
                                    <div class="card_description">
                                        <div class="card_name">${cardsArr[n][i].word}</div>
                                            <div class='flip_btn'> </div>
                                    </div>
                                  </div>

                                  <div class="card_back">
                                    <div class="card_img">

                                    </div>
                                     <div class="card_description">
                                        <div class="card_name">${cardsArr[n][i].translation}</div>
                                     </div>
                                  </div>`;

                let cardImgFront = card.querySelector('.card_front .card_img');
                cardImgFront.style.background = `no-repeat center url('./assets/${cardsArr[n][i].image}')`;
                cardImgFront.style.backgroundSize = `contain`;
                let cardImgBack = card.querySelector('.card_back .card_img');
                cardImgBack.style.background = `no-repeat center url('./assets/${cardsArr[n][i].image}')`;
                cardImgBack.style.backgroundSize = `contain`;
            }
            this.wordsArr[i] = cardsArr[n][i].word;
            cardsDiv.append(card);
        }
    },
};

window.addEventListener('DOMContentLoaded', () => {
    let menuBtn = document.querySelector('.menu_btn');
    let menuPopup = document.querySelector('.menu_popup');

    English.init();

    let msg = new SpeechSynthesisUtterance();
    let synth = window.speechSynthesis;
    msg.lang = 'en-US';

    // cards click
    cardsDiv.addEventListener('click', (e) => {
        setCategories('.card', e);
    });

    function menuToggle() {
        menuPopup.classList.toggle('active');
        menuBtn.classList.toggle('rotate');
    }
    // not menu click
    document.body.addEventListener('click', (e) => {
        if (e.target != menuUl && e.target != menuBtn) {
            if (menuPopup.classList.contains('active')) {
                menuToggle();
            }
        } else if (e.target == menuUl) {
            menuToggle();
        }
    });

    // menu btn click
    menuBtn.addEventListener('click', () => {
        menuToggle();
    });

    // menu links click
    menuUl.addEventListener('click', (e) => {
        setCategories('.menu_ul li', e);
        menuToggle();
    });

    function checkMode() {
        let gameModeText = document.querySelector('.game_mode');
        let cardDescr = document.querySelectorAll('.card_description');
        let cardImg = document.querySelectorAll('.card_img');
        // play mode
        if (gameModeBtn.checked && !English.isStartPage && !English.isStatsPage) {
            English.isTrainMode = false;
            gameModeText = document.querySelector('.game_mode');
            gameModeText.innerHTML = 'Play';
            for (let i = 0; i < cardDescr.length; i++) {
                cardDescr[i].style.display = 'none';
                cardImg[i].style.height = '240px';
                cardImg[i].style.borderRadius = '20px 20px 20px 20px';
            }
            startGameBtn.style.display = 'block';
            // train mode
        } else if (!gameModeBtn.checked && !English.isStartPage && !English.isStatsPage) {
            English.isTrainMode = true;
            gameModeText.innerHTML = 'Train';
            for (let i = 0; i < cardDescr.length; i++) {
                cardDescr[i].style.display = 'flex';
                cardImg[i].style.height = '187px';
                cardImg[i].style.borderRadius = '20px 20px 0px 0px';
            }
            startGameBtn.style.display = 'none';
        }
    }

    // game mode switch
    gameModeBtn.addEventListener('click', () => {
        checkMode();
    });

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));

            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    startGameBtn.addEventListener('click', () => {
        // game not start
        if (!English.isGameStart) {
            shuffle(English.wordsArr);
            // first word sound
            msg.text = `${English.wordsArr[English.currNumberWord]}`;
            synth.speak(msg);
            startGameBtn.innerHTML = '<img src="/assets/img/flip_btn.svg" alt="Repeat">Repeat';
            startGameBtn.style.background = '#115599';
            startGameBtn.style.border = '2px solid #115599';
            English.isGameStart = true;
            // game start
        } else {
            // repeat word sound
            msg.text = `${English.wordsArr[English.currNumberWord]}`;
            synth.speak(msg);
        }
    });

    function setCategories(trg, e) {
        let clickedCard = e.target.closest(trg);
        let catName;
        if (clickedCard != null) {
            catName = clickedCard.querySelector('.card_name');
        }
        let catHeading = document.querySelector('.categories_name');
        let menuLi = document.querySelectorAll('.menu_ul li a');

        function createStatsObj(key, field) {
            if (key in English.statsArr) {
                English.statsArr[key][field] = English.statsArr[key][field] + 1;
            } else {
                if (field == 'trainCount') {
                    English.statsArr[key] = { trainCount: 1, playCorrCount: 0, playWrongCount: 0 };
                } else if (field == 'playCorrCount') {
                    English.statsArr[key] = { trainCount: 0, playCorrCount: 1, playWrongCount: 0 };
                } else if (field == 'playWrongCount') {
                    English.statsArr[key] = { trainCount: 0, playCorrCount: 0, playWrongCount: 1 };
                }
            }
            localStorage.setItem('stats', JSON.stringify(English.statsArr));
        }

        // categories click
        if (clickedCard && !clickedCard.classList.contains('card_flip')) {
            let categoriesPos = 0;
            for (let i = 0; i < cardsArr[0].length; i++) {
                if (cardsArr[0][i].word == catName.innerHTML) {
                    categoriesPos = i + 1;
                }
            }
            English.clearCards();
            catHeading.innerHTML = catName.innerHTML;
            for (let i = 0; i < menuLi.length; i++) {
                menuLi[i].classList.remove('active');
                if (menuLi[i].innerHTML == catName.innerHTML) {
                    menuLi[i].classList.toggle('active');
                }
            }
            English.setCards(categoriesPos);
            English.isStartPage = false;
            checkMode();
            // flip btn click
        } else if (e.target.closest('.flip_btn')) {
            const cardFlip = e.target.closest('.card_flip');
            cardFlip.classList.toggle('fliped');
            cardFlip.addEventListener('mouseleave', () => {
                if (cardFlip.classList.contains('fliped')) {
                    cardFlip.classList.toggle('fliped');
                }
            });
            // not categories card click
        } else if (clickedCard && English.isTrainMode) {
            if (!clickedCard.classList.contains('fliped')) {
                msg.text = `${catName.innerHTML}`;
                synth.speak(msg);
                createStatsObj(catName.innerHTML, 'trainCount');
            }
            // play mode card click
        } else if (clickedCard && !English.isTrainMode && English.isGameStart) {
            let catSound = catName.innerHTML;

            // correct card click
            if (catSound == English.wordsArr[English.currNumberWord]) {
                const corrSound = new Audio('correct.mp3');
                corrSound.play();

                createStatsObj(catName.innerHTML, 'playCorrCount');

                English.currNumberWord++;
                if (English.currNumberWord != English.wordsArr.length) {
                    setTimeout(() => {
                        msg.text = `${English.wordsArr[English.currNumberWord]}`;
                        synth.speak(msg);
                    }, 1000);
                }
                clickedCard.classList.add('inactive');
                let scoreStar = document.createElement('div');
                scoreStar.classList.add('score_star');
                scoreStar.innerHTML = '<img src="./assets/img/right_start.svg" alt="">';
                scoreDiv.append(scoreStar);

                function resMessage(spec_sound, msg) {
                    let scoreDiv = document.querySelector('.score');
                    English.clearCards();
                    scoreDiv.innerHTML = '';
                    let smiley = document.createElement('div');
                    smiley.classList.add('smiley');
                    smiley.innerHTML = `${msg}`;
                    categoriesDiv.append(smiley);
                    const sound = new Audio(spec_sound);
                    sound.play();
                    setTimeout(() => {
                        smiley.remove();
                        English.clearCards();
                        English.init();
                    }, 2000);
                }
                // win message
                if (English.currNumberWord == English.wordsArr.length && English.wrongWordsCount == 0) {
                    resMessage('win.mp3', '<h2>You Win</h2><img src="./assets/img/win_smiley.png" alt="" >');
                    // lose message
                } else if (English.currNumberWord == English.wordsArr.length && English.wrongWordsCount != 0) {
                    resMessage('lose.mp3', `<h2>You Lose: ${English.wrongWordsCount} errors</h2><img src="./assets/img/lose_smiley.png" alt="" >`);
                }
                // wrong card click
            } else {
                createStatsObj(English.wordsArr[English.currNumberWord], 'playWrongCount');

                let scoreStar = document.createElement('div');
                scoreStar.classList.add('score_star');
                scoreStar.innerHTML = '<img src="./assets/img/error_start.svg" alt="">';
                scoreDiv.append(scoreStar);
                const errSound = new Audio('error.mp3');
                errSound.play();
                English.wrongWordsCount++;
            }
        }
    }

    let statsBtn = document.querySelector('.categories_stats');
    statsBtn.addEventListener('click', () => {
        English.clearCards();
        English.isStatsPage = true;
        categoriesDiv.innerHTML = '';
        let statsDiv = document.createElement('div');
        statsDiv.classList.add('stats');
        statsDiv.innerHTML = `<div class="stats_buttons">
                                <a href="#">Repeat difficult words</a>
                                <a href="#">Reset</a>
                              </div>
                              <div class="stats_table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Word</th>
                                            <th>Translation</th>
                                            <th>Category</th>
                                            <th>Trained</th>
                                            <th>Correct</th>
                                            <th>Wrong</th>
                                            <th>Correct, %</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                              </div>`;
        categoriesDiv.append(statsDiv);

        let n = 0;
        console.log(English.statsArr);
        for (let i = 1; i < cardsArr.length; i++) {
            for (let j = 0; j < cardsArr[i].length; j++) {
                let lastTr = document.querySelector('.stats_table tbody');
                let tr = document.createElement('tr');
                if (cardsArr[i][j].word in English.statsArr) {
                    if (English.statsArr[cardsArr[i][j].word].playCorrCount != 0) {
                        tr.innerHTML = `
                            <td>${cardsArr[i][j].word}</td>
                            <td>${cardsArr[i][j].translation}</td>
                            <td>${cardsArr[0][n].word}</td>
                            <td>${English.statsArr[cardsArr[i][j].word].trainCount}</td>
                            <td>${English.statsArr[cardsArr[i][j].word].playCorrCount}</td>
                            <td>${English.statsArr[cardsArr[i][j].word].playWrongCount}</td>
                            <td>${(100 / (English.statsArr[cardsArr[i][j].word].playWrongCount + English.statsArr[cardsArr[i][j].word].playCorrCount)).toFixed(2)}</td>
                        `;
                    } else {
                        tr.innerHTML = `
                        <td>${cardsArr[i][j].word}</td>
                        <td>${cardsArr[i][j].translation}</td>
                        <td>${cardsArr[0][n].word}</td>
                        <td>${English.statsArr[cardsArr[i][j].word].trainCount}</td>
                        <td>${English.statsArr[cardsArr[i][j].word].playCorrCount}</td>
                        <td>${English.statsArr[cardsArr[i][j].word].playWrongCount}</td>
                        <td>0</td>
                    `;
                    }
                } else {
                    tr.innerHTML = `
                                    <td>${cardsArr[i][j].word}</td>
                                    <td>${cardsArr[i][j].translation}</td>
                                    <td>${cardsArr[0][n].word}</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                `;
                }
                lastTr.append(tr);
            }
            n++;
        }
        new Tablesort(document.querySelector('.stats_table table'));
    });
});
