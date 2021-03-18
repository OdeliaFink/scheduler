import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DayList from './DayList';
import Appointment from './appointments';
import 'components/Application.scss';
import { getAppointmentsForDay, getInterview } from '../helpers/selectors';

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    interviewers: {},
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {},
  });
  const dailyAppointments = [];
  const setDay = (day) => setState((prev) => ({ ...prev, day }));
  const setDays = (days) => setState((prev) => ({ ...prev, days }));

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);
  const appointments = getAppointmentsForDay(
    state,
    state.day
  ).map((appointment) => <Appointment key={appointment.id} {...appointment} />);
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
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      </section>
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
