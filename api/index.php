<?php

  // Compress output if supported
  if (function_exists("gzcompress")) {
    ob_start('ob_gzhandler');
  }

  // Run Leet
  require_once 'code/Leet.php';
  Leet::run();

  $family = Leet::$Request->getParam('family');
  $json = Leet::$Request->getParam('json');

  // Get the font css
  if (!empty($family)) {
    // Get the fonts
    $names = explode('|', $family);

    // #36: Set the default charset
    $fonts = "@charset \"UTF-8\";";

    // Get the CSS for each font
    foreach ($names as $key => $fontname) {
       $fonts .= Leet::$Fonts->getFamily($fontname);
    }

    Leet::track();

    // Output is CSS
    header('Content-type: text/css');
    header('Content-Encoding: gzip');

    print trim($fonts);
    exit();
  }

  // Get the font JSON
  if (!empty($json)) {
    $name = Leet::$Request->getParam('json');

    $json = file_get_contents("fonts/$name/$name-extract.json", FILE_USE_INCLUDE_PATH);
    $array = json_decode($json, true);
    $output = array();

    foreach ($array as $key => $value) {
      $output[] = array(
        'name' => $key,
        'value' => $value
      );
    }

    header('Access-Control-Allow-Origin: *');
    header('Content-type: application/json');
    header('Content-Encoding: gzip');
    
    print trim(json_encode($output));
    exit();
  }
?>