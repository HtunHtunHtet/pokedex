import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Container>
          <Row>
              <Col md={{ span: 8, offset: 2 }}>
                  <App />
              </Col>
          </Row>
      </Container>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
