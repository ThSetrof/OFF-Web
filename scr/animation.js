import { imageLoader } from "../index.js"

export default class Animation{
    constructor(name, folder, frames, frames_per_sec, player, context, loop = true){
        
        this.name = name
        this.folderPath = folder + '/' + name +'/'
        this.frames = frames
        this.sprites = []
        this.frames_per_sec = frames_per_sec
        this.#loadSprites()
        this.loop = loop

        this.frame
        this.isStoped = false

        this.context = context
        this.frameCounter = 0
        this.player = player


    }

    stop(){
        this.isStoped = true
    }

    async #loadSprites(){
        const promises = []

        for(let i = 1; i <= this.frames; i++){

            promises.push(new Promise(resolve =>  {
                const image = imageLoader(this.folderPath + i + '.png')
                image.onload = function(){
                    resolve()
                }
                this.sprites.push(image)

            }))

            
        }
        await Promise.all(promises)
        return true
   
    }

    getSprite(index){
        if(index < 0 || index > this.frames) return 
        return this.sprites[index]
    }


    play(){
        if(this.isStoped){
            return
        }

        // console.log(this.currentAnimation.frames, this.frame)

        if(!this.loop && this.frames - 1 == this.frame){

            return 
        }

        this.frame = Math.floor(this.frameCounter / this.frames_per_sec) % this.frames
        
        this.frameCounter++
    }



    reset(){
        this.frame = 0
        this.frameCounter = 0
    }

    #draw(){
        if(this.player.flip_h){
            this.context.save()
            this.context.translate(this.player.position.x  + this.player.size.width , this.player.position.y)
            this.context.scale(-1, 1)
            this.context.drawImage(this.getSprite(this.frame), 0  , 0, this.player.size.width, this.player.size.height)
            this.context.restore()
        }else{
            this.context.drawImage(this.getSprite(this.frame), this.player.position.x, this.player.position.y, this.player.size.width, this.player.size.height)

        }
    }

    update(){
        this.#draw()
    }
}