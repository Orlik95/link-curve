function validateForm(fields){

    var OK = true;
    console.log(fields);

    fields.forEach(function(field){

        if(document.getElementById(field).value === ""){

            document.getElementById(field).classList.add("invalid");
            OK = false;
        }
        else
        {
            document.getElementById(field).classList.remove("invalid");
        }
    });

    return OK;
}