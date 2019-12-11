const axios = require("axios");
const inquirer = require("inquirer");

getProfile();

async function getProfile() {
  try {
    const { profile } = await inquirer.prompt({
      message: "What's your GitHub username?",
      name: "username"
    });

    const { data } = await axios.get(
      `https://api.github.com`
    );

    console.log(data);
  
  } catch (err) {
    console.log(err);
  }
}