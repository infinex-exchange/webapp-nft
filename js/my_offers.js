function renderMyOffer(offer) {
    var nftPreview = '/nft/img/no_preview.png';
    if(offer.preview != null)
        nftPreview = offer.preview;
    
    var time = new Date(offer.end_time * 1000).toLocaleString();
                                
    return `
        <div class="row my-offer-item row hoverable px-1 py-3">
            <div class="col-2">
                <a href="/nft/offer/${offer.noid}">
                    <img src="${nftPreview}" class="img-fluid">
                </a>
            </div>
            <div class="col-10">
                <div class="row">
                
                        <div class="col-12">
                            <h5 class="card-title">${offer.name}</h5>
                        </div>
                        
                        <div class="col-12 small secondary">
                            <span class="countdown" data-timestamp="${offer.end_time}"></span>
                            (<i>${endTime}</i>)
                        </div>

                </div>
            </div>
        </div>
    `;        
}

$(document).ready(function() {
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
                        thisAS.append(renderMyOffer(v));
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
});