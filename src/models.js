
window.onload=function() {

  var selectModel   = document.getElementById("select-model"),
      modelFrame    = document.getElementById("model-iframe"),
      introduction  = document.getElementById("introduction"),
      description   = document.getElementById("description"),
      commitrange   = document.getElementById("commitrange"),
      comparetarget = "https://github.com/stepheneb/avalanche2d-js/compare/";

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
    description.style.width = width;
  };

  introduction.innerHTML = converter.makeHtml(content[selectModel.value].introduction);
  description.innerHTML = converter.makeHtml(content[selectModel.value].description);

  commitrange.href = comparetarget + content[selectModel.value].commitrange;
  commitrange.text = "code: " + content[selectModel.value].commitrange;

}