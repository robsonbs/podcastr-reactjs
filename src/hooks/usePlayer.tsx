import { createContext, ReactNode, useContext, useState } from 'react';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Array<Episode>;
  currentEpisodeIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  playNext: () => void;
  playPrev: () => void;
  setPlayingState: (state: boolean) => void;
  togglePlay: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  clearPlayerState: () => void;
};

type PlayerProviderProps = {
  children: ReactNode;
};

const PlayerContext = createContext({} as PlayerContextData);

export function PlayerProvider({ children }: PlayerProviderProps): JSX.Element {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  function play(episode: Episode): void {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number): void {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function togglePlay(): void {
    setIsPlaying(!isPlaying);
  }

  function toggleLoop(): void {
    setIsLooping(!isLooping);
  }

  function toggleShuffle(): void {
    setIsShuffling(!isShuffling);
  }

  function setPlayingState(state: boolean): void {
    setIsPlaying(state);
  }

  function clearPlayerState(): void {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  const hasPrevious = currentEpisodeIndex > 0;

  const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length;

  function playNext(): void {
    const nextEpisodeIndex = isShuffling
      ? Math.floor(Math.random() * episodeList.length) % episodeList.length
      : currentEpisodeIndex + 1;

    if (nextEpisodeIndex >= episodeList.length) return;

    setCurrentEpisodeIndex(nextEpisodeIndex);
  }

  function playPrev(): void {
    const prevEpisodeIndex = currentEpisodeIndex - 1;

    if (prevEpisodeIndex < 0 || episodeList.length === 1) return;

    setCurrentEpisodeIndex(currentEpisodeIndex - 1);
  }

  return (
    <PlayerContext.Provider
      value={{
        currentEpisodeIndex,
        episodeList,
        isPlaying,
        isLooping,
        isShuffling,
        hasPrevious,
        hasNext,
        play,
        playList,
        playNext,
        playPrev,
        setPlayingState,
        togglePlay,
        toggleLoop,
        toggleShuffle,
        clearPlayerState,
      }}>
      {children}
    </PlayerContext.Provider>
  );
}
export function usePlayer(): PlayerContextData {
  return useContext(PlayerContext);
}
