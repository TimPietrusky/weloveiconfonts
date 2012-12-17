<?php

  // Run Leet
  require_once 'code/Leet.php';
  Leet::run();

  $family = Leet::$Request->getParam('family');
  $json = Leet::$Request->getParam('json');

  // Get the font css
  if (!empty($family)) {
    // Get the fonts
    $names = explode('|', $family);
    $fonts = "";

    // Get the CSS for each font
    foreach ($names as $key => $fontname) {
       $fonts .= Leet::$Fonts->getFamily($fontname);
    }

    Leet::track();

    // Output is CSS
    header('Content-type: text/css');
    print trim($fonts);
    exit();
  }

  // Get the font JSON
  if (!empty($json)) {
    $name = Leet::$Request->getParam('json');

    $json = file_get_contents("fonts/$name/$name-extract.json", FILE_USE_INCLUDE_PATH);
    $array = json_decode($json, true);
    $output = array();

    // $output['font'] = Leet::$Fonts->getFont($name);

    foreach ($array as $key => $value) {
      $output[] = array(
        'name' => $key,
        'value' => $value
      );
      // $output['elements'][] = array(
      //   'name' => $key,
      //   'value' => $value
      // );
    }

    header('Content-type: application/json');
    print trim(json_encode($output));
    exit();
  }

?>