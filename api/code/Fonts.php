<?php

class Fonts {

  private $output;

  function __construct() {
    $this->output = "";
  }

  /**
   * Available fonts 
   */
  private $fonts = array(
    'brandico' => array(
      'family' => 'brandico',
      'filename' => 'brandico',
      'svgID' => 'brandico',
      'weight' => 'normal',
      'style' => 'normal',
    ),

    'entypo' => array(
      'family' => 'entypo',
      'filename' => 'entypo',
      'svgID' => 'entypo',
      'weight' => 'normal',
      'style' => 'normal',
    ),

    'fontawesome' => array(
      'family' => 'FontAwesome',
      'filename' => 'fontawesome-webfont',
      'svgID' => 'FontAwesomeRegular',
      'weight' => 'normal',
      'style' => 'normal',
    ),

    'fontelico' => array(
      'family' => 'fontelico',
      'filename' => 'fontelico',
      'svgID' => 'fontelico',
      'weight' => 'normal',
      'style' => 'normal',
    ),

    'iconicfill' => array(
      'family' => 'IconicFill',
      'filename' => 'iconic_fill',
      'svgID' => 'IconicFill',
      'weight' => 'normal',
      'style' => 'normal',
    ),

    'iconicstroke' => array(
      'family' => 'IconicStroke',
      'filename' => 'iconic_stroke',
      'svgID' => 'IconicStroke',
      'weight' => 'normal',
      'style' => 'normal',
    ),

    'maki' => array(
      'family' => 'maki',
      'filename' => 'maki',
      'svgID' => 'maki',
      'weight' => 'normal',
      'style' => 'normal',
    ),

    'openwebicons' => array(
      'family' => 'OpenWeb Icons',
      'filename' => 'openwebicons',
      'svgID' => 'openweb_iconsregular',
      'weight' => 'normal',
      'style' => 'normal',
    ),

    'typicons' => array(
      'family' => 'Typicons',
      'filename' => 'typicons-regular-webfont',
      'svgID' => 'TypiconsRegular',
      'weight' => 'normal',
      'style' => 'normal',
    ),

    'zocial' => array(
      'family' => 'zocial',
      'filename' => 'zocial-regular-webfont',
      'svgID' => 'zocialregular',
      'weight' => 'normal',
      'style' => 'normal'
    ),
  );

  /**
   * Returns the output for the font-family <CODE>$name</CODE>.
   * 
   * @return String $output
   */
  public function getFamily($name) {
    if (isset($this->fonts[$name])) {
      $this->output = "";
      $this->createOutput($name);
    } else {
      // Error-handling
    }

    if (!empty($this->output)) {
      return $this->output;
    }
  }

  public function getFont($name) {
    $return = "";

    if (isset($this->fonts[$name])) {
      $return = $this->fonts[$name];
    }

    return $return;
  }

  /**
   * Creates the CSS stuff (@font-face + ::before) for the font <CODE>$name</CODE>
   * and saves it into <CODE>$output</CODE>.
   */
  protected function createOutput($name) {
    $font = (object) $this->fonts[$name];

    // Create font-face
    $this->output = "
@font-face {
  font-family: '" . $font->family . "';
  font-style: '" . $font->style . "';
  font-weight: '" . $font->weight . "';
  src: url('" . Leet::$url_api . $name . "/" . $font->filename . ".eot');
  src: url('" . Leet::$url_api . $name . "/" . $font->filename . ".eot?#iefix') format('eot'), 
  url('" . Leet::$url_api . $name . "/" . $font->filename . ".woff') format('woff'), 
  url('" . Leet::$url_api . $name . "/" . $font->filename . ".ttf') format('truetype'), 
  url('" . Leet::$url_api . $name . "/" . $font->filename . ".svg#" . $font->svgID . "') format('svg');
}
";

    // Load CSS
    $css = file_get_contents("fonts/$name/$name-min.css", FILE_USE_INCLUDE_PATH);
    $this->output .= $css;
  }
}

?>