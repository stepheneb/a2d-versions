
window.onload=function() {

  var selectModel   = document.getElementById("select-model"),
      modelFrame    = document.getElementById("model-iframe"),
      introduction  = document.getElementById("introduction"),
      modelsHeader  = document.getElementById("models-header"),
      description   = document.getElementById("description"),
      comparerange  = document.getElementById("comparerange"),
      comparetarget = "https://github.com/stepheneb/avalanche2d-js/compare/",
      taggedcode    = document.getElementById("taggedcode"),
      taggedtarget  = "https://github.com/stepheneb/avalanche2d-js/tree/";

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

  function selectModelChange() {
    document.location.search = 'model=' + selectModel.value;
    modelFrame.src = selectModel.value + '/avalanche2d.html';
  };

  selectModel.onchange = selectModelChange;

  let params = new URLSearchParams(document.location.search.substring(1));
  var model = params.get('model');

  if (model) {
    selectModel.value = model;
    modelFrame.src = selectModel.value + '/avalanche2d.html';
  } else {
    document.location.search = 'model=' + selectModel.value;
  }

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

  introduction.innerHTML = converter.makeHtml(content[selectModel.value].introduction);
  description.innerHTML = converter.makeHtml(content[selectModel.value].description);

  // look for code blocks and add syntax highlighting
  Prism.highlightAll()

  taggedcode.href = taggedtarget + content[selectModel.value].tag;
  taggedcode.text = "tag: " + content[selectModel.value].tag;

  comparerange.href = comparetarget + content[selectModel.value].comparerange;
  comparerange.text = "compare: " + content[selectModel.value].comparerange;

}