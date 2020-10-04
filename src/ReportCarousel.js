import React, {useState, useEffect} from 'react';
import FileReaderAPI from './backend/nameFileToTextMap.json'
import {useLocation, useHistory} from 'react-router-dom';
import {Col, Row, Button, Container } from 'react-bootstrap';
import Highlight from './Highlight';

export default function ReportCarousel({reports, tags, setTags, searchText}) {
  const id = useLocation().pathname.split('/').pop();
  const [index, setIndex] = useState(reports.indexOf(id));
  const [reportName, setReportName] = useState(reports[index]);
  const history = useHistory();

  const handleSelect = (e, report) => {
    if (!report){
      let newIndex = (index + 1) % reports.length;
      setIndex(newIndex);
    } else {
      setIndex(reports.indexOf(report))
    }
  };


  const handleTag = (e, tagName) => {
    let tagArray;
    console.log(tagName);
    if (tagName === '#goodreport'){
      tagArray = tags[reportName] ? [...new Set([...tags[reportName], '#goodreport'])] : ['#goodreport'];
    } else {
      if (tags[reportName]) {
        tagArray = [...tags[reportName]];
        if (!tagArray.includes(e.target.innerHTML)) {
          tagArray.push(e.target.innerHTML)
        }
      } else {
        tagArray = [e.target.innerHTML];
      }
    }
    const newTag = {};
    newTag[reportName] = tagArray;
    setTags(Object.assign(tags, newTag));
  };


  function checkKeyPress(key){
    if (key.keyCode === 50){
      handleTag(key, "#goodreport");
    }
  }
      
  window.addEventListener("keydown", checkKeyPress, false);


  const handleBack = (e) => {
    history.push('/');
  }

  useEffect(
    () => {
      setReportName(reports[index]);
    }, [index, reports]
  )

  const reportButton = reports.map(report => <Button key={report} variant="primary" className="m-2" onClick={e => handleSelect(e, report)}> {report} </Button>)

  return (
    <div className="container mt-3">

      <Row className="d-flex justify-content-center text-center align-items-center mt-3">
          <Button variant="primary" className="mr-2" onClick={handleSelect}> Prev Report </Button>{' '}          
          <Button variant="primary" className="ml-2" onClick={handleSelect}> Next Report </Button>{' '}
          <Button variant="primary" className="ml-2" onClick={handleBack}> Back to Search </Button>{' '}
      </Row>

      <Container>
          {reportButton}
      </Container>

      <Row >
        <Col className="border border-primary mt-3" >
          <h1 className="text-center"> {reportName}</h1>
          <Highlight text={FileReaderAPI[`${reportName}.txt`]} highlight={searchText}></Highlight>
        </Col>

        <Col className="border border-primary col col-lg-2 text-center mt-3">
          <Row className="d-flex justify-content-center mb-2 mt-2">
            Active tags:
            <Button variant="success" onClick={handleTag}>#goodreport</Button>
          </Row>
          <Row className="d-flex justify-content-center mb-2">
            Inactive tags: 
            <Button variant="warning" onClick={handleTag}>#conditionpresent</Button>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
