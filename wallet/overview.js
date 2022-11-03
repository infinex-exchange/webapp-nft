$(document).ready(function() {
    window.renderingStagesTarget = 1;
    
    $('#nft-search').on('input', function() {
        var query = $(this).val();
        if(query == '')
            delete window.nftsAS.data.search;
        else
            window.nftsAS.data.search = query;
        window.nftsAS.reset();
    });
});

$(document).on('authChecked', function() {
    if(window.loggedIn) {
        window.nftsAS = new AjaxScroll(
            $('#nfts-data'),
            $('#nfts-data-preloader'),
            {
                api_key: window.apiKey
            },
            function() {
                
                //---
                this.data.offset = this.offset;
                var thisAS = this;
                
                $.ajax({
                    url: config.apiUrl + '/nft/wallet/nfts',
                    type: 'POST',
                    data: JSON.stringify(thisAS.data),
                    contentType: "application/json",
                    dataType: "json",
                })
                .retry(config.retry)
                .done(function (data) {
                    if(data.success) {
                        $.each(data.nfts, function(nftid, nft) {
                            thisAS.append(`
                                <div class="nft-item col-12 col-md-3 col-lg-3 py-2">
                                    <div class="card h-100 hoverable">
										<img src="${nft.preview}" class="card-img-top h-100">
										<div class="card-body">
                                            <div class="row">
                                                <div class="col-11">
                                                    <h5 class="card-title">${nft.name}</h5>
                                                    <span class="small secondary">
                                                        <img src="${data.networks[nft.network].icon_url}" width="16" height="16">
                                                        ${data.networks[nft.network].description}
                                                    </span>
                                                </div>
                                                <div class="col-1 ps-0 my-auto text-right secondary dropdown">
                                    			    <a class="nav-link" href="#_" data-bs-toggle="dropdown">
                                                        <i class="fa-solid fa-ellipsis-vertical fa-lg"></i>
                                                    </a>
                                                    <ul class="dropdown-menu dropdown-menu-end">
                                                        <li>
                                                            <a class="dropdown-item" href="#_" onClick="">
                                                                <i class="fa-solid fa-xmark"></i>
                                                                Close offer
                                                            </a>
                                                        </li>
                                                    </ul>
                                    			</div>
                                            </div>
                                        </div>
									</div>
                                </div>
                            `);
                        });
                        
                        thisAS.done();
                
                        if(thisAS.offset == 0)
                            $(document).trigger('renderingStage');
                            
                        if(data.nfts.length != 50)
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
            true,
            true
        );
    }
});