var contenidofich = "";
var nombrefich = "";

function evaluarToken () {
    var tokenMetido = $("#token").val();
   
    github = new Github({
        token: tokenMetido,
        auth: "oauth"
    });
    $("#formularioInfo").show();
};


function mostrarInfo(error,repo){
    var repodata = $("#repodata");
    if (error) {
	repodata.html("<p>Error code: " + error.error + "</p>");
    } else {
	repodata.html("<p>Repo data:</p>" +
	      "<ul><li>Nombre completo: " + repo.full_name + "</li>" +
	      "<li>Descripcion: " + repo.description + "</li>" +
	      "<li>Creado en: " + repo.created_at + "</li>" +
	      "</ul>")
    }
    $("#formularioFichero").show();
};

function infoRepo() {

    var username = $("#user").val();
    var reponame = $("#repo").val();
    repo = github.getRepo(username, reponame);
    repo.show(mostrarInfo);
};

function escribirEnRepo(){

    nombrefich = $("#nombre").val();
    contenidofich = $("#contenido").val();

    repo.write('master', nombrefich, contenidofich, "commit realizado desde el propio ejercicio", function(err) {console.log (err)});
    $("#botonLeer").show();
}

function leerFichero(){

    console.log(nombrefich + contenidofich);
    repo.read("master", nombrefich, function(err, data) {
	    console.log (err, data);
	    $("#muestraLeido").html(data);
	});
	$("#muestraLeido").show();
}


$(document).ready(function() {
    $("#muestraLeido").hide();
    $("#formularioInfo").hide();
    $("#formularioFichero").hide();
    $("#botonLeer").hide();
    $("#formularioToken button").click(evaluarToken);    
    $("#formularioInfo button").click(infoRepo);
    $("#formularioFichero button").click(escribirEnRepo);
    $("#botonLeer").click(leerFichero);
    
    
});
