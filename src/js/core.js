var RT = RT || {};

RT.core = {
    getElem: function (id) {
        return document.getElementById(id);
    },

    /*
        tag[String] тег элемента
        id[String] id элемента
        classNames[Array] массив имен класса элемента
    */
    createElem: function (tag, id, classNames) {
        if (!tag) {
            tag = "div";
        }
        var temp = document.createElement(tag);
        
        if (id) {
            temp.id = id;
        }
        
        if (classNames) {
            temp.className = classNames.join(" ");
        }
        return temp;
    },
    appendToBody: function (elem) {
        document.body.appendChild(elem);
    }
}