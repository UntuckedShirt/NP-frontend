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
                creator_id: "2",
                creator_attributes: {
                name: form.querySelector("#creator-name").value
                }
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
    // static update(e){
    //     debugger
    //     const configObj = {
    //         method: 'PUT',
    //         mode: 'cors',
    //         cache: 'no-cache',
    //         headers: {
    //             "Content-Type": "application/json",
    // //stringfy is how JSON is ran 
    //         },
    //         body: JSON.stringify(data),
    
    //     };
    //     fetch(`${baseUrl}/games`, configObj)
    //     .then((data) =>{
    //         return data.json();
    //         //console.log(data)
    //     })
    //     .then((newGame) => {
    //         new Game(newGame)
    //         renderGames(Game.update);
    //     });
    // }

    static delete(e){
        debugger
        const gameId = e.target.dataset.gameId
        document.querySelector(`#game-${gameId}`).remove()
        fetch(`${baseUrl}/games/${gameId}`, {
            method: 'DELETE'
        })
    }
    

    
}