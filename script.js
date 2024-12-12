const inputElement = document.querySelector('.cmd-input');
const outputElement = document.querySelector('.output');

let messageIndex = 0;
let currentState = 'DEFAULT';

const welcomeMessage = `
******************************************************
$$___$$___________$$__________________________________
$$___$$___________$$__________________________________
$$___$$__$$$$_____$$_____$$$$____$$$$___$$$$$$___$$$$_
$$_$_$$_$$__$$____$$____$$__$$__$$__$$__$$_$_$$_$$__$$
$$_$_$$_$$__$$____$$____$$______$$__$$__$$_$_$$_$$__$$
$$_$_$$_$$$$$$____$$____$$______$$__$$__$$_$_$$_$$$$$$
_$$_$$__$$________$$____$$______$$__$$__$$_$_$$_$$____
_$$_$$__$$________$$____$$__$$__$$__$$__$$_$_$$_$$____
_$$_$$___$$$$___$$$$$$___$$$$____$$$$___$$___$$__$$$$_
******************************************************
`;


window.onload = () => {
    typeMessage();
};

function typeMessage() {
    if (messageIndex < welcomeMessage.length) {
        outputElement.innerHTML += welcomeMessage.charAt(messageIndex);
        messageIndex++;
        setTimeout(typeMessage, 5); // You can adjust this value to change typing speed
    }
}
inputElement.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const cmd = inputElement.value.trim().toLowerCase();

        if (currentState === 'DEFAULT') {
            switch (cmd) {
                case 'clear':
                    clearTerminal();;
                    break;
                case 'resume':
                    currentState = 'RESUME_PROMPT';
                    outputElement.innerHTML += `<div>Would you like to download my resume? [y/n]</div>`;
                    break;
                case 'help':
                    displayHelp();
                    break;
                case 'github':
                    window.location.href = 'https://github.com/porterfurlongku';
                    break;
                default:
                    outputElement.innerHTML += `<div>Unknown command: ${cmd}</div>`;
                    break;
            }
        } else if (currentState === 'RESUME_PROMPT') {
            switch (cmd) {
                case 'y':
                    currentState = 'DEFAULT';
                    outputElement.innerHTML += `<div>Downloading...</div>`;
                    downloadResume();
                    break;
                case 'n':
                    currentState = 'DEFAULT';
                    outputElement.innerHTML += `<div>Resume will not download.</div>`;
                    break;
                default:
                    outputElement.innerHTML += `<div>Please respond with 'y' or 'n'.</div>`;
                    break;
            }
        }

        inputElement.value = '';
    }
});

function displayHelp() {
    const commands = [
        'clear  - Clears window/Navigates to the home page',
        'resume - Prompts resume download in PDF format',
        'github - Navigates to my Github profile'
        // Add more commands as needed
    ];

    outputElement.innerHTML += '<div>Available commands:</div>';
    commands.forEach(command => {
        outputElement.innerHTML += `<div>${command}</div>`;
    });
}
function downloadResume() {
    window.location.href = "downloadables\resume_Porter_Furlong_2024_Winter.pdf"; // Replace with your resume's path
}
function clearTerminal() {
    outputElement.innerHTML = welcomeMessage;
}

