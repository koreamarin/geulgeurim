import { useEffect } from 'react';
import { createBrowserHistory } from 'history';
import type { Blocker, Transition } from 'history';

export const useBlocker = (blocker: Blocker, when = true): void => {
  const history = createBrowserHistory()

  useEffect(() => {
    if (!when) return () => {};

    const unblock = history.block((tx: Transition) => {
      console.log('들어옴')
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };

      blocker(autoUnblockingTx);
    });

    return unblock;
  }, [history, blocker, when]);
};
