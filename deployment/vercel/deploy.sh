#!/bin/bash

# Vercel Deployment Script for Parker's Portfolio

echo "🚀 Deploying to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Build frontend
echo "📦 Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
cp deployment/vercel/vercel.json .
vercel --prod

# Clean up
rm vercel.json

echo "✅ Deployment completed!"
echo "🔗 Your site should be live at your Vercel URL"