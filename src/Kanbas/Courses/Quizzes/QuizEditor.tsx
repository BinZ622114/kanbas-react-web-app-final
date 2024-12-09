import { Route, Routes, Navigate, useLocation } from "react-router";
import DetailEditor from "./DetailEditor";
import QuestionEditor from "./QuestionEditor";
import { useParams } from "react-router-dom";
import { IoEllipsisVertical } from "react-icons/io5";

export default function QuizEditor() {
  const { pathname } = useLocation();
  const { cid, qid } = useParams();
  
  return (
    <div>
      <div id="wd-quiz-editor-header" className="quiz-editor p-4">
        <IoEllipsisVertical className="fs-4 float-end" />
        <div className="fs-4 float-end">
          Point: 100
        </div>
      </div>

      <ul className="nav nav-tabs">
      <li className="nav-item">
        <a id="wd-details" href={`#/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit/Details`}
          className={`nav-link ${pathname.includes("Details") ? "active" : ""}`}>
          Details
        </a>
      </li>
      <li className="nav-item">
        <a id="wd-questions" href={`#/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit/Questions`}
          className={`nav-link ${pathname.includes("Questions") ? "active" : ""}`}>
          Questions
        </a>
      </li>
      </ul>

      
      <Routes>
        <Route path="/" element={<Navigate to="Details" />} />
        <Route path="Details" element={<DetailEditor />} />
        <Route path="Questions" element={<QuestionEditor />} />
      </Routes>
      
      
      
    </div>
  );
}