import { ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { footerNavigationItems } from './navigation';

export default function Footer() {
    return (
        <footer className="py-8 px-6 md:px-12 bg-white border-t border-black/5" id="footer">
            <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="flex items-center gap-3 font-headline font-extrabold text-on-surface opacity-80">
                    <ShieldCheck className="text-primary" size={28} />
                    <span className="text-sm tracking-tight">
                        &copy; 2024 Wisata Alam Bedengan. Ecological Observer System.
                    </span>
                </div>

                <div className="flex flex-wrap justify-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface-variant opacity-70">
                    {footerNavigationItems.map((link) => (
                        <Link
                            key={link.label}
                            to={link.to}
                            className="hover:text-primary transition-colors underline-offset-4 hover:underline"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
}
