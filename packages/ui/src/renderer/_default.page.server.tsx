import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr/server';
import { createStylesServer, ServerStyles } from '@mantine/ssr';
import ssrCache from './emotionCache';

export { render };
export { passToClient };

const passToClient = ['pageProps'];

const stylesServer = createStylesServer(ssrCache);

async function render(pageContext: any) {
    const { Page, pageProps, urlPathname } = pageContext;
    const pageHtml = renderToString(
        <StaticRouter location={urlPathname}>
            <Page {...pageProps} />
        </StaticRouter>
    );

    const styles = renderToStaticMarkup(<ServerStyles html={pageHtml} server={stylesServer} />);
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
