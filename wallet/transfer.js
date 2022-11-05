$(document).ready(function() {
    window.renderingStagesTarget = 2;
    
    $('#select-nft').on('dataLoaded', function() {
        $(document).trigger('renderingStage');
    });
    
    // Download balance and init net selector when coin selected
    $('#select-nft').on('change', function() {
        window.validAddress = false;
        
        // Reset form
        $('#transfer-form').get(0).reset();
        $('small[id^="help-"]').hide();
        
        $('#transfer-step2').show();
    });
    
    // Validate address
    $('#transfer-address').on('input', function() {
        if(validateEmail($(this).val())) {
	        window.validAddress = true;
            $('#help-address').hide();
        }
        else {
	        window.validAddress = false;
            $('#help-address').show();
        }
    });
    
    // Submit withdraw
    $('#transfer-form, #2fa-form').on('submit', function(event) {
        // Prevent standard submit
        event.preventDefault();
        
        // Validate data
        var address = $('#transfer-address').val();
        if(address == '') {
            msgBox('Missing address');
            return;
        }
        
        var data = new Object();
        data['api_key'] = window.apiKey;
        data['nftid'] = $('#select-nft').data('nftid');
        data['address'] = address;
        
        var tfa = $('#2fa-code').val();
        if(tfa != '')
            data['code_2fa'] = tfa;
        
        if(!window.validAddress ||
           (memo != '' && !window.validMemo))
        {
	        msgBox('Fill the form correctly');
	        return;
        }
            
        // Post
        $.ajax({
            url: config.apiUrl + '/nft/wallet/transfer',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                $('#transfer-step2').hide();
                window.latestTransferNxid = data.nxid;
                updateTxHistory();
            }
            else if(data.need_2fa) {
                start2fa(data.provider_2fa);
            }
            else {
                msgBox(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(false);
        });
    });
});

$(document).on('authChecked', function() {
    if(window.loggedIn) {
        initSelectNft();
        
        var txHistoryData = {
            api_key: window.apiKey,
            type: ['TRANSFER_IN', 'TRANSFER_OUT']
        };
        initTxHistory($('#recent-tx-data'), $('#recent-tx-preloader'), txHistoryData, true, true);
        
        var pathArray = window.location.pathname.split('/');
        var pathLast = pathArray[pathArray.length - 1];
        if(pathLast != 'transfer' && pathLast != '') {
            $('#select-nft').val(pathLast).data('nftid', pathLast).trigger('change');
        }
    }
});

$(document).on('newWalletTransaction', function() {
    if(typeof(window.latestTransferNxid) === 'undefied')
        return;
    
    var newItem = $('.tx-history-item[data-nxid="' + window.latestTransferNxid + '"]');
    if(newItem.length)
        mobileTxDetails(newItem);
});