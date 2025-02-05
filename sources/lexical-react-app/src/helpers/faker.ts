import { randWord } from "@ngneat/falso";

export const fakeWords = (words: number, capitalize = false): string => {
  const text = randWord({ length: words }).join(" ");
  return capitalize ? capitalizeText(text) : text;
};

export const fakeSentences = (sentences: number, words: number, capitalize = false): string => {
  const text = [...Array(sentences).keys()]
    .map(() => {
      const text = randWord({ length: words }).join(" ") + ".";
      return capitalize ? capitalizeText(text) : text;
    })
    .join(" ");
  return text;
};

const capitalizeText = (text: string): string => {
  return text.slice(0, 1).toUpperCase() + text.slice(1);
};
