//... returns an array of appointments for that day
export default function getAppointmentsForDay(state, day) {
  let appointmentsArrayForDay = [];
  let filterAppointments = [];

  for (let specificDayObj of state.days) {
    if (specificDayObj.name === day) {
      appointmentsArrayForDay = specificDayObj.appointments;
    }
  }
  for (let appointment of appointmentsArrayForDay) {
    filterAppointments.push(state.appointments[appointment]);
  }
  return filterAppointments;
}

export default function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }

  return {
    ...interview,
    interviewer: state.interviewers[interview.interviewer],
  };
}
