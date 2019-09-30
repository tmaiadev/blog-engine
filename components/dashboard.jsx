import React, { useState, useEffect } from 'react';
import PropTypes from 'proptypes';
import Link from 'next/link';
import { getLoggedInUser } from '../libs/auth';
import App from './app';
import FocusTrap from './focustrap';

function Dashboard({ user, children }) {
  const [expandedMenu, setExpandedMenu] = useState(false);
  const [tabNavigation, setTabNavigation] = useState(false);

  function toggleMenu() {
    const value = !expandedMenu;
    setExpandedMenu(value);

    requestAnimationFrame(() => {
      if (value) {
        document.getElementById('menu').focus();
      } else {
        document.getElementById('menu-button').focus();
      }
    });
  }

  function focusOnMenu() {
    document.getElementById('menu').focus();
  }

  function closeMenuOnEscape({ key }) {
    if (!expandedMenu || key !== 'Escape') return;
    toggleMenu();
  }

  function onTabNavigation({ key }) {
    if (key !== 'Tab') return;
    setTabNavigation(true);
  }

  function onDefaultNavigation() {
    if (tabNavigation === false) return;
    setTabNavigation(false);
  }

  useEffect(() => {
    if (!user) window.location.href = '/admin/login';
  }, [user]);

  useEffect(() => {
    document.addEventListener('keydown', closeMenuOnEscape);
    document.addEventListener('keydown', onTabNavigation);
    document.addEventListener('mousemove', onDefaultNavigation);
    document.addEventListener('touchmove', onDefaultNavigation);
    return () => {
      document.removeEventListener('keydown', closeMenuOnEscape);
      document.removeEventListener('keydown', onTabNavigation);
      document.removeEventListener('mousemove', onDefaultNavigation);
      document.removeEventListener('touchmove', onDefaultNavigation);
    };
  }, []);

  return (
    <App>
      <div className={`dashboard ${tabNavigation ? '' : 'dashboard--no-tab'}`}>
        <header className="header">
          <button
            className="menu-button"
            onClick={toggleMenu}
            aria-label="Menu"
            id="menu-button"
          >
            <img
              src="/static/icons/menu.svg"
              aria-hidden
              alt="Menu"
              className="menu-button__icon"
            />
          </button>
          <h1 className="header__title">Dashboard</h1>
        </header>
        <div className="dashboard__content">
          <FocusTrap onFocus={focusOnMenu} />
          <aside
            className={`menu ${expandedMenu ? 'menu--open' : ''}`}
            tabIndex={expandedMenu ? '0' : '0'}
            id="menu"
          >
            <div className="menu__content">
              <h2 className="menu__title">Menu</h2>
              <nav className="menu__nav">
                <Link href="/admin">
                  <a>Posts</a>
                </Link>
                <Link href="/admin/bio">
                  <a>Bio</a>
                </Link>
                <Link href="/admin/settings">
                  <a>Settings</a>
                </Link>
                <Link href="/admin/signout">
                  <a>Sign Out</a>
                </Link>
              </nav>
            </div>
            <button
              className="menu-button menu-button--close"
              aria-label="Close Menu"
              onClick={toggleMenu}
            >
              <img
                src="/static/icons/close.svg"
                alt="Close"
                aria-hidden
                className="menu-button__icon"
              />
            </button>
            <FocusTrap onFocus={focusOnMenu} />
          </aside>
          <main>
            {children}
          </main>
        </div>
        <style jsx>
          {`
            .dashboard {
              display: grid;
              grid-template-rows: min-content auto;
              position: absolute;
              top: 0px;
              left: 0px;
              width: 100%;
              height: 100%;
              font-family: Arial;
            }

            .dashboard *:focus {
              outline: dashed 3px var(--accent-color);
            }

            .dashboard.dashboard--no-tab *:focus {
              outline: none;
            }

            .header {
              display: flex;
              align-items: center;
              border-bottom: solid thin #CCC;
              padding: 8px;
              height: 40px;
              box-sizing: border-box;
              color: #FFF;
              background-color: var(--primary-color);
            }

            .header__title {
              margin: 0px;
              padding: 0px;
              font-size: 18px;
            }

            .menu {
              display: none;
              position: absolute;
              width: 100%;
              max-width: 240px;
              height: 100%;
              top: 0px;
              left: 0px;
              background-color: #FFF;
              box-shadow: 0px 3px 4px rgba(0, 0, 0, .3);
            }

            @media (min-width: 768px) {
              .menu {
                display: block;
                position: relative;
                box-shadow: none;
                border-right: solid thin #CCC;
              }
            }

            .menu.menu--open {
              display: block;
            }

            .menu__content {
              box-sizing: border-box;
            }

            .menu__title {
              margin: 0px;
              padding: 16px;
            }

            .menu__nav {
              display: flex;
              flex-direction: column;
            }

            .menu__nav > a {
              display: block;
              color: var(--primary-color);
              padding: 16px;
              text-decoration: none;
              border-bottom: solid thin #CCC;
            }

            .menu__nav > a:first-child {
              border-top: solid thin #CCC;
            }

            .menu__nav > a:hover,
            .menu__nav > a:focus {
              background-color: rgba(0, 0, 0, .1);
            }

            .menu-button {
              margin: 0px;
              padding: 0px;
              border: 0px;
              background-color: transparent;
              cursor: pointer;
              margin-right: 8px;
            }

            @media (min-width: 768px) {
              .menu-button {
                display: none;
              }
            }

            .menu-button__icon {
              width: 24px;
              height: 24px;
            }

            .menu-button--close {
              position: absolute;
              top: 16px;
              right: 16px;
            }
          `}
        </style>
      </div>
    </App>
  );
}

Dashboard.getInitialProps = getLoggedInUser;

Dashboard.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.string,
};

Dashboard.defaultProps = {
  user: '',
};

export default Dashboard;
