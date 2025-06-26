// src/components/AppSidebar.tsx
import { Home, Users, Trophy, UserCog, Calendar, Settings, TrendingUp } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "La Mia Squadra",
    url: "/team",
    icon: Users,
  },
  {
    title: "Leghe",
    url: "/leagues",
    icon: Trophy,
  },
  {
    title: "Mercato",
    url: "/market",
    icon: TrendingUp,
  },
  {
    title: "Calendario",
    url: "/calendar",
    icon: Calendar,
  },
];

const adminItems = [
  {
    title: "Gestione Utenti",
    url: "/admin/users",
    icon: UserCog,
  },
  {
    title: "Gestione Leghe",
    url: "/admin/leagues",
    icon: Trophy,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const isAdmin = true; // Placeholder per controllo admin, lo renderai dinamico in futuro

  return (
    <Sidebar className="border-r-2 border-football-green/20">
      <SidebarHeader className="border-b border-football-green/20 p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-football rounded-full flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-football-green">Elysian Cup</h1>
            <p className="text-sm text-muted-foreground">Pro League</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-football-green font-semibold">
            Menu Principale
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    // Utilizza la prop 'variant' per gestire lo stato attivo/inattivo
                    // Esempio: variant={location.pathname === item.url ? "active" : "default"}
                    // Le classi custom rimangono come override o aggiunta
                    className={`hover:bg-football-green/10 hover:text-football-green transition-all duration-200 ${
                      location.pathname === item.url ? 'bg-football-green/20 text-football-green font-medium' : ''
                    }`}
                  >
                    <Link to={item.url}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-football-gold font-semibold">
              Area Admin
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`hover:bg-football-gold/10 hover:text-football-gold transition-all duration-200 ${
                        location.pathname === item.url ? 'bg-football-gold/20 text-football-gold font-medium' : ''
                      }`}
                    >
                      <Link to={item.url}>
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-football-green/20 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="hover:bg-football-green/10">
              <Link to="/settings">
                <Settings className="w-5 h-5" />
                <span>Impostazioni</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}