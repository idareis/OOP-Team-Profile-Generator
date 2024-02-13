const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


const teamMembers = [];

//Prompts for each employee
function promptManager() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Please enter the manager\'s name: ",
        },
        {
            type: "input",
            name: "id",
            message: "Please enter the manager\'s employee ID: ",
        },
        {
            type: "input",
            name: "email",
            message: "Please enter the manager\'s email address: ",
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Please enter the manager\'s office number: ",
        },
    ]).then((answers) => {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        teamMembers.push(manager);
        promptMenu();
    });
}

function promptEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Please enter the engineer\'s name: ",
        },
        {
            type: "input",
            name: "id",
            message: "Please enter the engineer\'s employee ID: ",
        },
        {
            type: "input",
            name: "email",
            message: "Please enter the engineer\'s email address: ",
        },
        {
            type: "input",
            name: "gitHub",
            message: "Please enter the engineer\'s Github: ",
        },
    ]).then((answers) => {
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        teamMembers.push(engineer);
        promptMenu();
    });
}

function promptIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Please enter the intern\'s name: ",
        },
        {
            type: "input",
            name: "id",
            message: "Please enter the intern\'s employee ID: ",
        },
        {
            type: "input",
            name: "email",
            message: "Please enter the intern\'s email address: ",
        },
        {
            type: "input",
            name: "school",
            message: "Please enter the intern\'s school: ",
        },
    ]).then((answers) => {
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        teamMembers.push(intern);
        promptMenu();
    });
}

//Function to prompt a menu with questions
function promptMenu() {
    inquirer.prompt([
        {
            type: "list",
            name: "menuChoice",
            message: "What would you like to do?",
            choices: ["Add an engineer", "Add an intern", "Finish building the team"],
        },
    ]).then((answers) => {
        switch (answers.menuChoice) {
            case "Add an engineer":
                promptEngineer();
                break;
            case "Add an intern":
                promptIntern();
                break;
            case "Finish building the team":
                generateHTML();
                break;
            default:
                //Will handle an unexpected choice
                break;
        }
    });
}

// Function to generate an HTML file with all the prompts
function generateHTML() {
    const html = render(teamMembers);
    fs.writeFileSync(outputPath, html);
    console.log(`Team HTML generated at ${outputPath}`);
}

promptManager();