import '../App/App.css';
import React from "react";
import {Row, Container, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ARCDiag from "./ARCDiag";
import MultiLine from "./MultiLine";
import TravelSummary from "./TravelSummary";
import {DropdownButton, Dropdown} from 'react-bootstrap';


class  Region extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: 'January',
      region: 'North America'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRegionChange = this.handleRegionChange.bind(this);
  }

  handleChange(event) {
    //console.log(event);
    document.getElementById('monthTitle').innerText = event+" 2020";
    this.setState({month: event});
  }


  handleRegionChange(event) {
    //console.log(event);
    document.getElementById('regionTravel').innerText = event;
    this.setState({region: event});
  }

  //const [month, setMonth] = useState('January');
  render(){
  //console.log(this.state.month);

  return (
  <Container fluid>
  <Row>
    <Col className="multiLineClass">
      <MultiLine month={this.state.month}/>
    </Col>
    <Col >
    <Row className="justify-content-md-center"> <DropdownButton
      alignRight
      title="Choose Month"
      id="dropdown-menu-align-right"
      onSelect={this.handleChange}
        >
              <Dropdown.Item eventKey="January">January 2020</Dropdown.Item>
              <Dropdown.Item eventKey="February">February 2020</Dropdown.Item>
              <Dropdown.Item eventKey="March">March 2020</Dropdown.Item>
              <Dropdown.Item eventKey="April">April 2020</Dropdown.Item>
              <Dropdown.Item eventKey="May">May 2020</Dropdown.Item>
              <Dropdown.Item eventKey="June">June 2020</Dropdown.Item>
              <Dropdown.Item eventKey="July">July 2020</Dropdown.Item>
              <Dropdown.Item eventKey="August">August 2020</Dropdown.Item>
              <Dropdown.Item eventKey="September">September 2020</Dropdown.Item>
             
      </DropdownButton></Row>
    <Row className="justify-content-md-center">
    <p id="monthTitle">January 2020</p>
    <ARCDiag month={this.state.month}/>
    <p id="detailsArcDiagram">Details</p>
    </Row>
    </Col>
    <Col>
    <Row className="justify-content-md-center"> <DropdownButton
      alignRight
      title="Where to travel?"
      id="dropdown-menu-align-right"
      onSelect={this.handleRegionChange}>
              <Dropdown.Item eventKey="Asia">Asia</Dropdown.Item>
              <Dropdown.Item eventKey="North America">North America</Dropdown.Item>
              <Dropdown.Item eventKey="South America">South America</Dropdown.Item>
              <Dropdown.Item eventKey="Africa">Africa </Dropdown.Item>
              <Dropdown.Item eventKey="Europe">Europe </Dropdown.Item>
              <Dropdown.Item eventKey="Oceanic">Oceanic </Dropdown.Item>
      </DropdownButton> 
      </Row>
      <Row className="justify-content-md-center">
      <p id="regionTravel">North America</p>
      <TravelSummary region={this.state.region}/>
      </Row>
                                            

    </Col>
  </Row>
</Container>
  );
}
}
export default Region;
