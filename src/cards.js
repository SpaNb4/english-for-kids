const cards = [
    [
        {
            word: 'Animals 1',
            image: 'img/categories/animals_1.png',
            category: true,
        },
        {
            word: 'Animals 2',
            image: 'img/categories/animals_2.png',
            category: true,
        },
        {
            word: 'Vegetables',
            image: 'img/categories/vegetables.png',
            category: true,
        },
        {
            word: 'Professions',
            image: 'img/categories/professions.png',
            category: true,
        },
        {
            word: 'Fantasy',
            image: 'img/categories/fantasy.png',
            category: true,
        },
        {
            word: 'Toys',
            image: 'img/categories/toys.png',
            category: true,
        },
        {
            word: 'Numbers',
            image: 'img/categories/numbers.png',
            category: true,
        },
        {
            word: 'Space',
            image: 'img/categories/space.png',
            category: true,
        },
    ],
    [
        {
            word: 'leopard',
            translation: 'леопард',
            image: 'img/animals_1/leopard.png',
        },
        {
            word: 'bull',
            translation: 'бык',
            image: 'img/animals_1/bull.png',
        },
        {
            word: 'elephant',
            translation: 'слон',
            image: 'img/animals_1/elephant.png',
        },
        {
            word: 'deer',
            translation: 'олень',
            image: 'img/animals_1/deer.png',
        },
        {
            word: 'zebra',
            translation: 'зебра',
            image: 'img/animals_1/zebra.png',
        },
        {
            word: 'horse',
            translation: 'лошадь',
            image: 'img/animals_1/horse.png',
        },
        {
            word: 'sloth',
            translation: 'ленивец',
            image: 'img/animals_1/sloth.png',
        },
        {
            word: 'lion',
            translation: 'лев',
            image: 'img/animals_1/lion.png',
        },
    ],
    [
        {
            word: 'eagle-owl',
            translation: 'филин',
            image: 'img/animals_2/eagle_owl.png',
        },
        {
            word: 'cat',
            translation: 'кот',
            image: 'img/animals_2/cat.png',
        },
        {
            word: 'parrot',
            translation: 'попугай',
            image: 'img/animals_2/parrot.png',
        },
        {
            word: 'rabbit',
            translation: 'кролик',
            image: 'img/animals_2/rabbit.png',
        },
        {
            word: 'giraffe',
            translation: 'жираф',
            image: 'img/animals_2/giraffe.png',
        },
        {
            word: 'pelican',
            translation: 'пеликан',
            image: 'img/animals_2/pelican.png',
        },
        {
            word: 'rhino',
            translation: 'носорог',
            image: 'img/animals_2/rhino.png',
        },
        {
            word: 'tiger',
            translation: 'тигр',
            image: 'img/animals_2/tiger.png',
        },
    ],
    [
        {
            word: 'potato',
            translation: 'картошка',
            image: 'img/vegetables/potato.png',
        },
        {
            word: 'tomato',
            translation: 'помидор',
            image: 'img/vegetables/tomato.png',
        },
        {
            word: 'carrot',
            translation: 'морковка',
            image: 'img/vegetables/carrot.png',
        },
        {
            word: 'red pepper',
            translation: 'красный перец',
            image: 'img/vegetables/red_pepper.png',
        },
        {
            word: 'onion',
            translation: 'лук',
            image: 'img/vegetables/onion.png',
        },
        {
            word: 'radish',
            translation: 'редиска',
            image: 'img/vegetables/radish.png',
        },
        {
            word: 'pumpkin',
            translation: 'тыква',
            image: 'img/vegetables/pumpkin.png',
        },
        {
            word: 'garlic',
            translation: 'чеснок',
            image: 'img/vegetables/garlic.png',
        },
    ],
    [
        {
            word: 'reporter',
            translation: 'репортёр',
            image: 'img/professions/reporter.png',
        },
        {
            word: 'auto mechanic',
            translation: 'автомеханик',
            image: 'img/professions/auto_mechanic.png',
        },
        {
            word: 'farmer',
            translation: 'фермер',
            image: 'img/professions/farmer.png',
        },
        {
            word: 'policeman',
            translation: 'полицейский',
            image: 'img/professions/policeman.png',
        },
        {
            word: 'doctor',
            translation: 'доктор',
            image: 'img/professions/doctor.png',
        },
        {
            word: 'woodcutter',
            translation: 'дровосек',
            image: 'img/professions/woodcutter.png',
        },
        {
            word: 'referee',
            translation: 'рефери',
            image: 'img/professions/referee.png',
        },
        {
            word: 'cook',
            translation: 'повар',
            image: 'img/professions/cook.png',
        },
    ],
    [
        {
            word: 'fairy',
            translation: 'фея',
            image: 'img/fantasy/fairy.png',
        },
        {
            word: 'queen',
            translation: 'королева',
            image: 'img/fantasy/queen.png',
        },
        {
            word: 'princess',
            translation: 'принцесса',
            image: 'img/fantasy/princess.png',
        },
        {
            word: 'castle',
            translation: 'замок',
            image: 'img/fantasy/castle.png',
        },
        {
            word: 'unicorn',
            translation: 'единорог',
            image: 'img/fantasy/unicorn.png',
        },
        {
            word: 'dragon',
            translation: 'дракон',
            image: 'img/fantasy/dragon.png',
        },
        {
            word: 'tower',
            translation: 'башня',
            image: 'img/fantasy/tower.png',
        },
        {
            word: 'warrior',
            translation: 'воин',
            image: 'img/fantasy/warrior.png',
        },
    ],
    [
        {
            word: 'tank',
            translation: 'танк',
            image: 'img/toys/tank.png',
        },
        {
            word: 'helicopter',
            translation: 'вертолёт',
            image: 'img/toys/helicopter.png',
        },
        {
            word: 'train',
            translation: 'поезд',
            image: 'img/toys/train.png',
        },
        {
            word: 'constructor',
            translation: 'конструктор',
            image: 'img/toys/constructor.png',
        },
        {
            word: 'dinosaur',
            translation: 'динозавр',
            image: 'img/toys/dinosaur.png',
        },
        {
            word: 'soldier',
            translation: 'солдатик',
            image: 'img/toys/soldier.png',
        },
        {
            word: 'robot',
            translation: 'робот',
            image: 'img/toys/robot.png',
        },
        {
            word: 'basketball',
            translation: 'баскетбольный мяч',
            image: 'img/toys/basketball.png',
        },
    ],
    [
        {
            word: 'one',
            translation: 'один',
            image: 'img/numbers/one.png',
        },
        {
            word: 'two',
            translation: 'два',
            image: 'img/numbers/two.png',
        },
        {
            word: 'three',
            translation: 'три',
            image: 'img/numbers/three.png',
        },
        {
            word: 'four',
            translation: 'четыре',
            image: 'img/numbers/four.png',
        },
        {
            word: 'five',
            translation: 'пять',
            image: 'img/numbers/five.png',
        },
        {
            word: 'six',
            translation: 'шесть',
            image: 'img/numbers/six.png',
        },
        {
            word: 'seven',
            translation: 'семь',
            image: 'img/numbers/seven.png',
        },
        {
            word: 'eight',
            translation: 'восемь',
            image: 'img/numbers/eight.png',
        },
    ],
    [
        {
            word: 'Earth',
            translation: 'Земля',
            image: 'img/space/Earth.png',
        },
        {
            word: 'Moon',
            translation: 'Луна',
            image: 'img/space/Moon.png',
        },
        {
            word: 'Sun',
            translation: 'Солнце',
            image: 'img/space/Sun.png',
        },
        {
            word: 'cosmonaut',
            translation: 'космонавт',
            image: 'img/space/cosmonaut.png',
        },
        {
            word: 'spaceship',
            translation: 'космический корабль',
            image: 'img/space/spaceship.png',
        },
        {
            word: 'alien',
            translation: 'инопланетянин',
            image: 'img/space/alien.png',
        },
        {
            word: 'flying saucer',
            translation: 'летающая тарелка',
            image: 'img/space/flying_saucer.png',
        },
        {
            word: 'Mars',
            translation: 'Марс',
            image: 'img/space/Mars.png',
        },
    ],
];

export default cards;
