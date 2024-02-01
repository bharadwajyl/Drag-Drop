//Global variables
var popup_content, timer, count = 0;


//PopUp
function popup(type, mssg){
    switch (type){
        case 0:
            popup_content = '<section class="fixed_flex"><a href="javascript:void(0)" class="close" onclick="this.parentNode.remove()"><i class="fa fa-times"></i></a><iconify-icon icon="ph:warning" class="icon-error big"></iconify-icon><article><h2 class="title small">Warning</h2><p>'+mssg+'</p></article></section>';
        break;
    }
    if ($(".popup").length > 0){
        if ($(".popup section").length > 0) {
            $(".popup section").remove();
            $(".popup").append(popup_content);
        } else {
            $(".popup").append(popup_content);
        }
    } else {
        $("body").append('<div class="popup">'+popup_content+'</div>');
    }
    clearTimeout(timer);
    timer = setTimeout(function(){ if($(".popup section").length > 0){ $(".popup section").remove(); }},10000);
}

