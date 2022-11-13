function msColChange(item) {
    var colid = $(item).data('colid');
    
    var index = window.offersAS.data.collection.indexOf(colid);
    if (index !== -1) {
        window.offersAS.data.collection.splice(index, 1);
        if(window.offersAS.data.collection.length == 0)
            delete window.offersAS.data.collection;
        window.offersAS.reset();
    }
    
    $(item).parent('.pretty').remove();
}

function msNetChange(item) {
    var netid = $(item).data('netid');
    
    var index = window.offersAS.data.network.indexOf(netid);
    if (index !== -1) {
        window.offersAS.data.network.splice(index, 1);
        if(window.offersAS.data.network.length == 0)
            delete window.offersAS.data.network;
        window.offersAS.reset();
    }
    
    $(item).parent('.pretty').remove();
}

function msCoinChange(item) {
    var assetid = $(item).data('assetid');
    
    var index = window.offersAS.data.asset.indexOf(assetid);
    if (index !== -1) {
        window.offersAS.data.asset.splice(index, 1);
        if(window.offersAS.data.asset.length == 0)
            delete window.offersAS.data.asset;
        window.offersAS.reset();
    }
    
    $(item).parent('.pretty').remove();
}

$(document).ready(function() {
    window.renderingStagesTarget = 1;
    
    initCountdowns();
    initSelectNet(null, '/nft/wallet/networks', false);
    initSelectCol();
    initSelectCoin('/nft/assets');
    
    gotoUiCard('offers');
    
    var renderMode = localStorage.getItem('nft_renderMode');
    if(renderMode === null || renderMode == 'ver') {
        window.renderFunction = renderOffer;
        $('#btn-vertical').addClass('active');
    }
    else {
        window.renderFunction = renderOfferHor;
        $('#btn-horizontal').addClass('active');
    }
    
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
                        thisAS.append(window.renderFunction(v));
                    });
                    
                    updateCountdowns();
                    
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
        false,
        false,
        $('#offers-content')
    );
    
    $('#btn-filter').click(function() {
	    gotoUiCard('filter');
        doJsSizing();
    });
    
    $('#btn-filter-apply').click(function() {
        gotoUiCard('offers');
        doJsSizing();
    });
    
    $('.sort-item').click(function() {
        window.offersAS.data.sort = $(this).data('sort');
        window.offersAS.data.sort_dir = $(this).data('sort-dir');
        window.offersAS.reset();
        
        $('#sort-current').html($(this).html());
        
        $('.sort-item').removeClass('active');
        $(this).addClass('active');
        
        localStorage.setItem('nft_sort', window.offersAS.data.sort);
        localStorage.setItem('nft_sortDir', window.offersAS.data.sort_dir);
    });
    
    var sort = localStorage.getItem('nft_sort');
    if(sort === null) sort = 'popularity';
    var sortDir = localStorage.getItem('nft_sortDir');
    if(sortDir === null) sortDir = 'DESC';
    $('.sort-item[data-sort="' + sort + '"][data-sort-dir="' + sortDir + '"]').trigger('click');
    
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
        var netid = $(this).data('network');
        var name = $(this).val();
        
        $(this).data('netid', '').val('');
        
        if($('.multiselect-net-item[data-netid="' + netid + '"]').length)
            return;
        
        $('#multiselect-net').append(`
            <div class="pretty p-icon p-smooth">
                <input class="multiselect-net-item" type="checkbox" checked data-netid="${netid}" onChange="msNetChange(this)">
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
                <input class="multiselect-col-item" type="checkbox" checked data-colid="${colid}" onChange="msColChange(this)">
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
                <input class="multiselect-coin-item" type="checkbox" checked data-assetid="${assetid}" onChange="msCoinChange(this)">
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
    
    $('#btn-vertical').click(function() {
        if(window.renderFunction == renderOffer)
            return;
        
        window.renderFunction = renderOffer;
        $(this).addClass('active');
        $('#btn-horizontal').removeClass('active');
        window.offersAS.reset();
        localStorage.setItem('nft_renderMode', 'ver');
    });
    
    $('#btn-horizontal').click(function() {
        if(window.renderFunction == renderOfferHor)
            return;
        
        window.renderFunction = renderOfferHor;
        $(this).addClass('active');
        $('#btn-vertical').removeClass('active');
        window.offersAS.reset();
        localStorage.setItem('nft_renderMode', 'hor');
    });
});