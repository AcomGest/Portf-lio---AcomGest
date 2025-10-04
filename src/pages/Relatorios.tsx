import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ReportDialog } from "@/components/dialogs/ReportDialog"
import { useAnimalContext } from "@/contexts/AnimalContext"
import { 
  FileText,
  Download,
  Filter,
  Calendar,
  BarChart3,
  TrendingUp,
  Activity,
  Heart,
  Eye
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Relatorios() {
  const { animais } = useAnimalContext()
  const relatorios = [
    {
      id: 1,
      titulo: "Relatório Mensal de Gestação",
      periodo: "Janeiro 2024",
      tipo: "Reprodução",
      gerado: "2024-01-30",
      status: "Disponível",
      tamanho: "2.4 MB"
    },
    {
      id: 2,
      titulo: "Taxa de Sucesso de IA",
      periodo: "Q4 2023",
      tipo: "Análise",
      gerado: "2024-01-15",
      status: "Disponível",
      tamanho: "1.8 MB"
    },
    {
      id: 3,
      titulo: "Histórico de Exames Ultrassom",
      periodo: "2023",
      tipo: "Exames",
      gerado: "2024-01-10",
      status: "Disponível",
      tamanho: "5.2 MB"
    }
  ]

  const estatisticas = {
    totalAnimais: animais.length,
    gestantes: animais.filter(a => a.status === 'Gestante').length,
    taxaSucesso: Math.round((animais.filter(a => a.status === 'Gestante').length / animais.length) * 100) || 84,
    examesTotais: 156
  }

  return (
    <DashboardLayout title="Relatórios e Análises">
      <div className="space-y-6">
        
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this-month">Este Mês</SelectItem>
                <SelectItem value="last-month">Mês Anterior</SelectItem>
                <SelectItem value="this-quarter">Este Trimestre</SelectItem>
                <SelectItem value="this-year">Este Ano</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>
          <Button className="veterinary-gradient text-white" onClick={() => alert('Gerador de relatórios em desenvolvimento!')}>
            <FileText className="w-4 h-4 mr-2" />
            Gerar Novo Relatório
          </Button>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Animais</p>
                <p className="text-2xl font-bold text-primary">{estatisticas.totalAnimais}</p>
                <p className="text-xs text-success">+12% este mês</p>
              </div>
              <div className="w-12 h-12 rounded-lg veterinary-gradient flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Gestações Ativas</p>
                <p className="text-2xl font-bold text-success">{estatisticas.gestantes}</p>
                <p className="text-xs text-success">+18% este mês</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-success flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Taxa de Sucesso</p>
                <p className="text-2xl font-bold text-warning">{estatisticas.taxaSucesso}%</p>
                <p className="text-xs text-success">+5% este mês</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-warning flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Exames Realizados</p>
                <p className="text-2xl font-bold text-secondary">{estatisticas.examesTotais}</p>
                <p className="text-xs text-success">+8% este mês</p>
              </div>
              <div className="w-12 h-12 rounded-lg data-gradient flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Available Reports */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary" />
                Relatórios Disponíveis
              </h3>
              
              <div className="space-y-4">
                {relatorios.map((relatorio) => (
                  <Card key={relatorio.id} className="p-4 border border-border">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold">{relatorio.titulo}</h4>
                          <Badge variant="outline" className="bg-success/10 text-success">
                            {relatorio.status}
                          </Badge>
                        </div>
                        
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
                            <p className="text-muted-foreground">Tamanho</p>
                            <p className="font-medium">{relatorio.tamanho}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2 ml-4">
                        <ReportDialog relatorio={relatorio}>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            Visualizar
                          </Button>
                        </ReportDialog>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-1" />
                          PDF
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-1" />
                          Excel
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>

          {/* Quick Reports */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Relatórios Rápidos</h3>
              
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Cronograma Semanal
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="w-4 h-4 mr-2" />
                  Gestações Ativas
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="w-4 h-4 mr-2" />
                  Exames do Mês
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Análise de Desempenho
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Estatísticas Gerais
                </Button>
              </div>
            </Card>

            {/* Report Templates */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Modelos de Relatório</h3>
              
              <div className="space-y-3">
                <div className="p-3 rounded-lg border border-border">
                  <h4 className="font-medium text-sm">Relatório Reprodutivo</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Taxa de prenhez, intervalos entre partos, eficiência reprodutiva
                  </p>
                </div>
                
                <div className="p-3 rounded-lg border border-border">
                  <h4 className="font-medium text-sm">Análise de Ultrassom</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Resumo de exames, diagnósticos, taxa de acurácia
                  </p>
                </div>
                
                <div className="p-3 rounded-lg border border-border">
                  <h4 className="font-medium text-sm">Cronograma de Manejo</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Eventos programados, histórico de atividades
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}