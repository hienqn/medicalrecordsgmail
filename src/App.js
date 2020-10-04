import React from 'react';
import {  Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FilterReport from './FilterReport';
import { BrowserRouter as Router} from "react-router-dom";

function App() {
  return (
    <Container>
      <Router>
        <FilterReport />
      </Router>
    </Container>
  );
}


export default App;
