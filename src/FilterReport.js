import React, {useState, useEffect} from 'react';
import { Nav, Navbar, Button, FormControl, Form } from 'react-bootstrap';
import Reports from './Reports';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ALLREPORTS from './backend/wordToFilenameMap.json';
import Report from './Report';

function FilterReport(){
  const [searchText, setSearchText] = useState('');
  const [reports, setReports] = useState([]);
  const [tagsForReport, setTagsForReport] = useState([]);
  const [tagOptions, setTagOptions] = useState('');

  const searchReport = (e, searchText) => {
    e.preventDefault();
    const keywords = searchText.trim().split(/[\s]+/).map(kw => kw.toLowerCase().trim());
    let intersectReport = ALLREPORTS[keywords[0]];
    const reducer = (acc, curr) => {
      return ALLREPORTS[curr] ? [...ALLREPORTS[curr].filter(report => acc.includes(report))] : [];
    }
    let matchedReport = keywords.reduce(reducer, intersectReport);
    setReports(matchedReport);
  };

  return(
    <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/">Segmed</Navbar.Brand>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={e => setSearchText(e.target.value)}/>
          <Button variant="outline-light" onClick={e => searchReport(e, searchText)}>Search</Button>
        </Form>
      </Navbar>

      <Switch>
        <Route exact path='/'>
          <Reports reports={reports}></Reports>
        </Route>

        <Route path='/reports/:id'>
          <Report reports={reports}> </Report>
        </Route>
      </Switch>
    </>
  )
}

export default FilterReport;