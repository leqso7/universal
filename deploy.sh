#!/bin/bash

# Build the project
npm run build

# Navigate into the build output directory
cd dist

# Create a .nojekyll file to bypass Jekyll processing
touch .nojekyll

# Move back to the project root
cd ..

# Deploy to GitHub Pages
npm run deploy
