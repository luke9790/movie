const fs = require('fs');
const path = require('path');

const envDir = path.join(__dirname, 'src', 'app', 'environment'); 
const envFile = path.join(envDir, 'environment.ts'); 

if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

const envFileContent = `
export const environment = {
  production: ${process.env.PRODUCTION || false},
  apiUrl: '${process.env.API_URL || 'https://api.themoviedb.org/3'}',
  apiKey: '${process.env.API_KEY || ''}'
};
`;

fs.writeFileSync(envFile, envFileContent);
console.log('✅ environment.ts generato con successo');

