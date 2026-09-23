# Resume–JD Matcher (Frontend)

A React-based frontend for a machine learning-powered Resume–Job Description Matcher. The application allows users to upload a resume and job description and view matching results, detected job domain, and skill gaps.

> Backend repo: [resume-jd-matcher](https://github.com/Spoorthi-SD/resume-jd-matcher)

## Features

- Upload a resume in PDF format
- Upload a job description as PDF or TXT
- Analyze resume and job description
- Display detected job domain
- Display TF-IDF similarity score
- Display semantic embedding similarity score
- Show skills found in the job description
- Show skills found in the resume
- Identify missing skills
- Clean and responsive user interface

## Technologies Used

- React
- Vite
- JavaScript
- CSS
- FastAPI backend (consumed via REST API)

## How It Works

1. The user uploads a resume.
2. The user uploads or enters a job description.
3. The React frontend sends the data to the FastAPI backend using `POST /api/analyze`.
4. The backend processes the resume and job description using machine learning techniques.
5. The frontend displays the matching results and skill gap analysis.

## Project Structure

```text
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
```

## Installation

Clone the repository:

```bash
git clone https://github.com/Spoorthi-SD/resume-jd-matcher-frontend.git
cd resume-jd-matcher-frontend
```

Install dependencies:

```bash
npm install
```

## Running the Frontend

Make sure the [backend](https://github.com/Spoorthi-SD/resume-jd-matcher) is running first.

The backend runs locally at:

```text
http://localhost:8000
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

## Backend

This frontend communicates with a separate FastAPI backend for resume and job description analysis.

- Backend repository: [resume-jd-matcher](https://github.com/Spoorthi-SD/resume-jd-matcher)
- API endpoint used: `POST /api/analyze`

## Project Status

The React frontend and FastAPI backend are developed and tested locally. The frontend and backend are maintained in separate repositories.

## Author

**Spoorthi-SD**