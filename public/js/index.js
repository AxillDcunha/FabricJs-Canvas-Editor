const canvas = new fabric.Canvas('canvas', {
   width: 500,
   height: 500,

});
canvas.renderAll();
const initialise = (id) => {
   return new fabric.Canvas(id, {
      width: 500,
      height: 500,
   });

}

function upload(e) {
   var fileType = e.target.files[0].type;
   var url = URL.createObjectURL(e.target.files[0]);

   if (fileType === 'image/png' || 'image/jpg') {
      fabric.Image.fromURL(url, function (img) {
         img.set({
            top: 0,
            left: 30
         });
         img.scaleToHeight(180);
         img.scaleToWidth(180);

         canvas.add(img);
      });
   }
   else if (fileType === 'image/svg+xml') { //check if svg
      fabric.loadSVGFromURL(url, function (objects, options) {
         var svg = fabric.util.groupSVGElements(objects, options);
         svg.scaleToWidth(180);
         svg.scaleToHeight(180);
         canvas.add(svg);
      });
   }
}


// canvas.on('mouse:wheel', function(opt) {
//    if( canvas.getZoom().toFixed(5) < 1 ){
//       console.log( canvas.getZoom().toFixed(5));
//       canvas.setZoom(1);
//       return;
//   }
//    var delta = opt.e.deltaY;
//    var zoom = canvas.getZoom();
//    zoom *= 0.999 ** delta;
//    if (zoom > 20) zoom = 20;
//    if (zoom < 0.01) zoom = 0.01;
//    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
//    opt.e.preventDefault();
//    opt.e.stopPropagation();
//  })

canvas.on('mouse:wheel', function (opt) {
   if (canvas.getZoom().toFixed(5) < 1) {
      console.log(canvas.getZoom().toFixed(5));
      canvas.setZoom(1);
      return;
   }
   var delta = opt.e.deltaY;
   var zoom = canvas.getZoom();
   zoom *= 0.999 ** delta;
   if (zoom > 20) zoom = 20;
   if (zoom < 0.01) zoom = 0.01;
   canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
   opt.e.preventDefault();
   opt.e.stopPropagation();
   var vpt = this.viewportTransform;
   if (zoom < 400 / 1000) {
      vpt[4] = 200 - 1000 * zoom / 2;
      vpt[5] = 200 - 1000 * zoom / 2;
   } else {
      if (vpt[4] >= 0) {
         vpt[4] = 0;
      } else if (vpt[4] < canvas.getWidth() - 1000 * zoom) {
         vpt[4] = canvas.getWidth() - 1000 * zoom;
      }
      if (vpt[5] >= 0) {
         vpt[5] = 0;
      } else if (vpt[5] < canvas.getHeight() - 1000 * zoom) {
         vpt[5] = canvas.getHeight() - 1000 * zoom;
      }
   }
});

function removeobj(){
   var object = canvas.getActiveObject();
   if (!object){
       alert('Please select the element to remove');
       return '';
   }
   canvas.remove(object);
}
var c=document.getElementById("canvas");
var ctx=c.getContext("2d");
ctx.beginPath();
ctx.arc(100,75,50,0,2*Math.PI);
ctx.stroke();

function download_image(){
  var canvas = document.getElementById("canvas");
  image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  var link = document.createElement('a');
  link.download = "my-image.png";
  link.href = image;
  link.click();
}
initialise('canvas');