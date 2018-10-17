export interface Options {
	/**
	 * Override the default fallback.
	 *
	 * @default `${text} (${url})`
	 */
	fallback?: (text: string, url: string) => string;
}

/**
 * [Supported terminals.](https://gist.github.com/egmontkob/eb114294efbcd5adb1944c9f3cb5feda)
 *
 * For unsupported terminals, the link will be printed in parens after the text: `My website (https://sindresorhus.com)`.
 *
 * @param text
 * @param url
 * @param options
 * @returns The string ready for output.
 */
export default function terminalLink(text:string, url: string, options?: Options): string;

/**
 * Check whether the terminal support links.
 *
 * Prefer just using the default fallback or the `fallback` option whenever possible.
 */
export const isSupported: boolean;
