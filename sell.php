<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../../templates/head.php'); ?>
        <?php include('../../imports/bignumber.html'); ?>
        <script src="/js/ajax_scroll.js?<?php echo filemtime(__DIR__.'/../../js/ajax_scroll.js'); ?>"></script>
        <link rel="stylesheet" href="/nft/css/styles.css?<?php echo filemtime(__DIR__.'/css/styles.css'); ?>">
        <title>Create offer | Vayamos NFT</title>
    </head>
    <body>
    
        <!-- Preloader -->
        <?php include(__DIR__.'/../../templates/preloader.html'); ?>
        
        <!-- Navbar -->
        <?php include(__DIR__.'/../../templates/navbar.php'); ?>
        <?php include(__DIR__.'/templates/navbar.php'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 container-rest p-0 user-only">
        <div class="row m-0 h-rest">
        
        <!-- Main column -->
        <div class="col-12 ui-card ui-column">
        <div class="row">
        <div class="col-12 col-lg-8">
            
            
            
            
            <div class="row">
                <h3>Create offer</h3>
            </div>
            
            
            
            <div class="row">               
                <div class="col-12 col-lg-6 mt-4">
                    <div class="row">
                        <div class="col-12 pb-1">
                            <h5 class="secondary">Sell NFT:</h5>
                        </div>
                        <div class="col-12">
                            <?php include(__DIR__.'/templates/select_nft.php'); ?>
                        </div>
                    </div>
                </div>
                
                <div class="col-12 col-lg-6 mt-4">
                    <div class="row">
                        <div class="col-12 pb-1">
                            <h5 class="secondary">For coin:</h5>
                        </div>
                        <div class="col-12">
                            <?php include(__DIR__.'/../../templates/select_coin.php'); ?>
                        </div>
                    </div>
                </div>
            </div>
            
            
            
            
            <div class="row">
                <div class="col-12 col-lg-4 mt-4">
                    <div class="row">
                        <div class="col-12 pb-1">
                            <h5 class="secondary">:</h6>
                        </div>
                        <div class="col-12 col-lg-6">
                            <div class="input-ps-group">
                                <input id="price" type="text" class="form-control step2-ro" data-tsval="" data-rval="" readonly>
                                <span class="suffix fiatid"></span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-12 col-lg-4 mt-4">
                    <div class="row">
                        <div class="col-12 pb-1">
                            <h5 class="secondary">Price:</h6>
                        </div>
                        <div class="col-12 col-lg-6">
                            <div class="input-ps-group">
                                <input id="price" type="text" class="form-control step2-ro" data-tsval="" data-rval="" readonly>
                                <span class="suffix fiatid"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
            
            
            <div class="row mt-4 mt-lg-5">
                
            </div>
            
            <div class="row mt-4 mt-lg-5">
                <div class="col-12 pb-1">
                    <h5 class="secondary">Crypto amount:</h6>
                </div>
                <div class="col-12 col-lg-6">
                    <div class="input-ps-group">
                        <input id="amount-crypto" type="text" class="form-control step2-ro" data-tsval="" data-rval="" readonly>
                        <span class="suffix assetid"></span>
                    </div>
                </div>
                <div id="sell-balance-wrapper" class="col-12 col-lg-6 d-none my-auto small secondary">
                    Available:
                    <span id="sell-balance"></span>
                    <span class="assetid"></span>
                </div>
            </div>
            
            <div class="row mt-4 mt-lg-5">
                <div class="col-12 pb-1">
                    <h5 class="secondary">Payment time window:</h5>
                </div>
                
                <div class="col-12 col-lg-6">
                    <input id="time-window-raw" type="range" class="form-range" min="0" max="11" step="1" value="5">
                </div>
                
                <div class="col-6 d-none d-lg-block"></div>
                
                <div class="col-12 col-lg-6 text-center">
                    <span class="small secondary" id="time-window-desc"></span>
                </div>
            </div>
            
            <div class="row mt-4 mt-lg-5">
                <div class="col-12 pb-1">
                    <h5 class="secondary">Additional safety options:</h5>
                </div>
            </div>
            
            <div class="row mt-2">            
                <div class="col-12 col-lg-auto my-auto">
                    <div class="pretty p-switch">
                        <input type="checkbox" id="sec-min-rating-cbx">
                        <div class="state p-primary">
                            <label for="withdraw-save">Minimal user rating</label>
                        </div>
                    </div>
                </div>
                
                <div class="d-none col-12 col-lg-auto my-auto" id="sec-min-rating-expand">
                    <div class="rateit_" data-rateit-resetable="false" style="font-size: 40px"></div>
                </div>
            </div>
            
            <div class="row mt-4 mt-lg-5">
                <div class="col-12 col-lg-6">
                    <button id="submit" type="submit" class="btn btn-primary w-100">Create offer</button>
                </div>
            </div>
        
        <!-- / Main column -->
        </div>
        </div>
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <script src="/nft/js/sell.js?<?php echo filemtime(__DIR__.'/js/sell.js'); ?>"></script>
        
        <?php include(__DIR__.'/../../templates/modals.php'); ?>
        <?php include(__DIR__.'/templates/mobile_nav.php'); ?>
    
    </body>
</html>
