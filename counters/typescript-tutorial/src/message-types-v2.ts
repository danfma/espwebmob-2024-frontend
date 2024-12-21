export const englishMessages = {
    "hello.world": "Hello world!",
    "good.morning": (name: string) => `Good morning, ${name}!`
}

export type Language = 'en' | 'pt-br' | 'en-uk';
export type MessageMap = typeof englishMessages;
export type MessagesMap = Record<Language, MessageMap>;

const messagesMap: MessagesMap = {
    "en": englishMessages,
    "en-uk": {
        "hello.world": "Hello world!",
        "good.morning": name => `Good morning, ${name}!`
    },
    "pt-br": {
        "hello.world": "Olá, mundo!",
        "good.morning": name => `Bom dia, ${name}!`
    }
}

const language: Language = 'pt-br';
const messages = messagesMap[language];

console.log(messages['good.morning']('Daniel'));
