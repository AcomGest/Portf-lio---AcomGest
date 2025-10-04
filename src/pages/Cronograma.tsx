import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EventDialog } from "@/components/dialogs/EventDialog"
import { useAnimalContext } from "@/contexts/AnimalContext"
import { 
  Calendar,
  Plus,
  Filter,
  Bell,
  Heart,
  Activity,
  Clock,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { useState } from "react"

export default function Cronograma() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const { eventos } = useAnimalContext()

  const proximosEventos = eventos.filter(evento => 
    new Date(evento.data) >= new Date()
  ).slice(0, 5)

  const getPriorityColor = (prioridade: string) => {
    switch (prioridade) {
      case 'alta': return 'bg-destructive text-destructive-foreground'
      case 'media': return 'bg-warning text-warning-foreground'
      case 'baixa': return 'bg-success text-success-foreground'
      default: return 'bg-secondary text-secondary-foreground'
    }
  }

  const getEventIcon = (tipo: string) => {
    switch (tipo) {
      case 'Parto Previsto': return Heart
      case 'Exame de Controle':
      case 'Exame Ultrassom': return Activity
      case 'Inseminação Artificial': return Calendar
      case 'Início do Descanso': return Clock
      default: return Calendar
    }
  }

  return (
    <DashboardLayout title="Cronograma de Manejo">
      <div className="space-y-6">
        
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Lembretes
            </Button>
          </div>
          <EventDialog>
            <Button className="veterinary-gradient text-white">
              <Plus className="w-4 h-4 mr-2" />
              Agendar Evento
            </Button>
          </EventDialog>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Partos Esta Semana</p>
                <p className="text-xl font-semibold">3</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Exames Agendados</p>
                <p className="text-xl font-semibold">8</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">IAs Programadas</p>
                <p className="text-xl font-semibold">5</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Em Descanso</p>
                <p className="text-xl font-semibold">12</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Calendar View */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Janeiro 2024</h3>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">Hoje</Button>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((dia) => (
                  <div key={dia} className="p-2 text-center text-sm font-medium text-muted-foreground">
                    {dia}
                  </div>
                ))}
                
                {/* Calendar Days */}
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 6 // Adjust for starting on Sunday
                  const date = new Date(2024, 0, day)
                  const isCurrentMonth = date.getMonth() === 0
                  const isToday = date.toDateString() === new Date().toDateString()
                  const hasEvent = eventos.some(evento => 
                    new Date(evento.data).toDateString() === date.toDateString()
                  )
                  
                  return (
                    <div 
                      key={i} 
                      className={`
                        p-2 min-h-[60px] border rounded-lg cursor-pointer medical-transition
                        ${isCurrentMonth ? 'bg-card hover:bg-accent' : 'bg-muted/20 text-muted-foreground'}
                        ${isToday ? 'ring-2 ring-primary' : ''}
                      `}
                    >
                      <div className="text-sm font-medium">{date.getDate()}</div>
                      {hasEvent && (
                        <div className="mt-1 space-y-1">
                          {eventos
                            .filter(evento => new Date(evento.data).toDateString() === date.toDateString())
                            .slice(0, 2)
                            .map((evento) => (
                              <div 
                                key={evento.id}
                                className={`text-xs px-1 py-0.5 rounded truncate ${getPriorityColor(evento.prioridade)}`}
                              >
                                {evento.tipo}
                              </div>
                            ))
                          }
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>

          {/* Upcoming Events */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                Próximos Eventos
              </h3>
              
              <div className="space-y-4">
                {proximosEventos.map((evento) => {
                  const Icon = getEventIcon(evento.tipo)
                  return (
                    <div key={evento.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getPriorityColor(evento.prioridade)}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium truncate">{evento.tipo}</p>
                          <span className="text-xs text-muted-foreground">
                            {new Date(evento.data).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{evento.animal}</p>
                        <p className="text-xs text-muted-foreground">{evento.descricao}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Legend */}
            <Card className="p-4">
              <h4 className="font-medium mb-3">Legenda de Prioridades</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded bg-destructive"></div>
                  <span className="text-sm">Alta Prioridade</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded bg-warning"></div>
                  <span className="text-sm">Média Prioridade</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded bg-success"></div>
                  <span className="text-sm">Baixa Prioridade</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}