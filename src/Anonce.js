import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Avatar, Button, Space, Typography } from 'antd';

const { Meta } = Card;
const { Title, Paragraph } = Typography;

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // Faire une requête pour obtenir les détails de l'article avec l'ID spécifié
    fetch(`http://localhost:8080/articles/${id}`)
      .then(response => response.json())
      .then(data => setArticle(data))
      .catch(error => console.error(error));
  }, [id]);

  if (!article) {
    return <div>Chargement en cours...</div>;
  }

  const { image, title, description, price } = article;

  return (
    <div>
      <Card
        cover={<img alt={title} src={`http://localhost:8080/image/${image}`} />}
        style={{ width: '50%', margin: '0 auto' }}
      >
        <Meta
          avatar={<Avatar src={`https://natricon.com/api/v1/nano?address=${title}&svc=nanolooker`} />}
          title={<Title level={2}>{title}</Title>}
          description={
            <Space direction="vertical">
              <Paragraph>{description}</Paragraph>
              <Paragraph strong>Prix : {price} €</Paragraph>
              <Button type="primary">Message</Button>
            </Space>
          }
        />
      </Card>
    </div>
  );
}

export default ArticleDetail;