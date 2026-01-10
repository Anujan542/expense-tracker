import { type Middleware } from '@reduxjs/toolkit';
import { saveQueue } from '../../utils/indexedDb';

function isActionWithType(
  action: unknown
): action is { type: string } {
  return (
    typeof action === 'object' &&
    action !== null &&
    'type' in action &&
    typeof (action as { type: unknown }).type === 'string'
  );
}

export const offlinePersistenceMiddleware: Middleware =
  store => next => action => {
    const result = next(action);

    if ( isActionWithType(action) && action.type.startsWith('offlineQueue/')) {
      const state = store.getState();
      saveQueue(state.offlineQueue);
    }

    return result;
  };