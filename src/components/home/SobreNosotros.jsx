import React from 'react'
import logo from '../media/padelstoreLogo.png'

const SobreNosotros = () => {
    return (
        <div className='w-full bg-white py-16 px-4 '>
            <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
                <img className='w-[500px] mx-auto my-4' src={logo} alt='/'/>
                <div className='flex flex-col justify-center'>
                    <p className='text-[#00df9a] font-bold'>
                        Sobre nosotros
                    </p>
                    <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>
                        "¡Bienvenidos a la familia PadelStore!"
                    </h1>
                    <p>En lo profundo de las vibrantes tierras de Tucumán, Argentina. Tres apasionados del pádel
                        unieron sus fuerzas para dar vida a un sueño compartido. Así nació PadelStore, tu destino
                        definitivo para todo lo relacionado con este emocionante deporte.
                        <br />
                        Hace unos años, en un club de Tucumán, tres amigos de espíritu intrépido y
                        corazones llenos de entusiasmo. En medio de saques y voleas, descubrieron su amor mutuo por el pádel.
                        Cada partido fue un lazo más fuerte que los unía, y cada conversación se llenaba de emocionantes anécdotas
                        sobre sus partidos y jugadas inolvidables.
                        <br />
                        Un día, entre risas y sueños compartidos, surgió una idea audaz: ¿por qué no combinar su pasión por el pádel
                        con su deseo de emprender? Y así comenzó su viaje para crear un espacio donde los amantes del pádel pudieran
                        encontrar todo lo que necesitan bajo un mismo techo virtual.
                        <br />
                        Hoy, en PadelStore, compartimos contigo esa misma pasión que nos unió desde el principio. Nos enorgullece
                        ofrecerte una cuidadosa selección de productos de la más alta calidad, elegidos especialmente para elevar
                        tu juego y satisfacer tus necesidades. Ya sea que estés buscando mejorar tu saque, perfeccionar tus voleas
                        o simplemente quieras lucir increíble en la cancha, estamos aquí para ayudarte.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SobreNosotros