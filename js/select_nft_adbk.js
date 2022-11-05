$(document).ready(function() {
    $('#select-nft-adbk').on('click', function(event) {
        $('.selector-dropdown').not('#select-nft-adbk-dropdown').hide();
        $('.selector-arrow').not('#select-nft-adbk-arrow').removeClass('flip');
        
        $('#select-nft-adbk-dropdown').toggle();
        $('#select-nft-adbk-arrow').toggleClass('flip');
        
        event.stopPropagation();
    });
    
    $('#select-nft-adbk').on('input', function() {
        $('#select-nft-adbk-dropdown').hide();
        $('#select-nft-adbk-arrow').removeClass('flip');
    });
    
    $('html').on('click', function() {
        $('#select-nft-adbk-dropdown').hide();
        $('#select-nft-adbk-arrow').removeClass('flip');
    });
});

function initSelectNftAdbk(network) {
    $('#select-nft-adbk-data').empty();
    
    $.ajax({
        url: config.apiUrl + '/nft/wallet/addressbook',
        type: 'POST',
        data: JSON.stringify({
            api_key: window.apiKey,
            network: network
        }),
        contentType: "application/json",
        dataType: "json",
    })
    .retry(config.retry)
    .done(function (data) {
        if(data.success) {
            $.each(data.addressbook, function(k, v) {
                $('#select-nft-adbk-data').append(`
                    <div class="select-nft-adbk-item row p-1 hoverable" data-address="${v.address}">
                        <div class="col-12">
                            <h5 class="secondary">${v.name}</h5>
                            <span class="wrap">${v.address}</span>
                        </div>
                    </div>
                `);
            });
                
            $('.select-nft-adbk-item').on('click', function() {
                $('#select-nft-adbk').val($(this).data('address')).trigger('input');
            });
        } else {
            msgBox(data.error);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        msgBoxNoConn(true);
    });
}