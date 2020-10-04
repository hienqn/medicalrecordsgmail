import React from 'react';
import ReactDOM from 'react-dom';
import {  Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FilterReport from './FilterReport';
import { BrowserRouter as Router} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
     <Container>
      <Router>
        <FilterReport />
      </Router>
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);
