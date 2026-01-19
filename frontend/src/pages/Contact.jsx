import { useState, useRef } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PageShell from "../components/layouts/PageShell";
import ReCAPTCHA from "react-google-recaptcha";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const captchaRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Enter a valid email.";
    if (!form.subject.trim()) e.subject = "Subject is required.";
    if (!form.message.trim()) e.message = "Message is required.";
    if (!captcha) e.captcha = "Please verify that you are not a robot.";
    return e;
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setStatus({ type: "", msg: "" });

    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setLoading(true);
    try {
      // Fake submit (replace with API later)
      await new Promise((r) => setTimeout(r, 800));

      setStatus({ type: "success", msg: "Message sent successfully!" });
      setForm({ name: "", email: "", subject: "", message: "" });
      setCaptcha(null);
      captchaRef.current.reset();

    } catch {
      setStatus({ type: "danger", msg: "Something went wrong. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell className="py-4">
      <div className="mb-3">
        <h1 className="fw-bold mb-1">Contact</h1>
        <p className="text-muted mb-0">
          Send us a message and we’ll get back to you.
        </p>
      </div>

      {status.msg && <Alert variant={status.type}>{status.msg}</Alert>}

      <Row className="g-4">
        <Col xs={12} lg={7}>
          <Card>
            <Card.Body>
              <h5 className="fw-bold mb-3">Contact Form</h5>

              <Form onSubmit={handleSubmit}>
                {/* Name */}
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Subject */}
                <Form.Group className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Enter your subject"
                    isInvalid={!!errors.subject}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.subject}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Message */}
                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your message..."
                    isInvalid={!!errors.message}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* CAPTCHA */}
                <Form.Group className="mb-3">
                  <ReCAPTCHA
                    ref={captchaRef}
                    sitekey="6Lcw_04sAAAAAOz84QKlQUGSzIJZgasCu5wpy8e6"
                    onChange={(value) => setCaptcha(value)}
                  />
                  {errors.captcha && (
                    <div className="text-danger mt-1">
                      {errors.captcha}
                    </div>
                  )}
                </Form.Group>

                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Company Info */}
        <Col xs={12} lg={5}>
          <Card>
            <Card.Body>
              <h5 className="fw-bold mb-3">Company Info</h5>
              <p className="mb-2">
                <strong>Email:</strong> yourcompany@email.com
              </p>
              <p className="mb-2">
                <strong>Phone:</strong> +63 9XX XXX XXXX
              </p>
              <p className="mb-0">
                <strong>Location:</strong> Your City, Philippines
              </p>

              <hr />

              <p className="mb-0 text-muted">
                (You can update these details later from the admin dashboard.)
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </PageShell>
  );
}
