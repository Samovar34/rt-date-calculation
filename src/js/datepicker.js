var RT = RT || {};

RT.datePicker = (function () {
    var container = null, // контейнер таблицы с датами
        dateElem = null, // где будет отражаться месяц и год
        hideLink = null, // кнопка скрытия
        rootElem = null; // корневой элемент

    // Дата установленная пользователем
    var curDate = null;

    // TODO Дата, которую выбрал пользователь
    var userDate = null;

    var MONTHS = {
        0:  "Январь",
        1:  "Февраль",
        2:  "Март",
        3:  "Апрель",
        4:  "Май",
        5:  "Июнь",
        6:  "Июль",
        7:  "Август",
        8:  "Сентябрь",
        9:  "Октябрь",
        10: "Ноябрь",
        11: "Декабрь",
    };



    // [Public] Если элемент не определен в разметке
    // то создадим его и вставим в body
    function init() {
        rootElem = RT.core.getElem("date-picker");
        dateElem = RT.core.getElem("dp-date");
        hideLink = RT.core.getElem("dphide");
        container = RT.core.getElem("dp-table");


        if (!container) {
            console.warn("Не верная разметка под Date-picker");
            return;
        }

        hideLink.on("click", function(e) {
            //e.preventDefault();
            hide();
        });

        // TODO в WP10 баг с выделение текста после скрытия датапикера. После скрыть текст выделяется
        rootElem.on("click", function (e) {
            var target = RT.core.wrap(e.target);
            var action = target.getData("action");

            if (action === "up") {
                curDate.setMonth(curDate.getMonth() + 1);
                create();
                printCurDate();
            } else if (action === "down") {
                curDate.setMonth(curDate.getMonth() - 1);
                create();
                printCurDate();
            } else if (action === "set" ){
                if (target.getData("day")) {
                    userDate = new Date(curDate.getFullYear(),
                        curDate.getMonth(),
                        parseInt(target.getData("day")));
                    RT.events.emit("picked", [userDate]);
                    hide();
                    create();
                }
            }
            e.preventDefault();
        });

        // установить дату
        // устанавливаем число месяца 1, потому что иногда возникают баги с перехода с марта на февраль
        // при числах больше 28
        var now = new Date();
        curDate = new Date(now.getFullYear(), now.getMonth(), 1);

        userDate = now;
        
        printCurDate();
        create();

        RT.events.add("show:dpicker", show);
        
    }

    // [Public] создать календарь 
    function create() {
        if (!container.get()) {
            console.warn("Сначало нужно вызвать RT.datePicker.init");
            return;
        }

        var now = new Date; // текущая дата
        var tempDate = new Date(curDate.getFullYear(), curDate.getMonth()); // дата, необходимая для заполнения календаря

        var table = "<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>";
        
        // заполняем первый ряд от пн и до дня с которого начинается месяца
        for (var i = 0; i < getDay(tempDate); i++) {
            table += "<td></td>";
        }

        // пока текущий месяца
        while (tempDate.getMonth() === curDate.getMonth()) {
            // если текущий день и месяц равно целевой дате, то выделить
            if (tempDate.getDate() === now.getDate() && tempDate.getMonth() === now.getMonth()) {
                // если текущий день равен дню, выбранным пользователям то выделить жирным
                if (tempDate.getDate() === userDate.getDate() && tempDate.getMonth() === userDate.getMonth()) {
                    table += createCell(tempDate, "now-user");
                } else {
                    table += createCell(tempDate, "now");
                }
            // выделить выбранный пользователем день, жирным шрифтом
            } else if (tempDate.getDate() === userDate.getDate() && tempDate.getMonth() === userDate.getMonth()) {
                table += createCell(tempDate, "user");
            } else {
                table += createCell(tempDate);
            }
            
            // если последний день недели (вс) - перевод строки
            if (getDay(tempDate) === 6) {
                table += "</tr><tr>";
            }

            // прибавим день
            tempDate.setDate(tempDate.getDate() + 1);
        }

        table += "</tr></table>"; // закрыть таблицу

        // show table
        container.html(table);
    }

    // [Private] возвращает номер дня недели
    // 0-пн 6-вс
    function getDay(date) {
        var day = date.getDay();
        if (day === 0) { // если воскресенье
            day = 7;
        }
        return day - 1;
    }

    // [Private] создает ячейку в календаре с датой
    function createCell (tempDate ,val) {
        switch (val) {
            // текущий день
            case "now":
                return "<td class=\"hover active\" data-action=\"set\" data-day=\"" + tempDate.getDate() + "\">" + tempDate.getDate() + "</td>";
            // текущий день, который совпадает с выбранным
            case "now-user": {
                return "<td style=\"font-weight: bold;\" class=\"hover active\" data-action=\"set\" data-day=\"" + tempDate.getDate() + "\">" + tempDate.getDate() + "</td>";
            }
            // день, выбранный пользователем
            case "user": {
                return "<td style=\"font-weight: bold;\" class=\"hover\" data-action=\"set\" data-day=\"" + tempDate.getDate() + "\">" + tempDate.getDate() + "</td>";
            }
            // обычный день
            default:
                return "<td class=\"hover\" data-action=\"set\" data-day=\"" + tempDate.getDate() + "\">" + tempDate.getDate() + "</td>";
        }
    }

    // [Private] выводит текущий месяц и год в строку текущей даты
    function printCurDate() {
        dateElem.html(MONTHS[curDate.getMonth()] + " " + curDate.getFullYear());
    }

    // [Private] show module
    function show() {
        rootElem.show();
    }

    // [Privete] hide module
    function hide() {
        rootElem.hide();
    }
    
    return {
        init: init
    }
})();