//Global variables
var file, file_name, ext, formData = new FormData(), data, url="root/", allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf)$/i;

// preventing page from redirecting
$("html").on("dragover", function(e) { stop(e); });

// on drop append file
$("html").on("drop", function(e) {
    stop(e);
    file = e.originalEvent.dataTransfer.files[0].name;
    formData.append('file', e.originalEvent.dataTransfer.files[0]);
    append_file(e);
});

//Onchange input file
$(".dragger input[type='file']").on("change", function(e){
    let path = e.target.files;
    file = path[0].name;
    formData.append('file', $(this)[0].files[0]);
    append_file(e);
});

//Append file
function append_file(e){
    if(!allowedExtensions.exec(file)){
        popup(0, "This file type is not allowed");
    } else {
        if ($(".file_preview li").length >= 2){
            popup(0, "Max file uploads have reached");
            return 1;
        } else {
            ext = file.split('.').pop();
            file_name = file.split('.').slice(0, -1).join('.').replace(/\s+/g, '_');
            file_name.length > 10 ? file_name = file_name.substr(0,15) + "......" +ext : file_name = file;
            $(".file_preview").append('<li class="fixed_flex" ><progress value="0" max="100"></progress></li>');
        }
    }
    Upload(formData, e);
}

//Remove appended files
function remove(val, e){
    $.ajax({
        url: url,
        type: 'POST',
        data: "FormType=pathremove&path="+val,
        beforeSend: function() {
            $(".dragger").css("opacity","0.6");
            $(".dragger").css("pointer-events","none");
        },
        success: function(response){
          return e.parentNode.remove();
        },
        complete: function() {
            $(".dragger").css("opacity","1");
            $(".dragger").css("pointer-events","auto");
        }
    });
}

//Stop
function stop(e){
    e.preventDefault();
    e.stopPropagation();
}


//Upload file
function Upload(formdata, e){
    $.ajax({
         url: url,
         type: 'post',
         data: formdata,
         contentType: false,
         processData: false,
         dataType: 'json',
         beforeSend: function() {
            $(".dragger").css("opacity","0.6");
            $(".dragger").css("pointer-events","none");
         },
         xhr: function() {
            var xhr = new window.XMLHttpRequest();
            xhr.upload.addEventListener("progress", function(evt) {
                if (evt.lengthComputable) {
                    $(".file_preview li:last-child progress").val((evt.loaded / evt.total) * 100);
                }
            }, false);
            return xhr;
        },
         success: function(response){
            if (JSON.stringify(response['type']).replace(/"/g, "") == 0){
                popup(0, response['mssg']);
                $(".file_preview li:last-child").remove();
            } else {
                $(".file_preview li:last-child").html('<a href=./assets/images/'+response["name"]+' class="link" target="_blank">'+ file_name +'</a><a href="javascript:void(0)" class="remove" onclick="remove(\''+JSON.stringify(response['name']).replace(/"/g, "")+'\', this)"><i class="fa fa-times"></i></a>');
              }
         },
         complete: function() {
            $(".dragger").css("opacity","1");
            $(".dragger").css("pointer-events","auto");
         }
    });
}
