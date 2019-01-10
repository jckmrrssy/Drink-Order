import React, { Component } from "react";
import DrinkFormHC from "./DrinkFormHC.js";
import API from "../../utils/API";
import NavTabs from "../../NavTabs/NavTabs";

class AddDrinkHC2 extends Component {
  state = {
    name: "",
    liq1: "",
    lv1: "",
    liq2: "",
    lv2: "",
    liq3: "",
    lv3: "",
    liq4: "",
    lv4: "",
    liq5: "",
    lv5: "",
    Mix1:"",
    Mlv1:"",
    Mix2:"",
    Mlv2:"",
    Glass:"",
    Garnish:"",
    Instructions:""
    
  };

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
    API.saveDrink({
      name:          this.state.name,
      liq1:          this.state.liq1,
      lv1:           this.state.lv1,
      liq2:          this.state.liq2,
      lv2:           this.state.lv2,
      liq3:          this.state.liq3,
      lv3:           this.state.lv3,
      liq4:          this.state.liq4,
      lv4:           this.state.lv4,
      liq5:          this.state.liq5,
      lv5:           this.state.lv5,
      Mix1:          this.state.Mix1,
      Mlv1:          this.state.Mlv1,
      Mix2:          this.state.Mix2,
      Mlv2:          this.state.Mlv2,
      Glass:         this.state.Glass,
      Garnish:       this.state.Garnish,      
      Instructions:  this.state.Instructions
    })
      .catch(err => console.log(err));
    this.setState({ 
        name: "", 
        liq1: "",
        lv1: "",
        liq2: "",
        lv2: "",
        liq3: "",
        lv3: "",
        liq4: "",
        lv4: "",
        liq5: "",
        lv5: "",
        Mix1:"",
        Mlv1:"",
        Mix2:"",
        Mlv2:"",
        Glass:"",
        Garnish:"",
        Instructions:"" })
  };

  render() {

    const { isAuthenticated } = this.props.auth;

    return (

      <div>
        <NavTabs {...this.props} />
      {
        isAuthenticated() && (
        <div>
          <DrinkFormHC
            name={this.state.name}
            liq1={this.state.liq1}
            lv1={this.state.lv1}
            liq2={this.state.liq2}
            lv2={this.state.lv2}
            liq3={this.state.liq3}
            lv3={this.state.lv3}
            liq4={this.state.liq4}
            lv4={this.state.lv4}
            liq5={this.state.liq5}
            lv5={this.state.lv5}
            Mix1={this.state.Mix1}
            Mlv1={this.state.Mlv1}
            Mix2={this.state.Mix2}
            Mlv2={this.state.Mlv2}
            Glass={this.state.Glass}
            Garnish={this.state.Garnish}      
            Instructions={this.state.Instructions}
            handleSaveLiquor={this.handleSaveLiquor}
            handleInputChange={this.handleInputChange}
          />
        </div>
        )  
      }
      </div>
    )
  }
};

export default AddDrinkHC2;