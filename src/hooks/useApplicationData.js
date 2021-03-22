import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  // const dailyAppointments = [];
  const setDay = (day) => setState((prev) => ({ ...prev, day }));
  // const setDays = (days) => setState((prev) => ({ ...prev, days }));

  const spotCounter = (action) => {
    // if (action === 'book') {
    //   const updateSpots = { ...state.days };
    //   for (let spot in updateSpots) {
    //     if (updateSpots[spot].name === state.day) {
    //       updateSpots[spot].spots -= 1;
    //     }
    //   }

    //   setState({ ...state, days: [updateSpots] });
    // } else if (action === 'cancel') {
    //   const updateSpots = { ...state.days };

    //   for (let spot in updateSpots) {
    //     if (updateSpots[spot].name === state.day) {
    //       updateSpots[spot].spots += 1;
    //     }
    //   }
    //   setState({ ...state, days: [updateSpots] });
    // }

    const copyOfDaysArray = [...state.days];
    const modifier = action === 'book' ? -1 : 1;

    for (let day in copyOfDaysArray) {
      if (copyOfDaysArray[day].name === state.day) {
        copyOfDaysArray[day].spots += modifier;
      }
    }
    setState({ ...state, days: copyOfDaysArray });
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    spotCounter('book');
    // return axios
    //   .put(`/api/appointments/${id}`, { interview })
    //   .then(() => setState({ ...state, appointments: allAppointments }));
    // .catch((error) => console.log(error));

    // const getSpotsForDay = (day) =>
    //   day.appointments.length -
    //   day.appointments.reduce(
    //     (count, id) => (appointments[id].interview ? count + 1 : count),
    //     0
    //   );

    // const days = state.days.map((day) => {
    //   return day.appointments.includes(id)
    //     ? {
    //         ...day,
    //         spots: getSpotsForDay(day),
    //       }
    //     : day;
    // });

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => setState({ ...state, appointments: appointments }));
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const allAppointments = {
      ...state.appointments,
      [id]: appointment,
    };
    spotCounter('cancel');
    return axios
      .delete(`api/appointments/${id}`)
      .then(() => setState({ ...state, appointments: allAppointments }));
  }

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
  return { state, setDay, bookInterview, cancelInterview };
}
