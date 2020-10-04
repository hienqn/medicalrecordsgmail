import React from 'react';
import {Card, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import FileReaderAPI from '../src/backend/nameFileToTextMap.json'

export default function Reports({reports}){
  console.log('hit report', reports);
  console.log(FileReaderAPI['report1.txt']);

  const reportComponents = reports.map(
    (report, idx) => {
      return(
        <Card >
          <Card.Body>
            <Link to={`/reports/${report}`}>
              <Card.Title> {report} </Card.Title> 
            </Link>        
            <Card.Subtitle className="mb-2 text-muted"> Active tags:  
            
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted"> Inactive tags:  
            </Card.Subtitle>
            <Card.Text>
              Laugadgusde
            </Card.Text>
          </Card.Body>
        </Card>
      )
    }
  )

  return (
    <>
      {reportComponents}
    </>
  )
}