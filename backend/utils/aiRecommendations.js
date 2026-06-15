function generateRecommendations(
  student
) {
  const recommendations = [];

  student.subjects.forEach(
    (subject) => {
      const marks =
        Number(subject.marks);

      if (marks < 40) {
        recommendations.push(
          `${subject.name}: Critical improvement needed. Study 1 hour daily.`
        );
      }

      else if (marks < 60) {
        recommendations.push(
          `${subject.name}: Needs improvement. Practice 30 minutes daily.`
        );
      }

      else if (marks >= 85) {
        recommendations.push(
          `${subject.name}: Excellent performance. Keep it up.`
        );
      }
    }
  );

  const attendance =
    student.attendance?.length > 0
      ? (
          student.attendance.filter(
            (a) =>
              a.status ===
              "Present"
          ).length /
          student.attendance.length
        ) * 100
      : 0;

  if (attendance < 75) {
    recommendations.push(
      "Attendance is below 75%. Improve classroom participation."
    );
  }

  if (student.percentage < 60) {
    recommendations.push(
      "Create a weekly revision plan."
    );
  }

  if (student.percentage >= 85) {
    recommendations.push(
      "Start preparing for competitive exams."
    );
  }

  return recommendations;
}

module.exports =
  generateRecommendations;