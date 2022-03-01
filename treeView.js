$(function () {
  var jsondata = [
    { id: "Participant", parent: "#", text: "Participant" },
    { id: "Game of Choice", parent: "#", text: "Game of Choice" },
    { id: "Performance", parent: "#", text: "Performance" },
    { id: "Name", parent: "Participant", text: "Name" },
    { id: "Language", parent: "Participant", text: "Language" },
    { id: "Country", parent: "Participant", text: "Country" },
    { id: "Game Name", parent: "Game of Choice", text: "Game Name" },
    { id: "Bought", parent: "Game of Choice", text: "Bought" },
    { id: "Bank Balance", parent: "Performance", text: "Bank Balance" }
  ];

  createJSTree(jsondata);
  $("#chkSelectAll").change(function () {
    if ($("#chkSelectAll").is(":checked")) {
      $("#viewTree").jstree().check_all(true);
    } else {
      $("#viewTree").jstree().uncheck_all(true);
    }
  });
});

function createJSTree(jsondata) {
  $("#viewTree")
    .jstree({
      core: {
        check_callback: true,
        data: jsondata
      },
      checkbox: {
        keep_selected_style: false,
        tie_selection: false
      },
      search: {
        case_sensitive: false,
        show_only_matches: true
      },
      plugins: ["dnd", "checkbox", "search", "contextmenu"]
    })
    .on("check_node.jstree uncheck_node.jstree", function (e, data) {
      if (e.type == "uncheck_node") {
        $("#chkSelectAll").prop("checked", false);
      } else if (e.type == "check_node") {
        if (
          $(this).jstree().get_json("#", { flat: true }).length ===
          $(this).jstree().get_checked(true).length
        )
          $("#chkSelectAll").prop("checked", true);
      }
    });
}
$(document).ready(function () {
  $(".search-input").keyup(function () {
    var searchString = $(this).val();
    $("#viewTree").jstree("search", searchString);
  });
});
