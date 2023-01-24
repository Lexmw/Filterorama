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

//turn object values into a string
const objectToString = (obj) => {
  let array = [];

  for (const [key, value] of Object.entries(obj)) {
    array.push(`${key}(${value})`);
  };

  return array.join(' ');
};

const ApplyFilter = (filterParam) => {
    editImage.style.filter = filterParam;
    PhotoFilter = filterParam;
};

//Remove filter from list 
const removeFilter = (elemTitle) => {
  let filterContainer = document.getElementById("FilterContainer");
  let filter = document.querySelector(`[title="${elemTitle}"]`);
  filterContainer.removeChild(filter);
};

//Grab the filter boxes by the className, then dynamically place them on the page as new ones are added
Array.from(document.getElementsByClassName("filterBoxes")).map((box, index) => {
  box.addEventListener("click", () => ApplyFilter(box.attributes.title.nodeValue));
  box.firstChild.addEventListener("click", () => removeFilter(box.attributes.title.nodeValue));
});


//Download the image to local computer
const download = () => {
  let img = new Image();
  img.src = document.getElementById("edited-photo").src;

  // Create a canvas object.
  let canvas = document.createElement("canvas");

  // Wait till the image is loaded.
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

// Show image in modal
let modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
let img = document.getElementById("edited-photo");
let modalImg = document.getElementById("img01");

img.onclick = function(){
    modalImg.style.filter = PhotoFilter;
    modalImg.src = this.src;
    modal.style.display = "block";
};

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

//Show modal to create new filter
let filterModal = document.getElementById('FilterModal');
let plusBox = document.getElementsByClassName('plusBox')[0];
let addButton = document.getElementsByClassName('addButton')[0];
let close = document.getElementsByClassName("closeFilterModal")[0];

plusBox.onclick = function(){
  filterModal.style.display = "block";
};

addButton.onclick = function(){
  filterModal.style.display = "none";
  addNewFilter();
}

close.onclick = function(){
  filterModal.style.display = "none";
}

//In Filter Modal grab the value of slider, display it next to it, update the filter on the image, then store values in object
let scaleValues = {};
let imagePlaceHolder = document.getElementById('IMGPlaceHolder');

const filterScaleValues = (scaleName, outputName) => {
  const scale = document.getElementById(scaleName);
  const output = document.getElementById(outputName);
  let array = [];
  let scaleUnit = scaleName == 'blur' ? 'px':scaleName == 'hue-rotate'?'deg':'%';

  output.innerHTML = `${scale.value}${scaleUnit}`;
  scaleValues[scaleName] = `${scale.value}${scaleUnit}`;

  imagePlaceHolder.style.filter = `${objectToString(scaleValues)}`;

  return;
};

//Add new filter to the main page
const addNewFilter = () => {
  let filterContainer = document.getElementById("FilterContainer");
  let element = document.createElement("div");
  let cross = document.createElement("div");
  let elemAttributes = objectToString(scaleValues);

  element.classList.add("filterBoxes");
  element.title = objectToString(scaleValues);
  element.style.filter = objectToString(scaleValues);
  element.addEventListener("click", () => ApplyFilter(elemAttributes));

  cross.classList.add("cross");
  cross.addEventListener("click", () => removeFilter(elemAttributes));
  element.appendChild(cross);

  filterContainer.appendChild(element);
  scaleValues = {};

  return;
};

// What to add to be done... Ability to have the filters persist (use local storage), Mobile Styles Compatibility(?)