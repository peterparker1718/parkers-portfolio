#!/bin/bash
# Deploy Parker's Portfolio to Firebase Hosting
set -euo pipefail

PROJECT_ID="${1:-$(gcloud config get-value project)}"

echo "🚀 Building Parker's Portfolio..."
npm ci
npm run build

echo "📦 Deploying to Firebase Hosting..."
# Initialize Firebase if not already done
if [ ! -f firebase.json ]; then
  cat > firebase.json << 'EOF'
{
  "hosting": {
    "public": "out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      { "source": "**", "destination": "/index.html" }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
        ]
      }
    ]
  }
}
EOF
fi

npx firebase-tools deploy --only hosting --project "${PROJECT_ID}"

echo "✅ Portfolio deployed!"
