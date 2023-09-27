const inputElement = document.querySelector('.cmd-input');
const outputElement = document.querySelector('.output');

let messageIndex = 0;
const welcomeMessage = `
$$___$$___________$$__________________________________
$$___$$___________$$__________________________________
$$___$$__$$$$_____$$_____$$$$____$$$$___$$$$$$___$$$$_
$$_$_$$_$$__$$____$$____$$__$$__$$__$$__$$_$_$$_$$__$$
$$_$_$$_$$__$$____$$____$$______$$__$$__$$_$_$$_$$__$$
$$_$_$$_$$$$$$____$$____$$______$$__$$__$$_$_$$_$$$$$$
_$$_$$__$$________$$____$$______$$__$$__$$_$_$$_$$____
_$$_$$__$$________$$____$$__$$__$$__$$__$$_$_$$_$$____
_$$_$$___$$$$___$$$$$$___$$$$____$$$$___$$___$$__$$$$_
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
        const cmd = inputElement.value.trim();

        switch (cmd) {
            case 'clear':
                window.location.href = 'index.html';
                break;
            case 'resume':
                window.location.href = '/about';
                break;
            // Add more cases as needed for other commands
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

        inputElement.value = '';
    }
});
function displayHelp() {
    const commands = [
        'home - Navigates to the home page',
        'about - Navigates to the about page',
        'github - Navigates to my Github profile'
        // Add more commands as needed
    ];

    outputElement.innerHTML += '<div>Available commands:</div>';
    commands.forEach(command => {
        outputElement.innerHTML += `<div>${command}</div>`;
    });
}
