#!/bin/bash

# Print a status message
echo "Running auto-commit script..."

# Add all changes
git add .
if [ $? -ne 0 ]; then
    echo "Error: Failed to stage changes"
    exit 1
fi

# Check if there are changes to commit
if git diff --cached --quiet; then
    echo "No changes to commit"
    exit 0
fi

# Commit with timestamp
git commit -m "Auto-update: $(date)"
if [ $? -ne 0 ]; then
    echo "Error: Failed to commit changes"
    exit 1
fi

# Push to GitHub
git push
if [ $? -ne 0 ]; then
    echo "Error: Failed to push to GitHub"
    echo "This might be due to an authentication issue or network problem"
    exit 1
fi

echo "✅ Changes automatically committed and pushed to GitHub!"
exit 0 