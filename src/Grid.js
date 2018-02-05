import React from 'react';
import {Grid, Container, Label, Message} from 'semantic-ui-react'


class Board extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      playerOne: true,
      playerTwo: false,
      someoneWon: false,
      board: [[36,37,38,39,40,41,42],
              [29,30,31,32,33,34,35],
              [22,23,24,25,26,27,28],
              [15,16,17,18,19,20,21],
              [8,9,10,11,12,13,14],
              [1,2,3,4,5,6,7]
      ],
      winningBoard: [[36,37,38,39,40,41,42],
              [29,30,31,32,33,34,35],
              [22,23,24,25,26,27,28],
              [15,16,17,18,19,20,21],
              [8,9,10,11,12,13,14],
              [1,2,3,4,5,6,7]
      ]
    }
  }


  markPlayer = (a, number) => {
    let board = this.state.winningBoard.slice()
    for (let i=0; i < board.length; i++) {
      for (let j =0; j < board[i].length; j++) {
        if (board[i][j] === Number(number)) {
          board[i][j] = a
        }
      }
    }
    this.setState({winningBoard: board})
  }

  checkPattern = (a,b,c,d) => {
    if ((a === "Z"||a==="Y") && a===b && a===c && a===d) {
      this.setState({someoneWon: true})
    }
  }

  checkWinningCombos = () => {
    let board = this.state.winningBoard.slice()

    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 7; column++) {
        this.checkPattern(board[row][column], board[row+1][column], board[row+2][column], board[row+3][column])
      }
    }

    for (let row = 0; row < 6; row++) {
      for (let column = 0; column < 4; column++) {
        this.checkPattern(board[row][column], board[row][column+1], board[row][column+2], board[row][column+3])
      }
    }

    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 4; column++) {
        this.checkPattern(board[row][column], board[row+1][column+1], board[row+2][column+2], board[row+3][column+3])
      }
    }

    for (let row = 3; row < 6; row++) {
      for (let column = 0; column < 4; column++) {
        this.checkPattern(board[row][column], board[row-1][column+1], board[row-2][column+2], board[row-3][column+3])
      }
    }
  }

  changeColor = (event) => {
    if (this.state.playerOne) {
      this.markPlayer("Z", event.target.id)
      event.target.className= 'ui yellow massive circular label'
      this.checkWinningCombos()
    } else {
      this.markPlayer("Y", event.target.id)
      event.target.className= 'ui red massive circular label'
      this.checkWinningCombos()
    }

    this.setState({playerOne: !this.state.playerOne, playerTwo: !this.state.playerTwo})
  }

  mapBoardToGrid = () => {
    return this.state.board.map(array => {
      return (
        <Grid.Row inverted color='blue' textAlign='center' key={array[0]} columns={7}>
          {array.map(number => {
            return (<Grid.Column inverted key={number} textAlign='center'>
            {<Label size='massive' onClick={this.changeColor} key={number} color='white' circular id={number}/>}
            </Grid.Column>)
          })  }
        </Grid.Row>
      )
    })
  }

  whoseTurnOrDidSomeoneWin = () => {
    if (!this.state.someoneWon) {
      if (this.state.playerOne) {
        return <Message content='Player Ones turn'/>
      } else if (this.state.playerTwo) {
        return <Message content='Player Twos turn'/>
      }
    } else {
      if (this.state.playerOne) {
        return <Message content='Player Two Won'/>
      } else {
        return <Message content='Player One Won'/>
      }
    }
  }

  render(){
    console.log(this.state.winningBoard, this.state.someoneWon)
    return (
      <div>
      <Container/>
      <Container text>
      {this.whoseTurnOrDidSomeoneWin()}
      <Grid inverted>
      {this.mapBoardToGrid()}
      </Grid>
      </Container>
      </div>
    )
  }
}

export default Board
