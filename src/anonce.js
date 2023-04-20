import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout ,Card, Avatar, Button, Space, Typography } from 'antd';
import Navigation from './components/Navigation';
import Foter from './components/Footer';

const { Meta } = Card;
const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // Faire une requête pour obtenir les détails de l'article avec l'ID spécifié
    fetch(`http://localhost:8080/annonce/${id}`)
      .then(response => response.json())
      .then(data => setArticle(data))
      .catch(error => console.error(error));
  }, [id]);

  if (!article) {
    return <div>Chargement en cours...</div>;
  }

  const { image, title, description, price, add } = article;

  return (

    <Layout>
      <Header>
        <Navigation />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Title level={2}>{title}</Title>
        <Card
          cover={<img alt={title} src={`http://localhost:8080/image/${image}`} />}
          style={{ width: '50%', margin: '0 auto' }}
        >
          <Meta
            avatar={<Avatar src={`https://natricon.com/api/v1/nano?address=${add}&svc=nanolooker`} />}
            title={<Title level={2}>{title}</Title>}
            description={
              <Space direction="vertical">
                <Paragraph>{description}</Paragraph>
                <Paragraph strong>Prix : {price} Ӿ</Paragraph>
                <Button type="primary">Message</Button>
              </Space>
            }
          />
        </Card>
      </Content>
      <Foter />
    </Layout>
  );
}

export default ArticleDetail;