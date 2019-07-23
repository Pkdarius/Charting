let numberFields = 1,
  numberSets = 1;

const addField = () => {
  const labelBefore = document.getElementById('emptyField');
  labelBefore.insertAdjacentHTML("beforebegin",
  `<div class="col">
    <div class="input-group">
      <input type="text" class="form-control label" placeholder="Enter Label for field">
      <div class="input-group-append"> <button class="btn btn-danger" type="button"
          onclick="removeField(${numberFields});"><img class="icon" src="dist/icon/baseline-close-24px.svg" alt=""></button>
      </div>
    </div>
  </div>`);

  const emptyData = document.getElementsByClassName('add-data');
  const emptyBackground = document.getElementsByClassName('add-background');
  const emptyTransparent = document.getElementsByClassName('add-transparent');

  for (let i = 0; i < numberSets; i++) {
    emptyData[i].insertAdjacentHTML("beforebegin", `<div class="col">
      <input type="text" class="form-control data-${i}" name="data[]" placeholder="Enter data">
    </div>`);

    emptyBackground[i].insertAdjacentHTML("beforebegin", `<div class="col">
      <input type="color" class="form-control color background-${i}" name="color[]" value="#FF0000">
    </div>`);

    emptyTransparent[i].insertAdjacentHTML("beforebegin", `<div class="col">
      <input type="range" class="form-control transparent-${i}" name="transparent[]" min="0" max="10">
    </div>`);
  }

  numberFields++;
}

const addSet = () => {
  const emptyRow = document.getElementById('add-set');
  const field = 
  `<div class="card-body">
    <div class="row">
      <div class="col-2">Data</div>
      ${Array(numberFields).join(0).split(0).map(() => 
        `<div class="col">
          <input type="text" class="form-control data-${numberSets}" placeholder="Enter data" name="data[]">
        </div>`)}
      
      <div class="col add-data"></div>
    </div>
    <br>
    <div class="row">
      <div class="col-2">Background Color</div>
      ${Array(numberFields).join(0).split(0).map(() => 
        `<div class="col">
          <input type="color" class="form-control color background-${numberSets}" name="color[]" value="#FF0000">
        </div>`)}      
      <div class="col add-background"></div>
    </div>
    <br>
    <div class="row">
      <div class="col-2">Transparent</div>
      ${Array(numberFields).join(0).split(0).map(() => 
        `<div class="col">
          <input type="range" class="form-control transparent-${numberSets}" name="transparent[]" min="0" max="10">
        </div>`)}      
      <div class="col add-transparent"></div>
    </div>
  </div>`

  emptyRow.insertAdjacentHTML("beforebegin", 
  `<div class="card set set-${numberSets}">
    <div class="card-header">
      <div class="row">
        <div class="col-2">Dataset Name</div>
        <div class="col">
          <input type="text" class="form-control labelset" placeholder="Enter Dataset Name">
        </div>
        <div class="col">
          <input onclick="removeSet(${numberSets})" type="button" class="form-control btn btn-danger" value="Remove Dataset">
        </div>
      </div>
    </div>
    ${field}
  </div>`);
  numberSets++;
}

const removeSet = (index) => {
  console.log(index);
  let removedSet = document.getElementsByClassName('set-' + index);
  removedSet[0].parentNode.removeChild(removedSet[0]);
  numberSets--;
}

const removeField = (index) => {
  let label = document.getElementsByClassName('label')[0].parentNode.parentNode;
  label.parentNode.removeChild(label);

  for(let i = 0; i < numberSets; i++) {
    let data = document.getElementsByClassName('data-' + i)[0].parentNode;
    let background = document.getElementsByClassName('background-' + i)[0].parentNode;
    let transparent = document.getElementsByClassName('transparent-' + i)[0].parentNode;

    data.parentNode.removeChild(data);
    background.parentNode.removeChild(background);
    transparent.parentNode.removeChild(transparent);
  }
}

let label = [], // Labels of fields
  data = [], // data of field (two-dimention array)
  background = [], // background of bar (two-dimention array)
  transparent = [], // transparent of bar
  rgbas = [],
  borderRgbas = [],
  setLabel = [];

  // save data from form
const saveData = () => {
  label = [];
  data = [];
  background = [];
  transparent = [];
  rgbas = [];
  borderRgbas = [];
  setLabel = [];

  let labelElements = document.getElementsByClassName('label');
  for(let i = 0; i < labelElements.length; i++) {
    label.push(labelElements[i].value);
  }

  let labelSetElement = document.getElementsByClassName('labelset');
  for(let i = 0; i < labelSetElement.length; i++) {
    setLabel.push(labelSetElement[i].value);
  }

  for (let i = 0; i < numberSets; i++) {
    let dataFieldsElement = document.getElementsByClassName('data-' + i);
    let backgroundFieldsElement = document.getElementsByClassName('background-' + i);
    let transparentFieldsElement = document.getElementsByClassName('transparent-' + i);

    let dataFields = [],
      backgroundFields = [],
      transparentFields = [];
    for (let index = 0; index < dataFieldsElement.length; index++) {
      dataFields.push(dataFieldsElement[index].value);
      backgroundFields.push(backgroundFieldsElement[index].value);
      transparentFields.push(transparentFieldsElement[index].value);
    }
    data.push(dataFields);
    background.push(backgroundFields);
    transparent.push(transparentFields);
  }

  for(let i = 0; i < background.length; i++) {
    let rgba = [], border = [];
    for(let j = 0; j < background[i].length; j++) {
      const rgb = background[i][j].substring(1)

      let r = rgb.substring(0, 2);
      let g = rgb.substring(2, 4);
      let b = rgb.substring(4, 6);

      let ra = parseInt(r, 16);
      let ga = parseInt(g, 16);
      let ba = parseInt(b, 16);

      let t = transparent[i][j];
      rgba.push(`rgba(${ra}, ${ga}, ${ba}, ${parseInt(t) / 10})`);
      border.push(`rgba(${ra}, ${ga}, ${ba}, 1)`)
    }
    rgbas.push(rgba);
    borderRgbas.push(border);
  }
}