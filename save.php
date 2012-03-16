<?php 

$response = array(
    'success' => true,
    'msg' => $_POST['birthdate'],
);

echo json_encode($response);
