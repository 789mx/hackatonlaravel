import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Users, Check, Info, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardContent, CardHeader, CardFooter } from '../components/ui/Card';
import { saveParticipant } from '../data/mockData';
import { Skill } from '../types';

type RegistrationInputs = {
  name: string;
  email: string;
  phone: string;
  background: string;
  skills: string;
  skillLevels: Record<string, 'Básico' | 'Intermedio' | 'Avanzado' | 'Experto'>;
  acceptTerms: boolean;
};

const RegisterPage: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [skillFields, setSkillFields] = useState<string[]>(['']);
  
  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<RegistrationInputs>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      background: '',
      skills: '',
      skillLevels: {},
      acceptTerms: false
    }
  });
  
  const watchAllFields = watch();
  
  const onSubmit: SubmitHandler<RegistrationInputs> = async (data) => {
    setIsSubmitting(true);
    try {
      const skillsArray: Skill[] = skillFields
        .filter(skill => skill.trim())
        .map(skill => ({
          name: skill,
          level: data.skillLevels[skill] || 'Básico'
        }));
      
      await saveParticipant({
        name: data.name,
        email: data.email,
        phone: data.phone,
        background: data.background,
        skills: skillsArray
      });
      
      setIsSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const addSkillField = () => {
    setSkillFields([...skillFields, '']);
  };

  const removeSkillField = (index: number) => {
    setSkillFields(skillFields.filter((_, i) => i !== index));
  };

  const updateSkillField = (index: number, value: string) => {
    const newSkills = [...skillFields];
    newSkills[index] = value;
    setSkillFields(newSkills);
  };
  
  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };
  
  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };
  
  const isStepValid = () => {
    if (step === 1) {
      return !!watchAllFields.name && !!watchAllFields.email && !!watchAllFields.phone && !errors.name && !errors.email && !errors.phone;
    } else if (step === 2) {
      return !!watchAllFields.background && skillFields.some(skill => skill.trim()) && !errors.background;
    }
    return true;
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-24 pb-12 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="max-w-3xl mx-auto bg-black border border-[#333333]">
            <CardContent className="p-8 text-center">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-[#111111] p-3">
                  <Check className="h-12 w-12 text-[#00FFFF]" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-[#00FFFF] mb-4">¡Registro Exitoso!</h1>
              <p className="text-lg text-[#00FFFF] mb-6">
                Tu inscripción al 789.mx Hackathon ha sido recibida correctamente. 
                Te hemos enviado un correo de confirmación con todos los detalles.
              </p>
              <div className="bg-[#111111] rounded-lg p-4 mb-6 text-left border border-[#333333]">
                <h3 className="text-lg font-semibold mb-2 flex items-center text-[#00FFFF]">
                  <Info className="mr-2 h-5 w-5" />
                  Próximos pasos
                </h3>
                <ul className="list-disc ml-6 text-[#00FFFF] space-y-2">
                  <li>Revisa tu correo corporativo para las instrucciones de participación.</li>
                  <li>Prepara tus herramientas y recursos para el hackathon.</li>
                  <li>La asignación de equipos se realizará por el equipo organizador.</li>
                </ul>
              </div>
              <Button 
                onClick={() => window.location.href = '/'} 
                className="bg-[#FF00FF] text-white hover:bg-[#CC00CC]"
              >
                Volver a Inicio
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#00FFFF] mb-2">Registro para el Hackathon</h1>
            <p className="text-[#00FFFF]">Completa el formulario para asegurar tu lugar en el hackathon</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    step >= i ? 'bg-[#FF00FF]' : 'bg-[#333333]'
                  } transition-colors`}>
                    {i === 1 && <Users size={20} className="text-white" />}
                    {i === 2 && <Sparkles size={20} className="text-white" />}
                    {i === 3 && <Check size={20} className="text-white" />}
                  </div>
                  <span className={`text-xs mt-1 ${step >= i ? 'text-[#00FFFF]' : 'text-[#666666]'}`}>
                    {i === 1 ? 'Datos personales' : i === 2 ? 'Perfil técnico' : 'Confirmación'}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-1 bg-[#333333] rounded">
                  <div 
                    className="h-1 bg-[#FF00FF] rounded transition-all duration-300"
                    style={{ width: `${(step - 1) * 50}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <Card className="bg-black border border-[#333333]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardHeader>
                <h2 className="text-xl font-semibold text-[#00FFFF]">
                  {step === 1 && 'Datos Personales'}
                  {step === 2 && 'Perfil Técnico'}
                  {step === 3 && 'Revisar y Confirmar'}
                </h2>
              </CardHeader>
              
              <CardContent>
                {step === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[#00FFFF] mb-1">
                        Nombre completo *
                      </label>
                      <input
                        id="name"
                        type="text"
                        className={`w-full px-4 py-2 bg-[#111111] border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF00FF] text-[#00FFFF] ${
                          errors.name ? 'border-red-500' : 'border-[#333333]'
                        }`}
                        {...register('name', { required: 'Este campo es obligatorio' })}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#00FFFF] mb-1">
                        Correo electrónico corporativo *
                      </label>
                      <input
                        id="email"
                        type="email"
                        className={`w-full px-4 py-2 bg-[#111111] border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF00FF] text-[#00FFFF] ${
                          errors.email ? 'border-red-500' : 'border-[#333333]'
                        }`}
                        {...register('email', { 
                          required: 'Este campo es obligatorio',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@789\.mx$/i,
                            message: 'Debe usar su correo corporativo (@789.mx)'
                          }
                        })}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-[#00FFFF] mb-1">
                        Teléfono *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        className={`w-full px-4 py-2 bg-[#111111] border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF00FF] text-[#00FFFF] ${
                          errors.phone ? 'border-red-500' : 'border-[#333333]'
                        }`}
                        {...register('phone', { 
                          required: 'Este campo es obligatorio',
                          pattern: {
                            value: /^[\d\s\(\)\-\+]{8,15}$/,
                            message: 'Número de teléfono inválido'
                          }
                        })}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>
                )}
                
                {step === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="background" className="block text-sm font-medium text-[#00FFFF] mb-1">
                        Perfil profesional *
                      </label>
                      <input
                        id="background"
                        type="text"
                        className={`w-full px-4 py-2 bg-[#111111] border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF00FF] text-[#00FFFF] ${
                          errors.background ? 'border-red-500' : 'border-[#333333]'
                        }`}
                        {...register('background', { required: 'Este campo es obligatorio' })}
                        placeholder="Ej: Desarrollador Frontend, Diseñadora UX/UI, etc."
                      />
                      {errors.background && (
                        <p className="mt-1 text-sm text-red-500">{errors.background.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-[#00FFFF] mb-3">
                        Habilidades técnicas y nivel de experiencia *
                      </label>
                      {skillFields.map((skill, index) => (
                        <div key={index} className="flex gap-4 mb-3">
                          <div className="flex-1">
                            <input
                              type="text"
                              value={skill}
                              onChange={(e) => updateSkillField(index, e.target.value)}
                              className="w-full px-4 py-2 bg-[#111111] border border-[#333333] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF00FF] text-[#00FFFF]"
                              placeholder="Ej: JavaScript, Python, React, etc."
                            />
                          </div>
                          <select
                            {...register(`skillLevels.${skill}`)}
                            className="w-40 px-4 py-2 bg-[#111111] border border-[#333333] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF00FF] text-[#00FFFF]"
                          >
                            <option value="Básico">Básico</option>
                            <option value="Intermedio">Intermedio</option>
                            <option value="Avanzado">Avanzado</option>
                            <option value="Experto">Experto</option>
                          </select>
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => removeSkillField(index)}
                              className="px-3 py-2 text-red-500 hover:text-red-400"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addSkillField}
                        className="mt-2 text-[#00FFFF] hover:text-[#00CCCC] text-sm font-medium"
                      >
                        + Agregar otra habilidad
                      </button>
                    </div>
                  </div>
                )}
                
                {step === 3 && (
                  <div>
                    <div className="bg-[#111111] p-4 rounded-lg mb-6 border border-[#333333]">
                      <h3 className="font-semibold text-lg mb-4 text-[#00FFFF]">Resumen de tu registro</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-[#00FFFF]">Información Personal</h4>
                          <div className="mt-1 grid grid-cols-2 gap-x-6 gap-y-2">
                            <div>
                              <p className="text-sm font-medium text-[#00FFFF]">Nombre:</p>
                              <p className="text-sm text-[#00FFFF]">{watchAllFields.name}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-[#00FFFF]">Email:</p>
                              <p className="text-sm text-[#00FFFF]">{watchAllFields.email}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-[#00FFFF]">Teléfono:</p>
                              <p className="text-sm text-[#00FFFF]">{watchAllFields.phone}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-[#00FFFF]">Perfil Técnico</h4>
                          <div className="mt-1">
                            <div className="mb-2">
                              <p className="text-sm font-medium text-[#00FFFF]">Perfil profesional:</p>
                              <p className="text-sm text-[#00FFFF]">{watchAllFields.background}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-[#00FFFF]">Habilidades y niveles:</p>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {skillFields.filter(skill => skill.trim()).map((skill) => (
                                  <span key={skill} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#111111] text-[#00FFFF] border border-[#333333]">
                                    {skill} - {watchAllFields.skillLevels[skill]}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start mb-4">
                      <div className="flex items-center h-5">
                        <input
                          id="acceptTerms"
                          type="checkbox"
                          className="w-4 h-4 bg-[#111111] border-[#333333] rounded focus:ring-[#FF00FF] text-[#FF00FF]"
                          {...register('acceptTerms', { required: 'Debes aceptar los términos para continuar' })}
                        />
                      </div>
                      <div className="ml-3">
                        <label htmlFor="acceptTerms" className="text-sm text-[#00FFFF]">
                          Acepto los términos y condiciones del hackathon y confirmo que la información proporcionada es correcta *
                        </label>
                        {errors.acceptTerms && (
                          <p className="mt-1 text-sm text-red-500">{errors.acceptTerms.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-between">
                {step > 1 ? (
                  <Button 
                    type="button" 
                    variant="secondary"
                    onClick={prevStep}
                    className="bg-[#333333] text-[#00FFFF] hover:bg-[#444444]"
                  >
                    Anterior
                  </Button>
                ) : (
                  <div></div>
                )}
                
                {step < 3 ? (
                  <Button 
                    type="button" 
                    onClick={nextStep} 
                    disabled={!isStepValid()}
                    className="bg-[#FF00FF] text-white hover:bg-[#CC00CC] disabled:bg-[#333333] disabled:text-gray-400"
                  >
                    Siguiente
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    isLoading={isSubmitting} 
                    disabled={!watchAllFields.acceptTerms}
                    className="bg-[#FF00FF] text-white hover:bg-[#CC00CC] disabled:bg-[#333333] disabled:text-gray-400"
                  >
                    Enviar Registro
                  </Button>
                )}
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;