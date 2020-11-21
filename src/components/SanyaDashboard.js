import './SanyaDash.css';
import React from "react";
import {Row, Container, Col} from 'react-bootstrap';
import {Button, Accordion, Card} from 'react-bootstrap';
import Radial19 from './Radial_19_v3';
import Radial20 from './Radial_20_v3'; 
import DonutSmall from './donut_small';
import DonutMedium from './donut_medium';
import DonutLarge from './donut_large';
import DonutPort from './donut_heliport';
import StreamGraph from './Stream_v3';


class  SanyaDashboard extends React.Component {


  render(){

  return (
  <Container fluid className="main">
  <Row>
              <Col sm={5}>
                  <h2>Top 10 most affected airlines [Percentage decrease from 2019 to 2020]</h2>

                  {/* table */}
                  <table>
  <tr>
    <th></th>
    <th>Airline</th> 
    <th>Percentage decrease</th>
    <th>2019 count</th>
    <th>2020 count</th>
  </tr>
  <tr>
      <td>1</td>
      <td>N829JP</td>
    <td>99.892 %</td>
    <td>933</td>
    <td>1</td>
  </tr>
  <tr>
      <td>2</td>
      <td>KAP639</td>
    <td>99.835 %</td>
    <td>607</td>
    <td>1</td>
  </tr>
  <tr>
      <td>3</td>
      <td>NDU641</td>
    <td>99.834 %</td>
    <td>604</td>
    <td>1</td>
  </tr>
  <tr>
      <td>4</td>
      <td>N535WK</td>
    <td>99.801 %</td>
    <td>504</td>
    <td>1</td>
  </tr>
  <tr>
      <td>5</td>
      <td>UUD</td>
    <td>99.797 %</td>
    <td>494</td>
    <td>1</td>
  </tr>
  <tr>
      <td>6</td>
      <td>HBTEC</td>
    <td>99.750 %</td>
    <td>807</td>
    <td>2</td>
  </tr>
  <tr>
      <td>7</td>
      <td>ADSBTEST</td>
    <td>99.746 %</td>
    <td>395</td>
    <td>1</td>
  </tr>
  <tr>
      <td>8</td>
      <td>N7673W</td>
    <td>99.727 %</td>
    <td>367</td>
    <td>1</td>
  </tr>
  <tr>
      <td>9</td>
      <td>RSCU521</td>
    <td>99.722 %</td>
    <td>361</td>
    <td>1</td>
  </tr>
  <tr>
      <td>10</td>
      <td>ENY3779</td>
    <td>99.650 %</td>
    <td>286</td>
    <td>1</td>
  </tr>
                  </table>
  

     <Accordion defaultActiveKey="0">
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="0">
        2019 airline frequency!
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
                              <Card.Body>
                                  <Radial19 />
      </Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="1">
        2020 airline frequency!
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="1">
                              <Card.Body>
                                  <Radial20/>
      </Card.Body>
    </Accordion.Collapse>
  </Card>
</Accordion>

                  {/* clickable radial graph theme */}   
                  {/* 4 donuts */}
                    
                  <h2>Most active airports during COVID</h2>
                  <table>
                      <thead>
                          <tr>
                              <th>Small Airports</th>
                              <th>Medium Airports</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr><td> <DonutSmall />
                          </td>
                          <td> <DonutMedium />
                              </td>
                          </tr>
                      </tbody>
                  </table>
                  
                  <table>
                      <thead>
                          <tr>
                              <th>Large Airports</th>
                              <th>Heliports</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr><td> <DonutLarge />
                          </td>
                          <td> <DonutPort />
                              </td>
                          </tr>
                      </tbody>
                </table>


</Col>
              <Col sm={7}>Mapbox will come here
               
               <h1>Most busy airports during COVID - visualizing total number of flights</h1>

                  {/* streamgraph */}
                  <StreamGraph/>
               
    </Col>
          </Row>
</Container>
  );
}
}

export default SanyaDashboard;
