import Image from "next/image";
import Link from "next/link";
import { Stack } from "react-bootstrap";

const Header = () => {
  return (
    <header className="site-header bg-white py-3 theme-header">
      <nav className="container">
        <div className="row align-items-center">
          <div className="col-lg-2">
            <Link href="#" className="p-1">
              <Image width={163} height={27} src="/logo.png" quality={100} />
            </Link>
          </div>
          <div className="col-lg-7">
            <div className="header-navigation text-center">
              <ul className="list-unstyled list-inline mb-0 mx-auto">
                <li className="list-inline-item dropdown dropdown-left">
                  <Link
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    href={"#"}
                  >
                    Car
                  </Link>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">
                      <Link href={"#"}>Sell Your Car</Link>
                    </li>
                    <li className="dropdown-item">
                      <Link href={"#"}>Sell Your Bike</Link>
                    </li>
                    <li className="dropdown-item">
                      <Link href={"#"}>Sell Your Truck</Link>
                    </li>
                  </ul>
                </li>
                <li className="list-inline-item dropdown">
                  <Link href={"#"}>Bike</Link>
                </li>
                <li className="list-inline-item dropdown">
                  <Link href={"#"}>Truck</Link>
                </li>
                <li className="list-inline-item dropdown">
                  <Link href={"#"}>Blogs</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3">
            <Stack direction="horizontal" gap={2}>
              <button className="btn btn-outline-primary ms-auto">Login</button>
              <button className="btn btn-primary">Post an Ad</button>
            </Stack>
          </div>
        </div>
      </nav>
      {/* <nav class="navbar navbar-expand-lg bg-white">
<div class="container">
	<a class="navbar-brand" href="#">Brand</a>
	<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main_nav" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>
	<div class="collapse navbar-collapse" id="main_nav">
		<ul class="navbar-nav">
			<li class="nav-item active"> <a class="nav-link" href="#">Home </a> </li>
			<li class="nav-item"><a class="nav-link" href="#"> About </a></li>
			<li class="nav-item"><a class="nav-link" href="#"> Services </a></li>
			<li class="nav-item dropdown has-megamenu">
				<a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false"> Mega menu  </a>
				<div class="dropdown-menu megamenu" role="menu">
					<div class="row g-3">
						<div class="col-lg-3 col-6">
							<div class="col-megamenu">
								<h6 class="title">Title Menu One</h6>
								<ul class="list-unstyled">
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
								</ul>
							</div>  
						</div>
						<div class="col-lg-3 col-6">
							<div class="col-megamenu">
								<h6 class="title">Title Menu Two</h6>
								<ul class="list-unstyled">
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
								</ul>
							</div> 
						</div>
						<div class="col-lg-3 col-6">
							<div class="col-megamenu">
								<h6 class="title">Title Menu Three</h6>
								<ul class="list-unstyled">
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
								</ul>
							</div> 
						</div>    
						<div class="col-lg-3 col-6">
							<div class="col-megamenu">
								<h6 class="title">Title Menu Four</h6>
								<ul class="list-unstyled">
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
								</ul>
							</div> 
						</div>
					</div> 
				</div> 
			</li>
		</ul>
		<ul class="navbar-nav ms-auto">
			<li class="nav-item"><a class="nav-link" href="#"> Menu item </a></li>
			<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false"> Dropdown right </a>
			    <ul class="dropdown-menu dropdown-menu-end">
				  <li><a class="dropdown-item" href="#"> Submenu item 1</a></li>
				  <li><a class="dropdown-item" href="#"> Submenu item 2 </a></li>
			    </ul>
			</li>
		</ul>
	</div> 
</div> 
</nav> */}
    </header>
  );
};

export default Header;
