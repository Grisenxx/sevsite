var btn_curso = document.getElementById("btn_curso");
var btn_scanner = document.getElementById("btn_scanner");

var section_curso = document.getElementById("section_curso");
var section_scanner = document.getElementById("section_scanner");

btn_curso.addEventListener("click", function() {
    btn_curso.classList.add("active");
    btn_scanner.classList.remove("active");

    section_scanner.style.display = "none";
    section_curso.style.display = "";
})

btn_scanner.addEventListener("click", function() {
    btn_scanner.classList.add("active");
    btn_curso.classList.remove("active");

    section_curso.style.display = "none";
    section_scanner.style.display = "";
})