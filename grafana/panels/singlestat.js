'use strict';

var _ = require('underscore');
var defaultsDeep = require('defaults-deep');
var generateGraphId = require('../id');

function SingleStat(opts) {
    opts = opts || {};
    var self = this;

    var defaults = {
        id: generateGraphId(),
        title: 'single stat',
        targets: [],
        error: false,
        span: 12,
        editable: true,
        type: 'singlestat',
        links: [],
        maxDataPoints: 100,
        interval: null,
        cacheTimeout: null,
        format: 'none',
        prefix: '',
        postfix: '',
        nullText: null,
        valueMaps: [{
            value: 'null',
            op: '=',
            text: 'N/A'
        }],
        nullPointMode: 'connected',
        valueName: 'current',
        prefixFontSize: '50%',
        valueFontSize: '80%',
        postfixFontSize: '50%',
        thresholds: '',
        colorBackground: false,
        colorValue: false,
        colors: [
            'rgba(71, 212, 59, 0.4)',
            'rgba(245, 150, 40, 0.73)',
            'rgba(225, 40, 40, 0.59)'
        ],
        sparkline: {
            show: true,
            full: true,
            lineColor: 'rgb(31, 193, 58)',
            fillColor: 'rgba(134, 178, 214, 0.41)'
        }
    };

    this.state = defaultsDeep(_.clone(opts), defaults);

    if (opts.targets) {
        this.state.targets = [];
        opts.targets.forEach(function addT(target) {
            self.addTarget(target);
        });
    }

    // finally add to row/dashboard if given
    if (opts.row && opts.dashboard) {
        opts.row.addPanel(this);
        opts.dashboard.addRow(opts.row);
    }
}

SingleStat.prototype.generate = function generate() {
    return this.state;
};

SingleStat.prototype.setTitle = function setTitle(title) {
    this.state.title = title;
};

SingleStat.prototype.addTarget = function addTarget(target) {
    this.state.targets.push({
        target: target.toString()
    });
};

module.exports = SingleStat;
