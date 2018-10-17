import {expectType} from 'tsd-check';
import terminalLink from '.';
import {isSupported} from '.';

expectType<string>(terminalLink("text", "url"));
expectType<string>(terminalLink("text", "url", {fallback: (text, url)=> `[${text}](${url})`}));

expectType<boolean>(isSupported);
