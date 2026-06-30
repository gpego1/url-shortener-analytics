import heroImage from "../../assets/hero.png"

function Hero() {
  return (
    <section className="hero">
      <img src={heroImage} alt="" className="hero__image" />
      <h1 className="hero__title">Encurte links, acompanhe resultados</h1>
      <p className="hero__subtitle">
        Transforme URLs longas em links curtos e rastreáveis em segundos.
      </p>
    </section>
  )
}

export default Hero
