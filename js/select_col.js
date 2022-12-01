$(document).ready(function() {
    $('#select-col').on('click', function(event) {
        $('.selector-dropdown').not('#select-col-dropdown').hide();
        $('.selector-arrow').not('#select-col-arrow').removeClass('flip');
        
        $('#select-col-dropdown').toggle();
        $('#select-col-arrow').toggleClass('flip');
        
        if($('#select-col-arrow').hasClass('flip'))
            $('#select-col-search').focus();
        
        event.stopPropagation();
    });
    
    $('html').on('click', function(e) {
        if($(e.target).is('#select-col-search')) {
            e.preventDefault();
            return;
        }
        
        $('#select-col-dropdown').hide();
        $('#select-col-arrow').removeClass('flip');
    });
    
    $('#select-col-search').on('input', function() {
        var query = $(this).val();
        if(query == '')
            delete window.selectColAS.data.search;
        else
            window.selectColAS.data.search = query;
        window.selectColAS.reset();
    });
});

function initSelectCol(endpoint = '/nft/collections') {
    $('#select-col').data('colid', '');
    $('#select-col').val('');
    $('#select-col-data').empty();
    
    window.selectColAS = new AjaxScroll(
        $('#select-col-data'),
        $('#select-col-data-preloader'),
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
                    $.each(data.collections, function(k, v) {
                        var img = '';
                        
                        if(v.icon_url) {
                            img = `
	                            <img width="24px" height="24px" src="${v.icon_url}">
	                        `;
	                    }
	                    
                        thisAS.append(`
                            <div class="select-col-item row p-1 hoverable" data-colid="${k}" data-name="${v.name}">
                                <div class="col-auto my-auto text-center" style="width: 32px; height: 24px;">
                                    ${img}
                                </div>
                                <div class="col-auto wrap my-auto">
                                    <h5 class="secondary">${v.name}</h5>
                                </div>
                            </div>
                        `);
                    });
                    
                    $('#select-col').trigger('dataLoaded');
                    
                    $('.select-col-item').on('click', function(event) {
                        $('#select-col').val($(this).attr('data-name'));
                        $('#select-col').data('colid', $(this).data('colid'));
                        $('#select-col').trigger('change');
                    });
                        
                    thisAS.done();
                            
                    if(Object.keys(data.collections).length != 50)
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