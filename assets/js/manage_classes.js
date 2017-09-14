(function(){
    
      //function to delete record by settin id on form and then submitting the form
      //sets value of student id in hidden delete form and submits form
      //not completely ideal but wanted to take advantage of flash messages in sails
      function deleteClass(record_id){
        $("#deleteform_class input[name=class_id]").val(record_id);
        $("#deleteform_class").submit();
      }
    
      function getClass(record_id){
        return $.get("http://localhost:1337/class/" + record_id, function(data){
          console.log("got grade");
        })
      }
    
      $(function(){
            //add datatables
            $(document).ready(function(){
              $('#classTable').DataTable( {
                fixedHeader: true,
                responsive: true,
                scrollY:        200,
                deferRender:    true,
                scroller:       true,
                colReorder: true,
                dom: 'Bfrtip',
                buttons: [
                  'copy', 'csv', 'excel', 'pdf', 'print'
                ]
            } );
          });
    
        //initialize variables for items in the DOM we will work with
        let manageClassForm = $("#manageClassForm");
        let addClassButton = $("#addClassButton");
    
        //add student button functionality
        addClassButton.click(function(){
          manageClassForm.attr("action", "/create_class");
          manageClassForm.dialog({
            title: "Add Record",
            width: 700,
            modal: true,
            buttons: {
              Cancel: function() {
                $( this ).dialog( "close" );
              },
              "Submit": function() {
                //function to delete record
                manageClassForm.submit()
              }
            }
          });
        })
    
          $("#classTable").on("click", "#editButton_class", function(e){
          let recordId = $(this).data("classid")
          manageClassForm.find("input[name=class_id]").val(recordId);
          manageClassForm.attr("action", "/update_class");
          let classItem = getClass(recordId);
    
          //populate form when api call is done (after we get student to edit)
          classItem.done(function(data){
            $.each(data, function(name, val){
                var $el = $('[name="'+name+'"]'),
                    type = $el.attr('type');
    
                switch(type){
                    case 'checkbox':
                        $el.attr('checked', 'checked');
                        break;
                    case 'radio':
                        $el.filter('[value="'+val+'"]').attr('checked', 'checked');
                        break;
                    default:
                        $el.val(val);
                }
            });
          })
    
          manageClassForm.dialog({
            title: "Add Record",
            width: 700,
            modal: true,
            close : function(event, ui) {
              $("#class_id").val("");
              $("#instructor_id").val("");
              $("#subject").val("");
              $("#course").val("");
           },
            buttons: {
              Cancel: function() {
                $( this ).dialog( "close" );
              },
              Submit: function() {
                //function to delete record
                manageClassForm.submit()
              }
            }
          });
        })
    
    
        $("#classTable").on("click", "#deleteButton_class", function(e){
          let recordId = $(this).data("classid")
          $("#deleteConfirm_class").dialog({
            title: "Confirm Delete",
            modal: true,
            buttons: {
              Cancel: function() {
                $( this ).dialog( "close" );
              },
              "Delete Class": function() {
                //function to delete record
                deleteClass(recordId);
              }
            }
          });
        })
    
      })
    
    })();