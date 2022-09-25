class Jogo{
    #board = [1,2,3,4,5,6,7,8,9]
    turn = []

    constructor(startOption) {
        this.solution = [
            [1,2,3],
            [4,5,6],
            [7,8,9],
            [1,4,7],
            [2,5,8],
            [3,6,9],
            [1,5,9],
            [3,5,7]
        ]
        this.p1_arr = []
        this.p2_arr = []
        startOption === 'x' ? this.turn = this.p1_arr : this.turn = this.p2_arr
    }

    hiddenButtons(btnVisibility){
        document.getElementsByName('startButton').forEach(item => item.hidden = btnVisibility)
    }

    hiddenBoard(boardVisibility){
        document.getElementById('board').hidden = boardVisibility
    }

    toggleTurn(){
        this.turn === this.p1_arr ? this.turn = this.p2_arr : this.turn = this.p1_arr
    }

    start() {
        this.hiddenButtons(true)
        this.hiddenBoard(false)
    }

    makePlay(position) {
        //draw
        console.log(position)
        
        this.drawPlay(position)
        
        this.turn.push(parseInt(position))
        console.log(this.turn)
        this.checkWinner()
        this.toggleTurn()
    }

    drawPlay(position){
        const player = this.turn === this.p1_arr ? 'close' : 'circle'
        
        let box = document.getElementById(`${position}`)
        box.innerHTML = this.draw(player)
        box.onclick = ""
    }

    draw(player){
        return `<span class=" material-icons-outlined icons">
        ${player}
      </span>`
    }
    
    checkWinner() {
        outer:
        for(let sol_arr of this.solution){
            for(let item of sol_arr){
                if(!this.turn.includes(item)) continue outer
            }
            this.endGame()
        }
    }

    clearBoxes(){
        document.getElementsByName('boardBox').forEach(box => {
            box.innerHTML = ''
        })
        
    }

    endGame() {
        this.hiddenBoard(true)
        this.clearBoxes()
        
        let winner = this.turn === this.p1_arr ? 'Player 1' : 'Player 2'

        document.getElementById('messages').innerHTML = `Parabéns, ${winner} venceu! `
        document.getElementById('restartBtn').hidden = false
    }

    restartGame(){
        this.p1_arr = []
        this.p2_arr = []
        this.turn = []

        document.getElementsByName('boardBox').forEach(box => box.onclick = () => playit(box.id))
      

        document.getElementById('restartBtn').hidden = true
        document.getElementById('messages').innerHTML = 'Quem começa jogando?'
        this.hiddenButtons(false)
    }
}

let gameInstance 

const iniciar = (startOption) => {
    gameInstance = new Jogo(startOption)
    gameInstance.start()
}

const playit = (id) => {
    gameInstance.makePlay(id)
}

const restartGame = () => {
    gameInstance.restartGame()
}