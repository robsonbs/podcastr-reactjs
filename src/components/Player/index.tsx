import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Slider from 'rc-slider';
import { usePlayer } from '../../hooks/usePlayer';

import 'rc-slider/assets/index.css';
import styles from './styles.module.scss';

export function Player(): JSX.Element {
  const audioRef = useRef<HTMLAudioElement>(null);

  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    togglePlay,
    currentTime,
    duration,
    formattedCurrentTime,
    setPlayingState,
    setClickedTime,
  } = usePlayer();

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const episode = episodeList[currentEpisodeIndex];
  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      {episode ? (
        <div className={styles.currentEpisode}>
          <Image
            width={592}
            height={592}
            src={episode.thumbnail}
            objectFit="cover"
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={styles.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}

      <footer className={!episode ? styles.empty : ''}>
        <div className={styles.progress}>
          <span>{formattedCurrentTime || '00:00'}</span>

          {episode ? (
            <>
              <Slider
                trackStyle={{ backgroundColor: '#04d361' }}
                railStyle={{ background: '#9f75ff' }}
                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}
                value={currentTime}
                max={duration}
                onChange={setClickedTime}
              />
              <span>{episode.durationAsString}</span>
            </>
          ) : (
            <>
              <div className={styles.slider}>
                <div className={styles.emptySlider} />
              </div>
              <span>00:00</span>
            </>
          )}
        </div>

        {episode && (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <audio
            src={episode.url}
            ref={audioRef}
            autoPlay
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
          />
        )}
        <div className={styles.buttons}>
          <button type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button
            type="button"
            className={styles.playButton}
            disabled={!episode}
            onClick={togglePlay}>
            {isPlaying ? (
              <img src="/pause.svg" alt="Tocar" />
            ) : (
              <img src="/play.svg" alt="Tocar" />
            )}
          </button>
          <button type="button" disabled={!episode}>
            <img src="/play-next.svg" alt="Tocar próxima" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  );
}
