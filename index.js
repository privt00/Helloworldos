const readline = require('readline');

const poemLines = [
    "The ocean’s gentle roar",
    "Beneath the moon’s soft glow",
    "A gentle breeze whispers",
    "Jubilant echoes in the night",
    "Cascading leaves in autumn",
    "Stars twinkle brightly",
    "Pine trees sway gently",
    "Evening comes with a hush",
    "Whispering winds through the trees",
    "Kites soaring high",
    "Fields of golden grain",
    "A lovely day in the park",
    "Nights are calm and serene",
    "Softly falling snow",
    "One bright morning",
    "Valleys echo the sound",
    "Falling leaves drift by",
    "Poppies sway in the breeze",
    "Jubilant songs fill the air",
    "Xylophone notes in the air",
    "Dancing in the moonlight",
    "Morning dew on petals",
    "Underneath the starlit sky",
    "Rivers flow through valleys",
    "Glistening stars above",
    "Whispers of the forest",
    "Vibrant colors of dusk",
    "Two shadows in the twilight",
    "Quiet whispers in the wind",
    "Kites flying high",
    "Seven hills and valleys",
    "The sun sets gently",
    "Opal colors in the sky",
    "Xylophones play a tune",
    "Nine clouds in the sky",
    "Echoes of a distant song",
    "Mountains reach the sky",
    "Softly falling snow",
    "Three steps on the path",
    "Lingering scent of pine",
    "A quiet pause in conversation",
    "Glistening stars above",
    "Clouds floating by",
    "Fields of golden grain",
    "Bright stars in the sky",
    "Yesterday’s dreams linger",
    "Seven hills and valleys",
    "Nights filled with wonder",
    "In the heart of the city",
    "Quiet moments of reflection",
    "The ocean’s gentle roar",
    "Xylophones play a tune",
    "A lovely day in the park",
    "Six stars in the night sky",
    "Falling leaves drift by",
    "Bright stars in the sky",
    "Pine trees sway gently",
    "A quiet pause in conversation"
];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function encodeToPoem(text) {
    let encodedLines = [];
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const index = getCharacterIndex(char);
        if (index !== -1) {
            encodedLines.push(poemLines[index]);
        } else {
            encodedLines.push("Unknown character");
        }
    }
    return encodedLines.join(' | ');
}

function decodeFromPoem(poem) {
    let decodedText = '';
    const lines = poem.split(' | ');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const index = poemLines.indexOf(line);
        if (index !== -1) {
            decodedText += getCharacterForIndex(index);
        } else {
            decodedText += '?';
        }
    }
    return decodedText;
}

function getCharacterIndex(char) {
    if (char >= 'a' && char <= 'z') {
        return char.charCodeAt(0) - 'a'.charCodeAt(0);
    } else if (char >= 'A' && char <= 'Z') {
        return char.charCodeAt(0) - 'A'.charCodeAt(0) + 26;
    } else if (char >= '0' && char <= '9') {
        return 52 + (char.charCodeAt(0) - '0'.charCodeAt(0));
    } else {
        const specialChars = "!\"#$%&'()*+,-./:;<=>?@[]\\^_`{|}~ ";
        const index = specialChars.indexOf(char);
        if (index !== -1) {
            return 62 + index;
        }
        return -1;
    }
}

function getCharacterForIndex(index) {
    if (index >= 0 && index <= 25) {
        return String.fromCharCode('a'.charCodeAt(0) + index);
    } else if (index >= 26 && index <= 51) {
        return String.fromCharCode('A'.charCodeAt(0) + (index - 26));
    } else if (index >= 52 && index <= 61) {
        return String.fromCharCode('0'.charCodeAt(0) + (index - 52));
    } else if (index >= 62 && index <= 81) {
        const specialChars = "!\"#$%&'()*+,-./:;<=>?@[]\\^_`{|}~ ";
        return specialChars[index - 62];
    }
    return '?';
}

function start() {
    rl.question('Would you like to encode or decode? (e/d): ', (choice) => {
        if (choice.toLowerCase() === 'e') {
            rl.question('Enter the text to encode: ', (text) => {
                console.log('Encoded Poem:', encodeToPoem(text));
                rl.close();
            });
        } else if (choice.toLowerCase() === 'd') {
            rl.question('Enter the poem to decode: ', (poem) => {
                console.log('Decoded Text:', decodeFromPoem(poem));
                rl.close();
            });
        } else {
            console.log('Invalid choice. Please enter "e" to encode or "d" to decode.');
            rl.close();
        }
    });
}
start();
