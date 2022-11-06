var PREDEF_DURATION = [1, 3, 5, 7, 10, 14, 30];

$(document).ready(function() {
    // Initial
    
    window.renderingStagesTarget = 2;
    
    // Remove preloader
    
    $('#select-nft, #select-coin').on('dataLoaded', function() {
        $(document).trigger('renderingStage');
    });
    
    // On change selectors
    
    $('#select-nft').on('change', function() {
        $('#fees-wrapper').addClass('d-none');
        
        $.ajax({
            url: config.apiUrl + '/nft/create_offer/info',
            type: 'POST',
            data: JSON.stringify({
                api_key: window.apiKey,
                nftid: $('#select-nft').data('nftid')
            }),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                $('#royalty-fee').html(data.royalty_fee);
                $('#platform-fee').html(data.platform_fee);
                $('#fees-wrapper').removeClass('d-none');
            } else {
                msgBox(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(false);
        });
    });
    
    $('#select-coin').on('change', function() {
        $('.assetid').html($('#select-coin').val());
        $('.step2-ro').prop('readonly', false).data('rval', '').data('tsval', '').val('');
    });
    
    // Duration
    
    $('#duration-raw').on('input', function() {
        var raw = $(this).val();
        $('#duration-desc').html(PREDEF_DURATION[raw] + ' days');
    }).trigger('input');
    
    // Lock format and precision of inputs
    
    $('#price-buynow, #price-initial').on('input', function () {
        prec = $('#select-coin').data('prec');
        
        var regex = new RegExp("^[0-9]*(\\.[0-9]{0," + prec + "})?$");
        var newVal = $(this).val();
        
        // Revert bad format (visible value to typing safe value)
        if (!regex.test(newVal)) {
            $(this).val( $(this).data('tsval') );
        }
        
        else {
            // Check is real value change by calculations pending
            var haveRVal = $(this).data('rval') != $(this).data('tsval');
            
            // Drop . on last position (typing safe value only)
            if(newVal.slice(-1) == '.') {
                $(this).data('tsval', newVal.substring(0, newVal.length - 1));
            }
        
            // Change . to 0. on first position (typing safe value only)
            else if(newVal.startsWith('.')) {
                $(this).data('tsval', '0' + newVal);
            }
        
            // Save typing safe value as is when everythink ok
            else {
                $(this).data('tsval', newVal);
            }
            
            // If there is no pending change by calculations set rval also
            $(this).data('rval', newVal);
        }
        
        // Do calculations
        $(this).trigger('updateCalc');
    });
    
    // Move data-val to real visible value
    $('#price, #amount-crypto, #fiat-min, #fiat-max').onFirst('focusout setVal', function() {
        if($(this).is(':focus')) return;
        
        $(this).data('tsval', $(this).data('rval') )
               .val( $(this).data('rval') );
    });
    
    // Red text if initial > buy now
    $('#price-buynow, #price-initial').on('updateCalc setVal', function() {
        buynow = new BigNumber($('#price-buynow').data('rval'));
        initial = new BigNumber($('#price-initial').data('rval'));
        
        $('#price-buynow, #price-initial').removeClass('text-red');
        
        if(initial.gte(buynow))
            $(this).addClass('text-red');
    });
    
    // done here
    
    // Submit
    $('#submit').click(function() {
        var price = $('#price').data('rval');
        var amountField = $('#amount-crypto');
        var amount = amountField.data('rval');
        var fiatMinField = $('#fiat-min');
        var fiatMin = fiatMinField.data('rval');
        var fiatMaxField = $('#fiat-max');
        var fiatMax = fiatMaxField.data('rval');
        
        if(amountField.hasClass('text-red') ||
           fiatMinField.hasClass('text-red') ||
           fiatMaxField.hasClass('text-red') ||
           price == '' ||
           amount == '' ||
           fiatMin == '' ||
           fiatMax == '' ||
           window.assetid == '' ||
           window.fiatid == ''
        ) {
            msgBox('Please fill in the form correctly')
            return;
        }
        
        var data = new Object();
        data['api_key'] = window.apiKey;
        data['side'] = window.side;
        data['price'] = price;
        data['amount_crypto'] = amount;
        data['fiat_min'] = fiatMin;
        data['fiat_max'] = fiatMax;
        data['asset'] = window.assetid;
        data['fiat'] = window.fiatid;
        data['time_window'] = window.timeWindow;
        
        if((window.side == 'BUY' && window.fpms.length == 0) ||
           (window.side == 'SELL' && window.fpm_instances.length == 0)
        ) {
            msgBox('Add at least one payment method');
            return;
        }
        
        data['fpms'] = window.fpms;
        data['fpm_instances'] = window.fpm_instances;
        
        if($('#sec-min-rating-cbx').prop('checked')) {
            var ratingRaw = $('.rateit_').rateit('value');
            if(ratingRaw == 0) {
                msgBox('Please set minimal user rating or disable this filter');
                return;
            }
            data['sec_min_rating'] = ratingRaw * 20;
        }

        $.ajax({
            url: config.apiUrl + '/p2p/my_offers/add',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                msgBoxRedirect('The offer has been successfully created', '/p2p');
            } else {
                msgBox(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(false);
        });
    });
});

$(document).on('authChecked', function() {
    if(!window.loggedIn) return;
    
    initSelectNft();
    initSelectCoin('/nft/assets');
});