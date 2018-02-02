import React from 'react';
import {Grid, Button, Container, Label} from 'semantic-ui-react'

class Board extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      board: [[1,2,3,4,5,6,7],
              [1,2,3,4,5,6,7],
              [1,2,3,4,5,6,7],
              [1,2,3,4,5,6,7],
              [1,2,3,4,5,6,7],
              [1,2,3,4,5,6,7]
      ]
    }
  }

  mapBoardToGrid = () => {
    return this.state.board.map(array => {
      return (
        <Grid.Row  textAlign='center' columns={7}>
          {array.map(number => {
            return (<Grid.Column textAlign='center' centered inverted>
            {<Label size='massive' circular id={number}/>}
            </Grid.Column>)
          })  }
        </Grid.Row>
      )
    })
  }

  render(){
    return (
      <div>
      <Container/>
      <Container text>
      <Grid celled centered fluid inverted>
      {this.mapBoardToGrid()}
      </Grid>
      </Container>
      </div>
    )
  }
}

export default Board
