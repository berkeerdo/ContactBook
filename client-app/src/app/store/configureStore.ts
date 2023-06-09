import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { contactSlice } from "../../features/contacts/dashboard/contactsSlice";
import themeSlice from "./themeSlice";
// export function configureStore() {
//   return createStore(counterReducer);
// }

export const store = configureStore({
  reducer: {
    contacts: contactSlice.reducer,
    theme: themeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
