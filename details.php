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
            
            <div class="row p-2">
                <h3 class="nft-name"></h3>
            </div>
            
            <div class="row">
                <div class="col-12 col-lg-5">
                    <div class="ui-card-light p-2">
                        <img src="/nft/img/no_preview.png" class="img-fluid w-100" id="nft-preview">
                    </div>
                </div>
                
                <div class="col-12 col-lg-7 mt-4 mt-lg-0">
                    <div class="ui-card-light p-2">
                    <div class="row">
                        <div class="col-12">
                            <h4>NFT</h4>
                        </div>
                        
                        <div class="row py-2">
                            <div class="col-6 my-auto">
                                <h5 class="secondary">NFT ID:</h5>
                            </div>
                            <div class="col-6 text-end">
                                <span class="wrap" id="nftid"></span>
                            </div>
                        </div>
                        
                        <div class="row py-2">
                            <div class="col-6 my-auto">
                                <h5 class="secondary">Name:</h5>
                            </div>
                            <div class="col-6 text-end">
                                <span class="wrap nft-name"></span>
                            </div>
                        </div>
                    </div>                        
                    </div>
                    
                    <div class="ui-card-light p-2 mt-4">
                    <div class="row">
                        <div class="col-12">
                            <h4>Collection</h4>
                        </div>
                    </div>                        
                    </div>
                    
                    <div class="ui-card-light p-2 mt-4">
                    <div class="row">
                        <div class="col-12">
                            <h4>Author</h4>
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
        
        <?php include('../../templates/modals.php'); ?>
        <script src="/nft/js/details.js?<?php echo filemtime(__DIR__.'/js/details.js'); ?>"></script>
        
        <?php include(__DIR__.'/templates/mobile_nav.php'); ?>
    
    </body>
</html>
