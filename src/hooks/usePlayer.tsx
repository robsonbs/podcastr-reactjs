import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  durationAsString: string;
  url: string;
};

type PlayerContextData = {
  episodeList: Array<Episode>;
  currentEpisodeIndex: number;
  isPlaying: boolean;
  currentTime: number;
  formattedCurrentTime: string;
  duration: number;
  play: (episode: Episode) => void;
  setPlayingState: (state: boolean) => void;
  setClickedTime: (time: number) => void;
  togglePlay: () => void;
};

type PlayerProviderProps = {
  children: ReactNode;
};

const PlayerContext = createContext({} as PlayerContextData);

export function PlayerProvider({ children }: PlayerProviderProps): JSX.Element {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurTime] = useState(0);
  const [formattedCurrentTime, setFormattedCurrentTime] = useState('');
  const [clickedTime, setClickedTime] = useState(0);

  useEffect(() => {
    const audio = document.querySelector('audio');
    if (!audio) return;
    // state setters wrappers
    const setAudioData = (): void => {
      setDuration(Math.floor(audio.duration));
      setCurTime(audio.currentTime);
    };

    const setAudioTime = (): void => {
      setCurTime(audio.currentTime);
      setFormattedCurrentTime(convertDurationToTimeString(audio.currentTime));
    };

    // DOM listeners: update React state on DOM events
    audio.addEventListener('loadeddata', setAudioData);

    audio.addEventListener('timeupdate', setAudioTime);

    // React state listeners: update DOM on React state changes

    if (clickedTime && clickedTime !== currentTime) {
      audio.currentTime = clickedTime;
      setClickedTime(null);
    }

    // effect cleanup
    // eslint-disable-next-line consistent-return
    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, [currentTime, clickedTime, isPlaying]);

  function play(episode: Episode): void {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function togglePlay(): void {
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean): void {
    setIsPlaying(state);
  }

  return (
    <PlayerContext.Provider
      value={{
        currentEpisodeIndex,
        episodeList,
        currentTime,
        formattedCurrentTime,
        duration,
        isPlaying,
        play,
        setPlayingState,
        setClickedTime,
        togglePlay,
      }}>
      {children}
    </PlayerContext.Provider>
  );
}
export function usePlayer(): PlayerContextData {
  return useContext(PlayerContext);
}
