import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DayList from './DayList';
import Appointment from './appointments';
import 'components/Application.scss';

const appointments = [
  {
    id: 1,
    time: '12pm',
  },
  {
    id: 2,
    time: '1pm',
    interview: {
      student: 'Lydia Miller-Jones',
      interviewer: {
        id: 1,
        name: 'Sylvia Palmer',
        avatar: 'https://i.imgur.com/LpaY82x.png',
      },
    },
  },
];

export default function Application(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));
  const setDays = (days) => setState((prev) => ({ ...prev, days }));

  useEffect(() => {
    axios.get('api/days').then((response) => {
      setDays(response.data);
      console.log(response.data);
    });
  }, []);

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
        {appointments.map((appointment) => (
          <Appointment key={appointment.id} {...appointment} />
        ))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
