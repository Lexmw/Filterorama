const image = document.getElementById("output");
const uploadButton = document.getElementById("upload-button");
const topuploadButton = document.getElementById("top-upload-button");
const editImage = document.getElementById("edited-photo");

let fileUrl;
let fileName;
let PhotoFilter;

const loadFile = function (event) {
  uploadButton.style.display = "none";
  topuploadButton.style.display = "block";
  image.style.display = "block";
  image.src = URL.createObjectURL(event.target.files[0]);
  editImage.src = URL.createObjectURL(event.target.files[0]);
  fileUrl = URL.createObjectURL(event.target.files[0]);
  fileName = event.target.files[0].name;
};

const AddFilter = (filterParam) => {
    editImage.style.filter = filterParam;
    PhotoFilter = filterParam;
    console.log(filterParam);
}

document.getElementsByClassName("filterBoxes")[0].addEventListener("click", () => AddFilter("none"));
document.getElementsByClassName("filterBoxes")[1].addEventListener("click", () => AddFilter("sepia(100%)"));
document.getElementsByClassName("filterBoxes")[2].addEventListener("click", () => AddFilter("grayscale(100%)"));
document.getElementsByClassName("filterBoxes")[3].addEventListener("click", () => AddFilter("saturate(8)"));

const download = () => {
  let img = new Image();
  img.src = document.getElementById("edited-photo").src;

  // Create a canvas object.
  let canvas = document.createElement("canvas");

  // Wait till the image is loaded.
  console.log(fileName)
  img.onload = function () {
    rotateImage();
    saveImage(img.src.replace(/^.*[\\\/]/, ""));
  };

  let rotateImage = () => {
    // Create canvas context.
    let ctx = canvas.getContext("2d");

    // Assign width and height.
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.filter = PhotoFilter;

    ctx.drawImage(img, -img.width / 2, -img.height / 2);
  };

  let saveImage = (img_name) => {
    let a = document.createElement("a");
    a.href = canvas.toDataURL("image/jpg");
    a.download = img_name;
    document.body.appendChild(a);
    a.click();
  };
};

// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("edited-photo");
var modalImg = document.getElementById("img01");

img.onclick = function(){
    modalImg.style.filter = PhotoFilter;
    modalImg.src = this.src;
    modal.style.display = "block";
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
