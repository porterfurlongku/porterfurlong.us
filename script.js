const inputElement = document.querySelector('.cmd-input');
const outputElement = document.querySelector('.output');
const terminalElement = document.querySelector('.terminal');
const loadingIndicator = document.querySelector('.loading-indicator');

let messageIndex = 0;
let currentState = 'DEFAULT';
let commandHistory = [];
let historyIndex = -1;
let typing = false;

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

Welcome to my interactive terminal portfolio! Type 'help' to see available commands.
`;

const commands = {
    help: {
        description: 'Shows this help message',
        action: displayHelp
    },
    clear: {
        description: 'Clears the terminal',
        action: clearTerminal
    },
    resume: {
        description: 'Download my resume (PDF)',
        action: () => {
            currentState = 'RESUME_PROMPT';
            addOutput('Would you like to download my resume? [y/n]');
        }
    },
    github: {
        description: 'Visit my GitHub profile',
        action: () => window.location.href = 'https://github.com/porterfurlongku'
    },
    about: {
        description: 'Learn more about me',
        action: displayAbout
    },
    projects: {
        description: 'View my projects',
        action: displayProjects
    },
    contact: {
        description: 'View contact information',
        action: displayContact
    }
};

window.onload = () => {
    typeMessage();
    inputElement.focus();
};

function typeMessage(message = welcomeMessage, callback = null) {
    if (typing) return;
    typing = true;
    let index = 0;
    
    function type() {
        if (index < message.length) {
            outputElement.innerHTML += message.charAt(index);
            outputElement.scrollTop = outputElement.scrollHeight;
            index++;
            setTimeout(type, Math.random() * 10 + 5);
        } else {
            typing = false;
            if (callback) callback();
        }
    }
    
    type();
}

function addOutput(message, isCommand = false) {
    const div = document.createElement('div');
    div.textContent = isCommand ? `$ ${message}` : message;
    div.style.opacity = '0';
    outputElement.appendChild(div);
    
    setTimeout(() => {
        div.style.opacity = '1';
        div.style.transform = 'translateY(0)';
        outputElement.scrollTop = outputElement.scrollHeight;
    }, 10);
}

function showLoading() {
    terminalElement.classList.add('loading');
}

function hideLoading() {
    terminalElement.classList.remove('loading');
}

inputElement.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const cmd = inputElement.value.trim().toLowerCase();
        if (!cmd) return;
        
        addOutput(inputElement.value, true);
        commandHistory.push(cmd);
        historyIndex = commandHistory.length;
        
        if (currentState === 'DEFAULT') {
            if (commands[cmd]) {
                commands[cmd].action();
            } else {
                addOutput(`Command not found: ${cmd}. Type 'help' for available commands.`);
            }
        } else if (currentState === 'RESUME_PROMPT') {
            handleResumePrompt(cmd);
        }
        
        inputElement.value = '';
    } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            inputElement.value = commandHistory[historyIndex];
        }
    } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            inputElement.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            inputElement.value = '';
        }
    }
});

function handleResumePrompt(cmd) {
    switch (cmd) {
        case 'y':
            currentState = 'DEFAULT';
            showLoading();
            addOutput('Downloading resume...');
            setTimeout(() => {
                downloadResume();
                hideLoading();
            }, 1000);
            break;
        case 'n':
            currentState = 'DEFAULT';
            addOutput('Resume download cancelled.');
            break;
        default:
            addOutput("Please respond with 'y' or 'n'.");
            break;
    }
}

function displayHelp() {
    addOutput('\nAvailable commands:');
    Object.entries(commands).forEach(([cmd, info]) => {
        addOutput(`  ${cmd.padEnd(10)} - ${info.description}`);
    });
    addOutput('\nUse arrow keys ↑↓ to navigate command history\n');
}

function displayAbout() {
    const aboutText = `
I'm a passionate software developer with expertise in full-stack development,
machine learning, and system architecture. I love building efficient and 
scalable solutions to complex problems.

Skills:
• Languages: Python, JavaScript, Java, C++
• Frameworks: React, Node.js, Django, TensorFlow
• Tools: Git, Docker, AWS, Linux
`;
    typeMessage(aboutText);
}

function displayProjects() {
    const projects = `
Featured Projects:
1. Project Name 1
   - Description of the project
   - Technologies used
   - Link to demo/repository

2. Project Name 2
   - Description of the project
   - Technologies used
   - Link to demo/repository
`;
    typeMessage(projects);
}

function displayContact() {
    addOutput(`
Contact Information:
• Email: your.email@example.com
• LinkedIn: linkedin.com/in/yourprofile
• GitHub: github.com/porterfurlongku
`);
}

function downloadResume() {
    window.location.href = "downloadables/resume_Porter_Furlong_2024_Winter.pdf";
}

function clearTerminal() {
    outputElement.innerHTML = '';
    typeMessage(welcomeMessage);
}

// Prevent losing focus from input
document.addEventListener('click', () => inputElement.focus());
inputElement.addEventListener('blur', () => setTimeout(() => inputElement.focus(), 10));

