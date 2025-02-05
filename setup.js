// setup.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const files = {
  'package.json': {
    name: "solidjs-tailwind-app",
    version: "0.0.1",
    scripts: {
      "start": "webpack serve --mode development",
      "build": "webpack --mode production",
      "type-check": "tsc --noEmit"
    },
    dependencies: {
      "solid-js": "^1.8.15"
    },
    devDependencies: {
      "@babel/core": "^7.23.9",
      "@babel/preset-typescript": "^7.23.9",
      "autoprefixer": "^10.4.17",
      "babel-loader": "^9.1.3",
      "babel-preset-solid": "^1.8.15",
      "css-loader": "^6.10.0",
      "html-webpack-plugin": "^5.6.0",
      "postcss": "^8.4.35",
      "postcss-loader": "^8.1.0",
      "style-loader": "^3.3.4",
      "tailwindcss": "^3.4.1",
      "typescript": "^5.3.3",
      "webpack": "^5.90.1",
      "webpack-cli": "^5.1.4",
      "webpack-dev-server": "^4.15.1"
    }
  },
  'webpack.config.js': `
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['solid', '@babel/preset-typescript']
          }
        }
      },
      {
        test: /\\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 3000,
    hot: true
  }
};`,
  'tsconfig.json': {
    compilerOptions: {
      strict: true,
      target: "ESNext",
      module: "ESNext",
      moduleResolution: "node",
      allowSyntheticDefaultImports: true,
      esModuleInterop: true,
      jsx: "preserve",
      jsxImportSource: "solid-js",
      types: ["node"],
      noEmit: true,
      isolatedModules: true
    },
    include: ["src"]
  },
  'tailwind.config.js': `
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`,
  'postcss.config.js': `
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}`,
  'index.html': `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>SolidJS + Tailwind</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
  'src/index.css': `
@tailwind base;
@tailwind components;
@tailwind utilities;`,
  'src/index.tsx': `
import { render } from 'solid-js/web';
import { App } from './App';
import './index.css';

const root = document.getElementById('root');

if (root) {
  render(() => <App />, root);
}`,
  'src/App.tsx': `
import { Component, createSignal } from 'solid-js';

export const App: Component = () => {
  const [count, setCount] = createSignal(0);

  return (
    <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">
        Welcome to SolidJS + Tailwind
      </h1>
      <button 
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        onClick={() => setCount(count() + 1)}
      >
        Count: {count()}
      </button>
    </div>
  );
};`
};

// Create directories
const createDirectories = () => {
  if (!fs.existsSync('src')) {
    fs.mkdirSync('src', { recursive: true });
  }
};

// Create files
const createFiles = () => {
  Object.entries(files).forEach(([filename, content]) => {
    const filePath = path.join(process.cwd(), filename);
    const fileContent = typeof content === 'object' ? 
      JSON.stringify(content, null, 2) : 
      content.trim();
    fs.writeFileSync(filePath, fileContent);
  });
};

// Main setup function
const setup = () => {
  try {
    console.log('📁 Creating project structure...');
    createDirectories();
    createFiles();
    
    console.log('📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
    
    console.log('✅ Setup completed successfully!');
    console.log('\nTo start the development server:');
    console.log('npm start');
  } catch (error) {
    console.error('❌ Error during setup:', error);
  }
};

setup();