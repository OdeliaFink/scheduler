import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(updateMode, replace = false) {
    setMode(updateMode);

    if (replace) {
      setHistory([...history.slice(0, -1), updateMode]);
    } else {
      setHistory([...history, updateMode]);
    }
  }
  function back() {
    /* ... */
  }

  return { mode, transition, back };
}
