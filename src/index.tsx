import { createRoot } from 'react-dom/client';
import 'react18-json-view/src/dark.css';
import 'react18-json-view/src/style.css';
import App from './App';
import './styles.scss';
import './utils/overrides';

export const container = document.getElementById('root')!;
export const root = createRoot(container!);
root.render(<App />);
