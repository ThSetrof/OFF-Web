import InputHandler from "./input.js"
import Player from "./player.js"
import Animation from "./animation.js"

export default class Game{

    constructor(width, height, context){
        this.width = width
        this.height = height
        this.context = context
        
        this.player = new Player({x: 500, y: 50}, {x: 0, y: 0}, {width:400, height:400}, this, this.context, './assets/player')
        this.spritesLocation = this.player.spritesLocation
        this.player.animations = this.#setPlayerAnimations()

        this.input = new InputHandler(this)
        this.keys = []



        this.ground = 650

    }

    #draw(){
        this.context.fillRect(0, 0, this.width, this.height)
        this.context.save()
        this.context.strokeStyle = 'white'
        this.context.lineWidth = 5
        this.context.beginPath()
        this.context.moveTo(0, this.ground)
        this.context.lineTo(this.width, this.ground)
        this.context.stroke()
        this.context.restore()
    }

    update(){

        this.#draw()
        this.player.update()
    }

    #setPlayerAnimations(){
        let animations = {
            idle: new Animation('idle', this.spritesLocation, 1 , 1, this.player, this.context),
            walk: new Animation('walk', this.spritesLocation, 8, 5, this.player, this.context),
            jump: new Animation('jump', this.spritesLocation, 2, 5, this.player, this.context, false),
            attack: new Animation('attack', this.spritesLocation, 4, 5 , this.player, this.context),
            listen: new Animation('listen', this.spritesLocation, 1, 1, this.player, this.context),
            fall: new Animation('fall', this.spritesLocation, 1, 1, this.player, this.context),
        }

        return animations
    }


}