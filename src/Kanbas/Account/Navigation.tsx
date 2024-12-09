import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const { pathname } = useLocation();

  return (
    <div id="wd-account-navigation">
      {links.map((link) => (
        <div key={link}>
          <Link
            to={`/Kanbas/Account/${link}`}
            className={pathname.includes(`${link}`) ? "active-link" : ""}
          >
            {link}
          </Link>
        </div>
      ))}
      {currentUser && currentUser.role === "ADMIN" && (
       <Link to={`/Kanbas/Account/Users`} className={`list-group-item ${pathname.includes("Users") ? "active-link" : ""}`}> Users </Link> )}
    </div>
);}
