#!/bin/bash

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

# Execute the latest sofa script
node ${DIR}/../couch-potato/sofa/index.js "$@"
