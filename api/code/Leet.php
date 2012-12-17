<?php

use UnitedPrototype\GoogleAnalytics;

class Leet {
    private static $base_path;
    public static $isLive;
    public static $url_api;

    public static $Request;
    public static $Fonts;

    function __construct() {}

    public static function run() {
        // Init
        self::init();

        // Handle request
        self::$Request = new Request();

        // Load fonts
        self::$Fonts = new Fonts();
    }

    protected static function init() {
        self::$isLive = false;
        self::$url_api = "http://weloveiconfonts.local/api/fonts/";

        // Local vs production
        if (preg_match('!(weloveiconfonts.com)!', $_SERVER['HTTP_HOST']) == 1) {
            self::$isLive = true;
            self::$url_api = "http://weloveiconfonts.com/api/fonts/";
        }

        // Set the include path
        set_include_path(self::loadIncludePath());

        // Auto include
        self::autoInclude();
    }

    protected static function loadIncludePath($includes = null) {
        self::$base_path = getcwd();
        $include_path = "";

        if (is_null($includes)) {
            $includes = array(
                'code',
                'fonts',
                'php-ga'
            );
        }

        foreach ($includes as $toInclude) {
            $include_path .= self::$base_path . '/../' . $toInclude . PATH_SEPARATOR;
        }

        $include_path = get_include_path() . PATH_SEPARATOR . $include_path;

        return $include_path;
    }

    protected static function autoInclude() {
        $includes = array(
            'Fonts',
            'Request',
            'php-ga/autoload'
        );

        foreach ($includes as $toInclude) {
            include_once $toInclude . '.php';
        }
    }

    /**
     * Track the request with Google Analytics.
     */
    public static function track() {
        // Initilize GA Tracker
        $tracker = new GoogleAnalytics\Tracker('UA-5596313-6', 'weloveiconfonts.com');

        // Assemble Visitor information
        $visitor = new GoogleAnalytics\Visitor();
        $visitor->setIpAddress($_SERVER['REMOTE_ADDR']);
        $visitor->setUserAgent($_SERVER['HTTP_USER_AGENT']);
        $visitor->setScreenResolution('1024x768');

        // Assemble Session information
        $session = new GoogleAnalytics\Session();

        // Assemble Page information
        $page = new GoogleAnalytics\Page($_SERVER['REQUEST_URI']);
        $page->setTitle('We Love Icon Fonts');

        // Track page view
        $tracker->trackPageview($page, $session, $visitor);

        print_r($tracker);
    }
}

?>