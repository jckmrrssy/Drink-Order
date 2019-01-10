import React, { Component } from "react";
import LiquorForm from "./LiquorForm.js";
import API from "../../utils/API";
import NavTabs from "../../components/NavTabs/NavTabs";
import AutoSelect from "../../utils/Select";
import Profile from "../../Profile/Profile";

class AddLiquor extends Component {
  state = {
    name: "",
    type: "",
    bottleVolume: "",
    bottleCost: "",
    userID: ""
  };

  goTo(route) {
    this.props.history.replace(`/${route}`)
}

  // Sets a new search state based on the user input
  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    });
  };

  // Grabs the user's liqour input from the state and saves it in the mongo database
  handleSaveLiquor = event => {
    event.preventDefault();
    console.log(this.props.auth.userProfile)
    API.saveLiquor({
      name: this.state.name,
      type: this.state.type,
      bottleVolume: this.state.bottleVolume,
      bottleCost: this.state.bottleCost,
      userID: this.props.auth.userProfile.nickname
    })
      .then(res => this.goTo('EditLiquor'))
      .catch(err => console.log(err));
    this.setState({ name: "", type: "", bottleVolume: "", bottleCost: "" })
    
  };

  getProfile = (profile) => {
    console.log("++++++++++++++++++",profile)
  }
  render() {

    const { isAuthenticated } = this.props.auth;


    return (

      <div>
        <NavTabs {...this.props} />
      {
        isAuthenticated() && (
        <div>
          
          <LiquorForm
            name={this.state.name}
            type={this.state.type}
            bottleVolume={this.state.bottleVolume}
            bottleCost={this.state.bottleCost}
            handleSaveLiquor={this.handleSaveLiquor}
            handleInputChange={this.handleInputChange}
            userID={this.state.userID}
          />
        </div>
        )  
      }
      { isAuthenticated() && (<Profile {...this.props} />) }
      </div>
    )
  }
};

export default AddLiquor;
