const fs = require('fs');
const path = require('path');

const envDir = path.join(__dirname, 'src/environment');
const envFile = path.join(envDir, 'environment.ts');

// Controlla se la cartella `src/environment/` esiste, altrimenti la crea
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
