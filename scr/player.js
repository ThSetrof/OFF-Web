import Animation from "./animation.js"


export default class Player{

    #isOnGround = false
    constructor(position, velocity, size, game, context, spritesLocation){
        this.context = context
        this.spritesLocation = spritesLocation



        this.game = game
        this.size = size

        this.position = position
        this.velocity = velocity

        this.isMovingLeft = false
        this.isMovingRight = false
        this.isJump = false
        this.walkSpeed = 6

        this.jumpForce = -20

        this.gravity = 1
        this.flip_h = false 
        this.#updateHitBox()
        this.showHitBox = false

        this.animations = {}
        this.currentAnimation = null


    }

    update(){


        this.#updateHitBox()
        this.#draw()
        this.#input()

        this.#applyGravity()



        if(this.#isOnGround && this.isJump){

            this.velocity.y = this.jumpForce
            this.currentAnimation.reset()
        }
        else if(this.isMovingLeft ){
            this.velocity.x = -this.walkSpeed
            if(this.#isOnGround)
                this.#changeAnimation(this.animations.walk)
            this.flip_h = true
        }
        else if(this.isMovingRight){
            this.velocity.x = this.walkSpeed
            if(this.#isOnGround)
                this.#changeAnimation(this.animations.walk)
            this.flip_h = false
        
        }else{
            if(this.#isOnGround){
                this.#changeAnimation(this.animations.idle)
            }
                
            this.velocity.x = 0
        }

        if (this.velocity.y < 0 && !this.#isOnGround){
            this.#changeAnimation(this.animations.jump)

        }
        if(this.velocity.y >= 0 && !this.#isOnGround){



            this.#changeAnimation(this.animations.fall)

        }

        this.currentAnimation.play()
        

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

    }

    #applyGravity(){
        this.#isOnGround = (this.hitBox.y + this.hitBox.h >= this.game.ground)

        if(this.#isOnGround){

            this.velocity.y = 0

        }else{
            this.velocity.y += this.gravity
        }
    }

    #draw(){

        if (this.currentAnimation != null){
            this.currentAnimation.update()
        }

        this.#drawHitbox()
       
    }


    #drawHitbox(){
        if (this.showHitBox){
            this.context.save()
            this.context.lineWidth = 5
            this.context.strokeStyle = 'white'
    
            this.context.strokeRect(this.hitBox.x ,this.hitBox.y,this.hitBox.w,  this.hitBox.h)

            this.context.restore()

        }
    }

    #input(){
        this.isMovingLeft = this.game.keys.includes('ArrowLeft')
        this.isMovingRight = this.game.keys.includes('ArrowRight')
        this.isJump = this.game.keys.includes("ArrowUp")



    }

    #updateHitBox(){
        this.hitBox = {x: this.position.x + 130, y: this.position.y + 60,  w :this.size.width - 250,  h: this.size.height - 120}
    }


    #changeAnimation(animation){

        if (animation != this.currentAnimation){
            animation.reset()
            this.currentAnimation = animation

        }

    }




}