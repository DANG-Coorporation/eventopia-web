import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Ticket {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface TicketState {
  tickets: Ticket[];
}

const ticketSlice = createSlice({
  name: 'ticket',
  initialState: {
    tickets: [],
    loading: false
  } as TicketState,
  reducers: {
    addTicket: (state, action: PayloadAction<Ticket>) => {
      state.tickets.push(action.payload);
    },
    updateTicket: (state, action: PayloadAction<Ticket>) => {
      const index = state.tickets.findIndex((ticket) => ticket.id === action.payload.id);
      if (index !== -1) {
        state.tickets[index] = action.payload;
      }
    },
    removeTicket: (state, action: PayloadAction<string>) => {
      state.tickets = state.tickets.filter((ticket) => ticket.id !== action.payload);
    },
  },
});

export const { addTicket, updateTicket, removeTicket } = ticketSlice.actions;

export default ticketSlice.reducer;