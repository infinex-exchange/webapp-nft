<nav id="mobile-navbar" class="navbar fixed-bottom navbar-expand navbar-mobile d-flex d-lg-none py-0 small">
    <ul class="navbar-nav mx-auto text-center">
        <li class="nav-item">
            <a class="nav-link auto-active" href="/">
                <i class="fas fa-home"></i><br>
                Home
            </a>
        </li>
    </ul>
    
    <ul class="navbar-nav mx-auto text-center">
        <?php include(__DIR__.'/menu_inner.html'); ?>
    </ul>
    
    <ul class="navbar-nav mx-auto text-center dropup user-only">
        <li class="nav-item dropdown">
            <a href="#_" class="nav-link dropdown-toggle auto-active-group" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-user"></i><br>
                Account
            </a>
            <div class="dropdown-menu dropdown-menu-end">
                <ul class="nav flex-column">
                    <li>
                        <a class="dropdown-item auto-active" href="/nft/my-sales">
                            <i class="fa-solid fa-money-check-dollar"></i>
                            My sales
                        </a>
                    </li> 
                    <li>
                        <a class="dropdown-item auto-active" href="/nft/my-purchases">
                            <i class="fa-solid fa-cart-shopping"></i>
                            My purchases
                        </a>
                    </li>
                </ul>
            </div>
          </li>
    </ul>
    
    <ul class="navbar-nav mx-auto text-center dropup user-only">
        <?php include(__DIR__.'/menu_inner_right.php'); ?>
    </ul>
</nav>

<div style="height: 53px; margin-bottom: min(10px, env(safe-area-inset-bottom, 0));" class="d-block d-lg-none"></div>