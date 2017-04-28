import { JSDOM, VirtualConsole } from 'jsdom'

if (typeof document === 'undefined') {
  const virtualConsole = new VirtualConsole()
  virtualConsole.sendTo(console)
  const dom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: 'http://example.com/',
    referrer: 'http://example.com/',
    contentType: 'text/html',
    // userAgent: 'Mellblomenator/9000',
    includeNodeLocations: true,
    virtualConsole,
  })
  global.window = dom.window
  global.document = window.document
  global.navigator = window.navigator
}

process.env.NODE_ENV = 'test'
