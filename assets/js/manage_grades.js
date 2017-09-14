(function(){
    
      //function to delete record by settin id on form and then submitting the form
      //sets value of student id in hidden delete form and submits form
      //not completely ideal but wanted to take advantage of flash messages in sails
      function deleteGrade(record_id){
        $("#deleteform_grade input[name=grade_id]").val(record_id);
        $("#deleteform_grade").submit();
      }
    
      function getGrade(record_id){
        return $.get("http://localhost:1337/grade/" + record_id, function(data){
          console.log("got grade");
        })
      }
    
      $(function(){
            //add datatables
            $(document).ready(function(){
              $('#gradeTable').DataTable( {
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
        let manageGradeForm = $("#manageGradeForm");
        let addGradeButton = $("#addGradeButton");
    
        //add student button functionality
        addGradeButton.click(function(){
          manageGradeForm.attr("action", "/create_grade");
          manageGradeForm.dialog({
            title: "Add Record",
            width: 700,
            modal: true,
            buttons: {
              Cancel: function() {
                $( this ).dialog( "close" );
              },
              "Submit": function() {
                //function to delete record
                manageGradeForm.submit()
              }
            }
          });
        })
    
          $("#gradeTable").on("click", "#editButton_grade", function(e){
          let recordId = $(this).data("gradeid")
          manageGradeForm.find("input[name=grade_id]").val(recordId);
          manageGradeForm.attr("action", "/update_grade");
          let grade = getGrade(recordId);
    
          //populate form when api call is done (after we get student to edit)
          grade.done(function(data){
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
    
          manageGradeForm.dialog({
            title: "Add Record",
            width: 700,
            modal: true,
            close : function(event, ui) {
              $("#grade_id").val("");
              $("#grade").val("");
           },
            buttons: {
              Cancel: function() {
                $( this ).dialog( "close" );
              },
              Submit: function() {
                //function to delete record
                manageGradeForm.submit()
              }
            }
          });
        })
    
    
        $("#gradeTable").on("click", "#deleteButton_grade", function(e){
          let recordId = $(this).data("gradeid")
          $("#deleteConfirm_grade").dialog({
            title: "Confirm Delete",
            modal: true,
            buttons: {
              Cancel: function() {
                $( this ).dialog( "close" );
              },
              "Delete Grade": function() {
                //function to delete record
                deleteGrade(recordId);
              }
            }
          });
        })
    
      })
    
    })();
    