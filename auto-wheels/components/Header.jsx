import AccountTypeModal from "@/modules/auth/AccountType";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Stack } from "react-bootstrap";

const Header = () => {
	const [modalOpened, setModalOpened] = useState(false);

  return (
	<>
    <header className="site-header bg-white py-3 theme-header">
      <nav className="container">
        <div className="row align-items-center">
          <div className="col-lg-2">
            <Link href="/" className="p-1">
              <Image width={163} height={27} src="/logo.png" quality={100} />
            </Link>
          </div>
          <div className="col-lg-7">
            <div className="header-navigation text-center">
              <ul className="list-unstyled list-inline mb-0 mx-auto">
			  <li className="list-inline-item dropdown">
                  <Link href={"/listing/cars"}>Cars</Link>
                </li>
                {/* <li className="list-inline-item dropdown dropdown-left">
                  <Link
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    href={"/listing/cars"}
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
                </li> */}
                <li className="list-inline-item dropdown">
                  <Link href={"/listing/bikes"}>Bike</Link>
                </li>
                <li className="list-inline-item dropdown">
                  <Link href={"/listing/trucks"}>Truck</Link>
                </li>
                <li className="list-inline-item dropdown">
                  <Link href={"/blogs"}>Blogs</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3">
            <Stack direction="horizontal" gap={2}>
              <button className="btn btn-outline-primary ms-auto" onClick={()=>setModalOpened(true)}>Login</button>
              <button className="btn btn-primary">Post an Ad</button>
            </Stack>
          </div>
        </div>
      </nav>
      {/* <nav className="navbar navbar-expand-lg bg-white">
<div className="container">
	<a className="navbar-brand" href="#">Brand</a>
	<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main_nav" aria-expanded="false" aria-label="Toggle navigation">
		<span className="navbar-toggler-icon"></span>
	</button>
	<div className="collapse navbar-collapse" id="main_nav">
		<ul className="navbar-nav">
			<li className="nav-item active"> <a className="nav-link" href="#">Home </a> </li>
			<li className="nav-item"><a className="nav-link" href="#"> About </a></li>
			<li className="nav-item"><a className="nav-link" href="#"> Services </a></li>
			<li className="nav-item dropdown has-megamenu">
				<a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false"> Mega menu  </a>
				<div className="dropdown-menu megamenu" role="menu">
					<div className="row g-3">
						<div className="col-lg-3 col-6">
							<div className="col-megamenu">
								<h6 className="title">Title Menu One</h6>
								<ul className="list-unstyled">
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
								</ul>
							</div>  
						</div>
						<div className="col-lg-3 col-6">
							<div className="col-megamenu">
								<h6 className="title">Title Menu Two</h6>
								<ul className="list-unstyled">
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
								</ul>
							</div> 
						</div>
						<div className="col-lg-3 col-6">
							<div className="col-megamenu">
								<h6 className="title">Title Menu Three</h6>
								<ul className="list-unstyled">
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
									<li><a href="#">Custom Menu</a></li>
								</ul>
							</div> 
						</div>    
						<div className="col-lg-3 col-6">
							<div className="col-megamenu">
								<h6 className="title">Title Menu Four</h6>
								<ul className="list-unstyled">
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
		<ul className="navbar-nav ms-auto">
			<li className="nav-item"><a className="nav-link" href="#"> Menu item </a></li>
			<li className="nav-item dropdown">
				<a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false"> Dropdown right </a>
			    <ul className="dropdown-menu dropdown-menu-end">
				  <li><a className="dropdown-item" href="#"> Submenu item 1</a></li>
				  <li><a className="dropdown-item" href="#"> Submenu item 2 </a></li>
			    </ul>
			</li>
		</ul>
	</div> 
</div> 
</nav> */}
    </header>
	<AccountTypeModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      />
	</>
  );
};

export default Header;
