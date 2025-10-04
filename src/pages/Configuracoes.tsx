import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, 
  User, 
  Bell, 
  Database, 
  Shield, 
  Palette,
  Save
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Configuracoes() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    // Perfil
    nomeUsuario: "Dr. João Silva",
    email: "joao.silva@veterinaria.com",
    telefone: "(11) 99999-9999",
    
    // Notificações
    notificacoesEmail: true,
    notificacoesPush: true,
    lembretePartos: true,
    alertaExames: true,
    
    // Sistema
    autoBackup: true,
    modo24h: true,
    idioma: "pt-BR"
  });

  const handleSave = () => {
    toast({
      title: "Configurações salvas!",
      description: "Suas preferências foram atualizadas com sucesso."
    });
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <DashboardLayout title="Configurações">
      <div className="max-w-4xl space-y-6">
        
        {/* User Profile */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-primary" />
            Perfil do Usuário
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nome">Nome Completo</Label>
              <Input 
                id="nome" 
                value={settings.nomeUsuario}
                onChange={(e) => handleInputChange("nomeUsuario", e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input 
                id="email" 
                type="email"
                value={settings.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="telefone">Telefone</Label>
              <Input 
                id="telefone" 
                value={settings.telefone}
                onChange={(e) => handleInputChange("telefone", e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="crmv">CRMV</Label>
              <Input 
                id="crmv" 
                placeholder="Número do CRMV"
                className="mt-1"
              />
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-primary" />
            Notificações
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">Notificações por E-mail</Label>
                <p className="text-sm text-muted-foreground">Receber alertas importantes por e-mail</p>
              </div>
              <Switch 
                id="email-notifications"
                checked={settings.notificacoesEmail}
                onCheckedChange={(checked) => handleInputChange("notificacoesEmail", checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="push-notifications">Notificações Push</Label>
                <p className="text-sm text-muted-foreground">Alertas em tempo real no navegador</p>
              </div>
              <Switch 
                id="push-notifications"
                checked={settings.notificacoesPush}
                onCheckedChange={(checked) => handleInputChange("notificacoesPush", checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="parto-reminders">Lembretes de Parto</Label>
                <p className="text-sm text-muted-foreground">Avisos sobre partos previstos</p>
              </div>
              <Switch 
                id="parto-reminders"
                checked={settings.lembretePartos}
                onCheckedChange={(checked) => handleInputChange("lembretePartos", checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="exam-alerts">Alertas de Exames</Label>
                <p className="text-sm text-muted-foreground">Notificações sobre exames pendentes</p>
              </div>
              <Switch 
                id="exam-alerts"
                checked={settings.alertaExames}
                onCheckedChange={(checked) => handleInputChange("alertaExames", checked)}
              />
            </div>
          </div>
        </Card>

        {/* System Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Settings className="w-5 h-5 mr-2 text-primary" />
            Sistema
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-backup">Backup Automático</Label>
                <p className="text-sm text-muted-foreground">Backup diário dos dados às 02:00</p>
              </div>
              <Switch 
                id="auto-backup"
                checked={settings.autoBackup}
                onCheckedChange={(checked) => handleInputChange("autoBackup", checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="format-24h">Formato 24 horas</Label>
                <p className="text-sm text-muted-foreground">Usar formato 24h para horários</p>
              </div>
              <Switch 
                id="format-24h"
                checked={settings.modo24h}
                onCheckedChange={(checked) => handleInputChange("modo24h", checked)}
              />
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-center">
              <Database className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h4 className="font-medium">Backup Manual</h4>
              <p className="text-xs text-muted-foreground mb-3">Criar backup agora</p>
              <Button size="sm" variant="outline" className="w-full">
                Executar
              </Button>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="text-center">
              <Shield className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h4 className="font-medium">Segurança</h4>
              <p className="text-xs text-muted-foreground mb-3">Alterar senha</p>
              <Button size="sm" variant="outline" className="w-full">
                Configurar
              </Button>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="text-center">
              <Palette className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h4 className="font-medium">Tema</h4>
              <p className="text-xs text-muted-foreground mb-3">Modo escuro/claro</p>
              <Button size="sm" variant="outline" className="w-full">
                Alterar
              </Button>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="text-center">
              <Settings className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h4 className="font-medium">Avançado</h4>
              <p className="text-xs text-muted-foreground mb-3">Configurações técnicas</p>
              <Button size="sm" variant="outline" className="w-full">
                Acessar
              </Button>
            </div>
          </Card>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-6 border-t border-border">
          <Button onClick={handleSave} className="veterinary-gradient text-white">
            <Save className="w-4 h-4 mr-2" />
            Salvar Configurações
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}