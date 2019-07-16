import React, { Component } from 'react'
import axios from 'axios'

export default class PetitionsContainer extends Component {
  
  state = {
    page: 1,
    pageSize: 10,
    sortBy: "created_at",
    petitions: []
  }

  componentDidMount() {
    const {pageSize, sortBy} = this.state
    console.log('fetching trending petitions')
    axios.get(`http://localhost:3001/petitions?size=${pageSize}&sortBy=${sortBy}`)
    .then(res => this.setState({petitions: res.data.items}))
    .catch(err => console.log("Whoops, there was an error: " + err))
    }

  render() {
    console.log(this.state.petitions)
    const {petitions} = this.state    

    let petitionsList = (
      <ul>
        {petitions && petitions.map(petition => {
          return <li>{petition.display_title}</li>
        })}
      </ul>     
    )
                  

    return (
      <div>
        <h1>Petitions</h1>
        {petitions.length > 0 ? petitionsList : "loading"}
      </div>
    )
  }
}