var Dropdown = (function($) {

  var obj = {}

  obj.init = function() {
    var arr_opt = []
    var xhr;
    var select_country, select_state;
    var $select_country, $select_state;

    $select_country = $('#country_filter').selectize({
        onItemAdd: function(value) {
          if (!value.length) return;
          select_state.disable();
          xhr && xhr.abort();
          xhr = $.ajax({
            url: '/states?country=' + $select_country[0].selectize.items[0],
            success: function(results) {
              select_state.clearOptions()
              select_state.enable();
              for(i = 0; i < results.length; i++){
                arr_opt.push(results[i]['name']);
                select_state.addOption({value: results[i]['name'], text: results[i]['name']})
              }
            },
            error: function() {
                callback();
            }
          })
        }
    });

    $select_state = $('#states_filter').selectize({
      create: false
    });

    select_state  = $select_state[0].selectize;
    select_country = $select_country[0].selectize;
    select_state.disable();

  }
  return obj
})(jQuery)
