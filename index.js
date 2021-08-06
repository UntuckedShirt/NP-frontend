console.log("test")
{
/* <form>
<label>NeutralPunch</label>
<input type="text" />
<button type="submit">Add Game</button> */
}
//knows what request is always being sent too
const baseUrl = "http://127.0.0.1:3000"


const formContainer = document.querySelector(".game-container");
//call formContainer becuase it gamecontainer has be queried
const createGameButton = formContainer.querySelector(".create-game")
;

const currentGames = document.querySelector(".current-games");

const pipelineGames = document.querySelector(".pipeline-games");

//this is a comment block
/**=======================create game file=================================*/

const createForm = () => {
    const gameForm = document.createElement("form");
    const gameNameLabel = document.createElement("label");
    const gameNameInput = document.createElement("input");
    const gameSubmitButton = document.createElement("button");

    gameNameLabel.innerHTML = "<h4>Game Name:</h4>";
    gameSubmitButton.innerText = "submit";

    //way to attach a class to a document element
    gameNameInput.setAttribute("name", "gameName")
    gameSubmitButton.setAttribute("class", "form-submit")

    gameForm.append(gameNameLabel, gameNameInput,
    gameSubmitButton);

    formContainer.append(gameForm);

    createGameButton.removeEventListener("click", createForm);

    //gameSubmitButton.addEventListener("click", saveGame);

    gameForm.addEventListener("submit", saveGame);
    };
    //const formSubmit = document.querySelector(".form-submit");


createGameButton.addEventListener("click", createForm);


const gameTemplate = (data) => {
    const template = `<p>${data}</p>`;

    currentGames.innerHTML += template;
};

const saveGame = (event) => {
    event.preventDefault();
    let formData = event.target.gameName.value;
    gameTemplate(formData);
    event.target.gameName.value = "";
};


/**============================================================ */

const getAllGame = () => {
    fetch(`${baseUrl}/games`)
    .then((resp) => resp.json())  
    .then((games) => {
        if (games.length > 0) {
        renderGames(games);
        } else {
            console.log('no games')
        }
    }).catch((err) => {
        console.log(err)
    });
};



getAllGame();

/*<h4>Creator</h4>
<p>Publish_Date</p>
<p>Publisher</p>
<p>Player_Count</p>
<span>Title by Creator</span>*/

const renderGames = (games) => {
    games.forEach((game, idx) => {
        const {creator_id, publish_date, publisher, player_count, title, creator} = game
        const template = `
        <h4 class = '${idx}'> ${creator_id}</h4>
        <span>${title} by ${creator}</span>
        <p>${publish_date}</p>
        <p>${publisher}</p>
        <p>${player_count}</p>
        `;
        pipelineGames.innerHTML += template;
    });   
};

const postGame = () => {
    fetch(`${baseUrl}/games`)
    .then((resp) => resp.json())  
    .then((games) => {
        if (games.length > 0) {
        renderGames(games);
        } else {
            console.log('no games')
        }
    }).catch((err) => {
        console.log(err)
    });

}
