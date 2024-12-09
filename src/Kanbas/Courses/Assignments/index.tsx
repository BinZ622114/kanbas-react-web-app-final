import { BsGripVertical } from "react-icons/bs";
import AssignmentControls from "./AssignmentsControls";
import { TfiWrite } from "react-icons/tfi";
import AssignmentControlButton from "./AssignmentControlButton";
import AssignmentTitleControl from "./AssignmentTitleControl";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { setAssignments, deleteAssignment } from "./reducer";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";
import { useEffect, useState } from "react";

export default function Assignments() {
    const { cid } = useParams();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const fetchAssignments = async () => {
      try {
        const assignments = await coursesClient.findAssignmentsForCourse( cid as string );
        dispatch(setAssignments(assignments));
      } catch (error) {
        console.error(error);
      }
    };
    useEffect(() => {
      fetchAssignments();
    }, []);

    const removeAssignment = async (aid: string) => {
      await assignmentsClient.deleteAssignment(aid);
      dispatch(deleteAssignment(aid));
    };

    return (
      <div id="wd-assignments">
        <AssignmentControls /><br /><br /><br /><br />

        <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" /> 
              ASSIGNMENTS 
              <AssignmentTitleControl /> 
        </div>

        <ul className="wd-lessons list-group rounded-0 wd-padded-left wd-bg-color-green">
          {assignments.map((assignment: any) => (
            <li key={assignment._id} className="wd-lesson list-group-item d-flex align-items-center p-3">
              <div className="icon-container me-2">
                <BsGripVertical className="fs-3" />
                <TfiWrite className="wd-fg-color-green me-2 fs-3" />
              </div>
              <div className="assignment-details flex-grow-1">
                <strong>
                <Link to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`} className="wd-_id">
                  {assignment.title}
                </Link>
                </strong>
                <h6>
                    <Link to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`} className="wd-link wd-fg-color-red">
                      Multiple Modules
                    </Link>
                    <span className="wd-fg-color-black"> | <b>Not available until</b> {`${assignment.startDate} at 12:00am`} | <b>Due</b> {`${assignment.dueDate} at 11:59pm`} | {`${assignment.points}`} pts</span>
                </h6>
              </div>
              {currentUser.role === "FACULTY" && (
              <>
              <FaPencil onClick={() => navigate(`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`)} className="text-primary me-3" />
              <FaTrash className="text-danger me-2 mb-1" 
                       onClick={() => window.confirm("You sure delete this assignment?") && removeAssignment(assignment._id)}/>
              </>
              )}
              <div className="control-buttons">
                <AssignmentControlButton />
              </div>
           </li>
          ))}
       </ul>
      </div>
  );
}
  