# Test File for Run on Save

This is a test file to verify that the "Run on Save" extension is properly configured.

When you save this file, it should trigger the post-save-hook.sh script, which will:
1. Add all changes
2. Commit them with a timestamp
3. Push to GitHub

Look for notifications in the VS Code interface or terminal to confirm it's working. 