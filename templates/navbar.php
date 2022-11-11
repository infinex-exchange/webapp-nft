<nav class="navbar sticky-top navbar-nft shadow-sm navbar-expand-lg d-none d-lg-flex">
    <div class="container-fluid container-1500">
        <div class="collapse navbar-collapse">   
            <ul class="navbar-nav">
                <?php include(__DIR__.'/menu_inner.html'); ?>
            </ul>
            <ul class="navbar-nav user-only">
                <li class="nav-item nav-separ px-2">
                    <span class="nav-link">&bull;</span>
                </li>
                
                <li class="nav-item">
                    <a class="nav-link auto-active" href="/nft/my-sales">
                        <i class="fa-solid fa-money-check-dollar"></i>
                        My sales
                    </a>
                </li>
                
                <li class="nav-item nav-separ px-2">
                    <span class="nav-link">&bull;</span>
                </li>
                
                <li class="nav-item">
                    <a class="nav-link auto-active" href="/nft/my-purchases">
                        <i class="fa-solid fa-cart-shopping"></i>
                        My purchases
                    </a>
                </li>
            </ul>
            <ul class="navbar-nav ms-auto user-only">
                <?php include(__DIR__.'/menu_inner_right.php'); ?>
            </ul>
        </div> 
    </div>
</nav>