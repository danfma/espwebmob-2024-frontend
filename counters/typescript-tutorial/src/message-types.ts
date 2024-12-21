export type Language = 'en' | 'pt-br' | 'en-uk';

export type MessageMap = {
    ['hello.world']: string,
    ['hello.you']: string
}

export type MessagesMap = Record<Language, MessageMap>;

const messagesMap: MessagesMap = {
    "en": {
        "hello.world": "Hello world!",
        "hello.you": "Hello you!"
    },
    "en-uk": {
        "hello.world": "Hello world!",
        "hello.you": "Hello dude!"
    },
    "pt-br": {
        "hello.world": "Olá, mundo!",
        "hello.you": "Olá, mano!"
    }
}

const language: Language = 'pt-br';
const messages = messagesMap[language];

console.log(messages['hello.you']);
