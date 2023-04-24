import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr/server';
import { createStylesServer, ServerStyles } from '@mantine/ssr';
import ssrCache from './emotionCache';
import { getStore } from '../store/store';
import { Provider } from 'react-redux';

export { render };
export { onBeforeRender };
export { passToClient };

const passToClient = ['pageProps'];

const stylesServer = createStylesServer(ssrCache);

async function onBeforeRender(pageContext: any) {
    const store = getStore();

    const { Page, pageProps, urlPathname } = pageContext;
    const pageHtml = renderToString(
        <Provider store={store}>
            <StaticRouter location={urlPathname}>
                <Page {...pageProps} />
            </StaticRouter>
        </Provider>
    );

    const styles = renderToStaticMarkup(<ServerStyles html={pageHtml} server={stylesServer} />);

    const PRELOADED_STATE = store.getState();

    return {
        pageContext: {
            PRELOADED_STATE,
            styles,
            pageHtml,
        },
    };
}

async function render(pageContext: any) {
    const { styles, pageHtml } = pageContext;

    return escapeInject`<!DOCTYPE html>
    <head>
    ${dangerouslySkipEscape(styles)}
    </head>
    <html>
      <body>
        <div id="react-root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;
}
