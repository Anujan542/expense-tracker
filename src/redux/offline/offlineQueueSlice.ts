/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type OfflineAction = "CREATE" | "UPDATE" | "DELETE";

export interface offlineActions{
    type: OfflineAction;
    payload: any;   
    timestamp: number;
}

const offlineQueueSlice = createSlice({

    name: 'offlineQueue',
    initialState: [] as offlineActions[],
    reducers: {
        enqueue: (state, action: PayloadAction<offlineActions>) => {
            state.push(action.payload); 
        },
        dequeue: (state) => {
            state.shift(); 
        },
        clearQueue: () => {
            return []; 
        },
    },
});

export const { enqueue, dequeue, clearQueue } = offlineQueueSlice.actions;
export default offlineQueueSlice.reducer;