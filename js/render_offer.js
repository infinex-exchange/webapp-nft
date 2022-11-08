function updateCountdowns() {
    $('.countdown').each(function() {
        var timestamp = $(this).data('timestamp') * 1000;
        var total = Date.parse(new Date(timestamp)) - Date.parse(new Date());
        var ago = false;
        
        if(total < 600)
            $(this).addClass('text-red');
        else
            $(this).removeClass('text-red');
        
        if(total < 0) {
            total = -total;
            ago = true;
        }
        
        var seconds = Math.floor( (total/1000) % 60 );
        var minutes = Math.floor( (total/1000/60) % 60 );
        var hours = Math.floor( (total/(1000*60*60)) % 24 );
        var days = Math.floor( total/(1000*60*60*24) );
        
        var str = '';
        
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
        
        if(ago)
            str += ' ago';
        else {
            str += ' to end';
            str = '<i class="fa-solid fa-clock"></i> ' + str;
        }
        
        $(this).html(str);
    });
}

function renderOffer(offer) {
    var nftPreview = '/nft/img/no_preview.png';
    if(offer.preview != null)
        nftPreview = offer.preview;
    
    var finishedHtml = '';
    
    if(!offer.active) {
        finishedHtml = `
            <span class="text-red">Finished</span>
        `;
    }
    
    var mainPriceHtml = '';
    var buynowPriceHtml = '';
    
    if(offer.active) {
        if(offer.price_auction) {
            mainPriceHtml = `
                <div class="col-6 my-auto">
      			    <h4><i class="fa-solid fa-gavel"></i> ${offer.price_auction} ${offer.asset}</h4>
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
    }
    else {
        if(offer.price_final) {
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
        }
    }
                                
    return `
        <div class="offer-item col-12 col-md-3 col-lg-3 py-2">
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
                            ${finishedHtml}
                            <span class="countdown" data-timestamp="${offer.end_time}"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;        
}

$(document).ready(function() {
    setInterval(updateCountdowns, 1000);
});