<!DOCTYPE html>
<html lang="en">
    <head>
        <?php include('../../templates/head.php'); ?>
        <link rel="stylesheet" href="/nft/css/styles.css?<?php echo filemtime(__DIR__.'/css/styles.css'); ?>">
        <title>Vayamos NFT</title>
    </head>
    <body class="body-background">
    
        <!-- Preloader -->
        <?php include('../../templates/preloader.html'); ?>
        
        <!-- Navbar -->
        <?php include('../../templates/navbar.php'); ?>
        <?php include(__DIR__.'/templates/navbar.php'); ?>
        
        <!-- Root container -->
        <div id="root" class="container-fluid container-1500 h-rest pt-2 p-0">
        
            <div class="jumbotron row m-0 px-4 py-5">
                <div class="col-12">
                    <h1>Vayamos NFT</h1>
                    <p>Discover exclusive NFT collections from the world's top artists.</p>
                </div>
            </div>
            
            <div class="row gx-0 gx-lg-3 gy-3 m-0">
                
                <div class="col-12">
        	        <div class="p-2 p-lg-4 ui-card-light rounded">
        	            <div class="row">
                            <div class="col-12 col-lg-6 order-2 order-lg-1">
                                <img src="/nft/img/wallet_preview.png" class="img-fluid">
        		            </div>
                            <div class="col-12 col-lg-6 pt-2 pb-4 text-center order-1 order-lg2">
                                <h3>Stay tuned!</h3>
                                <h4>We'll launch NFT trading soon.</h4>
                                <p>You can hold your NFT on the Vayamos Exchange and use all the features of the NFT wallet already.</p>
        		            </div>
        	            </div>
        	        </div>
        	    </div>
                
            </div>
        
        <!-- / Root container -->
        </div>
        
        <div class="modal fade" tabindex="-1" role="dialog" id="modal-confirm-buy">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Confirm payment</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to purchase the Mining Cloud contract?
                        <br>
                        The amount of <span id="mcb-price"></span> will be charged from your Vayamos account.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="modal-close btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button id="mcb-buy" type="button" class="btn btn-primary">Buy</button>
                    </div>
                </div>
            </div>
        </div>
        
        <?php include('../../templates/modals.php'); ?>
        <script src="/nft/js/index.js?<?php echo filemtime(__DIR__.'/js/index.js'); ?>"></script>
        
        <!-- Footer -->
        <?php include('../../templates/footer.html'); ?>
        <?php include(__DIR__.'/templates/mobile_nav.php'); ?>
    
    </body>
</html>
