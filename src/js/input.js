var RT = RT || {};

RT.input = (function () {
    var startDay, startMonth, startYear, startHours, startMin, targetHours, targetMin, inputForm;

    var inputs = null;

    var showDpElem = null;


    // [Public]
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

        showDpElem = RT.core.getElem("show-dp");

        // set initial value
        startDay.value(date.getDate());
        startMonth.value(date.getMonth() + 1);
        startYear.value (date.getFullYear());
        startHours.value(date.getHours());
        startMin.value(date.getMinutes());
        targetHours.value(67);
        targetMin.value(0);

        inputs = [startDay, startMonth, startYear, startHours, startMin, targetHours, targetMin];

        // TODO возможно добавить валидация перед субмитом
        inputForm.on("submit", function (e) {
            e.preventDefault();
            RT.events.emit("show:result", [getDate()]);
        });

        // назначить обработчики
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].on("input", checkInput);
            inputs[i].on("change", validate);
            inputs[i].on("focus", doOnFocus);
            inputs[i].on("blur", doOnBlur);
        }

        showDpElem.on("click", emitEvent);

        RT.events.add("picked", function (date) {
            setDate(date);
            toReadable();
        });

        toReadable();
    }

    // [Private]
    function setDate(date) {
        startDay.value(date.getDate());
        startMonth.value(date.getMonth() + 1);
        startYear.value(date.getFullYear());
    }

    // [Private]
    function toReadable() {
        for (var i = 0; i < inputs.length; i++) {
            _toReadable(inputs[i].get());
        }
    }

    // [Private] get user date
    function getDate() {
        return {
            startDate: new Date(
                parseInt(startYear.value()),
                parseInt(startMonth.value()) - 1,
                parseInt(startDay.value()),
                parseInt(startHours.value()),
                parseInt(startMin.value())
            ),
            targetTime: {
                hours: parseInt(targetHours.value()),
                minutes: parseInt(targetMin.value()),
            }
        }
    }

    // [Private] check user input
    // if input not a number then that will be removed
    function checkInput() {
        this.value = this.value.replace(/\D/gim, "");
    }

    // [Private] this = Element
    function emitEvent() {
        var eventName = this.getAttribute("data-event");

        if (eventName) {
            RT.events.emit(eventName, null);
        }
    }

    // [Private] this = input Element
    function doOnFocus() {
        this.setAttribute("placeholder", this.value);
        this.value = "";
    }

    // [Private] this = input Element
    function doOnBlur() {
        if (this.value.trim() === "") {
            this.value = this.getAttribute("placeholder");
        }
    }

    // [Private] validate input according data attributes
    // this = Element
    // if value < min => value = min
    // if value > max => value = max
    // if value == NaN => valuer = min
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

    // [Private]
    // if value < 10 then add 0
    // value = 9 => return 09
    function _toReadable (input) {
        var curValue = parseInt(input.value);

        if (curValue < 10) {
            input.value = "0" + curValue;
        }
    }

    return {
        init: init
    };
})();