var RT = RT || {};

RT.core = (function () {

    // Сущность

    function Entity(elem) {
        this.element = elem;
    }

    Entity.prototype.get = function () {
        return this.element;
    };

    // get data-val attribute
    Entity.prototype.getData = function(val) {
        if ("dataset" in this.element) {
            return this.element.dataset[val];
        } else {
            return this.element.getAttribute("data-" + val);
        }
    };

    Entity.prototype.show = function() {
        this.element.style.display = "block";
    };

    Entity.prototype.hide = function() {
        this.element.style.display = "none";
    };

    Entity.prototype.on = function(eventName, handler) {
        this.element["on" + eventName.toLowerCase()] = handler;
    };

    Entity.prototype.value = function (val) {
        if ("value" in this.element) {
            if (typeof val !== "undefined") {
                this.element.value = val;
            } else {
                return this.element.value;
            }
        }else {
            return;
        }
    };

    Entity.prototype.html = function (val) {
        if (typeof val !== "undefined") {
            this.element.innerHTML = val;
        } else {
            return this.element.innerHTML;
        }
    };

    function getElem(id) {
        return new Entity(document.getElementById(id));
    }

    function wrap(elem) {
        return new Entity(elem);
    }

    /*
     tag[String] тег элемента
     id[String] id элемента
     classNames[Array] массив имен класса элемента
     */
    function createElem(tag, id, classNames) {
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
    }

    function appendToBody(elem) {
        document.body.appendChild(elem);
    }

    return {
        getElem: getElem,
        createElem: createElem,
        appendToBody: appendToBody,
        wrap: wrap
    }
})();