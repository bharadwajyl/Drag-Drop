<?php
if (strstr($_SERVER['HTTP_REFERER'], $_SERVER['HTTP_HOST'])){
    if (isset($_POST["FormType"])){
        switch ($_POST["FormType"]){
            case "pathremove":
            unlink("../assets/images/".$_POST["path"]);
            break;
        }
    } else {
        $file_type = array("jpg", "jpeg", "png", "pdf");
        $return_arr = array();
        if (!is_dir("../assets/images")) { mkdir("../assets/images"); } 
        $location = "../assets/images/";
        $filename = $_FILES['file']['name'];
        $filesize = $_FILES['file']['size'];
        $target_file = $location . basename($_FILES["file"]["name"]);
        $ext = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
        $newname = rand().'.'. pathinfo($_FILES["file"]["name"] ,PATHINFO_EXTENSION);
        if(!in_array($ext, $file_type)){
            $return_arr = array("type" => "0", "mssg" => "File type not allowed");
        } else if($filesize > 500000){
            $return_arr = array("type" => "0", "mssg" => "File size restricted to 500KB");
        } else if(move_uploaded_file($_FILES['file']['tmp_name'], $location .$newname)){
             $return_arr = array("name" => $newname, "size" => $filesize, "type" => "1", "mssg" => "Image uploaded");
        } else {
            $return_arr = array("type" => "0", "mssg" => "Error unknown. Notified developers");
        }
        echo json_encode($return_arr);
    }
} else {
    die("Not allowed");
}
