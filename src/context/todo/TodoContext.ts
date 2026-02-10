import { createContext } from "react";

export const TodoContext = createContext<TodoContextType | null>(null);
export const TodoContextAction = createContext<TodoContextActionType | null>(null);