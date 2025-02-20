const fs = require('fs');

const envFileContent = `
export const environment = {
  production: ${process.env.PRODUCTION || false},
  apiUrl: '${process.env.API_URL || 'https://api.themoviedb.org/3'}',
  apiKey: '${process.env.API_KEY || ''}'
};
`;

fs.writeFileSync('src/environment/environment.ts', envFileContent);
console.log('✅ environment.ts generato con successo!');
