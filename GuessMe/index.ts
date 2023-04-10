import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";

const sleep = (ms = 3000) => new Promise((res) => setTimeout(res, ms));

async function welcome(){
    console.log(figlet.textSync("Guess Me!"));

    let helloGlitch = chalkAnimation.pulse("Let us play a number-guessing game !");
    await sleep();
    helloGlitch.stop()
}

await welcome();

let playerLives = 3

async function askNumbers(){
    let randomNum = Math.floor(Math.random() * 10) + 1 ;
    do {
        playerLives-- ;
        var answers = await inquirer.prompt([
            {
                type: "number",
                name: "userNum",
                message: chalk.bgGray("Select a number between 1-10"),
                validate: (ans: number) => {
                    if(isNaN(ans)){
                        return chalk.red('Please enter a valid number !')
                    } else {
                        return true ;
                    }
                }
            }
        ]);
        if(answers.userNum === randomNum){
            console.log(chalk.bgGreenBright("Congratulations, you guessed a right number !"));
        } else if(answers.userNum > randomNum){
            console.log(chalk.bgRedBright(`Your guess ${answers.userNum} is higher than expected !`));
        } else if(answers.userNum < randomNum){
            console.log(chalk.bgRedBright(`Your guess ${answers.userNum} is smaller than expected !`));
        }
    } while (playerLives > 0 && answers.userNum !== randomNum);
    if(playerLives === 0){
        console.log(chalk.bgYellowBright("Game Over !"));
    }
}

async function restart(){
   do {
    console.clear() ;
    await welcome();
    playerLives = 3 ;
    await askNumbers();
    var startAgain = await inquirer.prompt([
        {
            type: "input",
            name: "playAgain",
            message: chalk.bgGray("Do you wanna play again ? Y/N :")
        }
    ])
   } while (startAgain.playAgain === "Y" || startAgain.playAgain === "y");
}

await restart();