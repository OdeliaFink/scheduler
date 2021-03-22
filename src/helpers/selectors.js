//... returns an array of appointments for that day
function getAppointmentsForDay(state, day) {
  let arrAppointmentsForDay = [];
  let filteredAppointment = [];

  for (let objSpecificDay of state.days) {
    if (objSpecificDay.name === day) {
      arrAppointmentsForDay = objSpecificDay.appointments;
    }
  }
  for (let appointment of arrAppointmentsForDay) {
    filteredAppointment.push(state.appointments[appointment]);
  }
  console.log('filtered apt', filteredAppointment);
  return filteredAppointment;
}

function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }

  const result = {
    ...interview,
    interviewer: state.interviewers[interview.interviewer],
  };
  console.log('result', result);
  return result;
}

function getInterviewersForDay(state, day) {
  let arrInterviewersForDay = [];
  let filteredInterviewers = [];

  for (let objSpecificDay of state.days) {
    if (objSpecificDay.name === day) {
      arrInterviewersForDay = objSpecificDay.interviewers;
    }
  }
  for (let interviewer of arrInterviewersForDay) {
    filteredInterviewers.push(state.interviewers[interviewer]);
  }
  console.log('filtered interviewers', filteredInterviewers);
  return filteredInterviewers;
}

export { getAppointmentsForDay, getInterview, getInterviewersForDay };
