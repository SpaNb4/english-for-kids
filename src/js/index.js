/* eslint-disable max-len */
import '../assets/scss/main.scss';
import cardsArr from './cards';

// tablesort lib
// https://github.com/tristen/tablesort
import './tablesort/tablesort.min';
import './tablesort/tablesort.number.min';
import './tablesort/tablesort.css';

// eslint-disable-next-line object-curly-newline
import { cardsDiv, menuBtn, menuUl, gameModeBtn, startGameBtn, statsBtn, scoreDiv, categoriesDiv, categoriesName, menuPopup, orangeColor } from './const';
// eslint-disable-next-line
import * as handlers from './handlers';

export const msg = new SpeechSynthesisUtterance();
export const synth = window.speechSynthesis;
msg.lang = 'en-US';

export const English = {
    isStartPage: true,
    isStatsPage: false,
    isTrainMode: true,
    isGameStart: false,
    menuLink: null,
    wordsArr: [],
    statsArr: {},
    currNumberWord: 0,
    wrongWordsCount: 0,

    init() {
        // check stats save
        if (localStorage.getItem('stats')) {
            this.statsArr = JSON.parse(localStorage.getItem('stats'));
        }

        this.isStartPage = true;

        // set categories
        this.setCards(0);

        categoriesName.innerHTML = '<img src="./assets/img/menu/main_page.svg" alt=""> Main Page';

        // set menu
        if (!menuUl.firstChild) {
            const mainPageLi = document.createElement('li');
            mainPageLi.innerHTML = '<img src="./assets/img/menu/main_page.svg" alt=""><a class="card_name active" href="#">Main Page</a>';
            menuUl.append(mainPageLi);
            for (let i = 0; i < cardsArr[0].length; i += 1) {
                const menuLi = document.createElement('li');
                menuLi.innerHTML = `<img src="./assets/img/menu/${cardsArr[0][i].word}.svg" alt=""><a class="card_name" href="#">${cardsArr[0][i].word}</a>`;
                menuUl.append(menuLi);
            }
            this.menuLink = document.querySelectorAll('.menu_ul li a');
            // add active class for main_page_li_a when going to main page
        } else {
            this.clearActiveMenu();
            this.menuLink[0].classList.add('active');
        }
    },

    clearActiveMenu() {
        for (let i = 0; i < this.menuLink.length; i += 1) {
            this.menuLink[i].classList.remove('active');
        }
    },

    // remove all cards, reset state
    clearCards() {
        cardsDiv.innerHTML = '';
        scoreDiv.innerHTML = '';
        if (this.isStartPage) {
            startGameBtn.style.display = 'none';
        }
        startGameBtn.innerHTML = '<img src="./assets/img/start.svg" alt=""> Start game';
        startGameBtn.style.border = `2px solid ${orangeColor}`;
        startGameBtn.style.background = `${orangeColor}`;
        this.isStartPage = false;
        this.isStatsPage = false;
        this.isGameStart = false;
        this.currNumberWord = 0;
        this.wrongWordsCount = 0;
    },

    // generate cards
    setCards(n, arr) {
        function generateCard(i, j) {
            const card = document.createElement('div');
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
            const cardImgFront = card.querySelector('.card_front .card_img');
            cardImgFront.style.background = `no-repeat center url('./assets/${cardsArr[i][j].image}')`;
            cardImgFront.style.backgroundSize = 'contain';
            const cardImgBack = card.querySelector('.card_back .card_img');
            cardImgBack.style.background = `no-repeat center url('./assets/${cardsArr[i][j].image}')`;
            cardImgBack.style.backgroundSize = 'contain';
            statsBtn.style.display = 'block';
            cardsDiv.append(card);
        }
        // genetate from json
        if (!arr) {
            for (let i = 0; i < cardsArr[n].length; i += 1) {
                // categories card
                if (cardsArr[n][i].category) {
                    const card = document.createElement('div');
                    card.classList.add('card');
                    card.innerHTML = `<div class="card_img">
                                  </div>
                                  <div class="card_description">
                                    <div class="card_name">${cardsArr[n][i].word}</div>
                                  </div>`;
                    const cardImg = card.querySelector('.card_img');
                    cardImg.style.background = `no-repeat center url('./assets/${cardsArr[n][i].image}')`;
                    cardImg.style.backgroundSize = 'contain';
                    cardsDiv.append(card);
                    // not categories card
                } else {
                    generateCard(n, i);
                }
                this.wordsArr[i] = cardsArr[n][i].word;
            }
            // generate from array
        } else {
            let q = 0;
            this.wordsArr = [];
            for (let k = 0; k < arr.length; k += 1) {
                for (let i = 0; i < cardsArr[i].length; i += 1) {
                    for (let j = 0; j < cardsArr[j].length; j += 1) {
                        if (arr[q] === cardsArr[i][j].word) {
                            generateCard(i, j);
                            this.wordsArr[q] = cardsArr[i][j].word;
                            q += 1;
                        }
                    }
                }
            }
        }
    },

    setCategories(trg, e) {
        const clickedCard = e.target.closest(trg);
        let catName;
        if (clickedCard != null) {
            catName = clickedCard.querySelector('.card_name');
        }
        function createStatsObj(key, field) {
            if (key in English.statsArr) {
                English.statsArr[key][field] += 1;
                English.statsArr[key].corrPerc = (100 / (English.statsArr[key].playWrongCount + English.statsArr[key].playCorrCount)).toFixed(2);
            } else if (field === 'trainCount') {
                English.statsArr[key] = {
                    trainCount: 1,
                    playCorrCount: 0,
                    playWrongCount: 0,
                    corrPerc: 0,
                };
            } else if (field === 'playCorrCount') {
                English.statsArr[key] = {
                    trainCount: 0,
                    playCorrCount: 1,
                    playWrongCount: 0,
                    corrPerc: 0,
                };
            } else if (field === 'playWrongCount') {
                English.statsArr[key] = {
                    trainCount: 0,
                    playCorrCount: 0,
                    playWrongCount: 1,
                    corrPerc: 0,
                };
            }
            localStorage.setItem('stats', JSON.stringify(English.statsArr));
        }

        function resMessage(specSound, message) {
            const score = document.querySelector('.score');
            English.isStartPage = true;
            English.clearCards();
            score.innerHTML = '';
            const smiley = document.createElement('div');
            smiley.classList.add('smiley');
            smiley.innerHTML = `${message}`;
            categoriesDiv.append(smiley);
            const sound = new Audio(specSound);
            sound.play();
            setTimeout(() => {
                smiley.remove();
                English.clearCards();
                English.init();
            }, 2000);
        }

        // categories click
        if (clickedCard && !clickedCard.classList.contains('card_flip')) {
            let categoriesPos = 0;
            for (let i = 0; i < cardsArr[0].length; i += 1) {
                if (cardsArr[0][i].word === catName.innerHTML) {
                    categoriesPos = i + 1;
                }
            }
            English.clearCards();
            // main page link click
            if (catName.innerHTML === 'Main Page') {
                English.init();
                // click on others links
            } else {
                categoriesName.innerHTML = `<img src="./assets/img/menu/${catName.innerHTML}.svg" alt=""> ${catName.innerHTML} <a href="#" class="back_btn">Main page</a>`;
                const mainPageLink = document.querySelector('.back_btn');
                mainPageLink.addEventListener('click', () => {
                    English.clearCards();
                    English.init();
                });
                English.setCards(categoriesPos);
            }
            for (let i = 0; i < English.menuLink.length; i += 1) {
                English.menuLink[i].classList.remove('active');
                if (English.menuLink[i].innerHTML === catName.innerHTML) {
                    English.menuLink[i].classList.toggle('active');
                }
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
            const catSound = catName.innerHTML;

            // correct card click
            if (catSound === English.wordsArr[English.currNumberWord]) {
                const corrSound = new Audio('./assets/sounds/correct.mp3');
                corrSound.play();

                createStatsObj(catName.innerHTML, 'playCorrCount');

                English.currNumberWord += 1;
                if (English.currNumberWord !== English.wordsArr.length) {
                    setTimeout(() => {
                        msg.text = `${English.wordsArr[English.currNumberWord]}`;
                        synth.speak(msg);
                    }, 1000);
                }
                clickedCard.classList.add('inactive');
                const scoreStar = document.createElement('div');
                scoreStar.classList.add('score_star');
                scoreStar.innerHTML = '<img src="./assets/img/right_start.svg" alt="">';
                scoreDiv.append(scoreStar);

                // win message
                if (English.currNumberWord === English.wordsArr.length && English.wrongWordsCount === 0) {
                    resMessage('./assets/sounds/win.mp3', '<h2>You Win</h2><img src="./assets/img/win_smiley.png" alt="" >');
                    // lose message
                } else if (English.currNumberWord === English.wordsArr.length && English.wrongWordsCount !== 0) {
                    resMessage('./assets/sounds/lose.mp3', `<h2>You Lose: ${English.wrongWordsCount} errors</h2><img src="./assets/img/lose_smiley.png" alt="" >`);
                }
                // wrong card click
            } else {
                createStatsObj(English.wordsArr[English.currNumberWord], 'playWrongCount');

                const scoreStar = document.createElement('div');
                scoreStar.classList.add('score_star');
                scoreStar.innerHTML = '<img src="./assets/img/error_start.svg" alt="">';
                scoreDiv.append(scoreStar);
                const errSound = new Audio('./assets/sounds/error.mp3');
                errSound.play();
                English.wrongWordsCount += 1;
            }
        }
    },

    checkMode() {
        const gameModeText = document.querySelector('.game_mode');
        const cardDescr = document.querySelectorAll('.card_description');
        const cardImg = document.querySelectorAll('.card_img');

        function switchMode(descrVisible, height, border, startBtnVisible, isTrain) {
            English.isTrainMode = isTrain;
            for (let i = 0; i < cardDescr.length; i += 1) {
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
            } else {
                switchMode('flex', '187px', '20px 20px 0px 0px', 'none', true);
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
