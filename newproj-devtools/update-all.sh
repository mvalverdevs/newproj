#!/bin/bash

# Exit on any error
set -e
LANG=C

REPOS=(
  newproj-devtools
  newproj-backend
  newproj-frontend
)

DEPRECATED_REPOS=()

# IMI repositories base URL
GIT_CLONE_METHOD=${GIT_CLONE_METHOD:-ssh}
GIT_CLONE_DEFAULT_BRANCH="main"
GITSSHROOT="ssh://git@git.intelligenia.com:21617/aspb-newproj/"
GITHTTPSROOT="https://git.intelligenia.com/aspb-newproj/"

# Developer tools repo
DEVTOOLSDIR="newproj-devtools"

# Files to link from $DEVTOOLSDIR into current directory
LINK_FILES=(
  update-all.sh
  docker-compose.yml
  docker-compose.production-test.yml
  Makefile
)

# ---------------- end configurable options -----------------

err_report() {
  echo "ERROR updating, please fix errors and rerun $0"
}

trap 'err_report $LINENO' ERR

pushd() {
  command pushd "$@" >/dev/null
}

popd() {
  command popd >/dev/null
}

# Set repo URI (ssh ot https)
if [ "${GIT_CLONE_METHOD}" == "ssh" ]; then
  gitreporoot="$GITSSHROOT"
else
  gitreporoot="$GITHTTPSROOT"
fi

# Check that the current directory is NOT this repo directory (see README.md)
if [[ -d .git ]]; then
  echo "ERROR: Please, symlink this script from the parent folder and execute it. See README.md for more details"
  exit 1
fi

# Check if all IMI repos are cloned
for i in "${REPOS[@]}"; do
  if [[ ! -d "$i" ]]; then
    echo "WARNING: Repo '${i}' not found, cloning and checking out '${GIT_CLONE_DEFAULT_BRANCH}' branch"
    git clone "${gitreporoot}${i}.git"
    pushd "${i}"
    git checkout "${GIT_CLONE_DEFAULT_BRANCH}"
    popd
  fi

  # Uncomment and adapt this to do a relocation of all locally cloned repos
  pushd "${i}"
  git remote set-url origin "${gitreporoot}${i}.git"
  popd
done

# Pull latest version for every repo
for i in "${REPOS[@]}"; do
  pushd "${i}"
  echo "Updating ${i}"
  git pull
  popd
done

# Show working branches
for repo in "${REPOS[@]}"; do
  pushd "${repo}"
  ref="$(git rev-parse --abbrev-ref HEAD)"
  rev="$(git rev-parse HEAD)"
  datetime="$(git log -1 --format=%cd)"
  printf "Repo: %-20s branch: %-8s (commit_id: %s, date: %s)\n" "${repo}" "${ref}" "${rev}" "${datetime}"
  popd
done

# Link helper scripts / docker-docker files
for i in "${LINK_FILES[@]}"; do
  if [[ ! -L "${i}" ]]; then
    echo "Linking ${DEVTOOLSDIR}/${i}"
    ln -s "${DEVTOOLSDIR}/${i}" .
  fi
done

# Deprecation warnings
for i in "${DEPRECATED_REPOS[@]}"; do
  if [[ -d "${i}" ]]; then
    echo "WARNING: Repo '${i}' is deprecated. Please, remove it"
  fi
done

echo "Finished without errors."
