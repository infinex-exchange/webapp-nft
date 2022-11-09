<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../../templates/head.php'); ?>
        <script src="/js/ajax_scroll.js?<?php echo filemtime(__DIR__.'/../../js/ajax_scroll.js'); ?>"></script>
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
        <div id="root" class="container-fluid container-1500 p-0">
        <div class="row m-0 h-rest">
        
        <!-- Left column -->
        <div class="col-12 col-lg-3 p-0 ui-card ui-column" data-ui-card="filter">
        <div class="row">
        
            <div class="col pb-4">
                <h3>Filters</h3>
            </div>
            
            <div class="col-12 pb-1">
                <h5 class="secondary">Search:</h5>
            </div>
            <div class="col-12 pb-4">
                <input id="filter-search" type="text" placeholder="Search..." class="input-search form-control">
            </div>
            
            <div class="col-12 pb-1">
                <h5 class="secondary">Offer type:</h5>
            </div>
            <div class="col-12">
                 <div class="pretty p-icon p-smooth">
                      <input id="filter-buynow" type="checkbox" checked>
                      <div class="state p-primary">
                          <i class="icon fa fa-check"></i>
                          <label>Buy now</label>
                      </div>
                  </div>
            </div>
            <div class="col-12 pb-4">
                <div class="pretty p-icon p-smooth">
                      <input id="filter-auctions" type="checkbox" checked>
                      <div class="state p-primary">
                          <i class="icon fa fa-check"></i>
                          <label>Auctions</label>
                      </div>
                  </div>
            </div>
            
            <div class="col-12 pb-1">
                <h5 class="secondary">Network:</h5>
            </div>
            <div class="col-12 pb-4">
                <?php include(__DIR__.'/../../templates/select_net.php'); ?>
            </div>
            
            <div class="col-12 pb-1">
                <h5 class="secondary">Collection:</h5>
            </div>
            <div class="col-12">
                <?php include(__DIR__.'/templates/select_col.php'); ?>
            </div>
        
        <!-- / Left column -->
        </div>
        </div>
        
        <!-- Main column -->
        <div class="col-12 col-lg-9 p-0 ui-card ui-column" data-ui-card="offers">
            
            <div class="row pb-2">
                <h3>Offers list</h3>
            </div>
        
            <div class="row" id="offers-data">
            </div>
        
        <!-- / Main column -->
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <?php include('../../templates/modals.php'); ?>
        <script src="/nft/js/render_offer.js?<?php echo filemtime(__DIR__.'/js/render_offer.js'); ?>"></script>
        <script src="/nft/js/offers.js?<?php echo filemtime(__DIR__.'/js/offers.js'); ?>"></script>
        
        <!-- Footer -->
        <?php include('../../templates/footer.html'); ?>
        <?php include(__DIR__.'/templates/mobile_nav.php'); ?>
    
    </body>
</html>
