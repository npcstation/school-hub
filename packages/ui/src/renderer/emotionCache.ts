import { createEmotionCache } from '@mantine/core';

const ssrCache = createEmotionCache({ key: 'ssr-cache' });

export default ssrCache;