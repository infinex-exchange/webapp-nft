$(document).ready(function() {
    window.renderingStagesTarget = 1;
    
    initCountdowns();
    
    gotoUiCard('offers');
    
    window.offersAS = new AjaxScroll(
        $('#offers-data'),
        $('#offers-data-preloader'),
        {
            api_key: window.apiKey,
            auctions: true,
            buynow: true
        },
        function() {
            
            //---
            this.data.offset = this.offset;
            var thisAS = this;
            
            $.ajax({
                url: config.apiUrl + '/nft/offers',
                type: 'POST',
                data: JSON.stringify(thisAS.data),
                contentType: "application/json",
                dataType: "json",
            })
            .retry(config.retry)
            .done(function (data) {
                if(data.success) {
                    $.each(data.offers, function(k, v) {
                        thisAS.append(renderOffer(v));
                    });
                    
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
            
        },
        false
    );
    
    $('#btn-filter').click(function() {
	    gotoUiCard('filter');
    });
    
    $('.sort-item').click(function() {
        window.offersAS.data.sort = $(this).data('sort');
        window.offersAS.data.sort_dir = $(this).data('sort-dir');
        window.offersAS.reset();
        
        $('#sort-current').html($(this).html());
        
        $('.sort-item').removeClass('active');
        $(this).addClass('active');
    });
    
    $('.sort-item.active').trigger('click');
});