<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../../templates/head.php'); ?>
        <link rel="stylesheet" href="/nft/css/styles.css?<?php echo filemtime(__DIR__.'/css/styles.css'); ?>">
        <title>Vayamos NFT</title>
    </head>
    <body>
    
        <!-- Preloader -->
        <?php include('../../templates/preloader.html'); ?>
        
        <!-- Navbar -->
        <?php include('../../templates/navbar.php'); ?>
        <?php include(__DIR__.'/templates/navbar.php'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 container-rest p-0">
        <div class="row m-0 h-rest">
        
        <!-- Main column -->
        <div class="col-12 p-0 ui-card ui-column">
            
            <div class="row">
                <div class="col-12 col-lg-4">
                    <div class="ui-card-light p-3 h-100 d-flex">
                        <div class="my-auto w-100">
                            <img src="/nft/img/no_preview.png" class="img-fluid w-100" id="nft-preview">
                        </div>
                    </div>
                </div>
                
                <div class="col-12 col-lg-8 mt-4 mt-lg-0">
                    <div class="ui-card-light p-3 h-100">     
                        <div class="row">
                            <h3 class="nft-name"></h3>
                        </div>
                        
                        <div class="row pb-4">
                            <span class="countdown" id="countdown"></span>
                        </div>
                        
                        <div class="row pb-4">
                            <div class="col-6 col-lg-3 auction-wrapper">
                                <h5 class="secondary">Current bid:</h5>
                                <h3 id="price-auction"></h3>
                            </div>
                            <div class="col-6 col-lg-3 buynow-wrapper">
                                <h5 class="secondary">Buy now price:</h5>
                                <h3 id="price-buynow"></h3>
                            </div>
                        </div>
                            
                        <div class="row pb-4">
                            <div class="col-6 col-lg-3 auction-wrapper">
                                <button type="button" class="btn btn-primary w-100" onClick="showBidPrompt()">
                                    <i class="fa-solid fa-gavel"></i>
                                    Place bid
                                </button>
                            </div>
                            <div class="col-6 col-lg-3 buynow-wrapper">
                                <button type="button" class="btn btn-primary w-100" onClick="confirmBuyNow()">
                                    <i class="fa-solid fa-cart-shopping"></i>
                                    Buy now
                                </button>
                            </div>
                        </div>
                        
                        <div class="row ms-1">
                            <div class="col-12 ps-0 pb-1">
                                <h5 class="secondary">Biddings:</h5>
                            </div>
                            <div class="col-12 background" id="bids-empty">
                                No bids
                            </div>
                            <div class="col-12 col-lg-8 background" id="bids-data-wrapper">
                                <div id="bids-data" class="scrollable" style="height: 200px">
                                </div>
                            </div>
                        </div>                                    
                    </div>
                </div>
                
                <div class="col-12 col-lg-6 mt-4 mt-lg-0 pb-4">
                    <div class="ui-card-light p-3 mt-4 h-100">
                        <div class="row pb-4">
                            <h4>NFT</h4>
                        </div>
                            
                        <div class="row py-2">
                            <div class="col-12">
                                <h5 class="secondary">NFT ID:</h5>
                            </div>
                            <div class="col-12">
                                <span class="wrap" id="nftid"></span>
                            </div>
                        </div>
                        
                        <div class="row pt-2 pb-4">
                            <div class="col-4">
                                <h5 class="secondary">Network:</h5>
                            </div>
                            <div class="col-12" id="nft-icon-net-wrapper">
                            </div>
                        </div>
                        
                        <div class="row py-2">
                            <div class="col-12">
                                <h5 class="secondary">Name:</h5>
                            </div>
                            <div class="col-12">
                                <span class="wrap nft-name"></span>
                            </div>
                        </div>
                        
                        <div class="row pt-2 pb-4">
                            <div class="col-12">
                                <h5 class="secondary">Description:</h5>
                            </div>
                            <div class="col-12">
                                <span class="wrap" id="nft-description"></span>
                            </div>
                        </div>
                        
                        <div class="row py-2">
                            <div class="col-12">
                                <h5 class="secondary">Data hash:</h5>
                            </div>
                            <div class="col-12">
                                <span class="wrap" id="nft-data-hash"></span>
                            </div>
                        </div>
                        
                        <div class="row py-2">
                            <div class="col-12">
                                <h5 class="secondary">Data URLs:</h5>
                            </div>
                            <div class="col-12 wrap">
                                <ul class="m-0" id="nft-data-uris">
                                </ul>
                            </div>
                        </div>
                        
                        <div class="row pt-2 pb-4">
                            <div class="col-12">
                                <h5 class="secondary">License URLs:</h5>
                            </div>
                            <div class="col-12 wrap" id="nft-license-uris">
                            </div>
                        </div>
                        
                        <div class="row pt-2">
                            <div class="col-12">
                                <h5 class="secondary">Attributes:</h5>
                            </div>
                            <div class="col-12 wrap" id="nft-attributes">
                            </div>
                        </div>                                
                    </div>
                </div>
                
                <div class="col-12 col-lg-6">
                <div class="row h-100">
                
                <div id="collection-wrapper" class="col-12 mt-4 mt-lg-0 pb-4">
                    <div class="ui-card-light p-3 mt-4 h-100">
                        <div class="row pb-4">
                            <h4>Collection</h4>
                        </div>
                        
                        <div class="row py-2">
                            <div class="col-4">
                                <h5 class="secondary">Name:</h5>
                            </div>
                            <div class="col-12 wrap" id="col-icon-name-wrapper">
                            </div>
                        </div>
                        
                        <div class="row py-2">
                            <div class="col-12">
                                <h5 class="secondary">Description:</h5>
                            </div>
                            <div class="col-12">
                                <span class="wrap" id="col-description"></span>
                            </div>
                        </div>
                        
                        <div class="row py-2">
                            <div class="col-12">
                                <h5 class="secondary">Website:</h5>
                            </div>
                            <div class="col-12">
                                <span class="wrap" id="col-website"></span>
                            </div>
                        </div>
                        
                        <div class="row pt-2">
                            <div class="col-12">
                                <h5 class="secondary">Twitter:</h5>
                            </div>
                            <div class="col-12">
                                <span class="wrap" id="col-twitter"></span>
                            </div>
                        </div>                             
                    </div>
                </div>
                
                <div class="col-12 mt-4 mt-lg-0 pb-4">
                    <div class="ui-card-light p-3 mt-4 h-100">
                        <div class="row pb-4">
                            <h4>Author</h4>
                        </div>
                        
                        <div class="row pt-2 pb-4">
                            <div class="col-12">
                                <h5 class="secondary">Author ID:</h5>
                            </div>
                            <div class="col-12 wrap" id="author-id">
                            </div>
                        </div>
                        
                        <div class="row py-2">
                            <div class="col-12">
                                <h5 class="secondary">Royalty percentage:</h5>
                            </div>
                            <div class="col-12" id="author-royalty-perc">
                            </div>
                        </div>      
                        
                        <div class="row pt-2">
                            <div class="col-12">
                                <h5 class="secondary">Royalty address:</h5>
                            </div>
                            <div class="col-12 wrap" id="author-royalty-address">
                            </div>
                        </div>                            
                    </div>
                </div>
                
                </div>
                </div>
            </div>
        
        <!-- / Main column -->
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <div class="modal fade" tabindex="-1" role="dialog" id="modal-confirm-buynow">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Confirm payment</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to purchase this NFT?
                        <br>
                        The amount of <span id="mcbn-price"></span> will be charged from your Vayamos account.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="modal-close btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="modal-close btn btn-primary" data-bs-dismiss="modal" onClick="buyNow()">Buy</button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="modal fade" tabindex="-1" role="dialog" id="modal-bid">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Place bid</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
                <div class="modal-body">
                    Your bid:
                    <div class="input-ps-group">
                        <input id="mb-bid" type="text" data-tsval="" data-rval="">
                        <span class="suffix asset"></span>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" onClick="submitBid()">Submit</button>
                </div>
        </div>
    </div>
</div>
        
        <?php include('../../templates/modals.php'); ?>
        <script src="/nft/js/nft_details.js?<?php echo filemtime(__DIR__.'/js/nft_details.js'); ?>"></script>
        <script src="/nft/js/render_offer.js?<?php echo filemtime(__DIR__.'/js/render_offer.js'); ?>"></script>
        <script src="/nft/js/offer.js?<?php echo filemtime(__DIR__.'/js/offer.js'); ?>"></script>
        
        <?php include(__DIR__.'/templates/mobile_nav.php'); ?>
    
    </body>
</html>
