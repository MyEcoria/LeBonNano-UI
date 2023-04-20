import React, { useState, useEffect } from "react";
import { Form, Input, Button, Upload, message, Layout, Card, Row, Col, Avatar, Rate } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Navigation from './components/Navigation';
import FooterComponent from './components/Footer';

const { Header, Content, Footer } = Layout;

const { TextArea } = Input;

function getCookie(name) {
    const cookieValue = document.cookie.match('(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}

function NewItemForm() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [image, setImage] = useState(null);
  const [form] = Form.useForm();

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 64px)', // height of screen - height of navbar
  }

  useEffect(() => {
    const uuid = getCookie('uuid');
    if (!uuid) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    document.cookie = 'uuid=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setIsLoggedIn(false);
  };

  const handleImageChange = (info) => {
    if (info.file.type !== "image/jpeg" && info.file.type !== "image/png") {
      message.error("Le fichier doit être une image au format JPEG ou PNG");
      return;
    }
    setImage(info.file);
  };

  const onFinish = async (values) => {
    const uuid1 = getCookie('uuid');
    // Convertir le champ "prix" en nombre
    values.price = Number(values.price);

    // Créer un objet FormData pour envoyer les données
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("uuid", uuid1);

    try {
      const response = await fetch("http://localhost:8080/new", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("Success:", data);
      message.success("Votre article a été ajouté avec succès");
      renderLoggedInMessage();
    } catch (error) {
      console.error("Error:", error);
      message.error("Une erreur est survenue");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const renderLoginForm = () => {
    return (
        <Layout>
          <Header>
            <Navigation />
          </Header>
          <Content style={{ padding: '0 50px', marginTop: '15px' }}>
            <Card>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                >
                <Form.Item label="Image">
                    <Upload
                    name="image"
                    accept=".jpg,.png"
                    listType="picture"
                    maxCount={1}
                    beforeUpload={() => false}
                    onChange={handleImageChange}
                    >
                    <Button icon={<UploadOutlined />}>Sélectionner une image</Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="Nom"
                    name="name"
                    rules={[{ required: true, message: "Ce champ est requis" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: "Ce champ est requis" }]}
                >
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    label="Prix"
                    name="price"
                    rules={[{ required: true, message: "Ce champ est requis" }]}
                >
                    <Input type="number" min={0} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                    Enregistrer
                    </Button>
                </Form.Item>
                </Form>
            </Card>
            
          </Content>
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

export default NewItemForm;
