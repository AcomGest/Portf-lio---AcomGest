import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ConfirmDialog } from "@/components/dialogs/ConfirmDialog"
import { AnimalDetailDialog } from "@/components/dialogs/AnimalDetailDialog"
import { EditAnimalDialog } from "@/components/dialogs/EditAnimalDialog"
import { useAnimalContext, Animal } from "@/contexts/AnimalContext"
import { useToast } from "@/hooks/use-toast"
import { 
  Heart,
  Calendar,
  MoreVertical,
  Trash2,
  Activity,
  Moon,
  Eye
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface AnimalCardProps {
  animal: Animal
  view?: 'card' | 'list'
}

export function AnimalCard({ animal, view = 'card' }: AnimalCardProps) {
  const { removeAnimal, registrarPrenhez, registrarDescanso } = useAnimalContext()
  const { toast } = useToast()

  const handleDeleteAnimal = (id: string, nome: string) => {
    removeAnimal(id)
    toast({
      title: "Animal excluído",
      description: `${nome} foi removido do sistema.`
    })
  }

  const handleRegistrarPrenhez = () => {
    const dataInseminacao = prompt("Digite a data da inseminação (YYYY-MM-DD):", new Date().toISOString().split('T')[0])
    if (dataInseminacao) {
      registrarPrenhez(animal.id, dataInseminacao)
      toast({
        title: "Prenhez registrada",
        description: `Prenhez de ${animal.nome} registrada com sucesso.`
      })
    }
  }

  const handleRegistrarDescanso = () => {
    registrarDescanso(animal.id, animal.tipo)
    toast({
      title: "Descanso registrado",
      description: `${animal.tipo === 'Leite' ? 'Descanso' : 'Desmama'} de ${animal.nome} registrado com sucesso.`
    })
  }

  if (view === 'list') {
    return (
      <Card className="p-4 hover:shadow-lg medical-transition">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4 flex-1">
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-lg">{animal.nome}</h3>
              <p className="text-sm text-muted-foreground">#{animal.id} • {animal.raca} • {animal.idade}</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge 
                variant={animal.statusColor === 'success' ? 'default' : 'secondary'}
                className={
                  animal.statusColor === 'success' ? 'bg-success text-success-foreground' :
                  animal.statusColor === 'warning' ? 'bg-warning text-warning-foreground' :
                  animal.statusColor === 'primary' ? 'bg-primary text-primary-foreground' :
                  'bg-secondary text-secondary-foreground'
                }
              >
                {animal.status}
              </Badge>
              
              <span className="text-sm text-muted-foreground">{animal.lote}</span>
              <span className="text-sm font-medium">{animal.ultimoExame}</span>
              
              {animal.previsaoParto && (
                <span className="text-sm font-medium text-success">{animal.previsaoParto}</span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-4">
            <Button size="sm" variant="outline" onClick={handleRegistrarPrenhez}>
              <Activity className="w-4 h-4 mr-1" />
              Prenhez
            </Button>
            <Button size="sm" variant="outline" onClick={handleRegistrarDescanso}>
              <Moon className="w-4 h-4 mr-1" />
              {animal.tipo === 'Leite' ? 'Descanso' : 'Desmama'}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border border-border shadow-lg">
                <DropdownMenuItem asChild>
                  <AnimalDetailDialog animal={animal}>
                    <button className="flex items-center w-full px-2 py-1.5 text-sm hover:bg-accent rounded-sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Detalhes
                    </button>
                  </AnimalDetailDialog>
                </DropdownMenuItem>
                <DropdownMenuItem>Novo Exame</DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <EditAnimalDialog animal={animal}>
                    <button className="flex items-center w-full px-2 py-1.5 text-sm hover:bg-accent rounded-sm">
                      Editar
                    </button>
                  </EditAnimalDialog>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <ConfirmDialog
                    title="Excluir Animal"
                    description={`Tem certeza que deseja excluir ${animal.nome}? Esta ação não pode ser desfeita.`}
                    onConfirm={() => handleDeleteAnimal(animal.id, animal.nome)}
                    confirmText="Excluir"
                    variant="destructive"
                  >
                    <button className="flex items-center w-full px-2 py-1.5 text-sm text-destructive hover:bg-destructive/10 rounded-sm">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Excluir Ficha
                    </button>
                  </ConfirmDialog>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 hover:shadow-lg medical-transition">
      <div className="flex justify-between items-start mb-4">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-lg">{animal.nome}</h3>
          <p className="text-sm text-muted-foreground">#{animal.id} • {animal.raca}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-card border border-border shadow-lg">
            <DropdownMenuItem asChild>
              <AnimalDetailDialog animal={animal}>
                <button className="flex items-center w-full px-2 py-1.5 text-sm hover:bg-accent rounded-sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Ver Detalhes
                </button>
              </AnimalDetailDialog>
            </DropdownMenuItem>
            <DropdownMenuItem>Novo Exame</DropdownMenuItem>
            <DropdownMenuItem asChild>
              <EditAnimalDialog animal={animal}>
                <button className="flex items-center w-full px-2 py-1.5 text-sm hover:bg-accent rounded-sm">
                  Editar
                </button>
              </EditAnimalDialog>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <ConfirmDialog
                title="Excluir Animal"
                description={`Tem certeza que deseja excluir ${animal.nome}? Esta ação não pode ser desfeita.`}
                onConfirm={() => handleDeleteAnimal(animal.id, animal.nome)}
                confirmText="Excluir"
                variant="destructive"
              >
                <button className="flex items-center w-full px-2 py-1.5 text-sm text-destructive hover:bg-destructive/10 rounded-sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir Ficha
                </button>
              </ConfirmDialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Status:</span>
          <Badge 
            variant={animal.statusColor === 'success' ? 'default' : 'secondary'}
            className={
              animal.statusColor === 'success' ? 'bg-success text-success-foreground' :
              animal.statusColor === 'warning' ? 'bg-warning text-warning-foreground' :
              animal.statusColor === 'primary' ? 'bg-primary text-primary-foreground' :
              'bg-secondary text-secondary-foreground'
            }
          >
            {animal.status}
          </Badge>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Idade:</span>
          <span className="text-sm font-medium">{animal.idade}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Tipo:</span>
          <span className="text-sm font-medium">{animal.tipo}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Último exame:</span>
          <span className="text-sm font-medium">{animal.ultimoExame}</span>
        </div>

        {animal.previsaoParto && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Parto previsto:</span>
            <span className="text-sm font-medium text-success">{animal.previsaoParto}</span>
          </div>
        )}
      </div>

      <div className="flex space-x-2 mt-4 pt-4 border-t border-border">
        <Button size="sm" variant="outline" className="flex-1" onClick={() => window.location.href = '/ultrassom'}>
          <Heart className="w-4 h-4 mr-1" />
          Exame
        </Button>
        <Button size="sm" variant="outline" className="flex-1" onClick={() => window.location.href = '/cronograma'}>
          <Calendar className="w-4 h-4 mr-1" />
          Agendar
        </Button>
      </div>

      <div className="flex space-x-2 mt-2">
        <Button size="sm" variant="outline" className="flex-1" onClick={handleRegistrarPrenhez}>
          <Activity className="w-4 h-4 mr-1" />
          Registrar Prenhez
        </Button>
        <Button size="sm" variant="outline" className="flex-1" onClick={handleRegistrarDescanso}>
          <Moon className="w-4 h-4 mr-1" />
          {animal.tipo === 'Leite' ? 'Registrar Descanso' : 'Início Desmama'}
        </Button>
      </div>
    </Card>
  )
}