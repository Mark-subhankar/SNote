//Context API allows data to be passed through a component tree without having to pass props manually at every level

import { createContext } from "react";

const NoteContext = createContext();

export default NoteContext;