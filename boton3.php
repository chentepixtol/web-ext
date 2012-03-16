<?php

require_once 'Zend/Text/Figlet.php';

$figlet = new Zend_Text_Figlet();

echo '<pre>'.$figlet->render('chentepixtol').'</pre>';