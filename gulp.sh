#!/usr/bin/env bash

__dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

"$__dir/node_modules/.bin/gulp" "$@"

