class GameApi {
    static create(e){
        e.preventDefault()
        const form = e.target
        const data = {
            game: {
                title: form.querySelector("#title").value,
                player_count: form.querySelector("#player-count").value,
                publish_date: form.querySelector("#publish-date").value,
                publisher: form.querySelector("#publisher").value,
                creator_id: "2"
            }

        }
        form.reset();
        
        const configObj = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json",
    //stringfy is how JSON is ran 
            },
            body: JSON.stringify(data),
    
        };
        fetch(`${baseUrl}/games`, configObj)
        .then((data) =>{
            return data.json();
            //console.log(data)
        })
        .then((newGame) => {
            new Game(newGame)
            renderGames(Game.allGames);
        });

    }

}