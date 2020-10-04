This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`
### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

<h1>Accomplished Features</h1>

The app is able to:

1. allow doctors to search for keywords to filter out the revelant report.
2. route to a different page to show text and tags when clicked on the report button
3. #goodreport tag was save automatically on the front-end when hit 2
4. allow you to next and prev with the contrained keyword search
5. show all the reports if you wish to do so
6. allow you to go back to the main panel with persist state
7. utilize React-Bootstrap for styled components.
8. meet all the minimum functionalities.

<h1>How did I implement the app ?</h1>
<h2>  Backend </h2>
The backend folder is located inside the source folder and has the following files:

1. medicalreports folder contains 50 text files downloaded from the internet which served as a database
2. nameFileToTextMap.json is a preprocessed json object to serve as the API for data request from the backend to the frontend
3. wordToFilenameMap.json is a preprocessed json object (also an API) to determine all the files that contain a word. This will save a lot of time when searching for a word because searching for all the files at the front end would be very slow. 
4. preprocessReports is a file that read all text files in medicalreports and output appropriate data format in both nameFileToText and wordToFilename (special thanks to Yaoyu Yang for wonderful [resources](https://www.yaoyuyang.com/2017/01/20/nodejs-batch-file-processing.html) that help me with asynchronosity with Node.js)

NOTE: please be aware that I already ran the preprocessReports.js file and produce nameFIleToTextMap and wordToFilenameMap
for you. If you want to run it again, you can delete those 2 json files, make sure you are in the backend folder, and run the script there so that those 2 files will be created in the backend folder.

<h2> Front-end </h2>

Technologies: React, React-Bootstrap, React-Router-DOM, React Hooks API. Since I had only a couple component files, I didn't put the component files in a folder. I'm going to go over each file from top to bottom in case you're interested:

1. The entry file was index.js
2. FilterReport has 3 state, the search texts, the report name array, also a tag object. FilterReport keeps tracks of the search text, looks up the wordToFilenameMap API to find the files that contain the keyword and reduce them. It then pass the states down to ReportCarousel and Reports.
3. Note that I implemented 2 route in FilterReport: one is the default '/', and the other one was /reports/:id. I want to save time so I did not generate random id with UUID but relies on the unique name of the text file to act as key and id. 
4. Reports shows all the cards with the props passed down to it. When clicked in a report link, you will be routed to /reports/:id, which then render ReportCarousel component.
5. ReportCarousel components show all the document text and tags. It also allows you to go back and forth to the main page.

