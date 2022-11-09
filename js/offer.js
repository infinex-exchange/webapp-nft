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

function submitBid() {
    var bid = $('#mb-bid').data('rval');
    
    if(bid == '') return;
    
    $('#modal-bid').modal('hide');
    
    $.ajax({
        url: config.apiUrl + '/nft/offer/bid',
        type: 'POST',
        data: JSON.stringify({
            api_key: window.apiKey,
            noid: window.noid,
            bid: bid
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
	if(!window.loggedIn) {
		gotoLogin();
		return;
	}
	
    $('#mcbn-price').html($('#price-buynow').html());
    $('#modal-confirm-buynow').modal('show');
}

function showBidPrompt() {
	if(!window.loggedIn) {
		gotoLogin();
		return;
	}
	
    $('#mb-bid').data('rval', '').data('tsval', '').val('');
    $('#modal-bid').modal('show');
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
                
                window.prec = data.offer.prec;
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
                            <div class="col-6 col-lg-4">
                                ${time}
                            </div>
                            <div class="col-1 col-lg-2">
                                ${buynow}
                            </div>
                            <div class="col-5 col-lg-4 text-end">
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
    
    // Lock format and precision of inputs
    
    $('#mb-bid').on('input', function () {
        prec = window.prec;
        
        var regex = new RegExp("^[0-9]*(\\.[0-9]{0," + prec + "})?$");
        var newVal = $(this).val();
        
        // Revert bad format (visible value to typing safe value)
        if (!regex.test(newVal)) {
            $(this).val( $(this).data('tsval') );
        }
        
        else {
            // Check is real value change by calculations pending
            var haveRVal = $(this).data('rval') != $(this).data('tsval');
            
            // Drop . on last position (typing safe value only)
            if(newVal.slice(-1) == '.') {
                $(this).data('tsval', newVal.substring(0, newVal.length - 1));
            }
        
            // Change . to 0. on first position (typing safe value only)
            else if(newVal.startsWith('.')) {
                $(this).data('tsval', '0' + newVal);
            }
        
            // Save typing safe value as is when everythink ok
            else {
                $(this).data('tsval', newVal);
            }
            
            // If there is no pending change by calculations set rval also
            $(this).data('rval', newVal);
        }
        
        // Do calculations
        $(this).trigger('updateCalc');
    });
    
    // Move data-val to real visible value
    $('#mb-bid').onFirst('focusout setVal', function() {
        if($(this).is(':focus')) return;
        
        $(this).data('tsval', $(this).data('rval') )
               .val( $(this).data('rval') );
    });
});