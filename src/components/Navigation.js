import { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import '../css/nav.css'; 

const { Header } = Layout;

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    const uuid = getCookie('uuid');
    let boucle = false;
    if (uuid && boucle === false) {
      setIsLoggedIn(true);
        fetch(`http://localhost:8080/theUser/${uuid}`)
        .then(response => response.json())
        .then(data => setUserData(data))
        .catch(error => console.error(error));
        if (userData) {
          setIsLoggedIn(true);
          boucle = true;

        } else {
            setIsLoggedIn(false);
            boucle = true;
        }
    }
  }, [userData]);

  const handleLogout = () => {
    // Supprime le cookie uuid pour déconnecter l'utilisateur
    document.cookie = 'uuid=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setIsLoggedIn(false);
  };

  const renderLoggedInNav = () => {
    return (
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1">
          <Link to="/">Accueil</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={`/me`}>Mon profil</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to={`/new`}>New</Link>
        </Menu.Item>
        <Menu.Item key="4" onClick={handleLogout}>
          Se déconnecter
        </Menu.Item>
      </Menu>
    );
  };

  const renderLoggedOutNav = () => {
    return (
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1">
          <Link to="/">Accueil</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/login">Se connecter</Link>
        </Menu.Item>
        
      </Menu>
    );
  };

  const renderNav = () => {
    if (isLoggedIn) {
      return renderLoggedInNav();
    } else {
      return renderLoggedOutNav();
    }
  };

  return (
    <Header>
      {renderNav()}
    </Header>
  );
}

function getCookie(name) {
  const cookieValue = document.cookie.match('(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
}

export default Navigation;
