export default class InputHandler{
    constructor(game){
        this.game = game;
        window.addEventListener('keydown', e => {
            if(( (e.key === 'ArrowRight') ||
                (e.key === 'ArrowLeft') ||
                (e.key === 'ArrowUp') ||
                (e.key == 'Accept')
                
             ) && this.game.keys.indexOf(e.key) === -1){
                this.game.keys.push(e.key)
            }


        })
        window.addEventListener('keyup', e => {
            if(this.game.keys.indexOf(e.key) > -1){
                this.game.keys.splice(this.game.keys.indexOf(e.key), 1)
            }

        })
    }

    
}