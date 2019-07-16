import React, { Component } from 'react'

export default class PetitionContainer extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        Petition id: {this.props.match.params.petitionId}
      </div>
    )
  }
}
