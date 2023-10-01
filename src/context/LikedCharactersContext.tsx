import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CharacterType } from '../apollo/queries/getCharacter';

interface LikedCharactersContextType {
  //   likedCharacters: string[];
  likedCharacters: CharacterType[];
  likeCharacter: (character: CharacterType) => void;
  unlikeCharacter: (character: CharacterType) => void;
}

const LikedCharactersContext = createContext<
  LikedCharactersContextType | undefined
>(undefined);

export const LikedCharactersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [likedCharacters, setLikedCharacters] = useState<CharacterType[]>([]);

  const likeCharacter = (character: CharacterType) => {
    const checkExistLike = likedCharacters.some((lc) => lc.id === character.id);

    if (!checkExistLike) {
      setLikedCharacters((prevLikedCharacters) => [
        ...prevLikedCharacters,
        character,
      ]);
    }
  };

  const unlikeCharacter = (character: CharacterType) => {
    setLikedCharacters((prevLikedCharacters) =>
      prevLikedCharacters.filter((c) => c.id !== character.id)
    );
  };

  return (
    <LikedCharactersContext.Provider
      value={{ likedCharacters, likeCharacter, unlikeCharacter }}
    >
      {children}
    </LikedCharactersContext.Provider>
  );
};

export const useLikedCharactersContext = () => {
  const context = useContext(LikedCharactersContext);
  if (!context) {
    throw new Error(
      'useLikedCharacters must be used within a LikedCharactersProvider'
    );
  }
  return context;
};
