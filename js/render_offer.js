function gotoOffer(noid) {
    window.location.href = '/nft/offer/' + noid;
}

function updateCountdowns() {
    $('.countdown').each(function() {
        var timestamp = $(this).data('timestamp') * 1000;
        var total = Date.parse(new Date(timestamp)) - Date.parse(new Date());
        
        if(total < 600*1000)
            $(this).addClass('text-red');
        else
            $(this).removeClass('text-red');
        
        var str = ''
        
        if(total < 0) {
            str = 'Finished';
            $(this).removeClass('countdown');
        }
        else {
        
            var seconds = Math.floor( (total/1000) % 60 );
            var minutes = Math.floor( (total/1000/60) % 60 );
            var hours = Math.floor( (total/(1000*60*60)) % 24 );
            var days = Math.floor( total/(1000*60*60*24) );
            
            if(days > 0) {
                str += days + ' days ';
            }
            else {
                if(hours > 0) {
                    if(hours < 10)
                        hours = '0' + hours;
                    str += hours + ':';
                }
                
                if(minutes > 0) {
                    if(minutes < 10)
                        minutes = '0' + minutes;
                    str += minutes + ':';
                }
                
                if(seconds > 0) {
                    if(str == '') {
                        str += seconds + ' seconds';
                    }
                    else {
                        if(seconds < 10)
                            seconds = '0' + seconds;
                        str += seconds;
                    }
                }
            }
            
            str += ' to end';
        }
        
        str = '<i class="fa-solid fa-clock"></i> ' + str;
        $(this).html(str);
    });
}

function initCountdowns() {
    setInterval(updateCountdowns, 1000);
}

function renderOffer(offer) {
    var nftPreview = '/nft/img/no_preview.png';
    if(offer.preview != null)
        nftPreview = offer.preview;
    
    var mainPriceHtml = '';
    var buynowPriceHtml = '';
    
    if(offer.price_auction) {
        mainPriceHtml = `
            <div class="col-6 my-auto">
                <h4>${offer.price_auction} ${offer.asset}</h4>
  			</div>
        `;
    }
    
    if(offer.price_buynow) {
        buynowPriceHtml = `
            <div class="col-6 my-auto">
  			      <span class="small secondary">Buy Now</span>
                  <h5>${offer.price_buynow} ${offer.asset}</h5>
  			</div>
        `;
    }
                                
    return `
        <div class="offer-item col-12 col-md-3 col-lg-3 py-2" data-noid="${offer.noid}" onClick="gotoOffer(${offer.noid})">
            <div class="card h-100 hoverable">
                <a href="/nft/offer/${offer.noid}" class="d-flex h-100">
                    <img src="${nftPreview}" class="card-img-top my-auto">
                </a>
                <div class="card-body">
                    <div class="row">
                        <div class="col-12">
                            <h5 class="card-title">${offer.name}</h5>
                        </div>
                        ${mainPriceHtml}
                        ${buynowPriceHtml}
                        <div class="col-12 pt-2 small secondary">
                            <span class="countdown" data-timestamp="${offer.end_time}"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;        
}

function renderOfferHor(offer, manage = false, purchase = false) {
    var nftPreview = '/nft/img/no_preview.png';
    if(offer.preview != null)
        nftPreview = offer.preview;
    
    var mainPriceHtml = '';
    var buynowPriceHtml = '';
    
    if(offer.price_auction) {
        mainPriceHtml = `
            <div class="col-auto my-auto">
                <h4>${offer.price_auction} ${offer.asset}</h4>
  			</div>
        `;
    }
    
    if(offer.price_buynow) {
        buynowPriceHtml = `
            <div class="col-auto my-auto">
  			      <span class="small secondary">Buy Now</span>
                  <h5>${offer.price_buynow} ${offer.asset}</h5>
  			</div>
        `;
    }
        
    var endTime = new Date(offer.end_time * 1000).toLocaleString();
    
    var manageHtml = `
        <div class="col-12 pt-3"></div>
    `;
    
    if(manage) {
        if(!offer.active) {
            if(offer.buyer !== null) {
                manageHtml += `
                    <div class="col-12 small">
                        <span class="secondary">
                            <i class="fa-solid fa-user"></i>
                            Buyer:
                        </span>
                        ${offer.buyer}
                    </div>
                `;
            }
            else {
                manageHtml += `
                    <div class="col-12">
                        <span class="badge bg-danger">
                            Item has not been sold
                        </span>
                    </div>
                `;
            }
        }
        
        manageHtml += `
            <div class="col-12 pt-1 small secondary">
                <i class="fa-solid fa-gavel"></i>
                ${offer.count_bids} bids
            </div>
            <div class="col-12 pt-1 small secondary">
                <i class="fa-solid fa-eye"></i>
                ${offer.count_views} views
            </div>
        `;
        
        if(offer.can_renew) {
            manageHtml += `
                <div class="col-12 pt-3">
                    <a href="/nft/sell/${offer.nftid}" class="btn btn-primary">
                        <i class="fa-solid fa-arrow-rotate-right"></i>
                        Renew listing
                    </a>
                </div>
            `;
        }
    }
    if(purchase) {
        var innerHtml = '';
        
        if(offer.win && offer.active) {
            innerHtml = `
                <span class="badge bg-success">
                    You are winning
                </span>
            `;
        }
        else if(offer.win && !offer.active) {
            innerHtml = `
                <span class="badge bg-success">
                    Purchased
                </span>
            `;
        }
        else {
            innerHtml = `
                <span class="badge bg-danger">
                    You've been outbid
                </span>
            `;
        }
        
        manageHtml = `
            <div class="col-12 pt-3">
                ${innerHtml}
            </div>
        `;
    }
                                
    return `
        <div class="col-12 offer-item hoverable p-4" data-noid="${offer.noid}" onClick="gotoOffer(${offer.noid})">
        <div class="row">
            <div class="col-3 col-lg-2 my-auto">
                <a href="/nft/offer/${offer.noid}">
                    <img src="${nftPreview}" class="img-fluid">
                </a>
            </div>
            <div class="col-9 col-lg-10">
                <div class="row">
                
                        <div class="col-12">
                            <h5 class="card-title">${offer.name}</h5>
                        </div>
                        
                        <div class="col-12 small secondary">
                            <span class="countdown" data-timestamp="${offer.end_time}"></span>
                            (<i>${endTime}</i>)
                        </div>
                        
                        <div class="col-12 pt-3">
                            <div class="row">
                                ${mainPriceHtml}
                                ${buynowPriceHtml}
                            </div>
                        </div>
                        
                        ${manageHtml}
                
                </div>
            </div>
        </div>
        </div>
    `;        
}

function getFeaturedOffers(div, req, callback = null) {
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
            updateCountdowns();
            
            if(callback != null)
                callback(data.offers.length);
        }
        else {
            msgBoxRedirect(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(true); 
    });    
}