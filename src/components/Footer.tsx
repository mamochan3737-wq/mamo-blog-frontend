const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-12 py-8">
      <div className="container mx-auto px-4 text-center text-gray-500">
        <div className="flex justify-center space-x-6 mb-4">
          {/* TODO: Add real SNS links */}
          <a href="#" className="hover:text-gray-800 transition-colors">Twitter</a>
          <a href="#" className="hover:text-gray-800 transition-colors">GitHub</a>
          <a href="#" className="hover:text-gray-800 transition-colors">YouTube</a>
        </div>
        <p>&copy; {new Date().getFullYear()} mamo-blog. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
