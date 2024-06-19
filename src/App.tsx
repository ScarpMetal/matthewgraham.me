import { Helmet } from 'react-helmet';
import MagicAppLink from '~/components/MagicAppLink';
import MagicButton from '~/components/MagicButton';
import WavyCircle from '~/components/WavyCircle';
import cryptleScreenshot from './assets/screenshots/cryptle.png';
import placeplannerScreenshot from './assets/screenshots/placeplanner.png';
import ratiocalcScreenshot from './assets/screenshots/ratiocalc.png';
import typehereScreenshot from './assets/screenshots/typehere.png';

export default function App() {
  return (
    <>
      <Helmet>
        <title>matthewgraham.me</title>
        <meta name="description" content="View Matthew Graham's projects and work experiences." />
      </Helmet>
      <WavyCircle />
      <h1 className="title">
        <div className="first">Matthew</div>
        <div className="last">Graham</div>
      </h1>

      <div className="off-links">
        <MagicButton to="https://www.linkedin.com/in/mpgraham/">LinkedIn</MagicButton>
        <MagicButton to="https://drive.google.com/file/d/1pb7zzhAA_guWRhouFy05wHD8m6BBm2Tu/view?usp=drive_link">
          Resume
        </MagicButton>
      </div>
      <div className="apps">
        <MagicAppLink title="cryptle" to="https://cryptle.matthewgraham.me/" src={cryptleScreenshot} />
        <MagicAppLink
          title="Ratio Calculator"
          to="https://ratiocalculator.matthewgraham.me/"
          src={ratiocalcScreenshot}
        />
        <MagicAppLink title="typehere" to="https://typehere.matthewgraham.me/" src={typehereScreenshot} />
        <MagicAppLink title="/r/place planner" to="https://placeplanner.web.app/" src={placeplannerScreenshot} />
      </div>
      <footer>
        <p className="copyright">Matthew Graham © {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}
