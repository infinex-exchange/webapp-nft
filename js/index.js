function getFeaturedOffers(div, req) {
    $.ajax({
        url: config.apiUrl + '/nft/offers',
        type: 'POST',
        data: JSON.stringify(req),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            data.offers = data.offers.slice(0, 8);
            $.each(data.offers, function(k, v) {   
                div.append(renderOffer(v));
            });
	        $(document).trigger('renderingStage');
        }
        else {
            msgBoxRedirect(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(true); 
    });    
}

$(document).ready(function() {
    window.renderingStagesTarget = 2;
    
    getFeaturedOffers($('#last-minute-data'), {
        auction: true,
        buynow: true,
        sort: 'end_time',
        sort_dir: 'ASC',
        offset: 0
    });
    
    getFeaturedOffers($('#featured-nft-data'), {
        auction: true,
        buynow: true,
        sort: 'popularity',
        sort_dir: 'DESC',
        offset: 0
    });
});