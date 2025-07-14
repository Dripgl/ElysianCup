// src/components/AppSidebar.tsx
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";

// Importa tutte le icone da React Icons
import { IoHomeOutline, IoPeopleOutline, IoSettingsOutline, IoFootballOutline } from 'react-icons/io5';
import { RiExchangeDollarLine } from "react-icons/ri";
import { FaTrophy, FaRankingStar } from 'react-icons/fa6';

interface AppSidebarProps {
  onLinkClick?: () => void;
}

export function AppSidebar({ onLinkClick }: AppSidebarProps) {
  const location = useLocation();

  const navItems = [
    { name: 'Home', icon: IoHomeOutline, path: '/' },
    { name: 'Squadra', icon: IoPeopleOutline, path: '/team' },
    { name: 'Mercato', icon: RiExchangeDollarLine, path: '/market' },
    { name: 'Tornei', icon: IoFootballOutline, path: '/tournaments' },
    { name: 'Partite', icon: IoFootballOutline, path: '/matches' },
    { name: 'Classifica', icon: FaRankingStar, path: '/ranking' }, 
    { name: 'Premi', icon: FaTrophy, path: '/rewards' },
    { name: 'Account', icon: IoSettingsOutline, path: '/account' },
  ];

  return (
    <aside className="h-full flex flex-col p-4 bg-card text-card-foreground shadow-lg">
      {/* Logo e nome app */}
      <div className="mb-8 p-2 text-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-football-green to-green-700 text-transparent bg-clip-text">
          Elysian Cup
        </h2>
      </div>

      {/* Navigazione */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={onLinkClick}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg text-lg font-medium",
              "hover:bg-accent hover:text-accent-foreground",
              "transition-colors duration-200",
              location.pathname === item.path && "bg-accent text-accent-foreground"
            )}
          >
            <item.icon className="h-6 w-6" />
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}