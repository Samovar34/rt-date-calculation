var RT = RT || {};

RT.result = (function () {
    var rootElem,
        startDate,
        startTime,
        targetTime,
        endDate,
        endTime,
        hideBtn;

    function init() {
        rootElem = RT.core.getElem("result"),
        startDate = RT.core.getElem("r-start-date");
        startTime = RT.core.getElem("r-start-time");
        targetTime = RT.core.getElem("r-target");
        endDate = RT.core.getElem("r-end-date");
        endTime = RT.core.getElem("r-end-time");
        hideBtn = RT.core.getElem("r-hide");

        RT.events.add("show:result", calculateAndShow);

        hideBtn.onclick = hide;
    }

    function calculateAndShow(result) {
        var targetDate = calculate(result);
        startDate.innerHTML = formatDate(result.startDate);
        startTime.innerHTML = formatTime({
            hours: result.startDate.getHours(),
            minutes: result.startDate.getMinutes()
        });
        targetTime.innerHTML = formatTime(result.targetTime);
        endDate.innerHTML = formatDate(targetDate);
        endTime.innerHTML = formatTime({
            hours: targetDate.getHours(),
            minutes: targetDate.getMinutes()
        });

        show();

    }

    function show() {
        rootElem.style.display = "block";
    }

    function hide() {
        rootElem.style.display = "none";
    }

    function calculate(data) {
        var temp = data.startDate.getTime();
        temp = temp + data.targetTime.hours * 60 * 60 * 1000 + data.targetTime.minutes * 60 * 1000;
        return new Date(temp);
    }

    function formatDate(date) {
        return format(date.getDate()) + "/" + format(date.getMonth() + 1) + "/" + format(date.getFullYear());
    }

    function formatTime(time) {
        return format(time.hours) + ":" + format(time.minutes);
    }

    function format(val) {
        val = parseInt(val);

        if (val < 10) {
            return "0" + val;
        } else {
            return val;
        }
    }

    return {
        init: init
    };
})();

