import React from 'react';
import {Grid, Container, Label, Message} from 'semantic-ui-react'


class Board extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      playerOne: true,
      playerTwo: false,
      board: [[36,37,38,39,40,41,42],
              [29,30,31,32,33,34,35],
              [22,23,24,25,26,27,28],
              [15,16,17,18,19,20,21],
              [8,9,10,11,12,13,14],
              [1,2,3,4,5,6,7]
      ]
    }
  }



  markPlayer = (a, event) => {
    let board = this.state.board.slice()
    for (let i=0; i < board.length; i++) {
      for (let j =0; j < board[i].length; j++) {
        if (board[i][j] === Number(event.target.id)) {
          board[i][j] = a
        }
      }
    }
    this.setState({board: board})
  }

  changeColor = (event) => {

    if (this.state.playerOne) {
      event.target.className= 'ui blue massive circular label'
      this.setState({playerOne: false, playerTwo: true})
      this.markPlayer("Z", event)
    } else {
      event.target.className= 'ui red massive circular label'
      this.setState({playerOne: true, playerTwo: false})
      this.markPlayer("Y", event)
    }
  }

  mapBoardToGrid = () => {
    return this.state.board.map(array => {
      return (
        <Grid.Row  key={array[0]} textAlign='center' columns={7}>
          {array.map(number => {
            return (<Grid.Column key={number} textAlign='center'>
            {<Label size='massive' onClick={this.changeColor} key={number} color='grey' circular id={number}/>}
            </Grid.Column>)
          })  }
        </Grid.Row>
      )
    })
  }

  whoseTurnOrDidSomeoneWin = () => {
    if (this.state.playerOne) {
      return <Message content='Player Ones turn'/>
    } else if (this.state.playerTwo) {
      return <Message content='Player Twos turn'/>
    }
  }

  render(){
    return (
      <div>
      <Container/>
      <Container text>
      {this.whoseTurnOrDidSomeoneWin()}
      <Grid celled>
      {this.mapBoardToGrid()}
      </Grid>
      </Container>
      </div>
    )
  }
}

export default Board
