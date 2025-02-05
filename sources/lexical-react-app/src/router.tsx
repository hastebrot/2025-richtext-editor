import { createHashRouter } from "react-router-dom";
import { IndexPage } from "./pages/IndexPage";
import { PlaintextDemo } from "./pages/PlaintextDemo";

export const router = createHashRouter([
  { path: "/", element: <IndexPage /> },
  { path: "/demos/plaintext", element: <PlaintextDemo /> },
]);
