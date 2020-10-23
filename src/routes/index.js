import React, { Component } from 'react';
import Barchart from '../components/Barchart';

class Route extends Component {
    render() {
        return (
            <Barchart data={[5,10,1,3]} size={[500,500]} />
        )
    }
}
export default Route;