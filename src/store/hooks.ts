import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store";

// Create a typed version of useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();