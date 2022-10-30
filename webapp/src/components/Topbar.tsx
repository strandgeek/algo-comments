import { FC } from "react";
import { Disclosure } from "@headlessui/react";
import {
  CollectionIcon,
  LogoutIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/outline";
import classNames from "classnames";
// import { useMeQuery } from '../generated/graphql'
import { AuthButton } from "./AuthButton";
import { Account } from "../generated/graphql";
import { getShortAddress } from "../utils/getShortAddress";
import { getIdenticonSrc } from "../utils/getIdenticonSrc";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useResolvedPath,
} from "react-router-dom";
import { useApolloClient } from "@apollo/client";

export interface TopbarProps {
  noProjectLinks?: boolean;
  me?: Partial<Account>;
}

interface NavigationLink {
  name: string;
  to: string;
  current: boolean;
}

export const Topbar: FC<TopbarProps> = ({ me, noProjectLinks = false }) => {
  const params = useParams();
  const location = useLocation();
  const client = useApolloClient();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    client.resetStore();
  };
  const assetsLink = `/app/projects/${params.projectId}`;
  const configLink = `/app/projects/${params.projectId}/configuration`;
  const mintedAssetsLink = `/app/projects/${params.projectId}/minted-assets`;
  const links: NavigationLink[] = noProjectLinks
    ? []
    : [
        {
          name: "Assets",
          to: `/app/projects/${params.projectId}`,
          current: location.pathname === assetsLink,
        },
        {
          name: "Minted Assets",
          to: mintedAssetsLink,
          current: location.pathname === mintedAssetsLink,
        },
        {
          name: "Configuration",
          to: configLink,
          current: location.pathname === configLink,
        },
      ];
  const currentProject = me?.projects?.find((p) => p.id === params.projectId);
  const renderUserInfo = () => {
    const accountAddress = me?.address;
    if (accountAddress) {
      return (
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost normal-case">
            <div className="avatar">
              <div className="w-8 mr-3 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={getIdenticonSrc(accountAddress)} />
              </div>
            </div>
            {getShortAddress(accountAddress)}
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52"
          >
            {currentProject && (
              <div className="p-4 font-bold">{currentProject?.name}</div>
            )}
            <li>
              <a href="/app/projects">
                <CollectionIcon className="h-5 w-5" />
                Change Project
              </a>
            </li>
            <li>
              <button onClick={() => logout()}>
                <LogoutIcon className="h-5 w-5" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      );
    }
    return <AuthButton />;
  };
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="navbar bg-base-100 border-b border-base-300 py-4">
            <div className="navbar-start">
              <div className="flex-none">
                <Disclosure.Button className="btn btn-square btn-ghost sm:hidden">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1">
                <Link className="btn btn-ghost normal-case text-xl" to="/">
                  <img src="/algo-comments-logo.png" className="h-6" />
                </Link>
              </div>
            </div>
            {!noProjectLinks && (
              <div className="navbar-center hidden lg:flex">
                <div className="tabs tabs-boxed">
                  {links.map((link) => (
                    <Link
                      to={link.to}
                      className={classNames(
                        link.current ? "tab-active" : "",
                        "tab"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <div className="navbar-end">
              <div className="flex-none">{renderUserInfo()}</div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-base-200">
              {links.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className={classNames(
                    item.current
                      ? "bg-primary text-primary-content"
                      : "text-base hover:bg-primary hover:bg-opacity-80 hover:text-primary-content",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
