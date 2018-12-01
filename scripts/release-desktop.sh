#!/usr/bin/env sh

echo "Switching to the release branch..."
current_branch=`git rev-parse --abbrev-ref HEAD`
git checkout release
git pull

echo "Building..."
npm run build-electron

echo "Releasing to GitHub..."
version=`git describe --tags --abbrev=0`
escaped_version=${version//./_}
hub release create --file="./changelogs/$escaped_version.md" --attach="./electron-out/make/squirrel.windows/x64/PoeWorld-$version Setup.exe" --browse $version

echo "Switching back to the original branch..."
git checkout $current_branch

echo "Done 🚀"
