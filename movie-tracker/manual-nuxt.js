// Manual Nuxt development server
process.chdir('C:/Users/muham/Desktop/Frontend_insider/movie-tracker');
console.log('Working directory:', process.cwd());

// Load environment variables
require('dotenv').config();

const { loadNuxt, build } = require('nuxt');

async function start() {
  try {
    console.log('Loading Nuxt...');
    const nuxt = await loadNuxt('dev');
    
    console.log('Building Nuxt...');
    await build(nuxt);
    
    console.log('Nuxt server ready at http://localhost:3000');
    
  } catch (error) {
    console.error('Error starting Nuxt:', error);
  }
}

start();
