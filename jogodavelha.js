const prompt = require('prompt-sync')();

class Jogo{
    
    
    #board = [1,2,3,4,5,6,7,8,9]

    constructor() {
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
    }

    iniciar = () => {
        this.p1 = prompt('Informe o p1: ')
        this.p2 = prompt('Informe o p2: ')
        let p_arr
        this.vez = 0
        
        while(true){
            this.printBoard()

            let play = Number.parseInt(prompt(`Jogada de ${(this.vez === 0) ? this.p1 : this.p2}:`))
            
            if(!this.#board.includes(play)){
                console.log("\nNúmero inválido! Tente novamente.")
                continue
            }
            
            
            p_arr = (this.vez === 0) ? this.p1_arr : this.p2_arr
            
            this.makePlay(p_arr, play)

            if(this.verify(p_arr)) break
        }

        this.printBoard()
        console.log(`\n${this.vez === 0 ? this.p1 : this.p2} Venceu!`)
    }

  

    makePlay(p_arr, play){

        p_arr.push(play)
        
        this.#board[play-1] = (this.vez === 0) ? 'X' : 'O'

        this.vez = (this.vez === 0) ? 1 : 0
        console.log(this.vez)
    }

    printBoard(){
        console.log(
                    `\nEscolha uma casa(número) para jogar
        |${this.#board[0]}|   |${this.#board[1]}|   |${this.#board[2]}|
        |${this.#board[3]}|   |${this.#board[4]}|   |${this.#board[5]}|
        |${this.#board[6]}|   |${this.#board[7]}|   |${this.#board[8]}|`
        )

        console.log('P1: ' + this.p1_arr)
        console.log('P2: ' + this.p2_arr)
    }

    verify(player){
        outer:
        for(let sol_arr of this.solution){
            for(let item of sol_arr){
                console.log(player)
                if(!player.includes(item)) continue outer
                console.log('Passou')
            }
            return true
        }

        return false
    }
}

const jogo = new Jogo()
jogo.iniciar()