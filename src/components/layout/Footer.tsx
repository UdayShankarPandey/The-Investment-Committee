const footerLinks = [
  { label: 'Product', href: '#product-showcase' },
  { label: 'How it works', href: '#committee-pipeline' },
  { label: 'The committee', href: '#committee-intro' },
  { label: 'Convene', href: '#convene' },
]

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <a href="#main-content" aria-label="The Investment Committee home">
            <span>The</span>
            <strong>Investment Committee</strong>
          </a>
        </div>
        
        <nav className="site-footer__nav" aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>
        
        <div className="site-footer__legal">
          <p>&copy; {new Date().getFullYear()} The Investment Committee.</p>
          <p>Illustrative concept. Not a financial service.</p>
        </div>
      </div>
    </footer>
  )
}
