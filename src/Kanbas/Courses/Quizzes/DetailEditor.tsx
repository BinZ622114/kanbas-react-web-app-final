
export default function DetailEditor(
  { quiz, setQuiz }: {quiz: any; setQuiz: (quiz: any) => void;}) {
  
  return (
    <div id="wd-quiz-detail-editor">
      <div className="mb-3">
        <label htmlFor="quiz-title" className="form-label">Quiz Name</label>
        <input type="text" className="form-control" id="quiz-title" value={quiz.title}  
               onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}/>
      </div>
      <div className="mb-3">
        <label htmlFor="quiz-description" className="form-label">Quiz Instructions</label>
        <textarea
              id="quiz-description"
              rows={4}
              className="form-control"
              value={quiz.description}
              onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
            />
      </div>

      <div className="mb-3 row">
        <label htmlFor="quiz-type" className="col-sm-4 col-form-label text-end">
          Quiz Type
        </label>
        <div className="col-sm-8" id="quiz-type">
          <select className="form-select" value={quiz.quizType} 
                  onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}>
            <option value="Graded Quiz">Graded Quiz</option>
            <option value="Practice Quiz">Practice Quiz</option>
            <option value="Graded Survey">Graded Survey</option>
            <option value="Ungraded Survey">Ungraded Survey</option>
          </select>
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="assignment-group" className="col-sm-4 col-form-label text-end">
          Assignment Group
        </label>
        <div className="col-sm-8" id="assignment-group">
          <select className="form-select" value={quiz.assignmentGroup} 
                  onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}>
            <option value="Quizzes">Quizzes</option>
            <option value="Exams">Exams</option>
            <option value="Assignments">Assignments</option>
            <option value="Projects">Projects</option>
          </select>
        </div>
      </div>
      <div className="mb-3 row">
        <label htmlFor="quiz-time-limit" className="col-sm-4 col-form-label text-end">{`Time Limit(minute)`}</label>
        <div className="col-sm-8">
          <input type="number" className="form-control" id="quiz-time-limit" value={quiz.timeLimit}
                 onChange={(e) => setQuiz({ ...quiz, timeLimit: Number(e.target.value) })} />
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="quiz-shuffle-answers" className="col-sm-4 col-form-label text-end">
          Shuffle Answers
          <input type="checkbox" id="quiz-shuffle-answers" checked={quiz.shuffleAnswers}
                 className="p-1 ms-2"
                 onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })} />
        </label>
      </div>
      <div className="mb-3 row">
        <label htmlFor="quiz-multiple-attempts" className="col-sm-4 col-form-label text-end">
          Allow Multiple Attempts
          <input type="checkbox" id="quiz-multiple-attempts" checked={quiz.multipleAttempts}
                 className="p-1 ms-2"
                 onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })} />
        </label>
      </div>
      <div className="mb-3 row">
        <label htmlFor="quiz-show-answers" className="col-sm-4 col-form-label text-end">
          Show Correct Answers
          <input type="checkbox" id="quiz-show-answers" checked={quiz.showCorrectAnswers}
                 className="p-1 ms-2"
                 onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.checked })} />
        </label>
      </div>
      <div className="mb-3 row">
        <label htmlFor="quiz-one-question" className="col-sm-4 col-form-label text-end">
          One Question at a Time
          <input type="checkbox" id="quiz-one-question" checked={quiz.oneQuestion}
                 className="p-1 ms-2"
                 onChange={(e) => setQuiz({ ...quiz, oneQuestion: e.target.checked })} />
        </label>
      </div>
      <div className="mb-3 row">
        <label htmlFor="webcam-required" className="col-sm-4 col-form-label text-end">
          Webcam Required
          <input type="checkbox" id="webcam-required" checked={quiz.webcamRequired}
                 className="p-1 ms-2"
                 onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.checked })} />
        </label>
      </div>
      <div className="mb-3 row">
        <label htmlFor="lock-questions" className="col-sm-4 col-form-label text-end">
          Lock Questions After Answering
          <input type="checkbox" id="lock-questions" checked={quiz.lockQuestion}
                 className="p-1 ms-2"
                 onChange={(e) => setQuiz({ ...quiz, lockQuestion: e.target.checked })} />
        </label>
      </div>

      <div className="mb-3 row">
        <label htmlFor="assign-group" className="col-sm-4 col-form-label text-end">Assign</label>
        <div className="col-sm-8" id="assign-group" style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
          <h5>Assign to</h5>
          <input type="text" className="form-control" id="assign-to" value="Everyone" /><br></br>
          <h5>Due</h5>  
          <input type="date" className="form-control" id="wd-due-date" value={quiz.dueDate} 
                 onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}/><br></br>
          <div className="row">
            <div className="col-sm-6">
              <h5>Available from</h5>
              <input type="date" className="form-control" id="wd-available-from" value={quiz.startDate}
                     onChange={(e) => setQuiz({ ...quiz, startDate: e.target.value })} />
            </div>
            <div className="col-sm-6">
              <h5>Until</h5>
              <input type="date" className="form-control" id="wd-available-until" value={quiz.untilDate}
                     onChange={(e) => setQuiz({ ...quiz, untilDate: e.target.value })}/>
            </div>
         </div>
        </div>
      </div>
      



    </div>
  );

}