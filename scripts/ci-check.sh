#!/usr/bin/env sh

. $(dirname $0)/helpers.sh

header "Linting scripts…"
run npm run lint-scripts

header "Linting stylesheets…"
run npm run lint-styles

header "Linting templates…"
run npm run lint-templates

header "Running prettier check…"
run npm run prettier-check

header "Running tests (web)…"
run npm run test-web

header "Running tests (desktop)…"
run npm run test-electron

if [ ${GLOBAL_ERROR_STATUS} -ne 0 ]; then
  echo "\n\n${YELLOW}▶▶ One of the checks ${RED_BOLD}failed${YELLOW}. Please fix it before committing.${NO_COLOR}"
else
  echo "\n\n${YELLOW}▶▶ All checks ${GREEN_BOLD}passed${YELLOW}!${NO_COLOR}"
fi

