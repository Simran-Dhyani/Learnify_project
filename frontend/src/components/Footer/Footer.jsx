import Container from "../container/Container";

function Footer() {
  return (
    <footer className="bg-black text-gray-400 ">
      <Container>
        <div className="py-12 text-center space-y-3">
          <h2 className="text-4xl font-semibold text-white tracking-wide">Learnify</h2>
          <p className="text-lg tracking-widest">
            Learn smarter. Build faster.
          </p>
          <p className="text-xs text-gray-600">
            © 2026 Learnify. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;