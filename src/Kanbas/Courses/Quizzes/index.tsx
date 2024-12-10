import { BsGripVertical } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setQuizzes, deleteQuiz, updateQuiz, addQuiz } from "./reducer";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import * as userClient from "../../Account/client";
import { useEffect, useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaPlus } from "react-icons/fa";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import { FaBan } from "react-icons/fa";
import { GoTriangleDown, GoTriangleRight } from "react-icons/go";

export default function Quizzes() {
    const { cid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [showQuizMenu, setShowQuizMenu] = useState<string>("");
    const [expandQuizList, setExpandQuizList] = useState(true);
    const [showCopyQuizMenu, setShowCopyQuizMenu] = useState(false);
    const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);

    const fetchQuizzes = async () => {
      try {
        const quizzes = await coursesClient.findQuizzesForCourse( cid as string );
        dispatch(setQuizzes(quizzes));
      } catch (error) {
        console.error(error);
      }
    };
    const fetchEnrolledCourses = async () => {
      try {
        const enrolledCourses = await userClient.findMyCourses();
        setEnrolledCourses(enrolledCourses);
      } catch (error) {
        console.error(error);
      }
    };
    useEffect(() => {
      fetchQuizzes();
      fetchEnrolledCourses();
    }, [currentUser]);

    const createQuiz = async (courseId: string) => {
      const quizTemplate = { _id: "123", title: "New Quiz", description: "Create a new quiz", published: false, 
                           course: courseId, points: 0, startDate: "2024-09-01", 
                           dueDate: "2024-12-10", untilDate: "2024-12-15", shuffleAnswers: true,
                           timeLimit: 20, multipleAttempts: false, showCorrectAnswers: false,
                           accessCode: "", oneQuestion: true, webcamRequired: false, lockQuestion: false,
                           assignTo: "Everyone"};
      const newQuiz = await quizzesClient.createQuiz(quizTemplate);
      dispatch(addQuiz(newQuiz));

      navigate(`/Kanbas/Courses/${cid}/Quizzes/${newQuiz._id}/review`);
    }; 

    const removeQuiz = async (quizId: string) => {
        await quizzesClient.deleteQuiz(quizId);
        dispatch(deleteQuiz(quizId));
    }; 

    const copyQuiz = async (quiz: any, courseId: string) => {
        const newQuiz = {...quiz, course: courseId};
        await quizzesClient.createQuiz(newQuiz);
    }; 

    const togglePublish = async (quiz: any) => {
        const newQuiz = { ...quiz, published : !quiz.published };
        await quizzesClient.updateQuiz(newQuiz);
        dispatch(updateQuiz(newQuiz));

    };

    const getQuizAvailability = (quiz: any) => {
        const currentDate = new Date();
        if (currentDate < new Date(quiz.startDate)) {
            return (
                <span> <b>Not available until</b> {`${quiz.startDate} at 12:00am`} </span>
            );
        } else if (currentDate > new Date(quiz.untilDate)) {
            return (
                <span> <b>Closed</b> </span>
            );
        } else {
            return (
                <span> <b>Available until</b> {`${quiz.untilDate} at 11:59pm`} </span>
            );
        }
    }

    return (
      <div id="wd-quizzes">
        <div id="wd-quizzes-controls">
          <input id="wd-quizzes-search" placeholder="Search for Quiz" />
          {currentUser.role === "FACULTY" && (
            <div id="wd-quizzes-add-controls">
              <IoEllipsisVertical className="fs-4 float-end" />
              <button id="wd-add-quiz" className="btn btn-lg btn-danger me-1 float-end"
                      onClick={ () => createQuiz(cid as string) }>
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Quiz
              </button>
            </div>
          )}
        </div>
        <br /><br /><br /><br />

        <div id="wd-quizzes-list-header" className="wd-title p-3 ps-2 bg-secondary">
          <button className="btn me-1"
                  onClick={() => {setExpandQuizList(!expandQuizList)}}>
            {expandQuizList ? <GoTriangleDown /> : <GoTriangleRight /> } 
            Assignment Quizzes
          </button>
        </div>

        { expandQuizList && (
        <ul id="wd-quizzes-list" className="wd-lessons list-group rounded-0 wd-padded-left wd-bg-color-green">
          {(currentUser.role === "FACULTY" ? quizzes : quizzes.filter((q: any) => q.published))
            .map((quiz: any) => (
            <li key={quiz._id} className="wd-lesson list-group-item d-flex align-items-center p-3">
              <div className="icon-container me-2">
                <BsFillRocketTakeoffFill className="wd-fg-color-green me-2 fs-3"/>
              </div>
              <div id="wd-quizzes-item" className="quiz-details flex-grow-1">
                <Link to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/review`} >
                  {quiz.title}
                </Link>
                <h6>
                    <span className="wd-fg-color-black"> {getQuizAvailability(quiz)} | <b>Due</b> {`${quiz.dueDate} at 11:59pm`} | {`${quiz.points}`} pts | {`${quiz.questions}`} questions</span>
                </h6>
              </div>
              {currentUser.role === "FACULTY" && (
                <div id="wd-quiz-menu" className="control-buttons float-end">
                  <button className="btn me-1 float-end item"
                          onClick={() => setShowQuizMenu(showQuizMenu === "" ? quiz._id : "")} >
                        <IoEllipsisVertical className="fs-4" />
                  </button>
                  { showQuizMenu === quiz._id && (
                    <div className="dropdown-menu show position-absolute" style={{ top: 0, right: 0, }}>
                      <button className="dropdown-item" onClick={ () => {setShowQuizMenu(""); navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/review`)} }>
                        Edit
                      </button>
                      <button className="dropdown-item" onClick={() => {removeQuiz(quiz._id); setShowQuizMenu("")}}>
                        Delete
                      </button>
                      <button className="dropdown-item" onClick={() => {togglePublish(quiz); setShowQuizMenu("")}}>
                        {quiz.published ? "Unpublish" : "Publish"}
                      </button>

                      <button className="dropdown-item" onClick={() => setShowCopyQuizMenu(true) }>
                        Copy Quiz
                      </button>
                      { showCopyQuizMenu && (
                        <div id="wd-copy-options" className="dropdown-menu show position-absolute" style={{bottom:0, right:160,}}>
                          <h6 className="centered-text"> <b>To below courses</b> </h6>
                          { enrolledCourses.map((course: any) => (
                                <button className="dropdown-item" onClick={ () => {copyQuiz(quiz, course._id); setShowCopyQuizMenu(false); setShowQuizMenu("")} }>
                                  {course.name}
                                </button>
                              ))
                          }
                          <button className="dropdown-item" onClick={ () => setShowCopyQuizMenu(false) }> 
                            Back 
                          </button>
                        </div>
                      )}

                      <button className="dropdown-item" onClick={() => setShowQuizMenu("") }>
                        Cancel
                      </button>
                    </div>
                  )}
                  {quiz.published ? <GreenCheckmark /> : <FaBan style={{ color: 'red' }} /> }
                </div>
              )}
            </li>
          ))}
        </ul>
        )}
      </div>
  );
}