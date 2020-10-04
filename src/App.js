import React, {useState} from 'react';
import { Col, Container, Row, Alert, Button } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FilterReport from './FilterReport';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Report from './Report';
import Switch from 'react-bootstrap/esm/Switch';

function App() {
  return (
    <Router>
      <FilterReport />
    </Router>
  );
}


export default App;
