const { execSync } = require('child_process')

const changed = execSync('git status')
  .toString().trim()
  .split('\n')
  .some(l => l.includes('src/') || l.includes('test/')) // src or test changed

if (changed) {
  execSync('npm run build')
  execSync('git add -A')
}
