class Sprite{
    constructor(file, width, height, scale, context){
        this.texture = new Image()
        this.texture.src = file
        this.width = width
        this.height = height
        this.scale = scale

        this.scaledHeight = this.height * this.scale
        this.scaledWidth = this.width * this.scale
        this.context = context
        this.updateFrame( 0, 0 )
    }

    updateFrame(x , y){
        this.frameX = x * this.width
        this.frameY = y * this.height
    }


    draw(){
        this.context.drawImage( this.texture, this.frameX , this.frameY,
                                this.width, this.height, 0, 0,this.scaledWidth, this.scaledHeight )
    }
}