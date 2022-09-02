// let vista_preliminar = (event) => {
//     let leer_img = new FileReader();
//     let id_img = document.getElementById("img-foto");

//     leer_img.onload = (){
//         if(leer_img.readyState == 2){
//             id_img.src = leer_img.result
//         }
//     }
//     leer_img.readAsDataURL(event.target.files[0])
// }

document.getElementById("file").onchange=function(event) {
    let readImg = new FileReader();
    readImg.readAsDataURL(event.target.files[0]);
    readImg.onload = function() {
        let preview = document.getElementById("preview");
        imagen = document.createElement("img");
        imagen.src = readImg.result;
        preview.append(imagen);

        return imagen;
    }
}
