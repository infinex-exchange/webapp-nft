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
    
    $('#select-nft, #select-fiat').on('change', function() {
        window.assetid = $('#select-coin').val();
        window.fiatid = $('#select-fiat').val();
        
        if(window.assetid == '' || window.fiatid == '') return;
        
        refreshPrec();
        refreshPmSelectors();
        refreshSellBalance();
        
        $('.assetid').html(window.assetid);
        $('.fiatid').html(window.fiatid);
        $('.step2-ro').prop('readonly', false).data('rval', '').data('tsval', '').val('');
        $('#select-fpm, #select-fpm-insta').prop('disabled', false);
    });
    
    $('input[name="side"]').change(function() {
        window.side = this.value;
        refreshPmSelectors();
        refreshSellBalance();
    });
    
    $('#select-fpm').on('change', function() {
        var fpmid = $(this).data('fpmid');
        
        if(!window.fpms.includes(fpmid)) {
            window.fpms.push(fpmid);
            
            var innerHtml = $('.select-fpm-item[data-fpmid="' + fpmid + '"]').html();
            $('#payment-methods-data').append(`
                <div class="payment-methods-item col-12 col-md-3 col-lg-3 p-2 hoverable" onClick="removeFpm(this, '${fpmid}')">
                    <div class="row">
                        ${innerHtml}
                        <div class="col-auto ms-auto my-auto">
                            <i class="fa-solid fa-xmark remove-pm"></i>
                        </div>
                    </div>
                </div>
            `);
            
            $('#payment-methods-empty').addClass('d-none');
        }
        
        $('#select-fpm').val('').data('fpmid', '');
    });
    
    $('#select-fpm-insta').on('change', function() {
        var fpminstaid = $(this).data('fpminstaid');
        
        if(!window.fpm_instances.includes(fpminstaid)) {
            window.fpm_instances.push(fpminstaid);
            
            var innerHtml = $('.select-fpm-insta-item[data-fpminstaid="' + fpminstaid + '"]').html();
            $('#payment-methods-data').append(`
                <div class="payment-methods-item col-12 col-md-3 col-lg-3 p-2 hoverable" onClick="removeFpmInsta(this, ${fpminstaid})">
                    <div class="row">
                        ${innerHtml}
                        <div class="col-auto ms-auto my-auto">
                            <i class="fa-solid fa-xmark remove-pm"></i>
                        </div>
                    </div>
                </div>
            `);
            
            $('#payment-methods-empty').addClass('d-none');
        }
        
        $('#select-fpm-insta').val('').data('fpminstaid', '');
    });
    
    // Toggle rateit on checkbox click
    
    $('#sec-min-rating-cbx').on('change', function() {
        if(this.checked) {
            $('#sec-min-rating-expand').removeClass('d-none');
        
            $('.rateit_').rateit({
                mode: 'font'
            });
        }
        
        else
            $('#sec-min-rating-expand').addClass('d-none');
    });
    
    // Time window
    
    $('#time-window-raw').on('input', function() {
        var raw = $(this).val();
        window.timeWindow = PREDEF_TIME_WINDOW[raw].val;
        $('#time-window-desc').html(PREDEF_TIME_WINDOW[raw].desc);
    }).trigger('input');
    
    // Lock format and precision of inputs
    
    $('#price, #amount-crypto, #fiat-min, #fiat-max').on('input', function () {
        prec = 0;
        if($(this).is('#price')) prec = window.p2pPrec.price_prec;
        else if($(this).is('#amount-crypto')) prec = window.p2pPrec.crypto_prec;
        else prec = window.p2pPrec.fiat_prec;
        
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
    
    // Red text if amount > available balance
    $('#amount-crypto').on('updateCalc setVal', function() {
        amount = new BigNumber($(this).data('rval'));
        
        $('#amount-crypto, #sell-balance').removeClass('text-red');
        
        if(window.side == 'SELL' && amount.gt(window.sellBalance))
            $('#amount-crypto, #sell-balance').addClass('text-red');
    });
    
    // Red text if fiat_min > fiat_max
    $('#fiat-min, #fiat-max').on('updateCalc setVal', function() {
        min = new BigNumber($('#fiat-min').data('rval'));
        max = new BigNumber($('#fiat-max').data('rval'));
        
        $('#fiat-max').removeClass('text-red');
        
        if(min.gte(max))
            $('#fiat-max').addClass('text-red');
    });
    
    // Red text if fiat_min > amount * price (untakeable offer)
    $('#fiat-min, #amount-crypto, #price').on('updateCalc setVal', function() {
        min = new BigNumber($('#fiat-min').data('rval'));
        amount = new BigNumber($('#amount-crypto').data('rval'));
        price = new BigNumber($('#price').data('rval'));        
        
        $('#fiat-min').removeClass('text-red');
        
        if(min.gt(amount.times(price)))
            $('#fiat-min').addClass('text-red');
    });
    
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