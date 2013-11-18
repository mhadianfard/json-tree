/**
 * JSON-Tree
 * ==========
 * Given a jsonObject, will build a DOM hierarchy to display the jsonObject in HTML.
 * Will append to a supplied parent DOM jQuery element or simply an html string representing the tree.
 * @param jsonObject to print
 * @param appendTo jQuery Element to append the tree to.
 * @returns string
 */

(function(){
    var jsonTree = function(jsonObject, appendTo)
    {
        this.jsonObject = jsonObject;
        this.dom = appendTo || $('<html>');
        this.indent = 20;   // pixels to indent each level

        this.buildTree = function()
        {
            var wrapper = $('<div class="json-tree-wrapper">');
            var tree = this.appendDomTree(this.jsonObject, 0, $('<div class="json-tree">'));
            var html = this.dom.append(wrapper.append(tree)).html();
            return html;
        }

        /**
         * Recursive method to return a dom tree representing the json object.
         * @param object, JSON object to process
         * @param level, index of indentation for branches
         * @param appendTo, DOM object to append to
         * @returns {*|jQuery|HTMLElement}
         */
        this.appendDomTree = function(object, level, appendTo)
        {
            var data = object;
            var indent = (this.indent * level) + 'px';
            var count = 0;
            var dom = appendTo;
            var self = this;

            if (!this.isNone(data)) {
                $.each(data, function(key, value) {
                    count++;
                    var dom_node = $('<div class="jt-node">');
                    var dom_key = $('<span class="jt-key">').css('padding-left', indent);
                    if (object instanceof Array){
                        dom_key.append('[<span class="jt-array-index">' + key + '</span>]:')
                    } else {
                        dom_key.append(key);
                    }
                    var dom_value = $('<div class="jt-value">').css('padding-left', indent);
                    var dom_branch = $('<div class="jt-branch">');
                    var isBranch = false;
                    switch (typeof value){
                        case "function":
                            return true;    //  continue;
                        case "undefined":
                            dom_value.append($('<span class="jt-undefined">undefined</span>'));
                            break;
                        case "number":
                            dom_value.append($('<span class="jt-number">' + value + '</span>'));
                            break;
                        case "string":
                            dom_value.append($('<span class="jt-string">"' + value + '"</span>'));
                            break;

                        case "object":
                            if (value === null){
                                dom_value.append($('<span class="jt-null">null</span>'));
                                break;

                            } else if (value instanceof Array){
                                dom_value.append('<span class="jt-array-label">Array (<span class="jt-array-length">' + value.length + '</span>): </span>');
                                dom_branch.addClass('jt-array');
                                self.appendDomTree(value, level + 1, dom_branch);

                            } else {
                                dom_value.append('<span class="jt-hash-label">Object: </span>');
                                dom_branch.addClass('jt-hash');
                                self.appendDomTree(value, level + 1, dom_branch);
                            }

                            isBranch = true;
                            break;

                        default:
                            dom_value.append($('<span class="jt-other">' + value + '</span>'));
                    }

                    if (object instanceof Array && count < object.length){
                        dom_value.append(",");
                    }

                    dom_node.append(dom_key);
                    dom_node.append(dom_value);
                    dom.append(dom_node);

                    if (isBranch){
                        dom.append(dom_branch);
                    }
                });

                return dom;
            }
        }

        /**
         * Check whether variable is undefined or null
         * @param variable
         * @returns {boolean}
         */
        this.isNone = function(variable)
        {
            return (typeof variable == "undefined" || variable == null);
        }
    };

    /*
     * Append to window
     */
    window.jsonTree = function(jsonObject, appendTo)
    {
        jt = new jsonTree(jsonObject, appendTo);
        return jt.buildTree();
    }

    /*
     * extend jQuery
     */
    $.fn.jsonTree = function(jsonObject){
        return window.jsonTree(jsonObject, this);
    }
})();
