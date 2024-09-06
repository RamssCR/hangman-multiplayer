import { generate } from 'random-words'

export function generateWord() {
    const fetchedWord = generate()
    const word = fetchedWord.toUpperCase()
    const spliitedWord = word.split('')
    const wordLength = spliitedWord.length

    return {
        word,
        gameWord: spliitedWord,
        wordLength
    }
}