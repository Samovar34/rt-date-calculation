var RT = RT || {};

RT.datePicker = (function () {
    var container = null, // контейнер таблицы с датами
        dateElem = null, // где будет отражаться месяц и год
        rootElem = null; // корневой элемент

    // Дата установленная пользователем
    var curDate = null;

    var MONTHS = {
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
        rootElem = RT.core.getElem("date-picker");
        dateElem = RT.core.getElem("dp-date");
        container = RT.core.getElem("dp-table");


        if (!container) {
            console.warn("Не верная разметка под Date-picker");
            return;
        }

        rootElem.onclick = function (e) {
            console.log("CLICK");
            var action = e.target.dataset["action"];

            console.log(action);

            if (action === "up") {
                curDate.setMonth(curDate.getMonth() + 1);
                create();
                printCurDate();
            } else if (action === "down") {
                curDate.setMonth(curDate.getMonth() - 1);
                create();
                printCurDate();
            } else if (action === "set" ){
                if (e.target.dataset.day) {
                    alert(new Date(curDate.getFullYear(), curDate.getMonth(), parseInt(e.target.dataset.day)));
                }
            } else {

            }
            return false;
        }

        // отменить выделение символов при частом нажатии
        // rootElem.onmousedown = function (e) {
        //     e.preventDefault();
        // }



        // установить дату
        // устанавливаем число месяца 1, потому что иногда возникают баги с перехода с марта на фераль
        // при числах больше 28
        var d = new Date();
        curDate = new Date(d.getFullYear(), d.getMonth(), 1)
        console.log("на старте", curDate.getMonth());
        
        printCurDate();
        
    }

    // [Public] создать календарь 
    function create() {
        if (!container) {
            console.warn("Сначало нужно вызвать RT.datePicker.init");
            return;
        }

        var now = new Date; // текущая дата
        var d = new Date(curDate.getFullYear(), curDate.getMonth()); // дата установленная пользователем

        var table = "<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>";
        
        // заполняем первый ряд от пн и до дня с которого начинается месяца
        for (var i = 0; i < getDay(d); i++) {
            table += "<td></td>";
        }

        // пока текущий месяца
        while (d.getMonth() == curDate.getMonth()) {
            // если текущий день и месяц равно целевой дате, то выделить
            if (d.getDate() == now.getDate() && d.getMonth() == now.getMonth()) {
                table += "<td class=\"hover active\" data-action=\"set\" data-day=\"" + d.getDate() + "\">" + d.getDate() + "</td>";
            } else {
                table += "<td class=\"hover\" data-action=\"set\" data-day=\"" + d.getDate() + "\">" + d.getDate() + "</td>";
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

    // [Private] выводит текущий месяц и год в строку текущей даты
    function printCurDate() {
        dateElem.innerHTML = MONTHS[curDate.getMonth()] + " " + curDate.getFullYear();
    }
    
    return {
        init: init,
        create: create,
        setDate: null,
        show: null,
        hide: null
    }
})();