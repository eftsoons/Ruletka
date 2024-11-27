import { configureStore } from "@reduxjs/toolkit";

const defaultStateFronted = { bullet: 0 };

type Store = {
  id: number;
  username: string | undefined;
  photo_url: string | undefined;
  last_name: string;
  first_name: string;
  bullet: number;
  segments: Array<string>;
  channel: Array<{ name: string; site: string; id: number }>;
};

type actionType = "SET_LASTNAME" | "SET_FIRSTNAME";

type action =
  | { type: actionType; payload: string }
  | { type: "SET_ID" | "SET_BULLET"; payload: number }
  | { type: "SET_USERNAME" | "SET_PHOTO"; payload: string | undefined }
  | { type: "SET_SEGMENTS"; payload: Array<string> }
  | {
      type: "SET_CHANNEL";
      payload: Array<{ name: string; site: string; id: number }>;
    };

const reducerData = (state = defaultStateFronted, action: action) => {
  switch (action.type) {
    case "SET_ID":
      return { ...state, id: action.payload };
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_PHOTO":
      return { ...state, photo_url: action.payload };
    case "SET_LASTNAME":
      return { ...state, last_name: action.payload };
    case "SET_FIRSTNAME":
      return { ...state, first_name: action.payload };
    case "SET_SEGMENTS":
      return { ...state, segments: action.payload };
    case "SET_CHANNEL":
      return { ...state, channel: action.payload };
    case "SET_BULLET":
      return { ...state, bullet: action.payload };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: reducerData,
});

export default store;
export type { Store };
