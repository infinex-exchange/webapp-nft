$(document).ready(function() {
    window.renderingStagesTarget = 2;
    
    var pathArray = window.location.pathname.split('/');
    var noid = parseInt(pathArray[pathArray.length - 1]);
    
    $.ajax({
        url: config.apiUrl + '/nft/offer',
        type: 'POST',
        data: JSON.stringify({
            noid: noid
        }),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            getNftDetails(data.offer.nftid);
            
            $('.asset').html(data.offer.asset);
            
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
                        <div class="row hoverable">
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
                    $('#price-auction-wrapper').show();
                }
                else {
                    $('#price-auction-wrapper').hide();
                }
                
                if(data.offer.price_buynow) {
                    $('#price-buynow').html(data.offer.price_buynow + ' ' + data.offer.asset);
                    $('#price-buynow-wrapper').show();
                }
                else {
                    $('#price-buynow-wrapper').hide();
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
                $('#price-auction-wrapper').hide();
                $('#price-buynow-wrapper').hide();
            }
            
            $(document).trigger('renderingStage');
        }
        
        else {
            msgBoxRedirect(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(true);
    });
});