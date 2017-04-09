var RT = RT || {};

RT.input = (function () {
    var startDay, startMonth, startYear, startHours, startMin, targetHours, targetMin, inputForm;

    var inputs = null;

    function init() {
        var date = new Date;
        inputForm = RT.core.getElem("input-form");

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

        inputs = [startDay, startMonth, startYear, startHours, startMin, targetHours, targetMin];

        inputForm.onsubmit = function (e) {
            e.preventDefault();
        }

        // назначить обработчики
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].oninput = checkInput;
            inputs[i].onchange = validate;
        }

        toReadable();
    }

    function setDate() {

    }

    function toReadable() {
        for (var i = 0; i < inputs.length; i++) {
            _toReadable(inputs[i]);
        }
    }

    function getDate() {

    }


    function checkInput() {
        this.value = this.value.replace(/\D/gim, "");
        console.log("check");
    }

    function validate() {
        var min = parseInt(this.getAttribute("data-min"));
        var max = parseInt(this.getAttribute("data-max"));
        var value = parseInt(this.value);
        if (value < min || isNaN(value)) {
            this.value = min;
        } else if (this.value > max) {
            this.value = max;
        }
        _toReadable(this);
    }

    function _toReadable (input) {
        var min = parseInt(input.getAttribute("data-auto"));

        if (input.value < 10) {
            input.value = "0" + input.value;
        }
    }

    return {
        init: init
    };
})();