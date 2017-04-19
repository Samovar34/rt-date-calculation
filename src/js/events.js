var RT = RT || {};

RT.events = (function () {
    var events = {};

    function add(name, fn) {
        if (!events[name]) {
            events[name] = [];
        }

        events[name].push(fn);
    }

    function emit(name, args) {
        if (!events[name]) {
            return;
        }

        for (var i = 0; i < events[name].length; i++) {
            events[name][i].apply(events[name][i], args);
        }
    }

    return {
        add: add,
        emit: emit
    };
})();

