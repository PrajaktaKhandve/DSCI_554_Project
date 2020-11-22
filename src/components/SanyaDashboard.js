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


class SanyaDashboard extends React.Component {
  
  render(){

  return (
      <Container fluid className="main">
          <h1>Visualize the impact of COVID in 2020 on airports around the world</h1>
  <Row>
              <Col sm={5}>
                  <h3>Top 10 most affected airlines [Percentage decrease from 2019 to 2020]</h3>

                  {/* table */}
                  <table>
  <tr>
    <th className="thh"></th>
    <th className="thh">Airline</th> 
    <th className="thh">Percentage decrease</th>
    <th className="thh">2019 count</th>
    <th className="thh">2020 count</th>
  </tr>
  <tr>
      <td className="tdd">1</td>
      <td  className="tdd">N829JP</td>
    <td  className="tdd">99.892 %</td>
    <td  className="tdd">933</td>
    <td  className="tdd">1</td>
  </tr>
  <tr>
      <td  className="tdd">2</td>
      <td  className="tdd">KAP639</td>
    <td  className="tdd">99.835 %</td>
    <td  className="tdd">607</td>
    <td  className="tdd">1</td>
  </tr>
  <tr>
      <td  className="tdd">3</td>
      <td  className="tdd">NDU641</td>
    <td  className="tdd">99.834 %</td>
    <td  className="tdd">604</td>
    <td  className="tdd">1</td>
  </tr>
  <tr>
      <td  className="tdd">4</td>
      <td  className="tdd">N535WK</td>
    <td  className="tdd">99.801 %</td>
    <td  className="tdd">504</td>
    <td  className="tdd">1</td>
  </tr>
  <tr>
      <td  className="tdd">5</td>
      <td  className="tdd">UUD</td>
    <td  className="tdd">99.797 %</td>
    <td  className="tdd">494</td>
    <td  className="tdd">1</td>
  </tr>
  <tr>
      <td  className="tdd">6</td>
      <td  className="tdd">HBTEC</td>
    <td  className="tdd">99.750 %</td>
    <td  className="tdd">807</td>
    <td  className="tdd">2</td>
  </tr>
  <tr>
      <td  className="tdd">7</td>
      <td  className="tdd">ADSBTEST</td>
    <td  className="tdd">99.746 %</td>
    <td  className="tdd">395</td>
    <td  className="tdd">1</td>
  </tr>
  <tr>
      <td  className="tdd">8</td>
      <td  className="tdd">N7673W</td>
    <td  className="tdd">99.727 %</td>
    <td  className="tdd">367</td>
    <td  className="tdd">1</td>
  </tr>
  <tr>
      <td  className="tdd">9</td>
      <td  className="tdd">RSCU521</td>
    <td  className="tdd">99.722 %</td>
    <td  className="tdd">361</td>
    <td  className="tdd">1</td>
  </tr>
  <tr>
      <td  className="tdd">10</td>
      <td  className="tdd">ENY3779</td>
    <td  className="tdd">99.650 %</td>
    <td  className="tdd">286</td>
    <td  className="tdd">1</td>
  </tr>
                  </table>
  
    <div className="radials">

     <Accordion defaultActiveKey="0">
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="0" className="radial19_text">
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
      <Accordion.Toggle as={Button} variant="link" eventKey="1" className="radial20_text">
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

                      </div>

                  {/* clickable radial graph theme */}   
                  {/* 4 donuts */}
                    
                  <h3 className="most_active_donuts">Most active airports during COVID</h3>
          
            <span className="heliports_text">Heliports</span>
            <span className="small_airports_text">Small Airports</span>

            <span className="port_align"> <DonutPort /> </span>
            <span className="small_align"> <DonutSmall /> </span>
  
            


</Col>
              <Col sm={7}>
               
               <h3 className="stream_headline">Most busy airports during COVID - visualizing total number of flights</h3>

          {/* streamgraph */}
          <div class="stream_graph">
<StreamGraph/>
          </div>
                  
               
    </Col>
          </Row>
</Container>
  );
}
}

export default SanyaDashboard;
