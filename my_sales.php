<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include(__DIR__.'/../../templates/head.php'); ?>
        <script src="/js/ajax_scroll.js?<?php echo filemtime(__DIR__.'/../../js/ajax_scroll.js'); ?>"></script>
        <link rel="stylesheet" href="/nft/css/styles.css?<?php echo filemtime(__DIR__.'/css/styles.css'); ?>">
        <title>My sales | Vayamos NFT</title>
    </head>
    <body>
    
        <!-- Preloader -->
        <?php include('../../templates/preloader.html'); ?>
        
        <!-- Navbar -->
        <?php include('../../templates/navbar.php'); ?>
        <?php include(__DIR__.'/templates/navbar.php'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 p-0 user-only">
        <div class="row m-0 h-rest">
        
        <!-- Main column -->
        <div class="col-12 p-0 ui-card ui-column">
            
            <div class="row">
                <h3>My sales</h3>
            </div>
            
            <form>
            <div class="row">
                <div class="col-auto order-1 my-auto p-1 p-lg-2">
                    <a href="/nft/sell" class="btn btn-primary btn-sm">Create offer</a>
                </div>
                
                <div class="col-12 col-lg-auto order-3 order-lg-2 my-auto p-1 p-lg-2">
                    <input id="filter-search" type="text" placeholder="Search..." class="input-search form-control">
                </div>
            </div>
            </form>
            
            <div id="my-offers-data">
            </div>
        
        <!-- / Main column -->
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <script src="/nft/js/render_offer.js?<?php echo filemtime(__DIR__.'/js/render_offer.js'); ?>"></script>
        <script src="/nft/js/my_offers.js?<?php echo filemtime(__DIR__.'/js/my_sales.js'); ?>"></script>
        
        <?php include(__DIR__.'/../../templates/modals.php'); ?>
        <?php include(__DIR__.'/templates/mobile_nav.php'); ?>
    
    </body>
</html>
