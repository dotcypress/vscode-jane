const { writeFileSync } = require('fs')
const themeTemplate = require('./theme-template')

const themes = [
  {
    id: 'jane-one',
    name: 'Jane One',
    transparent: '#00000000',
    muted: '#ffffff4d',
    background: '#2e353e',
    dropBackground: '#39424c',
    buttonBackground: '#586471',
    highlightBackground: '#ffffff10',
    foreground: '#dedeee',
    highlightForeground: '#ffffff',
    accent: '#f9b05d',
    badgeBackground: '#f9b05d',
    focusBackground: '#367bea33',
    hoverBackground: '#367bea33',
    selectionBackground: '#ffffff20',
    selectionForeground: '#ffffff',
    errorBackground: '#ff5555',
    debuggingBackground: '#925792',
    warningBackground: '#925792',
    infoBackground: '#367bea',
    popupBackground: '#495563',
    controlBackground: '#272d33',
    controlBorder: '#6f767b80',
    border: '#6f767b50',    
    black: '#252525',
    blue: '#7eaeec',
    cyan: '#57a1c7',
    green: '#99c794',
    magenta: '#d8a2d8',
    red: '#e77777',
    white: '#dedeee',
    yellow: '#f9b05d',    
    brightBlack: '#444444',
    brightBlue: '#1b87e8',
    brightCyan: '#6699cc',
    brightGreen: '#76c56d',
    brightMagenta: '#e871e8',
    brightRed: '#ff5555',
    brightWhite: '#ffffff',
    brightYellow: '#e2ca46'
  }
]

function traverse (target, variable, value) {
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

function buildTheme (setup) {
  const theme = Object.assign({}, JSON.parse(JSON.stringify(themeTemplate)))
  Object.keys(setup).forEach((key) => traverse(theme, key, setup[key])) 
  writeFileSync(`${setup.id}-theme.json`, JSON.stringify(theme, null, 2))
}

themes.forEach(buildTheme)