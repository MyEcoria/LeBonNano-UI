import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Layout, Menu, Card, Row, Col, Space, Typography, Avatar, Rate } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Navigation from './components/Navigation';
import Foter from './components/Footer';
import './App.css';
import general from './config/general.json';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function User() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [userData1, setUserData1] = useState([]);

  useEffect(() => {
    fetch(`${general["url"]}/user/${userId}`)
      .then(response => response.json())
      .then(data => setUserData(data))
      .catch(error => console.error(error));

    fetch(`${general["url"]}/anUser/${userId}`)
      .then(response => response.json())
      .then(data => setUserData1(data))
      .catch(error => console.error(error));
  }, [userId]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Header>
        <Navigation />
      </Header>
      <Content style={{ padding: '0 50px', marginTop: '15px' }}>
        <Card>
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
          <Title level={2}>Produits</Title>
          <Row gutter={[16, 16]}>
            {userData1.map(product => (
                <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                {product.add ? (
                    <Card
                    hoverable
                    cover={<img alt={product.name} src={`${general["url"]}/image/${product.image}`} />}
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
        <Foter />
    </Layout>
  );
}

export default User;
