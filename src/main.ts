import './style.css';
import { createMainLayout } from './ui/layout/mainLayout.js';
import { initRouter } from './router/router.js';

const app = document.querySelector<HTMLDivElement>('#app') ?? document.body;
const { header, main } = createMainLayout();

app.replaceChildren(header, main);

initRouter(main);
