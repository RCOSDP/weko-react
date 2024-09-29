#!/usr/bin/env bash

# quit on errors and unbound symbols:
set -o errexit

# args-check-begin
if [ ! -d "$1" ]; then
    echo "Usage: $0 wekodir"
    exit 1
fi
WEKODIR=$1

if [ ! -d "${WEKODIR}/modules" ]; then
    echo "No such ${WEKODIR}/modules/"
    exit 1
fi
TARGETDIR=$WEKODIR/modules
# args-check-end

# Merging Style Files
cat ./app-facet-search/build/static/css/2.*chunk.css ./app-facet-search/build/static/css/main.*.chunk.css > ./app-facet-search/build/static/css/facet_chunk.css

# copy-begin
cp -p ./app-facet-search/build/static/css/facet_chunk.css  ${TARGETDIR}/weko-search-ui/weko_search_ui/static/css/weko_search_ui/facet_chunk.css
cp -p ./app-facet-search/build/static/js/main.*.chunk.js   ${TARGETDIR}/weko-search-ui/weko_search_ui/static/js/weko_search_ui/facet.main.chunk.js
cp -p ./app-facet-search/build/static/js/runtime-main.*.js ${TARGETDIR}/weko-search-ui/weko_search_ui/static/js/weko_search_ui/facet.runtime-main.js
cp -p ./app-facet-search/build/static/js/2.*.chunk.js      ${TARGETDIR}/weko-search-ui/weko_search_ui/static/js/weko_search_ui/facet.chunk.js
# copy-end
