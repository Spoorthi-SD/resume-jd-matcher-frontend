\# Resume–JD Matcher Frontend



A React-based frontend for a machine learning-powered Resume–Job Description Matcher. The application allows users to upload a resume and job description and view matching results, detected job domain, and skill gaps.



\## Features



\- Upload a resume in PDF format

\- Upload a job description as PDF or TXT

\- Analyze resume and job description

\- Display detected job domain

\- Display TF-IDF similarity score

\- Display semantic embedding similarity score

\- Show skills found in the job description

\- Show skills found in the resume

\- Identify missing skills

\- Clean and responsive user interface



\## Technologies Used



\- React

\- Vite

\- JavaScript

\- CSS

\- FastAPI backend



\## How It Works



1\. The user uploads a resume.

2\. The user uploads or enters a job description.

3\. The React frontend sends the data to the FastAPI backend.

4\. The backend processes the resume and job description using machine learning techniques.

5\. The frontend displays the matching results and skill gap analysis.



\## Project Structure



resume-jd-matcher-frontend/

│

├── public/

├── src/

│   ├── assets/

│   ├── App.jsx

│   ├── App.css

│   ├── index.css

│   └── main.jsx

│

├── .gitignore

├── package.json

├── package-lock.json

├── vite.config.js

└── README.md



\## Installation



Clone the repository:



git clone https://github.com/Spoorthi-SD/resume-jd-matcher-frontend.git



Go to the project folder:



cd resume-jd-matcher-frontend



Install dependencies:



npm install



\## Running the Frontend



Start the development server:



npm run dev



The frontend will usually run at:



http://localhost:5173



\## Backend



This frontend communicates with a separate FastAPI backend.



Backend repository:



https://github.com/Spoorthi-SD/resume-jd-matcher



The backend provides the resume and job description analysis API.



\## Project Status



The React frontend is developed and tested locally. The backend is maintained in a separate repository.



\## Author



\*\*Spoorthi-SD\*\*



