import { createRoot } from 'react-dom/client';
import { App } from '~/components/app';
import '~/styles/styles.scss';

export const container = document.getElementById('root')!;
export const root = createRoot(container!);
root.render(<App />);
