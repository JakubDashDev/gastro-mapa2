import { Fragment } from "react";
import useWindowDimensions from "../../hooks/useWindoDimensions";
import { useTransition, animated, useSpring } from "@react-spring/web";
import { FaTimes, FaSignInAlt } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { FaBuilding, FaUsers, FaChartLine, FaGear } from "react-icons/fa6";
import { Link, NavLink, NavLinkProps } from "react-router-dom";
import { useLogoutMutation } from "../../services/authApi";
import { useAppDispatch } from "../../redux/store";
import { removeAuth } from "../../redux/authSlice";

type SideBarProps = {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

function SideBar({ showSidebar, setShowSidebar }: SideBarProps) {
  const dispatch = useAppDispatch();
  const [logout, { isLoading, error }] = useLogoutMutation();

  const handleLogout = () => {
    logout(null)
      .unwrap()
      .then(() => dispatch(removeAuth()))
      .catch((err) => alert(err));
  };

  return (
    <Container showSidebar={showSidebar} setShowSidebar={setShowSidebar}>
      <div className="relative h-full flex flex-col bg-[#343d4c] text-white/90">
        <div className="flex items-center justify-center h-20 border-b border-white/50 ">
          <span className="text-sm text-white uppercase font-bold">Muala dashboard</span>
          <button
            type="button"
            className="block lg:hidden text-white/80 text-xl absolute top-2 right-2"
            onClick={() => setShowSidebar((current) => !current)}
          >
            <FaTimes />
          </button>
        </div>

        <nav className="flex-1 flex flex-col gap-4 px-2 py-3">
          <ActiveLink to="/dashboard" end>
            <MdSpaceDashboard className="text-xl" />
            <span>Panel</span>
          </ActiveLink>
          <ActiveLink to="/dashboard/restaurants">
            <FaBuilding className="text-xl" />
            <span>Restaruacje</span>
          </ActiveLink>
          <ActiveLink to="/dashboard/users">
            <FaUsers className="text-xl" />
            <span>Użytkownicy</span>
          </ActiveLink>
          <ActiveLink to="/dashboard/stats">
            <FaChartLine className="text-xl" />
            <span>Statystyki</span>
          </ActiveLink>
          <span className="mt-4 px-4 text-white/70 font-bold uppercase text-sm ">Konto</span>
          <ActiveLink to="/dashboard/account">
            <FaGear className="text-xl" />
            <span>Ustawienia</span>
          </ActiveLink>
          <button
            className="w-full flex items-center gap-2 py-3 px-2 rounded-lg hover:bg-white/10 transition-colors text-red-500"
            onClick={handleLogout}
          >
            <FaSignInAlt className="text-xl" />
            <span>Wyloguj się</span>
          </button>
          <Link
            to="/"
            className="mt-auto border border-secondary-600 text-secondary-600 rounded-lg w-full py-3 text-center"
          >
            Powrót do aplikacji
          </Link>
        </nav>
      </div>
    </Container>
  );
}

export default SideBar;

type ContainerProps = SideBarProps & {
  children: React.ReactNode;
};

function Container({ showSidebar, setShowSidebar, children }: ContainerProps) {
  const { width } = useWindowDimensions();

  const transition = useTransition(showSidebar, {
    from: { transform: "translateX(-100%)" },
    enter: { transform: "translateX(0%)" },
    leave: { transform: "translateX(-100%)" },
  });

  const backdropAnimation = useSpring({
    opacity: showSidebar ? 1 : 0,
  });

  if (width < 1024)
    return transition(
      (styles, item) =>
        item && (
          <Fragment>
            <animated.aside style={styles} className="fixed left-0  h-screen w-full max-w-64 z-20">
              {children}
            </animated.aside>
            <animated.div
              style={backdropAnimation}
              className="absolute left-0 top-0 w-screen h-screen bg-black/20"
              onClick={() => setShowSidebar(false)}
            />
          </Fragment>
        )
    );

  return <aside className="h-screen w-full max-w-80">{children}</aside>;
}

type ActiveLinkProps = NavLinkProps & {
  children: React.ReactNode;
};
function ActiveLink({ to, children, end }: ActiveLinkProps) {
  return (
    <NavLink
      end={end}
      to={to}
      className={({ isActive }) =>
        `w-full flex items-center gap-2 py-4 px-5 rounded-lg ${
          isActive ? "bg-[#1c2129] text-white" : "hover:bg-white/10 transition-colors"
        }`
      }
    >
      {children}
    </NavLink>
  );
}
