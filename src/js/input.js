var RT = RT || {};

RT.input = (function () {
    var startDay, startMonth, startYear, startHours, startMin, targetHours, targetMin;

    function init() {
        var date = new Date;
        startDay = RT.core.getElem("start-day");
        startMonth = RT.core.getElem("start-month");
        startYear = RT.core.getElem("start-year");
        startHours = RT.core.getElem("start-hours");
        startMin = RT.core.getElem("start-min");
        targetHours = RT.core.getElem("target-hours");
        targetMin = RT.core.getElem("target-min");

        startDay.value = date.getDate();
        startMonth.value = date.getMonth() + 1;
        startYear.value = date.getFullYear();
        startHours.value = date.getHours();
        startMin.value = date.getMinutes();

        targetHours.value = 67;
        targetMin.value = 0;

        targetMin.addEventListener("focus", function () {
            targetMin.value = "";
        }, false)
    }

    return {
        init: init
    };
})();