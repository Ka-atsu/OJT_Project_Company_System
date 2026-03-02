import { useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import ReCAPTCHA from "react-google-recaptcha";
import "./contact.css";
import { RECAPTCHA_SITE_KEY } from "../../../api/publicApiKey";
import useContactForm from "./useContactForm";
import { FAQS } from "./faqData";

export default function Contact() {
  const formSectionRef = useRef(null);

  const {
    form,
    errors,
    status,
    loading,
    captchaRef,
    setCaptcha,
    handleChange,
    handleSubmit,
  } = useContactForm();

  return (
    <div className="contact-page p-0">
      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-hero-inner">
          <div className="contact-hero-grid">
            <div>
              <div className="contact-kicker">
                <span className="dot" />
                Contact
              </div>

              <h1 className="contact-title">We’d love to hear from you!</h1>

              <p className="contact-lede">
                Have any questions or requests? Reach out to us, and we'll get
                back to you within 24–48 hours.
              </p>

              <div className="contact-hero-actions">
                <Button
                  variant="light"
                  onClick={() =>
                    formSectionRef.current?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                >
                  Send a Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section
        ref={formSectionRef}
        className="contact-section"
        id="contact-form"
      >
        <div className="contact-surface">
          <h2 className="contact-section-title">Send us a message</h2>
          <p className="contact-section-sub">
            Fill out the form below, and we will get back to you as soon as
            possible.
          </p>

          <div className="contact-form-wrap">
            {/* FORM */}
            <div className="contact-form-box">
              <div className="contact-form-head">
                <p className="title">Contact us</p>
                <div className="sub">General inquiries and requests.</div>
              </div>

              {status.msg && <Alert variant={status.type}>{status.msg}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  {/* Name */}
                  <Col xs={12} md={6}>
                    <Form.Group>
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
                  </Col>

                  {/* Email */}
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
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
                  </Col>

                  {/* Subject */}
                  <Col xs={12}>
                    <Form.Group>
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
                  </Col>

                  {/* Message */}
                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us what you need…"
                        isInvalid={!!errors.message}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  {/* ReCAPTCHA */}
                  <Col xs={12}>
                    <Form.Group>
                      <ReCAPTCHA
                        ref={captchaRef}
                        sitekey={RECAPTCHA_SITE_KEY}
                        onChange={setCaptcha}
                      />
                      {errors.captcha && (
                        <div className="text-danger mt-1 small">
                          {errors.captcha}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <div className="contact-form-actions">
                  <Button type="submit" variant="dark" disabled={loading}>
                    {loading ? "Sending..." : "Submit"}
                  </Button>
                </div>
              </Form>
            </div>

            {/* FAQ SECTION */}
            <div className="contact-faq">
              <h2 className="contact-section-title">
                Frequently asked questions
              </h2>
              <p className="contact-section-sub">
                Quick answers to common questions.
              </p>

              <Accordion defaultActiveKey="0">
                {FAQS.map((item, idx) => (
                  <Accordion.Item eventKey={String(idx)} key={item.q}>
                    <Accordion.Header>{item.q}</Accordion.Header>
                    <Accordion.Body>{item.a}</Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
