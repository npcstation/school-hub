export { render };

import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../store/store';

async function render(pageContext: any) {
    const { Page } = pageContext;
    hydrateRoot(
        document.getElementById('react-root')!,

        <Provider store={store}>
            <BrowserRouter>
                <Page {...pageContext.pageProps} />
            </BrowserRouter>
        </Provider>
    );
}
