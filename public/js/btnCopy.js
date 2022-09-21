const message = document.querySelector("#message");
const messageCopied = document.querySelector("#messageCopied");

function copiarPortapapeles(texto){
    if(typeof texto != "string"){
        throw TypeError("el argumento debe ")
    }

    let areaTexto = document.createElement("textarea");
    areaTexto.value = texto;
    areaTexto.setAttribute("readonly", "");
    areaTexto.style.position = "absolute";
    areaTexto.style.left = "-999999px";

    document.body.appendChild(areaTexto);

    let seleccionado = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0): 
    false;

    areaTexto.select();

    document.execCommand("copy");

    document.body.removeChild(areaTexto);

    if  (seleccionado){
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(seleccionado);

    }
}

window.onload = function (){
    document.querySelector("#urlCopiar").addEventListener("click", () => {
        let urlRegister = document.querySelector("#urlRegister").value;

        copiarPortapapeles(urlRegister);
        messageCopied.innerHTML = "Copied";

        setTimeout(()=> messageCopied.innerHTML = "", 1500)
    })
}



window.onload = function (){
    document.querySelector("#copiar").addEventListener("click", () => {
        let contenido = document.querySelector("#contenido").value;

        copiarPortapapeles(contenido);
        message.innerHTML = "Copied";

        setTimeout(()=> message.innerHTML= "", 1500)
    })
}
