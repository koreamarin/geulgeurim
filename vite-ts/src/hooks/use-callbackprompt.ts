import type { Transition } from 'history';
import { useLocation } from "react-router";
import { useState, useCallback } from "react";

import { useBlocker } from './use-blocker';

// import { unstable_usePrompt } from 'react-router-dom';


export const useCallbackPrompt = (when: boolean): [boolean, () => void, () => void] => {
  const location = useLocation();
  const [showPrompt, setShowPrompt] = useState(false);
  const [blockedLocation, setBlockedLocation] = useState<Transition | null>(null);

  const cancelNavigation = useCallback(() => {
    setShowPrompt(false);
    setBlockedLocation(null);
  }, []);

  const blocker = useCallback(
    (tx: Transition) => {
      if (tx.location.pathname !== location.pathname) {
        setBlockedLocation(tx);
        setShowPrompt(true);
      }
    },
    [location]
  );

  const confirmNavigation = useCallback(() => {
    if (blockedLocation) {
      blockedLocation.retry();
      cancelNavigation(); // 클린업
    }
  }, [blockedLocation, cancelNavigation]);

  useBlocker(blocker, when);

  return [showPrompt, confirmNavigation, cancelNavigation];
};
