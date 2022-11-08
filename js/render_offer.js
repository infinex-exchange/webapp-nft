function updateCountdowns() {
    $('.countdown').each(function() {
        var timestamp = $(this).data('timestamp') * 1000;
        var total = Date.parse(new Date(timestamp)) - Date.parse(new Date());
        var ago = false;
        
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
            str += days + 'D ';
        }
        
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
            if(seconds < 10)
                seconds = '0' + seconds;
            str += seconds + ':';
        }   
        
        $(this).html(str);
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

$(document).ready(function() {
    setInterval(updateCountdowns, 1000);
});