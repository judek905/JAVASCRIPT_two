const PASS_MARK = 50;
const MAX_EXAM = 50;
const MAX_COURSEWORK = 50;

function isValidMark(mark, max) {
  return Number.isFinite(mark) && mark >= 0 && mark <= max;
}

function checkResult(examMarks, courseworkMarks) {
  if (!isValidMark(examMarks, MAX_EXAM) || !isValidMark(courseworkMarks, MAX_COURSEWORK)) {
    return "Invalid marks entered";
  }

  const total = examMarks + courseworkMarks;
  const status = total >= PASS_MARK ? "You have passed" : "You have a retake";

  return `Exam: ${examMarks}, Coursework: ${courseworkMarks}, Total: ${total}\n${status}`;
}

console.log(checkResult(30, 50));
console.log(checkResult(10, 20));
console.log(checkResult(60, 20));
