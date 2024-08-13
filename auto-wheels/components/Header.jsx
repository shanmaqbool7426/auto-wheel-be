'use client';
import AccountTypeModal from "@/modules/auth/AccountType";
import Image from "next/image";
import Link from "next/link";
import { Avatar, Loader } from '@mantine/core';
import { useState } from "react";
import { Stack } from "react-bootstrap";
import { useSession } from "next-auth/react";

const Header = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const { data: session, status } = useSession();
console.log('>>>',session?.user?.image);
  // Show a loading spinner while session is being fetched
  if (status === 'loading') {
    return (
      <header className="site-header bg-white py-3 theme-header">
        <nav className="container">
          <div className="row align-items-center">
            <div className="col-lg-2">
              <Link href="/" className="p-1">
                <Image width={163} height={27} src="/logo.png" quality={100} alt="Logo" />
              </Link>
            </div>
            <div className="col-lg-10">
              <div className="text-end">
                <Loader size="sm" />
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <>
      <header className="site-header bg-white py-3 theme-header">
        <nav className="container">
          <div className="row align-items-center">
            <div className="col-lg-2">
              <Link href="/" className="p-1">
                <Image width={163} height={27} src="/logo.png" quality={100} alt="Logo" />
              </Link>
            </div>
            <div className="col-lg-7">
              <div className="header-navigation text-center">
                <ul className="list-unstyled list-inline mb-0 mx-auto">
                  <li className="list-inline-item dropdown">
                    <Link href={"/listing/cars"}>Cars</Link>
                  </li>
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
              <Stack direction="horizontal" gap={2} className="ms-auto">
                {session ? (
                  <>
                    <Avatar src={session.user.image} alt={session.user.name} radius="xl" size="sm" />
                    <span>{session.user.name}</span>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => setModalOpened(true)}
                    >
                      Login
                    </button>
                  </>
                )}
				<button className="btn btn-primary">Post an Ad</button>
              </Stack>
            </div>
          </div>
        </nav>
      </header>
      <AccountTypeModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </>
  );
};

export default Header;
