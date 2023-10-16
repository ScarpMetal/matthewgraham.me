import { Provider } from "jotai";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

import logoSVG from "~/assets/logo.svg";
import { ContactPage } from "~/components/contact";
import { ExperiencesPage } from "~/components/experiences";
import { HomePage } from "~/components/home";
import { NavbarItems } from "~/components/navbar";
import { NotFoundPage } from "~/components/notfound";
import { ProjectsPage } from "~/components/projects";

export default function App() {
  return (
    <Provider>
      <BrowserRouter>
        <nav className="main-nav">
          <Link className="logo" to="/">
            <img src={logoSVG} alt="logo" />
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
          <Route path="/projects" component={ProjectsPage} />
          <Route path="/experience" component={ExperiencesPage} />
          <Route path="/contact" component={ContactPage} />
          <Route component={NotFoundPage} />
        </Switch>
        <footer className="main-footer">
          <p>Copyright © {new Date().getFullYear()} Matthew Graham</p>
        </footer>
      </BrowserRouter>
    </Provider>
  );
}
