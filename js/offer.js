function buyNow() {
    $.ajax({
        url: config.apiUrl + '/nft/offer/buynow',
        type: 'POST',
        data: JSON.stringify({
            api_key: window.apiKey,
            noid: window.noid
        }),
        contentType: "application/json",
        dataType: "json"
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            refreshOffer(false)
        }
        
        else {
            msgBox(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(false);
    });
}

function confirmBuyNow() {
    $('#mcbn-price').html($('#price-buynow').html());
    $('#modal-confirm-buynow').modal('show');
}

function refreshOffer(init) {
    $.ajax({
        url: config.apiUrl + '/nft/offer',
        type: 'POST',
        data: JSON.stringify({
            noid: window.noid
        }),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            if(init) {
                getNftDetails(data.offer.nftid);
            
                $('.asset').html(data.offer.asset);
            }
            
            $('#bids-data').empty();
            
            if(data.offer.bids.length > 0) {
                $.each(data.offer.bids, function(k, bid) {
                    var time = new Date(bid.time * 1000).toLocaleString();
                    
                    var buynow = '';
                    if(bid.is_buynow) {
                        buynow = `
                            <strong class="small secondary">Buy Now</strong>
                        `;
                    }
                    
                    $('#bids-data').append(`
                        <div class="row hoverable p-1">
                            <div class="col-4">
                                ${time}
                            </div>
                            <div class="col-2">
                                ${buynow}
                            </div>
                            <div class="col-4">
                                ${bid.price} ${data.offer.asset}
                            </div>
                        </div>
                    `);
                });
                
                $('#bids-empty').hide();
            }
            else {
                $('#bids-empty').show();
            }
            
            if(data.offer.active) {
                if(data.offer.price_auction) {
                    $('#price-auction').html(data.offer.price_auction + ' ' + data.offer.asset);
                    $('.auction-wrapper').show();
                }
                else {
                    $('.auction-wrapper').hide();
                }
                
                if(data.offer.price_buynow) {
                    $('#price-buynow').html(data.offer.price_buynow + ' ' + data.offer.asset);
                    $('.buynow-wrapper').show();
                }
                else {
                    $('.buynow-wrapper').hide();
                }
            }
            else {
                /*if(offer.price_final) {
                    mainPriceHtml = `
                        <div class="col-6 my-auto">
              			    <h4>${offer.price_final} ${offer.asset}</h4>
              			</div>
                    `;
                }
                else {
                    mainPriceHtml = `
                        <div class="col-6 my-auto">
              			    <span class="small secondary">
                                There were no bids
                            </span>
              			</div>
                    `;
                }*/
                $('.auction-wrapper').hide();
                $('.buynow-wrapper').hide();
            }
            
            $('#countdown').data('timestamp', data.offer.end_time);
            if(init) initCountdowns();
            updateCountdowns();
            
            if(init) $(document).trigger('renderingStage');
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
    
    var pathArray = window.location.pathname.split('/');
    window.noid = parseInt(pathArray[pathArray.length - 1]);
    
    refreshOffer(true);
});