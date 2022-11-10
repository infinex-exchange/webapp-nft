$(document).ready(function() {
    window.renderingStagesTarget = 1;
    
    initCountdowns();
    
    gotoUiCard('offers');
    
    window.offersAS = new AjaxScroll(
        $('#offers-data'),
        $('#offers-data-preloader'),
        {
            api_key: window.apiKey
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
        window.offersAs.data.sort = $(this).data('sort');
        window.offersAs.data.sort_dir = $(this).data('sort-dir');
        
        $('#sort-current').html($(this).html());
        
        $('.sort-item').removeClass('active');
        $(this).addClass('active');
    });
});