
window.onload=function() {

  var selectModel = document.getElementById("select-model");
  var model_frame = document.getElementById("model-iframe")

  function selectModelChange() {
    document.location.search = 'model=' + selectModel.value;
    model_frame.src = selectModel.value + '/avalanche2d.html';
  };

  selectModel.onchange = selectModelChange;

  let params = new URLSearchParams(document.location.search.substring(1));
  var model = params.get('model');

  if (model) {
    selectModel.value = model;
    model_frame.src = selectModel.value + '/avalanche2d.html';
  } else {
    document.location.search = 'model=' + selectModel.value;
  }

}