import React from 'react';
import { Link } from 'react-router-dom';
import { Medal, ExternalLink, Users } from 'lucide-react';
import Confetti from 'react-confetti';
import { winners } from '../data/mockData';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';

const WinnersPage: React.FC = () => {
  const [showConfetti, setShowConfetti] = React.useState(true);
  const [windowDimensions, setWindowDimensions] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  React.useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Disable confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);
  
  const getPositionColor = (position: number) => {
    switch (position) {
      case 1:
        return 'text-yellow-500 bg-yellow-100';
      case 2:
        return 'text-gray-500 bg-gray-100';
      case 3:
        return 'text-amber-500 bg-amber-100';
      default:
        return 'text-blue-500 bg-blue-100';
    }
  };

  const getPositionLabel = (position: number) => {
    switch (position) {
      case 1:
        return 'Primer Lugar';
      case 2:
        return 'Segundo Lugar';
      case 3:
        return 'Tercer Lugar';
      default:
        return `Lugar ${position}`;
    }
  };

  return (
    <div className="pt-20">
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={300}
          gravity={0.1}
        />
      )}
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20 text-center text-white">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Ganadores del Hackathon</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Celebramos a los equipos destacados que desarrollaron las soluciones más innovadoras y con mayor impacto
          </p>
          
          <div className="flex justify-center space-x-4">
            <Link to="/">
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                Volver al Inicio
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Regístrate Ahora
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Winners Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nuestros Ganadores</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Estos equipos destacaron por la innovación, viabilidad y potencial impacto de sus soluciones
            </p>
          </div>
          
          {/* First place - featured */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center rounded-full p-3 bg-yellow-100 mb-2">
                <Medal className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Gran Ganador del Hackathon</h3>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <Card className="overflow-hidden shadow-lg border-2 border-yellow-300">
                <div className="grid md:grid-cols-2">
                  <div className="h-64 md:h-auto overflow-hidden">
                    <img 
                      src={winners[0].imageUrl} 
                      alt={winners[0].projectName}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <CardContent className="flex flex-col p-6">
                    <div>
                      <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-yellow-100 text-yellow-800 mb-2">
                        {getPositionLabel(winners[0].position)}
                      </span>
                      <h3 className="text-2xl font-bold mb-1">{winners[0].projectName}</h3>
                      <p className="text-sm text-gray-500 mb-4">Equipo: {winners[0].name}</p>
                      
                      <p className="text-gray-600 mb-4">{winners[0].projectDescription}</p>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold flex items-center mb-2">
                          <Users className="mr-1 h-4 w-4" />
                          Integrantes
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {winners[0].teamMembers.map(member => (
                            <span key={member} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                              {member}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-auto">
                      <a 
                        href="#" 
                        className="text-blue-600 flex items-center hover:text-blue-800"
                      >
                        Ver detalles del proyecto
                        <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
          
          {/* Other winners */}
          <div className="grid md:grid-cols-2 gap-8">
            {winners.slice(1).map(winner => (
              <Card key={winner.id} hover className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-40 md:h-auto overflow-hidden">
                    <img 
                      src={winner.imageUrl} 
                      alt={winner.projectName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="flex flex-col flex-grow p-6 md:w-2/3">
                    <div>
                      <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mb-2 ${getPositionColor(winner.position)}`}>
                        {getPositionLabel(winner.position)}
                      </span>
                      <h3 className="text-xl font-bold mb-1">{winner.projectName}</h3>
                      <p className="text-sm text-gray-500 mb-3">Equipo: {winner.name}</p>
                      
                      <p className="text-sm text-gray-600 mb-2">{winner.projectDescription}</p>
                    </div>
                    
                    <div className="mt-auto pt-2">
                      <h4 className="text-xs font-semibold flex items-center mb-1">
                        <Users className="mr-1 h-3 w-3" />
                        Integrantes
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {winner.teamMembers.map(member => (
                          <span key={member} className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
                            {member}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">¿Quieres ser parte de nuestro próximo hackathon?</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Estamos buscando mentes brillantes para nuestro próximo evento. ¡Regístrate ahora y demuestra tu talento!
          </p>
          <Link to="/register">
            <Button size="lg">
              Registrarme para el Próximo Hackathon
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default WinnersPage;