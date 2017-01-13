
//=include ../../../node_modules/jquery/dist/jquery.js

//=include ../../../bigchain-website/_src/_assets/javascripts/bigchain/dnt.js
//=include ../../../bigchain-website/_src/_assets/javascripts/bigchain/analytics.js



(function ($, undefined) {
    'use strict';

    var $document = $(document);

    $document.ready(function () {

        // create image captions from alt attribute when present
        // Note: Ghost adds 'Alt text' to all content images by default so check for that
        $('.post-content img').each( function() {

            if ( $(this).attr('alt') != 'Alt text') {
                $(this).wrap(
                    '<figure class="image"></figure>'
                ).after(
                    '<figcaption>' +
                    $(this).attr(
                        'alt') +
                    '</figcaption>'
                );
            }
        });

    });
})(jQuery);
