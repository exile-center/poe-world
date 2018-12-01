#!/usr/bin/env sh

echo "Release type: < major | minor | patch >"
read release_type

if ! [[ $release_type =~ ^(major|minor|patch)$ ]]; then
  echo "Unknown release type: $release_type"
  exit 1
fi

echo "Bumping the version..."
version=`npm version $release_type --no-git-tag-version --message "Bumping the version to %s"`
version=${version:1}

echo "Changelog : < yes | no >"
read changelog

if [[ $changelog =~ ^(yes|y)$ ]]; then
  echo "Preparing a new changelog..."
  changelog_filename=${version//./_}.md
  cp ./changelogs/_template.md ./changelogs/$changelog_filename
  sed -i '' -e "s/{{version}}/$version/g" ./changelogs/$changelog_filename
  "${EDITOR:-vi}" "./changelogs/$changelog_filename"

  echo "Adding the changelog to git..."
  git add ./changelogs/$changelog_filename
fi

echo "Committing the version..."
git commit -a -m"Bumping the version to $version"

echo "Tagging the version..."
git tag $version

echo "Pushing the version commit..."
git push origin
git push origin --tags

echo "Force-updating the release branch..."
current_branch=`git rev-parse --abbrev-ref HEAD`
git checkout release
git reset --hard $version
git push origin release --force

echo "Switching back to the original branch..."
git checkout $current_branch

echo "Done 🚀"
