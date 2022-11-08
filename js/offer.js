$(document).ready(function() {
    window.renderingStagesTarget = 2;
    
    var pathArray = window.location.pathname.split('/');
    var noid = pathArray[pathArray.length - 1];
    
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
            getNftDetails(data.nftid);
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