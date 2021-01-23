import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import Header from "./components/Header";
import "./global.scss";

function App() {
  return (
    <Router>
      <Header />
      <Routes />
    </Router>
  );
}

export default App;
