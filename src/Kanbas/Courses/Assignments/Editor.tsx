import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
//import { assignments } from "../../Database";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from './reducer';
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid, aid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let asgmt = assignments.find((a: any) => a._id === aid);
  if (!asgmt) {
    asgmt = {
      _id: new Date().getTime().toString(),
      title: '',
      description: '',
      course: cid,
      points: 100,
      startDate: '',
      dueDate: '',
      untilDate: '',
    };
  }
  const [assignment, setAssignment] = useState(asgmt);

  const handleSave = async () => {
    if (assignments.some((a: any) => a._id === aid)) {
      const assignmentUpdates = await assignmentsClient.updateAssignment(assignment);
      dispatch(updateAssignment(assignmentUpdates));
    } else {
      const newAssignment = await coursesClient.createAssignmentForCourse(cid as string, assignment);
      dispatch(addAssignment(newAssignment));
    }
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor">
      <div className="mb-3">
        <label htmlFor="input1" className="form-label">Assignment Name</label>
        <input type="text" className="form-control" id="input1" value={assignment.title}  
               onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}/>
      </div>

      <div className="mb-3">
        <label htmlFor="wd-description" className="form-label">Assignment Description</label>
        <textarea
              id="wd-description"
              rows={4}
              className="form-control"
              value={assignment.description}
              onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
            />
      </div>
      
      {currentUser.role === "FACULTY" && (
      <>
      <div className="mb-3 row">
        <label htmlFor="points" className="col-sm-4 col-form-label text-end">Points</label>
        <div className="col-sm-8">
          <input type="text" className="form-control" id="points" value={assignment.points}
                 onChange={(e) => setAssignment({ ...assignment, points: e.target.value })} />
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="assign-group" className="col-sm-4 col-form-label text-end">
          Display Grade as
        </label>
        <div className="col-sm-8" id="assign-group">
          <select className="form-select">
            <option selected>Percentage</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="assign-group" className="col-sm-4 col-form-label text-end">Assign</label>
        <div className="col-sm-8" id="wd-assign-assign-to" style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
          <h5>Assign to</h5>
          <input type="text" className="form-control" id="assign-to" value="Everyone" /><br></br>
          <h5>Due</h5>  
          <input type="date" className="form-control" id="wd-due-date" value={assignment.dueDate} 
                 onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}/><br></br>
          <div className="row">
            <div className="col-sm-6">
              <h5>Available from</h5>
              <input type="date" className="form-control" id="wd-available-from" value={assignment.startDate}
                     onChange={(e) => setAssignment({ ...assignment, startDate: e.target.value })} />
            </div>
            <div className="col-sm-6">
              <h5>Until</h5>
              <input type="date" className="form-control" id="wd-available-until" value={assignment.untilDate}
                     onChange={(e) => setAssignment({ ...assignment, untilDate: e.target.value })}/>
            </div>
         </div>
        </div>
      </div>
      <hr />

      <button id="wd-save-btn" className="btn btn-danger me-1 float-end" onClick={ handleSave }>
        Save
      </button>
      <Link to={`/Kanbas/Courses/${cid}/Assignments`}>
        <button id="wd-cancel-btn" className="btn btn-secondary me-1 float-end">
          Cancel
        </button>
      </Link>
      </>)}

      {currentUser.role !== "FACULTY" && <button id="wd-back-btn" className="btn btn-danger me-1 float-end" 
              onClick={() => navigate(`/Kanbas/Courses/${cid}/Assignments`)}>
        Back
      </button>}


    </div>
  );
}  
  