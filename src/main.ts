import './style.css';
import { createMainLayout } from './ui/layout/mainLayout.js';
import { initRouter } from './router/router.js';
import { cart } from './state/cartState.js';
import { getCartCount } from './core/cart/index.js';
import { updateCartBadge } from './ui/layout/header/updateCartBadge.js';

const app = document.querySelector<HTMLDivElement>('#app') ?? document.body;
const { header, main } = createMainLayout();

app.replaceChildren(header, main);

updateCartBadge(getCartCount(cart));

initRouter(main);
