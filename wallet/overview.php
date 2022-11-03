<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include(__DIR__.'/../../../templates/head.php'); ?>
        <script src="/js/ajax_scroll.js?<?php echo filemtime(__DIR__.'/../../../js/ajax_scroll.js'); ?>"></script>
        <link rel="stylesheet" href="/nft/css/styles.css?<?php echo filemtime(__DIR__.'/../css/styles.css'); ?>">
        <title>NFT wallet | Vayamos NFT</title>
    </head>
    <body>
    
        <!-- Preloader -->
        <?php include('../../../templates/preloader.html'); ?>
        
        <!-- Navbar -->
        <?php include('../../../templates/navbar.php'); ?>
        <?php include(__DIR__.'/../templates/navbar.php'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 p-0 user-only">
        <div class="row m-0 h-rest">
        
        <!-- Main column -->
        <div class="col-12 p-0 ui-card ui-column">
            
            <form>
            <div class="row">
                <div class="col-auto order-1 my-auto p-1 p-lg-2">
                    <a href="/nft/wallet/deposit" class="btn btn-primary btn-sm">Deposit</a>
                    <a href="/nft/wallet/withdraw" class="btn btn-primary btn-sm">Withdraw</a>
                    <a href="/nft/wallet/transfer" class="btn btn-primary btn-sm">Transfer</a>
                </div>
                
                <div class="col-12 col-lg-auto order-3 order-lg-2 my-auto p-1 p-lg-2">
                    <input id="nft-search" type="text" size="7" placeholder="Search" class="form-control input-search">
                </div>
                
                <!--
                <div class="col-auto order-2 order-lg-3 ms-auto ms-lg-0 my-auto p-1 p-lg-2">
                    <a href="/nft/create" class="btn btn-primary btn-sm">Create NFT</a>
                </div>
                -->
            </div>
            </form>
            
            <div class="row" id="nfts-data">
            </div>
        
        <!-- / Main column -->
        </div>
            
        <!-- / Root container -->    
        </div>
        </div>
        
        <script src="/nft/wallet/overview.js?<?php echo filemtime(__DIR__.'/overview.js'); ?>"></script>
        
        <?php include(__DIR__.'/../../../templates/modals.php'); ?>
        <?php include(__DIR__.'/../templates/mobile_nav.php'); ?>
    
    </body>
</html>
