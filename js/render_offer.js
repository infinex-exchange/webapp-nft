function updateCountdowns() {
    $('.countdown').each(function() {
        var timestamp = $(this).data('timestamp') * 1000;
        var total = Date.parse(new Date(timestamp)) - Date.parse(new Date());
        alert(total);
        
        var seconds = Math.floor( (total/1000) % 60 );
        var minutes = Math.floor( (total/1000/60) % 60 );
        var hours = Math.floor( (total/(1000*60*60)) % 24 );
        var days = Math.floor( total/(1000*60*60*24) );
    });
}

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
                        <div class="col-12">
                            <h5 class="card-title">${offer.name}</h5>
                        </div>
                        <div class="col-4 my-auto">
            			    .
            			</div>
                        <div class="col-12 small secondary">
                            <i class="fa-solid fa-timer"></i>
                            <span class="countdown" data-timestamp="${offer.end_time}"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;        
}

$(document).ready(function()) {
    setInterval(updateCountdowns, 1000);
}