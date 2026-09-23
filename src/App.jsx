import { useState } from "react";

const API_URL = "http://localhost:8000/api/analyze";
const MAX_FILE_MB = 10;

export default function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jdFile, setJdFile] = useState(null);
  const [jdText, setJdText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ================= VALIDATION =================

  const validate = () => {
    if (!resumeFile) {
      return "Please upload your resume PDF.";
    }

    if (!resumeFile.name.toLowerCase().endsWith(".pdf")) {
      return "Resume must be a PDF file.";
    }

    if (resumeFile.size > MAX_FILE_MB * 1024 * 1024) {
      return `Resume file is too large. Maximum size is ${MAX_FILE_MB} MB.`;
    }

    if (!jdFile && !jdText.trim()) {
      return "Please upload a job description or paste the JD text.";
    }

    if (jdFile) {
      const name = jdFile.name.toLowerCase();

      if (!name.endsWith(".pdf") && !name.endsWith(".txt")) {
        return "Job description must be a PDF or TXT file.";
      }

      if (jdFile.size > MAX_FILE_MB * 1024 * 1024) {
        return `Job description file is too large. Maximum size is ${MAX_FILE_MB} MB.`;
      }
    }

    return null;
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setResult(null);

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    const formData = new FormData();

    formData.append("resume", resumeFile);

    if (jdFile) {
      formData.append("jd_file", jdFile);
    }

    if (jdText.trim()) {
      formData.append("jd_text", jdText);
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));

        throw new Error(
          data.detail || `Server error (${response.status})`
        );
      }

      const data = await response.json();

      setResult(data);
    } catch (err) {
      if (err.message === "Failed to fetch") {
        setError(
          "Unable to connect to the backend. Make sure FastAPI is running on port 8000."
        );
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // ================= RESET =================

  const resetForm = () => {
    setResumeFile(null);
    setJdFile(null);
    setJdText("");
    setResult(null);
    setError(null);

    document
      .querySelectorAll('input[type="file"]')
      .forEach((input) => {
        input.value = "";
      });
  };

  // ================= UI =================

  return (
    <div className="app">

      <div className="container">

        {/* ================= HEADER ================= */}

        <header className="header">

          <div className="logo">
            <div className="logoIcon">R</div>
            <span>ResumeMatch</span>
          </div>

          <div className="status">
            <span className="statusDot"></span>
            AI Matching
          </div>

        </header>


        {/* ================= HERO ================= */}

        <section className="hero">

          <p className="tag">
            AI-POWERED RESUME ANALYSIS
          </p>

          <h1>
            Match your resume with the
            <span> right job.</span>
          </h1>

          <p className="heroText">
            Upload your resume and job description to discover
            your match score, relevant skills, and missing skills.
          </p>

        </section>


        {/* ================= INPUT FORM ================= */}

        <form
          onSubmit={handleSubmit}
          className="card"
        >

          <div className="cardTitle">

            <div>
              <h2>Analyze Your Resume</h2>

              <p>
                Provide your resume and the job description.
              </p>
            </div>

            <div className="step">
              STEP 1
            </div>

          </div>


          {/* ================= RESUME ================= */}

          <div className="uploadSection">

            <label className="fieldLabel">
              Resume <span>*</span>
            </label>

            <label className="uploadBox">

              <input
                type="file"
                accept=".pdf"
                onChange={(e) =>
                  setResumeFile(e.target.files[0])
                }
                disabled={loading}
              />

              <div className="uploadIcon">
                ↑
              </div>

              {resumeFile ? (
                <>
                  <strong>
                    {resumeFile.name}
                  </strong>

                  <small>
                    {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                  </small>
                </>
              ) : (
                <>
                  <strong>
                    Upload your resume
                  </strong>

                  <small>
                    PDF format • Maximum 10 MB
                  </small>
                </>
              )}

            </label>

          </div>


          {/* ================= JOB DESCRIPTION FILE ================= */}

          <div className="uploadSection">

            <label className="fieldLabel">
              Job Description
            </label>

            <label className="uploadBox">

              <input
                type="file"
                accept=".pdf,.txt"
                onChange={(e) =>
                  setJdFile(e.target.files[0])
                }
                disabled={loading}
              />

              <div className="uploadIcon">
                ↑
              </div>

              {jdFile ? (
                <>
                  <strong>
                    {jdFile.name}
                  </strong>

                  <small>
                    {(jdFile.size / 1024 / 1024).toFixed(2)} MB
                  </small>
                </>
              ) : (
                <>
                  <strong>
                    Upload job description
                  </strong>

                  <small>
                    PDF or TXT format • Maximum 10 MB
                  </small>
                </>
              )}

            </label>

          </div>


          {/* ================= OR ================= */}

          <div className="divider">
            <span>OR</span>
          </div>


          {/* ================= JD TEXT ================= */}

          <div className="textSection">

            <label className="fieldLabel">
              Paste Job Description
            </label>

            <textarea
              value={jdText}
              onChange={(e) =>
                setJdText(e.target.value)
              }
              placeholder="Paste the job description here..."
              disabled={loading}
            />

          </div>


          {/* ================= ERROR ================= */}

          {error && (
            <div className="error">

              <strong>
                Analysis failed
              </strong>

              <p>
                {error}
              </p>

            </div>
          )}


          {/* ================= BUTTON ================= */}

          <button
            type="submit"
            className="analyzeButton"
            disabled={loading}
          >

            {loading ? (
              <>
                <span className="spinner"></span>
                Analyzing Resume...
              </>
            ) : (
              <>
                Analyze Resume
                <span>→</span>
              </>
            )}

          </button>


          <p className="privacy">
            Your resume is processed only for matching
            with the provided job description.
          </p>

        </form>


        {/* ================= RESULTS ================= */}

        {result && (
          <Results
            result={result}
            onReset={resetForm}
          />
        )}


        {/* ================= FOOTER ================= */}

        <footer>
          ResumeMatch • AI-powered Resume & Job Description Matcher
        </footer>

      </div>


      {/* ================= CSS ================= */}

      <style>{styles}</style>

    </div>
  );
}


/* =====================================================
   RESULTS
===================================================== */

function Results({ result, onReset }) {

  const tfidf =
    Number(result.scores.tfidf_percent) || 0;

  const embedding =
    Number(result.scores.embedding_percent) || 0;

  // Overall score
  const overall = Math.round(
    (tfidf + embedding) / 2
  );

  return (
    <section className="results">


      {/* ================= RESULTS HEADER ================= */}

      <div className="resultsHeader">

        <div>

          <p className="tag">
            ANALYSIS COMPLETE
          </p>

          <h2>
            Resume Match Results
          </h2>

        </div>


        <button
          className="resetButton"
          onClick={onReset}
        >
          Analyze Another
        </button>

      </div>


      {/* ================= OVERALL SCORE ================= */}

      <div className="scoreCard">


        {/* SCORE CIRCLE */}

        <div
          className="scoreCircle"
          style={{
            background: `conic-gradient(
              #4f46e5 ${overall * 3.6}deg,
              #e2e8f0 ${overall * 3.6}deg
            )`,
          }}
        >

          <div className="scoreInner">

            <strong>
              {overall}%
            </strong>

            <span>
              Match
            </span>

          </div>

        </div>


        {/* SCORE INFORMATION */}

        <div className="scoreInfo">

          <h3>
            Overall Match Score
          </h3>

          <p>
            Your resume has a{" "}
            <strong>{overall}%</strong>{" "}
            overall match with the
            provided job description.
          </p>


          {/* DOMAIN */}

          <div className="domain">

            <span>
              Detected Domain
            </span>

            <strong>
              {result.domain.detected}
            </strong>

          </div>


          {/* CONFIDENCE */}

          <div className="confidence">

            Domain confidence:{" "}

            <strong>
              {result.domain.confidence_percent}%
            </strong>

          </div>

        </div>

      </div>


      {/* ================= SCORE BREAKDOWN ================= */}

      <div className="resultCard">

        <h3>
          Match Score Breakdown
        </h3>


        <ScoreBar
          label="Keyword Similarity (TF-IDF)"
          value={tfidf}
        />


        <ScoreBar
          label="Semantic Similarity (Embedding)"
          value={embedding}
        />

      </div>


      {/* ================= SKILLS ================= */}

      <div className="skillsGrid">


        {/* JD SKILLS */}

        <SkillCard
          title="Skills in Job Description"
          skills={result.skills.in_jd}
          type="blue"
        />


        {/* RESUME SKILLS */}

        <SkillCard
          title="Skills Found in Resume"
          skills={result.skills.in_resume}
          type="green"
        />


        {/* MISSING SKILLS */}

        <SkillCard
          title="Missing Skills"
          skills={result.skills.missing_from_resume}
          type="red"
        />

      </div>

    </section>
  );
}


/* =====================================================
   SCORE BAR
===================================================== */

function ScoreBar({ label, value }) {

  return (
    <div className="scoreBar">

      <div className="scoreBarTop">

        <span>
          {label}
        </span>

        <strong>
          {value}%
        </strong>

      </div>


      <div className="track">

        <div
          className="fill"
          style={{
            width: `${Math.min(value, 100)}%`,
          }}
        ></div>

      </div>

    </div>
  );
}


/* =====================================================
   SKILL CARD
===================================================== */

function SkillCard({
  title,
  skills,
  type,
}) {

  return (
    <div className="skillCard">

      <h3>
        {title}
      </h3>


      {skills && skills.length > 0 ? (

        <div className="skills">

          {skills.map((skill, index) => (

            <span
              key={`${skill}-${index}`}
              className={`skill ${type}`}
            >
              {skill}
            </span>

          ))}

        </div>

      ) : (

        <p className="none">
          No skills found
        </p>

      )}

    </div>
  );
}


/* =====================================================
   STYLES
===================================================== */

const styles = `

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

.app {
  min-height: 100vh;
  background: #f8fafc;
  color: #0f172a;

  font-family:
    Inter,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}

.container {
  max-width: 1050px;
  margin: auto;
  padding: 0 24px 50px;
}


/* ================= HEADER ================= */

.header {
  height: 75px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid #e2e8f0;
}

.logo {
  display: flex;
  align-items: center;

  gap: 10px;

  font-size: 19px;
  font-weight: 700;
}

.logoIcon {
  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #4f46e5;
  color: white;

  border-radius: 9px;

  font-weight: 800;
}

.status {
  font-size: 13px;
  color: #475569;

  display: flex;
  align-items: center;

  gap: 7px;
}

.statusDot {
  width: 8px;
  height: 8px;

  background: #22c55e;

  border-radius: 50%;
}


/* ================= HERO ================= */

.hero {
  text-align: center;

  padding: 65px 0 45px;
}

.tag {
  color: #4f46e5;

  font-size: 12px;
  font-weight: 800;

  letter-spacing: 1.4px;

  margin: 0 0 12px;
}

.hero h1 {
  font-size: 46px;

  line-height: 1.1;

  max-width: 750px;

  margin: auto;

  letter-spacing: -1.5px;
}

.hero h1 span {
  color: #4f46e5;
}

.heroText {
  max-width: 600px;

  margin: 18px auto 0;

  color: #64748b;

  line-height: 1.7;
}


/* ================= MAIN CARD ================= */

.card {
  background: white;

  border: 1px solid #e2e8f0;

  border-radius: 18px;

  padding: 32px;

  box-shadow:
    0 10px 35px
    rgba(15, 23, 42, 0.06);
}

.cardTitle {
  display: flex;

  justify-content: space-between;
  align-items: flex-start;

  margin-bottom: 28px;
}

.cardTitle h2 {
  margin: 0;

  font-size: 22px;
}

.cardTitle p {
  margin: 6px 0 0;

  color: #64748b;

  font-size: 14px;
}

.step {
  font-size: 11px;

  font-weight: 800;

  background: #eef2ff;

  color: #4f46e5;

  padding: 7px 10px;

  border-radius: 7px;
}


/* ================= UPLOAD ================= */

.uploadSection {
  margin-bottom: 20px;
}

.fieldLabel {
  display: block;

  font-size: 14px;

  font-weight: 700;

  margin-bottom: 8px;
}

.fieldLabel span {
  color: #ef4444;
}

.uploadBox {
  position: relative;

  min-height: 120px;

  border: 2px dashed #cbd5e1;

  border-radius: 12px;

  display: flex;

  flex-direction: column;

  justify-content: center;

  align-items: center;

  cursor: pointer;

  transition: 0.2s;

  text-align: center;
}

.uploadBox:hover {
  border-color: #818cf8;

  background: #fafaff;
}

.uploadBox input {
  position: absolute;

  inset: 0;

  opacity: 0;

  cursor: pointer;
}

.uploadIcon {
  width: 34px;
  height: 34px;

  background: #eef2ff;

  color: #4f46e5;

  border-radius: 8px;

  display: flex;

  justify-content: center;

  align-items: center;

  margin-bottom: 8px;

  font-weight: bold;
}

.uploadBox strong {
  font-size: 14px;
}

.uploadBox small {
  color: #94a3b8;

  margin-top: 4px;
}


/* ================= DIVIDER ================= */

.divider {
  display: flex;

  align-items: center;

  gap: 15px;

  color: #94a3b8;

  font-size: 11px;

  margin: 25px 0;
}

.divider::before,
.divider::after {
  content: "";

  height: 1px;

  background: #e2e8f0;

  flex: 1;
}


/* ================= TEXTAREA ================= */

.textSection {
  margin-bottom: 20px;
}

textarea {
  width: 100%;

  min-height: 140px;

  resize: vertical;

  border: 1px solid #cbd5e1;

  border-radius: 10px;

  padding: 13px;

  font-family: inherit;

  font-size: 14px;

  outline: none;
}

textarea:focus {
  border-color: #6366f1;

  box-shadow:
    0 0 0 3px #eef2ff;
}


/* ================= ERROR ================= */

.error {
  background: #fef2f2;

  border: 1px solid #fecaca;

  border-radius: 9px;

  padding: 12px 14px;

  margin-bottom: 15px;

  color: #b91c1c;

  font-size: 13px;
}

.error p {
  margin: 4px 0 0;
}


/* ================= BUTTON ================= */

.analyzeButton {
  width: 100%;

  border: none;

  border-radius: 10px;

  background: #4f46e5;

  color: white;

  padding: 14px;

  font-size: 15px;

  font-weight: 700;

  cursor: pointer;

  transition: 0.2s;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 10px;
}

.analyzeButton:hover {
  background: #4338ca;
}

.analyzeButton:disabled {
  opacity: 0.7;

  cursor: not-allowed;
}

.privacy {
  text-align: center;

  color: #94a3b8;

  font-size: 11px;

  margin: 13px 0 0;
}


/* ================= SPINNER ================= */

.spinner {
  width: 17px;
  height: 17px;

  border: 2px solid rgba(255,255,255,0.4);

  border-top-color: white;

  border-radius: 50%;

  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}


/* ================= RESULTS ================= */

.results {
  margin-top: 55px;
}

.resultsHeader {
  display: flex;

  justify-content: space-between;

  align-items: flex-end;

  margin-bottom: 20px;
}

.resultsHeader h2 {
  margin: 0;

  font-size: 28px;
}

.resetButton {
  border: 1px solid #cbd5e1;

  background: white;

  padding: 9px 14px;

  border-radius: 8px;

  cursor: pointer;

  font-weight: 600;
}


/* ================= SCORE CARD ================= */

.scoreCard {
  background: #0f172a;

  color: white;

  border-radius: 18px;

  padding: 32px;

  display: flex;

  align-items: center;

  gap: 35px;

  margin-bottom: 20px;
}

.scoreCircle {
  width: 155px;
  height: 155px;

  border-radius: 50%;

  display: flex;

  align-items: center;
  justify-content: center;

  flex-shrink: 0;
}

.scoreInner {
  width: 125px;
  height: 125px;

  border-radius: 50%;

  background: #0f172a;

  display: flex;

  flex-direction: column;

  align-items: center;
  justify-content: center;
}

.scoreInner strong {
  font-size: 34px;
}

.scoreInner span {
  color: #94a3b8;

  font-size: 12px;
}

.scoreInfo h3 {
  margin: 0 0 8px;

  font-size: 20px;
}

.scoreInfo p {
  color: #cbd5e1;

  line-height: 1.6;
}

.domain {
  display: flex;

  gap: 10px;

  align-items: center;

  margin-top: 15px;
}

.domain span {
  color: #94a3b8;

  font-size: 13px;
}

.domain strong {
  background: #312e81;

  padding: 5px 10px;

  border-radius: 6px;

  font-size: 13px;
}

.confidence {
  margin-top: 8px;

  color: #94a3b8;

  font-size: 12px;
}


/* ================= RESULT CARD ================= */

.resultCard {
  background: white;

  border: 1px solid #e2e8f0;

  border-radius: 15px;

  padding: 25px;

  margin-bottom: 20px;
}

.resultCard h3 {
  margin-top: 0;
}


/* ================= SCORE BARS ================= */

.scoreBar {
  margin: 20px 0;
}

.scoreBarTop {
  display: flex;

  justify-content: space-between;

  font-size: 13px;

  margin-bottom: 7px;
}

.scoreBarTop strong {
  color: #4f46e5;
}

.track {
  height: 9px;

  background: #e2e8f0;

  border-radius: 20px;

  overflow: hidden;
}

.fill {
  height: 100%;

  background: #4f46e5;

  border-radius: 20px;
}


/* ================= SKILLS ================= */

.skillsGrid {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 18px;
}

.skillCard {
  background: white;

  border: 1px solid #e2e8f0;

  border-radius: 15px;

  padding: 22px;
}

.skillCard h3 {
  font-size: 15px;

  margin-top: 0;

  margin-bottom: 15px;
}

.skills {
  display: flex;

  flex-wrap: wrap;

  gap: 7px;
}

.skill {
  padding: 6px 10px;

  border-radius: 6px;

  font-size: 12px;

  font-weight: 600;
}

.skill.blue {
  background: #eff6ff;

  color: #2563eb;
}

.skill.green {
  background: #ecfdf5;

  color: #059669;
}

.skill.red {
  background: #fef2f2;

  color: #dc2626;
}

.none {
  color: #94a3b8;

  font-size: 13px;
}


/* ================= FOOTER ================= */

footer {
  text-align: center;

  color: #94a3b8;

  font-size: 12px;

  margin-top: 45px;
}


/* ================= MOBILE ================= */

@media (max-width: 700px) {

  .container {
    padding: 0 15px 35px;
  }

  .hero {
    padding: 45px 0 30px;
  }

  .hero h1 {
    font-size: 34px;
  }

  .card {
    padding: 20px;
  }

  .scoreCard {
    flex-direction: column;

    text-align: center;
  }

  .domain {
    justify-content: center;
  }

  .skillsGrid {
    grid-template-columns: 1fr;
  }

  .resultsHeader {
    align-items: flex-start;

    gap: 15px;

    flex-direction: column;
  }

}

`;