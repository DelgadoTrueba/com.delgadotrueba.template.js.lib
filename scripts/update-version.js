const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, '../package.json');
const changelogPath = path.resolve(__dirname, '../CHANGELOG.md');

const packageData = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const currentVersion = packageData.version;

const updatePatchVersion = () => {
  const [major, minor, patch] = currentVersion.split('.');

  const newPatch = (parseInt(patch, 10) + 1).toString();

  newVersion = `${major}.${minor}.${newPatch}`;

  packageData.version = newVersion;

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageData, null, 2));
};

function updateVersionInChangelog() {
  try {
    const fileContent = fs.readFileSync(changelogPath, 'utf8');

    const lines = fileContent.split('\n');

    const index = lines.findIndex((line) => line.includes('# Changelog'));

    if (index === -1) {
      throw new Error('No se encontró el objeto `# Changelog` en el código.');
    }

    const newEntry = `\n### Release version <version ${currentVersion}>`;
    lines.splice(index + 1, 0, newEntry);

    const updatedContent = lines.join('\n');

    fs.writeFileSync(changelogPath, updatedContent, 'utf8');
  } catch (error) {
    console.error(`Error al insertar texto en ${changelogPath}:`, error);
  }
}

updateVersionInChangelog();
updatePatchVersion();
console.log('Versión actualizada correctamente en el CHANGELOG.md');
