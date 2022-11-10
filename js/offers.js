$(document).ready(function() {
    window.renderingStagesTarget = 1;
    
    initCountdowns();
    initSelectNet(null, '/nft/wallet/networks', false);
    initSelectCol();
    initSelectCoin('/nft/assets');
    
    gotoUiCard('offers');
    
    window.offersAS = new AjaxScroll(
        $('#offers-data'),
        $('#offers-data-preloader'),
        {
            api_key: window.apiKey,
            auction: true,
            buynow: true
        },
        function() {
            
            //---
            this.data.offset = this.offset;
            var thisAS = this;
            
            $.ajax({
                url: config.apiUrl + '/nft/offers',
                type: 'POST',
                data: JSON.stringify(thisAS.data),
                contentType: "application/json",
                dataType: "json",
            })
            .retry(config.retry)
            .done(function (data) {
                if(data.success) {
                    $.each(data.offers, function(k, v) {
                        thisAS.append(renderOffer(v));
                    });
                    
                    thisAS.done();
            
                    if(thisAS.offset == 0)
                        $(document).trigger('renderingStage');
                        
                    if(data.offers.length != 50)
                        thisAS.noMoreData();
                } else {
                    msgBoxRedirect(data.error);
                    thisAS.done();
                    thisAS.noMoreData();
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                msgBoxNoConn(true);
                thisAS.done();
                thisAS.noMoreData();
            });
            //---
            
        },
        false
    );
    
    $('#btn-filter').click(function() {
	    gotoUiCard('filter');
    });
    
    $('.sort-item').click(function() {
        window.offersAS.data.sort = $(this).data('sort');
        window.offersAS.data.sort_dir = $(this).data('sort-dir');
        window.offersAS.reset();
        
        $('#sort-current').html($(this).html());
        
        $('.sort-item').removeClass('active');
        $(this).addClass('active');
    });
    
    $('.sort-item.active').trigger('click');
    
    $('#filter-search').on('input', function() {
        if(typeof(window.searchTypingTimeout) !== 'undefined')
            clearTimeout(window.searchTypingTimeout);
            
        window.searchTypingTimeout = setTimeout(function() {
            window.offersAS.data.query = $('#filter-search').val();
            window.offersAS.reset();
        }, 750);
    });
    
    $('#filter-buynow').change(function() {
        if(! $(this).prop('checked') && ! $('#filter-auction').prop('checked')) {
            $(this).prop('checked', true);
            return;
        }
        
        window.offersAS.data.buynow = $(this).prop('checked');
        window.offersAS.reset();
    });
    
    $('#filter-auction').change(function() {
        if(! $(this).prop('checked') && ! $('#filter-buynow').prop('checked')) {
            $(this).prop('checked', true);
            return;
        }
        
        window.offersAS.data.auction = $(this).prop('checked');
        window.offersAS.reset();
    });
    
    $('#select-net').on('change', function() {        
        var netid = $(this).data('netid');
        var name = $(this).val();
        
        $(this).data('netid', '').val('');
        
        if($('.multiselect-net-item[data-netid="' + netid + '"]').length)
            return;
        
        $('#multiselect-net').append(`
            <div class="pretty p-icon p-smooth">
                <input class="multiselect-net-item" type="checkbox" checked data-netid="${netid}">
                <div class="state p-primary">
                    <i class="icon fa fa-check"></i>
                    <label>${name}</label>
                </div>
            </div>
        `);
        
        if(typeof(window.offersAS.data.network) == 'undefined')
            window.offersAS.data.network = new Array();
            
        window.offersAS.data.network.push(netid);
        window.offersAS.reset();
    });
    
    $('#select-col').on('change', function() {
        var colid = $(this).data('colid');
        var name = $(this).val();
        
        $(this).data('colid', '').val('');
        
        if($('.multiselect-col-item[data-colid="' + colid + '"]').length)
            return;
        
        $('#multiselect-col').append(`
            <div class="pretty p-icon p-smooth">
                <input class="multiselect-col-item" type="checkbox" checked data-colid="${colid}">
                <div class="state p-primary">
                    <i class="icon fa fa-check"></i>
                    <label>${name}</label>
                </div>
            </div>
        `);
        
        if(typeof(window.offersAS.data.collection) == 'undefined')
            window.offersAS.data.collection = new Array();
            
        window.offersAS.data.collection.push(colid);
        window.offersAS.reset();
    });
    
    $('#select-coin').on('change', function() {
        var assetid = $(this).val();
        
        $(this).val('');
        
        if($('.multiselect-coin-item[data-assetid="' + assetid + '"]').length)
            return;
        
        $('#multiselect-coin').append(`
            <div class="pretty p-icon p-smooth">
                <input class="multiselect-coin-item" type="checkbox" checked data-assetid="${assetid}">
                <div class="state p-primary">
                    <i class="icon fa fa-check"></i>
                    <label>${assetid}</label>
                </div>
            </div>
        `);
        
        if(typeof(window.offersAS.data.asset) == 'undefined')
            window.offersAS.data.asset = new Array();
            
        window.offersAS.data.asset.push(assetid);
        window.offersAS.reset();
    });
});