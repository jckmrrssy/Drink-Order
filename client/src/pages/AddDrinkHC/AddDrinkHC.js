
import React, { Component } from "react";
// import DrinkFormHC from "./DrinkFormHC.js";
import API from "../../utils/API";
import NavTabs from "../../NavTabs/NavTabs";
import { Button, Input, Row } from 'react-materialize';

class AddDrinkHC extends Component {
  state = {
    content: '',
    allLiquors:[],
    allLiquors:[],
    allLiquors:[],
    Liquor1Vol:''
  };
  // When page is displayed, loadLiquor is called
  componentDidMount() {
    this.loadLiquor();
  }
  // Loads saved liquor from mongo database
  loadLiquor = () => {
    API.getLiquor()
    .then(res => {
        this.setState({ allLiquors: res.data});
    })
    .catch(err => console.log(err));
  };
  handleChange = (event) => {
      this.setState({
      content: event.target.value
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    API.saveDrink({
    Liquor1: this.state.Liquor,
    Liquor1Vol: this.state.text,
    })
    this.setState({
        content: ''
    })
  }
  

  render() {

    const { isAuthenticated } = this.props.auth;

    return (

      <div>
        <NavTabs {...this.props} />
      {
        isAuthenticated() && (
        <div>
          <form>
            <Row>
              <Input s={8} 
              type='select' 
              label="Liquor1" 
              defaultValue='2'>
              {this.state.allLiquors.map((Liquor, index) => (
                  <option value='1'>{Liquor.name}</option>
                ))}
              </Input>
              <Input s={4}
              name='LiquorVol1'
              type='text'
              lable='Liquor 1 Vol'
              className="form-control"
              onChange={this.handleChange}>
              
              </Input>
            </Row>
            <Row>
              <Input s={8} 
              type='select' 
              label="Liquor2" 
              defaultValue='2'>
              {this.state.allLiquors.map((Liquor, index) => (
                  <option value='1'>{Liquor.name}</option>
                ))}
              </Input>
              <Input s={4}
              name='LiquorVol2'
              type='text'
              lable='Liquor 2 Vol'
              className="form-control"
              onChange={this.handleChange}>
              
              </Input>
            </Row>
            <Row>
              <Input s={8} 
              type='select' 
              label="Liquor3" 
              defaultValue='2'>
              {this.state.allLiquors.map((Liquor, index) => (
                  <option value='1'>{Liquor.name}</option>
                ))}
              </Input>
              <Input s={4}
              name='LiquorVol3'
              type='text'
              lable='Liquor 3 Vol'
              className="form-control"
              onChange={this.handleChange}>
              
              </Input>
            </Row>
            <Row>
              <Input s={8} 
              type='select' 
              label="Liquor4" 
              defaultValue='2'>
              {this.state.allLiquors.map((Liquor, index) => (
                  <option value='1'>{Liquor.name}</option>
                ))}
              </Input>
              <Input s={4}
              name='LiquorVol4'
              type='text'
              lable='Liquor 4 Vol'
              className="form-control"
              onChange={this.handleChange}>
              
              </Input>
            </Row>
            <Row>
              <Input s={8} 
              type='select' 
              label="Liquor5" 
              defaultValue='2'>
              {this.state.allLiquors.map((Liquor, index) => (
                  <option value='1'>{Liquor.name}</option>
                ))}
              </Input>
              <Input s={4}
              name='LiquorVol5'
              type='text'
              lable='Liquor 5 Vol'
              className="form-control"
              onChange={this.handleChange}>
              
              </Input>
            </Row>
            <Row>
              <Button
                waves='light'
                onClick={this.handleSubmit}
                className="SaveLiquor-button">
                Submit
              </Button>
            </Row>
            </form>
        </div>
        )  
      }
      </div>
    )
  }
};

export default AddDrinkHC;