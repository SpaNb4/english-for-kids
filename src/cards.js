const cards = [
    [
        {
            word: 'Animals 1',
            image: 'img/animals_1.png',
        },
        {
            word: 'Animals 2',
            image: 'img/animals_2.png',
        },
        {
            word: 'Vegetables',
            image: 'img/vegetables.png',
        },
        {
            word: 'Professions',
            image: 'img/professions.png',
        },
        {
            word: 'Fantasy',
            image: 'img/fantasy.png',
        },
        {
            word: 'Toys',
            image: 'img/toys.png',
        },
        {
            word: 'Numbers',
            image: 'img/numbers.png',
        },
        {
            word: 'Space',
            image: 'img/space.png',
        },
    ],
    [
        {
            word: 'cry',
            translation: 'плакать',
            image: 'img/space.png',
            audioSrc: 'cry.mp3',
        },
        {
            word: 'dance',
            translation: 'танцевать',
            image: 'img/fantasy.png',
            audioSrc: 'house.mp3',
        },
        {
            word: 'dive',
            translation: 'нырять',
            image: 'img/numbers.png',
            audioSrc: 'house.mp3',
        },
        {
            word: 'draw',
            translation: 'рисовать',
            image: 'img/numbers.png',
            audioSrc: 'cat.mp3',
        },
        {
            word: 'fish',
            translation: 'ловить рыбу',
            image: 'img/numbers.png',
            audioSrc: 'cat.mp3',
        },
        {
            word: 'fly',
            translation: 'летать',
            image: 'img/numbers.png',
            audioSrc: 'sounds/1.mp3',
        },
        {
            word: 'hug',
            translation: 'обнимать',
            image: 'img/numbers.png',
            audioSrc: 'sounds/1.mp3',
        },
        {
            word: 'jump',
            translation: 'прыгать',
            image: 'img/numbers.png',
            audioSrc: 'sounds/1.mp3',
        },
    ],
    [
        {
            word: 'open',
            translation: 'открывать',
            image: 'img/open.png',
            audioSrc: 'audio/open.mp3',
        },
        {
            word: 'play',
            translation: 'играть',
            image: 'img/play.png',
            audioSrc: 'audio/play.mp3',
        },
        {
            word: 'point',
            translation: 'указывать',
            image: 'img/point.png',
            audioSrc: 'audio/point.mp3',
        },
        {
            word: 'ride',
            translation: 'ездить',
            image: 'img/ride.png',
            audioSrc: 'audio/ride.mp3',
        },
        {
            word: 'run',
            translation: 'бегать',
            image: 'img/run.png',
            audioSrc: 'audio/run.mp3',
        },
        {
            word: 'sing',
            translation: 'петь',
            image: 'img/sing.png',
            audioSrc: 'audio/sing.mp3',
        },
        {
            word: 'skip',
            translation: 'пропускать, прыгать',
            image: 'img/skip.png',
            audioSrc: 'audio/skip.mp3',
        },
        {
            word: 'swim',
            translation: 'плавать',
            image: 'img/swim.png',
            audioSrc: 'audio/swim.mp3',
        },
    ],
    [
        {
            word: 'cat',
            translation: 'кот',
            image: 'img/cat.png',
            audioSrc: 'audio/cat.mp3',
        },
        {
            word: 'chick',
            translation: 'цыплёнок',
            image: 'img/chick.png',
            audioSrc: 'audio/chick.mp3',
        },
        {
            word: 'chicken',
            translation: 'курица',
            image: 'img/chicken.png',
            audioSrc: 'audio/chicken.mp3',
        },
        {
            word: 'dog',
            translation: 'собака',
            image: 'img/dog.png',
            audioSrc: 'audio/dog.mp3',
        },
        {
            word: 'horse',
            translation: 'лошадь',
            image: 'img/horse.png',
            audioSrc: 'audio/horse.mp3',
        },
        {
            word: 'pig',
            translation: 'свинья',
            image: 'img/pig.png',
            audioSrc: 'audio/pig.mp3',
        },
        {
            word: 'rabbit',
            translation: 'кролик',
            image: 'img/rabbit.png',
            audioSrc: 'audio/rabbit.mp3',
        },
        {
            word: 'sheep',
            translation: 'овца',
            image: 'img/sheep.png',
            audioSrc: 'audio/sheep.mp3',
        },
    ],
    [
        {
            word: 'bird',
            translation: 'птица',
            image: 'img/bird.png',
            audioSrc: 'audio/bird.mp3',
        },
        {
            word: 'fish',
            translation: 'рыба',
            image: 'img/fish1.png',
            audioSrc: 'audio/fish.mp3',
        },
        {
            word: 'frog',
            translation: 'жаба',
            image: 'img/frog.png',
            audioSrc: 'audio/frog.mp3',
        },
        {
            word: 'giraffe',
            translation: 'жирафа',
            image: 'img/giraffe.png',
            audioSrc: 'audio/giraffe.mp3',
        },
        {
            word: 'lion',
            translation: 'лев',
            image: 'img/lion.png',
            audioSrc: 'audio/lion.mp3',
        },
        {
            word: 'mouse',
            translation: 'мышь',
            image: 'img/mouse.png',
            audioSrc: 'audio/mouse.mp3',
        },
        {
            word: 'turtle',
            translation: 'черепаха',
            image: 'img/turtle.png',
            audioSrc: 'audio/turtle.mp3',
        },
        {
            word: 'dolphin',
            translation: 'дельфин',
            image: 'img/dolphin.png',
            audioSrc: 'audio/dolphin.mp3',
        },
    ],
    [
        {
            word: 'skirt',
            translation: 'юбка',
            image: 'img/skirt.png',
            audioSrc: 'audio/skirt.mp3',
        },
        {
            word: 'pants',
            translation: 'брюки',
            image: 'img/pants.png',
            audioSrc: 'audio/pants.mp3',
        },
        {
            word: 'blouse',
            translation: 'блузка',
            image: 'img/blouse.png',
            audioSrc: 'audio/blouse.mp3',
        },
        {
            word: 'dress',
            translation: 'платье',
            image: 'img/dress.png',
            audioSrc: 'audio/dress.mp3',
        },
        {
            word: 'boot',
            translation: 'ботинок',
            image: 'img/boot.png',
            audioSrc: 'audio/boot.mp3',
        },
        {
            word: 'shirt',
            translation: 'рубашка',
            image: 'img/shirt.png',
            audioSrc: 'audio/shirt.mp3',
        },
        {
            word: 'coat',
            translation: 'пальто',
            image: 'img/coat.png',
            audioSrc: 'audio/coat.mp3',
        },
        {
            word: 'shoe',
            translation: 'туфли',
            image: 'img/shoe.png',
            audioSrc: 'audio/shoe.mp3',
        },
    ],
    [
        {
            word: 'sad',
            translation: 'грустный',
            image: 'img/sad.png',
            audioSrc: 'audio/sad.mp3',
        },
        {
            word: 'angry',
            translation: 'сердитый',
            image: 'img/angry.png',
            audioSrc: 'audio/angry.mp3',
        },
        {
            word: 'happy',
            translation: 'счастливый',
            image: 'img/happy.png',
            audioSrc: 'audio/happy.mp3',
        },
        {
            word: 'tired',
            translation: 'уставший',
            image: 'img/tired.png',
            audioSrc: 'audio/tired.mp3',
        },
        {
            word: 'surprised',
            translation: 'удивлённый',
            image: 'img/surprised.png',
            audioSrc: 'audio/surprised.mp3',
        },
        {
            word: 'scared',
            translation: 'испуганный',
            image: 'img/scared.png',
            audioSrc: 'audio/scared.mp3',
        },
        {
            word: 'smile',
            translation: 'улыбка',
            image: 'img/smile.png',
            audioSrc: 'audio/smile.mp3',
        },
        {
            word: 'laugh',
            translation: 'смех',
            image: 'img/laugh.png',
            audioSrc: 'audio/laugh.mp3',
        },
    ],
];

export default cards;
