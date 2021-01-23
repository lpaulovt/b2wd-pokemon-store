import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import "./global.scss";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes />
    </Router>
  );
}

export default App;
