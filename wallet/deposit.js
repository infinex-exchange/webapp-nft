$(document).ready(function() {
    window.renderingStagesTarget = 2;
    
    $('#select-net').on('dataLoaded', function() {
        $(document).trigger('renderingStage');
    });
    
    $('#select-net').on('change', function() {
        $('#deposit-step2').hide();
        
        $.ajax({
            url: config.apiUrl + '/nft/wallet/deposit',
            type: 'POST',
            data: JSON.stringify({
                api_key: window.apiKey,
                network: $('#select-net').data('network')
            }),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                // Operating warning
                if(data.operating)
                    $('#deposit-operating-warning').addClass('d-none');
                else
                    $('#deposit-operating-warning').removeClass('d-none');
                
                // Confirms target
                $('#deposit-confirmations').html(data.confirms_target);
                
                // Address
                $('#deposit-addr').html(data.address);
                
                // QR
                window.qrcode.clear();
                window.qrcode.makeCode(data.address);
        
                $('#deposit-step2').show();
                $('html, body').animate({
                    scrollTop: $("#deposit-step2").offset().top
                }, 1000);
            } else {
                msgBox(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(false);
        });
    });
    
    initSelectNet(null, '/nft/wallet/networks', false);
});

$(document).on('authChecked', function() {
    if(window.loggedIn) {
        window.qrcode = new QRCode("deposit-qrcode", {
            correctLevel : QRCode.CorrectLevel.H
        });
    
        var txHistoryData = {
            api_key: window.apiKey,
            type: 'DEPOSIT'
        };
        initTxHistory($('#recent-tx-data'), $('#recent-tx-preloader'), txHistoryData, true, true);
    }
});