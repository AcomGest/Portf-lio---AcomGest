import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Activity, Calendar, FileText, Heart, Image, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/hero-veterinary.jpg";
export default function Dashboard() {
  return <DashboardLayout title="Dashboard">
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary-light p-8 text-white">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">Bem-vindo ao AcomGest</h1>
            <p className="text-primary-foreground/90 mb-6 max-w-2xl">
              Sistema inteligente de acompanhamento gestacional para bovinos. 
              Gerencie exames ultrassonográficos, cronogramas reprodutivos e análises veterinárias.
            </p>
            <div className="flex space-x-4">
              <Button variant="secondary" className="bg-white text-primary hover:bg-white/90" onClick={() => window.location.href = '/ultrassom'}>
                Novo Exame
              </Button>
              <Button variant="outline" className="border-white text-[#006d5b] bg-slate-50" onClick={() => window.location.href = '/cronograma'}>
                Ver Cronograma
              </Button>
            </div>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/3 opacity-20">
            
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard title="Total de Animais" value={127} change={{
          value: "12%",
          isPositive: true
        }} icon={Users} gradient="primary" />
          <MetricCard title="Exames Realizados" value={48} change={{
          value: "8%",
          isPositive: true
        }} icon={Image} gradient="secondary" />
          <MetricCard title="Gestações Ativas" value={23} change={{
          value: "3",
          isPositive: true
        }} icon={Heart} gradient="success" />
          <MetricCard title="Taxa de Sucesso" value="84%" change={{
          value: "5%",
          isPositive: true
        }} icon={TrendingUp} gradient="primary" />
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-primary" />
              Ações Rápidas
            </h3>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline" onClick={() => window.location.href = '/animais/novo'}>
                <Users className="w-4 h-4 mr-2" />
                Cadastrar Animal
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => window.location.href = '/ultrassom'}>
                <Image className="w-4 h-4 mr-2" />
                Novo Exame Ultrassom
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => window.location.href = '/cronograma'}>
                <Calendar className="w-4 h-4 mr-2" />
                Agendar Procedimento
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => window.location.href = '/relatorios'}>
                <FileText className="w-4 h-4 mr-2" />
                Gerar Relatório
              </Button>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Atividades Recentes</h3>
            <div className="space-y-4">
              {[{
              action: "Exame ultrassonográfico registrado",
              animal: "Vaca #127 - Holstein",
              time: "2 horas atrás",
              status: "Gestante"
            }, {
              action: "Novo animal cadastrado",
              animal: "Touro #128 - Angus",
              time: "4 horas atrás",
              status: "Ativo"
            }, {
              action: "Parto realizado com sucesso",
              animal: "Vaca #102 - Nelore",
              time: "1 dia atrás",
              status: "Bezerro saudável"
            }, {
              action: "Inseminação artificial",
              animal: "Vaca #115 - Brahman",
              time: "2 dias atrás",
              status: "Aguardando confirmação"
            }].map((activity, index) => <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.animal}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-success font-medium">{activity.status}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>)}
            </div>
          </Card>
        </div>

        {/* Upcoming Events */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-primary" />
            Próximos Eventos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[{
            date: "15 Jan",
            event: "Parto Previsto",
            animal: "Vaca #109",
            priority: "high"
          }, {
            date: "18 Jan",
            event: "Exame de Controle",
            animal: "Vaca #127",
            priority: "medium"
          }, {
            date: "22 Jan",
            event: "Inseminação Artificial",
            animal: "Vaca #145",
            priority: "low"
          }].map((event, index) => <div key={index} className="p-4 rounded-lg border border-border bg-card">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-primary">{event.date}</span>
                  <div className={`w-2 h-2 rounded-full ${event.priority === 'high' ? 'bg-destructive' : event.priority === 'medium' ? 'bg-warning' : 'bg-success'}`}></div>
                </div>
                <h4 className="font-semibold text-sm">{event.event}</h4>
                <p className="text-xs text-muted-foreground">{event.animal}</p>
              </div>)}
          </div>
        </Card>
      </div>
    </DashboardLayout>;
}