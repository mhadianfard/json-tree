var example = {
    "glossary": {
        "title": "example glossary",
        "GlossDiv": {
            "title": "S",
            "GlossList": {
                "GlossEntry": {
                    "ID": "SGML",
                    "SortAs": "SGML",
                    "GlossTerm": "Standard Generalized Markup Language",
                    "Acronym": "SGML",
                    "Abbrev": "ISO 8879:1986",
                    "GlossDef": {
                        "para": "A meta-markup language, used to create markup languages such as DocBook.",
                        "GlossSeeAlso": ["GML", "XML"]
                    },
                    "GlossSee": "markup"
                }
            }
        }
    }
};

$(function(){
    $('#example1').jsonTree(example);
    $('#example2 .json').jsonTree(example);
    $('#example2 textarea').val(JSON.stringify(example));
    $('#example2 textarea').on('keyup', function() {
        try {
            var string = $(this).val();
            var json = $.parseJSON(string);
        } catch (e) {
            $('#example2 .error').css('opacity', 1);
            return;
        }

        $('#example2 .error').css('opacity', 0);
        $('#example2 .json').empty().jsonTree(json);
    });

});



