import React, { Component } from 'react';
import { Button, Input, Row } from 'react-materialize';
import API from "../../utils/API";
import NavTabs from "../../components/NavTabs/NavTabs";
import Liquors from "./Liquors.js";
import "./AddDrink.css";
import Footer from "../../components/Footer/Footer";
import Profile from "../../Profile/Profile"
// const { isAuthenticated } = this.props.auth;

class AddDrink extends Component {
    state = {
        content: "",
        allLiquors: [],
        drinkLiquors: [],
        selected: "",
        name: "",
        liquorVolume: "",
        prep: "",
        userID: ""
    }

    goTo(route) {
        this.props.history.replace(`/${route}`)
    }

    // When page is displayed, loadLiquor is called
    componentDidMount() {
        console.log("mount", this.loadLiquor());
        console.log(this.props.auth)
    }

    loadLiquor = () => {
        this.props.auth.getProfile(this._loadLiquor)
      }

    // Loads saved liquor from mongo database
    _loadLiquor = (err, profile) => {
        console.log("Profile: ", profile.nickname, err)
        const userId = profile.nickname

        API.getLiquorByUser(userId)
            .then(res => {
                this.setState({ allLiquors: res.data });
            })
            .catch(err => console.log(err));
    };

    changeSelected = event => {
        console.log('changeSelected: ', event.target.selectedIndex);
        this.setState({ selected: event.target.selectedIndex })
    }

    addDrinkLiquor = (event) => {
        event.preventDefault();
        const liquorIndex = this.state.selected - 1;
        console.log("this.state.selected: ", this.state.selected);
        console.log('addDrinkLiquor: ', liquorIndex);
        console.log('liquorVolume: ', this.state.liquorVolume);
        if (liquorIndex >= 0) {

            const newLiquor = this.state.allLiquors[liquorIndex].name;
            let updated = this.state.drinkLiquors.slice();
            updated.push({ name: newLiquor, volume: this.state.liquorVolume });
            this.setState({ drinkLiquors: updated });
            // this.setState({drinkLiquors: [...this.state.drinkLiquors, newLiquor]});
            console.log(newLiquor, this.state.drinkLiquors);
            // this.setState({ liquorVolume: 0});
            // this.setState({ liquorVolume: 1 })
        }
        console.log("Liquor Volume: " + this.state.liquorVolume)
        this.setState({
            liquorVolume: "",
            selected: ""
        })

    }

    deleteDrinkLiquor = (name) => {
        const drinkLiquors = this.state.drinkLiquors.filter(liquor => {
            // if id is not equal to id return true and do not remove
            // if id is equal to id return false and remove from array
            return liquor.name !== name
        });
        this.setState({
            drinkLiquors:
                //es6 shortening if key and value have save name
                //otherwise looks like (liquors: liquors)
                drinkLiquors
        })
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        console.log(this.state.name);
        console.log(this.state.liquorVolume);
        this.setState({
            [name]: value
        });

    };

    handleSaveDrink = event => {
        event.preventDefault();
        console.log("handleSaveDrink");
        console.log(this.state.auth)
        console.log(this.state.drinkLiquors);

        const ml_oz = 0.033814;
        let cost = 0;
        
        const costArray = this.state.drinkLiquors.map(tempDL => {
            const match = this.state.allLiquors.find((tempAL) =>
                tempDL.name == tempAL.name);
                console.log('match: ', match);
                return match.bottleCost / (match.bottleVolume * ml_oz) * tempDL.volume;
        })

        for (let i = 0; i < costArray.length; i++) {
            cost += costArray[i];
        }
        cost = cost.toFixed(2);
        const price = (cost * 5).toFixed(2);

        console.log('costArray: ', costArray);

        // let formattedLiquor = [];
        // for (let i = 0; i < this.state.drinkLiquors.length; i++) {
        //     formattedLiquor.push({name: this.state.drinkLiquors[i].name, volume: 2});
        // }
        API.saveDrink({
            name: this.state.name,
            liquors: this.state.drinkLiquors,
            // liquors: formattedLiquor,
            mixers: "tonic",
            garnish: "olive",
            // liquors: inputLiquor,
            // mixers: [],
            // garnish: [],
            glassType: "coupe",
            cost: cost,
            price: price,
            // glassType: "coupe",
            prep: this.state.prep,
           

            userID: this.props.auth.userProfile.nickname

        })
            .then(res => this.goTo("EditDrink"))
            .catch(err => console.log(err));
                // may need to make this.setState a .then

                this.setState({
                    content: "",
                    prep: "",
                    drinkLiquors: [],
                    selected: "",
                    name: ""


                })

    }

    render() {

        const { isAuthenticated } = this.props.auth;

        return (
            <div>
                <NavTabs {...this.props} />
                { isAuthenticated() && (<Profile {...this.props} />) }
                <div>
                    <form className="container center">
                        {/* <img className="responsive-img" alt="Drink Order" src="../../drinkorderlogo.png" /> */}
                        <Row>
                            <h1>Create a Drink</h1>
                            <Input
                                s={12}
                                label="Name"
                                onChange={this.handleInputChange}
                                value={this.state.name}
                                name="name"
                                type="text"
                                className="form-control"
                                id="AddDrink"
                            />
                        </Row>

                        <Row>
                            <Input s={6} type="select" label="Ingredients" value = {this.state.selected}
                            onChange={this.changeSelected}
                            >
                                <option value = "" name = ""></option>
                                {this.state.allLiquors.map((Liquor, index) => (
                                    <option name={index} value = {index + 1}>{Liquor.name}</option>
                                ))}
                            </Input>

                            <Input
                                s={3}
                                label="Volume"
                                onChange={this.handleInputChange}
                                value={this.state.liquorVolume}
                                name="liquorVolume"
                                type="number"
                                className="form-control"
                                id="AddDrink"
                            />
                            <Button
                                s={2}
                                disabled={!(this.state.selected && this.state.liquorVolume)}
                                floating large
                                className="red"
                                onClick={this.addDrinkLiquor}
                                className="saveLiquorButton">
                                +
                            </Button>
                        </Row>

                        {/* <Row>
                            <Button
                                // disabled={!(this.liquorVolume)}
                                waves='light'
                                onClick={this.addDrinkLiquor}
                                className="saveLiquorButton">
                                Add Ingredient
                            </Button>
                        </Row> */}

                        <Row>
                            <div className="container center">
                                <h5 className="center black-text">Ingredients</h5>
                                <Liquors
                                    s={12}
                                    drinkLiquors={this.state.drinkLiquors}
                                    deleteDrinkLiquor={this.deleteDrinkLiquor}
                                />
                            </div>
                        </Row>
                        <Row>
                            <Input
                                s={12}
                                label="Preparation"
                                onChange={this.handleInputChange}
                                value={this.state.prep}
                                name="prep"
                                type="text"
                                className="form-control"
                                id="AddDrink"
                            />
                        </Row>

                        <Row>
                            <Button
                                disabled={!(this.state.name && this.state.prep)}
                                waves='light'
                                onClick={this.handleSaveDrink}
                                className="saveDrinkButton">
                                Submit
                            </Button>
                        </Row>
                    
                    </form>
                   
                </div>
              
            </div>

        )
    }
}

export default AddDrink;