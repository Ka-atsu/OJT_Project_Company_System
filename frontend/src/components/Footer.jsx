export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-links">
          <small className="site-footer-copy">
            © {new Date().getFullYear()} The Company · All rights reserved
          </small>
        </div>
      </div>
    </footer>
  );
}
