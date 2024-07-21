// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

const theme = {
  /** Put your mantine theme override here */
};



export default function App({ Component, pageProps }) {
  console.log('chllaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  return (
    <MantineProvider theme={theme}>
      <Component {...pageProps} />
    </MantineProvider>
  );
}
