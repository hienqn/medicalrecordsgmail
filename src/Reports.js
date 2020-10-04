import React from 'react';
import {Card } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import FileReaderAPI from '../src/backend/nameFileToTextMap.json'

export default function Reports({searchText, reports, tags}){

  const reportComponents = reports.map(
    (report, idx) => {
      return(
        <Card key={report}>
          <Card.Body>
            <Link to={`/reports/${report}`}>
              <Card.Title> {report} </Card.Title> 
            </Link>        
            <Card.Subtitle className="mb-2 text-muted" > Tags: {tags[report]?.map(e => <span key={report} className="text-light bg-dark border p-1 m-1">{e}</span>)} </Card.Subtitle>
            <Card.Text className='text-truncate'>
              {FileReaderAPI[`${report}.txt`]}
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