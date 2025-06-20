#!/bin/bash
cd /home/kavia/workspace/code-generation/reactsocialhub-9918-5974fe0a/reactsocialhub
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

