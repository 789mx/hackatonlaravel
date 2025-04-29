import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Medal, DivideIcon as LucideIcon, Lightbulb, Database, GraduationCap } from 'lucide-react';
import Card, { CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { hackathonInfo } from '../data/mockData';
import AnimatedSection from '../components/AnimatedSection';

interface CategoryProps {
  icon: LucideIcon;
  name: string;
  description: string;
}

const CategoryCard: React.FC<CategoryProps> = ({ icon: Icon, name, description }) => (
  <Card hover className="h-full bg-black border border-[#333333]">
    <CardContent className="flex flex-col items-start h-full">
      <div className="rounded-full bg-[#111111] p-3 mb-4">
        <Icon className="h-6 w-6 text-[#00FFFF]" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-[#00FFFF]">{name}</h3>
      <p className="text-[#00FFFF] flex-grow">{description}</p>
    </CardContent>
  </Card>
);

const HomePage: React.FC = () => {
  const categoryIcons = [
    Lightbulb,
    Database,
    GraduationCap
  ];

  const today = new Date();
  const registrationDeadline = new Date('2025-04-30');
  const daysLeft = Math.ceil((registrationDeadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="hero bg-black text-[#00FFFF] py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center">
          <img
            src="/hackathon-hero.png"
            alt="Hackathon Logo"
            className="w-64 h-64 md:w-96 md:h-96 object-contain mb-8 animate-float"
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-glow">
            {hackathonInfo.title}
          </h1>
          <p className="text-xl mb-8">¡Desarrolla soluciones innovadoras en 48 horas!</p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-center">
              <Calendar className="mr-2 h-5 w-5" />
              <span>{hackathonInfo.date}</span>
            </div>
            <div className="flex items-center justify-center">
              <MapPin className="mr-2 h-5 w-5" />
              <span>{hackathonInfo.location}</span>
            </div>
            <div className="flex items-center justify-center">
              <Clock className="mr-2 h-5 w-5" />
              <span>Inscripciones hasta: {hackathonInfo.registrationDeadline}</span>
            </div>
          </div>
          
          <Link to="/register">
            <Button size="lg" className="bg-[#FF00FF] text-white hover:bg-[#CC00CC]">
              Registrarme Ahora
            </Button>
          </Link>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-10 bg-black relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#111111] to-black"></div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <AnimatedSection>
            <div className="bg-[#111111] rounded-lg p-6 shadow-[0_0_30px_rgba(0,255,255,0.1)] border border-[#333333]">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-2xl font-bold text-[#00FFFF]">¡Quedan {daysLeft} días para registrarte!</h2>
                  <p className="text-[#00FFFF]">No pierdas la oportunidad de participar en esta experiencia única.</p>
                </div>
                <Link to="/register">
                  <Button className="bg-[#FF00FF] text-white hover:bg-[#CC00CC]">
                    Registrarme Ahora
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Required Tools Section */}
      <section className="py-16 bg-[#050505] relative">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#111111_25%,transparent_25%,transparent_75%,#111111_75%,#111111)] bg-[length:60px_60px] opacity-5"></div>
        <AnimatedSection>
          <div className="container mx-auto px-4 md:px-6 relative">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-[#00FFFF] animate-glow">Herramientas Requeridas</h2>
              <p className="text-xl text-[#00FFFF]">Es indispensable demostrar el uso de las siguientes herramientas durante la presentación:</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {hackathonInfo.requiredTools.map((tool) => (
                <Card key={tool} className="transform transition hover:-translate-y-1 bg-[#111111] border border-[#333333] hover:border-[#00FFFF] hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]">
                  <CardContent className="flex items-center space-x-4">
                    <div className="rounded-full bg-black p-3">
                      <Lightbulb className="h-6 w-6 text-[#00FFFF]" />
                    </div>
                    <span className="font-semibold text-lg text-[#00FFFF]">{tool}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* About Section */}
      <section className="py-16 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-radial from-[#111111] via-black to-black"></div>
        <AnimatedSection>
          <div className="container mx-auto px-4 md:px-6 relative">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-[#00FFFF] animate-glow">Sobre el Hackathon</h2>
              <p className="text-xl text-[#00FFFF]">{hackathonInfo.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="transform transition hover:-translate-y-1 bg-[#111111] border border-[#333333] hover:border-[#00FFFF] hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]">
                <CardContent>
                  <h3 className="text-xl font-semibold mb-2 text-[#00FFFF]">Metodología</h3>
                  <p className="text-[#00FFFF]">
                    Equipos de 2 personas trabajarán durante 48 horas para desarrollar soluciones innovadoras utilizando las herramientas de IA especificadas. 
                    Contarán con mentoría de expertos y acceso a recursos técnicos para implementar sus ideas.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="transform transition hover:-translate-y-1 bg-[#111111] border border-[#333333] hover:border-[#00FFFF] hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]">
                <CardContent>
                  <h3 className="text-xl font-semibold mb-2 text-[#00FFFF]">Evaluación</h3>
                  <p className="text-[#00FFFF]">
                    Los proyectos serán evaluados por un panel de jueces expertos, considerando la originalidad, 
                    viabilidad técnica, impacto organizacional y el uso efectivo de las herramientas de IA requeridas.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Deliverables Section */}
      <section className="py-16 bg-[#020202] relative">
        <div className="absolute inset-0 cyber-grid opacity-10"></div>
        <AnimatedSection>
          <div className="container mx-auto px-4 md:px-6 relative">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-[#00FFFF] animate-glow">Entregables</h2>
              <p className="text-xl text-[#00FFFF]">
                Los equipos deberán presentar los siguientes elementos
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {hackathonInfo.categories.map((category, index) => (
                <CategoryCard
                  key={category.name}
                  icon={categoryIcons[index]}
                  name={category.name}
                  description={category.description}
                />
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Evaluation Criteria Section */}
      <section className="py-16 bg-[#040404] relative">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#111111] to-black"></div>
        <AnimatedSection>
          <div className="container mx-auto px-4 md:px-6 relative">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-[#00FFFF] animate-glow">Criterios de Evaluación</h2>
              <p className="text-xl text-[#00FFFF]">Los proyectos serán evaluados considerando los siguientes aspectos:</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {hackathonInfo.evaluationCriteria.map((criteria) => (
                <Card key={criteria.name} className="transform transition hover:-translate-y-1 bg-[#111111] border border-[#333333] hover:border-[#00FFFF] hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]">
                  <CardContent>
                    <div className="flex items-center mb-4">
                      <div className="rounded-full bg-black p-2 mr-3">
                        <span className="text-[#00FFFF] font-bold">{criteria.weight}%</span>
                      </div>
                      <h3 className="text-xl font-semibold text-[#00FFFF]">{criteria.name}</h3>
                    </div>
                    <p className="text-[#00FFFF]">{criteria.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-[#010101] relative">
        <div className="absolute inset-0 bg-[radial-gradient(#333333_1px,transparent_1px)] bg-[length:20px_20px] opacity-5"></div>
        <AnimatedSection>
          <div className="container mx-auto px-4 md:px-6 relative">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-[#00FFFF] animate-glow">Cronograma</h2>
              <p className="text-xl text-[#00FFFF]">Fechas importantes del evento</p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-1 bg-[#333333]"></div>
                
                <div className="space-y-12">
                  {hackathonInfo.timeline.map((event, index) => (
                    <TimelineItem 
                      key={event.name}
                      date={event.date}
                      title={event.name}
                      align={index % 2 === 0 ? 'right' : 'left'}
                    >
                      {event.description}
                    </TimelineItem>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Prizes Section */}
      <section className="py-16 bg-[#030303] relative">
        <div className="absolute inset-0 cyber-grid opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
        <AnimatedSection>
          <div className="container mx-auto px-4 md:px-6 relative">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-[#00FFFF] animate-glow">Premios</h2>
              <p className="text-xl text-[#00FFFF]">Los mejores proyectos serán recompensados con increíbles premios</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {hackathonInfo.prizes.map((prize) => (
                <Card key={prize.position} className={`text-center bg-[#111111] border border-[#333333] hover:border-[#00FFFF] hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] ${prize.position === 1 ? 'border-2 border-[#00FFFF] transform -translate-y-4' : ''}`}>
                  <CardContent className="flex flex-col items-center">
                    <div className={`rounded-full p-3 mb-4 ${
                      prize.position === 1 ? 'bg-black' :
                      prize.position === 2 ? 'bg-black' :
                      'bg-black'
                    }`}>
                      <Medal className={`h-8 w-8 ${
                        prize.position === 1 ? 'text-[#00FFFF]' :
                        prize.position === 2 ? 'text-[#00FFFF]' :
                        'text-[#00FFFF]'
                      }`} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-[#00FFFF]">{prize.position}° Lugar</h3>
                    <p className="text-[#00FFFF]">{prize.prize}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-black via-[#111111] to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-[#111111] via-black to-black"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#00FFFF10_25%,transparent_25%,transparent_75%,#00FFFF10_75%,#00FFFF10)] bg-[length:100px_100px] animate-pulse-slow"></div>
        <AnimatedSection>
          <div className="container mx-auto px-4 md:px-6 relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#00FFFF] text-center animate-glow">¿Estás listo para el desafío?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-[#00FFFF] text-center">
              No pierdas la oportunidad de mostrar tu talento, aprender nuevas habilidades y ganar increíbles premios.
            </p>
            <div className="text-center">
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="bg-[#FF00FF] text-white hover:bg-[#CC00CC] transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl font-bold text-lg px-12 py-4"
                >
                  ¡Inscríbete Ahora!
                </Button>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
};

const TimelineItem: React.FC<{
  date: string;
  title: string;
  children: React.ReactNode;
  align: 'left' | 'right';
}> = ({ date, title, children, align }) => {
  return (
    <div className={`relative flex items-center ${align === 'left' ? 'flex-row' : 'flex-row-reverse'} md:justify-between`}>
      <div className="hidden md:block w-5/12"></div>
      
      <div className="z-10 flex items-center justify-center w-8 h-8 rounded-full bg-[#FF00FF] shadow-md md:absolute md:left-1/2 md:-ml-4">
        <div className="w-3 h-3 bg-white rounded-full"></div>
      </div>
      
      <Card className={`w-full md:w-5/12 ml-4 md:ml-0 z-20 bg-black border border-[#333333] ${align === 'left' ? 'md:mr-auto' : 'md:ml-auto'}`}>
        <CardContent>
          <p className="text-sm font-bold text-[#00FFFF] mb-1">{date}</p>
          <h3 className="text-xl font-semibold mb-2 text-[#00FFFF]">{title}</h3>
          <p className="text-[#00FFFF]">{children}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;