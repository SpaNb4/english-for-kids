import './assets/scss/main.scss';
import cardsArr from './cards';
// tablesort lib
// https://github.com/tristen/tablesort
import './assets/tablesort/tablesort.min';
import './assets/tablesort/tablesort.number.min';
import './assets/tablesort/tablesort.css';

import { cardsDiv, menuBtn, menuUl, gameModeBtn, startGameBtn, statsBtn, scoreDiv, categoriesDiv, categoriesName, menuPopup } from './const';
import * as handlers from './handlers';

function importAll(r) {
    r.keys().forEach(r);
}

importAll(require.context('./assets/sounds/', true, /\.mp3$/));

export let msg = new SpeechSynthesisUtterance();
export let synth = window.speechSynthesis;
msg.lang = 'en-US';

export const English = {
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

        categoriesName.innerHTML = '<img src="./assets/img/menu/main_page.svg" alt=""> Main Page';

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
        startGameBtn.innerHTML = `<img src="./assets/img/start.svg" alt=""> Start game`;
        English.isStartPage = false;
        English.isStatsPage = false;
        English.isGameStart = false;
        English.currNumberWord = 0;
        English.wrongWordsCount = 0;
    },

    // generate cards
    setCards(n, arr) {
        function generateCard(i, j) {
            let card = document.createElement('div');
            card.classList.add('card');
            card.classList.add('card_flip');
            card.innerHTML = `<div class="card_front">
                            <div class="card_img">
                            </div>
                            <div class="card_description">
                                <div class="card_name">${cardsArr[i][j].word}</div>
                                    <div class='flip_btn'> </div>
                            </div>
                          </div>
                          <div class="card_back">
                            <div class="card_img">
                            </div>
                             <div class="card_description">
                                <div class="card_name">${cardsArr[i][j].translation}</div>
                             </div>
                          </div>`;
            let cardImgFront = card.querySelector('.card_front .card_img');
            cardImgFront.style.background = `no-repeat center url('./assets/${cardsArr[i][j].image}')`;
            cardImgFront.style.backgroundSize = `contain`;
            let cardImgBack = card.querySelector('.card_back .card_img');
            cardImgBack.style.background = `no-repeat center url('./assets/${cardsArr[i][j].image}')`;
            cardImgBack.style.backgroundSize = `contain`;
            statsBtn.style.display = 'block';
            cardsDiv.append(card);
        }
        // genetate from json
        if (!arr) {
            for (let i = 0; i < cardsArr[n].length; i++) {
                // categories card
                if (cardsArr[n][i].category) {
                    let card = document.createElement('div');
                    card.classList.add('card');
                    card.innerHTML = `<div class="card_img">
                                  </div>
                                  <div class="card_description">
                                    <div class="card_name">${cardsArr[n][i].word}</div>
                                  </div>`;
                    let cardImg = card.querySelector('.card_img');
                    cardImg.style.background = `no-repeat center url('./assets/${cardsArr[n][i].image}')`;
                    cardImg.style.backgroundSize = `contain`;
                    cardsDiv.append(card);
                    // not categories card
                } else {
                    generateCard(n, i);
                }
                this.wordsArr[i] = cardsArr[n][i].word;
            }
            // generate from array
        } else {
            let n = 0;
            for (let k = 0; k < arr.length; k++) {
                for (let i = 0; i < cardsArr[i].length; i++) {
                    for (let j = 0; j < arr.length; j++) {
                        if (arr[n] == cardsArr[i][j].word) {
                            generateCard(i, j);
                            this.wordsArr[j] = cardsArr[i][j].word;
                            n++;
                        }
                    }
                }
            }
        }
    },

    setCategories(trg, e) {
        let clickedCard = e.target.closest(trg);
        let catName;
        if (clickedCard != null) {
            catName = clickedCard.querySelector('.card_name');
        }
        let menuLi = document.querySelectorAll('.menu_ul li a');

        function createStatsObj(key, field) {
            if (key in English.statsArr) {
                English.statsArr[key][field] = English.statsArr[key][field] + 1;
                English.statsArr[key]['corrPerc'] = (100 / (English.statsArr[key].playWrongCount + English.statsArr[key].playCorrCount)).toFixed(2);
            } else {
                if (field == 'trainCount') {
                    English.statsArr[key] = { trainCount: 1, playCorrCount: 0, playWrongCount: 0, corrPerc: 0 };
                } else if (field == 'playCorrCount') {
                    English.statsArr[key] = { trainCount: 0, playCorrCount: 1, playWrongCount: 0, corrPerc: 0 };
                } else if (field == 'playWrongCount') {
                    English.statsArr[key] = { trainCount: 0, playCorrCount: 0, playWrongCount: 1, corrPerc: 0 };
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
            if (catName.innerHTML == 'Main Page') {
                categoriesName.innerHTML = '<img src="./assets/img/menu/main_page.svg" alt=""> Main Page';
            } else {
                categoriesName.innerHTML = `<img src="./assets/img/menu/${catName.innerHTML}.svg" alt=""> ${catName.innerHTML}`;
            }
            for (let i = 0; i < menuLi.length; i++) {
                menuLi[i].classList.remove('active');
                if (menuLi[i].innerHTML == catName.innerHTML) {
                    menuLi[i].classList.toggle('active');
                }
            }
            English.setCards(categoriesPos);

            if (catName.innerHTML == 'Main Page') {
                English.isStatsPage = true;
            } else {
                English.isStartPage = false;
            }

            English.checkMode();
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
    },

    checkMode() {
        let gameModeText = document.querySelector('.game_mode');
        let cardDescr = document.querySelectorAll('.card_description');
        let cardImg = document.querySelectorAll('.card_img');

        function switchMode(descrVisible, height, border, startBtnVisible, isTrain) {
            English.isTrainMode = isTrain;
            for (let i = 0; i < cardDescr.length; i++) {
                cardDescr[i].style.display = descrVisible;
                cardImg[i].style.height = height;
                cardImg[i].style.borderRadius = border;
            }
            startGameBtn.style.display = startBtnVisible;
        }

        // play mode
        if (gameModeBtn.checked) {
            gameModeText.innerHTML = 'Play';
            if (!English.isStartPage && !English.isStatsPage) {
                switchMode('none', '240px', '20px 20px 20px 20px', 'flex', false);
            }
            // train mode
        } else if (!gameModeBtn.checked) {
            gameModeText.innerHTML = 'Train';
            if (!English.isStartPage && !English.isStatsPage) {
                switchMode('flex', '187px', '20px 20px 0px 0px', 'none', true);
            }
        }
    },

    menuToggle() {
        menuPopup.classList.toggle('active');
        menuBtn.classList.toggle('rotate');
        document.body.classList.toggle('overflow_hidden');
    },
};

English.init();
