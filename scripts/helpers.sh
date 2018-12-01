#!/usr/bin/env sh
GLOBAL_ERROR_STATUS=0

RED='\033[0;31m'
RED_BOLD='\033[1;31m'
GREEN='\033[0;32m'
GREEN_BOLD='\033[1;32m'
YELLOW='\033[0;33m'
NO_COLOR='\033[0m'

header() {
  echo "\n\n${YELLOW}▶ $1${NO_COLOR}"
}

error_message() {
  echo "\n\n${RED}↳ $1${NO_COLOR}"
}

run() {
  eval "${@}"
  local exit_status=${?}

  if [ ${exit_status} -ne 0 ]; then
    echo "\n${RED}↳ Something went wrong. Program exited with ${exit_status} ✘${NO_COLOR}"
    GLOBAL_ERROR_STATUS=${last_exit_status}
  else
    echo "${GREEN}↳ Passed ✔${NO_COLOR}"
  fi
}
