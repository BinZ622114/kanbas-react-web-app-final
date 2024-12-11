import { Route, Routes, Navigate, useLocation, useNavigate } from "react-router";
import DetailEditor from "./DetailEditor";
import QuestionEditor from "./QuestionEditor";
import { useParams } from "react-router-dom";
import { IoEllipsisVertical } from "react-icons/io5";
import { useEffect, useState } from "react";
import * as quizzesClient from "./client";
import { useDispatch, useSelector } from "react-redux";
import { setQuizzes, deleteQuiz, updateQuiz, addQuiz } from "./reducer";
import QuestionTemplateEditor from "./QuestionTemplateEditor";

export default function QuizEditor() {
  const { pathname } = useLocation();
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const dispatch = useDispatch();

  let theQuiz = quizzes.find((q: any) => q._id === qid);
  if (!theQuiz) {
    theQuiz = { _id: "123", title: "New Quiz", description: "Create a new quiz", published: false, 
              course:`${cid}`, points: 0, startDate: "2024-09-01", 
              dueDate: "2024-12-10", untilDate: "2024-12-15", shuffleAnswers: true,
              timeLimit: 20, multipleAttempts: false, showCorrectAnswers: false,
              accessCode: "", oneQuestion: true, webcamRequired: false, lockQuestion: false,
              assignTo: "Everyone"};
  }
  const [quiz, setQuiz] = useState<any>(theQuiz);
  
    
  const handleSave = async () => {
    const updatedQuiz = await quizzesClient.updateQuiz(quiz);
    dispatch(updateQuiz(updatedQuiz));
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/review`);
  };
  const handleSaveAndPublish = async () => {
    setQuiz({...quiz, published: true});
    const updatedQuiz = await quizzesClient.updateQuiz(quiz);
    dispatch(updateQuiz(updatedQuiz));
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };
  
  return (
    <div>
      <div id="wd-quiz-editor-header" className="quiz-editor p-4">
        <IoEllipsisVertical className="fs-4 float-end" size={20} />
        <div className="fs-4 float-end me-3">
          <p>{`Points: ${quiz.points}`}</p>
        </div>
      </div><br />

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
        <Route path="Details" element={<DetailEditor
                                        quiz={quiz}
                                        setQuiz={setQuiz} />} />
        <Route path="Questions" element={<QuestionEditor />} />
        <Route path="Questions/:questionId" element={<QuestionTemplateEditor />} />
      </Routes>
      <hr />





      <button id="wd-save-publish-btn" className="btn btn-danger me-1 float-end" onClick={ handleSaveAndPublish  }>
        Save and Publish
      </button>
      <button id="wd-save-btn" className="btn btn-danger me-1 float-end" onClick={ handleSave }>
        Save
      </button>
      <button id="wd-cancel-btn" className="btn btn-secondary me-1 float-end" 
              onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes`)}>
        Cancel
      </button>
        
    </div>
  );
}