var RT = RT || {};

RT.datePicker = (function () {
    var container = null;

    // Дата установленная пользователем
    var curDate = null;

    var Months = {
        0: "Январь",
        1: "Февраль",
        2: "Март",
        3: "Апрель",
        4: "Май",
        5: "Июнь",
        6: "Июль",
        7: "Август",
        8: "Сентябрь",
        9: "Октябрь",
        10: "Ноябрь",
        11: "Декабрь",
    };



    // [Public] Если элемент не определен в разметке
    // то создадим его и вставим в body
    function init() {
        container = RT.core.getElem("date-picker");

        if (!container) {
            container = RT.core.createElem("div", "date-picker", ["app", "date"]);
            RT.core.appendToBody(container);
        }

        container.onclick = function (e) {
            console.log("CLICK");
        }

        // установить дату
        var d = new Date();
        curDate = {
            m: d.getMonth(),
            y: d.getFullYear(),
        }
    }

    // [Public] создать календарь 
    function create() {
        if (!container) {
            console.warn("Сначало нужно вызвать RT.datePicker.init");
            return;
        }

        var now = new Date; // текущая дата
        var d = new Date(curDate.y, curDate.m); // дата установленная пользователем

        var table = "<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>";
        
        // заполняем первый ряд от пн и до дня с которого начинается месяца
        for (var i = 0; i < getDay(d); i++) {
            table += "<td></td>";
        }

        // пока текущий месяца
        while (d.getMonth() == curDate.m) {
            // если текущий день, то выделить
            if (d.getDate() == now.getDate()) {
                table += "<td class=\"hover active\"><b>" + d.getDate() + "</b></td>";
            } else {
                table += "<td class=\"hover\" data-day=\"" + d.getDate() + "\">" + d.getDate() + "</td>";
            }
            
            // если последний день недели (вс) - перевод строки
            if (getDay(d) == 6) {
                table += "</tr><tr>";
            }

            // прибавим день
            d.setDate(d.getDate() + 1);
        }

        table += "</tr></table>"; // закрыть таблицу

        container.innerHTML = table;
    }

    // [Private] возвращает номер дня недели
    // 0-пн 6-вс
    function getDay(date) {
        var day = date.getDay();
        if (day == 0) { // если воскресенье
            day = 7;
        }
        return day - 1;
    }
    
    return {
        init: init,
        create: create,
        setDate: null,
        show: null,
        hide: null
    }
})();