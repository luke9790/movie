const fs = require('fs');
const path = require('path');

// Percorso corretto per `environment.ts`
const envDir = path.join(__dirname, 'src', 'app', 'environment'); 
const envFile = path.join(envDir, 'environment.ts'); 

// Assicuriamoci che la cartella `environment/` esista
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
console.log('✅ environment.ts generato con successo in src/app/environment/');

// Aspettiamo un secondo per evitare errori di lettura in fase di build
setTimeout(() => {
  console.log('⌛ Aspettando 1 secondo per assicurarsi che environment.ts sia disponibile...');
}, 1000);
