const fs = require('fs');
const path = require('path');

const envDir = path.join(__dirname, 'src/environment');
const envFile = path.join(envDir, 'environment.ts');

// Crea la cartella `src/environment/` se non esiste
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

// Contenuto del file `environment.ts`
const envFileContent = `
export const environment = {
  production: ${process.env.PRODUCTION || false},
  apiUrl: '${process.env.API_URL || 'https://api.themoviedb.org/3'}',
  apiKey: '${process.env.API_KEY || ''}'
};
`;

// Scrive il file `environment.ts`
fs.writeFileSync(envFile, envFileContent);
console.log('✅ environment.ts generato con successo!');

// Attende un secondo per garantire che il file venga rilevato
setTimeout(() => {
  console.log('⌛ Aspettando 1 secondo per assicurarsi che environment.ts sia disponibile...');
}, 1000);
