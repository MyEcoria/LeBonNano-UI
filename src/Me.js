import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Layout, Card, Row, Col, Avatar, Rate, Typography, Form, Select, Space, Button, Input, Drawer, message } from "antd";
import Navigation from './components/Navigation';
import FooterComponent from './components/Footer';
import { ShoppingCartOutlined, EditOutlined } from '@ant-design/icons';


const { Option } = Select;
const { Title } = Typography;

const { Header, Content } = Layout;

function NewMe() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userData1, setUserData1] = useState([]);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const uuid = document.cookie.match('(^|[^;]+)\\s*uuid\\s*=\\s*([^;]+)')?.pop();
    if (!uuid) {
      setIsLoggedIn(true);
    } else {
      fetch(`http://localhost:8080/theUser/${uuid}`)
        .then(response => response.json())
        .then(data => setUserData(data))
        .catch(error => console.error(error));

      fetch(`http://localhost:8080/anUuid/${uuid}`)
        .then(response => response.json())
        .then(data => setUserData1(data))
        .catch(error => console.error(error));
    }
  }, []);

  const [uuid, setUuid] = useState('');
  const [newName, setNewName] = useState('');

  const handleGetRequest = () => {
    const uuid1 = getCookie('uuid');
    fetch(`http://localhost:8080/change/${uuid1}/${newName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Do something with the response data
        message.success('Votre nom a été changé avec succès');
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        message.error('Une erreur est survenue');
      });
      onClose();
  };

  const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  };

  const renderLoginForm = () => {
    if (!userData) {
      return <div>Loading...</div>;
    }
    return (
      <Layout>
        <Header>
            <Navigation />
        </Header>
        <Content style={{ padding: '0 50px', marginTop: '15px' }}>
          <Card
          
          actions={[
            <EditOutlined key="edit" onClick={showDrawer} />
          ]}

          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <Avatar size={200} src={`https://natricon.com/api/v1/nano?address=${userData.address}&svc=nanolooker`} />
              </Col>
              <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                <Card.Meta title={userData.name} />
                <p style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>Adresse: {userData.address}</p>
                <p style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>Nom: {userData.name}</p>
                <Rate defaultValue={userData.score} disabled/>
              </Col>
            </Row>
          </Card>
          <Content style={{ padding: '0 50px' }}>
            <Title level={1}>Mes annonces</Title>
            <Row gutter={[16, 16]}>
            {userData1.map(product => (
                <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                {product.add ? (
                    <Card
                    hoverable
                    cover={<img alt={product.name} src={`http://localhost:8080/image/${product.image}`} />}
                    actions={[<Link to={`/article/${product.id}`}>Voir plus</Link>]}
                    >
                    <Card.Meta
                        avatar={
                        <Link to={`/user/${product.add}`}>
                            <Avatar size={50} src={`https://natricon.com/api/v1/nano?address=${product.add}&svc=nanolooker`} />
                        </Link>
                        }
                        title={product.name}
                        description={`Prix : ${product.price} Ӿ`}
                    />
                    </Card>
                ) : (
                    <Link to={`/user/${product.uuid}`}>
                    <Avatar size={64} src={`https://natricon.com/api/v1/nano?address=${product.address}&svc=nanolooker`} />
                    </Link>
                )}
                </Col>
            ))}
            </Row>
          </Content>
          
        </Content>
        <Drawer
        title="Your profile"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleGetRequest} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="New name"
                rules={[{ required: true, message: 'Please enter user name' }]}
                onChange={(e) => setNewName(e.target.value)}
                value={newName}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            
          </Row>
          
        </Form>
      </Drawer>
        <FooterComponent />
      </Layout>
    );
  };

  const renderLoggedInMessage = () => {
    return <p>Not Login</p>;
  };

  return (
    <Layout className="layout">
      <Content>
      
        <div className="site-layout-content">
          {isLoggedIn ? renderLoggedInMessage() : renderLoginForm()}
        </div>
      </Content>
    </Layout>
  );
}

export default NewMe;