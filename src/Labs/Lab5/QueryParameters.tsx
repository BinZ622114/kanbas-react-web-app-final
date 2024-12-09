import React, { useState } from "react";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export default function QueryParameters() {
  const [a, setA] = useState("20");
  const [b, setB] = useState("5");
  return (
    <div id="wd-query-parameters">
      <h3>Query Parameters</h3>
      <input className="form-control mb-2" id="wd-query-parameter-a" type="number" defaultValue={a}
             onChange={(e) => setA(e.target.value)}/>
      <input className="form-control mb-2" id="wd-query-parameter-b" type="number" defaultValue={b}
             onChange={(e) => setB(e.target.value)}/>
      <a className="btn btn-primary me-2" id="wd-query-parameter-add"
         href={`${REMOTE_SERVER}/lab5/calculator?operation=add&a=${a}&b=${b}`}>
         Add {a} + {b}
      </a>
      <a className="btn btn-danger me-2" id="wd-query-parameter-subtract" 
         href={`${REMOTE_SERVER}/lab5/calculator?operation=subtract&a=${a}&b=${b}`}>
         Substract {a} - {b}
      </a>
      <a className="btn btn-success me-2" id="wd-query-parameter-multiply"
         href={`${REMOTE_SERVER}/lab5/calculator?operation=multiply&a=${a}&b=${b}`}>
         Multiply {a} * {b}
      </a>
      <a className="btn btn-warning me-2" id="wd-query-parameter-divide"
         href={`${REMOTE_SERVER}/lab5/calculator?operation=divide&a=${a}&b=${b}`}>
         Divide {a} / {b}
      </a>
      <hr />
    </div>
  );
}
