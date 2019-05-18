<?php

class Request {

    protected $method;
    protected $resource;
    protected $recource_parts;

    function __construct() {
        $this->init();
    }

    protected function init() {
        // Request method
        $this->method = $_SERVER['REQUEST_METHOD'];

        // Get the resource without query
        $this->resource = $this->stripQueryString($_SERVER['REQUEST_URI']);

        // Get the resource parts
        $this->resource_parts = $this->splitResourceString($this->resource);
    }

    private function stripQueryString($uri) {
        $questionMarkPosition = strpos($uri, '?');

        if($questionMarkPosition !== false) {
            return substr($uri,0,$questionMarkPosition);
        }

        return $uri;
    }

    private function splitResourceString($resourceString) {
        $parts = array_filter(explode('/', $resourceString), array($this, 'resourceFilter'));

        if (!empty($parts)) {
            return array_combine(range(0, count($parts)-1), $parts);
        } else {
            return $parts;
        }
    }

    private function resourceFilter($input) {
        return trim($input) != '';
    }

    public function getResourcePart($id) {
        $return = "";

        if (isset($this->resource_parts[$id])) {
            $return = $this->resource_parts[$id];
        }

        return $return;
    }

    public function getResourcePath($depth = null) {
        $return = "";

        if (!is_null($depth)) {
            for ($i = 0; $i < $depth; $i++) {
                $return .= $this->resource_parts[$i] . "/";
            }
        } else {
            $return = implode('/', $this->resource_parts);
        }

        return $return;
    }

    public function getParam($param) {
        $return = "";

        if (isset($_GET[$param])) {
            $return = $_GET[$param];
        }

        return $return;
    }
}

?>