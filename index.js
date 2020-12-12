const { writeFileSync } = require('fs')
const janeTemplate = require('./jane-template')

const themes = [
  {
    id: 'jane-two',
    name: 'Jane Two',
    transparent: '#00000000',
    muted: '#e4e4e444',
    background: '#292929',
    dropBackground: '#39424c',
    buttonBackground: '#586471',
    highlightBackground: '#5d595c20',
    foreground: '#e0e0e0',
    highlightForeground: '#fafafa',
    accent: '#ff983d',
    badgeBackground: '#ff983d',
    focusBackground: '#367bea33',
    hoverBackground: '#367bea33',
    selectionBackground: '#5d595c30',
    selectionForeground: '#fafafa',
    errorBackground: '#ff5555',
    debuggingBackground: '#925792',
    warningBackground: '#925792',
    infoBackground: '#367bea',
    popupBackground: '#495563',
    controlBackground: '#292929',
    controlBorder: '#5d595c80',
    border: '#5d595c40',
    black: '#121212',
    blue: '#367bea',
    cyan: '#57b1c7',
    green: '#99c794',
    magenta: '#d8a2d8',
    red: '#e77777',
    white: '#e0e0e0',
    yellow: '#ffba51',
    brightBlack: '#030303',
    brightBlue: '#1b87e8',
    brightCyan: '#51c0e4',
    brightGreen: '#76c56d',
    brightMagenta: '#e871e8',
    brightRed: '#ff5653',
    brightWhite: '#fafafa',
    brightYellow: '#e8e651'
  }
]

function traverse(target, variable, value) {
  if (typeof target === 'string') {
    return target.replace(`@${variable}`, value)
  }
  if (typeof target === 'array') {
    return target.map((item) => traverse(item, variable, value))
  }
  if (typeof target === 'object') {
    return Object.keys(target).reduce((acc, key) => {
      acc[key] = traverse(acc[key], variable, value)
      return acc
    }, target)
  }
  return target
}

function buildTheme(setup) {
  const theme = Object.assign({}, JSON.parse(JSON.stringify(janeTemplate)))
  Object.keys(setup).forEach((key) => traverse(theme, key, setup[key]))
  writeFileSync(`${setup.id}-theme.json`, JSON.stringify(theme, null, 2))
}

themes.forEach(buildTheme)