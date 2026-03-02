import { useRef, useState } from "react";
import api, {csrf} from "../../../api/api";

export default function useContactForm() {
  const captchaRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    location: "",
    subject: "",
    message: "",
  });

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
      // Get CSRF cookie (required for Sanctum)
      await csrf();

      // Send request to Laravel
      const { data } = await api.post("/api/contact", {
        ...form,
        captcha: captcha,
      });

      setStatus({ type: "success", msg: data.message });

      setForm({
        name: "",
        email: "",
        location: "",
        subject: "",
        message: "",
      });

      setCaptcha(null);
      captchaRef.current?.reset?.();
    } catch (error) {
      setStatus({
        type: "danger",
        msg:
          error.response?.data?.message || "Something went wrong. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    errors,
    status,
    loading,
    captchaRef,
    setCaptcha,
    handleChange,
    handleSubmit,
  };
}
