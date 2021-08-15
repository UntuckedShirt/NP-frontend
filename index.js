console.log("test")

/* <form>
<label>NeutralPunch</label>
<input type="text" />
<button type="submit">Add Game</button> */

//knows what request is always being sent too
const baseUrl = "http://127.0.0.1:3000"


const formContainer = document.querySelector(".game-container");
//call formContainer becuase it gamecontainer has be queried
const createGameButton = formContainer.querySelector(".create-game");

const currentGames = document.querySelector(".current-games");

const pipelineGames = document.querySelector(".pipeline-games");

const searchBar = document.querySelector(".search")


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


document.getElementById("new-game-form").addEventListener("submit", GameApi.create);


const gameTemplate = (data) => {
    const template = `<p>${data}</p>`;

    currentGames.innerHTML += template;
};

const saveGame = (event) => {
    event.preventDefault();
    let formData = event.target.gameName.value;
    gameTemplate(formData);
    event.target.gameName.value = "";
    postGame(formData)
};

const allGames = [];

/**============================================================ */

const getAllGame = () => {
    fetch(`${baseUrl}/games`)
    .then((resp) => resp.json())  
    .then((games) => {
        if (games.length > 0) {
            games.map((game) => new Game(game));
            renderGames(games);
            
           
        } else {
            console.log('no games');
        }
    })
    .catch((err) => {
        console.log(err)
    });
};



getAllGame();

/*<h4>Creator</h4>
<p>Publish_Date</p>
<p>Publisher</p>
<p>Player_Count</p>
<span>Title by Creator</span>*/
// {
//     "creator_id": 1,
//     "title": "GuiltyGear",
//     "publisher": "ArcSystems",
//     "publish_date": "May 14, 1998‎ - Present",
//     "player_count": 16040,
//     "creator": {
//          "creator_id": 1,
//          "creator_name": "Daisuke Ishiwatari"
//     }
//     },
const renderGames = (games) => {
    pipelineGames.innerHTML = "";
 
    games.forEach((game, idx) => {
        const {creator_id, publish_date, publisher, player_count, title, creator, id} = game
   
        const template = `
        <div id="game-${id}"> 
            <h4 class = '${idx}'> ${creator.creator_name}</h4>
            <span>${title} by ${creator.creator_name}</span>
            <p>${publish_date}</p>
            <p>${publisher}</p>
            <p>${player_count}</p>
            <button data-game-id="${id}" class="delete-game-button"> Delete Game </button>
        </div>`;

        pipelineGames.innerHTML += template;
        document.querySelector(`#game-${id} .delete-game-button`).addEventListener("click", GameApi.delete)
        // const games = document.getElementById("creator-id");
        // game.parentNode.removeChild(games);
        
        
        
    });   
};
//when creating RestRouting we using index and send as a POST
const postGame = (data) => {
    const jsonToSend = {
        game: {
            title: data,
        },
    }
    const configObj = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            "Content-Type": "application/json",
//stringfy is how JSON is ran 
        },
        body: JSON.stringify(jsonToSend),

    };
    fetch(`${baseUrl}/games`, configObj)
    .then((data) =>{
        return data.json();
        //console.log(data)
    })
    .then((newGame) => {
        console.log(newGame);
    });
};

const findResults = (e) => {
    const term = e.target.value.toLowerCase();
    const games = Game.allGames.filter((game) => {
    //    if(game.title != null) {     
        return game.creator.creator_name.toLowerCase().includes(term) || game.title.toLowerCase().includes(term);
       
    //    }
    });

   renderGames(games);
};

searchBar.addEventListener("keyup", findResults);

console.log(allGames)

