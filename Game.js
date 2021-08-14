// function Game(attrs) {


// }
//Game.prototype.all = [];
//const allGames2 = [];

class Game {
    static allGames = [];
    //allGames = [];
    constructor(attrs) {
        

        //title, publisher, publish_date, player_count, creator
        // const keys = Object.keys(attrs)
        // const values = Object.values(attrs)
        // keys.forEach((key, idx) => {
        //     key = values[idx];
        // })
        // debugger
        (this.title = attrs.title),
        (this.publisher = attrs.publisher),
        (this.publish_date = attrs.publish_date),
        (this.player_count = attrs.player_count),
        (this.creator = attrs.creator);
    Game.allGames.push(this);
    }

    static all = () => {
        return Game.allGames;

    };
    //access creator in here
}

        // class Creator extends Game {
        //     static allCreators = {};
        //     constructor(title, id, creatorThing) {
        //         //super(title, id);
        //         this.creatorThing = creatorThing;
        //         creator.allCreators[this.id] = this
        //     }
        //     static all = () => {
        //         return creator.allCreators;
        //     };
        // }


