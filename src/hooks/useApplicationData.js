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
    //if book interview --> decrease spot by 1
    //if cancel interview --> increase spot by 1

    if (action === 'book') {
      //filter through the days array and when its equal to the day of the appointment booked, decrease the count

      //const result = words.filter(word => word.length > 6)
      const updateSpots = { ...state.days };

      for (let spot in updateSpots) {
        if (updateSpots[spot].name === state.day) {
          updateSpots[spot].spots -= 1;
        }
      }

      setState({ ...state, days: [updateSpots] });
    } else if (action === 'cancel') {
      const updateSpots = { ...state.days };

      for (let spot in updateSpots) {
        if (updateSpots[spot].name === state.day) {
          updateSpots[spot].spots += 1;
        }
      }
      setState({ ...state, days: [updateSpots] });
    }
  };
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const allAppointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => setState({ ...state, appointments: allAppointments }));
    // .catch((error) => console.log(error));
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
