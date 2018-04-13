
window.onload=function() {

  var selectModel = document.getElementById("select-model");

  var model_frame = document.getElementById("model-iframe")

  function selectModelChange() {
    model_frame.src = selectModel.value;
  };

  selectModel.onchange = selectModelChange;

}