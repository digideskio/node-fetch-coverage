'use strict';

const hostedGitInfo = require('hosted-git-info');
const find = require('lodash.find');
const fetchers = require('require-directory')(module, './lib', { recurse: false });
const shieldsIo = require('./lib/util/shieldsIo');

function tryBadges(options) {
    const coverageBadge = find(options.badges, (badge) => badge.info.type === 'coverage');
    const shieldsIoUrl = coverageBadge && coverageBadge.urls.content;

    return shieldsIoUrl ? shieldsIo.request(shieldsIoUrl, options) : Promise.resolve(false);
}

function tryServices(gitInfo, options) {
    const errors = [];

    const promises = options.services.map((service) => {
        return fetchers[service] && fetchers[service](gitInfo, options)
        .catch((err) => { errors.push(err); });
    });

    return Promise.all(promises)
    .then((coverages) => {
        const coverage = find(coverages, (coverage) => coverage != null);

        if (coverage != null) {
            return coverage;
        }

        if (errors.length) {
            throw Object.assign(new Error(`${errors.length} error(s) occurred while trying to fetch coverage`), { errors });
        }

        return null;
    });
}

// -------------------------------------------------------------------------

function fetchCoverage(repositoryUrl, options) {
    let gitInfo;

    // Grab the git info, aborting immediately if the repository url is not valid
    // See: https://github.com/npm/hosted-git-info/issues/15
    try {
        gitInfo = hostedGitInfo.fromUrl(repositoryUrl);
    } catch (err) {
        return Promise.resolve(null);
    }

    if (!gitInfo) {
        return Promise.resolve(null);
    }

    options = Object.assign({
        branch: null,
        badges: null,
        services: ['codecov', 'coveralls', 'codeclimate', 'scrutinizer'],
        got: { timeout: 15000 },
    }, options);

    // Try fetching the coverage from the coverage badge if any
    return tryBadges(options)
    // Fallback to fetching from a variety of services
    .then((coverage) => coverage === false ? tryServices(gitInfo, options) : coverage);
}

module.exports = fetchCoverage;
