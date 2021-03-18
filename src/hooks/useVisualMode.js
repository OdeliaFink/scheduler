import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  function useCustomHook() {
    function action() {}

    return { action };
  }

  return { mode };
}
