const { mkdir, cp } = require('node:fs/promises');
const path = require('node:path');

async function main() {
  const root = __dirname; // Ajusta si el script no está en la raíz
  const tasks = [
    { src: './package.mjs.json', dest: '../dist/esm/package.json' },
    { src: './package.cjs.json', dest: '../dist/cjs/package.json' },
  ];

  for (const { src, dest } of tasks) {
    const from = path.resolve(root, src);
    const to = path.resolve(root, dest);

    await mkdir(path.dirname(to), { recursive: true });
    await cp(from, to);

    console.log(`Copiado: ${src} -> ${dest}`);
  }
}

main().catch((err) => {
  console.error('Error en postbuild:', err);
  process.exit(1);
});
