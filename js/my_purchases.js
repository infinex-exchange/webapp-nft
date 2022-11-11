$(document).on('authChecked', function() {
    if(!window.loggedIn)
        return;
    
    window.renderingStagesTarget = 1;
    
    initCountdowns();
    
    window.myOffersAS = new AjaxScroll(
        $('#my-offers-data'),
        $('#my-offers-data-preloader'),
        {
            api_key: window.apiKey,
            auction: true,
            buynow: true
        },
        function() {
            
            //---
            this.data.offset = this.offset;
            var thisAS = this;
            
            $.ajax({
                url: config.apiUrl + '/nft/my_purchases',
                type: 'POST',
                data: JSON.stringify(thisAS.data),
                contentType: "application/json",
                dataType: "json",
            })
            .retry(config.retry)
            .done(function (data) {
                if(data.success) {
                    $.each(data.offers, function(k, v) {
                        thisAS.append(renderOfferHor(v, false, true));
                    });
                    
                    updateCountdowns();
                    
                    thisAS.done();
            
                    if(thisAS.offset == 0)
                        $(document).trigger('renderingStage');
                        
                    if(data.offers.length != 50)
                        thisAS.noMoreData();
                } else {
                    msgBoxRedirect(data.error);
                    thisAS.done();
                    thisAS.noMoreData();
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                msgBoxNoConn(true);
                thisAS.done();
                thisAS.noMoreData();
            });
            //---
            
        }
    );
    
    $('#filter-search').on('input', function() {
        if(typeof(window.searchTypingTimeout) !== 'undefined')
            clearTimeout(window.searchTypingTimeout);
            
        window.searchTypingTimeout = setTimeout(function() {
            window.myOffersAS.data.query = $('#filter-search').val();
            window.myOffersAS.reset();
        }, 750);
    });
});