import React, { useEffect, useState } from 'react';
import Appointment from './appointments';
import DayList from './DayList';
import 'components/Application.scss';
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from '../helpers/selectors';
import useApplicationData from '../hooks/useApplicationData';

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  } = useApplicationData();
  const schedule = getAppointmentsForDay(
    state,
    state.day
  ).map((appointment) => (
    <Appointment
      id={appointment.id}
      time={appointment.time}
      interviewers={getInterviewersForDay(state, state.day)}
      bookInterview={bookInterview}
      interview={getInterview(state, appointment.interview)}
      cancelInterview={cancelInterview}
    />
  ));
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
