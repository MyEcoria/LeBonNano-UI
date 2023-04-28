import { useState, useEffect } from 'react';
import { Layout, message, Card, Avatar, Button } from 'antd';
import Navigation from './components/Navigation';
import FooterComponent from './components/Footer';
import general from './config/general.json';

const { Content } = Layout;


function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [qrCodeData, setQrCodeData] = useState('');
  const [messageReceived, setMessageReceived] = useState('');
  const [addData, setaddData] = useState('');
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 64px)', // height of screen - height of navbar
  }

  useEffect(() => {
    const uuid = getCookie('uuid');
    if (uuid) {
      setIsLoggedIn(true);
    }
    const socket = new WebSocket(general["wsUrl"]);
    socket.addEventListener('open', () => {
      socket.send(JSON.stringify({ action: 'login' }));
    });
    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message.action === 'send') {
        setQrCodeData(`nano:${message.account}`);
        setaddData(message.account);
      } else if (message.action === 'add') {
        document.cookie = `uuid=${message.account}`;
        setIsLoggedIn(true);
        window.location.href = `${general["site"]}/me`;
      }
      setMessageReceived(event.data);
    });
    return () => {
      socket.close();
    };
  }, []);

  const handleLogout = () => {
    document.cookie = 'uuid=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setIsLoggedIn(false);
  };

  

  const handleCopyClick = () => {
      navigator.clipboard.writeText(addData);
      message.success("L'address a été copiée dans le presse-papier.");
    
  };

  const renderLoginForm = () => {
    return (
        <Layout className="layout">
          <Content style={{ padding: '0 50px' }}>
            <div style={containerStyle}>
              <Card
                style={{ width: 300 }}
                hoverable
                cover={<img alt="QR Code Login" src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrCodeData}`} />}
              >
                <Card.Meta title={"Merci d'envoyer > 0.000001 XNO"} />
                <br />
                <Button onClick={handleCopyClick}>Copier l'adresse</Button>
              </Card>
            </div>
          </Content>
        </Layout>
      );
  };

  const renderLoggedInMessage = () => {
    return <p>Vous êtes déjà connecté</p>;
  };

  return (
    <Layout className="layout">
      <Navigation isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Content style={{ padding: '0 50px' }}>
      
        <div className="site-layout-content">
          {isLoggedIn ? renderLoggedInMessage() : renderLoginForm()}
        </div>
      </Content>
      <FooterComponent />
    </Layout>
  );
}

function getCookie(name) {
  const cookieValue = document.cookie.match('(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
}

export default Login;
