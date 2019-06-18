#!/bin/bash
export DEST="./.exvim.js"
export TOOLS="/Users/tu/.vim/tools/"
export IS_EXCLUDE=-not
export FOLDERS="node_modules"
export FILE_SUFFIXS=".*"
export TMP="${DEST}/_files"
export TARGET="${DEST}/files"
export ID_TARGET="${DEST}/idutils-files"
bash ${TOOLS}/shell/bash/update-filelist.sh
