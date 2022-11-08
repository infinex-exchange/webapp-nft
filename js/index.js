function renderOffer(offer) {
    var nftPreview = '/nft/img/no_preview.png';
    if(offer.preview != null)
        nftPreview = offer.preview;
                                
    return `
        <div class="offer-item col-12 col-md-3 col-lg-3 py-2">
            <div class="card h-100 hoverable">
                <a href="/nft/offer/${offer.noid}" class="d-flex h-100">
                    <img src="${nftPreview}" class="card-img-top my-auto">
                </a>
                <div class="card-body">
                    <div class="row">
                        <div class="col-11">
                            <h5 class="card-title">${offer.name}</h5>
                            <span class="small secondary">
                                test
                            </span>
                        </div>
                        <div class="col-1 ps-0 my-auto text-center secondary dropdown">
            			    <a class="nav-link" href="#_" data-bs-toggle="dropdown">
                                <i class="fa-solid fa-ellipsis-vertical fa-lg"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li>
                                    <a class="dropdown-item" href="/nft/details/">
                                        <i class="fa-solid fa-eye"></i>
                                        Details
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="/nft/sell/">
                                        <i class="fa-solid fa-store"></i>
                                        Sell
                                    </a>
                                <li>
                                    <a class="dropdown-item" href="/nft/wallet/withdraw/">
                                        <i class="fa-solid fa-arrow-right-from-bracket"></i>
                                        Withdraw
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="/nft/wallet/transfer/">
                                        <i class="fa-solid fa-people-arrows"></i>
                                        Transfer
                                    </a>
                                </li>
                            </ul>
            			</div>
                    </div>
                </div>
            </div>
        </div>
    `;        
}

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
    
    getFeaturedOffers($('last-minute-data'), {
        auctions: true,
        buynow: true,
        sort: 'end_time',
        sort_dir: 'ASC',
        offset: 0
    });
    
    getFeaturedOffers($('featured-nft-data'), {
        auctions: true,
        buynow: true,
        sort: 'popularity',
        sort_dir: 'DESC',
        offset: 0
    });
});