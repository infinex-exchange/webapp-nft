$(document).ready(function() {
    window.renderingStagesTarget = 1;
    
    var pathArray = window.location.pathname.split('/');
    var nftid = pathArray[pathArray.length - 1];
    
    $.ajax({
        url: config.apiUrl + '/nft/details',
        type: 'POST',
        data: JSON.stringify({
            nftid: nftid
        }),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            $('.nft-name').html(data.nft.name);
            
            if(data.nft.preview != null)
                $('#nft-preview').attr('src', data.nft.preview);
            
            $('#nftid').html(nftid);
            
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