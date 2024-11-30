#!/usr/bin/env bash

# Get the current branch name
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Get the commit message
COMMIT_MSG_FILE=$1
COMMIT_MSG=$(cat "$COMMIT_MSG_FILE")

# Validate commit message format
COMMIT_PATTERN="^(feat|bug|fix|hotfix):\[[[:digit:]]+\]-[[:alnum:]-]+$"

if ! echo "$COMMIT_MSG" | grep -Eq "$COMMIT_PATTERN"; then
  echo "Invalid commit message: '$COMMIT_MSG'"
  echo "Commit message must be in the format: feat:[issue number]-description"
  echo "Example: feat:[12345]-add-login-button"
  exit 1
fi

echo "Branch name and commit message are valid. Proceeding..."
exit 0
