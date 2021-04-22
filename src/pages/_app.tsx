import { AppProps } from 'next/app';
import { Header } from '../components/Header';
import { Player } from '../components/Player';
import '../styles/global.scss';
import { PlayerProvider } from '../hooks/usePlayer';

import styles from '../styles/app.module.scss';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <PlayerProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerProvider>
  );
}

export default MyApp;
