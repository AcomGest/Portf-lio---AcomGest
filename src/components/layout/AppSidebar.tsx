import { useState } from "react";
import { BarChart3, Calendar, FileText, Image, Plus, Settings, Stethoscope, Users } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
const mainItems = [{
  title: "Dashboard",
  url: "/",
  icon: BarChart3
}, {
  title: "Animais",
  url: "/animais",
  icon: Users
}, {
  title: "Ultrassom",
  url: "/ultrassom",
  icon: Image
}, {
  title: "Cronograma",
  url: "/cronograma",
  icon: Calendar
}, {
  title: "Relatórios",
  url: "/relatorios",
  icon: FileText
}];
const quickActions = [{
  title: "Novo Animal",
  url: "/animais/novo",
  icon: Plus
}, {
  title: "Novo Exame",
  url: "/ultrassom/novo",
  icon: Stethoscope
}];
export function AppSidebar() {
  const {
    state
  } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";
  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({
    isActive
  }: {
    isActive: boolean;
  }) => `flex items-center w-full px-3 py-2 rounded-xl medical-transition ${isActive ? "bg-primary text-primary-foreground font-medium veterinary-shadow" : "hover:bg-accent text-foreground hover:text-accent-foreground"}`;
  return <Sidebar className={`${isCollapsed ? "w-16" : "w-64"} border-r border-border bg-card`} collapsible="icon">
      <SidebarContent className="p-4">
        {/* Logo */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            
            {!isCollapsed && <div>
                <h1 className="text-xl font-bold text-primary">AcomGest</h1>
                <p className="text-xs text-muted-foreground">Gestão Veterinária</p>
              </div>}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Navegação Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 bg-[#006d5b]/0">
              {mainItems.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="w-5 h-5" />
                      {!isCollapsed && <span className="ml-3 text-[t212121] text-neutral-800">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions */}
        {!isCollapsed && <SidebarGroup className="mt-8">
            <SidebarGroupLabel>Ações Rápidas</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {quickActions.map(item => <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className="flex items-center w-full px-3 py-2 rounded-xl medical-transition text-sm bg-accent/50 hover:bg-accent text-accent-foreground">
                        <item.icon className="w-4 h-4" />
                        <span className="ml-3">{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>}

        {/* Settings */}
        <div className="mt-auto">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/configuracoes" className="flex items-center w-full px-3 py-2 rounded-xl medical-transition hover:bg-muted text-muted-foreground hover:text-foreground">
                  <Settings className="w-5 h-5" />
                  {!isCollapsed && <span className="ml-3">Configurações</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>;
}