import Game from "./scr/game.js"

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const CANVAS_WIDTH = canvas.width = 1280  
const CANVAS_HEIGHT = canvas.height = 720


const game = new Game(CANVAS_WIDTH, CANVAS_HEIGHT, ctx)

// const image = new Image()
// image.src = './assets/player/idle/1.png'
// image.onload = () => ctx.drawImage(image, 0, 0, 512, 512)
// console.log(image.src)

let lastTime = 0


function process(timePassed){
    const deltaTime = timePassed - lastTime
    lastTime = timePassed
    clearCanvas()
    game.update()
    requestAnimationFrame(process)
}

function clearCanvas(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
}

export function imageLoader(fileLocation){
    const image = new Image()
    image.src = fileLocation
    return image
}

process(0)