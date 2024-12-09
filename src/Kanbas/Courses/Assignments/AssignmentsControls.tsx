import { FaPlus } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate, useParams} from "react-router-dom";

export default function AssignmentControls() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { cid } = useParams<{ cid: string }>();
    const navigate = useNavigate();
    return (
      <div id="wd-assignments-controls">
        <IoSearchOutline className="position-relative" style={{ bottom: "1px" }} />
        <input id="wd-assignment-search" placeholder="Search..." />
        <button id="wd-add-group" className="btn btn-lg btn-secondary me-1 float-end">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Group
        </button>
        {currentUser.role === "FACULTY" &&
        <button id="wd-add-assignment" className="btn btn-lg btn-danger me-1 float-end"
                onClick={() => navigate(`/Kanbas/Courses/${cid}/Assignments/new`)}>
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Assignment
        </button>}
      </div>
    );
}