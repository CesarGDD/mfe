import { render } from "solid-js/web";
import CounterTwo from "./CounterTwo";

import "./index.scss";

const App = () => (
  <div class="mt-10 text-3xl mx-auto max-w-6xl">
    <div>Name: remote-two</div>
    <CounterTwo />
  </div>
);
render(App, document.getElementById("app"));
