import React from 'react';
import { Layout, Row, Col } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';

const { Footer } = Layout;

function MyFooter() {
  return (
    <Footer style={{ textAlign: 'center' }}>
      <Row justify="center">
        <Col>
          <a href="https://www.facebook.com/"><FacebookOutlined style={{ fontSize: 24, color: '#3b5998', marginRight: 16 }} /></a>
          <a href="https://twitter.com/"><TwitterOutlined style={{ fontSize: 24, color: '#00acee', marginRight: 16 }} /></a>
          <a href="https://www.instagram.com/"><InstagramOutlined style={{ fontSize: 24, color: '#c13584' }} /></a>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: 16 }}>
        <Col>
          LeBonNano ©2023 Created by MyEcoria
        </Col>
      </Row>
    </Footer>
  );
}

export default MyFooter;
