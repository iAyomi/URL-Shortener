import { BrowserRouter } from "react-router";
import AppRoutes from "./AppRoutes";
import "./tailwind.css";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
