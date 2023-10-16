import { Provider } from 'jotai';
import { Helmet } from 'react-helmet';

import { ContactPage } from '~/components/contact';
import { ExperiencesPage } from '~/components/experiences';
import Footer from '~/components/footer';
import { HomePage } from '~/components/home';
import { Navbar } from '~/components/navbar';
import { ProjectsPage } from '~/components/projects';
import { SocialSidebar } from '~/components/socials';

export default function App() {
  return (
    <Provider>
      <Helmet>
        <title>matthewgraham.me</title>
        <meta name="description" content="View a few of Matthew Graham's best projects and work experiences." />
      </Helmet>
      <Navbar />
      <HomePage />
      <SocialSidebar />
      <ProjectsPage />
      <ExperiencesPage />
      <ContactPage />
      <Footer />
    </Provider>
  );
}
