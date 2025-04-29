import React, { useState } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Users, LogOut, Search, UserPlus, Trophy, Download } from 'lucide-react';
import { participants } from '../data/mockData';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { Participant } from '../types';

const AdminDashboardPage: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'participants' | 'winners'>('participants');

  // Filtered participants based on search
  const filteredParticipants = participants.filter(participant => 
    participant.name.toLowerCase().includes(search.toLowerCase()) ||
    participant.email.toLowerCase().includes(search.toLowerCase()) ||
    (participant.team && participant.team.toLowerCase().includes(search.toLowerCase()))
  );

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const downloadCSV = () => {
    const headers = ['Nombre', 'Correo', 'Teléfono', 'Equipo', 'Idea del Proyecto', 'Perfil', 'Habilidades', 'Fecha de Registro'];
    
    const csvContent = [
      headers.join(','),
      ...participants.map(p => [
        `"${p.name}"`,
        `"${p.email}"`,
        `"${p.phone}"`,
        `"${p.team || ''}"`,
        `"${p.projectIdea.replace(/"/g, '""')}"`,
        `"${p.background}"`,
        `"${p.skills.map(skill => skill.name).join(', ')}"`,
        `"${format(p.registerDate, 'dd/MM/yyyy')}"`,
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `participantes_hackathon_${format(new Date(), 'yyyyMMdd')}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderParticipantsTable = () => {
    if (filteredParticipants.length === 0) {
      return (
        <div className="text-center p-8">
          <p className="text-gray-500">No se encontraron participantes que coincidan con la búsqueda.</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-black">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipo</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Perfil</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-black divide-y divide-gray-200">
            {filteredParticipants.map((participant) => (
              <ParticipantRow key={participant.id} participant={participant} />
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderWinnersSection = () => (
    <div className="bg-black p-6 rounded-lg shadow-sm text-center">
      <div className="mb-8">
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-md inline-flex items-center mb-4">
          <Trophy className="mr-2 h-5 w-5" />
          <span>Sección de ganadores</span>
        </div>
        
        <h3 className="text-lg font-medium">Selecciona los ganadores del hackathon</h3>
        <p className="text-gray-500 mt-1">
          Esta sección te permitirá seleccionar y publicar los ganadores del hackathon una vez que el evento haya concluido.
        </p>
      </div>
      
      <div className="bg-black p-4 rounded-lg mb-6">
        <p className="text-sm text-gray-600 mb-2">
          El hackathon aún no ha concluido. Los ganadores podrán ser seleccionados después del 7 de junio de 2025.
        </p>
      </div>
      
      <Button 
        disabled 
        variant="outline"
      >
        <Trophy className="mr-2 h-4 w-4" />
        Seleccionar ganadores
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-12 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
            <p className="text-gray-600">Bienvenido, {user?.email}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={downloadCSV} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar CSV
            </Button>
            <Button onClick={handleLogout} variant="secondary">
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar sesión
            </Button>
          </div>
        </div>

        <div className="flex space-x-2 mb-6 border-b border-gray-200">
          <button
            className={`py-3 px-4 text-sm font-medium flex items-center border-b-2 transition ${
              tab === 'participants'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setTab('participants')}
          >
            <Users className="mr-2 h-4 w-4" />
            Participantes ({participants.length})
          </button>
          <button
            className={`py-3 px-4 text-sm font-medium flex items-center border-b-2 transition ${
              tab === 'winners'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setTab('winners')}
          >
            <Trophy className="mr-2 h-4 w-4" />
            Ganadores
          </button>
        </div>
        
        {tab === 'participants' ? (
          <Card>
            <CardHeader className="border-b border-gray-100">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
                <div className="flex items-center">
                  <UserPlus className="mr-2 h-5 w-5 text-gray-500" />
                  <h2 className="text-lg font-medium">Lista de Participantes</h2>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Buscar participante..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              {renderParticipantsTable()}
            </CardContent>
          </Card>
        ) : (
          renderWinnersSection()
        )}
      </div>
    </div>
  );
};

const ParticipantRow: React.FC<{ participant: Participant }> = ({ participant }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <React.Fragment>
      <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">{participant.name}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {participant.email}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {participant.team || '-'}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {participant.background}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {format(participant.registerDate, 'dd/MM/yyyy')}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="text-blue-600 hover:text-blue-900"
          >
            {isExpanded ? 'Ocultar' : 'Ver detalles'}
          </button>
        </td>
      </tr>
      
      {isExpanded && (
        <tr>
          <td colSpan={6} className="px-6 py-4 bg-black border-b">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Datos de contacto</h4>
                <p className="text-sm mb-2">
                  <span className="font-medium">Teléfono:</span> {participant.phone}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Habilidades</h4>
                <div className="flex flex-wrap gap-1">
                  {participant.skills.map(skill => (
                    <span key={skill.name} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h4 className="text-sm font-medium text-gray-700 mb-1">Idea del proyecto</h4>
                <p className="text-sm text-gray-600">{participant.projectIdea}</p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

export default AdminDashboardPage;