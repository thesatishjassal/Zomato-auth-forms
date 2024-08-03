import "rsuite/dist/rsuite.min.css";
import SignUpForm from "../components/SignUpForm";
import SignInForm from "../components/SingInForm";
import { Container, Content } from "rsuite";
import { Grid, Row, HStack, Col } from "rsuite";
import "./Swiggy-theme.css";

function Swiggy() {
  return (
    <Container>
      <Content>
        <HStack
          alignItems="center"
          justifyContent="center"
          style={{ height: "100vh" }}
        >
          <Row className="show-grid">
            <Col xl={12}>
              <SignInForm />
            </Col>
            <Col xl={12}>
              <SignUpForm />
            </Col>
          </Row>
        </HStack>
      </Content>
    </Container>
  );
}

export default Swiggy;
