import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className="header">
            <div className="container header-container">
                <Link to="/" className="logo">
                    <span className="logo-primary">Pabl</span>
                    <span className="logo-secondary">egro</span>
                </Link>
            </div>
        </header>
    );
};

export default Navbar;