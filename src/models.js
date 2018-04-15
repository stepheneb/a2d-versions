
window.onload=function() {

  var params        = new URLSearchParams(document.location.search.substring(1)),
      selectModel   = document.getElementById("select-model"),
      nextModel     = document.getElementById("next-model"),
      previousModel = document.getElementById("previous-model"),
      modelFrame    = document.getElementById("model-iframe"),
      introduction  = document.getElementById("introduction"),
      modelsHeader  = document.getElementById("models-header"),
      description   = document.getElementById("description"),
      comparerange  = document.getElementById("comparerange"),
      comparetarget = "https://github.com/stepheneb/avalanche2d-js/compare/",
      taggedcode    = document.getElementById("taggedcode"),
      taggedtarget  = "https://github.com/stepheneb/avalanche2d-js/tree/",
      modelnum;

  //showdown converts markdown to html
  showdown.setFlavor('github');
  showdown.extension('targetlink', function() {
    return [{
      type: 'html',
      filter: function (text) {
        return (''+text).replace(/<a\s+href=/gi, '<a target="_blank" href=');
      }
    }];
  });
  var converter = new showdown.Converter({ simpleLineBreaks: false, extensions: ['targetlink'] });

  function loadModel(num) {
    var search = 'model=' + num;
    if (search !== document.location.search.substring(1)) {
      document.location.search = search;
    }
    // document.location.search = 'model=' + num;
    modelFrame.src = content[num].tag + '/avalanche2d.html';
  }

  function selectModelChange() {
    var num = Number(selectModel.value);
    loadModel(num);
  }

  selectModel.onchange = selectModelChange;

  nextModel.onclick = function() {
    var num = Number(selectModel.value) + 1;
    selectModel.value = num;
    selectModelChange();
  };

  previousModel.onclick = function() {
    var num = Number(selectModel.value) - 1;
    if (num < 1) { return; }
    selectModel.value = num;
    selectModelChange();
  };

  modelFrame.onload = function() {
    var container = modelFrame.contentDocument.getElementById("container");
    var width, height;
    width = container.clientWidth + 'px';
    height = container.offsetHeight + 20 + 'px';

    modelFrame.style.clientWidth = width;
    modelFrame.style.height = height;

    introduction.style.width = width;
    modelsHeader.style.width = width;
    description.style.width = width;
  };

  if (params.has('model')) {
    modelnum = Number(params.get('model'));
    if (modelnum > 0 && modelnum <= selectModel.length) {
      selectModel.value = modelnum;
    } else {
      modelnum = 1;
      selectModel.value = modelnum;
    }
  }
  loadModel(modelnum);

  if (modelnum == selectModel.length) {
    nextModel.classList.add('disabled');
  } else {
    nextModel.classList.remove('disabled');
  }

  if (modelnum == 1) {
    previousModel.classList.add('disabled');
  } else {
    previousModel.classList.remove('disabled');
  }

  introduction.innerHTML = converter.makeHtml(content[modelnum].introduction);
  description.innerHTML = converter.makeHtml(content[modelnum].description);

  // look for code blocks and add syntax highlighting
  Prism.highlightAll();

  taggedcode.href = taggedtarget + content[modelnum].tag;
  taggedcode.text = "tag: " + content[modelnum].tag;

  comparerange.href = comparetarget + content[modelnum].comparerange;
  comparerange.text = "compare: " + content[modelnum].comparerange;


  // loadModel(Number(selectModel.value));

};