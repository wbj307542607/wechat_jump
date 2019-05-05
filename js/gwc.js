var GWC = {
    version: '1.1.1',
    urlParams: {},
    appendParams: function (url, params) {
        if (params) {
            var baseWithSearch = url.split('#')[0];
            var hash = url.split('#')[1];
            for (var key in params) {
                var attrValue = params[key];
                if (attrValue !== undefined) {
                    var newParam = key + "=" + attrValue;
                    if (baseWithSearch.indexOf('?') > 0) {
                        var oldParamReg = new RegExp('^' + key + '=[-%.!~*\'\(\)\\w]*', 'g');
                        if (oldParamReg.test(baseWithSearch)) {
                            baseWithSearch = baseWithSearch.replace(oldParamReg, newParam);
                        } else {
                            baseWithSearch += "&" + newParam;
                        }
                    } else {
                        baseWithSearch += "?" + newParam;
                    }
                }
            }
            if (hash) {
                url = baseWithSearch + '#' + hash;
            } else {
                url = baseWithSearch;
            }
        }
        return url;
    },
    getUrlParams: function () {
        var pairs = location.search.substring(1).split('&');
        for (var i = 0; i < pairs.length; i++) {
            var pos = pairs[i].indexOf('=');
            if (pos === -1) {
                continue;
            }
            GWC.urlParams[pairs[i].substring(0, pos)] = decodeURIComponent(pairs[i].substring(pos + 1));
        }
    }
}