import React, {useRef, useEffect} from "react";
import ReactDOM from "react-dom";

import counterWrapper from "remote/counterWrapper";
import counterTwoWrapper from "remote_two/counterTwoWrapper";

import "./index.scss";

const App = () => {
  const divRef = useRef(null)
  const divTwo = useRef(null)

  useEffect(() => {
    counterWrapper(divRef.current)
    counterTwoWrapper(divTwo.current)
  }, [])

  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      <div>Name: react-host</div>
      <div ref={divRef} ></div>
      <div ref={divTwo} ></div>
    </div>
  )
};
ReactDOM.render(<App />, document.getElementById("app"));
