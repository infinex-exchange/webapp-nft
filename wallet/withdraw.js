function updateFees(feeMin, feeMax) {
    var feeMinDec = new BigNumber(feeMin);
    var feeMaxDec = new BigNumber(feeMax);
    var dp = Math.max(feeMinDec.dp(), feeMaxDec.dp());
    var feeStep = new BigNumber(10);
    feeStep = feeStep.pow(-dp).dp(dp).toString();
    
    $('#withdraw-fee-range').attr('min', feeMin)
                            .attr('max', feeMax)
                            .attr('step', feeStep)
                            .val(feeMin)
                            .trigger('input');
}

$(document).ready(function() {
    window.renderingStagesTarget = 2;
    
    $('#select-nft').on('dataLoaded', function() {
        $(document).trigger('renderingStage');
    });
    
    // Fetch net and fee when nft selected
    $('#select-nft').on('change', function() {
        $('#withdraw-step2').hide();
        var nftid = $('#select-nft').data('nftid');
        
        $.ajax({
            url: config.apiUrl + '/nft/wallet/withdraw/info',
            type: 'POST',
            data: JSON.stringify({
                api_key: window.apiKey,
                nftid: nftid
            }),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                // Reset validation variables
                window.validAddress = false;
                window.validMemo = false;
                window.validAdbkName = false;
                
                // Reset form
                $('#withdraw-form').get(0).reset();
                $('small[id^="help-"]').hide();
                $('#withdraw-save').trigger('change');
                
                // Operating warning
                if(data.operating)
                    $('#withdraw-operating-warning').addClass('d-none');
                else
                    $('#withdraw-operating-warning').removeClass('d-none');
                
                // Addressbook
                initSelectNftAdbk(data.netid);
                
                // Fee asset balance
                $.ajax({
		            url: config.apiUrl + '/wallet/balances',
		            type: 'POST',
		            data: JSON.stringify({
		                api_key: window.apiKey,
		                symbols: [ asset ]
		            }),
		            contentType: "application/json",
		            dataType: "json",
		        })
		        .retry(config.retry)
		        .done(function (dataBal) {
		            if(data.success) {
		                window.wdRawBalance = new BigNumber(dataBal.balances[asset].avbl);
		                
		                // Fee
		                updateFees(dataBal.fee_min, dataBal.fee_max);
		                
		                $('#withdraw-step2').show();
		                $('html, body').animate({
		                    scrollTop: $("#withdraw-step3").offset().top
		                }, 1000);
		            } else {
		                msgBox(data.error);
		            }
		        })
		        .fail(function (jqXHR, textStatus, errorThrown) {
		            msgBoxNoConn(false);
		        });
            } else {
                msgBox(data.error);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            msgBoxNoConn(false);
        });
    });
    
    // Fee range -> fee input
    $('#withdraw-fee-range').on('input', function() {
        window.wdAmountMax = window.wdBalance.minus( $(this).val() ).dp(window.wdAmountPrec);
        if(window.wdAmountMax.isNegative())
	        window.wdAmountMax = new BigNumber(0);
        $('#withdraw-amount-max').html(window.wdAmountMax.toString());
        $('#withdraw-fee').val($(this).val());
        $('#withdraw-amount').trigger('prevalidated');
    });
    
    // Validate address
    $('#select-adbk').on('input', function() {
        if(typeof(window.addrTypingTimeout) !== 'undefined')
            clearTimeout(window.addrTypingTimeout);
        window.addrTypingTimeout = setTimeout(function() {
            
            $.ajax({
                url: config.apiUrl + '/wallet/withdraw/validate',
                type: 'POST',
                data: JSON.stringify({
                    api_key: window.apiKey,
                    asset: $('#select-coin').val(),
                    network: $('#select-net').data('network'),
                    address: $('#select-adbk').val()
                }),
                contentType: "application/json",
                dataType: "json",
            })
            .retry(config.retry)
            .done(function (data) {
                if(!data.success) {
                    msgBox(data.error);
                }
                else if(!data.valid_address) {
	                window.validAddress = false;
                    $('#help-address').show();
                }
                else {
	                window.validAddress = true;
                    $('#help-address').hide();
                }
                
                if(window.validAddress && data.internal) {
                    updateFees('0', '0');
                    $('#withdraw-internal-notice').removeClass('d-none');
                }
                else {
                    updateFees(window.wdFeeMinOrig, window.wdFeeMaxOrig);
                    $('#withdraw-internal-notice').addClass('d-none');
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                msgBoxNoConn(false);
            });
            
        }, 750);
    });
    
    // Submit withdraw
    $('#withdraw-form, #2fa-form').on('submit', function(event) {
        // Prevent standard submit
        event.preventDefault();
        
        // Validate data
        var address = $('#select-adbk').val();
        if(address == '') {
            msgBox('Missing address');
            return;
        }
        
        var amount = new BigNumber($('#withdraw-amount').data('val'));
        if(amount.isNaN() || amount.isZero()) {
            msgBox('Missing amount');
            return;
        }
        
        var fee = new BigNumber($('#withdraw-fee').val());
        
        var adbkSave = $('#withdraw-save').prop('checked');
        var adbkName = $('#withdraw-save-name').val();
        if(adbkSave && adbkName == '') {
	        msgBox('Missing saved address name');
	        return;
        }
        
        var data = new Object();
        data['api_key'] = window.apiKey;
        data['asset'] = $('#select-coin').val();
        data['network'] = $('#select-net').data('network');
        data['address'] = address;
        data['amount'] = amount.toFixed(window.wdAmountPrec);
        data['fee'] = fee.toFixed(window.wdAmountPrec);
        
        var memo = $('#withdraw-memo').val();
        if(memo != '')
            data['memo'] = memo;
            
        var tfa = $('#2fa-code').val();
        if(tfa != '')
            data['code_2fa'] = tfa;
        
        if(adbkSave)
	        data['adbk_name'] = adbkName;
        
        if(!window.validAddress ||
           (memo != '' && !window.validMemo) ||
           (adbkSave && !window.validAdbkName))
        {
	        msgBox('Fill the form correctly');
	        return;
        }
            
        // Post
        $.ajax({
            url: config.apiUrl + '/wallet/withdraw',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
        })
        .retry(config.retry)
        .done(function (data) {
            if(data.success) {
                $('#withdraw-step2').hide();
                $('#withdraw-step3').hide();
                window.latestWithdrawalXid = data.xid;
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
    
    // Expand save name
    $('#withdraw-save').on('change', function() {
        if (this.checked) {
            $('#withdraw-save-wrapper').addClass('ui-card-light');
            $('#withdraw-save-expand').show(); 
        } else {
            $('#withdraw-save-expand').hide();
            $('#withdraw-save-wrapper').removeClass('ui-card-light');
            $('#withdraw-save-name').val('');
            window.validAdbkName = false;
            $('#help-save-name').hide();
        }
    });
    
    // Hide save controls if already in adbk
    $('#select-adbk, #withdraw-memo').on('input', function() {
        var addr = $('#select-adbk').val();
        var memo = $('#withdraw-memo').val();
        
        if($('.select-adbk-item[data-address="' + addr + '"][data-memo="' + memo + '"]').length) {
            $('#withdraw-save-wrapper').hide();
            $('#withdraw-save').prop('checked', false).trigger('change');
        }
        else {
            $('#withdraw-save-wrapper').show();
        }
    });
    
    // Validate save name
    $('#withdraw-save-name').on('input', function() {
	    if(validateAdbkName($(this).val())) {
		    window.validAdbkName = true;
		    $('#help-save-name').hide();
	    }
	    else {
		    window.validAdbkName = false;
		    $('#help-save-name').show();
	    }
    });
    
    initSelectCoin();
});

$(document).on('authChecked', function() {
    if(window.loggedIn) {
        var txHistoryData = {
            api_key: window.apiKey,
            type: 'WITHDRAWAL'
        };
        initTxHistory($('#recent-tx-data'), $('#recent-tx-preloader'), txHistoryData, true, true);
        
        var pathArray = window.location.pathname.split('/');
        var pathLast = pathArray[pathArray.length - 1];
        if(pathLast != 'withdraw' && pathLast != '') {
            var nftid = pathLast;
            $('#select-nft').val(symbol).trigger('change');
        }
    }
});

$(document).on('newWalletTransaction', function() {
    if(typeof(window.latestWithdrawalNxid) === 'undefied')
        return;
    
    var newItem = $('.tx-history-item[data-nxid="' + window.latestWithdrawalNxid + '"]');
    if(newItem.length)
        mobileTxDetails(newItem);
});