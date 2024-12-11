import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as quizzesClient from "./client";
import { useEffect, useState } from "react";
import { MdOutlineAssignment } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import * as questionsClient from "./Questions/client";
import { setQuestions, deleteQuestion, updateQuestion, addQuestion } from "./questionsReducer";

export default function QuestionEditor() {
  const { cid, qid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questions } = useSelector((state: any) => state.questionsReducer);

  const fetchQuestions = async () => {
    try {
      const questions = await quizzesClient.findQuestionsForQuiz( qid as string );
      dispatch(setQuestions(questions));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchQuestions();
  }, [qid]);

  const removeQuestion = async (questionId: string) => {
    await questionsClient.deleteQuestion(questionId);
    dispatch(deleteQuestion(questionId));
  };

  return (
    <div id="wd-question-editor">
       <div className="d-flex justify-content-center">
        <button className="btn btn-secondary" 
                onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit/Questions/new`)}>
          + New Question
        </button>
      </div>

      <ul className="wd-lessons list-group rounded-0 wd-padded-left wd-bg-color-green">
          {questions.map((question: any) => (
            <li key={question._id} className="wd-lesson list-group-item d-flex align-items-center p-3">
              <div className="icon-container me-2">
                <MdOutlineAssignment className="wd-fg-color-green me-2 fs-3" />
              </div>
              <div className="assignment-details flex-grow-1">
                <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit/Questions/${question._id}`} className="wd-_id">
                  {question.title}
                </Link>
              </div>
              <FaTrash className="text-danger me-2 mb-1" onClick={() => removeQuestion(question._id)}/>  
            </li>
          ))}
      </ul>




    </div>
  );
}