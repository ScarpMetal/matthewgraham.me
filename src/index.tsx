import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import Root from "./components/Root";
import "./global/styles.scss";
import configureStore, { history } from "./store/configureStore";

const store = configureStore();
console.log(document.getElementById("app"));
render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById("app")
);
