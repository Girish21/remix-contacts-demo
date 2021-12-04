import { hydrate } from 'react-dom'
import { RemixBrowser } from 'remix'

/**
 * Remix uses this module as the entry point for the browser bundle.
 * This is the first peiece of code that runs on the browser, and
 * we have full control over it
 *
 * https://remix.run/docs/en/v1/api/conventions#entryservertsx
 */
hydrate(<RemixBrowser />, document)
