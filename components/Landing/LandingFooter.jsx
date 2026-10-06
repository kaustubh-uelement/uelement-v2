'use client';
import Link from 'next/link';

const LandingFooter = () => {
  return (
    <footer className="bg-primary-blue text-gray-400 font-sans px-6 pt-20 pb-10 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Logo & Info */}
          <div className="md:col-span-1">
            <h2 className="text-white text-2xl font-bold mb-4 tracking-tight">UElement</h2>
            <p className="text-sm mb-6 max-w-xs">Engineering Tomorrow's Infrastructure</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors"><span className="sr-only">LinkedIn</span>in</a>
              <a href="#" className="hover:text-white transition-colors"><span className="sr-only">Twitter</span>tw</a>
              <a href="#" className="hover:text-white transition-colors"><span className="sr-only">Email</span>mail</a>
            </div>
          </div>
          
          {/* Solutions */}
          <div className="md:col-span-1">
            <h3 className="text-gray-500 text-xs font-semibold tracking-widest uppercase mb-6">Solutions</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/quantum-security" className="hover:text-white transition-colors">Quantum Security</Link></li>
              <li><Link href="/deeptech" className="hover:text-white transition-colors">DeepTech</Link></li>
              <li><Link href="/edge-ai" className="hover:text-white transition-colors">Edge AI</Link></li>
              <li><Link href="/product-engineering" className="hover:text-white transition-colors">Product Engineering</Link></li>
            </ul>
          </div>
          
          {/* Company */}
          <div className="md:col-span-1">
            <h3 className="text-gray-500 text-xs font-semibold tracking-widest uppercase mb-6">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/press" className="hover:text-white transition-colors">Press</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Connect */}
          <div className="md:col-span-1">
            <h3 className="text-gray-500 text-xs font-semibold tracking-widest uppercase mb-6">Connect</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="mailto:contact@uelement.co" className="hover:text-white transition-colors">contact@uelement.co</a></li>
              <li>+91 762 069 0561</li>
              <li className="leading-relaxed">UElement Technologies Pvt. Ltd.<br/>9th Floor, Pride Gateway,<br/>Sr. No. 112, Baner, Pune.</li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; 2025 UElement Technologies. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
