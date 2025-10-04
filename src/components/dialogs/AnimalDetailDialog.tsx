import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Animal } from "@/contexts/AnimalContext"
import { 
  Calendar,
  Heart,
  Activity,
  Users,
  Milk,
  FileText,
  Download
} from "lucide-react"

interface AnimalDetailDialogProps {
  animal: Animal
  children: React.ReactNode
}

export function AnimalDetailDialog({ animal, children }: AnimalDetailDialogProps) {
  const generatePDF = () => {
    // Implementação futura para exportação PDF
    alert('Exportação PDF será implementada')
  }

  const generateExcel = () => {
    // Implementação futura para exportação Excel
    alert('Exportação Excel será implementada')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Ficha Completa - {animal.nome}</span>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={generatePDF}>
                <Download className="w-4 h-4 mr-1" />
                PDF
              </Button>
              <Button size="sm" variant="outline" onClick={generateExcel}>
                <Download className="w-4 h-4 mr-1" />
                Excel
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Informações Básicas */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-primary" />
              Informações Gerais
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Registro:</span>
                <span className="font-medium">#{animal.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Nome:</span>
                <span className="font-medium">{animal.nome}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Raça:</span>
                <span className="font-medium">{animal.raca}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Idade:</span>
                <span className="font-medium">{animal.idade}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Tipo:</span>
                <span className="font-medium">{animal.tipo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Lote:</span>
                <span className="font-medium">{animal.lote}</span>
              </div>
              <div className="flex justify-between">
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
            </div>
          </Card>

          {/* Informações Reprodutivas */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-success" />
              Informações Reprodutivas
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Último exame:</span>
                <span className="font-medium">{animal.ultimoExame}</span>
              </div>
              {animal.dataInseminacao && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Data da IA:</span>
                  <span className="font-medium">{animal.dataInseminacao}</span>
                </div>
              )}
              {animal.previsaoParto && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Parto previsto:</span>
                  <span className="font-medium text-success">{animal.previsaoParto}</span>
                </div>
              )}
              {animal.inicioDescanso && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Início descanso:</span>
                  <span className="font-medium">{animal.inicioDescanso}</span>
                </div>
              )}
              {animal.fimDescanso && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Fim descanso:</span>
                  <span className="font-medium">{animal.fimDescanso}</span>
                </div>
              )}
              {animal.pai && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Pai:</span>
                  <span className="font-medium">{animal.pai}</span>
                </div>
              )}
              {animal.mae && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Mãe:</span>
                  <span className="font-medium">{animal.mae}</span>
                </div>
              )}
            </div>
          </Card>

          {/* Produção Leiteira */}
          {animal.tipo === 'Leite' && animal.producaoLeiteira && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Milk className="w-5 h-5 mr-2 text-primary" />
                Produção Leiteira
              </h3>
              
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {animal.producaoLeiteira.map((producao, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{producao.data}</span>
                    <span className="font-medium">{producao.quantidade}L</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Filhos */}
          {animal.filhos && animal.filhos.length > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-warning" />
                Descendência
              </h3>
              
              <div className="space-y-2">
                {animal.filhos.map((filho, index) => (
                  <div key={index} className="text-sm">
                    <span className="font-medium">Registro: {filho}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Histórico */}
          <Card className="p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-secondary" />
              Histórico Completo
            </h3>
            
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {animal.historico?.map((evento, index) => (
                <div key={index} className="border-l-2 border-primary/20 pl-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{evento.tipo}</span>
                    <span className="text-xs text-muted-foreground">{evento.data}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{evento.descricao}</p>
                </div>
              )) || (
                <p className="text-sm text-muted-foreground">Nenhum histórico registrado.</p>
              )}
            </div>
          </Card>
        </div>

        {animal.observacoes && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Observações</h3>
            <p className="text-sm text-muted-foreground">{animal.observacoes}</p>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  )
}