import { Provider } from "jotai";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

import logoSVG from "../assets/logo.svg";
import ContactPage from "./components/ContactPage";
import ExperiencesPage from "./components/containers/ExperiencesPage";
import ProjectsPage from "./components/containers/ProjectsPage";
import HomePage from "./components/HomePage";
import NavbarItems from "./components/NavbarItems";
import NotFoundPage from "./components/NotFoundPage";

export default function App() {
  return (
    <Provider>
      <BrowserRouter>
        <nav className="main-nav">
          <Link className="logo" to="/">
            <img src={logoSVG} />
          </Link>
          <Switch>
            <Route
              path="/admin"
              component={() => (
                <span className="admin-console-label">Admin Console</span>
              )}
            />
            <Route component={NavbarItems} />
          </Switch>
        </nav>
        <Switch>
          <Route exact path="/" component={HomePage} />
          {/* <Route path="/admin" component={AdminPage} /> */}
          <Route path="/projects" component={ProjectsPage} />
          <Route path="/experience" component={ExperiencesPage} />
          <Route path="/contact" component={ContactPage} />
          <Route component={NotFoundPage} />
        </Switch>
        <footer className="main-footer">
          <p>
            Copyright © {new Date().getFullYear()} Matthew Graham •{" "}
            <a href="#">Privacy & Terms</a>
          </p>
        </footer>
      </BrowserRouter>
    </Provider>
  );
}
