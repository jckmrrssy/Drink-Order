import React, { Component } from 'react';
import { Button, Input, Row } from 'react-materialize';
import API from "../../utils/API";

class AddLiquor extends Component {
    state = {
        content: '',
        allLiquors: [],
        drink: [],
        drinkLiquors: [],
        selected: false
    }

    // When page is displayed, loadLiquor is called
    componentDidMount() {
        this.loadLiquor();
        // this.setState({ drinkLiquors: drink.liquors })
    }

    // Loads saved liquor from mongo database
    loadLiquor = () => {
        API.getLiquor()
            .then(res => {
                this.setState({ allLiquors: res.data });
            })
            .catch(err => console.log(err));
    };

    // ???
    changeSelected = event => {
        // selectedIndex
        this.setState({ selected: event.target.value })
    }

    // ???
    deleteDrinkLiquor = id => event => {
        this.setState({ drinkLiquors: this.state.drinkLiquors.filter(drink => drink.id !== id) })

        //this.setState()
    }

    // ???
    addDrinkLiquor = (event) => {
        event.preventDefault();
        const newDrinkLiquor = this.props.allLiquors.find(drink => drink.id === this.state.selected)
        newDrinkLiquor.volume = 0
        this.setState({ drinkLiquors: [...this.state.drinkLiquors, newDrinkLiquor] })
    }

    finish = () => {
        this.props.onFinish(this.state.drinkLiquors)
    }

    handleChange = (event) => {
        this.setState({
            content: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addLiquor(this.state);
        this.setState({
            content: ''
        })
    }
    render() {
        return (

            <form className="container center">
                <Row>
                    <label>Add Liquor</label>
                </Row>


                <Row>
                    <Input
                        onChange={this.changeSelected}
                        s={12}
                        type='select'
                        label="Liquor"
                        defaultValue=''
                    >
                        {this.state.allLiquors.map((liquor, index) => (
                            <option name={index} value={liquor.id}>{liquor.name}</option>
                        ))}
                    </Input>
    
                </Row>

                <Row>
                    <Button
                        waves='light'
                        onClick={this.addDrinkLiquor}
                        className="SaveLiquor-button">
                        Add
                    </Button>
                </Row>
            </form>
        )
    }
}

export default AddLiquor;