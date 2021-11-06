// const printProfileData = profileDataArr => {
//     for (let i = 0; i < profileDataArr.length; i+=1) {
//         console.log(profileDataArr[i]);
        
//     }
//     console.log('================');
    

// profileDataArr.forEach(profileItem => 
//     console.log(profileItem))

// };
// printProfileData(profileDataArgs);




const inquirer = require ('inquirer');
const fs = require('fs');
const generatePage = require('./src/page-template.js');
// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err =>{
//     if(err) throw err;
//     console.log("Portfolio complete! check out index.html to see the output!")
// });

const promptUser = () =>{
return inquirer.prompt([
        {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
        validate: nameInput =>{
            if (nameInput){
                return true;
            } else {
                console.log('Please enter your name!');
                return false;
            }
        }
    },
        {
        type: 'input',
        name: 'github',
        message: 'Enter your Github Username',
        validate: githubNameInput =>{
            if (githubNameInput){
                return true;
            } else {
                console.log('Please enter your github!');
                return false;
            }
        }    
    },
    {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "About" section?',
        default: true
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        when: ({ confirmAbout }) => {
          if (confirmAbout) {
            return true;
          } else {
            return false;
          }
        }
      },  
    //     {
    //     type: 'input',
    //     name: 'about',
    //     message: 'Provie some info about yourself:'
    // }
]);
};


const promptProject = portfolioData => {
    console.log(`
  =================
  Add a New Project
  =================
  `);
//   portfolioData.projects = [];
if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project?'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: descriptionInput =>{
            if (descriptionInput){
                return true;
            } else {
                console.log('Please enter the description!');
                return false;
            }
        }   
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: linkInput =>{
            if (linkInput){
                return true;
            } else {
                console.log('Please enter the github link!');
                return false;
            }
        }   
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }

              
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if(projectData.confirmAddProject){
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
   
  });
}
//   promptUser().then(answers => console.log(answers))
//             .then(promptProject)
//             .then(projectAnswers => console.log(projectAnswers))
//             .then(projectData => {
//                 portfolioData.projects.push(projectData);
//                 if(projectData.confirmAddProject){
//                     return promptProject(portfolioData);
//                 } else {
//                     return portfolioData;
//                 }
//               });
promptUser()
  .then(promptProject)
  .then(portfolioData => {
      const pageHTML = generatePage(portfolioData);

fs.writeFile('./index.html', pageHTML, err =>{
    if(err) throw err;
    console.log("Portfolio complete! check out index.html to see the output!")
});
  });