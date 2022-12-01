$(document).ready(function() {
    $('#select-nft').on('click', function(event) {
        $('.selector-dropdown').not('#select-nft-dropdown').hide();
        $('.selector-arrow').not('#select-nft-arrow').removeClass('flip');
        
        $('#select-nft-dropdown').toggle();
        $('#select-nft-arrow').toggleClass('flip');
        
        if($('#select-nft-arrow').hasClass('flip'))
            $('#select-nft-search').focus();
        
        event.stopPropagation();
    });
    
    $('html').on('click', function(e) {
        if($(e.target).is('#select-nft-search')) {
            e.preventDefault();
            return;
        }
        
        $('#select-nft-dropdown').hide();
        $('#select-nft-arrow').removeClass('flip');
    });
    
    $('#select-nft-search').on('input', function() {
        var query = $(this).val();
        if(query == '')
            delete window.selectNftAS.data.search;
        else
            window.selectNftAS.data.search = query;
        window.selectNftAS.reset();
    });
});

function initSelectNft(endpoint = '/nft/wallet/nfts') {
    $('#select-nft').data('nftid', '');
    $('#select-nft').val('');
    $('#select-nft-data').empty();
    
    window.selectNftAS = new AjaxScroll(
        $('#select-nft-data'),
        $('#select-nft-data-preloader'),
        {
            api_key: window.apiKey
        },
        function() {
            this.data.offset = this.offset;
            var thisAS = this;
                
            $.ajax({
                url: config.apiUrl + endpoint,
                type: 'POST',
                data: JSON.stringify(thisAS.data),
                contentType: "application/json",
                dataType: "json",
            })
            .retry(config.retry)
            .done(function (data) {
                if(data.success) {
                    $.each(data.nfts, function(k, v) {
                        shortNftid = strMiddleCut(k, 10);
                        
                        thisAS.append(`
                            <div class="select-nft-item row p-1 hoverable" data-nftid="${k}" data-name="${v.name}">
                                <div class="col-auto my-auto text-center" style="width: 32px">
                                    <img width="24px" height="24px" src="${v.preview}">
                                </div>
                                <div class="col-auto wrap my-auto">
                                    <h5 class="secondary">${v.name}</h5>
                                    ${shortNftid}
                                </div>
                            </div>
                        `);
                    });
                    
                    $('#select-nft').trigger('dataLoaded');
                    
                    $('.select-nft-item').on('click', function(event) {
                        $('#select-nft').val($(this).attr('data-name'));
                        $('#select-nft').data('nftid', $(this).data('nftid'));
                        $('#select-nft').trigger('change');
                    });
                        
                    thisAS.done();
                          
                    if(Object.keys(data.nfts).length != 50)
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
        }
    );
}