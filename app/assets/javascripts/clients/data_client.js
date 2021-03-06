var data_url = {
  DATA_URL: "/api/v1/apt/data/",
};
var DataClient = {
  getData: function(successCallback) {
    $.ajax({
      type: "GET",
      contentType: "application/json",
      url: data_url.DATA_URL,
      success: function(data) {
        successCallback(data);
      },
      error: function(xhr, status, error) {
        console.log(status);
        console.log(error);
      }
    });
  }
}
window.DataClient = DataClient;
