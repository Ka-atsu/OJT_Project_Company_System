import { useState, useRef } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PageShell from "../components/layouts/PageShell";
import ReCAPTCHA from "react-google-recaptcha";
import "../css/contact.css";

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
      await new Promise((r) => setTimeout(r, 800));
      setStatus({ type: "success", msg: "Message sent successfully!" });
      setForm({ name: "", email: "", subject: "", message: "" });
      setCaptcha(null);
      captchaRef.current?.reset?.();
    } catch {
      setStatus({ type: "danger", msg: "Something went wrong. Try again." });
    } finally {
      setLoading(false);
    }
  };

  const scrollToForm = () => {
    document
      .getElementById("contact-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <PageShell className="contact-page p-0">
      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-hero-inner">
          <h1>Contact Us</h1>
          <Button variant="dark" size="sm" onClick={scrollToForm}>
            Send a Message
          </Button>
        </div>
      </section>

      {/* WAYS */}
      <section className="contact-ways">
        <div className="contact-ways-inner">
          <h2>Ways to Contact us</h2>

          <Row className="g-4 justify-content-center">
            <Col xs={12} md={4} lg={3}>
              <Card className="contact-way h-100 text-center">
                <Card.Body>
                  <div className="contact-way-icon" aria-hidden="true">
                    📍
                  </div>
                  <div className="fw-semibold mt-2">Location</div>
                  <div className="text-muted small mt-2">
                    Insert address here <br />
                    Mon–Fri 8:00 AM – 6:00 PM
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={4} lg={3}>
              <Card className="contact-way h-100 text-center">
                <Card.Body>
                  <div className="contact-way-icon" aria-hidden="true">
                    📞
                  </div>
                  <div className="fw-semibold mt-2">Phone Number</div>
                  <div className="text-muted small mt-2">0900000000</div>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={4} lg={3}>
              <Card className="contact-way h-100 text-center">
                <Card.Body>
                  <div className="contact-way-icon" aria-hidden="true">
                    ✉️
                  </div>
                  <div className="fw-semibold mt-2">Email</div>
                  <div className="text-muted small mt-2">
                    something@gmail.com
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <p className="contact-ways-note">
            Our company services staff is waiting to assist you! <br />
            Reach us through any of the channels above.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section id="contact-form" className="contact-form-section">
        <div className="contact-form-inner">
          <div className="contact-form-box">
            <div className="contact-form-head">
              <div className="title">Contact us!</div>
              <div className="sub">You can send general enquiries here!</div>
            </div>

            {status.msg && <Alert variant={status.type}>{status.msg}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Jimmy Sales"
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="e.g. jimmy.sales@gmail.com"
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  isInvalid={!!errors.subject}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.subject}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Message"
                  isInvalid={!!errors.message}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <ReCAPTCHA
                  ref={captchaRef}
                  sitekey="6Lcw_04sAAAAAOz84QKlQUGSzIJZgasCu5wpy8e6"
                  onChange={(value) => setCaptcha(value)}
                />
                {errors.captcha && (
                  <div className="text-danger mt-1 small">{errors.captcha}</div>
                )}
              </Form.Group>

              <div className="contact-form-actions">
                <Button type="submit" variant="dark" disabled={loading}>
                  {loading ? "Sending..." : "Submit"}
                </Button>

                <div className="hint">
                  We typically respond within 24–48 hours.
                </div>
              </div>
            </Form>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
