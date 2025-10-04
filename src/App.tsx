import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimalProvider } from "@/contexts/AnimalContext";
import Dashboard from "./pages/Dashboard";
import Animais from "./pages/Animais";
import NovoAnimal from "./pages/NovoAnimal";
import Ultrassom from "./pages/Ultrassom";
import Cronograma from "./pages/Cronograma";
import Relatorios from "./pages/Relatorios";
import NotFound from "./pages/NotFound";
import Configuracoes from "./pages/Configuracoes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AnimalProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/animais" element={<Animais />} />
            <Route path="/animais/novo" element={<NovoAnimal />} />
            <Route path="/ultrassom" element={<Ultrassom />} />
            <Route path="/cronograma" element={<Cronograma />} />
            <Route path="/relatorios" element={<Relatorios />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AnimalProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
