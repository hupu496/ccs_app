import {
    Home,
    ShoppingBag,
    Heart,
    User
} from "lucide-react";

function BottomNav() {

    return (

        <nav className="bottom-nav">

            <div className="nav-item active">
                <Home size={22} />
                <span>Home</span>
            </div>

            <div className="nav-item">
                <ShoppingBag size={22} />
                <span>Orders</span>
            </div>

            <div className="nav-item">
                <Heart size={22} />
                <span>Wishlist</span>
            </div>

            <div className="nav-item">
                <User size={22} />
                <span>Profile</span>
            </div>

        </nav>

    );
}

export default BottomNav;