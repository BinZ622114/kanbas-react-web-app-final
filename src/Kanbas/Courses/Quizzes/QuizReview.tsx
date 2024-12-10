import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as quizzesClient from "./client";
import { useSelector } from "react-redux";

export default function QuizReview() {
    const{ cid, qid } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [currentQuiz, setCurrentQuiz] = useState<any>({});

    const loadQuiz = async () => {
        try {
          const quiz = await quizzesClient.findQuiz( qid as string );
          setCurrentQuiz(quiz);
        } catch (error) {
          console.error(error);
        }
    };
    useEffect(() => {
        loadQuiz();  
      }, []);
    
    if (currentUser.role === "STUDENT") {
        return (<p>Unauthorized</p>);
    }
    
    return (
        <div id="wd-quiz-review">
          <div id="wd-review-title-control" className="d-flex justify-content-center align-items-center">
            <button id="wd-quiz-preview-btn" className="btn btn-lg btn-secondary me-4"
                    onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`)} >
              Preview
            </button>
            <button id="wd-quiz-edit-btn" className="btn btn-lg btn-secondary me-4"
                    onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit`)} >
              Edit
            </button>
          </div>
          <hr/>
          <h3>{currentQuiz.title}</h3><br /><br />

          <div id="wd-quiz-detail-table" className="table-responsive custon-quiz-table">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <th>Quiz Type</th>
                    <td>{currentQuiz.quizType}</td>
                  </tr>
                  <tr>
                    <th>Points</th>
                    <td>{currentQuiz.points}</td> 
                  </tr>
                  <tr>
                    <th>Assignment Group</th>
                    <td>{currentQuiz.assignmentGroup}</td>
                  </tr>
                  <tr>
                    <th>Shuffle Answers</th>
                    <td>{`${currentQuiz.shuffleAnswers}`}</td>
                  </tr>
                  <tr>
                    <th>Time Limit</th>
                    <td>{`${currentQuiz.timeLimit} Minutes`}</td>
                  </tr>
                  <tr>
                    <th>Multiple Attempts</th>
                    <td>{`${currentQuiz.multipleAttempts}`}</td>
                  </tr>
                  <tr>
                    <th>Show Correct Answers</th>
                    <td>{`${currentQuiz.showCorrectAnswers}`}</td>
                  </tr>
                  <tr>
                    <th>One Question at a Time</th>
                    <td>{`${currentQuiz.oneQuestion}`}</td>
                  </tr>
                  <tr>
                    <th>Webcam Required</th>
                    <td>{`${currentQuiz.webcamRequired}`}</td>
                  </tr>
                  <tr>
                    <th>Lock Questions After Answering</th>
                    <td>{`${currentQuiz.lockQuestion}`}</td>
                  </tr>
                </tbody>
              </table>
          </div>

          <div id="wd-quiz-time-table">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Due</th>
                  <th>For</th>
                  <th>Available from</th>
                  <th>Until</th>
                </tr>
              </thead>
              <tbody>
                <tr >
                  <td>{`${currentQuiz.dueDate} at 11:59pm`}</td>
                  <td>Everyone</td>
                  <td>{`${currentQuiz.startDate} at 12:00am`}</td>
                  <td>{`${currentQuiz.untilDate} at 11:59pm`}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr />

        </div>
    );
}