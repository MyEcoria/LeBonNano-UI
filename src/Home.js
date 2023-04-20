import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Card, Row, Col, Space, Typography, Avatar } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Navigation from './components/Navigation';
import { Footer } from 'antd/es/layout/layout';
import Foter from './components/Footer';
import general from './config/general.json';

const { Header, Content } = Layout;
const { Title } = Typography;

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${general["url"]}/home`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <Layout>
      <Header>
        <Navigation />
      </Header>
      <Content style={{ padding: '0 50px', height: '100%', overflow: 'auto' }}>
        <Title level={2}>Produits</Title>
        <Row gutter={[16, 16]}>
          {data.map(product => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
              {product.add ? (
                <Card
                  hoverable
                  cover={<img alt={product.name} src={`${general["url"]}/image/${product.image}`} />}
                  actions={[<Link to={`/article/${product.id}`}>Voir plus</Link>, <ShoppingCartOutlined />]}
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
      <Footer>
        <Foter />
      </Footer>
    </Layout>
  );
}

export default Home;
