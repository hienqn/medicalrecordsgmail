import React, {useState} from 'react';
import { Navbar, Button, FormControl, Form } from 'react-bootstrap';
import Reports from './Reports';
import {Route, Switch, useHistory } from "react-router-dom";
import ALLREPORTS from './backend/wordToFilenameMap.json';
import ReportCarousel from './ReportCarousel';
import NAMEFILETOTEXT from './backend/nameFileToTextMap.json'

function FilterReport(){
  const [searchText, setSearchText] = useState('');
  const [reports, setReports] = useState([]);
  const [tagsForReport, setTagsForReport] = useState({});
  const history = useHistory();

  const searchReport = (e, searchText) => {
    e.preventDefault();  
    const keywords = searchText.trim().split(/[\s]+/).map(kw => kw.toLowerCase().trim());
    let intersectReport = ALLREPORTS[keywords[0]];
    const reducer = (acc, curr) => {
      return ALLREPORTS[curr] ? [...ALLREPORTS[curr].filter(report => acc.includes(report))] : [];
    }
    let matchedReport = keywords.reduce(reducer, intersectReport);
    history.push('/');
    setReports(matchedReport.map(e => e.split('.')[0]));
    e.target.value = '';
  };

  return(
    <>
      <Navbar sticky="top" bg="primary" variant="dark" >
        <Navbar.Brand > Segmed Front-end Technical Challenge </Navbar.Brand>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={e => setSearchText(e.target.value)}/>
          <Button variant="outline-light" onClick={e => searchReport(e, searchText)}>Search</Button>
        </Form>
        <Button variant="outline-light ml-5" onClick={() => {setReports(Object.keys(NAMEFILETOTEXT).map(e => e.split('.')[0])); history.push('/')}}>Click to Show All Reports</Button>
      </Navbar>

      <Switch>
        <Route exact path='/'>
          <Reports searchText={searchText} reports={reports} tags={tagsForReport} setTags={setTagsForReport}></Reports>
        </Route>
        <Route path='/reports/:id'>
          <ReportCarousel searchText={searchText} reports={reports} tags={tagsForReport} setTags={setTagsForReport}> </ReportCarousel>
        </Route>
      </Switch>
    </>
  )
}

export default FilterReport;