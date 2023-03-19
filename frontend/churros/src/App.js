import logo from "./logo.svg";
import "./App.css";
import { Fragment } from "react";

const App = () => {
  return (
    <Fragment>
      <h1 className="text-3xl font-bold underline">Hello Tailwind CSS!</h1>
      <img src={logo} className="App-logo" alt="logo"/>
    </Fragment>
  );
};

export default App;
