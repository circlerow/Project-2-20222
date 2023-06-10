var input = '<%= info[0].input1 %>'
var output = '<%= info[0].output1 %>'
var option = document.getElementById("answer")
var run = document.getElementById("run");
var lang = document.getElementById("inlineFormSelectPref");

run.addEventListener("click", async function () {
    console.log("input:", input);
    console.log("output:", output);
    code = {
        code: option.value,
        input: input,
        lang: lang.value
    };

    console.log(code);


    var oData = await fetch("http://localhost:8000/compile", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(code)
    });

    var d = await oData.json();
    var output_value = d.output;
    if (output_value == output) {
        document.getElementById("output").innerHTML = "Đúng";
    }
    else {
        document.getElementById("output").innerHTML = "Sai";
    }

});