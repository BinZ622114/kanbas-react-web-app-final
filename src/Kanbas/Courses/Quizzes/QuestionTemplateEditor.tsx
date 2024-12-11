import { useDispatch, useSelector } from "react-redux";
import { setQuestions, deleteQuestion, updateQuestion, addQuestion } from "./questionsReducer";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import * as questionsClient from "./Questions/client";


export default function QuestionTemplateEditor() {
    const{ cid, qid, questionId } = useParams();
    const { questions } = useSelector((state: any) => state.questionsReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    let ques = questions.find((q: any) => q._id === questionId);
    if (!ques) {
        ques = { _id: "123", title: "Enter the Name of New Question", description: "Enter the text of new question ",
                quiz:`${qid}`, points: 4, questionType: "Multiple Choice", 
                multipleChoiceOptions: ["Option1", "Option2", "Option3", "Option4"], 
                multipleChoiceAnswer: [], trueFlaseAnswer: false, fillBlankAnswer: []};
    }
    const [question, setQuestion] = useState<any>(ques);

    const handleUpdateQuestion = async () => {
        const updatedQuestion = await questionsClient.updateQuestion(question);
        dispatch(updateQuestion(updatedQuestion));
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit/Questions`);
      };


    return (
      <div id="question-template-editor">
        <div id="template-editor-header" className="row mb-3">
          <input type="text" style={{ width: "300px" }} id="question-title" 
                 value={question.title} className="form-control col-sm-3"
                 onChange={(e) => setQuestion({ ...question, title: e.target.value })}/>
          <div className="col-sm-2" id="question-type">
            <select className="form-select" value={question.questionType} 
                    onChange={(e) => setQuestion({ ...question, questionType: e.target.value })}>
              <option value="Multiple Choice">Multiple Choice</option>
              <option value="True/Flase">True/Flase</option>
              <option value="Fill Blank">Fill Blank</option>
            </select>
          </div>   
          <label className="col-sm-1 float-end"> 
            <b>Points</b>
          </label>
          <input type="text" id="question-points" value={question.points} className="col-sm-1 float-end" 
                 onChange={(e) => setQuestion({ ...question, points: Number(e.target.value) })} />
        </div><hr />

        <p>Enter your question text below, and then define all of correct answers.</p>
        <div className="mb-3">
          <label htmlFor="question-text" className="form-label"><b>Question:</b></label>
          <textarea
              id="question-text"
              rows={5}
              className="form-control"
              value={question.description}
              onChange={(e) => setQuestion({ ...question, description: e.target.value })}
          />
       </div><br />

       <div className="mb-3"><b>Answer:</b></div>
       {question.questionType === "Multiple Choice" && (
          <>
          <div className="mb-3 row">
            <label htmlFor="multiple-choice-1" className="col-sm-1 col-form-label">
              Choice 1 </label>
            <input type="text" id="multiple-choice-1" className=" col-sm-4"
                   onChange={(e) => setQuestion({ ...question, multipleChoiceOptions: question.multipleChoiceOptions.map((
                                                  value:String, index:Number) => index === 0 ? e.target.value : value) })} />
          </div>
          <div className="mb-3 row">
            <label htmlFor="multiple-choice-2" className="col-sm-1 col-form-label">
              Choice 2 </label>
            <input type="text" id="multiple-choice-2" className=" col-sm-4"
                   onChange={(e) => setQuestion({ ...question, multipleChoiceOptions: question.multipleChoiceOptions.map((
                                                  value:String, index:Number) => index === 1 ? e.target.value : value) })} />
          </div>
          <div className="mb-3 row">
            <label htmlFor="multiple-choice-3" className="col-sm-1 col-form-label">
              Choice 3 </label>
            <input type="text" id="multiple-choice-3" className=" col-sm-4"
                   onChange={(e) => setQuestion({ ...question, multipleChoiceOptions: question.multipleChoiceOptions.map((
                                                  value:String, index:Number) => index === 2 ? e.target.value : value) })} />
          </div>
          <div className="mb-3 row">
            <label htmlFor="multiple-choice-4" className="col-sm-1 col-form-label">
              Choice 4 </label>
            <input type="text" id="multiple-choice-4" className=" col-sm-4"
                   onChange={(e) => setQuestion({ ...question, multipleChoiceOptions: question.multipleChoiceOptions.map((
                                                  value:String, index:Number) => index === 3 ? e.target.value : value) })} />
          </div>

          <div className="mb-3"><b>Correct Answers:</b></div>
          <button id="wd-add-multiple-answer" className="btn btn-primary me-1">
            Add Correct Answer
          </button>
          <ul id="multilpe-choice-answers" className="list-group rounded-0">
          {question.multipleChoiceAnswer
            .map((answer: String, i:Number) => (
              <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                <input type="text" className="col-sm-4"
                       onChange={(e) => setQuestion({ ...question, multipleChoiceAnswer: question.multipleChoiceAnswer.map((
                                                  value:String, index:Number) => index === i ? e.target.value : value) })} />
              </li>
          ))}
          </ul>
          </>
        )}

        {question.questionType === "True/False" && (
          <div className="mb-3 row">
            <label htmlFor="trueFlase-answer" className="col-sm-4 col-form-label text-end">
              True
              <input type="checkbox" id="trueFalse-answer" checked={question.trueFlaseAnswer}
                   className="p-1 ms-2"
                   onChange={(e) => setQuestion({ ...question, trueFalseAnswer: e.target.checked })} />
            </label>
          </div>
        )}


     
        <button id="wd-update-question" className="btn btn-danger me-1 float-end" onClick={ handleUpdateQuestion }>
          Update Question
        </button>
        <button id="wd-cancel-btn" className="btn btn-secondary me-1 float-end" 
                onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit/Questions`)}>
          Cancel
        </button>

      </div>
    );
}