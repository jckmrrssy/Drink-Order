import React, { Component } from "react";
import "./LiquorHeader.css";
import {Button, Icon} from 'react-materialize'

// Header for the Edit Liquor page
const LiquorHeader = () => (
    <div class="LiquorHeader">
    <Button floating large className='light-green' icon="add" node='a' href='/AddLiquor'></Button><h4>Add a Liquor</h4>
    </div>
    // (<h5 className="LiquorHeader">Liquor</h5>

);

export default LiquorHeader;