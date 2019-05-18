<!doctype html>
<html lang="en">
<head>

  <title>We Love Icon Fonts</title>
  
  <meta charset="utf-8">
  <meta name="author" content="Tim Pietrusky">
  <meta name="robots" content="index,follow">
  <meta name="revisit-after" content="1 days">
  <meta name="description" content="A free & open source icon fonts hosting service for testing purposes.">

  <meta property="og:title" content="We Love Icon Fonts">
  <meta property="og:description" content="A free hosting service like Google Web Fonts, but for Icon Fonts (Open Source). Hurray!">
  <meta property="og:image" content="http://weloveiconfonts.com/skin/img/weloveiconfonts.jpg">
  <meta property="og:url" content="http://weloveiconfonts.com">
  <meta name="viewport" content="width=device-width">

  <link rel="stylesheet" href="skin/css/4068f63a.style.css?2">
  <link rel="shortcut icon" href="skin/img/weloveiconfonts.ico" type="image/x-icon">
  <link rel="author" href="https://plus.google.com/112605782451035737058/posts">

</head>

<body id="weloveiconfonts" data-max-width="1024" data-theme="weloveiconfonts" data-auto-extend="true">

  <article class="box--title" data-text="">
    <section data-cols="1">
      <div>
        <h1 class="title">We <span class="hitman__alpha">Love</span> Icon Fonts</h1>
        <p>We must stop here, this is icon fonts country!</p>
      </div>
    </section>
  </article>


  <article data-text="">
      <div class="bugindustries">
        <iframe src="http://s.codepen.io/TimPietrusky/debug/410cc3465a4bea4b6d5a14de695bb7e3" frameborder="0" allowfullscreen=""></iframe>
      </div>
  </article>



  <article data-high="1" data-text="">
    <section data-cols="3">
          <div>
            <h3>What?</h3>
            <p>This is a free & open source <b>icon fonts hosting service</b> (like <a href="http://www.google.com/webfonts" target="_blank">Google Web Fonts</a>, but icon fonts only). Hurray! </p>
          </div>

          <div>
            <h3>Caution!</h3>
            <p>This is a public gamma. Use this service for mockups, reduced test-cases or <a href="http://codepen.io" target="_blank">CodePens</a>, but not on productive systems!</p>
          </div>

          <div>
            <h3>Feedback!?</h3>
            <p>
              Send a message to <a href="http://twitter.com/WeLoveIconFonts" target="_blank">@WeLoveIconFonts</a> or create an <a href="https://github.com/TimPietrusky/weloveiconfonts" target="_blank">issue on GitHub</a>. 
            </p>
          </div>
    </section>
  </article>





  <?php 
    // Load the available icon fonts
    $iconfonts = file_get_contents('skin/js/core/iconfonts.json');
    $data = json_decode($iconfonts);
  ?>

  <?php 

    // Create each icon font 

  ?>
  <?php foreach($data as $iconfont): ?>

  <!-- <?php echo $iconfont->family; ?> -->
  <article class="<?php echo $iconfont->family; ?>" id="<?php echo $iconfont->family; ?>" data-high="2" data-text="">
    <section data-cols="2" class="icon-font--header">
      <div>
        <h2><?php echo $iconfont->name; ?></h2>
        <p><?php echo $iconfont->description; ?></p>
      </div>
      <div>
        <button class="add" data-type="2" data-collection="<?php echo $iconfont->family; ?>"><span class="fontawesome-heart"></span>  add</button>
      </div>
    </section>

    <section data-name="preview" data-cols="1" data-valign="center">
      <div></div>
    </section>
  </article>

  <?php endforeach; ?>




   
<!-- Your Icon Fonts -->
  <article id="output" data-high="5">
    <section data-cols="1">
      <div>
        <h2>Use selected font(s)</h2>
      </div>
    </section>
    
    <section data-name="output" data-cols="1">
      <div>
        <pre class="output" data-type="1">
Pro tip: Select some icon fonts to the see real output here!
        </pre>
      </div>
    </section>
  </article>
  
<!-- How to use this? -->
  <article id="how-to-use" data-high="2">
    <section data-cols="1">
      <div>
        <h2>How to!</h2>
        <p>3 steps to integrate icon fonts into your project:</p>
      </div>
    </section>
    
    <section data-cols="2">

      <div>
   <section data-cols="1">

    <div>
        <h3>1. Add the icon font(s) to your collection:</h3>
        <div class="icon-font--header">
          <button class="add" data-type="2"><span class="fontawesome-heart"></span>  add</button>
        </div>
    </div>

      <div>
        <h3>2. Import the icon fonts(s) into your css and add the font-family('s):</h3>
        <pre data-type="1">
@import url(<span class="url">http://weloveiconfonts.com/api/?family=zocial</span>);

<span>/* zocial */</span>
[class*="zocial-"]:before {
  <span class="css">font-family: 'zocial', sans-serif;</span>
}

</pre>
      </div>
      
    </section>
      </div>


      <div>
<h3>3. Burn baby, burn!</h3>
        <pre data-type="1">
<span>&lt;!-- Single Element --></span>
&lt;span class=<span class="css">"zocial-dribbble"</span>>&lt;/span>
        </pre>
        <br>
        <span class="zocial-dribbble example"></span>
        <br>
        <br>
<pre data-type="1">
<span>&lt;!-- Group of Elements --></span>
&lt;ul>
  &lt;li class=<span class="css">"zocial-twitter"</span>>&lt;/li>
  &lt;li class=<span class="css">"zocial-flickr"</span>>&lt;/li>
  &lt;li class=<span class="css">"zocial-lastfm"</span>>&lt;/li>
  &lt;li class=<span class="css">"zocial-reddit"</span>>&lt;/li>
&lt;/ul>
        </pre>

        <ul class="example">
          <li class="zocial-twitter"></li>
          <li class="zocial-flickr"></li>
          <li class="zocial-lastfm"></li>
          <li class="zocial-reddit"></li>
        </ul>
      </div>
      
    </section>

 
    
    <section data-cols="1">
      <div>
        <hr>
        <p>
          <b><span class="typicons-power"></span></b>
          <b>Pro Tip</b>: Use the element inspector of your favorite browser and discover the icons on this page for more examples!
        </p>
      </div>
    </section>
  </article>
  
<!-- Social & Feedback -->
  <article data-high="4">
    <section data-cols="3">
      <div>
        <a class="hitman__gamma" href="https://github.com/TimPietrusky/weloveiconfonts" target="_blank">
          <button data-type="2">
            Fork
            <span class="brandico brandico-github">
            me
          </button>
        </a>
      </div>
      <div>
        <a class="hitman__gamma" href="http://twitter.com/share?text=@WeLoveIconFonts+-+A+free+and+open-source+icon+fonts+hosting+service&url=http://weloveiconfonts.com" target="_blank">
          <button data-type="4">
            Spread
            <span class="zocial zocial-twitter"></span>
            the word
          </button>
        </a>
      </div>
      <div>
        <a class="hitman__gamma" href="mailto:feedback@weloveiconfonts.com" target="_blank">
          <button data-type="3">
            <span class="zocial zocial-email"></span>
            Feedback
          </button>
        </a>
      </div>
    </section>
  </article>
  
<!-- Top & Handcrafted -->
  <article data-high="3">
    <section data-cols="1">
      <div>
        <footer>
          Handcrafted 2012 - 2013 by <a href="http://twitter.com/TimPietrusky" target="_blank">@TimPietrusky</a> in Frankfurt (Main), Germany.
        </footer>
      </div>
    </section>
  </article>  

  <script id="iconTemplate" type="text/template"></script>

  <script id="creatorTemplate" type="text/template">
    <section data-cols="3">
      <div class="creator__social">
        <div class="hitman__gamma hitman__delta">
          <a class="social__twitter" href="http://twitter.com/WeLoveIconFonts" target="_blank"><span class="entypo-twitter"></span></a>
          <a class="social__github" href="https://github.com/TimPietrusky/weloveiconfonts" target="_blank"><span class="entypo-github"></span></a>
        </div>
      </div>
      <div><textarea contenteditable data-name="text" data-type="1" spellcheck="false" title="iconfont-class"></textarea></div>
      <div>
        <section data-cols="1">
          <div>
            <a href="#output" title="# of selected fonts" class="plain">0</a>
            <a href="#" class="entypo-minus-squared toggle" title="Toggle view: full/minimal"></a>
            <a href="#how-to-use" class="entypo-info" title="How does this work?"></a>
          </div>
        </section>
      </div>
    </section>
  </script>

  <script id="outputTemplate" type="text/template">
  </script>

  <script type="text/javascript">

    window.iconfonts = <?php echo $iconfonts ?>;

    // Add a script element as a child of the body
    function downloadJSAtOnload() {
      var element = document.createElement('script');
      element.src = 'skin/js/8a03a137.scripts.min.js';
      document.body.appendChild(element);
    }

    // Check for browser support of event handling capability
    if (window.addEventListener) {
      window.addEventListener("load", downloadJSAtOnload, false);
    } else if (window.attachEvent) {
      window.attachEvent("onload", downloadJSAtOnload);
    } else {
      window.onload = downloadJSAtOnload;
    }
</script>
</body>

</html>
