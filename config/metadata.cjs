const {
    author,
    repository,
    version,
    description,
} = require("../package.json");

module.exports = {
    name: {
        "": "Stash Checker",
        en: "Stash Checker",
    },
    description: description,
    icon: "https://docs.stashapp.cc/favicon.ico",
    version: version,
    author: author,
    source: repository.url,
    // 'license': 'MIT',
    match: [
        "*://adultanime.dbsearch.net/*",
        "*://coomer.party/*",
        "*://ecchi.iwara.tv/*",
        "*://erommdtube.com/*",
        "*://fansdb.cc/*",
        "*://fansdb.xyz/*",
        "*://gayeroticvideoindex.com/*",
        "*://kemono.party/*",
        "*://metadataapi.net/*",
        "*://onlyfans.com/*",
        "*://oreno3d.com/*",
        "*://pmvstash.org/*",
        "*://www.pornteengirl.com/*",
        "*://r18.dev/*",
        "*://shemalestardb.com/*",
        "*://stashdb.org/*",
        "*://www.animecharactersdatabase.com/*",
        "*://www.babepedia.com/*",
        "*://www.data18.com/*",
        "*://www.freeones.com/*",
        "*://www.iafd.com/*",
        "*://www.indexxx.com/*",
        "*://www.iwara.tv/*",
        "*://www.javlibrary.com/*",
        "*://www.minnano-av.com/*",
        "*://www.thenude.com/*",
        "*://xslist.org/*",
    ],
    require: [],
    grant: [
        "GM.xmlHttpRequest",
        "GM.getValue",
        "GM.setValue",
        "GM.deleteValue",
        "GM.listValues",
        "GM.registerMenuCommand",
    ],
    connect: [
        "localhost",
        "*"
    ],
    "run-at": "document-end",
};
