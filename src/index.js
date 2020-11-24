import './assets/scss/main.scss';
import cardsArr from './cards';

function importAll(r) {
    r.keys().forEach(r);
}

importAll(require.context('./assets/sounds/', true, /\.mp3$/));

let cardsDiv = document.querySelector('.cards');
let menuUl = document.querySelector('.menu_ul');

const English = {
    isStartPage: true,
    isTrainMode: true,
    isGameStart: false,
    wordsArr: [],
    currNumberWord: 0,
    wrongWordsCount: 0,

    init() {
        // set categories
        this.setCards(0);

        let categoriesName = document.querySelector('.categories_name');
        categoriesName.innerHTML = 'Categories';

        // set menu
        let menuLi = document.querySelector('.menu_ul li');
        if (!menuLi) {
            for (let i = 0; i < cardsArr[0].length; i++) {
                let menuLi = document.createElement('li');
                menuLi.innerHTML = `<a class="card_name" href="#">${cardsArr[0][i].word}</a>`;
                menuUl.append(menuLi);
            }
        }
    },

    // remove all cards
    clearCards() {
        cardsDiv.innerHTML = '';
    },

    setCards(n) {
        for (let i = 0; i < cardsArr[n].length; i++) {
            let card = document.createElement('div');
            card.classList.add('card');
            // categories card
            if (!cardsArr[n][i].audioSrc) {
                card.innerHTML = `<div class="card_img">
                                    <img src="./assets/${cardsArr[n][i].image}" alt="">
                                  </div>
                                  <div class="card_description">
                                    <div class="card_name">${cardsArr[n][i].word}</div>
                                  </div>`;
                // not categories card
            } else {
                card.classList.add('card_flip');
                card.innerHTML = `<div class="card_front">
                                    <div class="card_img">
                                        <img src="./assets/${cardsArr[n][i].image}" alt="">
                                    </div>
                                    <div class="card_description">
                                        <div class="card_name">${cardsArr[n][i].word}</div>
                                            <div class='flip_btn'> </div>
                                    </div>
                                  </div>

                                  <div class="card_back">
                                    <div class="card_img">
                                        <img src="./assets/${cardsArr[n][i].image}" alt="">
                                    </div>
                                     <div class="card_description">
                                        <div class="card_name">${cardsArr[n][i].translation}</div>
                                     </div>
                                  </div>`;
                card.dataset.audio = cardsArr[n][i].audioSrc;
            }
            this.wordsArr[i] = cardsArr[n][i].audioSrc;
            cardsDiv.append(card);
        }
    },
};

window.addEventListener('DOMContentLoaded', () => {
    English.init();

    // cards click
    cardsDiv.addEventListener('click', (e) => {
        setCategories('.card', e);
    });

    let menuBtn = document.querySelector('.menu_btn');
    let menuPopup = document.querySelector('.menu_popup');
    let startGameBtn = document.querySelector('.categories_start_game');

    // menu btn click
    menuBtn.addEventListener('click', () => {
        menuPopup.classList.toggle('active');
        menuBtn.classList.toggle('rotate');
    });

    // menu specific click
    menuUl.addEventListener('click', (e) => {
        setCategories('.menu_ul li', e);
        menuPopup.classList.toggle('active');
        menuBtn.classList.toggle('rotate');
    });

    // game mode switch
    let gameModeBtn = document.querySelector('#switch');
    gameModeBtn.addEventListener('click', () => {
        let gameModeText = document.querySelector('.game_mode');
        let cardDescr = document.querySelectorAll('.card_description');
        let cardImg = document.querySelectorAll('.card_img img');

        // play mode
        if (gameModeBtn.checked && !English.isStartPage) {
            English.isTrainMode = !English.isTrainMode;
            gameModeText = document.querySelector('.game_mode');
            gameModeText.innerHTML = 'Play';
            for (let i = 0; i < cardDescr.length; i++) {
                cardDescr[i].style.display = 'none';
                cardImg[i].style.height = '240px';
                cardImg[i].style.borderRadius = '20px 20px 20px 20px';
            }
            startGameBtn.style.display = 'block';
            // train mode
        } else {
            English.isTrainMode = !English.isTrainMode;
            gameModeText.innerHTML = 'Train';

            for (let i = 0; i < cardDescr.length; i++) {
                cardDescr[i].style.display = 'flex';
                cardImg[i].style.height = '100%';
                cardImg[i].style.borderRadius = '20px 20px 0px 0px';
            }
            startGameBtn.style.display = 'none';
        }
    });

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));

            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    startGameBtn.addEventListener('click', () => {
        if (English.currNumberWord == 0) {
            shuffle(English.wordsArr);
            const firstWordSound = new Audio(English.wordsArr[English.currNumberWord]);
            firstWordSound.play();
            startGameBtn.innerHTML = 'Repeat';
            English.isGameStart = true;
        } else {
            const repeatWordSound = new Audio(English.wordsArr[English.currNumberWord]);
            repeatWordSound.play();
        }
    });

    function setCategories(trg, e) {
        let clickedCard = e.target.closest(trg);
        let catName = clickedCard.querySelector('.card_name');
        let catHeading = document.querySelector('.categories_name');
        let menuLi = document.querySelectorAll('.menu_ul li a');

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
            English.isStartPage = !English.isStartPage;

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
                const clickedCardSound = new Audio(clickedCard.dataset.audio);
                clickedCardSound.play();
            }
            // play mode card click
        } else if (clickedCard && !English.isTrainMode && English.isGameStart) {
            let catSound = catName.innerHTML + '.mp3';
            let scoreDiv = document.querySelector('.score');

            // correct card click
            if (catSound == English.wordsArr[English.currNumberWord]) {
                const corrSound = new Audio('correct.mp3');
                corrSound.play();
                English.currNumberWord++;
                setTimeout(() => {
                    const nextWordSound = new Audio(English.wordsArr[English.currNumberWord]);
                    nextWordSound.play();
                }, 1000);
                clickedCard.classList.add('inactive');
                let scoreStar = document.createElement('div');
                scoreStar.classList.add('score_star');
                scoreStar.innerHTML = '<img src="./assets/img/right_start.svg" alt="">';
                scoreDiv.append(scoreStar);

                function resMessage(spec_sound, msg) {
                    let scoreDiv = document.querySelector('.score');
                    let categoriesDiv = document.querySelector('.categories');
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
                        startGameBtn.style.display = 'none';
                        startGameBtn.innerHTML = 'Start game';
                        gameModeBtn.checked = false;
                        English.isStartPage = true;
                        English.isTrainMode = true;
                        English.isGameStart = false;
                        English.currNumberWord = 0;
                        English.wrongWordsCount = 0;
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
});
