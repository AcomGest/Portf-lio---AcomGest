import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAnimalContext } from "@/contexts/AnimalContext"
import { FileText, Download, Eye, Calendar, Activity, Heart, TrendingUp, BarChart3 } from 'lucide-react'

interface ReportDialogProps {
  children: React.ReactNode
  relatorio: {
    id: number
    titulo: string
    periodo: string
    tipo: string
    gerado: string
    status: string
    tamanho: string
  }
}

export function ReportDialog({ children, relatorio }: ReportDialogProps) {
  const [open, setOpen] = useState(false)
  const { animais } = useAnimalContext()

  const generateReportData = () => {
    const gestantes = animais.filter(a => a.status === 'Gestante')
    const inseminadas = animais.filter(a => a.status === 'Inseminada')
    const ativas = animais.filter(a => a.status === 'Ativo')
    
    return {
      totalAnimais: animais.length,
      gestantes: gestantes.length,
      inseminadas: inseminadas.length,
      ativas: ativas.length,
      taxaSucesso: Math.round((gestantes.length / (gestantes.length + ativas.length)) * 100) || 0,
      examesTotais: 156,
      animaisPorLote: {
        'lote-a': animais.filter(a => a.lote === 'lote-a').length,
        'lote-b': animais.filter(a => a.lote === 'lote-b').length,
        'lote-c': animais.filter(a => a.lote === 'lote-c').length,
        'lote-d': animais.filter(a => a.lote === 'lote-d').length,
      }
    }
  }

  const reportData = generateReportData()

  const handleExport = (format: 'pdf' | 'excel') => {
    // Simulate export
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { 
      type: format === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${relatorio.titulo.replace(/\s+/g, '_')}.${format === 'pdf' ? 'pdf' : 'xlsx'}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2 text-primary" />
            {relatorio.titulo}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Report Header */}
          <Card className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Período</p>
                <p className="font-medium">{relatorio.periodo}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Tipo</p>
                <p className="font-medium">{relatorio.tipo}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Gerado em</p>
                <p className="font-medium">{relatorio.gerado}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Status</p>
                <Badge variant="outline" className="bg-success/10 text-success">
                  {relatorio.status}
                </Badge>
              </div>
            </div>
          </Card>

          {/* Statistics Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-xl font-bold">{reportData.totalAnimais}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gestantes</p>
                  <p className="text-xl font-bold">{reportData.gestantes}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Taxa Sucesso</p>
                  <p className="text-xl font-bold">{reportData.taxaSucesso}%</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Exames</p>
                  <p className="text-xl font-bold">{reportData.examesTotais}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Animals by Lote */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Distribuição por Lote</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Lote A - Reprodução</p>
                <p className="text-lg font-semibold">{reportData.animaisPorLote['lote-a']}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Lote B - Gestantes</p>
                <p className="text-lg font-semibold">{reportData.animaisPorLote['lote-b']}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Lote C - Descanso</p>
                <p className="text-lg font-semibold">{reportData.animaisPorLote['lote-c']}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Lote D - Geral</p>
                <p className="text-lg font-semibold">{reportData.animaisPorLote['lote-d']}</p>
              </div>
            </div>
          </Card>

          {/* Animals List */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Lista de Animais</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {animais.map((animal) => (
                <div key={animal.id} className="flex justify-between items-center p-2 rounded bg-muted/20">
                  <div>
                    <p className="font-medium">{animal.nome}</p>
                    <p className="text-xs text-muted-foreground">#{animal.id} • {animal.raca}</p>
                  </div>
                  <Badge 
                    variant="outline"
                    className={
                      animal.status === 'Gestante' ? 'bg-success/10 text-success' :
                      animal.status === 'Inseminada' ? 'bg-warning/10 text-warning' :
                      animal.status === 'Ativo' ? 'bg-primary/10 text-primary' :
                      'bg-secondary/10 text-secondary'
                    }
                  >
                    {animal.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Export Actions */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => handleExport('pdf')}>
              <Download className="w-4 h-4 mr-2" />
              Exportar PDF
            </Button>
            <Button variant="outline" onClick={() => handleExport('excel')}>
              <Download className="w-4 h-4 mr-2" />
              Exportar Excel
            </Button>
            <Button onClick={() => setOpen(false)}>
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}