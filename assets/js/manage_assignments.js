(function(){
    
      //function to delete record by settin id on form and then submitting the form
      //sets value of student id in hidden delete form and submits form
      //not completely ideal but wanted to take advantage of flash messages in sails
      function deleteAssignment(record_id){
        $("#deleteform_assignment input[name=assignment_id]").val(record_id);//maybe need to update name?
        $("#deleteform_assignment").submit();
      }
    
      function getAssignment(record_id){
        return $.get("http://localhost:1337/assignment/" + record_id, function(data){
          console.log("got assignment");
        })
      }
    
      $(function(){
            //add datatables
            $(document).ready(function(){
              $('#assignmentTable').DataTable( {
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
        let manageAssignmentForm = $("#manageAssignmentForm");
        let addAssignmentButton = $("#addAssignmentButton");
    
        //add student button functionality
        addAssignmentButton.click(function(){
          manageAssignmentForm.attr("action", "/create_assignment");
          manageAssignmentForm.dialog({
            title: "Add Record",
            width: 700,
            modal: true,
            buttons: {
              Cancel: function() {
                $( this ).dialog( "close" );
              },
              "Submit": function() {
                //function to delete record
                manageAssignmentForm.submit()
              }
            }
          });
        })
    
          $("#assignmentTable").on("click", "#editButton_assignment", function(e){
          let recordId = $(this).data("assignmentid")
          manageAssignmentForm.find("input[name=assignment_id]").val(recordId);
          manageAssignmentForm.attr("action", "/update_assignment");
          let assignment = getAssignment(recordId);
    
          //populate form when api call is done (after we get student to edit)
          assignment.done(function(data){
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
    
          manageAssignmentForm.dialog({
            title: "Add Record",
            width: 700,
            modal: true,
            close : function(event, ui) {
              $("#assignment_id").val("");
              $("#student_id").val("");
              $("#assignment_nbr").val("");
              $("#grade_id").val("");
              $("#class_id").val("");
           },
            buttons: {
              Cancel: function() {
                $( this ).dialog( "close" );
              },
              Submit: function() {
                //function to delete record
                manageAssignmentForm.submit()
              }
            }
          });
        })
    
    
        $("#assignmentTable").on("click", "#deleteButton_assignment", function(e){
          let recordId = $(this).data("assignmentid")
          $("#deleteConfirm_assignment").dialog({
            title: "Confirm Delete",
            modal: true,
            buttons: {
              Cancel: function() {
                $( this ).dialog( "close" );
              },
              "Delete Assignment": function() {
                //function to delete record
                deleteAssignment(recordId);
              }
            }
          });
        })
    
      })
    
    })();
    